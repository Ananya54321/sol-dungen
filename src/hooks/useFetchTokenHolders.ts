import { useEffect, useState } from "react";
import axios from "axios";

interface TokenHolder {
  address: string;
  amount: number;
  decimals: number;
  owner: string;
  rank: number;
}
interface ApiResponse {
  success: boolean;
  data: {
    total: number;
    items: TokenHolder[];
  };
}

export default function useFetchTokenHolders({ address }: { address: string }) {
  const [data, setData] = useState<TokenHolder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(
          `https://pro-api.solscan.io/v2.0/token/holders?address=${address}&page=1&page_size=20`,
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_KEY!,
            },
          }
        );
        if (res.data.success) {
          setData(res.data.data.items);
          setTotal(res.data.data.total);
          setError("");
        } else {
          setError("Failed to fetch token holders");
        }
      } catch (error) {
        setError("Failed to fetch token holders");
        console.error("Error fetching token holders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [address]);

  return { data, total, error, isLoading };
}
