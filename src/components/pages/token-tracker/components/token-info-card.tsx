import type React from "react"

interface Token {
  name: string
  symbol: string
  totalSupply: string
  decimals: number
  description: string
  iconUrl?: string
  createdAt: string
}

interface TokenInfoCardProps {
  token: Token
}

export const TokenInfoCard: React.FC<TokenInfoCardProps> = ({ token }) => {
  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-4">
        {token.iconUrl ? (
          <img
            src={token.iconUrl || "/placeholder.svg"}
            alt={token.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 gradient-success rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-success-foreground">{token.symbol.charAt(0)}</span>
          </div>
        )}
        <div>
          <h3 className="font-bold text-foreground">{token.name}</h3>
          <p className="text-muted-foreground text-sm">{token.symbol}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Supply</span>
          <span className="text-foreground">{Number.parseFloat(token.totalSupply).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Decimals</span>
          <span className="text-foreground">{token.decimals}</span>
        </div>
        {token.description && (
          <div className="pt-2">
            <span className="text-muted-foreground text-xs">Description</span>
            <p className="text-foreground text-sm mt-1">{token.description}</p>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created</span>
          <span className="text-foreground text-xs">{new Date(token.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
