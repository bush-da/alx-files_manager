import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * Controller to handle app status and stats.
 */
class AppController {
  /**
   * Returns the status of the app, including Redis and DB connectivity.
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   */
  static async getStatus(req, res) {
   console.log('Redis Status:', redisClient.isAlive());
   console.log('DB Status:', dbClient.isAlive());
   const status = {
     redis: redisClient.isAlive(),
     db: dbClient.isAlive(),
   };
   res.status(200).json(status);
 }
  /**
   * Returns the number of users and files in the database.
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   */
  static async getStats(req, res) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    res.status(200).json(stats);
  }
}

export default AppController;
