/**
 * @file Controller RESTful Web service API for authentication resource
 */

import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * @constructor AuthenticationController Implements RESTful Web service API for authentication.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/auth/login to login to an account
 *     </li>
 *     <li>POST /api/auth/register a new account
 *     </li>
 *     <li>POST /api/auth/profile create profile screen
 *     </li>
 *     <li>POST /api/auth/logout to logout of an account
 *     </li>
 * </ul>
 * @property {UserDao} singleton DAO implementing follow CRUD operations
 */
const AuthenticationController = (app: Express) => {
    const userDao: UserDao = UserDao.getInstance();

    /**
     * creates new login instance asynchronously
     * @param req Request from client
     * @param res Response to client
     */
    const login = async (req: Request, res: Response) => {

        console.log("==> login")
        console.log("==> req.session")
        console.log(req.session)

        const user = req.body;
        const username = user.username;
        const password = user.password;
        console.log(password)
        const existingUser = await userDao
            .findUserByUsername(username);
        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * creates new registration instance asynchronously if the user
     * does not already exist in the database
     * @param req Request from client
     * @param res Response to client
     */
    const register = async (req: Request, res: Response) => {
        console.log("==> register")
        console.log("==> req.session")
        console.log(req.session)

        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * creates new profile instance
     * @param req Request from client
     * @param res Response to client
     */
    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * creates new logout instance to terminate the session
     * @param req Request from client
     * @param res Response to client
     */
    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/auth/login", login);
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}

export default AuthenticationController;