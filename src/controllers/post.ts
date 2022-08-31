import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import { Post } from '../models/'

// @desc Return posts in desc order by publication_date
// @route GET /api/posts
// @access Private
export const getPosts = asyncHandler(async (_, res) => {
  const posts = Post.find().sort({ publication_date: 1 })
  res.status(200).json(posts)
})

// @desc Set a post
// @route POST /api/posts
// @access Private
export const setPosts = [
  // TODO: Handle post set/create
  body('title', 'Title must not be empty.')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('The title must be at least 3 characters long.'),
  body('body', 'Body must not be empty.')
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage('The body must be at least 10 characters long.'),
  body('summary', 'Summary must not be empty.')
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage('The summary must be at least 5 characters long.'),
  body('tags')
    .isArray({ min: 1 })
    .withMessage('At least one tag must be passed'),
  body('tags.*')
    .trim()
    .escape()
    .isString()
    .withMessage('Every tag must be a valid string')
    .isLength({ min: 3 })
    .withMessage('Every tag must be at least 3 characters long'),

  (req: Request, res: Response) => {
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      summary: req.body.summary,
      tags: req.body.tags
    })
    const errors = validationResult(req)
    switch (!errors.isEmpty()) {
      case true:
        res.status(401).json({
          message: 'Failed to save post',
          errors: errors,
          post: post
        })
        return
      default:
        post.save((err) => {
          if (err) {
            res.json(400).json({
              message: 'Error when saving post',
              errors: err,
              post: post
            })
          } else {
            res.status(200).json({
              message: 'Post save to db',
              post: post
            })
          }
        })
    }
  }
]

// @desc Update a post
// @route PUT /api/posts/:id
// @access Private
export const updatePost = asyncHandler(async (req, res) => {
  // TODO: Handle post update
  res.status(200).json({ message: `PUT: update post ${req.params.id}` })
})

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private
export const deletePost = asyncHandler(async (req, res) => {
  // TODO: Handle post delete
  res.status(200).json({ message: `Delete: delete post ${req.params.id}` })
})
