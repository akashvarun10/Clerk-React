// import React, { FC } from 'react';
// import { Typography, Link, Container } from '@mui/material';
// import Places from './components/Places'; // Ensure the correct path

// const App: FC = () => {
//   return (
//     <Container maxWidth="md" style={{ marginTop: '2rem' }}>
//       <Typography variant="h4" gutterBottom>
//         Clerk + React
//       </Typography>
//       <Link href="https://docs.clerk.dev/reference/clerk-react" target="_blank" rel="noopener noreferrer">
//         Learn more
//       </Link>
//       {/* Render the LocationSearch component below */}
//       <div style={{ marginTop: '2rem' }}>
//         <Places/>
//       </div>
//     </Container>
//   );
// };

// export default App;


import React, { FC } from 'react';
import { Container, Typography, Link } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import Places from './components/Places';
import HelloWorld from './components/HelloWorld';
import { useNavigate } from 'react-router-dom';

const App: FC = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const specificUsername = 'akashvarunp'; // The specific username

  if (!isSignedIn) {
    return <Typography variant="h4">Please sign in</Typography>;
  }

  // Check if the user's username matches the specific username
  const usernameMatch = user?.username === specificUsername;

  const handleContentRender = () => {
    if (usernameMatch) {
      navigate('/helloworld');
    } else {
      navigate('/places');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Clerk + React
      </Typography>
      <Link
        href="https://docs.clerk.dev/reference/clerk-react"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </Link>
      <div style={{ marginTop: '2rem' }}>
        {/* Call the handleContentRender function to navigate to the appropriate route */}
        {handleContentRender()}
      </div>
    </Container>
  );
};

export default App;