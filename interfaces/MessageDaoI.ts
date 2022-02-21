/**
 *  @file Declares API for message-related DAO methods
 */

import Message from "../models/messages/Message";

export default interface MessageDao {
    sendMessage(uid1: string, uid2: string, msg: string): Promise<Message>;
    findAllOutbox(uid: string): Promise<Message[]>;
    findAllInbox(uid: string): Promise<Message[]>;
    deleteOneMessage(mid: string): Promise<any>;
    deleteAllMessagesByUser(uid: string): Promise<any>;
    editMessage(mid: string, msg: Message): Promise<any>;
}