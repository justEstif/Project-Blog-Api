# Client side

## Using

- React (vite.ts)
- Axios
- react form hook
- tailwind + tailwindstyledcomponents(npm package)

## Project Structure

- pages
- components
- context

## Pages:

- HomePage
  - GET /api/posts
- PostPage
  - GET /api/posts/:id
- RegisterPage
  - POST /api/register
- LoginPage
  - POST /api/login
- LogoutPage
  - POST /api/logout
- OwnerPage
  - UPDATE /api/posts/:id
  - DELETE /api/posts/:id

## Components

- form for login and register
  - react-form-hook

## Global Context:

- current user

## TODO

model: <https://hugotex.vercel.app/>

1. make home page

  - [X] create nav bar
    - [x] Logo -> link to home page
  - [ ] User icon when not logged in
  - [ ] Logout icon when logged in (with username)

2. Create login page
  - [ ] react router: <https://www.theodinproject.com/lessons/node-path-javascript-router>
  - [ ] zustand
  - [ ] form -> react form hook + axios
    - context login: <https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10>
    - create a custom hook `useAuthListener` -> for checking login/logout user and returning user
  - [ ] keep user in context that is accessible app wide
  <!-- TODO: Move the api related func to services/api.ts -->
    - requests objects for the url to be sent to the api
    - create functions that work with the api

3. Create post page
4. Create comment form in post page
6. Create owner website
  1. Create owner create, edit post page

highlight js: <https://highlightjs.org/>


## User store

- logginUser function
  - function to get response from api
    - getResponse(request) => response ??
  - function to confirm api function ->
    - <!-- TODO: Fix the backend response if not good  -->
  - function to change the currentUser store based on the returned value
- registerUser function
- logoutUser function
- currentUser
  - token
  - user
    - username
    - id
    - email
    - owner

what does it mean to log in a user
  - get the user info
  - get response from api
  - get the user and token
  - set the user and token in the store to that value
    - ther need to be some initial user and token in the store
  - return some message of success
  - redirect to homepage
    - the homepage checks is there is a token, and if there is sends it with the useAuthListener request
  - prevent logging or registering

functions
  - `logInUser`
    - calls api /api/login
      - if success
        - get user and token
        - sets the user and token
      - else
        - shows error message to user
