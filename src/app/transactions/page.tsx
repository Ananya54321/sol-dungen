"use client";
import React, { useState } from "react";
import useFetchTransactions from "@/hooks/useFetchTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionCard from "@/components/pages/transactions/TransactionCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { TransactionCardProps } from "@/types";

const truncateString = (str: string, length = 8) => {
  if (str.length <= length) return str;
  const prefix = str.slice(0, length / 2);
  const suffix = str.slice(str.length - length / 2);
  return `${prefix}...${suffix}`;
};

const formatTime = (timestamp: string) => {
  try {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.log(error);
    return "Unknown time";
  }
};

interface TransactionData {
  tx_hash: string;
  status: string;
  time: string;
  fee: number;
  program_ids: string[];
  signer: string[];
  slot: number;
  block_time: number;
  parsed_instructions: {
    type: string;
    program: string;
    program_id: string;
  }[];
}

const Page = () => {
  const { data, isLoading, error } = useFetchTransactions();
  const [searchInput, setSearchInput] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<TransactionCardProps | null>(
    null
  );
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setSearchLoading(true);
    setSearchResult(null);
    setSearchError(null);

    try {
      const res = await axios.get(
        `https://pro-api.solscan.io/v2.0/transaction/detail?tx=${searchInput}`,
        {
          headers: {
            token: process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      const result = res.data;

      if (result.success) {
        setSearchResult(result.data);
      } else {
        setSearchError(result.errors?.message || "Transaction not found");
      }
    } catch (error) {
      console.log(error);
      setSearchError("Failed to fetch transaction data");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Search Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter transaction hash..."
              className="font-mono"
            />
            <Button type="submit" disabled={searchLoading}>
              {searchLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching
                </>
              ) : (
                "Search"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {searchLoading && (
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      {searchError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{searchError}</AlertDescription>
        </Alert>
      )}

      {searchResult && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionCard transaction={searchResult} />
          </CardContent>
        </Card>
      )}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Error loading transactions: {error}
              </AlertDescription>
            </Alert>
          ) : !data?.success || !data?.data?.length ? (
            <div className="text-center py-6 text-muted-foreground">
              No transactions found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((tx: TransactionData) => (
                  <TableRow key={tx.tx_hash}>
                    <TableCell className="font-mono">
                      {truncateString(tx.tx_hash, 10)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.status === "Success" ? "success" : "destructive"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatTime(tx.time)}</TableCell>
                    <TableCell>{tx.fee / 1000000} SOL</TableCell>
                    <TableCell className="font-mono">
                      {truncateString(tx.program_ids[0], 10)}
                    </TableCell>
                    <TableCell>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={tx.tx_hash}>
                          <AccordionTrigger>View Details</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                              <div>
                                <h4 className="font-semibold">
                                  Transaction Hash
                                </h4>
                                <p className="font-mono text-xs break-all">
                                  {tx.tx_hash}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-semibold">Signer</h4>
                                {tx.signer.map((s, i) => (
                                  <p
                                    key={i}
                                    className="font-mono text-xs break-all"
                                  >
                                    {s}
                                  </p>
                                ))}
                              </div>

                              <div>
                                <h4 className="font-semibold">Slot</h4>
                                <p>{tx.slot}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold">Block Time</h4>
                                <p>
                                  {new Date(
                                    tx.block_time * 1000
                                  ).toLocaleString()}
                                </p>
                              </div>

                              <div>
                                <h4 className="font-semibold">
                                  Instructions ({tx.parsed_instructions.length})
                                </h4>
                                <div className="space-y-2 mt-2">
                                  {tx.parsed_instructions.map((inst, idx) => (
                                    <div
                                      key={idx}
                                      className="p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700"
                                    >
                                      <p>
                                        <span className="font-semibold">
                                          Type:
                                        </span>{" "}
                                        {inst.type}
                                      </p>
                                      <p>
                                        <span className="font-semibold">
                                          Program:
                                        </span>{" "}
                                        {inst.program}
                                      </p>
                                      <p className="font-mono text-xs break-all">
                                        <span className="font-semibold">
                                          Program ID:
                                        </span>{" "}
                                        {inst.program_id}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold">Program IDs</h4>
                                <div className="space-y-1">
                                  {tx.program_ids.map((id, idx) => (
                                    <p
                                      key={idx}
                                      className="font-mono text-xs break-all"
                                    >
                                      {id}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
