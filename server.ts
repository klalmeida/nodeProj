/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import DislikeController from "./controllers/DislikeController";
import SessionController from "./controllers/SessionController";
import AuthenticationController from "./controllers/AuthenticationController";
import GroupController from "./controllers/GroupController";


const session = require("express-session");
dotenv.config();
const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://hopeful-gates-42f125.netlify.app';
const CORS_ORIGINs = [CORS_ORIGIN, 'http://https://hopeful-gates-42f125.netlify.app']

app.use(cors({
    credentials: true,
    origin: CORS_ORIGINs
}));

let sess = {
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.ENVIRONMENT === "PRODUCTION" ? 'none' : 'lax',
        secure: process.env.ENVIRONMENT === "PRODUCTION",
    }
}

if (process.env.ENVIRONMENT === 'PRODUCTION'){
    app.set('tust proxy', 1)
}

app.use(session(sess));


const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.agrs0.mongodb.net";
const DB_NAME = "Tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to the party!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const dislikesController = DislikeController.getInstance(app);
SessionController(app);
AuthenticationController(app);
GroupController(app);


const PORT = 4000;
app.listen(process.env.PORT || PORT);