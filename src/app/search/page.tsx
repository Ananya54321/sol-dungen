"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const page = () => {
  const [data, setData] = useState();
  async function getData() {
    const res = await axios.get("https://public-api.solscan.io/chaininfo", {
      headers: {},
    });
    console.log(res);
  }
  useEffect(() => {
    getData();
  });

  return <div>page</div>;
};

export default page;
