import React, { useState } from "react";
import { LoanData } from "../../types/charts/loanTypes";
import styles from "./LoansTable.module.css";

interface LoanTableProps {
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

const LoansTable = ({ data, duration }: LoanTableProps) => {
  const [sortAscending, setSortAscending] = useState(true);

  const sortedData = [...data].sort((a, b) => {
    return sortAscending
      ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortAscending((prev) => !prev)}>
              Date {sortAscending ? "↑" : "↓"}
            </th>{" "}
            <th>Lending Rate</th>
            <th>Borrower Rate</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, idx) => (
            <tr key={idx}>
              <td>{formatTimestamp(Number(item.timestamp), duration)}</td>
              <td>{item.lendingRate}</td>
              <td>{item.borrowerRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoansTable;
