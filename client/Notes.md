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


