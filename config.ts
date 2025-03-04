export const CONFIG = {
  proj_name: "dev",
  proj_dir: "./projects",

  user_prefs_path: "./user.txt",
  seen_path: "./seen.txt",

  // dev
  rm_proj: true,
  early_breaks: true,

  ai: {
    concurrency: 3,
    rec_check_max: 100,
    rec_check_batch_size: 20,
  },

  reddit: {
    concurrency: 5,
    subreddit: "MovieSuggestions",
    max_search_results_per_query: 1,
    max_comments_per_post: 30,
  },
}
