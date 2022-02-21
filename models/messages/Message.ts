/**
 * @file Declares the Message data type representing a private 
 * message sent between two users
 */

import User from "../users/User";
import mongoose from "mongoose";

 /**
  * @typedef Message Represents a private message sent between two
  * Users
  * @property {ObjectId} mid system-generated primary key
  * @property {string} message the body of the message
  * @property {User} sentTo message recipient
  * @property {User} sentFrom message sender
  * @property {Date} sentOn when message was sent
  */

 export default interface Message {
     mid: mongoose.Schema.Types.ObjectId,
     message: string;
     sentTo: User;
     sentFrom: User;
     sentOn: Date;
 }