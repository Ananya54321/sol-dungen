import TrendingNfts from "@/components/pages/nfts/TrendingNfts";
import NewestNfts from "@/components/pages/nfts/NewestNfts";
import { Separator } from "@/components/ui/separator";

export default function NftsPage() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="py-8 space-y-8 w-full max-w-7xl px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            NFT Explorer
          </h1>
          <p className="text-muted-foreground text-lg mx-auto max-w-2xl">
            Discover and explore the latest NFTs on the blockchain
          </p>
          <Separator className="mt-6" />
        </div>
        <TrendingNfts />

        <Separator className="my-8" />
        <NewestNfts />
      </div>
    </div>
  );
}
