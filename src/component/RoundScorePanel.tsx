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
            <HorizontalScroll area="Attitude" onValueChange={handleValueChange}/>
            <HorizontalScroll area="Musicality" onValueChange={handleValueChange}/>
            <HorizontalScroll area="Dynamic" onValueChange={handleValueChange}/>
        </div>
    )
}

export default RoundScorePanel;