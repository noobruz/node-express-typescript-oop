import { NextFunction, Request, Response } from "express"
import { testService } from "../services/test.service"

const testController = (req: Request, res: Response, next: NextFunction) => {

    res.send(testService())

}

export { testController }