import React, {useEffect, useState} from 'react';
import HorizontalScroll from './HorizontalScroll';
import styles from './RoundScorePanel.module.css';
import { RoundReport } from '@/type/MatchDataDef';

interface RoundScorePanelProps {
    roundStatus: RoundReport;
    onRoundValueChange: (...args: any[]) => void;
};

const RoundScorePanel : React.FC<RoundScorePanelProps> = ({roundStatus, onRoundValueChange}) => {
    const [areaScores, setAreaScores] = useState(() => 
        roundStatus.areas.reduce((acc, area) => ({ ...acc, [area.areaName]: 50 }), {})
    );

    const handleValueChange = (area, score) => {
        setAreaScores(prev => ({ ...prev, [area]: score }));
    };

    useEffect(() => {
        onRoundValueChange(roundStatus.index, areaScores);
    }, [areaScores]);

    return (
        <div className={styles.panel}>
            <h2 className={styles.roundIndex}>Round {roundStatus.index}</h2>
            {
                roundStatus.areas.map(area => <HorizontalScroll areaScore={area} onValueChange={handleValueChange}/>, {})
            }
        </div>
    )
}

export default RoundScorePanel;