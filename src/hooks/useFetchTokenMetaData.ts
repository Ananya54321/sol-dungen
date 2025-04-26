import { useEffect, useState } from "react";
import axios from "axios";
import { Token } from "@/types";
import { DetailedToken } from "@/types";
interface ApiResponse {
  success: boolean;
  data: DetailedToken[];
}

export default function useFetchTokenMetaData({
  address,
}: {
  address: string;
}) {
  const [data, setData] = useState<DetailedToken | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(
          `https://pro-api.solscan.io/v2.0/token/meta/multi?address[]=${address}`,
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        if (res.data.success) {
          setData(res.data.data[0]);
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
