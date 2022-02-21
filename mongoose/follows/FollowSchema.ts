/**
 * @file Implements a mongoose schema for follows
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
  * @typedef Follow Represents a relationship between two users in which
  * User 1 follows User 2
  * @property {ObjectId} fid system-generated primary key
  * @property {User} following User doing the following
  * @property {User} followed User being followed
*/
const FollowSchema = new mongoose.Schema<Follow>({
    fid: {type: String, required: true},
    followed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    following: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;