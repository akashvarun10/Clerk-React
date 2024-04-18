import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, Autocomplete, AutocompleteRenderInputParams } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const LocationPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [saving, setSaving] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [savedLocation, setSavedLocation] = useState('');


  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyALvS5oK04po7EP4eNSm82BM6uv4pMbrhE', // Replace with your actual API key
    libraries: ['places'],
  });

  // Autocomplete configuration
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleInputChange = (_: React.SyntheticEvent, newValue: string | null): void => {
    setValue(newValue ?? '', true);
  };

  const handleAutocompleteChange = (_: React.SyntheticEvent, newValue: string | null): void => {
    setValue(newValue ?? '', false);
    clearSuggestions();
    if (!newValue) return;
    getGeocode({ address: newValue })
      .then(results => getLatLng(results[0]))
      .then((latLng: google.maps.LatLngLiteral) => {
        setSelectedLocation(latLng);
        setLocation(newValue);
      })
      .catch(error => console.error("Error: ", error));
  };

  // Fetch location from backend
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/location/${user.id}`)
        .then(response => response.json())
        .then(data => {
          if (data.location) {
            setSavedLocation(data.location);
            setLocation(data.location); // Update input field and marker
            getGeocode({ address: data.location })
              .then(results => getLatLng(results[0]))
              .then(latLng => setSelectedLocation(latLng));
          }
        })
        .catch(error => console.error('Error fetching location:', error));
    }
  }, [user]);

  // Save location to backend
  const handleSaveLocation = async () => {
    if (!location) {
      alert('Please enter a location');
      return;
    }
  
    setSaving(true);
    try {
      const userDetails = {
        userId: user?.id,
        location,
        username: user?.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        emailAddress: user?.emailAddresses[0].emailAddress,
      };
  
      const response = await fetch('http://localhost:3000/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails)
      });
  
      if (response.ok) {
        const data = await response.json();
        setSavedLocation(data.location);
        alert('Location saved successfully!');
      } else {
        throw new Error('Failed to save location');
      }
    } catch (error) {
      console.error('Failed to save location', error);
      alert('Failed to save location');
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      <Typography variant="h4">Enter Location</Typography>
      <Autocomplete
        freeSolo
        disableClearable
        disabled={!ready}
        options={status === "OK" ? data.map(suggestion => suggestion.description) : []}
        value={value}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField {...params} label="Location" fullWidth variant="outlined" margin="normal" placeholder="Enter your location" />
        )}
      />
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="primary" onClick={handleSaveLocation} disabled={saving}>
          {saving ? 'Saving...' : 'Save Location'}
        </Button>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
      {isLoaded && selectedLocation && (
        <div style={{ height: '400px', width: '100%', marginTop: '10px' }}>
          <GoogleMap
            zoom={12}
            center={selectedLocation}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            <Marker position={selectedLocation} />
          </GoogleMap>
        </div>
      )}
      <Typography variant="body1" style={{ marginTop: '10px' }}>
        Saved Location: {savedLocation}
      </Typography>
    </div>
  );
};

export default LocationPage;

