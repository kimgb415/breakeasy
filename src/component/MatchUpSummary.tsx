'use client'
import React, {useEffect, useRef, useState} from 'react';
import RoundScorePanel from '@/component/RoundScorePanel';
import styles from './MatchUpSummary.module.css';
import { MatchData } from '@/type/MatchDataDef';
import { getDatabase, ref, set } from "firebase/database";
import { app } from "@/app/firebase";

function debounce(func, wait) {
  let timeout;

  return function exectuedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

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
  const matchSummaryRef = useRef({});
  const roundReportRef = useRef(rounds);
  
  // roundReports contains all individual report status
  const [roundReports, setRoundReports] = useState(rounds);
  
  const handleRoundReport = (roundId, roundTotalScores) => {
    setRoundReports(currReport => {
      const changedRoundIndex = currReport.findIndex(round => round.index === roundId);

      return [
        ...currReport.slice(0, changedRoundIndex),
        roundTotalScores,
        ...currReport.slice(changedRoundIndex + 1)
      ]
    });
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

  const updateMatchToDb = () => {
    
    const newMatchData = {
      'matchData': {
        'matchName': matchName,
        'leftTeam': leftTeam,
        'rightTeam': rightTeam,
        'rounds': roundReportRef.current,
        'areas': areas
      },
      'summary': matchSummaryRef.current
    }
    console.log(`update match ${matchName} to DB`)
    console.log(newMatchData)
    
    const db = getDatabase(app);
    set(ref(db, matchName), newMatchData);
  }

  // Use useRef to store the debounced version of updateMatchToServer
  const debouncedUpdate = useRef(debounce(updateMatchToDb, 500));

  useEffect(() => {
    roundReportRef.current = roundReports; // Update ref whenever roundReports changes
  }, [roundReports]);
  
  useEffect(() => {
    matchSummaryRef.current = matchSummary; // Update ref whenever matchSummary changes
    debouncedUpdate.current();
  }, [matchSummary]);

  return (
    <div>
      <h1 className={styles.matchName}>Match {matchName}</h1>
      <h1 className={styles.matchName}>Total {matchSummary['Total'][0]} vs {matchSummary['Total'][1]}</h1>
      {
        rounds.map(round => (
          <RoundScorePanel 
            key={round.index}
            roundStatus={round}
            onRoundValueChange={handleRoundReport}/>
        ))
      }
    </div>
  );
}

export default MatchUpSummary;