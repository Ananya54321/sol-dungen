import { useEffect, useState } from "react";
import axios from "axios";
import { Token } from "@/types";

interface ApiResponse {
  success: boolean;
  data: Token[];
}

export default function useFetchTrendingTokensByMarketCap() {
  const [data, setData] = useState<Token[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(
          "https://pro-api.solscan.io/v2.0/token/list?sort_by=market_cap&sort_order=desc&page=1&page_size=30",
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        if (res.data.success) {
          const sortedData = res.data.data.sort(
            (a, b) => b.market_cap - a.market_cap
          );
          setData(sortedData);
          setError("");
        } else {
          setError("Failed to fetch trending tokens by market cap");
        }
      } catch (error) {
        setError("Failed to fetch trending tokens by market cap");
        console.error("Error fetching trending tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, error, isLoading };
}
