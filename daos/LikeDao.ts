/**
 * @file Implements DAO managing data storage of likes. Uses mongoose
 * LikeModel to integrate with MongoDB
 */

import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
* @class LikeDao Implements Data Access Object managing data storage
* of likes
* @property {LikeDao} LikeDao Private single instance of LikeDao
*/
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}
    /**
     * Uses LikeModel to retrieve all user documents from Likes collection
     * that correspond to a specific tuit
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve all tuit documents from Likes collection
     * that correspond to a specific user
     * @param {string} uid PK of the user
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Inserts new like instance into the database
     * @param {string} uid PK of the user
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Uses LikeModel to retrieve single like document from likes collection
     * by the user uid and the tuit tid
     * @param {string} uid PK of the user
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when user is retrieved from the database
     */
    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});

    /**
     * Removes like from the database.
     * @param {string} uid PK of the user
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    /**
     * Counts how many users liked a given tuit.
     * @param {string} tid PK of the tuit
     * @returns Promise to be notified when the count is determined
     */
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});
}