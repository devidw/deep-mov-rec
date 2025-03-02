# recommend me movies that i have <em><strong>NOT</strong></em> seen

over the last years i got so many good movie recs from llms

however, at some point it got extremely difficult to get good recs for movies that i haven't seen yet

i always run into series of responses that only listed movies that i've all seen already or that i'm not into bc of x/y/z

surprise surprise providing a csv with hundreds of already seen movies didn't rlly work well

this project is a custom deep search just for movie recs to address all these shortcomings

recs are exclusively sourced from reddit and they are filtered against already seen movies, all based on custom preferences prompt

## how it works

1. user describes movie preferences
2. preferences are turned into a series of search queries
3. /r/MovieSuggestions is searched for relevant results
4. posts with 1st level comments are retrieved
5. llm extracts movie titles from comments
6. already seen movies are filtered out, using imdb csv export
7. remaining movies are checked against user preferences again to ensure quality

## usage

- `config.ts`
- `user.txt` : describe your movie preferences, likes, dislikes, actors, directors, up to you
- `seen.txt` : newline sep list of movie titles that u have seen already
  - `imdb.ipynb`: if you want to gen from an imdb list like your check-ins or ratings
    - `seen_extra.txt` : sometimes reddit mentioned titles don't match either of imdb title or imdb original title, in that case you can blacklist them manually with the reddit mentioned title alias, case doesn't matter

```bash
OPENAI_API_KEY=""
REDDIT_API_KEY=""
```

- reddit api key is an access token obtained via oauth, you have to setup a reddit script app and run through the oauth flow to get one

```bash
pnpm i
```

```bash
pnpm tsx main.ts
```

## example

### input

- avoid movies that are just at a single location, i prefer 'open world' kinda feel
- avoid movies that are too shaky, action with tons of cut scenes and fights and gun fire, it can have some, but should be a good balance with actual depth
- fucked up stuff is a plus, like black mirror, memento, existenz etc, david cronenberg
- avoid overly romance, sex is a plus but not overly relationship / love driven, heavy
- shouldn't feel too old, it's okay if it's older, but it shouldn't feel old, taxi driver is old but doesn't feel old, great movie
- shouldn't be a too femaleish theme like black swan
- shouldn't be a politics, police or law heavy movie, it can be in there but shouldn't be the main theme
- no musicals, no documentaries, no black and white, no silent movies
- i like cyberpunk, scifi, mystery, thriller btw, not limited to but i like those

## output

1. Kill List [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h2ivq2/looking_for_a_hitman_movie_with_style_and_depth/)
2. The Man from Nowhere [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h2ivq2/looking_for_a_hitman_movie_with_style_and_depth/)
3. Ghost Dog: The Way of the Samurai [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h2ivq2/looking_for_a_hitman_movie_with_style_and_depth/)
4. The Limits of Control [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h2ivq2/looking_for_a_hitman_movie_with_style_and_depth/)
5. The American [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h2ivq2/looking_for_a_hitman_movie_with_style_and_depth/)
6. The Snowman (2017) [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h2ivq2/looking_for_a_hitman_movie_with_style_and_depth/)
7. The Girl with All the Gifts [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1fbm0qx/recommendations_for_psychological/)
8. Children of Men [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1fbm0qx/recommendations_for_psychological/)
9. Coherence [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
10. Incendies [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
11. Planet of the Apes [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
12. Moon [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
13. Minority Report [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
14. The Sixth Sense [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
15. The Prestige [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
16. The Lobster [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
17. Being John Malkovich [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
18. Jacob's Ladder [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
19. Arlington Road [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
20. Frequencies [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
21. Everything Everywhere All at Once [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
22. The Secret in Their Eyes [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
23. I See You [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
24. Heretics [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
25. Nine Queens [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1inc2tl/nonscary_movies_with_a_twistmindfck/)
