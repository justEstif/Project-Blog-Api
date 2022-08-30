import async_handler from 'express-async-handler'

// @desc Get all posts
// @route GET /api/posts
// @access Private
export const get_posts = async_handler(async (_, res) => {
  // TODO: Handle post get
  res.status(200).json({ message: `GET: get posts` })
})

// @desc Set a post
// @route POST /api/posts
// @access Private
export const set_posts = async_handler(async (_, res) => {
  // TODO: Handle post set/create
  res.status(200).json({ message: `POST: set/create a post` })
})

// @desc Update a post
// @route PUT /api/posts/:id
// @access Private
export const update_post = async_handler(async (req, res) => {
  // TODO: Handle post update
  res.status(200).json({ message: `PUT: update post ${req.params.id}` })
})

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private
export const deletePost = async_handler(async (req, res) => {
  // TODO: Handle post delete
  res.status(200).json({ message: `Delete: delete post ${req.params.id}` })
})
