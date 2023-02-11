import "dotenv/config"
import { Bot } from 'grammy'
import {MarlaContext} from "./utils/types/context";
import {marlaMiddleware} from "./middlewares/main";

let token = process.env.BOT_TOKEN

const bot = new Bot<MarlaContext>(`${token}`)

bot.use(marlaMiddleware)

bot.command("start", async (ctx) => {
	await ctx.reply("Ky")
})

bot.on('message:text', async(ctx) => {
	await ctx.m.reply("text")
	console.log(ctx.m)
})

bot.start().catch(console.log)