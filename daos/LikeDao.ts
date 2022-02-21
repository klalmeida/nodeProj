/**
 * @file Implements DAP managing data storage of Likes. Uses
 * the mongoose LikeModel to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao implements Data Access Object managing the data
 * storage of Like objects
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDAo
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    
    private constructor() {}
    /**
     * Uses LikeModel to retrieve all like docs pertaining to a specified
     * tuit from the like collection 
     * @param {string} tid PK of the tuit 
     * @returns Promise to be notified when likes are retrieved from database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
    
    /**
     * USes LikeModel to retrieve all like docs pertaining to a specified
     * user from the like collection
     * @param {string} uid PK of the user 
     * @returns Promise to be notified when likes are retrieved from database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Inserts a new like instance into the database
     * @param {string} uid PK of user who liked the tuit
     * @param {string} tid PK of tuit liked by the user
     * @returns Promise to be notified when like is inserted into databse
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Removes a like from the database
     * @param {string} uid PK of the specified user
     * @param {string} tid PK of the specified tuit
     * @returns Promise to be notified when like is removed
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}