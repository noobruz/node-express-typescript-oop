import { NextFunction, Request, Response } from "express";

export default class Interceptor {

    protected ip: string

    constructor (req: Request, res: Response, next: NextFunction) {
        this.ip = req.ip
    }

}