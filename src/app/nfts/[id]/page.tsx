"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import useFetchCollectionItems from "@/hooks/useFetchCollectionItems";
import { formatDistanceToNow } from "date-fns";
import { Copy, ExternalLink } from "lucide-react";
import {
  NFTItemAttribute,
  NFTItemCreator,
  NFTItemDetails,
} from "@/types";

const NFTDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const { nfts, error, loading } = useFetchCollectionItems({
    collectionId: id as string,
  });
  const [selectedNft, setSelectedNft] = useState<NFTItemDetails | null>(null);

  if (loading)
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );

  const handleNftClick = (nft: NFTItemDetails) => {
    setSelectedNft(nft);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatPrice = (price: string | undefined, decimals = 9) => {
    if (!price) return "N/A";
    return (parseInt(price) / Math.pow(10, decimals)).toFixed(4);
  };

  const formatTimestamp = (timestamp: number | undefined) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString()} (${formatDistanceToNow(date, {
      addSuffix: true,
    })})`;
  };

  const truncateAddress = (address: string | undefined, length = 6) => {
    if (!address) return "N/A";
    return `${address.slice(0, length)}...${address.slice(-length)}`;
  };

  // Display the selected NFT or the first one if none selected
  const displayNft =
    selectedNft || (Array.isArray(nfts) && nfts.length > 0 ? nfts[0] : null);

  return (
    <div className="container mx-auto p-4">
      {displayNft && (
        <div className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* NFT Image Section */}
            <div className="flex flex-col space-y-4">
              <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square">
                {displayNft.info.meta?.image ? (
                  <img
                    src={displayNft.info.meta.image}
                    alt={
                      displayNft.info.meta.name ||
                      displayNft.info.token_name ||
                      "NFT"
                    }
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">External Links</h3>
                <div className="flex flex-wrap gap-2">
                  {displayNft.info.meta?.external_url && (
                    <a
                      href={displayNft.info.meta.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 px-3 py-1 rounded-md transition">
                      <ExternalLink size={16} />
                      Website
                    </a>
                  )}
                  {displayNft.info?.mint_tx && (
                    <a
                      href={`https://solscan.io/tx/${displayNft.info.mint_tx}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-purple-500 hover:text-purple-600 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-800/50 px-3 py-1 rounded-md transition">
                      <ExternalLink size={16} />
                      View Mint TX
                    </a>
                  )}
                </div>
              </div>
              {/* Creators */}
              {(displayNft.info?.data?.creators ||
                displayNft.info.meta?.properties?.creators) && (
                <div>
                  <h3 className="text-lg font-semibold m-2">Creators</h3>
                  <div className="space-y-3">
                    {(
                      displayNft.info?.data?.creators ||
                      displayNft.info.meta?.properties?.creators ||
                      []
                    ).map((creator: NFTItemCreator, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <p className="font-mono">
                              {truncateAddress(creator.address)}
                            </p>
                            <button
                              onClick={() => copyToClipboard(creator.address)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                              aria-label="Copy creator address">
                              <Copy size={14} />
                            </button>
                          </div>
                          {creator.verified === 1 ||
                          creator.verified === true ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          ) : null}
                        </div>
                        <span className="text-sm">{creator.share}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* NFT Details Section */}
            <div className="flex flex-col">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">
                  {displayNft.info.meta?.name ||
                    displayNft.info.token_name ||
                    "Unnamed NFT"}
                </h2>
                {displayNft.info.meta?.collection?.name && (
                  <p className="text-gray-500 dark:text-gray-400">
                    {displayNft.info.meta.collection.name}
                  </p>
                )}
              </div>

              {displayNft.stats && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-400">
                    Market Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Price
                      </p>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        {formatPrice(displayNft.stats.price)} SOL
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Transaction Type
                      </p>
                      <p className="font-semibold">{displayNft.stats.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Seller
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="font-mono">
                          {truncateAddress(displayNft.stats.seller)}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(displayNft.stats?.seller || "")
                          }
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          aria-label="Copy seller address">
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Buyer
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="font-mono">
                          {truncateAddress(displayNft.stats.buyer)}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(displayNft.stats?.buyer || "")
                          }
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          aria-label="Copy buyer address">
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Market ID
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="font-mono">
                          {truncateAddress(displayNft.stats.market_id)}
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(displayNft.stats?.market_id || "")
                          }
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          aria-label="Copy market ID">
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Trade Time
                      </p>
                      <p className="font-semibold">
                        {formatTimestamp(displayNft.stats.trade_time)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {displayNft.info.meta?.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {displayNft.info.meta.description}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">NFT Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Mint Address
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="font-mono">
                        {truncateAddress(displayNft.info?.address)}
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(displayNft.info?.address || "")
                        }
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        aria-label="Copy mint address">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Symbol
                    </p>
                    <p className="font-semibold">
                      {displayNft.info?.data?.symbol ||
                        displayNft.token_symbol ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created Time
                    </p>
                    <p className="font-semibold">
                      {formatTimestamp(displayNft.info?.created_time)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Royalty
                    </p>
                    <p className="font-semibold">
                      {(displayNft.info?.data?.sellerFeeBasisPoints ||
                        displayNft.info.meta?.seller_fee_basis_points ||
                        0) / 100}
                      %
                    </p>
                  </div>
                </div>
              </div>
              {/* Attributes & Creators Section */}
              <div className="px-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 gap-8">
                {/* Attributes */}
                {displayNft.info.meta?.attributes &&
                  displayNft.info.meta.attributes.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Attributes</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {displayNft.info.meta.attributes.map(
                          (attr: NFTItemAttribute, idx: number) => (
                            <div
                              key={idx}
                              className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex flex-col">
                              <span className="text-xs text-blue-500 dark:text-blue-400 uppercase font-medium">
                                {attr.trait_type}
                              </span>
                              <span className="font-medium">{attr.value}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NFT Grid */}
      <h2 className="text-xl font-bold mb-4">Collection Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(nfts) && nfts.length > 0 ? (
          nfts.map((nft: NFTItemDetails, index: number) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow-sm cursor-pointer transition-all hover:shadow-md
                ${
                  nft === selectedNft
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }
              `}
              onClick={() => handleNftClick(nft)}>
              {nft.info.meta?.image && (
                <div className="aspect-square overflow-hidden rounded-md mb-3 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={nft.info.meta.image}
                    alt={
                      nft.info.meta?.name ||
                      nft.info.token_name ||
                      `NFT #${index}`
                    }
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <h3 className="font-semibold truncate">
                {nft.info.meta?.name || nft.info.token_name || `NFT #${index}`}
              </h3>

              {nft.stats?.price && (
                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                  {formatPrice(nft.stats.price)} SOL
                </div>
              )}

              {nft.info.meta?.attributes && (
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 flex flex-wrap gap-1">
                  {nft.info.meta.attributes
                    .slice(0, 3)
                    .map((attr: NFTItemAttribute, idx: number) => (
                      <span
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full truncate">
                        {attr.trait_type}: {attr.value}
                      </span>
                    ))}
                  {nft.info.meta.attributes.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                      +{nft.info.meta.attributes.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
            No NFTs found in this collection
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailPage;
