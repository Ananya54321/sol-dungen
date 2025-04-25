import { useState, useEffect } from "react";
import axios from "axios";

const TrendingNfts = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://pro-api.solscan.io/v2.0/nft/collection/lists?range=1&sort_order=desc&sort_by=volumes&page=1&page_size=10",
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
        setError("Failed to fetch trending nft data");
        setLoading(false);
      });
  }, []);
  return { nfts, loading, error };
};

export default TrendingNfts;
