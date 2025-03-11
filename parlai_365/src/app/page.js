'use client'
import Image from "next/image";
import styles from "./page.module.css";

import OddsFetcher from "./utils/odds";

// import axios from 'axios';

// const BASE_URL = 'https://api.the-odds-api.com';
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY;



export default function Home() {
  return (
    <OddsFetcher
      sportKey="upcoming"
      regions="us"
      markets="h2h"
      oddsFormat="american"
      dateFormat="iso"
    />
  );
}