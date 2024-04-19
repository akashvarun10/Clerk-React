// index.js
import { fetchUsers } from './fetchUsers.js';

async function main() {
    console.log('Starting user synchronization...');
    try {
        await fetchUsers();
        console.log('User synchronization complete.');
    } catch (error) {
        console.error('Error during user synchronization:', error);
    }
}

main().catch(error => {
    console.error('Unhandled error in initial run:', error);
});

// setInterval(() => {
//     main().catch(error => {
//         console.error('Unhandled error during periodic synchronization:', error);
//     });
// }, 3600000); // 3600000 milliseconds = 1 hour

// index.js
// import { fetchUsers } from './fetchUsers.js';
// import { fetchUsersAndSendEmails } from './sendEmails.js'; // import the function

// async function main() {
//     console.log('Starting user synchronization...');
//     try {
//         await fetchUsers(); // This was your original functionality
//         console.log('User synchronization complete.');
//         console.log('Starting email sending process...');
//         await fetchUsersAndSendEmails(); // Now also send emails after fetching users
//         console.log('Email sending process complete.');
//     } catch (error) {
//         console.error('Error during process:', error);
//     }
// }

// main().catch(error => {
//     console.error('Unhandled error in initial run:', error);
// });

// setInterval(() => {
//     main().catch(error => {
//         console.error('Unhandled error during periodic synchronization:', error);
//     });
// }, 3600000); // 3600000 milliseconds = 1 hour
