import React, { FC, useEffect } from 'react';
import { Container, Typography, Link } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const App: FC = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const specificUsername = 'akashvarunp'; // The specific username

  useEffect(() => {
    if (!isSignedIn) {
      // If the user is not signed in, potentially handle this differently or ensure the user is redirected to a sign-in page.
      return;
    }
    // Check if the user's username matches the specific username
    const usernameMatch = user?.username === specificUsername;
    if (usernameMatch) {
      navigate('/helloworld');
    } else {
      navigate('/places');
    }
  }, [isSignedIn, user, navigate]); // Ensure navigate is included in the dependency array if used.

  if (!isSignedIn) {
    return <Typography variant="h4">Please sign in</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Clerk + React
      </Typography>
      <Link
        href="https://docs.clerk.dev/reference/clerk-react"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </Link>
    </Container>
  );
};

export default App;

