import mongoose,{Schema,Document} from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
export interface Post{
    title:string,
    description:string
    img:[]
    admin:{};
}

const PostSchema:Schema<Post>=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:"UserModel"
    },
    img:[],
},{timestamps:true})
PostSchema.plugin(mongooseAggregatePaginate)

const PostModel=(mongoose.models.Post as mongoose.Model<Post>)||(mongoose.model<Post>("Post",PostSchema))
export default PostModel;