import express, { Request, Response } from 'express'

const router = express.Router()

// @route GET api/profile/test
// @description tests profile route
// @access private

router.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'profiles works' })
})

export default router
