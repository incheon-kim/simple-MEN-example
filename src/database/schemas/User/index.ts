import {Schema, Document, model} from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document{
    username : string,
    password : string,
    grade? : number,
    createdDate? : Date,
    id? : Schema.Types.ObjectId,

    validateUser(password : String) : boolean
}

export interface IUserRegister extends Document{
    username : string,
    password : string,
}

export enum UserResponse{
    Registered = 10,
    LoggedIn = 1,
    AlreadyExist = -1,
    UserNotExist = -10,
    PasswordNotMatch = -20,
}

const ENCRPYT_ROUND = 10

const UserSchema : Schema = new Schema({
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    grade : {type: Number, default: 0, max: 10},
    createdDate : {type: Date, default: Date.now},
    id : Schema.Types.ObjectId
})

UserSchema.pre<IUser>('save', async function(next){
    if(!this.isModified('password'))
        return next()

    const salt : string = await bcrypt.genSalt(ENCRPYT_ROUND)

    this.password = await bcrypt.hash(this.password, salt)
    next()
})


UserSchema.methods.validateUser = function(password : String) : Promise<boolean>{
    return new Promise(async (resolve, reject)=>{
        try{
            let valid : boolean = await bcrypt.compare(password, this.password)
            resolve(valid)
        }catch (err){
            reject(err)
        }
    })
}

export const userModel = model<IUser>('user', UserSchema)