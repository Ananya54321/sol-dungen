"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NftCardProps {
  nft: any;
  className?: string;
}

export function NftCard({ nft, className }: NftCardProps) {
  if (!nft) return null;

  const address = nft.info?.address || "";
  const shortAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : "";
  const name = nft.info?.data?.name || "Unnamed NFT";
  const symbol = nft.info?.data?.symbol || "";
  const description = nft.info?.meta?.description || "No description available";
  const image =
    nft.info?.meta?.image || "/placeholder.svg?height=300&width=300";
  const collection =
    nft.info?.meta?.collection?.name ||
    nft.info?.collection ||
    "Unknown Collection";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card
      className={cn(
        "h-full overflow-hidden transition-all hover:shadow-md",
        className
      )}>
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="line-clamp-1 text-lg">{name}</CardTitle>
            <CardDescription className="line-clamp-1 mt-1">
              {collection}
            </CardDescription>
          </div>
          {symbol && (
            <Badge variant="outline" className="shrink-0 self-start">
              {symbol}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="truncate max-w-[120px]">{shortAddress}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-1"
                  onClick={() => copyToClipboard(address)}>
                  <Copy className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 text-xs"
          asChild>
          <a
            href={`https://solscan.io/token/${address}`}
            target="_blank"
            rel="noopener noreferrer">
            View <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function NftCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <CardHeader className="p-4 pb-0">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5 mt-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full justify-between">
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-7 w-1/4" />
        </div>
      </CardFooter>
    </Card>
  );
}
