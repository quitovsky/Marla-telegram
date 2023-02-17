import { Router } from 'express'
const router = Router()

router.get("/:id", async (req, res) => {
    res.sendStatus(200)
})

export default router