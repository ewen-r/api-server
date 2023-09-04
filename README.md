# api-server

REST API server written with..
* Node JS framework
* Javascript
* Express
* swagger-jsdoc for creating the swagger docs.
* swagger-ui-express for creating a swagger interface/test route.


## Endpoints
* /
  * Redirects to /api-docs.
* /api-docs
  * Documentation and user interfaces.
* /test
  * Dummy data for testing purposes.
* /test_auth
  * Dummy data for testing purposes. Requires authorisation.
* /user
  * Register, login, logout interfaces for managing authentication.
* /quiz
  * Interfaces for managing quizzes.


## /
Redirects to /api-docs


## /api-docs
Documentation and user interfaces.

## /test
Dummy data for testing purposes.
Implements a few basic REST interfaces (see api-docs).

## /test_auth
Dummy data for testing purposes.
Implements a few basic REST interfaces (see api-docs).
Requires authenticated and authorised user credentials.

## /user
* Register a new user.
* Login for existing user.
* Logout.
* Refresh authentication token.

## /quiz
* Retrieve a summary list of quizzes.
* Retrieve a specific instance of quiz.

##