/**
 * @file Declares Follow data type representing a relationship between
 * two users in which User 1 follows User 2
 */
 import User from "../users/User";
 import mongoose from "mongoose";

 /**
  * @typedef Follow Represents a relationship between two users in which
  * User 1 follows User 2
  * @property {ObjectId} fid system-generated primary key
  * @property {User} following User doing the following
  * @property {User} followed User being followed
  */

export default interface Follow {
    fid: mongoose.Schema.Types.ObjectId,
    following: User,
    followed: User
};