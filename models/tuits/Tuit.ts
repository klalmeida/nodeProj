/**
 * @file Declares the Tuit data type representing a single text-
 * based message stored in the database
 */
import User from "../users/User";
import mongoose from "mongoose";

/**
 * @typedef Tuit Represents a single text-based message shared by
 * a user on the tuiter platform
 * @property {ObjectId} tid system-generated primary key
 * @property {string} tuit the text data/message body
 * @property {Date} postedOn date when the tuid was posted
 * @property {User} postedBy user who posted the tuit
 */
export default interface Tuit {
    tid: mongoose.Schema.Types.ObjectId,
    tuit: string;
    postedOn: Date;
    postedBy: User;
}