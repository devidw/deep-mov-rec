import fs from "node:fs"
import { parse } from "csv-parse/sync"

const SEEN_CSV_PATH = "./imdb.csv"
const TITLE_COLUMN = "Title"

const fileContent = fs.readFileSync(SEEN_CSV_PATH, "utf-8")
const seenMovies = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
})

const seenTitles = seenMovies.map((movie) => movie[TITLE_COLUMN])

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
