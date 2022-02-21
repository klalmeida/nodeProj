/**
 * @file Declares User data type representing a Tuiter user
 * in the system.
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

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
export default interface User {
    uid: mongoose.Schema.Types.ObjectId,
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
    headerImage: string;
    accountType: AccountType;
    maritalStatus: MaritalStatus;
    biography: string;
    dateOfBirth: Date;
    joined: Date;
    location: Location;
 }
 