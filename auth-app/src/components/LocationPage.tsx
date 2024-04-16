import React, { useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import Autocomplete from '@mui/material/Autocomplete';

type ExtendedWindow = typeof window & {
  showSaveFilePicker?: any; // Define the method as 'any' for now
};

const LocationPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const saveLocationToDatabase = async (location: string, user: any) => {
    const userData = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
      location: location
    };

    try {
      const extendedWindow = window as ExtendedWindow; // Cast window to ExtendedWindow
      if (!extendedWindow.showSaveFilePicker) {
        throw new Error('showSaveFilePicker is not supported');
      }

      const handle = await extendedWindow.showSaveFilePicker({
        types: [{
          description: 'JSON files',
          accept: {
            'application/json': ['.json'],
          },
        }],
      });

      const writableStream = await handle.createWritable();
      await writableStream.write(JSON.stringify(userData, null, 2));
      await writableStream.close();

      console.log('Data saved to JSON file successfully:', userData);
      alert('Location saved successfully!');
    } catch (error) {
      console.error('Error saving data to JSON file:', error);
      alert('Error saving location. Please try again later.');
    }
  };

  const handleSaveLocation = async () => {
    if (!location) {
      alert('Please enter a location');
      return;
    }

    setSaving(true);
    try {
      await saveLocationToDatabase(location, user);
      setLocation('');
    } finally {
      setSaving(false);
    }
  };

  // Autocomplete functionality
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleAutocompleteChange = (newValue: string | null) => {
    setValue(newValue || '', false);
    setLocation(newValue || '');
    clearSuggestions();
    if (!newValue) return;
    getGeocode({ address: newValue })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => setSelectedLocation({ lat, lng }))
      .catch(error => console.error("Error: ", error));
  };

  const libraries = ['places'] as const; // Corrected type
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyALvS5oK04po7EP4eNSm82BM6uv4pMbrhE',
    libraries,
  });

  return (
    <div>
      <Typography variant="h4">Enter Location</Typography>
      <Autocomplete
        freeSolo
        disableClearable
        disabled={!ready}
        options={status === "OK" ? data.map((suggestion) => suggestion.description) : []}
        value={value}
        onChange={(_, newValue) => handleAutocompleteChange(newValue)}
        onInputChange={(_, newInputValue) => setValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter your location"
          />
        )}
      />
      {isLoaded && (
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMap
            zoom={10}
            center={selectedLocation || { lat: 0, lng: 0 }}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveLocation}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Location'}
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        style={{ marginLeft: '10px' }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default LocationPage;


