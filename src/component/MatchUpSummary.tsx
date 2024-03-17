'use client'
import React, {useState} from 'react';
import RoundScorePanel from '@/component/RoundScorePanel';

const MatchUpSummary = () => {
  const areas = ['Attitude', 'Musicality', 'Dynamic']
  const rounds = [
    { id: 1, index: 1, areas : areas},
    { id: 2, index: 2, areas : areas}
  ];

  const [matchSummary, setMatchSummary] = useState({});

  const handleRoundReport = (roundId, roundTotalScores) => {
    // Logic to sum up all panel volumes and setTotalVolume
    // This might involve keeping track of each panel's volume separately
    // and then summing those to find the overall totalVolume
    setMatchSummary(prev => ({...prev, [roundId]: roundTotalScores}));
    console.log(matchSummary);
  };

  return (
    <div>
      {rounds.map(round => (
        <RoundScorePanel 
          key={round.id}
          roundIndex={round.index} 
          areas={round.areas}
          reportRoundScores={handleRoundReport}/>
      ))}
    </div>
  );
}

export default MatchUpSummary;