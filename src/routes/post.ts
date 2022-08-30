import { Router } from 'express'
import {
  get_posts,
  set_posts,
  deletePost,
  update_post
} from '../controllers/post'

const router = Router()
router.route('/').get(get_posts).post(set_posts)
router.route('/:id').put(update_post).delete(deletePost)

export default router
