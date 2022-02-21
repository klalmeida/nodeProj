/**
 * @file Declares the Bookmark data type representing a private record
 * of a tuit saved by a user
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";
import mongoose from "mongoose";


 /**
  * @typedef Bookmark A User can save a Tuit into their own list of 
  * bookmarked tuits
  * @property {ObjectId} bid system-generated primary key
  * @property {Tuit} bookmarkedTuit Tuit that has been saved
  * @property {User} bookmarkedBy User that saved the tuit
  */

export default interface Bookmark {
    bid: mongoose.Schema.Types.ObjectId,
    bookmarkedTuit: Tuit;
    bookmarkedBy: User;
}