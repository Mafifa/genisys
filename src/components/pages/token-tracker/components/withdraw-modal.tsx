"use client"

import type React from "react"
import { X } from "lucide-react"

interface TokenData {
  liquidity: number
}

interface WithdrawModalProps {
  showWithdrawModal: boolean
  setShowWithdrawModal: (show: boolean) => void
  walletAddress: string
  setWalletAddress: (address: string) => void
  tokenData: TokenData
  handleWithdraw: () => void
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  showWithdrawModal,
  setShowWithdrawModal,
  walletAddress,
  setWalletAddress,
  tokenData,
  handleWithdraw,
}) => {
  if (!showWithdrawModal) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-effect rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Withdraw Liquidity</h3>
          <button onClick={() => setShowWithdrawModal(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm text-primary-foreground">
            You are about to withdraw <strong>{tokenData.liquidity.toFixed(2)} SOL</strong>
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-foreground">Paste Solana Address</label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your Solana wallet address"
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <button
          onClick={handleWithdraw}
          disabled={!walletAddress.trim()}
          className={`w-full py-2 px-4 cursor-pointer rounded-lg font-bold transition-colors ${walletAddress.trim()
            ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
        >
          Withdraw
        </button>
      </div>
    </div>
  )
}
