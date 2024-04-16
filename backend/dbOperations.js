// dbOperations.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path: '../.env.local'});



const mongoUrl = process.env.MONGO_URL; // Replace with your MongoDB connection string
const dbName = 'Authentication_test'; // Set your database name
const collectionName = 'users'; // Set your collection name

async function userExists(email, client) {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const user = await collection.findOne({ email: email });
    return !!user;
}

async function insertUsers(users) {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const newUsers = [];

        for (const user of users) {
            if (!await userExists(user.email, client)) {
                newUsers.push(user);
            }
        }

        if (newUsers.length > 0) {
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            await collection.insertMany(newUsers);
            console.log(`${newUsers.length} new users have been successfully inserted into the database.`);
        } else {
            console.log("No new users to insert.");
        }
    } catch (error) {
        console.error('Failed to insert new users:', error);
    } finally {
        await client.close();
    }
}

export { insertUsers };

