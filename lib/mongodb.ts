import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

type GlobalMongo = {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
};

declare global {
  var _mongo: GlobalMongo | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;
if (uri) {
  const options: MongoClientOptions = {};
  if (!global._mongo) {
    global._mongo = {
      client: null,
      promise: new MongoClient(uri, options).connect(),
    };
  }
  clientPromise = (global._mongo.promise as Promise<MongoClient>) ?? null;
}

export default clientPromise;

