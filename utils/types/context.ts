import {Context} from "grammy";
import {Message} from "../entities/message";

export type MarlaContext = Context & {
	m: Message
}