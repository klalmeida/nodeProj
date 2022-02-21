/**
 * @file Controller RESTful Web service API for messages resource 
*/
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController implements RESTful web service API for message
 * resource. Defines the following HTTP endpoints:
 * <ul>
 *      <li>POST "/api/users/:uid1/messages/:uid2" to create a message sent 
 *          from user 1, to user 2 </li>
 *      <li>GET "/api/users/:uid/messages" to view a list of a user's sent 
 *          messages </li>
 *      <li>GET "/api/messages/:uid" to view a list of a user's received 
 *          messages </li>
 *      <li>DELETE "/api/users/:uid/messages/:mid" to remove a single message 
 *          sent by a specific user </li>
 *      <li>DELETE "/api/users/:uid/messages" to remove all messages sent by a 
 *          specific user </li>
 *      <li>PUT "/api/users/:uid/messages/:mid" to edit a single sent message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} MessageController Singleton controller 
 * implementation of a RESTful web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance 
     * @param {Express} app Express instance to declare the RESTful web service api
     * @returns MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2",
                MessageController.messageController.sendMessage);
            app.get("/api/users/:uid/messages",
                MessageController.messageController.findAllOutbox);
            app.get("/api/messages/:uid",
                MessageController.messageController.findAllInbox);
            app.delete("/api/users/:uid/messages/:mid",
                MessageController.messageController.deleteOneMessage);
            app.delete("/api/users/:uid/messages",
                MessageController.messageController.deleteAllMessagesByUser);
            app.put("/api/users/:uid/messages/:mid",
                MessageController.messageController.editMessage);
        }
        return MessageController.messageController;
    }

    private constructor () {}

    /**
     * Creates a new message instance
     * @param {Request} req Represents a request from a client, including a body
     * containing the JSON object for the new message to be inserted in the database
     * @param {Response} res Represents the response to the client including the body
     * formatted as a JSON object containing the new message
    */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.sendMessage(req.params.uid1, req.params.uid2, 
            req.params.msg).then((message: Message) => res.json(message));

    /**
    * Retrieves all messages sent by a specific user from the database
    * @param {Request} req Represents request from client, including path parameter 
    * uid identifying the PK of the specified user whose messages we want
    * @param {Response} res Represents response to client, including the body 
    * formatted as JSON arrays containing the desired messages
    */    
    findAllOutbox = (req: Request, res: Response) =>
        MessageController.messageDao.findAllOutbox(req.params.uid)
            .then((messages: Message[]) => res.json(messages)); 

    /**
    * Retrieves all messages received by a specific user from the database
    * @param {Request} req Represents request from client, including path parameter 
    * uid identifying the PK of the specified user whose messages we want
    * @param {Response} res Represents response to client, including the body 
    * formatted as JSON arrays containing the desired messages
    */ 
    findAllInbox = (req: Request, res: Response) =>
        MessageController.messageDao.findAllInbox(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    /**
    * Removes a specific message from the database
    * @param {Request} req Represents request from client, including path parameter mid
    * identifying the PK of the message
    * @param {Response} res Represents response to client, including status on whether 
    * the deletion was successful or not
    */
    deleteOneMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteOneMessage(req.params.mid)
            .then((status) => res.send(status)); 

    /**
    * Removes all messages of a specfic user from the database
    * @param {Request} req Represents request from client, including path parameter uid
    * identifying the PK of the user
    * @param {Response} res Represents response to client, including status on wheter
    * the deletion was successful or not
    */
    deleteAllMessagesByUser = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessagesByUser(req.params.uid)
            .then((status) => res.send(status));

    /**
      * Modifies an existing message instance
      * @param {Request} req Represents request from client, including path parameter
      * mid identifying the PK of the message to be modified and the edits to made in
      * the body
      * @param {Response} res Represents response to client, including status on 
      * whether the update was successful or not
    */
    editMessage = (req: Request, res: Response) =>
        MessageController.messageDao.editMessage(req.params.mid, req.body)
            .then((status) => res.sendStatus(status)); 
}