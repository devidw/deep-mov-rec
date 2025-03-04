import { Project } from "./project.ts"
import { PROMPTS } from "./prompts.ts"
import fs from "node:fs"
import { CONFIG } from "./config.ts"
import OpenAI from "openai"

const USER_PREFS = fs.readFileSync(CONFIG.user_prefs_path).toString()

const ai = new OpenAI({
  timeout: 10 * 1000,
})

async function think<T>({
  input,
  prompt,
  project,
  schema,
  no_prefs,
}: {
  input?: string
  prompt: string
  project?: Project
  schema?: any
  no_prefs?: boolean
}): Promise<T> {
  const params: OpenAI.ChatCompletionCreateParamsNonStreaming = {
    model: "gpt-4o-mini",
    // temperature: 0,
    messages: [],
    response_format: schema
      ? {
          type: "json_schema",
          json_schema: schema,
        }
      : undefined,
  }

  if (!no_prefs) {
    params.messages.push({
      role: "user",
      content: `USER PREFERENCES:\n\n${USER_PREFS}`,
    })
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

  project?.write(params, `ai_${id}_req`)
  project?.log("ai", "req")

  const response = await ai.chat.completions.create(params)

  project?.log("ai", `completed`)

  const txt = response.choices[0].message.content ?? ""

  return JSON.parse(txt)
}

/**
 *
 */
export async function build_search_queries({ project }: { project?: Project }) {
  const schema = {
    name: "search_queries",
    schema: {
      type: "object",
      properties: {
        values: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["values"],
      additionalProperties: false,
    },
    strict: true,
  }

  const res = await think<{
    values: string[]
  }>({
    prompt: PROMPTS["get_search_queries"],
    project,
    schema,
  })

  return res.values
}

/**
 *
 */
export async function extract_titles({
  project,
  input,
  no_prefs,
}: {
  input: string
  project?: Project
  no_prefs?: boolean
}) {
  const schema = {
    name: "movie_titles",
    schema: {
      type: "object",
      properties: {
        values: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["values"],
      additionalProperties: false,
    },
    strict: true,
  }

  const res = await think<{ values: string[] }>({
    prompt: PROMPTS["extract_titles"],
    project,
    input,
    schema,
    no_prefs,
  })

  return res.values
}

/**
 *
 */
export async function filter_for_prefs({
  project,
  input,
}: {
  input: string
  project?: Project
}) {
  const schema = {
    name: "user_preference_matches",
    schema: {
      type: "object",
      properties: {
        values: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              score: {
                type: "number",
                // minimum: 1,
                // maximum: 5,
              },
            },
            required: ["title", "score"],
            additionalProperties: false,
          },
        },
      },
      required: ["values"],
      additionalProperties: false,
    },
    strict: true,
  }

  const res = await think<{
    values: {
      title: string
      score: number
    }[]
  }>({
    prompt: PROMPTS["filter_for_prefs"],
    project,
    input,
    schema,
  })

  return res.values
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const test = await filter_for_prefs({
    input: `The Matrix
Inception
Avatar
Jurassic Park`,
  })
  console.log(test)
}
