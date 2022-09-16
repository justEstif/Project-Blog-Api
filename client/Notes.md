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

  - create nav bar
    - Logo -> link to home page

```js
{data.length === 0 ? (
  <p>loading</p>
) : (
  data.map((post, i) => <p key={i}>{post.title}</p>)
)}
```
