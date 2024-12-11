import { MongoClient } from 'mongodb';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance and connects to MongoDB.
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}`;

    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.database = this.client.db(database);
    this.client.connect().catch((err) => {
      console.error('MongoDB Client Connection Error:', err);
    });
  }

  /**
   * Checks if the MongoDB client is connected.
   * @returns {boolean} True if connected, otherwise false.
   */
  isAlive() {
    return this.client && this.client.isConnected();
  }

  /**
   * Returns the number of documents in the "users" collection.
   * @returns {Promise<number>} The number of user documents.
   */
  async nbUsers() {
    try {
      const collection = this.database.collection('users');
      return await collection.countDocuments();
    } catch (err) {
      console.error('Error counting users:', err);
      return 0;
    }
  }

  /**
   * Returns the number of documents in the "files" collection.
   * @returns {Promise<number>} The number of file documents.
   */
  async nbFiles() {
    try {
      const collection = this.database.collection('files');
      return await collection.countDocuments();
    } catch (err) {
      console.error('Error counting files:', err);
      return 0;
    }
  }
}

/**
 * A singleton instance of the DBClient class.
 */
const dbClient = new DBClient();
export default dbClient;
