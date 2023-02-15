import {Composer} from "grammy";
import prisma from "../lib/prisma";
export const statistics = new Composer()

statistics.on("message:sticker", async ctx => {
	const data = {
		chatId: ctx.chat.id,
		senderId: ctx.message.from.id,
		stickerFileId: ctx.message.sticker.file_id,
		stickerUniqueId: ctx.message.sticker.file_unique_id
	}
	await prisma.stickersStat.create({
		data: data
	})
})

statistics.hears(/^!топстик/i, async ctx => {
	const data: any[] = await prisma.$queryRawUnsafe(`SELECT stickerUniqueId as id, stickerFileId as file, count(*) as count FROM StickersStat WHERE chatId=${ctx.chat.id} GROUP BY stickerUniqueId ORDER BY count DESC LIMIT 1`)
	await ctx.reply(`
	Самый используемый стикер, который был отправлен в этом чате ${data[0].count} раз:
	`)
	await ctx.replyWithSticker(data[0].file)
})