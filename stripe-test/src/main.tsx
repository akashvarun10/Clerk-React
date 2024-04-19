// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import App from './App';

const stripePromise = loadStripe('pk_test_51P6oYh07acdJkbfyzCzPNzDylAWgAG7NBkwAWkvnjMw01bvlQ1xMDy77RXuOjKSnYR80tOCiSePEaqjZsQgHBlZQ00PU3szxak');

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
