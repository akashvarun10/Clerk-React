// import React, { useState } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import CircularProgress from '@mui/material/CircularProgress';
// import { SignedIn } from '@clerk/clerk-react'; // Import Clerk components
// import config from './config'; // Ensure this points to your actual config file

// const Places = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: config.googleMapsApiKey, // Make sure your API key is correctly referenced here
//     libraries: ["places"],
//   });

//   const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <SignedIn>
//       <div style={{ marginBottom: '1rem' }}>
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>
//       {selected && (
//         <div style={{ height: '400px', width: '100%' }}>
//           <GoogleMap
//             zoom={10}
//             center={selected}
//             mapContainerStyle={{ width: '100%', height: '100%' }}
//           >
//             <Marker position={selected} />
//           </GoogleMap>
//         </div>
//       )}
//     </SignedIn>
//   );
// };

// interface PlacesAutocompleteProps {
//   setSelected: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>;
// }

// const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     debounce: 300,
//   });

//   return (
//     <Autocomplete
//       freeSolo
//       disableClearable
//       disabled={!ready}
//       options={status === "OK" ? data.map((suggestion) => suggestion.description) : []}
//       value={value}
//       onChange={(_, newValue) => {
//         setValue(newValue || '', false);
//         clearSuggestions();
//         if (!newValue) return;
//         getGeocode({ address: newValue })
//           .then(results => getLatLng(results[0]))
//           .then(({ lat, lng }) => {
//             setSelected({ lat, lng });
//           })
//           .catch(error => console.error("Error: ", error));
//       }}
//       onInputChange={(_, newInputValue) => {
//         setValue(newInputValue);
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Search an address"
//           variant="outlined"
//           fullWidth
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {!ready ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// };

// export default Places;





// import React, { useState } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import CircularProgress from '@mui/material/CircularProgress';
// import { SignedIn } from '@clerk/clerk-react';
// import config from './config'; // Make sure this points to your actual config file

// interface Place {
//   id: string;
//   name: string;
//   vicinity: string;
//   geometry: {
//     location: {
//       lat: number;
//       lng: number;
//     };
//   };
// }

// const Places = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: config.googleMapsApiKey,
//     libraries: ["places", "geometry"],
//   });

//   const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);
//   const [nearestHospital, setNearestHospital] = useState<Place | null>(null);

//   const fetchNearbyPlaces = (location: google.maps.LatLngLiteral) => {
//     const service = new google.maps.places.PlacesService(document.createElement('div'));
//     const options: google.maps.places.PlaceSearchRequest = {
//       location: new google.maps.LatLng(location.lat, location.lng),
//       radius: 5000,
//       type: 'hospital',
//     };

//     service.nearbySearch(options, (results, status) => {
//       if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//         const transformedResults = results.map(result => ({
//           id: result.place_id ?? 'unknown',
//           name: result.name ?? 'No Name',
//           vicinity: result.vicinity ?? 'No Address',
//           geometry: {
//             location: {
//               lat: result.geometry?.location?.lat() ?? 0,
//               lng: result.geometry?.location?.lng() ?? 0,
//             }
//           }
//         }));

//         // Find the nearest hospital based on distance
//         let nearest: Place | null = null;
//         let minDistance = Infinity;

//         transformedResults.forEach(place => {
//           const distance = google.maps.geometry.spherical.computeDistanceBetween(
//             new google.maps.LatLng(location.lat, location.lng),
//             new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng)
//           );

//           if (distance < minDistance) {
//             nearest = place;
//             minDistance = distance;
//           }
//         });

//         setNearestHospital(nearest);
//       }
//     });
//   };

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <SignedIn>
//       <div style={{ marginBottom: '1rem' }}>
//         <PlacesAutocomplete setSelected={setSelected} />
//         <button onClick={() => selected && fetchNearbyPlaces(selected)}>Find Nearby</button>
//       </div>
//       {selected && (
//         <div style={{ height: '400px', width: '100%' }}>
//           <GoogleMap
//             zoom={10}
//             center={selected}
//             mapContainerStyle={{ width: '100%', height: '100%' }}
//           >
//             <Marker position={selected} />
//             {nearestHospital && <Marker position={{ lat: nearestHospital.geometry.location.lat, lng: nearestHospital.geometry.location.lng }} />}
//           </GoogleMap>
//         </div>
//       )}
//       {nearestHospital && (
//         <div>
//           <h4>Nearest Hospital:</h4>
//           <p>{nearestHospital.name}</p>
//           <p>{nearestHospital.vicinity}</p>
//         </div>
//       )}
//     </SignedIn>
//   );
// };

// interface PlacesAutocompleteProps {
//   setSelected: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>;
// }

// const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     debounce: 300,
//   });

//   return (
//     <Autocomplete
//       freeSolo
//       disableClearable
//       disabled={!ready}
//       options={status === "OK" ? data.map((suggestion) => suggestion.description) : []}
//       value={value}
//       onChange={(_, newValue) => {
//         setValue(newValue || '', false);
//         clearSuggestions();
//         if (!newValue) return;
//         getGeocode({ address: newValue })
//           .then(results => getLatLng(results[0]))
//           .then(({ lat, lng }) => setSelected({ lat, lng }))
//           .catch(error => console.error("Error: ", error));
//       }}
//       onInputChange={(_, newInputValue) => setValue(newInputValue)}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Search an address"
//           variant="outlined"
//           fullWidth
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {!ready ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// };

// export default Places;

import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SignedIn } from '@clerk/clerk-react';
import config from './config'; // Make sure this points to your actual config file

interface Place {
  id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const Places = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.googleMapsApiKey,
    libraries: ["places", "geometry"],
  });

  const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);

  const fetchNearbyPlaces = (location: google.maps.LatLngLiteral) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    let hospitalCounter = 0;
    let policeCounter = 0;

    const hospitalOptions: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: 5000,
      type: 'hospital',
    };
    const policeOptions: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: 5000,
      type: 'police',
    };

    // Fetch nearby hospitals
    service.nearbySearch(hospitalOptions, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const transformedResults = results.map(result => ({
          id: result.place_id ?? 'unknown',
          name: result.name ?? 'No Name',
          vicinity: result.vicinity ?? 'No Address',
          geometry: {
            location: {
              lat: result.geometry?.location?.lat() ?? 0,
              lng: result.geometry?.location?.lng() ?? 0,
            }
          }
        }));

        transformedResults.forEach(place => {
          if (hospitalCounter < 3) {
            setNearbyPlaces(prevState => [...prevState, place]);
            hospitalCounter++;
          }
        });
      }
    });

    // Fetch nearby police stations
    service.nearbySearch(policeOptions, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const transformedResults = results.map(result => ({
          id: result.place_id ?? 'unknown',
          name: result.name ?? 'No Name',
          vicinity: result.vicinity ?? 'No Address',
          geometry: {
            location: {
              lat: result.geometry?.location?.lat() ?? 0,
              lng: result.geometry?.location?.lng() ?? 0,
            }
          }
        }));

        transformedResults.forEach(place => {
          if (policeCounter < 3) {
            setNearbyPlaces(prevState => [...prevState, place]);
            policeCounter++;
          }
        });
      }
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <SignedIn>
      <div style={{ marginBottom: '1rem' }}>
        <PlacesAutocomplete setSelected={setSelected} />
        <Button variant="contained" onClick={() => selected && fetchNearbyPlaces(selected)}>Find Nearby</Button>
      </div>
      {selected && (
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMap
            zoom={10}
            center={selected}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            <Marker position={selected} />
            {nearbyPlaces.map((place, index) => (
              <Marker key={index} position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }} />
            ))}
          </GoogleMap>
        </div>
      )}
      <div>
        {nearbyPlaces.map((place, index) => (
          <div key={index}>
            <Typography variant="h6">{place.name}</Typography>
            <Typography variant="body1">{place.vicinity}</Typography>
          </div>
        ))}
      </div>
    </SignedIn>
  );
};

interface PlacesAutocompleteProps {
  setSelected: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setSelected }) => {
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



// import React, { useState } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import CircularProgress from '@mui/material/CircularProgress';
// import { SignedIn } from '@clerk/clerk-react';
// import config from './config'; // Make sure this points to your actual config file

// interface Place {
//   id: string;
//   name: string;
//   vicinity: string;
//   geometry: {
//     location: {
//       lat: number;
//       lng: number;
//     };
//   };
// }

// const Places = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: config.googleMapsApiKey,
//     libraries: ["places", "geometry"],
//   });

//   const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);
//   const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);

//   const fetchNearbyPlaces = (location: google.maps.LatLngLiteral) => {
//     const service = new google.maps.places.PlacesService(document.createElement('div'));
//     let hospitalCounter = 0;
//     let policeCounter = 0;

//     const hospitalOptions: google.maps.places.PlaceSearchRequest = {
//       location: new google.maps.LatLng(location.lat, location.lng),
//       radius: 5000,
//       type: 'hospital',
//     };
//     const policeOptions: google.maps.places.PlaceSearchRequest = {
//       location: new google.maps.LatLng(location.lat, location.lng),
//       radius: 5000,
//       type: 'police',
//     };

//     // Fetch nearby hospitals
//     service.nearbySearch(hospitalOptions, (results, status) => {
//       if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//         const transformedResults = results.map(result => ({
//           id: result.place_id ?? 'unknown',
//           name: result.name ?? 'No Name',
//           vicinity: result.vicinity ?? 'No Address',
//           geometry: {
//             location: {
//               lat: result.geometry?.location?.lat() ?? 0,
//               lng: result.geometry?.location?.lng() ?? 0,
//             }
//           }
//         }));

//         transformedResults.forEach(place => {
//           if (hospitalCounter < 3) {
//             setNearbyPlaces(prevState => [...prevState, place]);
//             hospitalCounter++;
//           }
//         });
//       }
//     });

//     // Fetch nearby police stations
//     service.nearbySearch(policeOptions, (results, status) => {
//       if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//         const transformedResults = results.map(result => ({
//           id: result.place_id ?? 'unknown',
//           name: result.name ?? 'No Name',
//           vicinity: result.vicinity ?? 'No Address',
//           geometry: {
//             location: {
//               lat: result.geometry?.location?.lat() ?? 0,
//               lng: result.geometry?.location?.lng() ?? 0,
//             }
//           }
//         }));

//         transformedResults.forEach(place => {
//           if (policeCounter < 3) {
//             setNearbyPlaces(prevState => [...prevState, place]);
//             policeCounter++;
//           }
//         });
//       }
//     });
//   };

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <SignedIn>
//       <div style={{ marginBottom: '1rem' }}>
//         <PlacesAutocomplete setSelected={setSelected} />
//         <button onClick={() => selected && fetchNearbyPlaces(selected)}>Find Nearby</button>
//       </div>
//       {selected && (
//         <div style={{ height: '400px', width: '100%' }}>
//           <GoogleMap
//             zoom={10}
//             center={selected}
//             mapContainerStyle={{ width: '100%', height: '100%' }}
//           >
//             <Marker position={selected} />
//             {nearbyPlaces.map((place, index) => (
//               <Marker key={index} position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }} />
//             ))}
//           </GoogleMap>
//         </div>
//       )}
//       <div>
//         {nearbyPlaces.map((place, index) => (
//           <div key={index}>
//             <h4>{place.name}</h4>
//             <p>{place.vicinity}</p>
//           </div>
//         ))}
//       </div>
//     </SignedIn>
//   );
// };

// interface PlacesAutocompleteProps {
//   setSelected: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>;
// }

// const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     debounce: 300,
//   });

//   return (
//     <Autocomplete
//       freeSolo
//       disableClearable
//       disabled={!ready}
//       options={status === "OK" ? data.map((suggestion) => suggestion.description) : []}
//       value={value}
//       onChange={(_, newValue) => {
//         setValue(newValue || '', false);
//         clearSuggestions();
//         if (!newValue) return;
//         getGeocode({ address: newValue })
//           .then(results => getLatLng(results[0]))
//           .then(({ lat, lng }) => setSelected({ lat, lng }))
//           .catch(error => console.error("Error: ", error));
//       }}
//       onInputChange={(_, newInputValue) => setValue(newInputValue)}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Search an address"
//           variant="outlined"
//           fullWidth
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <>
//                 {!ready ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// };

// export default Places;

