/**
 * @file Implements DAO managing data storage of tuits. Uses 
 * mongoose TuitModel to integrate with MongoDB
 */
 import TuitModel from "../mongoose/tuits/TuitModel";
 import Tuit from "../models/tuits/Tuit";
 import TuitDaoI from "../interfaces/TuitDaoI";
 
 /**
  * @class TuitDao Implements Data Access Object managing data 
  * storage of Tuits
  * @property {TuitDao} tuitDao Private single instance of TuitDao
  */
 export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance 
     * @returns TuitDao
    */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}
    /**
     * Uses TuitModel to retrieve all tuit docs from tuits collection
     * @returns Promise to be notified when the tuits are retrieved
     * from database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find().exec();

    /**
     * Uses TuitModel to retrieve all tuit docs from tuits collection
     * in which the postedBy field matches the given uid
     * @param {string} uid the User's PK
     * @returns Promise to be notified when the tuits are retrieved 
     * from the database
     */
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});
    
    /**
     * Uses TuitModel to retrieve a single tuit doc from tuits collection
     * @param {string} uid the User's PK
     * @returns Promise to be notified when tuit is retrieved from database 
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Inserts a new tuit instance into the database
     * @param {Tuit} tuit instance to be inserted into the database 
     * @returns Promise to be notified when tuit is inserted into database
     */
    createTuit = async (tuit: Tuit): Promise<Tuit> =>
        TuitModel.create(tuit);
    
    /**
     * Updates tuit with new values in database
     * @param {string} uid Primary key of tuit to be modified 
     * @param {Tuit} tuit Tuit object containing new values 
     * @returns Promise to be notified when tuit is updated in database
     */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});
    
    /**
     * Removes a Tuit from the database
     * @param {string} uid Primary key of the tuit to be removed 
     * @returns Promise to be notified when tuit is removed from database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});
 }