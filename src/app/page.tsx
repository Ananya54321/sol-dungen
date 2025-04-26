import BlockTransaction from "@/components/pages/blocks/BlockTransaction";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Sol-Dungen
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Welcome to Sol-Dungen — your portal to real-time Solana exploration.
            Track $SOL, dive into tokens, follow transactions, and unlock the
            secrets of every block.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/market"
              className="px-6 py-3 bg-blue-800 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
              Explore Markets
            </Link>
            <Link
              href="/transactions"
              className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors">
              View Transactions
            </Link>
          </div>
        </div>
      </section>

      {/* Transactions Section */}
      <BlockTransaction />
    </div>
  );
}
