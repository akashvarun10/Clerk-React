// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ClerkProvider } from '@clerk/clerk-react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import App from './App';
// import Layout from './components/Layout';
// import NoMatch from './components/NoMatch';
// import HelloWorld from './components/HelloWorld';
// import Places from './components/Places';

// const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

// ReactDOM.render(
//   <React.StrictMode>
//     <ClerkProvider publishableKey={publishableKey}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<App />} />
//             <Route path="helloworld" element={<HelloWorld />} />
//             <Route path="places" element={<Places />} />
//           </Route>
//           <Route path="*" element={<NoMatch />} />
//         </Routes>
//       </BrowserRouter>
//     </ClerkProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import HelloWorld from './components/HelloWorld';
import Places from './components/Places';
import LocationPage from './components/LocationPage'; // Import the LocationPage component

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

ReactDOM.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="helloworld" element={<HelloWorld />} />
            <Route path="places" element={<Places />} />
            <Route path="location" element={<LocationPage />} /> {/* Add the LocationPage route */}
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


