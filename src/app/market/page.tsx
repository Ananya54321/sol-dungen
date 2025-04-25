"use client";
import React, { useState } from "react";
import useFetchMarketData from "@/hooks/useFetchMarket";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Copy, ExternalLink } from "lucide-react";
import { PoolData } from "@/types";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const programNames: Record<string, string> = {
  pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA: "pAMM Bay",
  CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK: "CAMM",
  LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo: "LBUZ",
};
const tokenNames: Record<string, string> = {
  So11111111111111111111111111111111111111112: "SOL",
  AyYboaN7h4jiMZSgGhYwDFmaKHw9LuK2NHyo82F3s2LK: "AYY",
  GdHqTGuAsETEP8zt37NVahpcYioppvcnigBPtZ9BXN7v: "GDH",
  "7Q3SHo5rgT5KuNhrNWvvw88oaXN1CZEqcDnaiBBfmoon": "7Q3",
  PctT849PR4DQFdQYzSSPPP7riwFffxcmHmMCCP9pump: "PCT",
  "8KdQe5HT8BXo1RzhmuL1erf3z3ceK7b9HNEDz9RYpump": "8KD",
  CHdbMCczNDyEhAmdv5cgBzts1cG53y8vHkVh6kRmqsXn: "CHD",
  "7QfDrhYANgXgsFsG1sfYrk5aYig88y7Mdq8ZMgSECVJH": "7QF",
  ED3XWPBJLx7AdqnkXmx6SYRTPxsCsnnKf3zGribAhzcJ: "ED3",
  "7MskUKJ5NvXqc3VZMxEW6TxD22auVftRzPHPBz74QMgf": "7MS",
  "3GqdKecg6bQ3K8SnNYh1ybVxzqkhZqZPaBnHQkN8Rh3r": "3GQ",
};
const MarketPage = () => {
  const {
    marketData,
    err,
  }: {
    marketData: PoolData[];
    err: string;
  } = useFetchMarketData();
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 4)}...${address.substring(
      address.length - 4
    )}`;
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };
  const filteredData = marketData.filter(
    (pool: PoolData) =>
      pool.pool_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.program_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.token1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.token2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tokenNames[pool.token1] &&
        tokenNames[pool.token1]
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (tokenNames[pool.token2] &&
        tokenNames[pool.token2]
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (programNames[pool.program_id] &&
        programNames[pool.program_id]
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  if (err) {
    return (
      <div>
        <Skeleton className="h-32 w-1/2 mx-auto my-2" />
        <Skeleton className="h-32 w-1/2 mx-auto my-2" />
        <Skeleton className="h-32 w-1/2 mx-auto my-2" />
        <Skeleton className="h-32 w-1/2 mx-auto my-2 " />
        <Skeleton className="h-32 w-1/2 mx-auto my-2" />
        <Skeleton className="h-32 w-1/2 mx-auto my-2" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Market Pools</CardTitle>
          <CardDescription>
            View and search through available liquidity pools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by pool address, token, or program..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>{filteredData.length} pools found</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Pool</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Token Pair</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((pool: PoolData) => (
                  <TableRow key={pool.pool_address}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span>{truncateAddress(pool.pool_address)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(pool.pool_address)}
                        >
                          <Copy
                            className={cn(
                              "h-3 w-3",
                              copiedAddress === pool.pool_address
                                ? "text-green-500"
                                : "text-muted-foreground"
                            )}
                          />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {programNames[pool.program_id] ||
                          truncateAddress(pool.program_id)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                          {tokenNames[pool.token1] ||
                            truncateAddress(pool.token1)}
                        </Badge>
                        <span className="hidden sm:inline">/</span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {tokenNames[pool.token2] ||
                            truncateAddress(pool.token2)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {formatDate(pool.created_time)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="h-8">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketPage;
