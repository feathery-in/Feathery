import mongoose,{Schema,Document} from "mongoose";


export interface Subscription{
    follower:{},
    following:{}
}

const SubscriptionSchema:Schema<Subscription>=new Schema({
    follower:{
        type:Schema.Types.ObjectId,
        ref:"UserModel"
    },
    following:{
        type:Schema.Types.ObjectId,
        ref:"UserModel"
    }
},{timestamps:true})

const SubscriptionModel=(mongoose.models.Subscription as mongoose.Model<Subscription>)||(mongoose.model<Subscription>("Subscription",SubscriptionSchema))
export default SubscriptionModel;