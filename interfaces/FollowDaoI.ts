import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows-related DAO methods
 */
export default interface FollowDaoI {
    userFollowsUser (uid1: string, uid2: string): Promise<Follow[]>;
    userUnfollowsUser (uid1: string, uid2: string): Promise<any>;
    findAllFollowers (uid: string): Promise<Follow[]>;
    findAllFollowing (uid: string): Promise<Follow[]>;
    acceptFollowRequest (uid1: string, uid2: string): Promise<Follow[]>;
    rejectFollowRequest (uid1: string, uid2: string): Promise<any>;
};