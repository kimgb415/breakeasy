'use client'
import React, {useEffect, useState} from 'react';
import RoundScorePanel from '@/component/RoundScorePanel';
import styles from './MatchUpSummary.module.css';
import { MatchData } from '@/type/MatchDataDef';

const MatchUpSummary : React.FC<MatchData>  = ({matchName, leftTeam, rightTeam, rounds, areas}) => {
  console.log(areas)
  const [matchSummary, setMatchSummary] = useState({
    ...areas.reduce((acc, area) => {
      acc[area] = [50 * rounds.length, 50 * rounds.length];

      return acc;
    }, {}),
    'Total': [50 * rounds.length * areas.length, 50 * rounds.length * areas.length]
  });
  const [roundReports, setRoundReports] = useState(Object);

  const handleRoundReport = (roundId, roundTotalScores) => {
    setRoundReports(prev => ({...prev, [roundId]: roundTotalScores}));
  };
  
  useEffect(() => {
    const areaSummary = areas.reduce((acc, area) => {
      acc[area] = [0, 100 * rounds.length];
      Object.values(roundReports).forEach(roundScore => {
        acc[area][0] += roundScore[area]; // Left Team
        acc[area][1] -= roundScore[area]; // Right Team
      });
      
      return acc;
    }, {});
    
    let leftTeamTotal = 0, rightTeamTotal = 0;
    Object.values(areaSummary).forEach(areaScores => {
      leftTeamTotal += areaScores[0];
      rightTeamTotal += areaScores[1];
    });
    
    
    setMatchSummary({
      ...areaSummary,
      'Total': [leftTeamTotal, rightTeamTotal]
    });
  }, [roundReports]);
  
  useEffect(() => {
    fetch('/api/', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json', // Specify the content type
    },
      body: JSON.stringify({
        'roundReports': roundReports,
        'matchSummary': matchSummary
      }),
    });
  }, [matchSummary]);

  return (
    <div>
      <h1 className={styles.matchName}>Team {leftTeam} VS Team {rightTeam}</h1>
      <h1 className={styles.matchName}>Total {matchSummary['Total'][0]} vs {matchSummary['Total'][1]}</h1>
      {rounds.map(round => (
        <RoundScorePanel 
          key={round.index}
          roundStatus={round}
          onRoundValueChange={handleRoundReport}/>
      ))}
    </div>
  );
}

export default MatchUpSummary;