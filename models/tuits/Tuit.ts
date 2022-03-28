/**
 * @file Declares Tuit data type representing the stored
 * parameters of a tuit
 */
import User from "../users/User";
import Stats from "./Stats";

/**
 * @typedef Tuit Represents the stored data parameters of a
 * given tuit
 * @property {string} tuit the text of the tuit
 * @property {User} postedBy user who made the tuit
 * @property {Date} postedOn date the tuit was posted
 * @property {string} image possible tuit image
 * @property {string} youtube possible tuit video
 * @property {string} avatarLogo user avatar image
 * @property {string} imageOverlay image overlay
 * @property {string} stats interaction information about the tuit
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};