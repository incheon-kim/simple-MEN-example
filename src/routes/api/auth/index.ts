import {Router} from "express"
import { User } from "../../../database"
import {UserResponse} from "../../../database/schemas/User"
import {registerUser, login} from "../../../models/user"

const router : Router = Router()

router.route("/register")
      .post(async (req, res)=>{
          console.log("register attempt", req.body)
          if(req.body.username && req.body.password){
            try{
              let result : User.UserResponse = await registerUser(req.body.username, req.body.password)
              if(result == User.UserResponse.Registered){
                res.status(200).send({result: "registered successfully"})
              }else{
                res.status(400).send({result: "Username already exists"})
              }
            }catch(err){
              console.error(err)
              res.status(400).send({result: err})
            }
          }else{
            res.status(400).send({result: "invalid input"})
          }
          res.status(200).send({result:"test complete!"})
      })

router.route("/login")
      .post(async (req, res) => {
          try{
            console.log("login attempt", req.body)
            let result : UserResponse = await login(req.body.username, req.body.password)
            console.log("login attempt result -> ", result)

            switch(result){
              case User.UserResponse.LoggedIn:
                const session : Express.Session | undefined = req.session
                session!.username = req.body.username
                res.status(200).send({result : "login successfully"})
                break
              case User.UserResponse.UserNotExist:
                res.status(400).send({result : "User doesn't exist"})
                break
              case User.UserResponse.PasswordNotMatch:
                res.status(400).send({result : "Password is not matching"})
                break
              default:
                res.status(400).send({result : "Unknown Error"})
            }
          }catch (err){
            console.log(err)
            res.status(401).send({result: "failed!"})
          }
      })

router.route("/logout")
      .get((req,res)=>{
        if(req.session){
          const session : Express.Session = req.session
          session.destroy(err => console.error(err))
          
          res.status(200).redirect("/")
        }else{
          res.status(400).send({result : "Invalid Request, You are not logged in"})
        }
      })
export default router