# Movies app api source code.

This project is a simple REST API that allows a registered user to view the most popular movies in theaters.
The user can add the movies he wants to a favorites list.

### Requirements

- Install [Docker](https://docs.docker.com/engine/install/).
- Install [docker compose](https://docs.docker.com/compose/install/).
- Sign up to [The Movie DB](https://www.themoviedb.org/) and generate an API Key.
- Change `.env` file:
  - Set the environment variables in the file.
    - `JWT_SECRET=<your-private-key>`
    - `API_KEY=<your TMDB api_key>`


### Endpoints

*URL BASE*

  - Development: [http://localhost:3000](http://localhost:3000)

| METHOD   | URL                                | DESCRIPTION                              |
| ---------|:----------------------------------:|:----------------------------------------:|
| POST     | api/users/                         | Create an user                           |
| POST     | api/auth/login                     | Login user and get JWT token             |
| GET      | api/movies/popular                 | Get popular movies                       |
| GET      | api/movies?id                      | Get the primary information about a movie|
| GET      | api/movies/now_playing             | Get a list of movies in theatres         |
| POST     | api/movies/favorites/{user_id}     | Create a user favorite movie             |
| GET      | api/movies/favorites?user_id       | Get a list of user favorite movies       |
| DELETE   | api/movies/favorites/{user_id}     | Delete an user favorite movie            |

### Examples

**Create User Request**

`path: /api/users`

```
{
    "name": "myName",
    "username": "myUsername",
    "password": "myPass",
    "email": "mi-email@mail.com"
}
```

**Login Request**

`path: /api/auth/login`

```
{
    "username": "myUsername",
    "password": "123456"
}
```

*Response*:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}

```

**Create Favorite Movie Request**

`path: /api/movies/favorites/1`

```
{
    "name": "Test",
    "movieId": 123456
}
```

## Run App

**Development mode in docker container:**
Run command: `docker-compose up --build`

 **Run Unit tests:**

`docker-compose build && docker-compose run --rm app sh -c "npm run test"`
or Execute Linux script : `./run_test.sh`
