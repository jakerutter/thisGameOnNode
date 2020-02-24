# Space Raiders

A game I made using node.js and socket.io. The game is a space themed mix of Battleship and Chess. Each player will select units, place a base on the game board & place their units adjacent their base location. Players will then take turns moving their space ships in an attempt to locate and destroy the other player's ships or base before their ships or base are destroyed.

## Current Status

Hosted in Heroku. Happy path is playable with some bugs.
Working to remove bugs and improve functionality.

### Adding automated cypress tests
These are for regression prevention and help speed up future development with data entry and feature testing. Next step on this front is to add stubs that mock a second user logging on and entering a game with the initial user. End goal is to test a game end to end with cypress tests.
-- This idea now seems unlikely because cypress cannot run two instances at once. This constraint makes logging in as two players and "test playing" a game end to end much more complex.

### Chrome Node.js debugger
This has been a very handy tool in debugging this application.


### Acknowledgments

* To Ghost and Bones, my thanks for help along the way. These guys were great in assisting me with the v.1 Local Edition of this game.
To my wife who has let me show her a thousand iterations.
