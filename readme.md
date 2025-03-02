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

## example output

1. The Invitation [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
2. The Innocents [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
3. Hereditary [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
4. Midsommar [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
5. The Witch [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
6. Creep [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
7. Cure [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
8. The Mothman Prophecies [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
9. The Shining [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
10. Prince of Darkness [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
11. Barbarian [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
12. The Fall of the House of Usher [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
13. The Brood [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
14. The Divide [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1avnhv6/looking_for_horror_movies_that_have_that_creeping/)
15. Mysterious Skin [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1ad6z6h/i_am_looking_for_very_very_dark_and_sad_films/)
16. A Clockwork Orange [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1ad6z6h/i_am_looking_for_very_very_dark_and_sad_films/)
17. The Joker [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1ad6z6h/i_am_looking_for_very_very_dark_and_sad_films/)
18. We Need to Talk About Kevin [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1ad6z6h/i_am_looking_for_very_very_dark_and_sad_films/)
19. Melancholia [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1ad6z6h/i_am_looking_for_very_very_dark_and_sad_films/)
20. A Scanner Darkly [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1ad6z6h/i_am_looking_for_very_very_dark_and_sad_films/)
21. Brazil [src](https://wwww.reddit.com/r/MovieSuggestions/comments/1ad6z6h/i_am_looking_for_very_very_dark_and_sad_films/)
