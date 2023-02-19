import {MarlaContext} from "../utils/types/context";
import {Composer} from "grammy";
import {onlyForChats, onlyForPublicChats, somethingWentWrong} from "../utils/messages";
import prisma from "../lib/prisma";

const composer = new Composer<MarlaContext>()

composer.hears(/!(link)|(линк)|(ссылка)/i, async ctx => {
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
        return await ctx.reply(`https://marla.su/chat/${chat.id}`)
    } else {
        return await ctx.reply(onlyForPublicChats)
    }
})

composer.hears(/!(приватность)|(закрыть)|(открыть)|(приватность)|(privacy)/i, async ctx => {
    if(ctx.isPrivate) return ctx.reply(onlyForChats);
    const chat = await prisma.chat.findFirst({
        where: {
            chatId: ctx.chat.id
        }
    })
    if(!chat) return await ctx.reply(somethingWentWrong)
    if(chat.public) {
        await prisma.chat.update({
            where: {
                chatId: ctx.chat.id
            },
            data: {
                public: false
            }
        })
        await ctx.reply("Чат теперь приватный")
    } else {
        await prisma.chat.update({
            where: {
                chatId: ctx.chat.id
            },
            data: {
                public: true
            }
        })
        await ctx.reply("Чат теперь публичный")
    }
})

export default composer;