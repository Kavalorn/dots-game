# Dots Game


This project aims to recreate a game called "Dots" that I used to play in school. The game involves two players who take turns placing dots on a grid. When a player surrounds the opponent's dots, the enclosed area is filled (only if it contains the opponent's dots). Points are awarded based on the number of opponent's dots covered by the filled area. The game ends when one player surrenders or when there is no more space left to place a dot or when the time will end.


## Project Goals:
1. Create an application that can maintain its own synchronized state between clients without a server.
2. Understand the pros and cons of this approach.
3. Experiment with Feature-Sliced Design.
4. Play Dots with friends through my own super-duper-mega application :)


## Roadmap:
- [ ] One-on-one game
- [ ] Game with AI
- [ ] Lobby
  - [ ] Create a 1v1 game
  - [ ] Create a 1v1 game with AI
  - [ ] Settings: Game time
  - [ ] Settings: Number of cells (limited)
- [ ] Spectators
  - [ ] Ability to watch a player's game session (with display)
  - [ ] Ability to propose a game to another player if they are not playing and automatically create a session upon acceptance


### Prerequisites
- Node.js
- npm