import React, {useState} from 'react';
import styles from './HorizontalScroll.module.css'; // Import the CSS module

const HorizontalScroll = ({onValueChange, area="Attitude", initialValue = 50, maxValue="100"}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(area, parseInt(newValue, 10))
  };

  return (
    <div className={styles.sliderContainer}>
      <span className={styles.areaValue}>{area}</span>
      <span className={styles.areaValue}>{value}</span>
      <input
        type="range"
        min="0"
        max={maxValue}
        value={value}
        onChange={handleChange}
        style={{ width: '300px' }}
      />
      <span className={styles.areaValue}>{parseInt(maxValue, 10) - value}</span>
    </div>
  );
};

export default HorizontalScroll;