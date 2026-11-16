import { MongoClient, Db } from "mongodb";

/**
 * MongoDB Client Singleton for Better Auth
 *
 * Provides connection pooling across Next.js API routes and avoids
 * connection leaks during development hot-reloading (HMR).
 */

const uri = process.env.MONGO_URI;
const DB_NAME = "bd_sister";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClient = client;
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
    client = global._mongoClient ?? client;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
} else {
  // Graceful stub for build-time static evaluation
  clientPromise = null;
  client = null;
}

export function getMongoClient(): MongoClient | null {
  return client;
}

export function getMongoDb(): Db | null {
  if (!client) return null;
  return client.db(DB_NAME);
}

export { client, clientPromise, DB_NAME };
