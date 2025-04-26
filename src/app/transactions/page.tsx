"use client";
import React from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
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
    return "Unknown time";
  }
};
const page = () => {
  const { data, isLoading, error } = useFetchTransactions();

  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div>Error loading transactions: {error}</div>;
  if (!data?.success || !data?.data?.length)
    return <div>No transactions found</div>;

  const transactions = data.data;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Hash</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Program</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
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
                        <div className="space-y-4 p-2 rounded-md bg-muted/50">
                          <div>
                            <h4 className="font-semibold">Transaction Hash</h4>
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
                              {new Date(tx.block_time * 1000).toLocaleString()}
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
                                  className="p-2 bg-background rounded border"
                                >
                                  <p>
                                    <span className="font-semibold">Type:</span>{" "}
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
      </CardContent>
    </Card>
  );
};

export default page;
