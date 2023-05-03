
# Pokemon Team Builder

Welcome to the Pokemon Team Builder application! The Pokemon Team Builder app is designed to house competitive resources in a comprehensive application to provide one stop for learning, team building, and analytics. Technologies I explored:



## App Walk-Through!

 - PokeAPI
 - Material UI
 - React/Node/PostgresSQL

| Pokemon Team Builder |
| :---: |
| Home/Register |
| Users are routed to the home page to register a new account or can navigate to the register page by clicking the register button. |
|  <img width="50%" src="screenshots/home.png"> |
|  <img width="50%" src="screenshots/register.png"> |
||
| Login |
| Users supply their credentials on this page to log in. |
| <img width="50%" src="screenshots/login.png"> |
||
| Main Page |
| On Login, users will land on the the build page. On this page they can open create a new team by clicking the "Create New Team" button, open the shelf navigation by clicking the "hamburger" button, or log out. Lets create a new team by clicking the "Create New Team" button! |
| <img width="50%" src="screenshots/main-page-empty.png"> |
||
| Add Pokemon Page |
| Users can add pokemon to their team from a list of every (base form) pokemon. To add a pokenon click the "Add" button within their card. Up to 6 pokemon can be added to a team. Lets add Charizard! |
| <img width="50%" src="screenshots/create-team-pokemon-menu-open.png"> |
||
| Build Team Page - Charizard Selected |
| Charizard has now been added to the team, but the team will not be saved until we click the save button. However, a pokemon must have at least one "move" selected in order to be saved. Charizard currently has zero. lets click the "edit" button to select some moves! |
| <img width="50%" src="screenshots/create-team-charizard-selected.png"> |
||
| Edit Pokemon Moves Page - No Moves Selected |
| The edit pokemon moves page presents users with a list of every possible move a pokemon can learn. Users can add up to 4 moves to the pokemon by clicking the "add" button on a move |
| <img width="50%" src="screenshots/edit-charizard-no-moves.png"> |
||
| Once the desired moves are selected the user clicks save to return to the Create Team Page |
| <img width="50%" src="screenshots/charizard-edit-full-moves.png"> |
||
| Build Team Page - Charizard with moves Selected | 
| Charizard now has selected moves added and can be saved at any time. However, lets keep adding more pokemon to the team!|
| <img width="50%" src="screenshots/charizard-team-select-full-moves.png"> |
||
| Build Team Page - Full Team |
| We have now added 6 pokemon to the team each with all moveslots populated. This team will NOT be saved through refresh until the "Save Team" button is clicked. Saving the Team with the save team button will permanently write the team to the database. Lets Save the team! |
| <img width="50%" src="screenshots/full-team-selected.png">  |
||
| Name Team Alert |
| Users will be prompted to chose a name for their team upon save. |
| <img width="50%" src="screenshots/Name-Team.png">|
||
| Build Team Page - New Team Created |
| Viola! The new team is saved and reflected on the build team page. But the fun doesn't end there. Let's click the hamburger to bring up the sidebar navigation! |
| <img width="50%" src="screenshots/New-Team-Created.png"> |
||
| Navigation Bar |
| Users can navigate between the Build, Analyze, Help, and Info pages using the sidebar. More Features are slated to be added in the future including extra analytics and exporting teams via textfile. Lets Navigate to the Analyze page!
| <img width="50%" src="screenshots/side-bar-navigation.png"> |
||
| Analyze Team Page |
| The Teams are now transformed from building mode into single buttons that can be clicked to provide full type matchup analysis. Let's click our newly built team to have it analyzed for weaknesses. |
| <img width="50%" src="screenshots/Analyze-Team-List.png"> |
||
| Type Chart Analysis |
| To understand this page one must have some knowledge of pokemon. Pokemon have elemental weaknesses and resistances that play out much like a game of rock paper scissors. This chart shows which pokemon have which weaknesses and resistances. It also aggregates those weaknesses and resistances into a totals chart to give the user a complete view of their teams weakness profile. This second chart is arguably the most useful when balancing a teams weaknesses. |
| <img width="50%" src="screenshots/Type-Chart.png"> |
||
| Help Page |
| Navigate to this page with the side bar to find a quickstart users guide |
| <img width="50%" src="screenshots/about-page.png"> |
||
| Info & Credits Page |
| Navigate to this page with the side bar to show technologies used and creator credits & special thanks |
| <img width="50%" src="screenshots/Information-credits.png"> |








## Deploy the App Yourself!

- Fork or Clone or click the `Use this Template` button, and make a copy to your personal account.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `pokemon-team-builder` and run the commands in the database.sql file.

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

