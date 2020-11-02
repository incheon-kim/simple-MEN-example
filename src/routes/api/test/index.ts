import {Router} from "express"

const router = Router()

router.route("/")
      .post((req,res)=>{
          console.log("### test post ###")
          console.log(req.body)
          res.redirect("/")
      })

export default router