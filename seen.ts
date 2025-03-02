import fs from "node:fs"
import { CONFIG } from "./config.ts"

const fileContent = fs.readFileSync(CONFIG.seen_path, "utf-8")
const seenTitles = fileContent
  .split("\n")
  .filter((line) => line.trim().length > 0)

export function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z]/g, "")
}

export function filter({ movies }: { movies: string[] }): string[] {
  const uniqueMovies = [...new Set(movies)]

  return uniqueMovies.filter((movie) => {
    const normalizedMovie = normalizeTitle(movie)
    return !seenTitles.some((seenTitle) => {
      const normalizedSeen = normalizeTitle(seenTitle)
      return normalizedMovie === normalizedSeen
    })
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.info(seenTitles)

  const testMovies = [
    "The Matrix",
    "Inception",
    "Some New Movie",
    "The Dark Knight",
    "The Matrix",
  ]

  console.log("Testing filter function with movies:", testMovies)
  const unseen = filter({ movies: testMovies })
  console.log("Unseen movies:", unseen)
}
