"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const NewestNfts = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        "https://pro-api.solscan.io/v2.0/nft/news?filter=created_time&page=1&page_size=24",
        {
          headers: {
            token: process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        setNfts(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">Newest NFTs</h1>
      {loading && <p>Loading...</p>}
      {/* Error message handling removed as per recent edits */}
      {nfts.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {nfts.map((nft: any) => (
            <div key={nft.id} className="border p-4">
              <h2 className="text-xl font-bold">{nft.name}</h2>
              <img src={nft.image} alt={nft.name} />
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found</p>
      )}
    </div>
  );
};

export default NewestNfts;
