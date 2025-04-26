import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetchTrendingTokens from "@/hooks/useFetchTrendingTokens";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TrendingTokens = () => {
  const { data: tokens, error, isLoading } = useFetchTrendingTokens();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  if (!tokens || tokens.length === 0)
    return <div className="text-center py-10">No trending tokens found.</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Trending Tokens</h1>
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

              <div className="flex items-center justify-between space-x-2 mt-2">
                <CardDescription
                  className="text-sm truncate"
                  title={token.name}
                >
                  {token.name}
                </CardDescription>
                <Button variant="outline" size="sm" className="text-xs">
                  <Link href={`/token/${token.address}`}>View More</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground space-y-2">
                <div className="flex justify-between">
                  <span>Decimals:</span>
                  <span>{token.decimals}</span>
                </div>
                <div className="flex flex-col">
                  <span>Address:</span>
                  <span className="truncate text-xs" title={token.address}>
                    {token.address}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingTokens;
