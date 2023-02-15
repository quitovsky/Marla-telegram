import {MarlaContext} from "../utils/types/context";
import {NextFunction} from "grammy";
import {Message} from "../utils/entities/message";

export async function marlaMiddleware(ctx: MarlaContext, next: NextFunction) {
	ctx.isPrivate = ctx.chat?.id === ctx.message?.from.id
	if (ctx.message?.text) {
		ctx.m = new Message(ctx.message.text, ctx.message.from.first_name, ctx)
	} else {
		ctx.m = new Message("", "", ctx)
	}
	await next()
}