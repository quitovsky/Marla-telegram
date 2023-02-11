import {MarlaContext} from "../types/context";

export class Message {

	text: string;
	author: string
	#ctx: MarlaContext;

	constructor(text: string, author: string, context: MarlaContext) {
		this.text = text;
		this.author = author;
		this.#ctx = context
	}

	getText(): string {
		return this.text;
	}

	async reply(text: string, ...args: any[]) {
		await this.#ctx.reply(text, ...args)
		console.log()
	}
}