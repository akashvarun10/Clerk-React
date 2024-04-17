// import React, { FC, useEffect } from 'react';
// import { Typography} from '@mui/material';
// import { useUser } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';

// const App: FC = () => {
//   const { isSignedIn, user } = useUser();
//   const navigate = useNavigate();

//   const specificUsername = 'akashvarunp'; // The specific username

//   useEffect(() => {
//     if (!isSignedIn) {
//       // If the user is not signed in, potentially handle this differently or ensure the user is redirected to a sign-in page.
//       return;
//     }
//     // Check if the user's username matches the specific username
//     const usernameMatch = user?.username === specificUsername;
//     if (usernameMatch) {
//       navigate('/helloworld');
//     } else {
//       navigate('/places');
//     }
//   }, [isSignedIn, user, navigate]); // Ensure navigate is included in the dependency array if used.

//   if (!isSignedIn) {
//     return <Typography variant="h4">Please sign in</Typography>;
//   }
// };

// export default App;


// // 

// import React, { FC, useEffect, useState } from 'react';
// import { Typography, Button, Box } from '@mui/material';
// import { useUser } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';

// const App: FC = () => {
//   const { isSignedIn, user } = useUser();
//   const navigate = useNavigate();
//   const [showButtons, setShowButtons] = useState(false);

//   const specificUsername = 'akashvarunp'; // The specific username

//   useEffect(() => {
//     if (isSignedIn) {
//       setShowButtons(true);
//       // Check if the user's username matches the specific username
//       const usernameMatch = user?.username === specificUsername;
//       if (usernameMatch) {
//         navigate('/helloworld');
//       }
//     } else {
//       setShowButtons(false);
//     }
//   }, [isSignedIn, user, navigate]);

//   const handlePlacesClick = () => {
//     navigate('/places');
//   };

//   const handleLocationClick = () => {
//     // Handle the click event for the "Location" button
//     console.log("Location button clicked");
//   };

//   if (!isSignedIn) {
//     return <Typography variant="h4">Please sign in</Typography>;
//   }

//   return (
//     <>
//       {showButtons && (
//         <Box display="flex" justifyContent="center" mt={2}>
//           <Button variant="contained" onClick={handlePlacesClick} sx={{ mr: 2 }}>Places</Button>
//           <Button variant="contained" onClick={handleLocationClick}>Location</Button>
//         </Box>
//       )}
//     </>
//   );
// };

// export default App;


// import React, { FC, useEffect, useState } from 'react';
// import { Typography, Button, Box } from '@mui/material';
// import { useUser } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';
// import LocationPage from './components/LocationPage'; // Import the LocationPage component

// const App: FC = () => {
//   const { isSignedIn, user } = useUser();
//   const navigate = useNavigate();
//   const [showButtons, setShowButtons] = useState(false);

//   const specificUsername = 'akashvarunp'; // The specific username

//   useEffect(() => {
//     if (isSignedIn) {
//       setShowButtons(true);
//       // Check if the user's username matches the specific username
//       const usernameMatch = user?.username === specificUsername;
//       if (usernameMatch) {
//         navigate('/helloworld');
//       }
//     } else {
//       setShowButtons(false);
//     }
//   }, [isSignedIn, user, navigate]);

//   const handlePlacesClick = () => {
//     navigate('/places');
//   };

//   const handleLocationClick = () => {
//     navigate('/location'); // Navigate to the location page
//   };

//   if (!isSignedIn) {
//     return <Typography variant="h4">Please sign in</Typography>;
//   }

//   return (
//     <>
//       {showButtons && (
//         <Box display="flex" justifyContent="center" mt={2}>
//           <Button variant="contained" onClick={handlePlacesClick} sx={{ mr: 2 }}>Places</Button>
//           <Button variant="contained" onClick={handleLocationClick}>Location</Button>
//         </Box>
//       )}
//       {/* Route for the LocationPage component */}
//       <LocationPage />
//     </>
//   );
// };

// export default App;










import React, { FC, useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import LocationPage from './components/LocationPage'; // Import the LocationPage component

const App: FC = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  const specificUsername = 'akashvarunp'; // The specific username

  useEffect(() => {
    if (isSignedIn) {
      setShowButtons(true);
      // Check if the user's username matches the specific username
      const usernameMatch = user?.username === specificUsername;
      if (usernameMatch) {
        navigate('/helloworld');
      }
    } else {
      setShowButtons(false);
    }
  }, [isSignedIn, user, navigate]);

  const handlePlacesClick = () => {
    navigate('/places');
  };

  if (!isSignedIn) {
    return <Typography variant="h4">Please sign in</Typography>;
  }

  return (
    <>
      {showButtons && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={handlePlacesClick} sx={{ mr: 2 }}>Places</Button>
          <Button variant="contained" onClick={() => navigate('/location')}>Location</Button>
        </Box>
      )}
      <Routes>
        <Route path="/location" element={<LocationPage />} /> {/* Route for LocationPage */}
      </Routes>
    </>
  );
};

export default App;
