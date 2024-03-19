'use client'
import React, {useEffect, useState} from 'react';
import RoundScorePanel from '@/component/RoundScorePanel';
import styles from './MatchUpSummary.module.css';


const MatchUpSummary = ({leftTeam = 'A', rightTeam='B'}) => {
  const areas = ['Attitude', 'Musicality', 'Dynamic', 'Unity'];
  const rounds = [
    { id: 1, index: 1, areas : areas},
    { id: 2, index: 2, areas : areas}
  ];

  const [matchSummary, setMatchSummary] = useState({
    ...areas.reduce((acc, area) => {
      acc[area] = [50 * rounds.length, 50 * rounds.length];

      return acc;
    }, {}),
    'Total': [50 * rounds.length * areas.length, 50 * rounds.length * areas.length]
  });
  const [roundReports, setRoundReports] = useState(Object);

  const exportCsv = () => {
    const csvRows = [
      [`,Team ${leftTeam}`, `Team ${rightTeam}`],
      ...Object.entries(matchSummary).map(([area, scores]) =>[area, ...scores].join(',')),
    ];
    const csvString = csvRows.join('\n');
    console.log(csvString);
    // // const blob = new Blob([csvString], { type: 'text/csv' });
    // // const url = URL.createObjectURL(blob);
    // // console.log(blob);
    // // console.log(url);
  }

  const handleRoundReport = (roundId, roundTotalScores) => {
    // Logic to sum up all panel volumes and setTotalVolume
    // This might involve keeping track of each panel's volume separately
    // and then summing those to find the overall totalVolume
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
    exportCsv();
  }, [matchSummary]);

  return (
    <div>
      <h1 className={styles.matchName}>Team {leftTeam} VS Team {rightTeam}</h1>
      <h1 className={styles.matchName}>Total {matchSummary['Total'][0]} vs {matchSummary['Total'][1]}</h1>
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