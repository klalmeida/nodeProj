/**
 * @file Declares API for a bookmark controller and its methods
 */

import {Request, Response} from "express";

export default interface BookmarkController {
    bookmarkTuit(req: Request, res: Response): void;
    unbookmarkTuit(req: Request, res: Response): void;
    removeAllBookmarksByUser(req: Request, res: Response): void;
    findOneBookmark(req: Request, res: Response): void;
    findAllBookmarksByUser(req: Request, res: Response): void; 
}