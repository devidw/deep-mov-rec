import { Project } from "./project.ts"
import { PROMPTS } from "./prompts.ts"
import fs from "node:fs"

const USER_PREFS = fs.readFileSync("./user.txt").toString()

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
    temperature: 0,
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

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(params),
  })

  project.log("ai", `${response.status} ${response.statusText}`)

  const json = await response.json()

  return json.choices[0].message.content
}
