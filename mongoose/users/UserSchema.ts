/**
 * @file Implements a mongoose schema for bookmarks
*/

import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @typedef User Represents a single user of the application
 * @property {ObjectId} uid system-generated primary key
 * @property {string} username user-selected display name
 * @property {string} password account password
 * @property {string} firstName user's first name
 * @property {string} lastName user's last name
 * @property {string} email user's email address
 * @property {string} profilePhoto image address for profile photo
 * @property {string} headerImage image address for header photo
 * @property {AccountType} accountType enum for type of account, options
 *      are personal, professional, or academic 
 * @property {MaritalStatus} maritalStatus enum for the user's marital
 *      status, options are single, married, or widowed
 * @property {string} biography short description of user
 * @property {string} dateOfBirth user's DOB
 * @property {string} joined date user created their Tuiter account
 * @property {Location} location the user's location as defined by two
 *      values: latitude and longitude
*/
const UserSchema = new mongoose.Schema<User>({
    uid: {type: String, required: true},
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    biography: String,
    dateOfBirth: Date,
    joined: Date,
    location: {latitude: Number, longitude: Number},
}, {collection: "users"});

export default UserSchema;