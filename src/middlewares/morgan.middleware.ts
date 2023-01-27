import morgan, { StreamOptions } from "morgan";
import { NODE_ENV } from "../config";
import { logger } from "../utils/logger";

const stream: StreamOptions = {
    write: (message: string) => 
        logger.http(message.substring(0, message.lastIndexOf("\n")))
}

const skip = () => {
    const env = NODE_ENV || "development"
    return env !== "development"
}

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
)

export default morganMiddleware