import fs from "node:fs"

/**
 * this class will manage a project
 * a project has a name and projects are managed in the ./projects directory relative to this source file
 * a project subdirectory is created by the provided project name
 * if it already exists an error is thrown
 * it exposes a function that allows to take a dynamic input and will turn it into json and write it to a json file with a given name in the project directory
 */
export class Project {
  private name: string
  private dir: string
  private step = 1

  constructor({ name }: { name: string }) {
    this.name = name
    this.dir = `./projects/${name}`
    if (fs.existsSync(this.dir)) throw new Error("Project exists")
    fs.mkdirSync(this.dir, { recursive: true })
  }

  set_step(step: number) {
    this.step = step
  }

  log(module: string | null = null, msg: string) {
    console.info(`[${this.step}]${module ? ` [${module}]` : ""} ${msg}`)
  }

  write(input: unknown, filename: string) {
    fs.writeFileSync(
      `${this.dir}/${this.step}_${filename}${typeof input === "string" ? ".md" : ".json"}`,
      typeof input === "string" ? input : JSON.stringify(input, null, 4)
    )
  }
}
