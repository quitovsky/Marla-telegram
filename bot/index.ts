import "dotenv/config"
import { Bot } from 'grammy'
import {MarlaContext} from "./utils/types/context";
import {marlaMiddleware} from "./middlewares/main";
import {statistics} from "./plugins/statistics";

let token = process.env.BOT_TOKEN

export const bot = new Bot<MarlaContext>(`${token}`)

bot.use(marlaMiddleware)

// load plugins
bot.use(statistics);

async function start() {
	bot.start()
		.catch(console.log)
	let interval = setInterval(() => {
		if(bot.isInited()) {
			console.log(`Logged in as ${bot.botInfo.username}`)
			clearInterval(interval)
		}
	}, 500)
}

start();