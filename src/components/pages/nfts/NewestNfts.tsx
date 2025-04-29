"use client";

import { useRef, useState } from "react";
import useFetchNewestNfts from "@/hooks/useFetchNewestNfts";
import { NftCard, NftCardSkeleton } from "./NftCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { NFT } from "@/types";

export default function NewestNfts() {
  const { nfts, error, loading } = useFetchNewestNfts();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainer = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const currentScroll = container.scrollLeft;
    const newPosition =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    // Check scroll possibilities after scrolling
    setTimeout(() => {
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft <
            container.scrollWidth - container.clientWidth - 10
        );
      }
    }, 300);
  };

  return (
    <section className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Newest NFTs</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollContainer("left")}
            disabled={!canScrollLeft || loading}
            className="h-9 w-9">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollContainer("right")}
            disabled={!canScrollRight || loading}
            className="h-9 w-9">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={() => {
            const container = containerRef.current;
            if (container) {
              setCanScrollLeft(container.scrollLeft > 0);
              setCanScrollRight(
                container.scrollLeft <
                  container.scrollWidth - container.clientWidth - 10
              );
            }
          }}>
          {loading ? (
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="min-w-[300px] max-w-[300px] snap-start">
                  <NftCardSkeleton />
                </div>
              ))
          ) : nfts.length > 0 ? (
            nfts.map(
              (nft: NFT, index: number) =>
                nft.info?.meta && (
                  <div
                    key={index}
                    className="min-w-[300px] max-w-[300px] snap-start">
                    <NftCard nft={nft} />
                  </div>
                )
            )
          ) : (
            <div className="w-full py-12 text-center text-muted-foreground">
              No NFTs found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
