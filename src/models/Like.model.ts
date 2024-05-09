import mongoose,{Schema,Document} from "mongoose";


export interface Like{
    post:{},
    article:{},
    video:{},
    likedBy:{}
}

const LikeSchema:Schema<Like>=new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"PostModel"
    },
    article:{
        type:Schema.Types.ObjectId,
        ref:"ArticleModel"
    },
    video:{
        type:Schema.Types.ObjectId,
        ref:"VideoModel"
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"UserModel"
    }
},{timestamps:true})

const LikeModel=(mongoose.models.Like as mongoose.Model<Like>)||(mongoose.model<Like>("Like",LikeSchema))
export default LikeModel;