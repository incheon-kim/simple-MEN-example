import Mongoose from "mongoose"
import config from "../config"

let dbURI = "mongodb://" +
            config.db.host + ":" +
            config.db.port + "/" +
            config.db.name;
let options : Mongoose.ConnectionOptions = {
    "auth" : {
        "user": config.db.username,
        "password": config.db.password,
    },
    authSource : "admin",
    useNewUrlParser : true
}
console.log(dbURI)
Mongoose.connect(dbURI, options, (err)=>{
    if(err) throw err;
    console.log("connected to db")
})

Mongoose.Promise = global.Promise

import * as User from "./schemas/User"
import * as Post from "./schemas/Post"

export {
    Mongoose,
    User,
    Post,
}