import { MongoClient } from "mongodb";

// A cached connection so we don't open a new MongoDB connection on every
// serverless function invocation (Vercel reuses warm instances, so caching
// on globalThis avoids exhausting the connection pool).

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Missing MONGODB_URI environment variable. Add it in .env.local (dev) and in your Vercel project's Environment Variables (production)."
  );
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
