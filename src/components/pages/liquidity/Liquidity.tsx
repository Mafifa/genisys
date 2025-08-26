import { useState } from "react"
import { Navigation } from "../../Navigation"

export default function LiquidityPage () {
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [baseTokenAmount, setBaseTokenAmount] = useState("")
  const [quoteTokenAmount, setQuoteTokenAmount] = useState("0.25")
  const [boostVisibility, setBoostVisibility] = useState(false)

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"initial" | "transaction">("initial")
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes
  const [transactionSignature, setTransactionSignature] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const calculateTotal = () => {
    const base = Number.parseFloat(quoteTokenAmount) || 0.25
    const boost = boostVisibility ? 0.15 : 0
    return Math.max(0.25, base + boost).toFixed(2)
  }

  const handleAddLiquidity = () => {
    if (!tokenAddress || !tokenName || !tokenSymbol || !baseTokenAmount) {
      setError("Please fill in all required fields")
      return
    }
    setShowPaymentModal(true)
    setTimeLeft(900) // Reset timer
  }

  const handleProceedToPayment = async () => {
    setIsProcessing(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPaymentStep("transaction")
    } catch (err) {
      setError("Internal server error. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-foreground mb-4">Add Liquidity</h1>
          <p className="text-lg text-slate-300">Provide liquidity for your token on DEX</p>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Token Address</label>
              <input
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Enter 44-character token address ending with '.odin'"
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Token Name</label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="Auto-filled"
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Token Symbol</label>
                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  placeholder="Auto-filled"
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Base Token amount (TOKEN)</label>
              <input
                type="number"
                value={baseTokenAmount}
                onChange={(e) => setBaseTokenAmount(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quote Token amount (SOL)</label>
              <input
                type="number"
                value={quoteTokenAmount}
                onChange={(e) => setQuoteTokenAmount(e.target.value)}
                step="0.1"
                min={calculateTotal()}
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-400 mt-1">Min: {calculateTotal()} SOL | Max: 100 SOL</p>
            </div>

            <div className="bg-muted/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Boost Token Visibility</h3>
                  <p className="text-sm text-muted-foreground">Increase your token's visibility on DEX platforms</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-500">+0.15 SOL</span>
                  <button
                    onClick={() => setBoostVisibility(!boostVisibility)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${boostVisibility ? "bg-blue-600" : "bg-gray-600"
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${boostVisibility ? "translate-x-6" : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-muted/10 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Liquidity Pool</span>
                  <span className="text-foreground">{quoteTokenAmount || "0.00"} SOL</span>
                </div>
                {boostVisibility && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Boost Visibility</span>
                    <span className="text-foreground">0.15 SOL</span>
                  </div>
                )}
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-foreground">Total</span>
                    <span className="text-blue-500 text-lg">{calculateTotal()} SOL</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddLiquidity}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Add Liquidity
            </button>
          </div>
        </div>
      </main>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            {/* Payment modal content similar to create token page */}
            {/* ... payment modal implementation ... */}
          </div>
        </div>
      )}
    </div>
  )
}
