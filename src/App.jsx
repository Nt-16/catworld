// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { Button, Grid, Typography, Card, CardContent, CardMedia, Chip, CircularProgress } from '@mui/material';

// const App = () => {
//   const [cat, setCat] = useState(null);        // Store the current cat data
//   const [banList, setBanList] = useState([]);  // Store the banned items
//   const [seenCats, setSeenCats] = useState([]); // Store previously seen cats
//   const [loading, setLoading] = useState(false); // Loading state

//   const apiKey = 'live_fv3EyJQLTSBhv44Zi536hGrv5smbgZUhw3yI60dIYUSxRURQcWHxU4qVxw438hMt'; // Use your actual API key

//   // Check if any of the cat's attributes match the ban list
//   const isBanned = useCallback((cat) => {
//     return banList.some(ban =>
//       cat.origin.includes(ban) ||
//       cat.weight.imperial.includes(ban) ||
//       cat.name.includes(ban)
//     );
//   }, [banList]); // Add banList as a dependency

//   // Define fetchRandomCat using useCallback to ensure stability of the function reference
//   const fetchRandomCat = useCallback(async () => {
//     setLoading(true); // Start loading
//     try {
//       const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
//         headers: {
//           'x-api-key': apiKey // Pass the API key in headers
//         }
//       });
//       const newCat = response.data[0];

//       // Check if any attribute is banned
//       if (!isBanned(newCat)) {
//         setCat(newCat);
//         setSeenCats((prevCats) => [...prevCats, newCat]); // Update seen cats only if the cat is not banned
//       } else {
//         // If banned, fetch a new cat again
//         fetchRandomCat();
//       }
//     } catch (error) {
//       console.error("Error fetching cat:", error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   }, [apiKey, isBanned]); // Add apiKey and isBanned as dependencies

//   // Add a selected attribute to the ban list
//   const handleBan = (attribute) => {
//     setBanList((prevBanList) => [...prevBanList, attribute]); // Update ban list
//   };

//   useEffect(() => {
//     fetchRandomCat(); // Fetch a random cat when the component loads
//   }, [fetchRandomCat]); // Add fetchRandomCat as a dependency

//   console.log(fetchRandomCat());

//   return (
//     <Grid container spacing={4} padding={4} style={{ backgroundColor: '#f0f0f0' }}>
//       <Grid item xs={12} sm={3}>
//         <Typography variant="h6" gutterBottom>Seen Cats</Typography>
//         {seenCats.map((cat, index) => (
//           <Chip key={index} label={`${cat.name} from ${cat.origin}`} style={{ margin: '4px' }} />
//         ))}
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <Typography variant="h4" align="center" style={{ marginBottom: '20px', color: '#3f51b5' }}>
//           Veni Vici!
//         </Typography>
//         <Typography align="center" style={{ marginBottom: '20px' }}>Discover cats from your wildest dreams!</Typography>

//         {loading ? (
//           <CircularProgress /> // Show loading indicator
//         ) : (
//           cat && (
//             <Card style={{ maxWidth: 345, margin: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//               <CardMedia
//                 component="img"
//                 alt={cat.name}
//                 height="200"
//                 image={cat.url}
//                 title={cat.name}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {cat.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Origin: {cat.origin || 'unknown'}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Weight: {cat.weight?.imperial || 'Unknown'}
//                 </Typography>
//                 <Button variant="outlined" onClick={() => handleBan(cat.origin)} style={{ marginTop: '10px' }}>
//                   Ban {cat.origin}
//                 </Button>
//               </CardContent>
//             </Card>
//           )
//         )}

//         <Button variant="contained" onClick={fetchRandomCat} fullWidth style={{ marginTop: '20px', backgroundColor: '#3f51b5', color: 'white' }}>
//           Discover!
//         </Button>
//       </Grid>

//       <Grid item xs={12} sm={3}>
//         <Typography variant="h6" gutterBottom>Ban List</Typography>
//         {banList.map((item, index) => (
//           <Chip key={index} label={item} style={{ margin: '4px' }} color="error" />
//         ))}
//       </Grid>
//     </Grid>
//   );
// };

// export default App;

// App.jsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Grid, Typography, CircularProgress, Chip } from '@mui/material';
import CatCard from './catcard'; // Import CatCard component
import BanList from './banlist'; // Import BanList component

const App = () => {
  const [cat, setCat] = useState(null);        // Store the current cat data
  const [banList, setBanList] = useState([]);  // Store the banned items
  const [seenCats, setSeenCats] = useState([]); // Store previously seen cats
  const [loading, setLoading] = useState(false); // Loading state

  const apiKey = 'live_Cd5ySyLyVQfuCj3Sk1WvJ5FnqrFgVURVD9CPpJHMVdCHuC8EHuw58QaS6lyVbA0D'; // Use your actual API key

  // Check if any of the cat's attributes match the ban list
  const isBanned = useCallback((cat) => {
    return banList.some(ban =>
      cat.origin.includes(ban) ||
      (cat.weight?.imperial && cat.weight.imperial.includes(ban)) ||
      cat.name.includes(ban)
    );
  }, [banList]); // Add banList as a dependency

  // // Define fetchRandomCat using useCallback to ensure stability of the function reference
  // const fetchRandomCat = useCallback(async () => {
  //   setLoading(true); // Start loading
  //   try {
  //     const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
  //       headers: {
  //         'x-api-key': apiKey // Pass the API key in headers
  //       }
  //     });
  //     const newCat = response.data[0];

  //     // Check if any attribute is banned
  //     if (!isBanned(newCat)) {
  //       setCat(newCat);
  //       setSeenCats((prevCats) => [...prevCats, newCat]); // Update seen cats only if the cat is not banned
  //     } else {
  //       // If banned, fetch a new cat again
  //       fetchRandomCat();
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cat:", error);
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // }, [apiKey, isBanned]); // Add apiKey and isBanned as dependencies

  const fetchRandomCat = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': apiKey // Pass the API key in headers
        }
      });
      const newCat = response.data[0];
  
      // Extract breed details
      const breed = newCat.breeds[0]; // Get the first breed since it's an array
      if (!breed) {
        console.error("No breed information available.");
        return;
      }
  
      const catDetails = {
        name: breed.name,
        origin: breed.origin,
        weight: breed.weight.imperial,
        life_span: breed.life_span,
        url: newCat.url
      };
  
      // Check if any attribute is banned
      if (!isBanned(catDetails)) {
        
        setCat(catDetails);
        setSeenCats((prevCats) => [...prevCats, catDetails]); // Update seen cats only if the cat is not banned
      } else {
        // If banned, fetch a new cat again
        fetchRandomCat();
      }
    } catch (error) {
      console.error("Error fetching cat:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }, [apiKey, isBanned]);
  

  // Add a selected attribute to the ban list
  const handleBan = (attribute) => {
    setBanList((prevBanList) => [...prevBanList, attribute]); // Update ban list
  };

  useEffect(() => {
    fetchRandomCat(); // Fetch a random cat when the component loads
  }, [fetchRandomCat]); // Add fetchRandomCat as a dependency

  return (
    <Grid container spacing={4} padding={4} style={{ backgroundColor: '#f0f0f0' }}>
      <Grid item xs={12} sm={3}>
        <Typography variant="h6" gutterBottom>Seen Cats</Typography>
        {seenCats.map((cat, index) => (
          <Chip key={index} label={`${cat.name} from ${cat.origin}`} style={{ margin: '4px' }} />
        ))}
      </Grid>

      <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" align="center" style={{ marginBottom: '20px', color: '#3f51b5' }}>
          Veni Vici!
        </Typography>
        <Typography align="center" style={{ marginBottom: '20px' }}>Discover cats from your wildest dreams!</Typography>
        
        {loading ? (
          <CircularProgress /> // Show loading indicator
        ) : (
          cat && (
            <CatCard 
              name={cat.name}
          
              origin={cat.origin}
              weight={cat.weight} // Ensure weight is part of the cat object
              lifeSpan={cat.life_span} // Ensure lifeSpan is part of the cat object
              imageUrl={cat.url}
              onBan={handleBan} 
            />
            
          )
        )}

        <Button variant="contained" onClick={fetchRandomCat} fullWidth style={{ marginTop: '20px', backgroundColor: '#3f51b5', color: 'white' }}>
          Discover!
        </Button>
      </Grid>

      <Grid item xs={12} sm={3}>
        <BanList banList={banList} /> {/* Use the BanList component */}
      </Grid>
    </Grid>
  );
};

export default App;
