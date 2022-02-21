/**
 * @file Controller RESTful Web service API for Follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import Follow from "../models/follows/Follow";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController implements a RESTful web service API for follows
 * resource. Defines the following HTTP endpoints:
 * <ul>
 *      <li>POST "/api/users/:uid1/follows/:uid2" to create new follow</li>
 *      <li>DELETE "/api/users/:uid1/follows/:uid2" to remove a follow</li>
 *      <li>GET "/api/users/:uid/follows" to retrieve all follows of a specific user</li>
 *      <li>GET "/api/follows/:uid" to retrieve all follows made by a specific user</li>
 *      <li>POST "/api/users/:uid1/follows/:uid2" to accept a follow request</li>
 *      <li>DELETE "/api/users/:uid1/follows/:uid2" to reject a follow request</li>
    </ul>
    @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
    @property {FollowController} followController Singleton controller implementing a
    RESTful Web service API
 */

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    
    /**
     * Creates ssingleton controller instance
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", 
                FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/follows/:uid2", 
                FollowController.followController.userUnfollowsUser);
            app.get("/api/users/:uid/follows", 
                FollowController.followController.findAllFollowers);
            app.get("/api/follows/:uid", 
                FollowController.followController.findAllFollowing);
            app.post("/api/users/:uid2/follows/:uid1", 
                FollowController.followController.acceptFollowRequest);
            app.delete("/api/users/:uid2/follows/:uid1", 
                FollowController.followController.rejectFollowRequest);
        }
        return FollowController.followController;
    }
    private constructor () {}


    /**
     * Creates a new follow instance
     * @param {Request} req Represents request from client, including the path 
     * parameters uid1 representing the user doing the following and uid2 
     * representing the user being followed 
     * @param {Response} res Represents response to client, including the body 
     * formatted as a JSON object containing the new follow that was inserted into
     * the database
    */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
           .then((follow: Follow) => res.json(follow));

    /**
     * Removes a follow instance from the database
      * @param {Request} req Represents request from client, including path 
      * parameters uid1 identifying the PK of the user doing the unfollowing
      * and uid2 identifying the PK of the user being unfollowed
      * @param {Response} res Represents response to client, including status
      * on whether the deletion was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
           .then((status) => res.send(status));

    /**
     * Retrieves all follows from the database made by a specified user
     * @param {Request} req Represents a request from client, inclueding the path
     * parameter uid representing the user being followed
     * @param {Resposne} res Represents a response to the client including the body
     * formatted as JSON arrays containing the follow objects
     */
    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then((follows: Follow[]) => res.json(follows));

    /**
     * Retrieves all follows attributed to a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user doing the following
     * @param {Response} res Represents response to client, including the body 
     * formatted as JSON arrays containing the specified follow objects
     */
    findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowing(req.params.uid)
            .then((follows: Follow[]) => res.json(follows));

    /**
     * Creates a new follow instance when a request is accepted
     * @param {Request} req Represents request from client, including the path 
     * parameters uid1 representing the user doing the following and uid2 
     * representing the user being followed 
     * @param {Response} res Represents response to client, including the body 
     * formatted as a JSON object containing the new follow that was inserted into
     * the database
    */
    acceptFollowRequest = (req: Request, res: Response) =>
        FollowController.followDao.acceptFollowRequest(req.params.uid1, req.params.uid2)
            .then((follow: Follow) => res.json(follow));

    /**
     * Removes a follow instance from the database when a request is denied
      * @param {Request} req Represents request from client, including path 
      * parameters uid1 identifying the PK of the user doing the unfollowing
      * and uid2 identifying the PK of the user being unfollowed
      * @param {Response} res Represents response to client, including status
      * on whether the deletion was successful or not
     */
    rejectFollowRequest = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
            .then((status) => res.send(status));      
};