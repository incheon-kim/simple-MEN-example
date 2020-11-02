import session from "express-session"
import * as db from "../database"
import config from "../config"
import {default as connectMongo} from "connect-mongo"
const MongoStore = connectMongo(session)

let store : connectMongo.MongoStore = new MongoStore({
    mongooseConnection: db.Mongoose.connection,
    ttl: 1 * 24 * 60 * 60
})

let sess = session({
    secret: config.env.secret,
    resave : false,
    saveUninitialized : false,
    store : store,
})


store.on("create", (sessId : any) => {
    console.log("Session Created -> ", sessId)
})

store.on("touch", (sessId: any) => {
    console.log("Session Touched -> ", sessId)
})

store.on("update", (sessId: any) => {
    console.log("Session Updated -> ", sessId)
})

export default sess