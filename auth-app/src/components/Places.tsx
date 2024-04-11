import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SignedIn } from '@clerk/clerk-react';
import config from './config'; // Make sure this is your actual config file

interface Place {
  id: string;
  name: string;
  vicinity: string;
  distance?: number; // Optional field for distance
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface PlacesAutocompleteProps {
  setSelected: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}


const Places = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.googleMapsApiKey,
    libraries: ["places", "geometry"],
  });

  const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);
  const [nearestHospitals, setNearestHospitals] = useState<Place[]>([]);
  const [nearestPoliceStations, setNearestPoliceStations] = useState<Place[]>([]);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  const fetchPlaces = async (location: google.maps.LatLngLiteral, type: 'hospital' | 'police') => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const options: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: 5000,
      type: type,
    };

    service.nearbySearch(options, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const transformedResults = results.slice(0, 3).map(result => ({
          id: result.place_id ?? 'unknown',
          name: result.name ?? 'No Name',
          vicinity: result.vicinity ?? 'No Address',
          geometry: {
            location: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
            }
          },
          distance: google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(location.lat, location.lng),
            result.geometry.location
          ),
        })).sort((a, b) => a.distance - b.distance);

        if (type === 'hospital') {
          setNearestHospitals(transformedResults);
        } else {
          setNearestPoliceStations(transformedResults);
        }
      }
    });
  };

  const handleFindNearby = () => {
    if (!selected) return;
    fetchPlaces(selected, 'hospital');
    fetchPlaces(selected, 'police');
  };

  const handleDirection = async (destination: google.maps.LatLngLiteral) => {
    if (!selected) return;

    setSelectedLocation(destination);

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: selected,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const clearDirections = () => {
    setDirections(null);
    setSelectedLocation(null);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <SignedIn>
      <div style={{ marginBottom: '1rem' }}>
        <PlacesAutocomplete setSelected={setSelected} setSearchInput={setSearchInput} />
        <Button variant="contained" onClick={handleFindNearby}>Find Nearby</Button>
      </div>
      {selected && (
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMap
            zoom={10}
            center={selected}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            <Marker position={selected} />
            {nearestHospitals.concat(nearestPoliceStations).map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
              />
            ))}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: '#6200EE',
                    strokeWeight: 5,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>
      )}
      {searchInput && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <Typography variant="h5">Hospitals</Typography>
            {nearestHospitals.map((hospital, index) => (
              <div key={index}>
                <Typography variant="h6">{hospital.name}</Typography>
                <Typography variant="body2">{hospital.vicinity}</Typography>
                <Typography variant="body2">{(hospital.distance / 1000).toFixed(2)} km</Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDirection(hospital.geometry.location);
                    clearDirections();
                  }}
                >
                  Get Directions
                </Button>
              </div>
            ))}
          </div>
          <div>
            <Typography variant="h5">Police Stations</Typography>
            {nearestPoliceStations.map((station, index) => (
              <div key={index}>
                <Typography variant="h6">{station.name}</Typography>
                <Typography variant="body2">{station.vicinity}</Typography>
                <Typography variant="body2">{(station.distance / 1000).toFixed(2)} km</Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDirection(station.geometry.location);
                    clearDirections();
                  }}
                >
                  Get Directions
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </SignedIn>
  );
};

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setSelected, setSearchInput }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  return (
    <Autocomplete
      freeSolo
      disableClearable
      disabled={!ready}
      options={status === "OK" ? data.map((suggestion) => suggestion.description) : []}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue || '', false);
        setSearchInput(newValue);
        clearSuggestions();
        if (!newValue) return;
        getGeocode({ address: newValue })
          .then(results => getLatLng(results[0]))
          .then(({ lat, lng }) => setSelected({ lat, lng }))
          .catch(error => console.error("Error: ", error));
      }}
      onInputChange={(_, newInputValue) => setValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search an address"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {!ready ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default Places;

