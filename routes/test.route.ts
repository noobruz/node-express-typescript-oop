import { Router } from "express"
import { testController } from "../controllers/test.controller"

const testRouter:Router = Router()

// Route Path
const path:string = '/test'

testRouter.get(path, testController)

export default testRouter