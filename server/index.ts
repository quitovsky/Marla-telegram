import "dotenv/config"
import express from "express";
import * as process from "process";
import chat from "./routes/chat";

const PORT = process.env.PORT || 5000

const app = express();

app.use('/chat', chat)

app.get("/", async (req,res) => {
    res.sendStatus(200)
})

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT))