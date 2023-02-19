import path from 'path';
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env")})
import { PrismaClient } from "@prisma/client"
import express from "express";
import fs from 'fs'
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
    try {
        const options = {
            key: fs.readFileSync("/root/.ssl/marla.su.key"),
            cert: fs.readFileSync("/root/.ssl/marla.su.pem")
        }
        const https = require('https').createServer(options, app)
        https.listen(2087, () => console.log(`Listening production on https://marla.su:2087`))
    } catch (e) {
        console.log(e)
    }
    app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT))
}

export default start