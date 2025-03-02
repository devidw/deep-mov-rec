// const filtered_raw = await ai.think({
//   project,
//   input: JSON.stringify(search_results, null, 2),
//   prompt: PROMPTS["filter_search_results"],
// })
// project.write(filtered_raw, "3_filtered_raw")

// const filtered: reddit.Search_Result[] = []

// const json = JSON.parse(filtered_raw)
// project.write(json, "3_filtered_json")

// if (json["permalinks"]) {
//   filtered.push(
//     ...json["permalinks"].map((a) => {
//       return {
//         permalink: a.replace("https://www.reddit.com", ""),
//       }
//     })
//   )
// } else {
//   filtered.push(...json)
// }

// project.write(filtered, "3_filtered")

// // stop_here()
// ensure_not_empty(filtered)

// ---
