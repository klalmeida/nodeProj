/**
 * @file Implements a mongoose schema for tutis
 */


import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";


/**
 * @typedef Tuit Represents a single text-based message shared by
 * a user on the tuiter platform
 * @property {ObjectId} tid system-generated primary key
 * @property {string} tuit the text data/message body
 * @property {Date} postedOn date when the tuid was posted
 * @property {User} postedBy user who posted the tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tid: {type: String, required: true},
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});

export default TuitSchema;