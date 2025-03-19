import React, { useEffect, useState } from 'react';
import formatOddsData from './format';
import { Outcome } from '@google/generative-ai';
const axios = require('axios');

const OddsFetcher = ({ sportKey, regions, markets, oddsFormat, dateFormat, bookmakers }) => {
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
            // bookmakers:"fanduel",
            bookmakers,
            includeLinks: "true",
            includeSids: "true"
            // includeBetLimits: "true"
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
  }, [sportKey, regions, markets, oddsFormat, dateFormat, bookmakers]);


  // Show loading indicator
  if (loading) return <div>Loading...</div>;

  // Show error message if API request fails
  if (error) return <div>Error: {error}</div>;

  // const formmattedData = formatOddsData(oddsData);

  // Return the JSON data once fetched
  return (
    <div>
      <h2>Odds Data</h2>
      {/* <div>{RenderFormattedOdds(oddsData)}</div> */}
      {/* <pre>{JSON.stringify(oddsData, null, 2)}</pre> */}

      {
        oddsData.map(record => {
          return(
            <div key={record.id}>
              {record.home_team}
              {record.away_team}
              {record.bookmakers.map(bookmaker =>{
                return(
                  <div key = {bookmaker.key}>
                    {bookmaker.title}
                    {bookmaker.markets.map(market => {
                      return(
                        <div key={market.key}>
                          {market.key}
                          {market.outcomes.map(outcome => {
                            return(
                              <div key = {outcome.name}>
                               Odds are {outcome.name}: {outcome.price},
                               Here is a link: {outcome.link}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })
      }

      
    </div>
  );
};

export default OddsFetcher;