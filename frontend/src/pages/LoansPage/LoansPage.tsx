import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoanData } from "../../types/charts/loanTypes";
import LoanControls from "../../components/Loans/LoansControls";
import LoansChart from "../../components/Loans/LoansChart";
import styles from "./LoansPage.module.css";
import LoansTable from "../../components/Loans/LoansTable";

const LoansPage = () => {
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const [currency, setCurrency] = useState("USDT");
  const [duration, setDuration] = useState("daily");
  const [aggregation, setAggregation] = useState("average");
  const [data, setData] = useState<LoanData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const API_BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:5050";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<LoanData[]>(
          `${API_BASE_URL}/api/loans`,
          {
            params: { currency, duration, aggregation },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching loan data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency, duration, aggregation, API_BASE_URL]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Loan Rates</h1>
        <div className={styles.controlsWrapper}>
          <LoanControls
            currency={currency}
            duration={duration}
            aggregation={aggregation}
            onCurrencyChange={setCurrency}
            onDurationChange={setDuration}
            onAggregationChange={setAggregation}
          />
          <button
            onClick={() =>
              setViewMode(viewMode === "chart" ? "table" : "chart")
            }
            className={styles.button}
          >
            Switch to {viewMode === "chart" ? "Table" : "Chart"} View
          </button>
        </div>
        <div className={styles.chart}></div>
        {loading ? (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
            <span>Loading data...</span>
          </div>
        ) : viewMode === "chart" ? (
          <LoansChart data={data} duration={duration} />
        ) : (
          <LoansTable data={data} duration={duration} />
        )}
      </div>
    </div>
  );
};

export default LoansPage;
