import React from "react";
import styles from "./LoansChart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LoanData } from "../../types/charts/loanTypes";

interface LoanChartProps {
  duration: string;
  data: LoanData[];
}

const formatTimestamp = (timestamp: number, duration: string) => {
  const date = new Date(timestamp);

  switch (duration) {
    case "daily":
      return date.toLocaleString("en-ZA", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    case "weekly":
    case "monthly":
      return date.toLocaleDateString("en-ZA", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    case "yearly":
      return date.toLocaleDateString("en-ZA", {
        month: "short",
        year: "numeric",
      });
    default:
      return date.toLocaleString();
  }
};

const LoansChart = ({ data, duration }: LoanChartProps) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      className={styles.responsiveContainer}
    >
      <LineChart data={data}>
        <XAxis
          dataKey="timestamp"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(timestamp) => formatTimestamp(timestamp, duration)}
        />
        <YAxis domain={["auto", "auto"]} width={100} />
        <Tooltip
          labelFormatter={(timestamp) => formatTimestamp(timestamp, duration)}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="lendingRate"
          stroke="#3498db"
          name="Lending Rate"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="borrowerRate"
          stroke="#e74c3c"
          name="Borrower Rate"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoansChart;
