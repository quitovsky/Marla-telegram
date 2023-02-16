import {MarlaContext} from "../utils/types/context";
import {Composer} from "grammy";
import {onlyForChats, onlyForPublicChats, somethingWentWrong} from "../utils/messages";
import prisma from "../lib/prisma";

const composer = new Composer<MarlaContext>()

composer.hears(/!(link)|(линк)|(ссылка)|(123)/i, async ctx => {
    if(ctx.isPrivate) return ctx.reply(onlyForChats);
    const chat = await prisma.chat.findFirst({
        where: {
            chatId: ctx.chat.id
        },
        select: {
            public: true,
            id: true
        }
    })
    if(!chat) return await ctx.reply(somethingWentWrong)
    if(chat.public) {
        return await ctx.reply(`.../${chat.id}`)
    } else {
        return await ctx.reply(onlyForPublicChats)
    }
})

export default composer;