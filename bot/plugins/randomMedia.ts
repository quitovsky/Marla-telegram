import {Composer} from "grammy";
import {MarlaContext} from "../utils/types/context";
import prisma from "../lib/prisma";
import {systemCommandName} from "../utils/types/commands";

const composer = new Composer<MarlaContext>()

async function getMedia(command: systemCommandName): Promise<any[]> {
    return prisma.$queryRawUnsafe(`
    SELECT "fileId" FROM "CommandsMediaData" WHERE "command"='${command}' ORDER BY random() LIMIT 1
   `);
}

composer.hears(/!(котик)|(киттик)|(китик)/i, async (ctx) => {
    const attach = await getMedia('kotiki')
    if(attach.length) {
        await ctx.replyWithSticker(attach[0].fileId)
    } else {
        await ctx.reply("Нет котиков")
    }
})

export default composer;