import { FC } from 'react';
import { Typography, Link } from '@mui/material';

const App: FC = () => {
  return (
    <div className="app">
      <Typography variant="h1">Clerk + React</Typography>
      <Link href="https://docs.clerk.dev/reference/clerk-react" target="_blank" rel="noopener noreferrer">
        Learn more
      </Link>
    </div>
  );
};

export default App;
