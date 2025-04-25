"use client";

import { NFTCollectionsTable } from "./NftCollectionTable";
import useFetchTrendingNfts from "@/hooks/useFetchTrendingNfts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const TrendingNfts = () => {
  const { nfts, error, loading } = useFetchTrendingNfts();

  return (
    <section className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Trending NFT Collections
        </h2>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <NFTCollectionsTable collections={nfts} loading={loading} />
    </section>
  );
};

export default TrendingNfts;
