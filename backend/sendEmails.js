import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' }); // Adjust as necessary

const mongoUrl = process.env.MONGO_URL;
const dbName = 'Authentication_test';
const collectionName = 'users';

const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: process.env.EMAIL_USERNAME, // Your Outlook email address
        pass: process.env.EMAIL_PASSWORD  // Your Outlook password
    }
});

async function sendEmail(to, subject, text, firstName) {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address must be your Outlook email
        to: to,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${firstName} (${to})`);
    } catch (error) {
        console.error(`Error sending email to ${firstName} (${to}):`, error);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUsersAndSendEmails() {
    const client = new MongoClient(mongoUrl);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const users = await collection.find({}).toArray();

        for (const user of users) {
            if (user.email && user.firstName) {
                await sendEmail(
                    user.email,
                    'CrisisConnect App Test Email',
                    `Hey ${user.firstName}, this is CrisisConnect app and this is a test email.`,
                    user.firstName
                );
                await delay(1000); // Delay to avoid hitting rate limits
            } else {
                console.log(`Missing email or firstName for user ID: ${user._id}, skipping...`);
            }
        }
        console.log('All emails are being processed.');
    } catch (error) {
        console.error('Failed to fetch users and send emails:', error);
    } finally {
        await client.close();
    }
}

export { fetchUsersAndSendEmails };