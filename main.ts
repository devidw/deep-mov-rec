import "./env.ts"
import * as reddit from "./reddit.ts"
import * as ai from "./ai.ts"
import * as seen from "./seen.ts"
import { Project } from "./project.ts"
import fs from "node:fs"
import { CONFIG } from "./config.ts"
import _ from "lodash"

if (CONFIG.rm_dev_proj) {
  fs.rmSync("./projects/dev", {
    recursive: true,
    force: true,
  })
}

function stop_here() {
  process.exit(0)
}

function ensure_not_empty(input: unknown[]) {
  if (input.length === 0) {
    console.warn("got empty response")
    process.exit(1)
  }
}

const project = new Project({
  name: CONFIG.proj_name,
})

/*
 * Step 1
 * Build search queries
 */

project.set_step(1)

const search_queries = await ai.build_search_queries({
  project,
})

project.write(search_queries, "search_queries")
project.log("ai", `built ${search_queries.length} search queries`)

ensure_not_empty(search_queries)

/*
 * Step 2
 * Perform searches
 */

project.set_step(2)

const search_results: reddit.Search_Result[] = []

for (let i = 0; i < search_queries.length; i += CONFIG.reddit.concurrency) {
  const batch = search_queries.slice(i, i + CONFIG.reddit.concurrency)
  const results = await Promise.all(
    batch.map((query) =>
      reddit.get_search_results({
        project,
        query,
      })
    )
  )
  search_results.push(...results.flat())
  project.write(search_results, "search_results")

  if (CONFIG.early_breaks) {
    break
  }
}

ensure_not_empty(search_results)

/*
 * Step 3
 * Get contents
 */

project.set_step(3)

const reddit_contents: {
  src: string
  body: string
}[] = []

for (let i = 0; i < search_results.length; i += CONFIG.reddit.concurrency) {
  const results = search_results.slice(i, i + CONFIG.reddit.concurrency)

  const contents = await Promise.all(
    results.map((result) =>
      reddit.get_contents({
        project,
        permalink: result.permalink,
      })
    )
  )

  for (let j = 0; j < contents.length; j++) {
    project.write(contents[j], `${i + j + 1}_reddit`)
    reddit_contents.push({
      src: results[j].permalink,
      body: contents[j],
    })
  }

  if (CONFIG.early_breaks) {
    break
  }
}

ensure_not_empty(reddit_contents)

/*
 * Step 4
 * Extract titles
 */

project.set_step(4)

const titles: {
  src: string
  title: string
}[] = []

for (let i = 0; i < reddit_contents.length; i += CONFIG.ai.concurrency) {
  const contents = reddit_contents.slice(i, i + CONFIG.ai.concurrency)

  const round_titles = await Promise.all(
    contents.map((content) =>
      ai.extract_titles({
        project,
        input: content.body,
      })
    )
  )

  for (let j = 0; j < round_titles.length; j++) {
    const the_titles = round_titles[j]
    project.write(the_titles, `${i + j + 1}_titles`)
    project.log("ai", `[${i + j + 1}] found ${the_titles.length} titles`)
    titles.push(
      ...the_titles.map((title) => {
        return {
          src: contents[j].src,
          title,
        }
      })
    )
  }

  if (CONFIG.early_breaks) {
    break
  }
}

// stop_here()
ensure_not_empty(titles)

/*
 * Step 5
 * Filter out already seen
 */

project.set_step(5)

const unseen_titles = seen.filter({ movies: titles.map((a) => a.title) })
project.write(unseen_titles, `unseen`)
project.log(null, `${unseen_titles.length} of ${titles.length} are unseen`)

ensure_not_empty(unseen_titles)

/*
 * Step 6
 * Filter out the ones that don't align with user preferences
 */

project.set_step(6)

const titles_to_check = unseen_titles.slice(0, CONFIG.ai.rec_check_max)
const recs: string[] = []

for (
  let i = 0;
  i < titles_to_check.length;
  i += CONFIG.ai.rec_check_batch_size
) {
  const chunk = titles_to_check.slice(i, i + CONFIG.ai.rec_check_batch_size)

  const round_recs = await ai.filter_for_prefs({
    project,
    input: chunk.join("\n"),
  })

  recs.push(...round_recs)

  project.write(recs, `recs`)
  project.log(
    "ai",
    `[${i}] got ${round_recs.length} recs (total: ${recs.length})`
  )
}

const recs_with_src = recs
  .map((rec) => {
    const src = titles.find(
      (t) =>
        t.title.toLowerCase().replace(/[^a-z]/g, "") ===
        rec.toLowerCase().replace(/[^a-z]/g, "")
    )
    return {
      title: rec,
      src: src?.src,
    }
  })
  .filter((rec) => rec.src !== undefined)

project.write(recs_with_src, `recs_with_src`)
project.log(
  null,
  `Found sources for ${recs_with_src.filter((r) => r.src).length} of ${recs.length} recommendations`
)

console.info("\n\nRECS:\n-----")

const report = recs_with_src
  .map(
    (a, i) =>
      `${i + 1}. ${a.title}${a.src ? ` [src](https://wwww.reddit.com${a.src})` : ""}`
  )
  .join("\n")

project.write(report, "report")
console.info(report)
