import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../models'
import customValidator from '../helpers/customValidators'
import { endpoints } from '../config'
import { Types } from 'mongoose'
import passport from 'passport'

// @desc Sign up user
export const signUpUser = [
  body('email')
    .trim()
    .escape()
    .exists()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .custom(customValidator.isEmailValid)
    .withMessage('Email is taken'),
  body('username')
    .trim()
    .escape()
    .exists()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long.')
    .custom((value: string) => value.toLowerCase())
    .custom(customValidator.isUsernameValid)
    .withMessage('Username is taken'),
  body('password')
    .trim()
    .escape()
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 3 })
    .withMessage('Password must be at least 3 characters long.'),
  body('confirmPassword')
    .trim()
    .escape()
    .exists()
    .custom((value, { req }) => req.body.password === value)
    .withMessage("Passwords don't match."),

  (req: Request, res: Response) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })

    const errors = validationResult(req)
    switch (!errors.isEmpty()) {
      case true:
        res.status(401).json({
          message: 'Sign up failed',
          user: user,
          errors
        })
        return
      default:
        user.save((err) => {
          if (err) {
            res.status(401).json({
              message: 'Sign up failed(DB)',
              user: user,
              errors: err
            })
          } else {
            res.status(201).json({
              message: 'Sign up successful',
              user: user
            })
          }
        })
    }
  }
]

// @desc Sign in user
// @route POST /api/users/sign-in
// @access Public
export const signInUser = [
  body('email')
    .trim()
    .escape()
    .exists()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid Email'),
  body('password').trim().escape().exists().withMessage('Password is required'),

  (req: Request, res: Response) => {
    const errors = validationResult(req)
    switch (!errors.isEmpty()) {
      case true:
        res.json({
          message: 'Sign in error '
        })
        return
      default:
        passport.authenticate('local', { session: false }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              message: 'Incorrect email or password',
            })
          }
          req.login(user, { session: false }, (err) => {
            if (err) {
              return res.status(500).json({
                message: 'Server Error',
                error: err
              })
            }
            return res.status(200).json({
              _id: user.id,
              email: user.email,
              token: generateToken(user._id)
            })
          })
          // NOTE Unknown
          return
        })(req, res)
    }
  }
]
// Generate  JWT
const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, endpoints.JWT_SECRET, {
    expiresIn: '30d'
  })
}
