/**
 * @file Implements DAO managing data storage of follows. Uses
 * mongoose FollowModel to integrate with MongoDB
*/
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao implements Data Access Object managing the 
 * data storage of Follows
 * @property {FollowDao} followDao Priec single instance of FollowDao
*/
export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
    */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}
    /**
     * Inserts new follow instance into the database
     * @param {string} uid1 PK of the user who is following
     * @param {string} uid2 PK of the user who is being followed
     * @returns Promise to be notified when follow is inserted into database
     */
    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({following: uid1, followed: uid2});

    /**
     * Removes follow from the database
     * @param {string} uid1 PK of the user who was following
     * @param {string} uid2 PK of the user who was being followed 
     * @returns Promise to be notified when follow is removed
     */
    userUnfollowsUser = async (uid1:string, uid2: string): Promise<any> => 
        FollowModel.deleteOne({following: uid1, followed: uid2});

    /**
     * Uses FollowModel to retrieve all follow docs from follows collection
     * with the specified user as the 'following' param
     * @param {string} uid PK of the user being followed
     * @returns Promise to be notified when follows are retrieved from database
     */
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({following: uid})
            .populate("followers")
            .exec();

    /**
     * Uses FollowModel to retrieve all follow docs from follows collection
     * with the specified user as the 'followed' param
     * @param {string} uid PK of the user doing the following
     * @returns Promise to be notified when follows are retrieved from database
     */        
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followed: uid})
            .populate("following")
            .exec();
    
    /**
     * Inserts a new follow instance into the database
     * @param {string} uid1 PK of the user doing the following
     * @param {string} uid2 PK of the user being followed
     * @returns Promise to be notified when follow is inserted into database
     */
    acceptFollowRequest = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({following: uid1, followed: uid2});

    /**
     * Removes follow from the database
     * @param {string} uid1 PK of the user doing the following
     * @param {string} uid2 PK of the user being followed
     * @returns Promise to be notified when follow is removed
     */
    rejectFollowRequest = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({following: uid1, followed: uid2});
}