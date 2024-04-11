// // Use dynamic import to load node-fetch as an ES module
// import('node-fetch').then(({default: fetch}) => {
//     const clerkApiKey = '';
//     const clerkApiUrl = 'https://api.clerk.dev/v1/users';

//     async function fetchUsers() {
//         try {
//             const response = await fetch(clerkApiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${clerkApiKey}`,
//                     'Content-Type': 'application/json'
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status}`);
//             }

//             const users = await response.json();
//             console.log(users);
//         } catch (error) {
//             console.error('Failed to fetch users:', error);
//         }
//     }

//     fetchUsers();
// });



import('node-fetch').then(({default: fetch}) => {
    const fs = require('fs').promises;


    const clerkApiKey = 'sk_test_y44zUP1KL3rvMhzUBWqONFlefqZAOGRNmjmuwg1ctx';
    const clerkApiUrl = 'https://api.clerk.dev/v1/users';
    

    async function fetchUsers() {
        try {
            const response = await fetch(clerkApiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${clerkApiKey}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const users = await response.json();
            const filteredUsers = users.map(user => ({
                firstname: user.first_name, // Assuming the field is named 'first_name' in the response
                username: user.username, // Adjust field name as necessary
                email: user.email_addresses[0]?.email // Assuming 'email_addresses' is an array; adjust as necessary
            }));
            
            await fs.writeFile('filteredUsers.json', JSON.stringify(filteredUsers, null, 2));
            console.log('Filtered users have been saved to filteredUsers.json');
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    }

    fetchUsers();
});













// import('node-fetch').then(({default: fetch}) => {
//     const fs = require('fs').promises;

//     const clerkApiKey = 'sk_test_y44zUP1KL3rvMhzUBWqONFlefqZAOGRNmjmuwg1ctx';
//     const clerkApiUrl = 'https://api.clerk.dev/v1/users';

//     async function fetchUsers() {
//         try {
//             const response = await fetch(clerkApiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${clerkApiKey}`,
//                     'Content-Type': 'application/json'
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status}`);
//             }

//             const users = await response.json();
//             await fs.writeFile('users.json', JSON.stringify(users, null, 2));
//             console.log('Users have been saved to users.json');
//         } catch (error) {
//             console.error('Failed to fetch users:', error);
//         }
//     }

//     fetchUsers();
// });
