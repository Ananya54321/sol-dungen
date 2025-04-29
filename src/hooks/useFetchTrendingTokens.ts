import { useEffect, useState } from "react";
import axios from "axios";
import { Token } from "@/types";

interface ApiResponse {
  success: boolean;
  data: Token[];
}

export default function useFetchTrendingTokens() {
  const [data, setData] = useState<Token[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(
          "https://pro-api.solscan.io/v2.0/token/trending?limit=30",
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        if (res.data.success) {
          setData(res.data.data);
          setError("");
        } else {
          setError("Failed to fetch trending tokens");
        }
      } catch (error) {
        setError("Failed to fetch trending tokens");
        console.error("Error fetching trending tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, error, isLoading };
}
