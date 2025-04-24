"use client";
import React from "react";
import useFetchMarketData from "@/hooks/useFetchMarket";

const MarketPage = () => {
  const { data, err } = useFetchMarketData();

  if (err) {
    return <div>Error: {err}</div>;
  }

  return (
    <div>
      <h1>Market Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MarketPage;
