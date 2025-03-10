const BASE_URL = 'https://api.the-odds-api.com';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getSports = async () => {
    try {
      const response = await fetch(`${BASE_URL}?apiKey=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sports data');
      }
      
      const sportsData = await response.json();
      return sportsData;
    } catch (error) {
      console.error("Error fetching sports data:", error);
      return null; // Handle error by returning null or an empty array
    }
  };