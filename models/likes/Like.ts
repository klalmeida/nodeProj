/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user likes a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";
import mongoose from "mongoose";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {ObjectId} lid system-generated primary key 
 * @property {Tuit} tuit Tuit being liked
 * @property {User} likedBy User liking the tuit
 */

export default interface Like {
    lid: mongoose.Schema.Types.ObjectId,
    tuit: Tuit,
    likedBy: User
};