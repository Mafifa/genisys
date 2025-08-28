import type React from "react"
import { useState, useEffect, useRef } from "react"
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, X, ExternalLink, FastForward, Play } from "lucide-react"

interface Token {
  name: string
  symbol: string
  totalSupply: string
  decimals: number
  description: string
  iconUrl?: string
  createdAt: string
}

interface TokenData {
  price: number
  marketCap: number
  volume24h: number
  liquidity: number
  liquidityUSD: number // Added USD liquidity tracking
  priceChange: number
  holders: number
}

interface ChartDataPoint {
  time: number
  price: number
}

const TokenTracker: React.FC = () => {
  const [token, setToken] = useState<Token | null>(null)
  const [tokenData, setTokenData] = useState<TokenData>({
    price: 0.000001,
    marketCap: 185.5, // Start with realistic market cap based on 1 SOL
    volume24h: 10, // Start with minimal volume
    liquidity: 1, // Start with 1 SOL
    liquidityUSD: 185.5, // 1 SOL = $185.5
    priceChange: 0,
    holders: 0, // Start with 0 holders
  })
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isRugPulled, setIsRugPulled] = useState(false) // Track rug pull state
  const [isFastCamera, setIsFastCamera] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const SOL_PRICE = 185.5
  const MAX_LIQUIDITY_USD = 1200
  const MAX_HOLDERS = 32
  const MAX_TIME_SECONDS = 1680 // 28 minutes exactly

  useEffect(() => {
    const createdTokens = localStorage.getItem("createdTokens")
    if (createdTokens) {
      try {
        const tokens = JSON.parse(createdTokens)
        if (tokens.length > 0) {
          const lastToken = tokens[tokens.length - 1]
          setToken(lastToken)

          const initialData: ChartDataPoint[] = [
            {
              time: Date.now(),
              price: 0.000001,
            },
          ]
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
  }, [])

  useEffect(() => {
    if (!token || isRugPulled) return

    const intervalDuration = isFastCamera ? Math.floor(2000 / 56) : 2000 // ~36ms vs 2000ms

    intervalRef.current = setInterval(() => {
      setTimeElapsed((prev) => {
        const newTime = prev + 1

        setTokenData((prevData) => {
          const timeProgress = Math.min(newTime / MAX_TIME_SECONDS, 1) // Cap at 1 to prevent overflow
          const targetLiquidityUSD = 185.5 + (MAX_LIQUIDITY_USD - 185.5) * timeProgress
          const targetHolders = Math.floor(MAX_HOLDERS * timeProgress)

          const isEarlyPhase = newTime <= 10
          let liquidityMultiplier: number
          let holdersChange: number

          if (isEarlyPhase) {
            const earlyProgress = newTime / 10
            const targetEarlyLiquidity = 185.5 + (300 - 185.5) * earlyProgress // Reach ~$300 in first 10 seconds
            liquidityMultiplier = targetEarlyLiquidity / prevData.liquidityUSD
            holdersChange = newTime <= 3 ? 1 : Math.random() < 0.6 ? 1 : 0 // First holders in first 3 seconds
          } else {
            const currentTarget = newTime >= MAX_TIME_SECONDS ? prevData.liquidityUSD : targetLiquidityUSD
            const liquidityGap = currentTarget - prevData.liquidityUSD

            const isWithdrawal = Math.random() < 0.04 && prevData.holders > 1 // 4% chance
            const isNewHolder = Math.random() < 0.08 + Math.min(timeProgress, 1) * 0.05 // Increasing chance over time

            if (isWithdrawal) {
              liquidityMultiplier = 0.85 + Math.random() * 0.1 // -15% to -5%
              holdersChange = -Math.floor(Math.random() * 2 + 1) // -1 to -2 holders
            } else if (
              isNewHolder &&
              (newTime < MAX_TIME_SECONDS ? prevData.holders < targetHolders : Math.random() < 0.1)
            ) {
              const growthNeeded = liquidityGap > 0 ? Math.min(0.15, liquidityGap / prevData.liquidityUSD) : 0.05
              liquidityMultiplier = 1 + growthNeeded + Math.random() * 0.08 // Natural growth + randomness
              holdersChange = Math.floor(Math.random() * 2 + 1) // +1 to +2 holders
            } else {
              if (liquidityGap > 0 && newTime < MAX_TIME_SECONDS) {
                const progressionRate = Math.min(0.02, (liquidityGap / prevData.liquidityUSD) * 0.1)
                liquidityMultiplier = 1 + progressionRate + (Math.random() * 0.04 - 0.02) // Small fluctuations
              } else {
                liquidityMultiplier = 1 + (Math.random() * 0.04 - 0.02) // Just fluctuations
              }
              holdersChange = Math.random() < 0.1 ? (Math.random() < 0.7 ? 1 : -1) : 0
            }
          }

          const maxLiquidityForTime = newTime >= MAX_TIME_SECONDS ? prevData.liquidityUSD * 1.1 : MAX_LIQUIDITY_USD
          const newLiquidityUSD = Math.min(
            maxLiquidityForTime,
            Math.max(185.5, prevData.liquidityUSD * liquidityMultiplier),
          )
          const newLiquidity = newLiquidityUSD / SOL_PRICE

          const maxHoldersForTime = newTime >= MAX_TIME_SECONDS ? prevData.holders + 2 : MAX_HOLDERS
          const newHolders = Math.min(maxHoldersForTime, Math.max(0, prevData.holders + holdersChange))

          const holdersFactor = newHolders > 0 ? Math.pow(newHolders / Math.max(1, prevData.holders || 1), 0.3) : 1
          const liquidityFactor = Math.pow(newLiquidityUSD / Math.max(185.5, prevData.liquidityUSD), 0.7)
          const combinedFactor = holdersFactor * liquidityFactor
          const newPrice = Math.max(0.000001, prevData.price * combinedFactor)

          const totalSupplyNum = Number.parseFloat(token.totalSupply)
          const circulatingSupply = totalSupplyNum * 0.8
          const baseMarketCap = (newPrice * circulatingSupply) / Math.pow(10, token.decimals)
          const marketCapFluctuation = 0.92 + Math.random() * 0.16 // ±8% fluctuation for realism
          const newMarketCap = baseMarketCap * marketCapFluctuation

          const baseVolume = newLiquidityUSD * 0.12 // Base volume is 12% of liquidity
          const activityMultiplier = 0.6 + Math.random() * 0.8 // 0.6x to 1.4x
          const holderVolumeBoost = Math.max(1, Math.sqrt(newHolders / 2)) // Square root scaling
          const newVolume24h = baseVolume * activityMultiplier * holderVolumeBoost

          const priceChange = ((newPrice - 0.000001) / 0.000001) * 100

          return {
            price: newPrice,
            marketCap: newMarketCap,
            volume24h: newVolume24h,
            liquidity: newLiquidity,
            liquidityUSD: newLiquidityUSD,
            priceChange,
            holders: newHolders,
          }
        })

        setChartData((prevChart) => {
          const newPoint: ChartDataPoint = {
            time: Date.now(),
            price: tokenData.price,
          }
          const updatedChart = [...prevChart, newPoint]
          return updatedChart.slice(-100)
        })

        return newTime
      })
    }, intervalDuration)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [token, tokenData.price, isRugPulled, isFastCamera])

  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)

    if (chartData.length < 2) return

    const prices = chartData.map((d) => d.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice || 1

    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    if (isRugPulled) {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.3)")
      gradient.addColorStop(1, "rgba(239, 68, 68, 0.05)")
      ctx.strokeStyle = "#ef4444"
    } else {
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.3)")
      gradient.addColorStop(1, "rgba(16, 185, 129, 0.05)")
      ctx.strokeStyle = "#10b981"
    }

    ctx.beginPath()
    ctx.lineWidth = 2

    chartData.forEach((point, index) => {
      const x = (index / (chartData.length - 1)) * width
      const y = height - ((point.price - minPrice) / priceRange) * height

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
  }, [chartData, isRugPulled])

  const triggerRugPull = () => {
    setIsRugPulled(true)

    let step = 0
    const rugPullInterval = setInterval(() => {
      step++
      const progress = step / 15 // 15 steps total

      setTokenData((prevData) => {
        const remainingLiquidity = Math.max(0.01, prevData.liquidityUSD * (1 - progress * 0.995))
        const remainingHolders = Math.max(0, Math.floor(prevData.holders * (1 - progress * 0.95)))
        const crashPrice = Math.max(0.000001, prevData.price * (1 - progress * 0.98))

        return {
          price: crashPrice,
          marketCap: Math.max(0.01, prevData.marketCap * (1 - progress * 0.99)),
          volume24h: Math.max(0.01, prevData.volume24h * (1 - progress * 0.95)),
          liquidity: remainingLiquidity / SOL_PRICE,
          liquidityUSD: remainingLiquidity,
          priceChange: -95 - progress * 4.9,
          holders: remainingHolders,
        }
      })

      setChartData((prevChart) => {
        const crashPrice = Math.max(0.000001, tokenData.price * (1 - progress * 0.98))
        return [...prevChart, { time: Date.now(), price: crashPrice }]
      })

      if (step >= 15) {
        clearInterval(rugPullInterval)
      }
    }, 1000)
  }

  const handleWithdraw = () => {
    if (!walletAddress.trim()) return
    setShowWithdrawModal(false)
    triggerRugPull()
  }

  const openTradingView = () => {
    const tradingViewUrl = `https://www.tradingview.com/chart/?symbol=${token?.symbol}USDT`
    window.open(tradingViewUrl, "_blank")
  }

  const formatNumber = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) return "$0.00" // Handle NaN/Infinity
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatPrice = (price: number): string => {
    if (isNaN(price) || !isFinite(price) || price < 0.000001) return "$0.000001" // Handle NaN/Infinity
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

  return (
    <div className="bg-card rounded-lg p-6 text-card-foreground">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-foreground">Track your token holdings and performance</h2>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mb-4 flex justify-center">
          <button
            onClick={toggleFastCamera}
            disabled={isRugPulled}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isFastCamera ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
              } ${isRugPulled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isFastCamera ? (
              <>
                <Play className="w-4 h-4" />
                Normal Speed
              </>
            ) : (
              <>
                <FastForward className="w-4 h-4" />
                Fast Camera (56x)
              </>
            )}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        <div className="lg:col-span-2 bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {tokenData.priceChange >= 0 ? (
                <TrendingUp className="w-5 h-5 text-success" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
              <span className={`font-bold ${tokenData.priceChange >= 0 ? "text-success" : "text-destructive"}`}>
                {tokenData.priceChange >= 0 ? "+" : ""}
                {tokenData.priceChange.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openTradingView}
                className="flex items-center gap-1 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary text-sm rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                TradingView
              </button>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{formatPrice(tokenData.price)}</div>
                <div className="text-sm text-muted-foreground">Price</div>
              </div>
            </div>
          </div>

          <div className="h-48 relative">
            <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>

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

      <div className="mt-6">
        <button
          onClick={() => setShowWithdrawModal(true)}
          disabled={isRugPulled} // Disable after rug pull
          className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${isRugPulled
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            }`}
        >
          {isRugPulled ? "Liquidity Withdrawn" : "Withdraw Liquidity"}
        </button>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <span>
            Time elapsed: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")} / 28:00
          </span>
          {isFastCamera && (
            <span className="ml-4 px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
              🚀 FAST CAMERA (56x)
            </span>
          )}
        </div>
      )}

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-effect rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Withdraw Liquidity</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
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
              className={`w-full py-2 px-4 rounded-lg font-bold transition-colors ${walletAddress.trim()
                ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
            >
              Withdraw
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TokenTracker
