# recommend me movies that i have <em><strong>NOT</strong></em> seen

**12/06/25: i now recommend gemini 3 thinking with an imdb export as recommendation engine**

**04/04/25: oai & google deep research totally ignore the exclusion list and recommend tons of excluded titles. i feel like a way to solve this would be some kine of tool that allows them to query a suggestion against an exclusion list with embeddings as part of the reasoning or research process.**

**03/08/25: exclusion lists work reliable with reasoning models. this change in model capabilites make this repo obsolete.**

asking llms for movie recs is great \
just you don't want to get recommended movies you've seen already \
so you list all the movies you've seen already \
models struggle to exclude them tho \
this project tries to solve this with a code-based check

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

1. [5/5] A Scanner Darkly [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h9j2dp/looking_for_movies_thatll_stick_with_me_long/)
2. [5/5] Synchronic [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
3. [5/5] The Quiet Earth [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
4. [5/5] Primer [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
5. [5/5] Moon [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
6. [5/5] Possessor [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
7. [5/5] Brazil [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
8. [5/5] Never Let Me Go [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
9. [5/5] The Arrival [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
10. [5/5] Coherence [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
11. [4/5] The Lobster [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h9j2dp/looking_for_movies_thatll_stick_with_me_long/)
12. [4/5] Perfect Blue [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h9j2dp/looking_for_movies_thatll_stick_with_me_long/)
13. [4/5] Sputnik [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
14. [4/5] Liquid Sky [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
15. [4/5] Lifeforce [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
16. [4/5] The Hidden [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
17. [4/5] Antiviral [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
18. [4/5] Infinity Pool [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
19. [4/5] Time Crimes [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
20. [4/5] After Yang [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
21. [4/5] I Am Mother [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
22. [4/5] What Happened to Monday [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
23. [4/5] Prospect [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
24. [4/5] Space Sweepers [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
25. [4/5] Resolution [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
26. [3/5] The Killing of a Sacred Deer [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h9j2dp/looking_for_movies_thatll_stick_with_me_long/)
27. [3/5] Under the Silver Lake [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hxkfkv/recommendations_for_movies_shows_in_the_field_of/)
28. [3/5] Sin City [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1h9j2dp/looking_for_movies_thatll_stick_with_me_long/)
29. [3/5] They Cloned Tyrone [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
30. [3/5] Spring [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
31. [3/5] Spectral [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
32. [3/5] Returner [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
33. [2/5] Blood Quantum [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hxkfkv/recommendations_for_movies_shows_in_the_field_of/)
34. [2/5] Infinity Chamber [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1dcr8uk/scifi_films_so_under_the_radar_that_they_never/)
