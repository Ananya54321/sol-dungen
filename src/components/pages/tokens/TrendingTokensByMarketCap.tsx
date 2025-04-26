import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetchTrendingTokensByMarketCap from "@/hooks/useFetchTrendingTokensByMarketCap";
import { cn } from "@/lib/utils";

const TrendingTokensByMarketCap = () => {
  const {
    data: tokens,
    error,
    isLoading,
  } = useFetchTrendingTokensByMarketCap();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  if (!tokens || tokens.length === 0)
    return <div className="text-center py-10">No tokens found.</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Trending Tokens by Market Cap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token, index) => (
          <Card
            key={token.address}
            className={cn("overflow-hidden transition-all hover:shadow-md")}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold">
                  {token.symbol}
                </CardTitle>
                <span className="text-xs px-2 py-1 bg-muted rounded-full">
                  #{index + 1}
                </span>
              </div>
              <CardDescription className="text-sm truncate" title={token.name}>
                {token.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Market Cap:</span>
                <span>${(token.market_cap / 1e9).toFixed(2)}B</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span>${token.price.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span>24h Change:</span>
                <span
                  className={cn(
                    "font-semibold",
                    token.price_24h_change >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {token.price_24h_change.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Holders:</span>
                <span>{token.holder.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingTokensByMarketCap;
