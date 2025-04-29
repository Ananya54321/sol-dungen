"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Marketplace = string;

export interface NFTCollection {
  collection_id: string;
  floor_price: number;
  items: number;
  marketplaces: Marketplace[];
  name: string;
  symbol: string;
  volumes: number;
  volumes_change_24h: string;
}

interface NFTCollectionsTableProps {
  collections: NFTCollection[];
  loading?: boolean;
}

export function NFTCollectionsTable({
  collections,
  loading = false,
}: NFTCollectionsTableProps) {
  const router = useRouter();
  const [sortField, setSortField] = useState<keyof NFTCollection>("volumes");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof NFTCollection) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const navigateToCollection = (collectionId: string) => {
    router.push(`/nfts/${collectionId}`);
  };

  const sortedCollections = [...collections].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    // Special handling for string numbers
    if (sortField === "volumes_change_24h") {
      valueA = parseFloat(a[sortField].replace("%", ""));
      valueB = parseFloat(b[sortField].replace("%", ""));
    }

    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  if (loading) {
    return (
      <Card className="w-full overflow-hidden">
        <div className="p-1">
          <div className="flex items-center h-10 px-4">
            <Skeleton className="h-5 w-[200px]" />
            <div className="ml-auto flex">
              <Skeleton className="h-5 w-[100px]" />
            </div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-t">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-6 w-[150px]" />
              </div>
              <div className="mt-3 flex justify-between">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="h-8 px-2 -ml-2 font-semibold">
                  Collection
                  {sortField === "name" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("floor_price")}
                  className="h-8 px-2 -ml-2 font-semibold">
                  Floor Price
                  {sortField === "floor_price" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("items")}
                  className="h-8 px-2 -mr-2 font-semibold ml-auto">
                  Items
                  {sortField === "items" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("volumes")}
                  className="h-8 px-2 -mr-2 font-semibold ml-auto">
                  Volume
                  {sortField === "volumes" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("volumes_change_24h")}
                  className="h-8 px-2 -mr-2 font-semibold ml-auto">
                  24h %
                  {sortField === "volumes_change_24h" && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </Button>
              </TableHead>
              <TableHead className="w-[180px]">Marketplaces</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCollections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No collections found
                </TableCell>
              </TableRow>
            ) : (
              sortedCollections.map((collection) => (
                <TableRow
                  key={collection.collection_id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() =>
                    navigateToCollection(collection.collection_id)
                  }>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <div className="font-medium">{collection.name}</div>
                      <div className="text-muted-foreground text-sm mt-1">
                        {collection.symbol}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{collection.floor_price.toFixed(4)} SOL</TableCell>
                  <TableCell className="text-right">
                    {collection.items.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {collection.volumes.toLocaleString()} SOL
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        parseFloat(collection.volumes_change_24h) >= 0
                          ? "default"
                          : "destructive"
                      }
                      className="font-medium">
                      {collection.volumes_change_24h}%
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          {collection.marketplaces.length} Marketplaces{" "}
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Available on</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {collection.marketplaces.map((marketplace, index) => (
                          <DropdownMenuItem
                            key={index}
                            className="flex items-center justify-between">
                            <span className="truncate">
                              {getMarketplaceName(marketplace)}
                            </span>
                            <ExternalLink className="h-3 w-3 ml-2 opacity-70" />
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

// Helper function to convert marketplace IDs to readable names
function getMarketplaceName(marketplaceId: string): string {
  const marketplaces: Record<string, string> = {
    mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc: "Magic Eden",
    M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K: "Tensor",
    TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN: "Solanart",
    hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu: "Hade Swap",
  };

  return marketplaces[marketplaceId] || marketplaceId.slice(0, 8) + "...";
}
