export interface Token {
  name: string
  symbol: string
  totalSupply: string
  decimals: number
  description: string
  iconUrl?: string
  createdAt: string
}

export interface TokenData {
  price: number
  marketCap: number
  volume24h: number
  liquidity: number
  liquidityUSD: number
  priceChange: number
  holders: number
}

export interface ChartDataPoint {
  time: number
  price: number
}
