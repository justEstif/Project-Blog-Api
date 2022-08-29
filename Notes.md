# Project: Blog API

## Instructions

1. Design your back end models and schemas.

- For a simple blog with only a single author you might not need a user model, but you might want to set up authentication so that you can protect the editing functions with a username and password.
  - It might make sense to set up a minimal user model, even if you are the only user.
- Your blog should have posts and comments, so think about the fields you are going to want to include for each of those.

  - Are you going to require users to leave a username or email with their comments?
  - Are you going to display a date or timestamps for posts and comments?
  - Posts should probably have a title, but should comments?
  - A useful feature for a blog is the ability to have posts that are in the database but not published for the public to read. How might you designate published vs unpublished posts in your DB?

  - models:
    - user: author/not author
    - posts: published/not published
    - comments: username/email
  - Authentication:
    - are you the owner of this site?
    - are you logged in so that you may comment?

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
- password: string, required
- author: boolean, default false
  - author has access to the edit/publish front end
  - no-author can only access view/comment front end

### Posts

- published: boolean, default false
- author: string, required ?? -> not sure about this
- title: string, required
- body: string, required
- summary: string, required
- tags: array of string, required, min 1
- `commentsID` : array of comments

### Comments

- username: string, default: username of the logged in user
- body: string, required, min length: 3
- time-stamp: Date, default: Date.now

## Authentication

- JWT Token

- Author:
  - can publish/unpublish/edit/remove posts
  - can remove comments

- Logged in users:
  - can comment
