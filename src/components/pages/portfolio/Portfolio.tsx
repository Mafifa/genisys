"use client"

import { useState, useEffect } from "react"
import { Navigation } from "../../Navigation"

interface StoredToken {
  name: string
  symbol: string
  totalSupply: string
  decimals: number
  description: string
  iconUrl?: string
  createdAt: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  step: "payment" | "transaction"
  totalCost: number
  onProceedToPayment: () => void
  onCheckTransaction: () => void
}

const PaymentModal = ({
  isOpen,
  onClose,
  step,
  totalCost,
  onProceedToPayment,
  onCheckTransaction,
}: PaymentModalProps) => {
  const [transactionSignature, setTransactionSignature] = useState("")
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  const resetTimer = () => {
    setTimeLeft(900)
  }

  if (!isOpen) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleProceedToPayment = async () => {
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (Math.random() < 0.2) {
        throw new Error("Internal server error. Please try again.")
      }

      onProceedToPayment()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckTransaction = async () => {
    if (!transactionSignature.trim()) {
      setError("Please enter a transaction signature")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (Math.random() < 0.3) {
        throw new Error("Failed to verify transaction. Please check your signature and try again.")
      }

      onCheckTransaction()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
            </div>
            <span className="text-white font-semibold">SecPay</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={resetTimer} className="text-slate-400 hover:text-white p-1 rounded" title="Reset Timer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded" title="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {step === "payment" ? (
          <>
            <div className="mb-6">
              <p className="text-slate-400 text-sm mb-2">Payment amount</p>
              <p className="text-white text-2xl font-bold">{totalCost.toFixed(6)} SOL</p>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-500 text-sm">Expiration time</span>
              <span className="text-green-500 text-sm font-mono">{formatTime(timeLeft)}</span>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleProceedToPayment}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors mb-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                "Proceed to the payment"
              )}
            </button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-slate-400 text-sm mb-2">Payment amount</p>
              <p className="text-white text-2xl font-bold">{totalCost.toFixed(6)} SOL</p>
            </div>

            <div className="mb-6">
              <label className="text-slate-400 text-sm mb-2 block">Paste your transaction signature</label>
              <input
                type="text"
                value={transactionSignature}
                onChange={(e) => setTransactionSignature(e.target.value)}
                placeholder="Transaction signature"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleCheckTransaction}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors mb-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                "Check Transaction"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function PortfolioPage () {
  const [showBanner, setShowBanner] = useState(true)
  const [portfolioTokens, setPortfolioTokens] = useState<StoredToken[]>([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"payment" | "transaction">("payment")
  const [selectedTokenForLiquidity, setSelectedTokenForLiquidity] = useState<StoredToken | null>(null)

  useEffect(() => {
    const loadTokensFromStorage = () => {
      try {
        const storedTokens = localStorage.getItem("createdTokens")
        if (storedTokens) {
          const tokens = JSON.parse(storedTokens)
          setPortfolioTokens(tokens)
        } else {
          // Default tokens if none exist
          setPortfolioTokens([
            {
              name: "CorgiCoin",
              symbol: "CORGI",
              totalSupply: "1,000,000,000",
              decimals: 9,
              description: "A fun meme token featuring the beloved Corgi breed",
              iconUrl: "/corgi-dog-cryptocurrency.png",
              createdAt: new Date().toISOString(),
            },
            {
              name: "SquidBucks",
              symbol: "SQBK",
              totalSupply: "1,000,000,000",
              decimals: 9,
              description: "Dive deep into the ocean of DeFi with SquidBucks",
              iconUrl: "/squid-ocean-cryptocurrency.png",
              createdAt: new Date().toISOString(),
            },
          ])
        }
      } catch (error) {
        console.error("Error loading tokens from storage:", error)
      }
    }

    loadTokensFromStorage()
  }, [])

  const handleAddLiquidity = (token: StoredToken) => {
    setSelectedTokenForLiquidity(token)
    setShowPaymentModal(true)
    setPaymentStep("payment")
  }

  const handleProceedToPayment = () => {
    setPaymentStep("transaction")
  }

  const handleCheckTransaction = () => {
    console.log("Liquidity added successfully!")
    setShowPaymentModal(false)
    setSelectedTokenForLiquidity(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {showBanner && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 text-center relative">
          <p className="text-sm font-medium">
            ⚡ Limited Time Offer: Token creation is now FREE! Don't miss out on launching your project.
          </p>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-200 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-foreground mb-4">Portfolio</h1>
          <p className="text-lg text-slate-300">Track your token holdings and performance</p>
        </div>

        <div className="space-y-6">
          {portfolioTokens.map((token, index) => (
            <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center overflow-hidden">
                    {token.iconUrl ? (
                      <img
                        src={token.iconUrl || "/placeholder.svg"}
                        alt={`${token.name} icon`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">{token.symbol.slice(0, 2)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{token.name}</h3>
                    <p className="text-slate-400">{token.symbol}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-slate-400 text-sm mb-2">No liquidity added yet.</p>
                  <button
                    onClick={() => handleAddLiquidity(token)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    Add Liquidity
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400 text-sm">🪙</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Supply</p>
                    <p className="font-medium text-foreground">{token.totalSupply}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400 text-sm">•</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Decimals</p>
                    <p className="font-medium text-foreground">{token.decimals}</p>
                  </div>
                </div>
              </div>

              {token.description && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-300">{token.description}</p>
                </div>
              )}
            </div>
          ))}

          {portfolioTokens.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🪙</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No Tokens Yet</h3>
              <p className="text-slate-400 mb-6">Create your first token to see it here</p>
              <a
                href="/create"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                Create Token
              </a>
            </div>
          )}
        </div>
      </main>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false)
          setSelectedTokenForLiquidity(null)
        }}
        step={paymentStep}
        totalCost={0.4} // Base liquidity cost
        onProceedToPayment={handleProceedToPayment}
        onCheckTransaction={handleCheckTransaction}
      />
    </div>
  )
}
