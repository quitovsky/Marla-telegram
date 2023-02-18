import startBot from "./bot";
import startServer from "./server"

async function start() {
    await startServer()
    await startBot()
}

start().catch(e => console.log(e))