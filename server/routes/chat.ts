import { Router } from 'express'
import {prisma} from "../index";
import {bot} from "../../bot/index"
const router = Router()

router.get("/:id", async (req, res) => {
    const count = await prisma.chat.count({
        where: {
            id: Number(req.params.id),
            public: true
        }
    })
    if (count === 0) {
        res.status(200).send({ public: false, data: "No public chat found"})
    } else {
        const chat = await prisma.chat.findFirst({
            where: {
                id: Number(req.params.id),
                public: true
            },
            select: {
                chatId: true
            }
        })
        const telegramChat = await bot.api.getChat(String(chat?.chatId))
        // @ts-ignore
        const link = telegramChat["invite_link"]
        if(link) {
            res.status(200).send({ public: true, data: link })
        }
        else res.sendStatus(500)
    }
})

export default router