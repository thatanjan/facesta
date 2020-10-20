import express, { Request, Response } from 'express'

const router = express.Router()

// @route GET api/profile/test
// @description tests posts route
// @access private

router.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'posts works' })
})

export default router
