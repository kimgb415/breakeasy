import React, {useEffect, useState} from 'react';
import HorizontalScroll from './HorizontalScroll';
import styles from './RoundScorePanel.module.css';


const RoundScorePanel = ({roundIndex, areas, reportRoundScores}) => {
    const [areaScores, setAreaScores] = useState(() => 
        areas.reduce((acc, score) => ({ ...acc, [score]: 50 }), {})
    );

    const handleValueChange = (area, score) => {
        setAreaScores(prev => ({ ...prev, [area]: score }));
    };

    useEffect(() => {
        reportRoundScores(roundIndex, areaScores);
    }, [areaScores]);

    return (
        <div className={styles.panel}>
            <h2 className={styles.roundIndex}>Round {roundIndex}</h2>
            {
                areas.map(area => (
                    <HorizontalScroll area={area} onValueChange={handleValueChange}/>
                ), {})
            }
        </div>
    )
}

export default RoundScorePanel;