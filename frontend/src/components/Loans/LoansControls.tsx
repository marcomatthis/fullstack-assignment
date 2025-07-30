import React from "react";
import styles from "./LoansControls.module.css";

interface LoanControlsProps {
  currency: string;
  duration: string;
  aggregation: string;
  onCurrencyChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onAggregationChange: (value: string) => void;
}

const LoanControls = (props: LoanControlsProps) => {
  const {
    currency,
    duration,
    aggregation,
    onCurrencyChange,
    onDurationChange,
    onAggregationChange,
  } = props;

  return (
    <div className={styles.controls}>
      <div className={styles.controlGroup}>
        <label className={styles.label}>Currency</label>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className={styles.select}
        >
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.label}>Duration</label>
        <select
          value={duration}
          onChange={(e) => onDurationChange(e.target.value)}
          className={styles.select}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className={styles.controlGroup}>
        <label className={styles.label}>Aggregation</label>
        <select
          value={aggregation}
          onChange={(e) => onAggregationChange(e.target.value)}
          className={styles.select}
        >
          <option value="average">Average</option>
          <option value="min">Min</option>
          <option value="max">Max</option>
        </select>
      </div>
    </div>
  );
};

export default LoanControls;
