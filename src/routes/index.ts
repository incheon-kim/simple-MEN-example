import {Router} from "express"
import apiRouter from "./api"
const router : Router= Router()

router.route("/")
      .get((req, res)=>{
          res.render("index.html")
      })

router.route("/register")
      .get((req, res)=>{
          res.render("registerForm.html")
      })

router.use("/api", apiRouter)

export default router