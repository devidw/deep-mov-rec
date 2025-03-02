import { Project } from "./project.ts"
import { PROMPTS } from "./prompts.ts"
import fs from "node:fs"
import { CONFIG } from "./config.ts"
import OpenAI from "openai"

const USER_PREFS = fs.readFileSync(CONFIG.user_prefs_path).toString()

const ai = new OpenAI({
  timeout: 10 * 1000,
})

export async function think({
  input,
  prompt,
  project,
}: {
  input?: string
  prompt: string
  project: Project
}): Promise<string> {
  const params = {
    model: "gpt-4o-mini",
    // temperature: 0,
    messages: [
      {
        role: "user",
        content: `USER PREFERENCES:\n\n${USER_PREFS}`,
      },
    ],
  }

  if (input) {
    params.messages.push({
      role: "user",
      content: `INPUT:\n\n${input}`,
    })
  }

  params.messages.push({
    role: "system",
    content: `${PROMPTS["meta"]}\n\nTASK:\n\n${prompt}`,
  })

  const id = Date.now()

  project.write(params, `ai_${id}_req`)
  project.log("ai", "req")

  const response = await ai.chat.completions.create(params)

  project.log("ai", `completed`)

  return response.choices[0].message.content ?? ""
}
