import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import testRouter from "./routes/test.route"
import cors from "cors"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send("Express(Node) + Typescript")
})

app.use(testRouter)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running @ http://localhost:${PORT}`)
})