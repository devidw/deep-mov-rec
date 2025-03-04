import "./env.ts"
import { CONFIG } from "./config.ts"
import { Project } from "./project.ts"

export type Search_Result = {
  title: string
  permalink: string
}

export async function get_search_results({
  query,
  project,
}: {
  query: string
  project: Project
}): Promise<Search_Result[]> {
  project.log("reddit", `query '${query}'`)

  const results = await fetch(
    `https://oauth.reddit.com/r/${CONFIG.reddit.subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=on&limit=${CONFIG.reddit.max_search_results_per_query}&sort=relevance`,
    {
      headers: {
        authorization: `Bearer ${process.env.REDDIT_API_KEY}`,
        accept: "application/json",
        "User-Agent": "YourAppName/1.0",
      },
    }
  )

  project.log("reddit", `${results.status} ${results.statusText}`)

  const out = await results.json()

  project.write(out, `reddit_${Date.now()}`)

  const ones = out.data.children.map((one) => {
    return {
      // ...one.data,
      title: one.data.title,
      permalink: one.data.permalink,
    }
  })

  project.log("reddit", `got ${ones.length} search results`)

  return ones
}

export async function get_contents({
  permalink,
  project,
}: {
  permalink: string
  project?: Project
}) {
  project?.log("reddit", `visit ${permalink}`)

  const results = await fetch(
    `https://oauth.reddit.com${permalink}.json?depth=1&limit=${CONFIG.reddit.max_comments_per_post}&sort=top`,
    {
      headers: {
        authorization: `Bearer ${process.env.REDDIT_API_KEY}`,
        accept: "application/json",
        "User-Agent": "YourAppName/1.0",
      },
    }
  )

  project?.log("reddit", `${results.status} ${results.statusText}`)

  const out = await results.json()

  project?.write(out, `reddit_${Date.now()}`)

  let allText = ""

  // Add post title and body
  // const post = out[0].data.children[0].data
  // allText += post.title + "\n"
  // if (post.selftext) {
  //   allText += post.selftext + "\n"
  // }

  // Add only level 1 comments
  const comments = out[1].data.children
  for (const comment of comments) {
    if (comment.kind === "t1") {
      allText += comment.data.body + "\n"
    }
  }

  project?.log("reddit", `got post with ${comments.length} comments`)

  return allText
}

export async function get_post_details(permalink: string): Promise<{
  title: string
  body: string
}> {
  const results = await fetch(`https://oauth.reddit.com${permalink}.json`, {
    headers: {
      authorization: `Bearer ${process.env.REDDIT_API_KEY}`,
      accept: "application/json",
      "User-Agent": "YourAppName/1.0",
    },
  })

  console.info(results.status)

  const out = await results.json()
  const post = out[0].data.children[0].data

  return {
    title: post.title,
    body: post.selftext || "",
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const testPermalink =
    "/r/MovieSuggestions/comments/1j1blrt/whats_your_comfort_movie_that_is_not_a_meant_to/"

  console.log("Testing get_contents with permalink:", testPermalink)
  const contents = await get_contents({
    permalink: testPermalink,
  })
  console.log("Retrieved contents:", contents)
}
