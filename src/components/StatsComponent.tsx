import React from "react";
import axios from "axios";
const StatsComponent = async () => {
  const res = await axios.get("https://public-api.solscan.io/chaininfo", {
    headers: {
      token: process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  const data = res.data;
  if (!data.success) return <div>StatsComponent</div>;
  return (
    <div>
      <h1>Block Height:{data.data.blockHeight}</h1>
      <h1>Transaction Count:{data.data.transactionCount}</h1>
    </div>
  );
};

export default StatsComponent;
