/**
 * @file Implements a mongoose schema for likes
 */

import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {ObjectId} lid system-generated primary key 
 * @property {Tuit} tuit Tuit being liked
 * @property {User} likedBy User liking the tuit
*/
const LikeSchema = new mongoose.Schema<Like>({
    lid: {type: String, required: true},
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;