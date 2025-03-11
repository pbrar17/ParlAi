import React, { useEffect, useState } from 'react';
const axios = require('axios');

// This is your reusable component
const OddsFetcher = ({ sportKey, regions, markets, oddsFormat, dateFormat }) => {
  // State to store the data, loading state, and error
//   const [data, setData] = useState(null);

const [sportsData, setSportsData] = useState(null);
  const [oddsData, setOddsData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your API key (replace with actual key)
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    axios
      .get('https://api.the-odds-api.com/v4/sports', {
        params: { apiKey },
      })
      .then((response) => {
        setSportsData(response.data); // Save sports data
        return axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
          params: {
            apiKey,
            regions,
            markets,
            oddsFormat,
            dateFormat,
          },
        });
      })
      .then((response) => {
        setOddsData(response.data); // Save odds data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message); // Handle any errors
        setLoading(false);
      });
  }, [sportKey, regions, markets, oddsFormat, dateFormat]);
//   useEffect(() => {
//     // Construct the URL to fetch odds data
//     const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds`;

//     // Make the API call using axios
//     axios
//       .get(url, {
//         params: {
//           apiKey,
//           regions,
//           markets,
//           oddsFormat,
//           dateFormat,
//         },
//       })
//       .then((response) => {
//         setData(response.data);  // Save the response data to state
//         setLoading(false);        // Data fetched, stop loading
//       })
//       .catch((error) => {
//         setError(error.message);  // If error occurs, save the error message
//         setLoading(false);        // Stop loading even if there was an error
//       });
//   }, [sportKey, regions, markets, oddsFormat, dateFormat]); // Dependency array

  // Show loading indicator
  if (loading) return <div>Loading...</div>;

  // Show error message if API request fails
  if (error) return <div>Error: {error}</div>;

  // Return the JSON data once fetched
  return (
    <div>
      <h2>Odds Data</h2>
      <pre>{JSON.stringify(oddsData, null, 2)}</pre>
    </div>
  );
};

export default OddsFetcher;
