'use client'
import Image from "next/image";
import styles from "./page.module.css";

import OddsFetcher from "./utils/odds";

import React from "react";

// import axios from 'axios';

// const BASE_URL = 'https://api.the-odds-api.com';
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY;



export default function Home() {

  const [sports, setSports] = React.useState([]);

  function toggle(sport){
    setSports(
      (prevSports)=> prevSports.includes(sport)?  prevSports.filter((s) => s !== sport): [...prevSports, sport]
    );


  }

  const [market, setMarket] = React.useState([]);

  function toggleMarket(market){
    setMarket(
      (prevMarket)=> prevMarket.includes(market)? prevMarket.filter((x) => x!= market): [...prevMarket, market]
    );
  }

  const [oddsFormat, setOddsFormat] = React.useState(null);

  const [submitData, setSubmittedData] =  React.useState(null);

  function handleSubmit() {
    // Check if all required selections are made
    if (sports.length === 0 || market.length === 0 || !oddsFormat) {
      alert("Please select at least one sport, one market, and an odds format.");
      return;
    }

    // Save submitted data to state
    setSubmittedData({ sports, market, oddsFormat });

    console.log("Submitting:", { sports, market, oddsFormat });

    // If you were making an API request, it would look like:
    // fetch('/api/odds', {
    //   method: 'POST',
    //   body: JSON.stringify({ sports, market, oddsFormat }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  }

  
  return (
    // <OddsFetcher
    //   sportKey="basketball_nba"
    //   regions="us"
    //   markets="h2h"
    //   oddsFormat="american"
    //   dateFormat="iso"
    // />
    <>

    <div>
      <p>Choose Sport:</p>
      <button 
        onClick={() => toggle("basketball_nba")}
        style={{ 
          fontWeight: sports.includes("basketball_nba") ? "bold" : "normal",
          backgroundColor: sports.includes("basketball_nba") ? "blue" : "white",
          color: sports.includes("basketball_nba") ? "white" : "black"
        }}
      > NBA </button>

      <button 
        onClick={() => toggle("icehockey_nhl")}
        style={{ 
          fontWeight: sports.includes("icehockey_nhl") ? "bold" : "normal",
          backgroundColor: sports.includes("icehockey_nhl") ? "blue" : "white",
          color: sports.includes("icehockey_nhl") ? "white" : "black"
        }}
      > NHL </button>

      <button 
        onClick={() => toggle("americanfootball_nfl")}
        style={{ 
          fontWeight: sports.includes("americanfootball_nfl") ? "bold" : "normal",
          backgroundColor: sports.includes("americanfootball_nfl") ? "blue" : "white",
          color: sports.includes("americanfootball_nfl") ? "white" : "black"
        }}
      > NFL </button>

       <button 
        onClick={() => toggle("baseball_mlb")}
        style={{ 
          fontWeight: sports.includes("baseball_mlb") ? "bold" : "normal",
          backgroundColor: sports.includes("baseball_mlb") ? "blue" : "white",
          color: sports.includes("baseball_mlb") ? "white" : "black"
        }}
      > MLB </button>


      <p>Selected Sports: {sports.join(", ") || "None"}</p>
    </div>

    <div>
      <p>Choose Market:</p>
    <button  onClick={() => toggleMarket("h2h")}
      style={{
        fontWeight: market.includes("h2h") ? "bold" : "normal",
        backgroundColor: market.includes("h2h") ? "blue" : "white",
        color: market.includes("h2h") ? "white" : "black"
      }}
      > Moneyline (h2h) </button>
    <button  onClick={() => toggleMarket("spreads")}
       style={{
        fontWeight: market.includes("spreads") ? "bold" : "normal",
        backgroundColor: market.includes("spreads") ? "blue" : "white",
        color: market.includes("spreads") ? "white" : "black"
      }}
      > Spread </button>
    {/* <button> Other </button> */}

    <p>Selected Markets: {market.join(", ") || "None"}</p>

    </div>

    <div>
      <p>Choose Odds Format:</p>
      <button 
        onClick={() => setOddsFormat("decimal")} 
        style={{ fontWeight: oddsFormat === "decimal" ? "bold" : "normal",
          backgroundColor: oddsFormat ==="decimal" ? "blue" : "white",
          color: oddsFormat === "decimal" ? "white" : "black"
  }}
      >
        Decimal
      </button>
      <button 
        onClick={() => setOddsFormat("american")} 
        style={{ fontWeight: oddsFormat === "american" ? "bold" : "normal",
                 backgroundColor: oddsFormat ==="american" ? "blue" : "white",
                 color: oddsFormat === "american" ? "white" : "black"
         }}
      >
        American
      </button>

      <p>Selected Odds Format: {oddsFormat || "None"}</p>

    </div>

    <button onClick={handleSubmit} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Submit All
      </button>

      {submitData && (
        <div>
          <h3>Submitted Data:</h3>
          <p>Sports: {submitData.sports.join(", ")}</p>
          <p>Markets: {submitData.market.join(", ")}</p>
          <p>Odds Format: {submitData.oddsFormat}</p>

          {/* Call the OddsFetcher component when submitted */}
          <OddsFetcher
            sportKey={submitData.sports.join(",")}
            regions="us"
            markets={submitData.market.join(",")}
            oddsFormat={submitData.oddsFormat}
            dateFormat="iso"
          />
        </div>
      )}


    </>
    

   
  );
}