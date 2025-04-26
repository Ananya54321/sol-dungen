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
