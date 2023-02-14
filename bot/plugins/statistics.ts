import {Composer} from "grammy";
import prisma from "../lib/prisma";
export const statistics = new Composer()

statistics.on("message:sticker", async ctx => {
	// TODO insert sticker record into table
	// prisma.stickersStat.create({
	// 	data: {
	// 		chatId: ctx.chat.id,
	// 		senderId: ,
	// 		stickerId: ctx.message.sticker.
	// 	}
	// })
})