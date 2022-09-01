import { Request, Response, RequestHandler } from 'express'
import { body, validationResult } from 'express-validator'
import { User } from '../models'
import customValidator from '../helpers/customValidators'

// @desc Sign up user
// @route POST /api/users
// @access Public
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
export const signInUser: RequestHandler = (_, res) => {
  res.status(200).json({ message: 'User Sign In(test)' })
}
