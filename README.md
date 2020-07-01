# Idle Mobster

Mafia themed text-based idle/upgrade game written in Vuejs. This project was a learning excersise for me to learn Vuejs and I'm very fond of idle games. Vue turned out to be a perfect library for this and I'll definitely use it for other projects as well.

In addition to learning Vue I wanted to become more familiar with itch.io, so the game has been published and can be played at https://kek91.itch.io/idle-mobster

If you have any questions or improvement suggestions please submit an issue here on Github or in the discussion board on itch.io.
Pull requests are also welcome, but please submit an issue first (so you don't waste your time on something I strongly disagree with, although I'm open for many suggestions).

The project uses MIT license so you are free to do whatever you please, but I would greatly appreciate a link to this github repo if you use it in other projects. Thank you :)

## Build instructions

### Backend

1. Setup Google Firebase with the following tables:
   1. **users**: email, name, rank, prestige, data, ts
   2. **forum**: ts, user, email, cat, msg

### Frontend

1. Clone repo
2. Run `npm install` to install dependencies
3. Rename `src/components/firebaseclient.default.js` to `src/components/firebaseclient.js` and insert your Firebase API keys etc
4. Run `npm run serve` to start a webserver then play the game at `localhost:8080` in your browser.
5. Run `npm run build` to create a dist folder ready for upload to your webserver



## Credits

### Development / game design

- [kek91](https://github.com/kek91)


### Graphics

- Icons: Fontawesome
- Weapons: knik1985 - https://opengameart.org/content/guns-wwii
- Cars: The car images are just placeholders. They were found on Google image search filtering by "allowed for commercial editing" (so most are from Wikipedia).

### Sounds

- Background music: Acid Trumpet by Kevin MacLeod
  - Link: https://incompetech.filmmusic.io/song/3340-acid-trumpet
  - License: http://creativecommons.org/licenses/by/4.0/
