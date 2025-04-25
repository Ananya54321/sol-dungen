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
