/**
 * @file Declares Stats data type representing the stored
 * information relating to a tuit
 */

/**
 * @typedef Stats Represents the stored interaction data relating
 * to a specific tuit
 * @property {number} replies amount of replies a tuit has
 * @property {number} retuits amoung of retuits a tuit has
 * @property {number} likes amount of likes a tuit has
 * @property {number} dislikes amoung of dislikes a tuit has *
  */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number,
    dislikes: number
};