import {Composer} from "grammy";
import prisma from "../lib/prisma";
import {MarlaContext} from "../utils/types/context";
import {onlyForChats} from "../utils/messages";
const composer = new Composer<MarlaContext>()

composer.on("message:sticker", async ctx => {
	if(!ctx.isPrivate) {
		const data = {
			chatId: ctx.chat.id,
			senderId: ctx.message.from.id,
			stickerFileId: ctx.message.sticker.file_id,
			stickerUniqueId: ctx.message.sticker.file_unique_id
		}
		await prisma.stickersStat.create({
			data: data
		})
	}
})

composer.hears(/^!(топстик)|(topstic)|(топстикер)|(тстикер)/i, async ctx => {
	if(ctx.isPrivate) return ctx.reply(onlyForChats)
	const data: any[] = await prisma.$queryRawUnsafe(`SELECT "stickerUniqueId" as "id", "stickerFileId" as "file", count(*) as "count" FROM "StickersStat" WHERE "chatId"=${ctx.chat.id} GROUP BY "stickerUniqueId" ORDER BY "count" DESC LIMIT 1`)
	if(data.length > 0) {
		await ctx.reply(`
	Самый используемый стикер, который был отправлен в этом чате ${data[0].count} раз:
	`)
		await ctx.replyWithSticker(data[0].file)
	} else {
		await ctx.reply("В чате не было ни одного стикера")
	}
})

export default composer;