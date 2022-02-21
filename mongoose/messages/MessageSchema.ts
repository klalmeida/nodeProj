/**
 * @file Implements a mongoose schema for messages
*/

import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
  * @typedef Message Represents a private message sent between two
  * Users
  * @property {ObjectId} mid system-generated primary key
  * @property {string} message the body of the message
  * @property {User} sentTo message recipient
  * @property {User} sentFrom message sender
  * @property {Date} sentOn when message was sent
*/
const MessageSchema = new mongoose.Schema<Message>({
    mid: {type: String, required: true},
    message: {type: String, required: true},
    sentTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentFrom: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date}
}, {collection: "messages"});

export default MessageSchema;