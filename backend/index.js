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

setInterval(() => {
    main().catch(error => {
        console.error('Unhandled error during periodic synchronization:', error);
    });
}, 3600000); // 3600000 milliseconds = 1 hour
