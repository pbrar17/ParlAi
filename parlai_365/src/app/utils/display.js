import React from "react";

const OddsDisplay = ({ oddsData }) => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      {oddsData.map((game) => (
        <div key={game.id} className="mb-6 p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-bold">
            {game.sport_title}: {game.away_team} @ {game.home_team}
          </h2>
          <p className="text-sm text-gray-600">
            Game Time: {new Date(game.commence_time).toLocaleString()}
          </p>
          {game.bookmakers.map((bookmaker) => (
            <div key={bookmaker.key} className="mt-2">
              <h3 className="font-semibold">{bookmaker.title} Odds:</h3>
              <ul className="list-disc pl-4">
                {bookmaker.markets.map((market) =>
                  market.outcomes.map((outcome) => (
                    <li key={outcome.sid} className="flex justify-between">
                      <span>{outcome.name}</span>
                      <a
                        href={outcome.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {outcome.price}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OddsDisplay;
