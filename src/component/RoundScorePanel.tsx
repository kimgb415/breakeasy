import React, {useEffect, useState} from 'react';
import HorizontalScroll from './HorizontalScroll';
import styles from './RoundScorePanel.module.css';
import { RoundReport } from '@/type/MatchDataDef';

interface RoundScorePanelProps {
    roundStatus: RoundReport;
    onRoundValueChange: (...args: any[]) => void;
};

const RoundScorePanel : React.FC<RoundScorePanelProps> = ({roundStatus, onRoundValueChange}) => {
    const [currentRoundStatus, setCurrentRoundStatus] = useState(roundStatus);

    const handleValueChange = (area, score) => {
        setCurrentRoundStatus(prev => {
            return {
            ...prev,
            areas: {
                ...prev.areas,
                [area]: score,
            },
        };
        });
    };

    useEffect(() => {
        onRoundValueChange(roundStatus.index, currentRoundStatus);
    }, [currentRoundStatus]);

    return (
        <div className={styles.panel}>
            <h2 className={styles.roundIndex}>Round {roundStatus.index}</h2>
            {
                Object.entries(roundStatus.areas).map(area => <HorizontalScroll areaName={area[0]} score={area[1]} onValueChange={handleValueChange}/>)
            }
        </div>
    )
}

export default RoundScorePanel;