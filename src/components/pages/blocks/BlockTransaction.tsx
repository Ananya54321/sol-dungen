"use client";

import React from "react";
import useFetchBlocks from "@/hooks/useFetchBlocks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/accordion";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CircleIcon,
  ClockIcon,
  HashIcon,
  LayersIcon,
  ChevronDownIcon,
} from "lucide-react";

const formatTime = (timestamp: string) => {
  try {
    const date = new Date(timestamp);
    return {
      absolute: date.toLocaleString(),
      relative: formatDistanceToNow(date, { addSuffix: true }),
    };
  } catch (error) {
    return {
      absolute: "Unknown time",
      relative: "Unknown time",
    };
  }
};

const truncateHash = (hash: string) => {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
};

const BlockTransaction = () => {
  const { data, isLoading, error } = useFetchBlocks(10);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!data?.success || !data?.data?.length) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No block data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayersIcon className="h-5 w-5" />
            Latest Blocks
          </CardTitle>
          <CardDescription>
            Most recent blocks on the Solana blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {data.data.map((block) => {
              const timeInfo = formatTime(block.time);
              return (
                <AccordionItem value={block.blockhash} key={block.blockhash}>
                  <AccordionTrigger className="px-2 hover:bg-muted/50 rounded-md">
                    <div className="grid grid-cols-5 md:grid-cols-6 w-full text-left">
                      <div className="font-medium">
                        {block.block_height.toLocaleString()}
                      </div>
                      <div className="hidden md:block">
                        {block.current_slot.toLocaleString()}
                      </div>
                      <div className="font-mono flex items-center gap-1">
                        <HashIcon className="h-3 w-3 text-muted-foreground" />
                        {truncateHash(block.blockhash)}
                      </div>
                      <div
                        className="flex items-center gap-1"
                        title={timeInfo.absolute}
                      >
                        <ClockIcon className="h-3 w-3 text-muted-foreground" />
                        {timeInfo.relative}
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {block.transactions_count.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        {(block.fee_rewards / 1000000000).toFixed(4)} SOL
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted/30 p-4 rounded-md mt-2 mb-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Block Hash
                            </span>
                            <p className="font-mono text-sm break-all">
                              {block.blockhash}
                            </p>
                          </div>

                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Previous Block Hash
                            </span>
                            <p className="font-mono text-sm break-all">
                              {block.previous_block_hash}
                            </p>
                          </div>

                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Block Height
                            </span>
                            <p>{block.block_height.toLocaleString()}</p>
                          </div>

                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Slot
                            </span>
                            <p>{block.current_slot.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Parent Slot
                            </span>
                            <p>{block.parent_slot.toLocaleString()}</p>
                          </div>

                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Block Time
                            </span>
                            <p>
                              {new Date(
                                block.block_time * 1000
                              ).toLocaleString()}
                            </p>
                          </div>

                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Transaction Count
                            </span>
                            <p>{block.transactions_count.toLocaleString()}</p>
                          </div>

                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Fee Rewards
                            </span>
                            <p>
                              {(block.fee_rewards / 1000000000).toFixed(6)} SOL
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {data.data.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleIcon className="h-5 w-5" />
              Block Details
            </CardTitle>
            <CardDescription>
              Detailed information about block{" "}
              {data.data[0].block_height.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Block Hash
                  </span>
                  <p className="font-mono text-sm break-all">
                    {data.data[0].blockhash}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Previous Block Hash
                  </span>
                  <p className="font-mono text-sm break-all">
                    {data.data[0].previous_block_hash}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Block Height
                  </span>
                  <p>{data.data[0].block_height.toLocaleString()}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Slot
                  </span>
                  <p>{data.data[0].current_slot.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Parent Slot
                  </span>
                  <p>{data.data[0].parent_slot.toLocaleString()}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Block Time
                  </span>
                  <p>
                    {new Date(data.data[0].block_time * 1000).toLocaleString()}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Transaction Count
                  </span>
                  <p>{data.data[0].transactions_count.toLocaleString()}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Fee Rewards
                  </span>
                  <p>
                    {(data.data[0].fee_rewards / 1000000000).toFixed(6)} SOL
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="text-sm text-center text-muted-foreground">
              Block produced at{" "}
              {new Date(data.data[0].block_time * 1000).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlockTransaction;
