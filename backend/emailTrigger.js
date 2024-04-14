// // emailTrigger.js
// import { fetchUsersAndSendEmails } from './sendEmails.js';

// async function main() {
//     console.log('Starting the email sending process...');
//     try {
//         await fetchUsersAndSendEmails();
//         console.log('Email sending process complete.');
//     } catch (error) {
//         console.error('Error during email sending process:', error);
//     }
// }

// main().catch(error => {
//     console.error('Unhandled error in email sending run:', error);
// });

// // Optionally, you can also set this to run periodically like in index.js
// setInterval(() => {
//     main().catch(error => {
//         console.error('Unhandled error during periodic email sending:', error);
//     });
// }, 3600000); // 3600000 milliseconds = 1 hour


// emailTrigger.js
import { fetchUsersAndSendEmails } from './sendEmails.js';

async function main() {
    console.log('Starting the email sending process...');
    try {
        await fetchUsersAndSendEmails();
        console.log('Email sending process complete.');
    } catch (error) {
        console.error('Error during email sending process:', error);
    }
}

main().catch(error => {
    console.error('Unhandled error in email sending run:', error);
});