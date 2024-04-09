// import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";
// import { FC } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// // import "../styles/Header.css";

// const SignUpButton: FC = () => {
//   const clerk = useClerk();

//   return (
//     <button className="sign-up-btn" onClick={() => clerk.openSignUp({})}>
//       Sign up
//     </button>
//   );
// };

// const SignInButton: FC = () => {
//   const clerk = useClerk();

//   return (
//     <button className="sign-in-btn" onClick={() => clerk.openSignIn({})}>
//       Sign in
//     </button>
//   );
// };

// const Header: FC = () => {
//   return (
//     <header>
//       <nav>
//         <SignedOut>
//           <ul>
//             <li>
//               <SignUpButton />
//             </li>

//             <li>
//               <SignInButton />
//             </li>
//           </ul>
//         </SignedOut>

//         <SignedIn>
//           <UserButton afterSignOutUrl="/" />
//         </SignedIn>
//       </nav>
//       <Link to="/some-route">Some Route</Link> {/* Example usage of Link */}
//     </header>
//   );
// };

// export default Header;

import { AppBar, Toolbar, Button, Link as MuiLink } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" style={{ flexGrow: 1 }}>
          <MuiLink color="inherit" underline="none">
            Clerk + React
          </MuiLink>
        </Link>
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
