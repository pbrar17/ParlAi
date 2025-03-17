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
      <button onClick={() => toggle("NBA")}> NBA </button>
      <button onClick={() => toggle("NHL")}> NHL </button>
      <button onClick={() => toggle("NFL")}> NFL </button>

    </div>

    <div>
      <p>Choose Market:</p>
    <button  onClick={() => toggle("h2h")}> Moneyline (h2h) </button>
    <button  onClick={() => toggle("NBA")}> Spread </button>
    <button> Other </button>

    </div>

    <div>
      <p>Choose Odds Format:</p>
      <button 
        onClick={() => setOddsFormat("Decimal")} 
        style={{ fontWeight: oddsFormat === "Decimal" ? "bold" : "normal" }}
      >
        Decimal
      </button>
      <button 
        onClick={() => setOddsFormat("American")} 
        style={{ fontWeight: oddsFormat === "American" ? "bold" : "normal" }}
      >
        American
      </button>

      <p>Selected Odds Format: {oddsFormat || "None"}</p>

    </div>

    </>
    

   
  );
}