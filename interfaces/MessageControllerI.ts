/**
 * @file Declares API for a message controller and its methods
 */

import {Request, Response} from "express";

export default interface MessageController {
    sendMessage (req: Request, res: Response): void;
    findAllOutbox(req: Request, res: Response): void;
    findAllInbox(req: Request, res: Response): void;
    deleteOneMessage(req: Request, res: Response): void;
    deleteAllMessagesByUser(req: Request, res: Response): void;
    editMessage(req: Request, res: Response): void;
}