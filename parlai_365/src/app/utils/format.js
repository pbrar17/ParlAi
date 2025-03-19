// function formatOddsData(data) {
//    return data.map(entry => ({
//     game_id: entry.id,
//     home_team: entry.home_team
//    }));
//   }

//   export default formatOddsData;


  export default function formatOddsData({ data }) {
    const homeTeams = data.map(entry => ({
      game_id: entry.id,
      home_team: entry.home_team
    }));
  
    return (
      <div>
        <h1>Home Teams</h1>
        <ul>
          {homeTeams.map(team => (
            <li key={team.game_id}>{team.home_team}</li> 
          ))}
        </ul>
      </div>
    );
  }