import cors from 'cors';
import express, { Application, Request } from "express";
import morganMiddleware from './middlewares/morgan.middleware';
import { logger } from './utils/logger';

export default class App {

    public app: Application;
    public port: string | number;

    constructor(routes: any[]) {
        this.app = express();
        this.port = 8000;
        this.initializeMiddlewares()
        this.initializeRoutes(routes)
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            logger.info(`⚡️[server]: Server is running @ http://localhost:${this.port}`)
        })
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cors<Request>());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morganMiddleware)
    }

    private initializeRoutes(routes: any[]): void {
        routes.forEach(route => {
            this.app.use("/api/v1", route.route)
        })
    }  

}