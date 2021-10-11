# SEI-Project-1---The-game

//! space invaders

//? create player
// prompt which will ask for player name and will add it to the game

//? create grid
// decide how big grid will be (use example from Charlotte's cat game)

//? create space ship
// using gif or image to create space ship (if enough time let player choose space ship)

//? controle ship to left right
// use example from cat grid game

//? give ship 3 lives
// if player will be hit 3 times by invaders game over

//? create invaders
// in the grid has to apear inavders in some squers and they have to move from the side to side and towards bottom (player ship)

//? make ship shoot
// think how to make ship shot (maybe try to track where ship is and from that position add class of bullet to each square in the line (by adding index to it))

//? when shot reach invader, invader is destroyed
// when bullet class meet with invader class, invader and bullet class desapear and points are added to player (try to add some visual effect)

//? invaders moving right left and going down
// move the invadors class from the sides to the bottom (if any invador reach last line of indexes gme ends,player looses)

//? invaders throwing random bombs on the ship
// bombs should work similar to bullet class, just working oposit direction and when bomb class meet ship class player looses life, if that happened 3rd time player looses

//? when all invaders removed game over, player wins
// if no invaders class left on the grid, player wins (keep track how many invaders left on the screen in some variable)

//? create win board 
// if no invaders class left on the grid players get the prompt that he won and get his score (maybe time played if will have enough time)

//? create lose board
// if player will be hit 3 times with bomb class or invaders class will reach bottom of the grid player loose

//? best score board as a bonus
// if enough time create best score board with best score name of player and time(if enough time)
