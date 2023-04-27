import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

app.get("/", (_, res: Response) => {
  res.send("Split Bill Server")
})

app.listen(PORT, () => {
  console.log(`Server running on PORT => ${PORT}`)
})
