// import React from "react";
// import ReactDOM from "react-dom";
// import { ClerkProvider } from "@clerk/clerk-react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import App from "./App";
// // import Header from "./components/Header";
// import Layout from "./components/Layout";
// import NoMatch from "./components/NoMatch";

// // import "./styles/index.css";

// const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

// ReactDOM.render(
//   <React.StrictMode>
//     <ClerkProvider publishableKey={publishableKey}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<App />} />
//           </Route>
//           <Route path="*" element={<NoMatch />} />
//         </Routes>
//       </BrowserRouter>
//     </ClerkProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

ReactDOM.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
