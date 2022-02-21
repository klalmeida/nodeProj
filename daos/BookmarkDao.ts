/**
 * @file Implements DAO managing data storage of bookmarks using
 * mongoose BookmarkModel to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao implements Data Access Object managing the
 * data storage of bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of 
 * Bookmark
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates single DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}
    /**
     * Inserts new bookmark instance into the database
     * @param {string} uid PK of the user making the bookmark
     * @param {string} tid PK of the tuit being bookmarked
     * @returns Promise to be notified when bookmark is inserted
     */
    bookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Removes single bookmark for the database
     * @param {string} uid PK of the user who made the bookmark
     * @param {string} tid PK of the tuit being unbookmarked
     * @returns Promise to be notified when bookmark is removed
     */
    unbookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Removes all bookmarks made by a specified user from the database
     * @param {string} uid PK of the user who made the bookmarks
     * @returns Promise to be notified when the bookmarks are removed
     */
    removeAllBookmarksByUser = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({bookmarkedBy: uid})
    
    /**
     * Uses BookmarkModel to retrieve single bookmark doc from bookmarks
     * collection
     * @param {string} bid PK of the bookmark 
     * @returns Promise to be notnified when bookmark is retrieved from database
     */
    findOneBookmark = async (bid: string): Promise<any> =>
        BookmarkModel.findById(bid);

    /**
     * Uses BookmarkModel to retrieve all bookmarks docs from the bookmarks
     * collection made by a specified user
     * @param {string} uid PK of the user
     * @returns Promise to be notified when bookmarks are retrieved
     */
    findAllBookmarksByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarks")
            .exec();
}