import React from "react";
import useFetchTrendingNfts from "@/hooks/useFetchTrendingNfts";

const TrendingNfts = () => {
  const { nfts, error, loading } = useFetchTrendingNfts();

  return (
    <div>
      <h1 className="text-3xl font-bold">Trending NFTs</h1>
      {loading && <p>Loading...</p>}
      {/* Error message handling removed as per recent edits */}
      {nfts.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {nfts.map((nft: any) => (
            <div key={nft.id} className="border p-4">
              <h2 className="text-xl font-bold">{nft.name}</h2>
              <img src={nft.image} alt={nft.name} />
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found</p>
      )}
    </div>
  );
};

export default TrendingNfts;
