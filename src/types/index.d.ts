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

export interface NFTMetadata {
  description?: string;
  image?: string;
  collection?: {
    name?: string;
  };
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
