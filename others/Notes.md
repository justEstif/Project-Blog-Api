# Project: Blog API

## Instructions

1. Design your back end models and schemas.

   1. Models: think about the fields of the following models

      - User
      - Post
      - Comment

   2. Authentication

      - User
        - Is user logged in? What can they do?
        - Is user author || owner? What can they access?

2. Set up your express app, and define the models in mongoose.

3. Set up your routes and controllers.

- Think about RESTful organization for this one.
- Most of the examples in the previous lesson were centered around posts and comments so this shouldn’t be too tricky.
- You can test your routes however you want.
- Using curl in a terminal is one handy way, but it can be just as effective to use a web browser.
  - There are some platforms that allow you to send PUT and POST requests without needing to set up and fill out HTML forms. Postman is probably the most popular.

4. Once your API is working you can focus on your front-end code.

- Really, how you go about this is up to you. If you are comfortable with a front-end framework then go for it! If you’re happier using plain HTML and CSS that’s fine too.
- All you should have to do to get your posts into a website is to fetch the correct API endpoint and then display the results. Working with fetch and APIs from a front-end perspective is covered in this lesson<https://www.theodinproject.com/lessons/javascript-working-with-apis>

5. Create a second website for authoring and editing your posts.

- You can set this up however you like but the following features might be useful:
  - A list of all posts that shows whether or not they have been published.
  - A button to publish unpublished posts, or to unpublish published ones!
  - A ‘NEW POST’ form. If you want to get fancy, you could use a rich text editor such as TinyMCE.
  - The ability to manage comments (i.e. delete or edit them).
- How much work you want to put into the front-end code on this one is up to you.

## Models

### User

- email: string, required
- username: string, required
- `hashedPassword`: string, required
- owner: boolean, default false
  - author has access to the edit/publish front end
  - no-author can only access view/comment front end

### Posts

- title: string, required
- body: string, required
- summary: string, required
- tags: array of string, required, min 1
- `comment-ids` : array of comments, required
- published: boolean, default false, required
- publication-date: date,
  - set to date.now when published = true

### Comments

- `user-id`: string, default: id of the logged in user
- body: string, required, min length: 3
- comment-date: Date, default: Date.now, required

## Authentication

- `JWT` Token

- Owner:

  - can publish/unpublish/edit/remove posts
  - can remove comments

- Only logged in users can comment

## Packages: back-end

### Dependencies

- script
  - `npm i async compression dotenv helmet luxon mongoose ejs express-validator serve-favicon`

### Development Dependencies

- script:
  `npm i -D @types/async @types/compression @types/luxon @types/mongoose @types/serve-favicon concurrently`

### Middleware

- Helmet

```js
helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
})
```

## Mongoose Models

- The published date changes only when it becomes first published
  - It doesn't get updated again

## Routes

- /api:

  - /posts:

    - GET: get all posts
    - POST: create new post

    - /:id

      - GET: show/read post
      - PUT: update/edit post
      - DELETE: delete post
      - POST create/add post ??

    - QUESTION: Could I make this route dependent of the user?
      - if user -> take to posts/
      - if owner -> take to posts/admin

  - /users:

    - POST: sign up user

    - /sign-in

      - POST: sign in user
