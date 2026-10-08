import express from 'express'

const router = express.Router()

router.post('/', (req, res) => {
  res.status(410).json({ message: 'Direct API uploads are disabled; use the configured image provider.' })
})

export default router
