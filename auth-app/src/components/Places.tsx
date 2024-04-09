import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { SignedIn } from '@clerk/clerk-react'; // Import Clerk components
import config from './config'; // Ensure this points to your actual config file

const Places = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.googleMapsApiKey, // Make sure your API key is correctly referenced here
    libraries: ["places"],
  });

  const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <SignedIn>
      <div style={{ marginBottom: '1rem' }}>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      {selected && (
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMap
            zoom={10}
            center={selected}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            <Marker position={selected} />
          </GoogleMap>
        </div>
      )}
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
          .then(({ lat, lng }) => {
            setSelected({ lat, lng });
          })
          .catch(error => console.error("Error: ", error));
      }}
      onInputChange={(_, newInputValue) => {
        setValue(newInputValue);
      }}
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




// import React, { useState, useMemo, FC } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import CircularProgress from '@mui/material/CircularProgress';

// interface PlacesProps {}

// const Places: FC<PlacesProps> = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//     libraries: ["places"],
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// };

// interface MapProps {}

// const Map: FC<MapProps> = () => {
//   const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
//   const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);

//   return (
//     <>
//       <div style={{ marginBottom: '1rem' }}>
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>
//       <div style={{ height: '400px', width: '100%' }}>
//         <GoogleMap
//           zoom={10}
//           center={center}
//           mapContainerStyle={{ width: '100%', height: '100%' }}
//         >
//           {selected && <Marker position={selected} />}
//         </GoogleMap>
//       </div>
//     </>
//   );
// };

// interface PlacesAutocompleteProps {
//   setSelected: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>;
// }

// const PlacesAutocomplete: FC<PlacesAutocompleteProps> = ({ setSelected }) => {
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



