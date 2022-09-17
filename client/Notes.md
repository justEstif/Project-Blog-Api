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

  - [X]create nav bar
    - [ ]Logo -> link to home page
  - [ ] User icon when not logged in
  - [ ] Logout icon when logged in (with username)

2. Create login page
  - [ ] react router
  - [ ] zustand
  - [ ] form -> react form hook + axios
  - [ ] keep user in context that is accessible app wide

3. Create post page
4. Create comment form in post page
6. Create owner website
  1. Create owner create, edit post page


```js
{data.length === 0 ? (
  <p>loading</p>
) : (
  data.map((post, i) => <p key={i}>{post.title}</p>)
)}
```

highlight js: <https://highlightjs.org/>


