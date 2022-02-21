/**
 * @file Implements a mongoose schema for bookmarks
 */

import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
  * @typedef Bookmark A User can save a Tuit into their own list of 
  * bookmarked tuits
  * @property {ObjectId} bid system-generated primary key
  * @property {Tuit} bookmarkedTuit Tuit that has been saved
  * @property {User} bookmarkedBy User that saved the tuit
  */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bid: {type: String, required: true},
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "bookmarks"});

export default BookmarkSchema;