import { useEffect, useState } from "react";
import axios from "axios";

interface BlockData {
  blockhash: string;
  fee_rewards: number;
  transactions_count: number;
  current_slot: number;
  block_height: number;
  block_time: number;
  time: string;
  parent_slot: number;
  previous_block_hash: string;
}

interface BlockResponse {
  success: boolean;
  data: BlockData[];
}

export default function useFetchBlocks(limit: number = 10) {
  const [data, setData] = useState<BlockResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://pro-api.solscan.io/v2.0/block/last?limit=${limit}`,
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        setData(response.data);
      } catch (err) {
        setError("Failed to fetch block data");
        console.error("Error fetching block data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [limit]);

  return {
    data,
    isLoading,
    error,
  };
}
