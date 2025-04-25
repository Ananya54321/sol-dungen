import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchNewestNfts() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://pro-api.solscan.io/v2.0/nft/news?filter=created_time&page=1&page_size=24",
        {
          headers: {
            token: process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        setNfts(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch newest nft data");
        setLoading(false);
      });
  }, []);
  return { nfts, error, loading };
}
