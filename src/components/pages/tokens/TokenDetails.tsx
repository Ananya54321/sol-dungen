"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchTokenMetaData from "@/hooks/useFetchTokenMetaData";
import dayjs from "dayjs";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface TokenDetailsProps {
  address: string;
}

const TokenDetails = ({ address }: TokenDetailsProps) => {
  const { data, error, isLoading } = useFetchTokenMetaData({ address });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-red-500">Error: {error ?? "Unknown error"}</div>
    );
  }

  const copyToClipboard = (text: string | null) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const formatLargeNumber = (num: number | null) => {
    if (num === null) return "null";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";
    return num.toString();
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-md hover:shadow-lg transition-shadow bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-4">
      <CardHeader className="flex flex-col items-center text-center">
        {data.icon ? (
          <img
            src={data.icon}
            alt={data.name ?? ""}
            className="w-20 h-20 rounded-full mb-4 shadow-md"
          />
        ) : null}
        <CardTitle className="text-3xl font-semibold tracking-tight">
          {data.name ?? "null"} ({data.symbol ?? "null"})
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm mt-1">
          Market Rank: #{data.market_cap_rank ?? "null"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 text-sm">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-muted-foreground">
          <div className="flex justify-between">
            <span>Price:</span>
            <span className="font-medium text-foreground">
              {data.price !== null ? `$${data.price.toFixed(4)}` : "null"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>24h Volume:</span>
            <span className="font-medium text-foreground">
              ${formatLargeNumber(data.volume_24h)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Market Cap:</span>
            <span className="font-medium text-foreground">
              ${formatLargeNumber(data.market_cap)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Price Change 24h:</span>
            <span className="font-medium text-foreground">
              {data.price_change_24h !== null
                ? `${data.price_change_24h.toFixed(2)}%`
                : "null"}
            </span>
          </div>
        </div>

        <div className="border-t pt-4" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-muted-foreground">
          <div className="flex justify-between">
            <span>Decimals:</span>
            <span className="font-medium text-foreground">
              {data.decimals ?? "null"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Supply:</span>
            <span className="font-medium text-foreground">
              {data.supply !== null && data.decimals !== null
                ? formatLargeNumber(Number(data.supply) / 10 ** data.decimals)
                : "null"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Mint Authority:</span>
            {data.mint_authority ? (
              <button
                onClick={() => copyToClipboard(data.mint_authority)}
                className="flex items-center gap-1 text-blue-500 hover:underline"
              >
                {data.mint_authority.slice(0, 6)}...
                {data.mint_authority.slice(-4)}
                <Copy size={14} />
              </button>
            ) : (
              <span className="text-foreground">null</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>Freeze Authority:</span>
            {data.freeze_authority ? (
              <button
                onClick={() => copyToClipboard(data.freeze_authority)}
                className="flex items-center gap-1 text-blue-500 hover:underline"
              >
                {data.freeze_authority.slice(0, 6)}...
                {data.freeze_authority.slice(-4)}
                <Copy size={14} />
              </button>
            ) : (
              <span className="text-foreground">null</span>
            )}
          </div>
          <div className="flex justify-between">
            <span>First Mint Time:</span>
            <span className="font-medium text-foreground">
              {data.first_mint_time !== null
                ? dayjs.unix(data.first_mint_time).format("YYYY-MM-DD HH:mm")
                : "null"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>First Mint Tx:</span>
            {data.first_mint_tx ? (
              <a
                href={`https://solscan.io/tx/${data.first_mint_tx}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Tx
              </a>
            ) : (
              <span className="text-foreground">null</span>
            )}
          </div>
        </div>

        <div className="border-t pt-4" />

        <div className="flex justify-between text-muted-foreground">
          <span>Holders:</span>
          <span className="font-medium text-foreground">
            {formatLargeNumber(data.holder)}
          </span>
        </div>

        {data.metadata && (data.metadata.website || data.metadata.twitter) ? (
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {data.metadata.website && (
              <Badge asChild variant="outline">
                <a
                  href={data.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </Badge>
            )}
            {data.metadata.twitter && (
              <Badge asChild variant="outline">
                <a
                  href={data.metadata.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </Badge>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground mt-4">
            No Metadata
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenDetails;
