"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react"

interface ChartDataPoint {
  time: number
  price: number
}

interface TokenData {
  price: number
  priceChange: number
}

interface Token {
  symbol: string
}

interface PriceChartProps {
  chartData: ChartDataPoint[]
  tokenData: TokenData
  token: Token
  isRugPulled: boolean
  formatPrice: (price: number) => string
}

export const PriceChart: React.FC<PriceChartProps> = ({ chartData, tokenData, token, isRugPulled, formatPrice }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  const openTradingView = () => {
    const tradingViewUrl = `https://www.tradingview.com/chart/?symbol=${token?.symbol}USDT`
    window.open(tradingViewUrl, "_blank")
  }

  return (
    <div className="lg:col-span-2 bg-background border border-border rounded-lg p-6">
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
            <div className="md:text-2xl font-bold text-foreground text-xs">{formatPrice(tokenData.price)}</div>
            <div className="text-sm text-muted-foreground">Price</div>
          </div>
        </div>
      </div>

      <div className="h-48 relative">
        <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  )
}
