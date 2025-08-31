import type React from "react"
import { useState, useEffect } from "react"
import { TokenInfoCard } from "./components/token-info-card"
import { PriceChart } from "./components/price-chart"
import { TokenMetrics } from "./components/token-metrics"
import { WithdrawModal } from "./components/withdraw-modal"
import { DevControls } from "./components/dev-controls"
import { useTokenSimulation } from "./use-token-simulation"
import OrderBook from "./components/order-book"
import type { Token } from "./token"

const TokenTracker: React.FC = () => {
  const [token, setToken] = useState<Token | null>(null)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isFastCamera, setIsFastCamera] = useState(false)

  const { tokenData, chartData, timeElapsed, isRugPulled, triggerRugPull, setChartData } = useTokenSimulation(
    token,
    isFastCamera,
  )

  useEffect(() => {
    const createdTokens = localStorage.getItem("createdTokens")
    if (createdTokens) {
      try {
        const tokens = JSON.parse(createdTokens)
        if (tokens.length > 0) {
          const lastToken = tokens[tokens.length - 1]
          setToken(lastToken)

          const initialData = [{ time: Date.now(), price: 0.000001 }]
          setChartData(initialData)
        }
      } catch (error) {
        console.error("Error loading tokens:", error)
      }
    }

    const savedWalletAddress = localStorage.getItem("userWalletAddress")
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress)
    }
  }, [setChartData])

  const handleWithdraw = () => {
    if (!walletAddress.trim()) return
    setShowWithdrawModal(false)
    triggerRugPull()
  }

  const formatNumber = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) return "$0.00"
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatPrice = (price: number): string => {
    if (isNaN(price) || !isFinite(price) || price < 0.000001) return "$0.000001"
    return `$${price.toFixed(8)}`
  }

  const toggleFastCamera = () => {
    setIsFastCamera(!isFastCamera)
  }

  if (!token) {
    return (
      <div className="glass-effect rounded-lg p-6 text-center">
        <p className="text-muted-foreground">No tokens found. Create a token first to track its performance.</p>
      </div>
    )
  }

  const currentPrice = tokenData?.price || 0.000001

  return (
    <div className="bg-card rounded-lg p-6 text-card-foreground">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-foreground">Track your token holdings and performance</h2>
      </div>

      <DevControls
        isFastCamera={isFastCamera}
        toggleFastCamera={toggleFastCamera}
        isRugPulled={isRugPulled}
        timeElapsed={timeElapsed}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="lg:col-span-1 pb-5">
          <TokenInfoCard token={token} />
        </div>

        <div className="lg:col-span-1 xl:col-span-2">
          <PriceChart
            chartData={chartData}
            tokenData={tokenData}
            token={token}
            isRugPulled={isRugPulled}
            formatPrice={formatPrice}
          />
        </div>

      </div>
      <div className="grid lg:grid-cols-2 lg:col-span-2 xl:col-span-1 lg:space-x-20">
        <OrderBook currentPrice={currentPrice} />
        <div>
          <TokenMetrics tokenData={tokenData} formatNumber={formatNumber} />
          <div className="mt-6">
            <button
              onClick={() => setShowWithdrawModal(true)}
              disabled={isRugPulled}
              className={`w-full py-3 cursor-pointer px-4 rounded-lg font-bold transition-colors ${isRugPulled
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                }`}
            >
              {isRugPulled ? "Liquidity Withdrawn" : "Withdraw Liquidity"}
            </button>
          </div>
        </div>

      </div>



      <WithdrawModal
        showWithdrawModal={showWithdrawModal}
        setShowWithdrawModal={setShowWithdrawModal}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        tokenData={tokenData}
        handleWithdraw={handleWithdraw}
      />
    </div>
  )
}

export default TokenTracker
