export function to_array(input: string) {
  return input
    .split("\n")
    .map((a) => a.trim())
    .filter((a) => a.length > 0)
}

export function to_string(input: string[]) {
  return input.join("\n")
}
