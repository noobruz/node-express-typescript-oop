import testRouter from "./routes/test.route"
import App from "./app"

const app = new App([
    testRouter
])

app.listen()