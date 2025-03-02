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

- config.ts
- user.txt : describe your movie preferences, likes, dislikes
- imdb.csv : imdb export of your check-ins list

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

## limitations

- not seen check works well most of the times, its code driven and not ai driven since llms are not v good at such tasks, so there are known edge cases like some calling 'Dune: Part One' just 'Dune', in which case there is no match
- duplicate recommendation could be improved
- currently just using prompt response instructions, prob better to migrate to actual tool / function calling

## example

### input

- avoid movies that are just at a single location, i prefer 'open world' kinda feel
- avoid movies that are too shaky, action with tons of cut scenes and fights and gun fire, it can have some, but should be a good balance with actual depth
- fucked up stuff is a plus, like black mirror, memento, existenz etc, david cronenberg
- avoid overly romance, sex is a plus but not overly relationship / love driven, heavy
- shouldn't feel too old, it's okay if it's older, but it shouldn't feel old, taxi driver is old but doesn't feel old, great movie
- shouldn't be a too femaleish theme like black swan
- shouldn't be a police or law heavy movie, it can be in there but shouldn't be the main theme
- no musicals, no documentaries, no black and white, no silent movies
- i like cyberpunk, scifi, mystery, thriller btw, not limited to but i like those

## output

1. Dune [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
2. The Thing [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
3. Moon [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
4. Pandorum [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
5. 12 Monkeys [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
6. Robocop [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
7. Terminator 2: Judgment Day [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
8. Underwater [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
9. Nope [src](https://wwww.reddit.com/r/MovieSuggestions/comments/10egbfw/sciif_movies_that_arent_sexual/)
10. The House That Jack Built [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hla1ge/any_extremely_fucked_up_and_disturbing_movies_to/)
11. Funny Games [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hla1ge/any_extremely_fucked_up_and_disturbing_movies_to/)
12. Dogtooth [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hla1ge/any_extremely_fucked_up_and_disturbing_movies_to/)
13. Ichi the Killer [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hla1ge/any_extremely_fucked_up_and_disturbing_movies_to/)
14. Event Horizon [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hla1ge/any_extremely_fucked_up_and_disturbing_movies_to/)
15. Mother [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hla1ge/any_extremely_fucked_up_and_disturbing_movies_to/)
16. Where Evil Lurks [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hla1ge/any_extremely_fucked_up_and_disturbing_movies_to/)
17. 8mm [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hla1ge/any_extremely_fucked_up_and_disturbing_movies_to/)
18. The Cell [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1eod8lm/im_in_the_mood_for_a_movie_that_really_makes_you/)
19. A Scanner Darkly [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1eod8lm/im_in_the_mood_for_a_movie_that_really_makes_you/)
20. Brazil [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1eod8lm/im_in_the_mood_for_a_movie_that_really_makes_you/)
21. The Void [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1eod8lm/im_in_the_mood_for_a_movie_that_really_makes_you/)
22. A Scanner Darkly [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1eod8lm/im_in_the_mood_for_a_movie_that_really_makes_you/)
23. Trainspotting [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hl431q/any_good_addiction_movies_of_the_2020s/)
24. T2 Trainspotting [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hl431q/any_good_addiction_movies_of_the_2020s/)
25. Uncut Gems [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1hl431q/any_good_addiction_movies_of_the_2020s/)
