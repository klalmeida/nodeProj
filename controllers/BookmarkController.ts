/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import BookmarkDao from "../daos/BookmarkDao";
import Bookmark from "../models/bookmarks/Bookmark";
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI"

/**
 * @class BookmarkController implements RESTful web service API for bookmarks
 * resource. Defines the following HTTP endpoints:
 * <ul>
 *      <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark instance</li>
 *      <li>DELETE /api/users/:uid/bookmarks/:tid to remove a specific bookmark</li>
 *      <li>DELETE /api/users/:uid/bookmarks to remove all tuits of a specific user</li>
 *      <li>GET /api/users/:uid/bookmarks/:tid to retrieve a specific bookmark</li>
 *      <li>GET /api/users/:uid/bookmarks to retrieve all bookmarks by a user</li>
 * </ul>
 * @property {BookmarkDao} BookmarkDao Singleton DAO implementing user CRUD operations
 * @property {BookmardControllerI} bookmarkController Singleton controller implementing
 * a RESTful web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service API
      * @returns BookmarkController
    */
public static getInstance = (app: Express): BookmarkController => {
    if(BookmarkController.bookmarkController === null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.post("/api/users/:uid/bookmarks/:tid",
            BookmarkController.bookmarkController.bookmarkTuit);
        app.delete("/api/users/:uid/bookmarks/:tid",
            BookmarkController.bookmarkController.unbookmarkTuit);
        app.delete("/api/users/:uid/bookmarks",
            BookmarkController.bookmarkController.removeAllBookmarksByUser);
        app.get("/api/users/:uid/bookmarks/:tid",
            BookmarkController.bookmarkController.findOneBookmark);
        app.get("/api/users/:uid/bookmarks",
            BookmarkController.bookmarkController.findAllBookmarksByUser);
    }
    return BookmarkController.bookmarkController;
}

private constructor() {}
/**
 * Creates a new bookmark instance
 * @param {Request} req Represents request from client, including a body
 * containing the JSON object for the new bookmark to be inserted into the
 * database
 * @param {Response} res Represents response to the client including the body 
 * formatted as a JSON object containing new bookmark being inserted in the database
*/
bookmarkTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.bookmarkTuit(req.params.uid, req.params.tid)
        .then(bookmarks => res.json(bookmarks));

/**
 * Removes a specific bookmark from the database
 * @param {Request} req Represents request from client, including path parameter uid
 * identifying the PK of the user and tid identifying the PK of the bookmarked tuit
 * @param {Response} res Represents response to client, including status on whether 
 * the deletion was successful or not
*/
unbookmarkTuit = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.unbookmarkTuit(req.params.uid, req.params.tid)
        .then((status) => res.send(status));


/**
 * Removes all bookmarks of a specfic user from the database
 * @param {Request} req Represents request from client, including path parameter uid
 * identifying the PK of the user
 * @param {Response} res Represents response to client, including status on wheter
 * the deletion was successful or not
*/
removeAllBookmarksByUser = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.removeAllBookmarksByUser(req.params.uid)
        .then((status) => res.send(status));

/**
 * Retrieves a specific bookmark from the database
 * @param {Request} req Represents request from client, including path parameter 
 * bid identifying the primary key of the bookmark to be retrieved
 * @param {Response} res Represents response to client, including the body 
 * formatted as JSON containing the desired bookmark
*/
findOneBookmark = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.findOneBookmark(req.params.bid)
        .then((bookmark: Bookmark) => res.json(bookmark));

/**
 * Retrieves all bookmarks made by a user from the database
 * @param {Request} req Represents request from client, including path parameter 
 * uid identifying the primary key of the specified user
 * @param {Response} res Represents response to client, including the body 
 * formatted as JSON arrays containing the desired bookmarks
 */
findAllBookmarksByUser = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao.findAllBookmarksByUser(req.params.uid)
        .then((bookmarks: Bookmark[]) => res.json(bookmarks));
};
