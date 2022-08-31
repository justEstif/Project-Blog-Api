import { Router } from 'express'
import { getPosts, setPosts, deletePost, updatePost } from '../controllers/post'

const router = Router()
router.route('/').get(getPosts).post(setPosts)
router.route('/:id').put(updatePost).delete(deletePost)

export default router
