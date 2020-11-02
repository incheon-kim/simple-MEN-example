import {Router} from "express"
import authRouter from "./auth"
import testRouter from "./test"
const router : Router = Router()

router.route("/")
      .get((req, res) => {
          res.send("root of api")
      })

router.use("/auth", authRouter)
router.use("/test", testRouter)

export default router