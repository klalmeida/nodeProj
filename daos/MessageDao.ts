/**
 * @file Implemesnts DAO managng stroage of messages. Uses
 * mongoose MessageModel to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao implements a Data Acess Object for managing
 * data storage of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}
    /**
     * Inserts a new message instance into the database
     * @param {string} uid1 PK of the user receiving the message 
     * @param {string} uid2 PK of the user sending the message
     * @param {string} msg the actual message content 
     * @returns promise to be notified when message inserted into database
     */
    sendMessage = async (uid1: string, uid2: string, msg: string): Promise<any> =>
        MessageModel.create({message: msg, sentTo: uid1, sentFrom: uid2, sentOn: Date.now()});

    /**
     * Uses MessageModel to retrieve all message docs from the messages
     * collection which have specified User as the sender
     * @param {string} uid PK of the user who sent the messages 
     * @returns promise to be notified when the messages are retrieved
     */
    findAllOutbox = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sentFrom: uid})
            .populate("outbox messages")
            .exec();

    /**
     * Uses MessageModel to retrieve all message docs from the messages
     * collection which have specified User as the recipient
     * @param {string} uid PK of the user who received the messages 
     * @returns promise to be notified when the messages are retrieved
     */        
    findAllInbox = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sentTo: uid})
            .populate("inbox messages")
            .exec();

    /**
     * Removes a single message from the database
     * @param {string} mid PK of the message to be removed 
     * @returns Promise to be notified when the message is removed
     */        
    deleteOneMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({mid: mid});

    /**
     * Removes all messsage instances sent by a specified user from database
     * @param {string} uid PK of the user whose messages will be deleted
     * @returns Promise to be notified when the messages are removed
     */    
    deleteAllMessagesByUser = async (uid: string): Promise<any> =>
        MessageModel.deleteMany({sentTo: uid});

    /**
     * Updates a sent message with new values
     * @param {string} mid PK of the message to be modified 
     * @param {Message} msg Message object containing new data values
     * @returns promise to be notified when message is updated
     */    
    editMessage = async (mid: string, msg: Message): Promise<any> =>
        MessageModel.updateOne({mid: mid}, {$set: msg});
}