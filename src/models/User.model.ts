import mongoose,{Schema,Document} from "mongoose";


export interface Message{
    content:string;
    createdAt:Date
}
export interface Image{
    Url:string;
    publicId:string
}


const ImageSchema:Schema<Image>=new Schema({
    Url:{
        type:String,
    },
    publicId:{
        type:String,
    }
})
export interface User{
    name:string,
    username:string;
    email:string;
    password:string;
    bio:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    isVerified:boolean,
    image:string,
    imgPublicId:string,
}

const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+\@.+\..+/,'Please Provide a valid email'],
    },
    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
    },
    verifyCode:{
        type:String,
        required:true
    },
    verifyCodeExpiry:{
        type:Date,
        required:true,    
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    
    image:{
        type:String,
    },
    imgPublicId:{
        type:String,
    },
})

const UserModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",UserSchema))

export default UserModel;