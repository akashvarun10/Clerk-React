import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, CircularProgress, Typography, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(true); // Initial state to show the introduction
  const [donationAmount, setDonationAmount] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleProceed = () => {
    setShowInfo(false); // Proceed directly to the payment form
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      setErrorMessage('Please enter your credit card information.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setLoading(false);
      setErrorMessage(error.message || 'An error occurred while processing your payment.');
    } else {
      console.log('Payment Method:', paymentMethod);
      setLoading(false);
      setSuccess(true);
    }
  };

  const handleReturnHome = () => {
    navigate('/'); // Redirect to the homepage
  };

  return (
    <FullPageContainer>
      {showInfo ? (
        <InfoContainer>
          <Typography variant="h4" component="h1" gutterBottom>
            Why Donate to Our Cause?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Donations are critical for our operations and help us provide services and support to our beneficiaries. 
            Learn how your contributions make a difference and help us change lives.
          </Typography>
          <StyledButton onClick={handleProceed}>
            Learn More and Donate
          </StyledButton>
        </InfoContainer>
      ) : success ? (
        <>
          <Typography color="green" gutterBottom>Successfully Donated ${donationAmount} Dollars</Typography>
          <StyledButton onClick={handleReturnHome}>Return to Homepage</StyledButton>
        </>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label="Donation Amount (USD)"
            type="number"
            variant="outlined"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <StyledCardElement />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <StyledButton type="submit" disabled={!stripe || loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay'}
          </StyledButton>
        </StyledForm>
      )}
    </FullPageContainer>
  );
};

const FullPageContainer = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

const InfoContainer = styled('div')({
  textAlign: 'center',
  maxWidth: 600,
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Ensures text is readable
});

const StyledForm = styled('form')({
  width: '80%', // Increase the width of the form
  maxWidth: 300, // Limit the max width to maintain readability
});

const StyledCardElement = styled(CardElement)({
  marginTop: 16,
  padding: 12,
  borderRadius: 8,
  backgroundColor: '#f8f8f8',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:focus': {
    boxShadow: '0px 0px 8px 2px #007bff',
  },
  '&.StripeElement--invalid': {
    boxShadow: '0px 0px 8px 2px #ff7b7b',
  },
});

const StyledButton = styled(Button)({
  marginTop: 16,
  width: '100%', // Ensures button width is consistent
});

const ErrorMessage = styled(Box)({
  color: 'red',
  marginTop: 8,
});

export default PaymentForm;
