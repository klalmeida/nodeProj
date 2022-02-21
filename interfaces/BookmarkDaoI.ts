/**
 * @file Declares API for bookmark-related DAO methods
 */

import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDao {
    bookmarkTuit(uid: string, tid: string): Promise<Bookmark>;
    unbookmarkTuit(uid: string, tid: string): Promise<any>;
    removeAllBookmarksByUser(uid: string): Promise<any>;
    findOneBookmark(bid: string): Promise<Bookmark>;
    findAllBookmarksByUser(uid: string): Promise<Bookmark[]>;
}