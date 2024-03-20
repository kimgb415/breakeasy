import React, {useState} from 'react';
import { AreaScore, Score } from '@/type/MatchDataDef';
import styles from './HorizontalScroll.module.css'; // Import the CSS module


interface HorizontalScrollProps {
  areaName : string;
  score: Score; // Corrected type annotation
  onValueChange: (areaName: string, score: Score) => void; // Assuming `onValueChange` is a function taking any value and returning void
}

const HorizontalScroll : React.FC<HorizontalScrollProps> = ({areaName, score, onValueChange}) => {
  const [value, setValue] = useState(score.currentScore);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    const newScore : Score = {
      currentScore : parseInt(newValue, 10),
      maxScore : score.maxScore
    }
    onValueChange(areaName, newScore)
  };

  return (
    <div className={styles.sliderContainer}>
      <span className={styles.areaValue}>{areaName}</span>
      <span className={styles.areaValue}>{value}</span>
      <input
        type="range"
        min="0"
        max={score.maxScore}
        value={value}
        onChange={handleChange}
        style={{ width: '300px' }}
      />
      <span className={styles.areaValue}>{score.maxScore - value}</span>
    </div>
  );
};

export default HorizontalScroll;