import fs from "node:fs"
import { parse } from "csv-parse/sync"
import { CONFIG } from "./config.ts"

const TITLE_COLUMN = "Title"
const ORIGINAL_TITLE_COLUMN = "Original Title"

const fileContent = fs.readFileSync(CONFIG.imdb_path, "utf-8")
const seenMovies: any[] = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
})

const seenTitles = seenMovies.flatMap((movie) => {
  const titles = [movie[TITLE_COLUMN]]
  if (movie[ORIGINAL_TITLE_COLUMN]) {
    titles.push(movie[ORIGINAL_TITLE_COLUMN])
  }
  return titles
})

export function filter({ movies }: { movies: string[] }): string[] {
  return movies.filter((movie) => {
    const normalizedMovie = movie.toLowerCase().replace(/[^a-z]/g, "")
    return !seenTitles.some((seenTitle) => {
      const normalizedSeen = seenTitle.toLowerCase().replace(/[^a-z]/g, "")
      return normalizedMovie === normalizedSeen
    })
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.info(seenTitles)

  // Test data
  const testMovies = [
    "The Matrix",
    "Inception",
    "Some New Movie",
    "The Dark Knight",
  ]

  console.log("Testing filter function with movies:", testMovies)
  const unseen = filter({ movies: testMovies })
  console.log("Unseen movies:", unseen)
}
