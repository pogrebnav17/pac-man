```text
Author: Nika Pogrebna

Deployed website: https://pogrebnav17.github.io/pac-man-2/


Trello Board: https://trello.com/b/WSjePpGJ
(Each prototype and the tasks to accomplish it have the same color label)


Technologies used:
HTML, JavaScript, CSS, Bootstrap, JQuery, GIF and sound files (see ../gifs/ and ../sounds/ respectively), Trello Board


Your process/approach:
I first started planning the game by researching the actual Pac-man game, looking at their rules, and playing the game, then I wrote my user stories and created my first wireframe. Each sprint of the project contained a prototype that I wanted to accomplish (as described in ../documentation/prototypes/prototypes.md). On my Trello Board, I broke down each prototype into the steps I needed to do in order to get to the desired prototype (color coded). With each iteration of the game, I discovered bugs and new features that could fix and add. Keeping track of the prototypes helped a lot to keep me on track of completing the most important features of the game.


Future features:
1. Pac-man being able to eat the ghosts when where are frozen.
2. Mobile first enabled.
3. Allow users to login.
4. Use firebase to keep a record of user's best scores and display top 5 user's usernames and scores (allowing competition between users).
7. Add a maze.
8. Give Pac-man multiple lives.


Any bugs:
- User can pressed the space bar to "pause" the game during the countdown before the game actually starts


Your biggest wins and challenges:
Wins:
- Figuring out the chasing algorithm for the ghosts to know where Pac-man is
- Modularizing my code, so that when I wanted to add more ghosts I did not have to do a lot of major changes or have things break.
- Adding fruit and having the ghosts freeze when Pac-man wins  

Challenges:
- Making sure all of the overlaying elements were positioned correctly in relationship to parent and had correct z-index
- Timing the start of the game with the music
- Allowing the user to pause the game


The game you chose: Pac-man (slightly modified from original)


The rules of the game:
1. To pause/unpause the game press the SPACEBAR.
2. Use arrow keys to move Pac-man around.
3. To level up, you have to get to a certain number of points.
4. Get as many points as you can before the ghosts catch you! Ghosts speed up with each level!
5. Pac-man can run off the board where there is an escape door and return on the other side. Ghosts are confined to the board.
6. Cherries are worth 100 points and freeze the ghosts for 3 seconds.
7. You must get 1200 points to win!


Your process for turning that game into a web application (wireframes, blockers/issues that popped up):
I started of with playing around in HTML/JS/CSS to see if I can make a board and fill it with square divs the way I wanted to. Once I did that, I made wireframes of how I wanted my MVP and first prototype to look like. Once I got the visuals, I worked on functionality and fixing any bugs. After getting to a working MVP, I started styling the page more. After having the first couple prototypes, I mainly planned my work out on Trello with steps that I needed to accomplish the next prototype.

```
