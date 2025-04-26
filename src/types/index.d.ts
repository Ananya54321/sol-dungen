export interface PoolData {
  pool_address: string;
  program_id: string;
  token1: string;
  token2: string;
  created_time: number;
}
export interface MarketData {
  data: PoolData[];
  success: boolean;
}
export interface ParsedInstruction {
  type: string;
  program: string;
  program_id: string;
}

export interface Transaction {
  slot: number;
  fee: number;
  status: string;
  signer: string[];
  block_time: number;
  tx_hash: string;
  parsed_instructions: ParsedInstruction[];
  program_ids: string[];
  time: string;
}

export interface TransactionResponse {
  success: boolean;
  data: Transaction[];
}
export interface TransactionData {
  tx_hash: string;
  status: string;
  time: string;
  fee: number;
  program_ids: string[];
  signer: string[];
  slot: number;
  block_time: number;
  block_id: string;
  program_id: string;
  parsed_instructions: {
    type: string;
    program: string;
    program_id: string;
  }[];
}
export interface TransactionCardProps {
  tx_hash: string;
  tx_status: "finalized" | "failed" | string; // you can make it more specific if needed
  block_time: number;
  block_id: string | number;
  fee: number; // in lamports
  signer?: string[];
  parsed_instructions?: {
    type: string;
    program: string;
    program_id: string;
  }[];
  programs_involved?: string[];
  sol_bal_change?: {
    address: string;
    pre_balance: number;
    post_balance: number;
    change_amount: number;
  }[];
}

export interface NFTMetadata {
  description?: string;
  image?: string;
  collection?: {
    name?: string;
    family?: string;
  };
  external_url?: string;
  name?: string;
  symbol?: string;
  poolInfo?: PoolInfo;
  positionInfo?: PositionInfo;
}

export interface NFTData {
  name?: string;
  symbol?: string;
}

export interface NFTInfo {
  address?: string;
  data?: NFTData;
  meta?: NFTMetadata;
  collection?: string;
}

export interface NFT {
  info?: NFTInfo;
}

export interface NftCardProps {
  nft: NFT;
  className?: string;
}
export interface Token {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  chainId?: number;
  logoURI?: string;
  programId?: string;
  tags?: string[];
  extensions?: Record<string, string>;
  market_cap: number;
  price: number;
  price_24h_change: number;
  holder: number;
  created_time?: number;
}

export interface PoolAPRStats {
  apr: number;
  feeApr: number;
  priceMax?: number;
  priceMin?: number;
  rewardApr?: Array<{
    apr: number;
    rewardMint?: string;
    rewardSymbol?: string;
  }>;
  volume?: number;
  volumeFee?: number;
  volumeQuote?: number;
}

export interface PoolInfo {
  id?: string;
  mintA?: Token;
  mintB?: Token;
  mintAmountA?: number;
  mintAmountB?: number;
  price?: number;
  tvl?: number;
  feeRate?: number;
  type?: string;
  programId?: string;
  day?: PoolAPRStats;
  week?: PoolAPRStats;
  month?: PoolAPRStats;
  config?: Record<string, string>;
}

export interface UnclaimedFeeInfo {
  amountA: number;
  amountB: number;
  reward?: Array<{
    amount?: number;
    mint?: string;
    symbol?: string;
  }>;
  usdFeeValue?: number;
  usdRewardValue?: number;
  usdValue?: number;
}

export interface PositionInfo {
  amountA?: number;
  amountB?: number;
  tvlPercentage?: number;
  unclaimedFee?: UnclaimedFeeInfo;
  usdValue?: number;
}

export interface NFTItemAttribute {
  trait_type: string;
  value: string | number;
}

export interface NFTItemCreator {
  address: string;
  share: number;
  verified: boolean | number;
}

export interface NFTItemMeta {
  name?: string;
  description?: string;
  image?: string;
  external_url?: string;
  attributes?: NFTItemAttribute[];
  collection?: {
    name: string;
    family?: string;
  };
  seller_fee_basis_points?: number;
  properties?: {
    creators?: NFTItemCreator[];
  };
}

export interface NFTItemInfo {
  address?: string;
  token_name?: string;
  token_symbol?: string;
  mint_tx?: string;
  created_time?: number;
  meta?: NFTItemMeta;
  data?: {
    symbol?: string;
    sellerFeeBasisPoints?: number;
    creators?: NFTItemCreator[];
  };
}

export interface NFTItemStats {
  price?: string;
  type?: string;
  seller?: string;
  buyer?: string;
  market_id?: string;
  trade_time?: number;
}

export interface NFTItemDetails {
  info: NFTItemInfo;
  stats?: NFTItemStats;
  meta?: NFTItemMeta;
  token_symbol?: string;
}
export interface TokenMetadata {
  name: string;
  image: string;
  symbol: string;
  description: string;
  twitter: string;
  website: string;
}

export interface DetailedToken {
  address: string;
  name: string;
  symbol: string;
  icon: string;
  decimals: number;
  holder: number;
  first_mint_tx: string;
  first_mint_time: number;
  metadata?: TokenMetadata;
  mint_authority: string;
  freeze_authority: string;
  supply: string;
  price: number;
  volume_24h: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
}
