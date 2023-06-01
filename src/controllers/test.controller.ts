import { NextFunction, Request, Response } from "express"
import TestService from "../services/test.service"
import { StatusCodes } from "http-status-codes"

export default class TestController {

    private readonly testServices: TestService;
    
    constructor () {
        this.testServices = new TestService()
    }

    public getHello = (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK).send(this.testServices.sayHello("Dave"))
    }

}