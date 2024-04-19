// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ClerkProvider } from '@clerk/clerk-react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import App from './App';
// import Layout from './components/Layout';
// import NoMatch from './components/NoMatch';
// import HelloWorld from './components/HelloWorld';
// import Places from './components/Places';
// import LocationPage from './components/LocationPage'; // Import the LocationPage component


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
//             <Route path="location" element={<LocationPage />} /> {/* Add the LocationPage route */}
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
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from './store'; // Import the Redux store
import PaymentForm from './components/PaymentForm'; // Import the PaymentForm component
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51P6oYh07acdJkbfyzCzPNzDylAWgAG7NBkwAWkvnjMw01bvlQ1xMDy77RXuOjKSnYR80tOCiSePEaqjZsQgHBlZQ00PU3szxak');
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

ReactDOM.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <Provider store={store}> {/* Wrap the app with Provider and pass the Redux store */}
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="helloworld" element={<HelloWorld />} />
              <Route path="places" element={<Places />} />
              <Route path="location" element={<LocationPage />} /> {/* Add the LocationPage route */}
              <Route path="payment" element={<PaymentForm />} /> {/* Add the PaymentForm route */}
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
        </Elements>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


