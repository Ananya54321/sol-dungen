import { useEffect, useState } from "react";
import axios from "axios";
import { TransactionResponse } from "@/types";

export default function useFetchTransactions() {
  const [data, setData] = useState<TransactionResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://pro-api.solscan.io/v2.0/transaction/last?limit=100&filter=all",
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        if (res.data.success) {
          setError("");
        } else {
          setError("failed to fetch transaction data");
        }
        setData(res.data);
      } catch (error) {
        setError("failed to fetch market data");
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return { data, error, isLoading };
}
