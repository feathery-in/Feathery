import mongoose,{Schema,Document} from "mongoose";


export interface Article{
   
}

const ArticleSchema:Schema<Article>=new Schema({
   
},{timestamps:true})

const ArticleModel=(mongoose.models.Article as mongoose.Model<Article>)||(mongoose.model<Article>("Article",ArticleSchema))
export default ArticleModel;