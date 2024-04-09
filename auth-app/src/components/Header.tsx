import { AppBar, Toolbar, Button } from '@mui/material';
import { FC } from 'react';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';

const SignUpButton: FC = () => {
  const clerk = useClerk();

  return (
    <Button color="inherit" onClick={() => clerk.openSignUp({})}>
      Sign up
    </Button>
  );
};

const SignInButton: FC = () => {
  const clerk = useClerk();

  return (
    <Button color="inherit" onClick={() => clerk.openSignIn({})}>
      Sign in
    </Button>
  );
};

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <SignedOut>
          <SignUpButton />
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
