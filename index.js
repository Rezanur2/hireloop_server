import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());


const client = new MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-r1r24lp-shard-00-00.x1z7zef.mongodb.net:27017,ac-r1r24lp-shard-00-01.x1z7zef.mongodb.net:27017,ac-r1r24lp-shard-00-02.x1z7zef.mongodb.net:27017/?ssl=true&replicaSet=atlas-sivbkg-shard-0&authSource=admin`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();
const database = connectedClient.db("hireloopdb");
const users = database.collection("user");
const jobs = database.collection("jobs");

app.get('/users', async (req, res) => {
    const cursor = users.find({});
    const result = await cursor.toArray();
    res.send(result);
})

app.get('/', (req, res) => {
    res.send('Hello, Welcome to Hireloop!');
})

app.listen(port, () => {
    console.log(`Hire Loop is running on port ${port}`)
})