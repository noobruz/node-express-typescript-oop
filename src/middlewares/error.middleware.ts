import { NextFunction, Request, Response } from "express";
import Interceptor from "./interceptor.middleware";
import HttpException from "../utils/exception";
import { logger } from "../utils/logger";

export default class ErrorMiddleWare extends Interceptor {

    constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next)
    }

    static async handleErrors(
        error: HttpException,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const status: number = error.status || 500;
        const message: string = error.message || "Something went wrong";

        logger.error(
            `[Error Handler]: Path: ${req.path}, Method: ${req.method}, Status: ${status}, ${message}`
        );

        res.status(status).json({ message })
    }

}