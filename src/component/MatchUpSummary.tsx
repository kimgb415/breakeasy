'use client'
import React, {useEffect, useState} from 'react';
import RoundScorePanel from '@/component/RoundScorePanel';
import styles from './MatchUpSummary.module.css';
import { MatchData } from '@/type/MatchDataDef';

const MatchUpSummary : React.FC<MatchData>  = ({matchName, leftTeam, rightTeam, rounds, areas}) => {
  const areaSummary = {
    ...areas.reduce((acc, area) => {
      acc[area] = [
        // Accumulation of each Area for Left Team
        rounds.reduce((roundAcc, round) => {
          roundAcc += round.areas[area].currentScore;
          
          return roundAcc;
        }, 0),
        // Accumulation of each Area for Right Team
        rounds.reduce((roundAcc, round) => {
          roundAcc += round.areas[area].maxScore - round.areas[area].currentScore;
          
          return roundAcc;
        }, 0),
      ];
      
      return acc;
    }, {}),
  }
  
  // matchSummary contains only accumulated inforatimon
  const [matchSummary, setMatchSummary] = useState({
    ...areaSummary,
    'Total': 
      Object.values(areaSummary).reduce((acc, areaScoreList) => {
        acc[0] += areaScoreList[0]
        acc[1] += areaScoreList[1]

        return acc
      }, [0, 0])
  });

  
  // roundReports contains all individual report status
  const [roundReports, setRoundReports] = useState(rounds);
  
  const handleRoundReport = (roundId, roundTotalScores) => {
    setRoundReports(prev => ({...prev, [roundId]: roundTotalScores}));
  };
  
  useEffect(() => {
    const areaSummary = areas.reduce((acc, area) => {
      acc[area] = [0, 0];
      Object.values(roundReports).forEach(roundScore => {
        acc[area][0] += roundScore.areas[area].currentScore; // Left Team
        acc[area][1] += roundScore.areas[area].maxScore - roundScore.areas[area].currentScore; // Right Team
      });
      
      return acc;
    }, {});
        
    setMatchSummary({
      ...areaSummary,
      'Total': 
        Object.values(areaSummary).reduce((acc, areaScoreList) => {
          acc[0] += areaScoreList[0]
          acc[1] += areaScoreList[1]

          return acc
        }, [0, 0])
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
      <h1 className={styles.matchName}>{leftTeam} VS {rightTeam}</h1>
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