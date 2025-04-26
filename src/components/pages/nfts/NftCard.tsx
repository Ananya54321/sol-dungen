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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { NftCardProps } from "@/types";
import { formatNumber } from "@/lib/utils";

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
    "Standalone Collection";

  // Extract pool information
  const poolInfo = nft.info?.meta?.poolInfo || null;
  const positionInfo = nft.info?.meta?.positionInfo || null;

  // Extract token information
  const tokenA = poolInfo?.mintA?.symbol || "";
  const tokenB = poolInfo?.mintB?.symbol || "";
  const pairName = tokenA && tokenB ? `${tokenA}/${tokenB}` : "";

  // Extract financial metrics
  const tvl = poolInfo?.tvl || 0;
  const price = poolInfo?.price || 0;
  const feeRate = poolInfo?.feeRate ? poolInfo.feeRate * 100 : 0;

  // APR data
  const dayApr = poolInfo?.day?.apr || 0;
  const weekApr = poolInfo?.week?.apr || 0;
  const monthApr = poolInfo?.month?.apr || 0;

  // Position details
  const amountA = positionInfo?.amountA || 0;
  const amountB = positionInfo?.amountB || 0;
  const positionValue = positionInfo?.usdValue || 0;
  const unclaimedFees = positionInfo?.unclaimedFee?.usdValue || 0;

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
        {pairName && (
          <Badge className="mt-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">
            {pairName}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {description}
        </p>

        {poolInfo && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-sm py-2">
                Pool Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {price > 0 && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">
                        ${formatNumber(price)}
                      </span>
                    </div>
                  )}
                  {tvl > 0 && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">TVL:</span>
                      <span className="font-medium">${formatNumber(tvl)}</span>
                    </div>
                  )}
                  {feeRate > 0 && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Fee Rate:</span>
                      <span className="font-medium">{feeRate.toFixed(2)}%</span>
                    </div>
                  )}
                  {poolInfo.type && (
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{poolInfo.type}</span>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {(dayApr > 0 || weekApr > 0 || monthApr > 0) && (
              <AccordionItem value="apr">
                <AccordionTrigger className="text-sm py-2">
                  APR Statistics
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {dayApr > 0 && (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Day:</span>
                        <span className="font-medium text-green-500">
                          {formatNumber(dayApr)}%
                        </span>
                      </div>
                    )}
                    {weekApr > 0 && (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Week:</span>
                        <span className="font-medium text-green-500">
                          {formatNumber(weekApr)}%
                        </span>
                      </div>
                    )}
                    {monthApr > 0 && (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Month:</span>
                        <span className="font-medium text-green-500">
                          {formatNumber(monthApr)}%
                        </span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {positionInfo && (
              <AccordionItem value="position">
                <AccordionTrigger className="text-sm py-2">
                  Position Info
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {amountA > 0 && tokenA && (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">
                          {tokenA} Amount:
                        </span>
                        <span className="font-medium">
                          {formatNumber(amountA)}
                        </span>
                      </div>
                    )}
                    {amountB > 0 && tokenB && (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">
                          {tokenB} Amount:
                        </span>
                        <span className="font-medium">
                          {formatNumber(amountB)}
                        </span>
                      </div>
                    )}
                    {positionValue > 0 && (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Value:</span>
                        <span className="font-medium">
                          ${formatNumber(positionValue)}
                        </span>
                      </div>
                    )}
                    {unclaimedFees > 0 && (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">
                          Unclaimed Fees:
                        </span>
                        <span className="font-medium">
                          ${formatNumber(unclaimedFees)}
                        </span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
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
        <Skeleton className="h-5 w-1/3 mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5 mt-2" />
        <Skeleton className="h-28 w-full mt-4" />
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
