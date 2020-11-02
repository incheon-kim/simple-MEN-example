import express from "express"
import router from "./routes"
import config from "./config"
import ejs from "ejs"
import bodyParser from "body-parser"

const app = express()
const PORT = config.env.PORT || 4000

// set request body parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


// set router
app.use("/", router)

// set view engine
app.set("views", __dirname + "/views/")
app.set("view engine", "ejs")
app.engine("html", ejs.renderFile)

// 404 NOT Found
app.get("*", (req, res, next) => {
    res.status(404).send("<h1>404 NOT Found</h1><br>You should check URL you typed :)")
})

// start to listen
app.listen(PORT, ()=>{
    console.log("start server at http://localhost:"+PORT)
})