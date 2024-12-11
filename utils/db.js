// Import MongoDB client
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Set up environment variables with defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Connection URL and database name
    this.client = new MongoClient(`mongodb://${host}:${port}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Initialize connection and database
    this.database = null;
    this.client.connect()
      .then(() => {
        this.database = this.client.db(database);
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
  }

  // Check if the database connection is alive
  isAlive() {
    return this.client && this.client.isConnected();
  }

  // Count the number of documents in the users collection
  async nbUsers() {
    if (!this.isAlive()) return 0;
    return this.database.collection('users').countDocuments();
  }

  // Count the number of documents in the files collection
  async nbFiles() {
    if (!this.isAlive()) return 0;
    return this.database.collection('files').countDocuments();
  }
}

// Export a single instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
