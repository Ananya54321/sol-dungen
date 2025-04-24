import { useEffect, useState } from "react";
import axios from "axios";
import { MarketData } from "@/types";

export default function useFetchMarketData() {
  const [marketData, setData] = useState<MarketData | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://pro-api.solscan.io/v2.0/market/list?page=1&page_size=10&sort_by=created_time&sort_order=desc",
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        setErr("failed to fetch data");
        console.error("Error fetching market data:", error);
      }
    }

    fetchData();
  }, []);

  if (marketData && marketData.success) {
    return {
      marketData: marketData.data,
      err: "",
    };
  }
  return {
    marketData: [],
    err: "failed to fetch data",
  };
}
