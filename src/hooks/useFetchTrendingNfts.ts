import { useState, useEffect } from "react";
import axios from "axios";
import { NFTCollection } from "@/components/pages/nfts/NftCollectionTable";

const useFetchTrendingNfts = () => {
  const [nfts, setNfts] = useState<NFTCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get(
          "https://pro-api.solscan.io/v2.0/nft/collection/lists?range=1&sort_order=desc&sort_by=volumes&page=1&page_size=10",
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        const formattedData: NFTCollection[] = response.data.data.map(
          (item: NFTCollection) => ({
            collection_id: item.collection_id,
            floor_price: item.floor_price,
            items: item.items,
            marketplaces: item.marketplaces || [],
            name: item.name,
            symbol: item.symbol,
            volumes: item.volumes,
            volumes_change_24h: item.volumes_change_24h,
          })
        );

        setNfts(formattedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch trending NFT data");
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return { nfts, loading, error };
};

export default useFetchTrendingNfts;
