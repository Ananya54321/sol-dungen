"use client";
import React from "react";
import { useParams } from "next/navigation";
import TokenDetails from "@/components/pages/tokens/TokenDetails";
import TokenHoldersList from "@/components/pages/tokens/TokenHoldersList";
const Page = () => {
  const { id } = useParams() as { id: string };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <TokenDetails address={id} />
      <TokenHoldersList address={id} />
    </div>
  );
};

export default Page;
