import {MarlaContext} from "../utils/types/context";
import {NextFunction} from "grammy";
import {Message} from "../utils/entities/message";

export function marlaMiddleware(ctx: MarlaContext, next: NextFunction) {
	if (ctx.message?.text) {
		ctx.m = new Message(ctx.message.text, ctx.message.from.first_name, ctx)
	} else {
		ctx.m = new Message("", "", ctx)
	}
	next()
}