import express, { Request, Response } from 'express'

const router = express.Router()

// @route GET api/posts/test
// @description tests post route
// @access Public

router.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'user_auth works' })
})

export default router
