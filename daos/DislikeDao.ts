/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose
 * dislikeDao to integrate with MongoDB
 */

import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/likes/DislikeModel";
import Dislike from "../models/likes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of dislikes
 * @property {DislikeDao} DislkeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}
    /**
     * Uses DislikeModel to retrieve all user documents from Dislikes collection
     * that correspond to a specific tuit
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when the users are retrieved from the
     * database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Uses DislkeModel to retrieve all tuit documents from Likes collection
     * that correspond to a specific user
     * @param {string} uid PK of the user
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Inserts new dislike instance into the database
     * @param {string} uid PK of the user
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Removes dislike from the database.
     * @param {string} uid PK of the user
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when dislike is removed from the database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeModel to retrieve single dislike document from dislikes
     * collection by the user uid and the tuit tid
     * @param {string} uid PK of the user
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when user is retrieved from the database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Counts how many users disliked a given tuit.
     * @param {string} tid PK of the tuit
     * @returns Promise to be notified when the count is determined
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}