import { Router } from "express";
import TestController from "../controllers/test.controller";
import { IRoute } from "../interfaces/route.interface";

class TestRoute implements IRoute {
    public path: string = "/test"
    public router: Router = Router()
    public controller: TestController = new TestController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(this.path, this.controller.getHello)
    }
}

export default TestRoute