// // import logo from "./logo.svg";
// import { FC } from "react";
// // import "./styles/App.css";

// const App: FC = () => {
//   return (
//     <div className="app">
//       <h1>Clerk + React</h1>
//       {/* <img src={logo} alt="logo" /> */}
//       <a
//         href="https://docs.clerk.dev/reference/clerk-react"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn more
//       </a>
//     </div>
//   );
// };

// export default App;

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
