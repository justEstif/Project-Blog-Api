import { Types } from 'mongoose'
import { Request, Response, RequestHandler } from 'express'
import { body, validationResult, param } from 'express-validator'
import { Post } from '../models/'

// @desc Return posts in desc order by publication_date
// @route GET /api/posts
// @access Private
export const getPosts: RequestHandler = (_, res) => {
  Post.find()
    .sort({ publication_date: 1 })
    .exec((err, posts) => {
      if (err) {
        res.status(400).json({ message: 'Failed to get posts', error: err })
      } else {
        res.status(200).json({ posts: posts })
      }
    })
}

// @desc Set a post
// @route POST /api/posts
// @access Private
export const setPosts = [
  // TODO: BUG Check that the owner is making the post.
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
            res.status(400).json({
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
export const updatePost = [
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
  param('id').customSanitizer((value) => new Types.ObjectId(value)),

  (req: Request, res: Response) => {
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      summary: req.body.summary,
      tags: req.body.tags,
      _id: req.params.id
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
        Post.findByIdAndUpdate(req.params.id, post, { new: true }, (err) => {
          if (err) {
            res.status(400).json({
              message: 'Error when saving post',
              errors: err,
              post: post
            })
          } else {
            res.status(200).json({
              message: 'Post updated',
              post: post
            })
          }
        })
    }
  }
]

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private
export const deletePost = [
  param('id').customSanitizer((value) => new Types.ObjectId(value)),
  (req: Request, res: Response) => {
    const errors = validationResult(req)
    switch (!errors.isEmpty()) {
      case true:
        res.status(401).json({
          message: 'Failed to delete post',
          errors: errors,
          id: req.params.id
        })
        return
      default:
        Post.findByIdAndRemove(req.params.id).exec((err) => {
          if (err) {
            res.status(400).json({
              message: 'Failed to delete post',
              errors: errors,
              id: req.params.id
            })
          } else {
            res.status(200).json({
              message: 'Post delete',
              id: req.params.id
            })
          }
        })
    }
  }
]
