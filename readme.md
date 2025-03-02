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

<details>

<summary>example output</summary>

```
RECS:
-----
The Thing
Starship Troopers
Goodfellas
The Adventures of Buckaroo Banzai Across the 8th Dimension
Dazed and Confused
Midnight Cowboy
Shaun of the Dead
Rambo 2
Terminator 1
Grosse Point Blank
Heat
Dog Day Afternoon
The Strangers
Sicario
Hell or High Water
The Guest
True Romance
Rear Window
Game Night
Talented Mr Ripley
Collateral
Nobody
Sisu
The Outfit
Emily the Criminal
The Stranger
Coherence
Brawl in Cell Block 99
The Way of the Gun
Children of Men
Se7en
Pusher
Victoria
Birdman
The Man From Uncle
Looper
Don't Breathe
Nightmare Alley
The Lookout
Antitrust
Swordfish
Non-Stop
Boiler Room
A Color Out of Space
The Prestige
Get Out!
The Babadook
```

</details>
