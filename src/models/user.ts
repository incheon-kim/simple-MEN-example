//import {userModel, IUser, IUserRegister, UserResponse} from "../models/schemas/User"
import {User} from "../database"

const create = (data : User.IUserRegister) : Promise<User.IUser> => {
    return new Promise((resolve, reject) => {
        var newUser = new User.userModel(data)
        newUser.save()
               .then((newUser)=>{
                   resolve(newUser)
               })
               .catch((err)=>{
                   if(err){
                       reject(err)
                   }
               })
    })

}

const findOneByUserName = (userName : string) : Promise<User.IUser | null>=> {
    return new Promise(async (resolve, reject) => {
        try{
            resolve(await User.userModel.findOne({username: userName}).exec())
        }catch (err){
            reject(err)
        }
    })
}

const findOneById = async (id : string) : Promise<User.IUser | any> => {
    return new Promise(async (resolve, reject) => {
        try{
            resolve(await User.userModel.findById(id))
        }catch (err){
            reject(err)
        }
    })
}

const registerUser = (userName : string, password : string) : Promise<User.UserResponse>=> {
    // check if user already exists
    return new Promise(async (resolve, reject)=> {
        try{
            let user = await findOneByUserName(userName)
            if(!user){
                let userData : User.IUserRegister = <User.IUserRegister>{
                    username : userName,
                    password : password
                }
    
                let newUser : User.IUser = await create(userData)
                resolve(User.UserResponse.Registered)
            }else{
                resolve(User.UserResponse.AlreadyExist)
            }
        }catch (err){
            console.log("Error Occurred during check user existance during register.")
            console.log(err)
            reject(err)
        }
    })
}

const login = (userName : string, password : string) : Promise<User.UserResponse> => {
    return new Promise(async (resolve, reject) => {
        try{
            let user : User.IUser|null = await findOneByUserName(userName)
            if(user){
                let valid : boolean = await user.validateUser(password)
                if(valid){
                    // successful
                    resolve(User.UserResponse.LoggedIn)
                }else{
                    // password is not valid
                    resolve(User.UserResponse.PasswordNotMatch)
                }
            }else{
                // user doesn't exist
                resolve(User.UserResponse.UserNotExist)
            }
        }catch (err){
            reject(err)
        }
    })
}

export {
    findOneByUserName,
    findOneById,
    registerUser,
    login
}