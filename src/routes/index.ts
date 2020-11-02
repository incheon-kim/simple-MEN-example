import {Router} from "express"
import apiRouter from "./api"
const router : Router= Router()

router.route("/")
      .get((req, res)=>{
          if(req.session!.username){
            res.render("main", {username : req.session!.username})
          }else{
            res.render("login.html")
          }
          
      })

router.route("/register")
      .get((req, res)=>{
          res.render("registerForm.html")
      })

router.use("/api", apiRouter)

export default router