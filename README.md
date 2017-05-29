# Card Game project

## Final Product (Version 1.0.0)

!["fullpage"](/documentation/pic2.png)

This is the full page, when logged in, the login and register buttons will change to play and logout and the user name will be displayed below to them.

Clicking play will create a new match room if there are no open matches available. Matches with player information will be displayed on the left in the games container

!["registration"](/documentation/pic3.png)

Clicking on the registration button will open up a modal form to allow user registration

!["cardbattle"](/documentation/pic1.png)

Users can battle other users in our very own custom designed card game. In this version, upon registration, the user is assigned a randomly built deck using the cards we have available.

In a game, players will take turn placing down creature cards which contain a point value, and attack values on all 4 sides. At the beginning of each turn, the player will gain points equal to the total of their creatures. After 7 turns, the player with the most points wins the match.  When creature cards are placed adjacent to enemy creatures, they will start a battle, after damage calculation, creatures with 0 or less values will be destroyed.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- bcrypt 1.0.2
- body-parser 1.15.2
- cookie-session 2.0.0
- ejs 2.4.1
- express 4.13.3
- knex 0.11.7
- pg 6.0.2
- socket.io 2.0.1





