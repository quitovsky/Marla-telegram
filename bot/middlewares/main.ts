import {MarlaContext} from "../utils/types/context";
import {NextFunction} from "grammy";
import prisma from "../lib/prisma";

export async function marlaMiddleware(ctx: MarlaContext, next: NextFunction) {
	ctx.isPrivate = ctx.chat?.id === ctx.message?.from.id
	if(ctx.message && ctx.chat && !ctx.isPrivate) {
		const count = await prisma.chat.count({
			where: {
				chatId: ctx.chat.id
			}
		})
		if (count === 0) {
			console.log('Registration')
			await prisma.chat.create({
				data: {
					chatId: ctx.chat.id
				}
			})
		}
	}
	await next()
}