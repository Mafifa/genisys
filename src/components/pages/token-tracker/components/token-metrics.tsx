import type React from "react"
import { DollarSign, Activity, Users, TrendingUp } from "lucide-react"

interface TokenData {
  marketCap: number
  volume24h: number
  holders: number
  liquidity: number
  liquidityUSD: number
}

interface TokenMetricsProps {
  tokenData: TokenData
  formatNumber: (num: number) => string
}

export const TokenMetrics: React.FC<TokenMetricsProps> = ({ tokenData, formatNumber }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Market Cap</span>
        </div>
        <div className="text-lg font-bold text-foreground">{formatNumber(tokenData.marketCap)}</div>
      </div>

      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-chart-5" />
          <span className="text-sm text-muted-foreground">Volume 24h</span>
        </div>
        <div className="text-lg font-bold text-foreground">{formatNumber(tokenData.volume24h)}</div>
      </div>

      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-success" />
          <span className="text-sm text-muted-foreground">Holders</span>
        </div>
        <div className="text-lg font-bold text-foreground">{tokenData.holders.toLocaleString()}</div>
      </div>

      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-warning" />
          <span className="text-sm text-muted-foreground">Liquidity</span>
        </div>
        <div className="text-lg font-bold text-foreground">{tokenData.liquidity.toFixed(2)} SOL</div>
        <div className="text-xs text-muted-foreground">{formatNumber(tokenData.liquidityUSD)}</div>
      </div>
    </div>
  )
}
