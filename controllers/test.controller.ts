import { NextFunction, Request, Response } from "express"
import TestService from "../services/test.service"

export default class TestController {

    public testServices: TestService = new TestService()

    public getHello (request: Request, response: Response, next: NextFunction) {
        response.status(200).send(this.testServices.sayHello("Dave"))
    }

}