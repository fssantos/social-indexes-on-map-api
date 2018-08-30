# exerciseback

# Usage

`npm install`

`npm run dev`

# Database usage
You should also install knex cli command if you want to run the migrations:

`npm install knex -g`

Now, to create MySQL tables:

`knex migrate:latest`

# Database design
On MySQL database three tables were created: user, movie, rental.

User table stores email, name and password;

Movie table stores title, director and quantity (used to control rentals);

Rental table stores rental transactions using user_id and movie_id as foreign keys. This table is used basically to track rentals;

# API DOCUMENTATION

Routes related to `Auth`:

`PUT localhost/login` 

Returns a JWT token used to identify user in the next sessions. For this example considering the fact it's an exercise there is no need to send the token each time on every route. You can check the token authentication working on the `GET /localhost/login/secret` below on this document.
| Body | Description |
| ------ | ------ |
| email | String: user email to be authenticated |
| password | String: user password |

`POST localhost/signup` 
| Body | Description |
| ------ | ------ |
| name | String: user name |
| email | String: user email |
| password | String: user password |

`GET localhost/logout` 

| Body | Description |
| ------ | ------ |
| Authentication | String: JWT token |

Important: the JWT token is not required but a good idea since we can track users logout once we have their token.

Routes related to `Movies`:

`GET localhost/movies` 
| Body | Description |
| ------ | ------ |
|  |  |

`GET localhost/movies/search/q=YOUR QUERY` 
| Parameters | Description |
| ------ | ------ |
| YOUR QUERY | String: movie title to search |
