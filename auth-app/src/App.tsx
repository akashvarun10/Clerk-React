import React, { FC } from 'react';
import { Typography, Link, Container } from '@mui/material';
import Places from './components/Places'; // Ensure the correct path

const App: FC = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Clerk + React
      </Typography>
      <Link href="https://docs.clerk.dev/reference/clerk-react" target="_blank" rel="noopener noreferrer">
        Learn more
      </Link>
      {/* Render the LocationSearch component below */}
      <div style={{ marginTop: '2rem' }}>
        <Places/>
      </div>
    </Container>
  );
};

export default App;
