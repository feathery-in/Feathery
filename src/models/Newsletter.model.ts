import mongoose,{Schema,Document} from "mongoose";


export interface Newsletter{
   email:string
}

const NewsletterSchema:Schema<Newsletter>=new Schema({
   email:{
    type:String,
    required:true 
   }
},{timestamps:true})

const NewsletterModel=(mongoose.models.Newsletter as mongoose.Model<Newsletter>)||(mongoose.model<Newsletter>("Newsletter",NewsletterSchema))
export default NewsletterModel;