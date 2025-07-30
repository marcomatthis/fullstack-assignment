import { Request, Response } from "express";
import axios from "axios";
import crypto from "crypto";
import { LoanRate } from "../types/LoanRate";
import { format, startOfHour, startOfDay, startOfMonth } from "date-fns";
import dotenv from "dotenv";

dotenv.config();

const valrApiKey: string = process.env.VALR_API_KEY!;
const valrSecretKey: string = process.env.VALR_SECRET!;

type AggregationType = "average" | "min" | "max";
type Duration = "daily" | "weekly" | "monthly" | "yearly";

export function generateValrSignature({
  apiKey,
  apiSecret,
  subAccountId,
  method,
  url,
  body,
}: {
  apiKey: string;
  apiSecret: string;
  subAccountId?: string;
  method: string;
  url: string;
  body?: string;
}) {
  const requestTimestamp = Date.now();

  const getPath = (url: string): string => {
    const pathRegex = /(?:.+?:\/\/.+?)?(\/.+)/;
    const result = url.match(pathRegex);
    return result && result.length > 1 ? result[1] : "";
  };

  const requestPath = getPath(url);
  const requestBody = method.toUpperCase() === "GET" || !body ? "" : body;
  const requestData = [
    requestTimestamp,
    method.toUpperCase(),
    requestPath,
    requestBody,
    subAccountId || "",
  ].join("");

  const hmacDigest = crypto
    .createHmac("sha512", apiSecret)
    .update(requestData)
    .digest("hex");

  return {
    signature: hmacDigest,
    timestamp: requestTimestamp,
    subAccountHeader: subAccountId
      ? { "X-VALR-SUB-ACCOUNT-ID": subAccountId }
      : {},
  };
}

function getBucketKey(timestamp: Date, duration: Duration): string {
  switch (duration) {
    case "daily":
      return format(startOfHour(timestamp), "yyyy-MM-dd HH:00");
    case "weekly":
    case "monthly":
      return format(startOfDay(timestamp), "yyyy-MM-dd");
    case "yearly":
      return format(startOfMonth(timestamp), "yyyy-MM");
  }
}

export const getLoans = async (req: Request, res: Response) => {
  try {
    const maxHoursPerRequest = 100;

    const { currency, duration, aggregation } = req.query;

    const now = new Date();
    const endTime = now;
    const startTime = new Date(now);

    switch (duration) {
      case "daily":
        startTime.setDate(now.getDate() - 1);
        break;
      case "weekly":
        startTime.setDate(now.getDate() - 7);
        break;
      case "monthly":
        startTime.setMonth(now.getMonth() - 1);
        break;
      case "yearly":
        startTime.setFullYear(now.getFullYear() - 1);
        break;
      default:
        throw new Error(`Unsupported duration: ${duration}`);
    }

    const results: any[] = [];

    let currentStartTime = new Date(startTime);

    while (currentStartTime < endTime) {
      const currentEndTime = new Date(
        Math.min(
          currentStartTime.getTime() + maxHoursPerRequest * (1000 * 60 * 60),
          endTime.getTime()
        )
      );

      const startISOString = currentStartTime.toISOString();
      const endISOString = currentEndTime.toISOString();

      const url = `https://api.valr.com/v1/loans/rates/history?currencySymbol=${currency}&startTime=${startISOString}&endTime=${endISOString}`;

      const generatedHeader = generateValrSignature({
        apiKey: valrApiKey,
        apiSecret: valrSecretKey,
        method: "get",
        url: url,
      });

      const response = await axios.get<LoanRate[]>(url, {
        headers: {
          "X-VALR-API-KEY": valrApiKey,
          "X-VALR-SIGNATURE": generatedHeader.signature,
          "X-VALR-TIMESTAMP": generatedHeader.timestamp,
        },
      });

      results.push(...response.data);

      currentStartTime = new Date(currentEndTime);
    }

    const buckets: Record<string, { lending: number[]; borrowing: number[] }> =
      {};

    for (const loanRate of results) {
      const timestamp = new Date(loanRate.createdAt);
      const key = getBucketKey(timestamp, duration);
      if (!buckets[key]) {
        buckets[key] = { lending: [], borrowing: [] };
      }
      if (loanRate.lendingRate) {
        buckets[key].lending.push(Number(loanRate.lendingRate));
      }
      if (loanRate.borrowerRate) {
        buckets[key].borrowing.push(Number(loanRate.borrowerRate));
      }
    }

    const sortedData = Object.keys(buckets)
      .map((key) => {
        const { lending, borrowing } = buckets[key];

        const aggregate = (values: number[]) => {
          switch (aggregation) {
            case "average":
              return (
                values.reduce((acc, val) => acc + Number(val), 0.0) /
                values.length
              );
            case "min":
              return Math.min(...values);
            case "max":
              return Math.max(...values);
          }
        };

        return {
          timestamp: new Date(key).getTime(),
          lendingRate: aggregate(lending),
          borrowerRate: aggregate(borrowing),
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);

    res.status(200).json(sortedData);
  } catch (error) {
    console.error("Failed to fetch loan data", error);
    res.status(500).json({ error: "Failed to fetch loan data" });
  }
};
