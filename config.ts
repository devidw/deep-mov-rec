export const CONFIG = {
  proj_name: "dev",
  rm_dev_proj: true,
  early_breaks: false,
  ai: {
    concurrency: 2,
    rec_check_max: 100,
    rec_check_batch_size: 20,
  },
  reddit: {
    concurrency: 3,
    subreddit: "MovieSuggestions",
    max_search_results_per_query: 1,
    max_comments_per_post: 30,
  },
}
