import React, {useState} from 'react';
import { AreaScore } from '@/type/MatchDataDef';
import styles from './HorizontalScroll.module.css'; // Import the CSS module


interface HorizontalScrollProps {
  areaScore: AreaScore; // Corrected type annotation
  onValueChange: (areaName: string, newValue: number) => void; // Assuming `onValueChange` is a function taking any value and returning void
}

const HorizontalScroll : React.FC<HorizontalScrollProps> = ({areaScore, onValueChange}) => {
  const [value, setValue] = useState(areaScore.currentScore);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(areaScore.areaName, parseInt(newValue, 10))
  };

  return (
    <div className={styles.sliderContainer}>
      <span className={styles.areaValue}>{areaScore.areaName}</span>
      <span className={styles.areaValue}>{value}</span>
      <input
        type="range"
        min="0"
        max={areaScore.maxScore}
        value={value}
        onChange={handleChange}
        style={{ width: '300px' }}
      />
      <span className={styles.areaValue}>{areaScore.maxScore - value}</span>
    </div>
  );
};

export default HorizontalScroll;