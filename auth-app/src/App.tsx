import { FC, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import LocationPage from './components/LocationPage'; // Import the LocationPage component
import PaymentForm from './components/PaymentForm'; // Import the PaymentForm component
import { setUser } from './userSlice'; // Import setUser action
import { useDispatch } from 'react-redux';
import CrisisConnectBot from './components/CrisisConnectBot';

const App: FC = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn) {
      // Dispatch setUser action after successful login
      dispatch(setUser({ 
        username: user?.username,
        emailAddress: user?.emailAddresses[0]?.emailAddress,
        role: user?.username === 'akashvarunp' ? 'special' : 'user'
      }));
      // Redirect special user to HelloWorld component after login
      if (user?.username === 'akashvarunp') {
        navigate('/helloworld');
      }
    }
  }, [isSignedIn, user, dispatch, navigate]);

  const handlePlacesClick = () => {
    navigate('/places');
  };

  const handlePaymentClick = () => {
    navigate('/payment'); // Navigate to the payment form
  };

  if (!isSignedIn) {
    return <Typography variant="h4">Please sign in</Typography>;
  }

  return (
    <>
      <CrisisConnectBot />
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" onClick={handlePlacesClick} sx={{ mr: 2 }}>Places</Button>
        <Button variant="contained" onClick={handlePaymentClick} sx={{ mr: 2 }}>Payment</Button> {/* Add payment button */}
        <Button variant="contained" onClick={() => navigate('/location')}>Location</Button>
      </Box>
      <Routes>
        <Route path="/location" element={<LocationPage />} /> {/* Route for LocationPage */}
        <Route path="/payment" element={<PaymentForm />} /> {/* Ensure this line is present */}
      </Routes>
    </>
  );
};

export default App;
