import { Router } from 'express'
import { signUpUser, signInUser } from '../controllers/user'

const router = Router()
router.post('/', signUpUser)
router.post('/sign-in', signInUser)

export default router
