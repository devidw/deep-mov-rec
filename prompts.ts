import fs from "node:fs"
import * as TOML from "@iarna/toml"

const prompts_raw = fs.readFileSync("./prompts.toml").toString()

export const PROMPTS = TOML.parse(prompts_raw) as Record<string, string>
