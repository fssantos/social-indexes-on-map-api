# exerciseback

Guys, you can find the API documentation right bellow on this document on the section API DOCUMENTATION.

# Database usage

Start xampp (SQL server) using:

`cd /opt/lampp`
`sudo ./xampp start`

Create the database using:

`npm run createdb`


You should install knex cli command if you want to run the migrations:

`npm install knex -g`

Now, to create MySQL tables:

`knex migrate:latest`

Now, to populate MySQL tables with some fake data:

`knex seed:run`

# Usage

`npm install`

`npm run dev`



# Database design

On MySQL database three tables were created: user, movie, rental.

`User table` stores email, name and password;

`Movie table` stores title, director and quantity (used to control rentals);

`Rental table` stores rental transactions using user_id and movie_id as foreign keys. This table is used basically to track rentals;

# API DOCUMENTATION

Routes related to `Auth`:

`PUT localhost/login` 

Returns a JWT token used to identify user in the next sessions. For this example considering the fact it's an exercise there is no need to send the token each time on every route. You can check the token authentication working on the `GET /localhost/login/secret` below on this document.

| Body | Description |
| ------ | ------ |
| email | String: user email |
| password | String: user password |

| Returns | Description |
| ------ | ------ |
| 200 | OK |
| 401 | bad user or bad password  |



`POST localhost/signup` 

| Body | Description |
| ------ | ------ |
| name | String: user name |
| email | String: user email |
| password | String: user password |

| Returns | Description |
| ------ | ------ |
| 200 | OK |
| 401 | already exists |

`GET localhost/logout` 

| Body | Description |
| ------ | ------ |
| Authentication | String: JWT token |

| Returns | Description |
| ------ | ------ |
| 200 | OK |

Important: the JWT token is not required but it's a good idea since we can track users logout once we have their token.

`GET localhost/login/secret`

Page just to test JWT token. If user has a token he will be able to see the return, otherwise he will see "Unauthorized". You can get the token making a GET /login using Postman. After that, just replace the field as show bellow in order to test it.

| Header | Description |
| ------ | ------ |
| Authorization | String: JWT token returned on login |

| Returns | Description |
| ------ | ------ |
| 200 | OK |
| 401 | Unauthorized |


Routes related to `Movies`:

`GET localhost/movies` 

Return all movies

| Returns | Description |
| ------ | ------ |
| 200 | OK |

`GET localhost/movies/search/q=YOUR QUERY` 

Return a movie in which title === YOUR_QUERY. Maybe a better approach would be a fuzzy filter but for this exercise it only returns one movie.

YOUR_QUERY should be in the following format: "UmTiraNoJardimDeInfancia".

| Parameters | Description |
| ------ | ------ |
| YOUR QUERY | String: movie title to search |

| Returns | Description |
| ------ | ------ |
| 200 | OK |

Routes related to `Rents`:

`GET localhost/rents` 

Return all rents. A possible approach is to return only rents on which foreign key user_id refers to user JWT token. On the code there is some comments suggesting how to implement like in the header below:

| Headers | Description |
| ------ | ------ |
| Authorization | String: JWT Token |

| Returns | Description |
| ------ | ------ |
| 200 | OK |

`POST localhost/rents` 

Create a rent on database which status = rented (means the user rented and therefore the movie is with him). It automatically updates movie_id model quantity using `SELECT ... FOR UPDATE` to avoid concurrency on database. 

Again, here we should recognize the user through its JWT token and validates it (see header below). Right now it always create the rent and says it belongs to user on which id === 1;

| Body | Description |
| ------ | ------ |
| movie_id | String: Movie user is renting |

`PUT localhost/rents/id` 

Updates rent status (when the rental shop administrator needs for example). It automatically updates movie_id model quantity using `SELECT ... FOR UPDATE` to avoid concurrency on database.

| Params | Description |
| ------ | ------ |
| id | String: Rental id |

| Body | Description |
| ------ | ------ |
| status | String: "rented" or "returned" |

| Returns | Description |
| ------ | ------ |
| 200 | OK |
| 409 | Conflict |

# Tools

This exercise uses Express as server routines, MySQL as database, Knex as database middleware,  Passport as authenticator and ES6 experimentation modules and Postman in order to verify requests and simulate Body and Headers.



