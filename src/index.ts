import App from "./app"
import TestRoute from "./routes/test.route"

const app = new App([
    new TestRoute()
])

app.listen()