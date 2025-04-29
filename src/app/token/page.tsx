"use client";
import React from "react";
import TrendingTokens from "@/components/pages/tokens/TrendingTokens";
import TrendingTokensByMarketCap from "@/components/pages/tokens/TrendingTokensByMarketCap";
const page = () => {
  return (
    <div>
      <TrendingTokensByMarketCap />
      <TrendingTokens />
    </div>
  );
};

export default page;
