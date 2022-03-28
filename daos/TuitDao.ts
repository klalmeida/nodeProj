/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Uses TuitModel to retrieve all user documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection made
     * by a certain user
     * @param {string} uid PK of the user
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .sort({'postedOn': -1})
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} uid PK of the user
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Inserts new tuit instance into the database
     * @param {string} uid PK of the user
     * @param {Tuit} tuit the tuit to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates tuit with new values in database
     * @param {string} tid PK of the tuit
     * @param {Tuit} tuit tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});

    /**
     * Updates the likes parameter of a tuit with new values
     * @param {string} tid PK of the tuit
     * @param {any} newStats updated like count to be inputted
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateLikes = async (tid: string, newStats: any): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: {stats: newStats}}
        );

    /**
     * Updates the dislikes parameter of a tuit with new values
     * @param {string} tid PK of the tuit
     * @param {any} newStats updated dislike count to be inputted
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateDislikes = async (tid: string, newStats: any): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: {stats: newStats}}
        );

    /**
     * Removes a tuit from the database by user.
     * @param {string} uid PK of the user
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});
}