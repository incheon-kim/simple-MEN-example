import Mongoose from "mongoose"
import {IUser} from "../User"

export interface IPost extends Mongoose.Document{
    title : string,
    text : string,
    authorId : IUser["id"],
    boardType : string,
    postDate : Date,
    modifyDate : Date
}

let postSchema = new Mongoose.Schema({
    title : {type: String, required: true},
    text : {type: String, required: true},
    authorId : {type: String, required: true},
    boardType: {type: String, required: true},
    postDate: {type: Date, reuqired: true, default: Date.now},
    modifyDate : {type: Date, default: null}
})

export const postModel = Mongoose.model<IPost>('post', postSchema)