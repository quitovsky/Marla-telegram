import path from 'path';
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env")})
import { PrismaClient } from "@prisma/client"
import express from "express";
import * as process from "process";
import chat from "./routes/chat";

const PORT = process.env.PORT || 5000

const app = express();
export const prisma = new PrismaClient({
    log: ["query", "error", "warn", "info"]
})

app.use('/chat', chat)

app.get("/", async (req,res) => {
    res.sendStatus(200)
})

async function start() {
    app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT))
}

export default start