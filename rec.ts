import "./env.ts"
import { CONFIG } from "./config.ts"
import * as reddit from "./reddit.ts"
import fs from "node:fs"

CONFIG.rm_proj = true
CONFIG.early_breaks = true
CONFIG.proj_dir = "./recs"
CONFIG.user_prefs_path = "./recs/user.txt"
CONFIG.seen_path = "./recs/seen.txt"

const url = ""

const permalink = url.replace("https://www.reddit.com", "")

const id = permalink.replace("/r/MovieSuggestions/comments/", "").split("/")[0]

CONFIG.proj_name = id

const post = await reddit.get_post_details(permalink)

console.info(post)

const user_prefs = `${post.title}\n\n${post.body}`

fs.writeFileSync("./recs/user.txt", user_prefs)

const ai = await import("./ai.ts")

const titles = await ai.extract_titles({
  input: user_prefs,
  no_prefs: true,
})

console.info({ titles })

fs.writeFileSync("./recs/seen.txt", titles.join("\n"))

await import("./main.ts")
