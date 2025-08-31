"use client"

import { useState, useEffect, useRef } from "react"
import type { Token, TokenData, ChartDataPoint } from "../types/token"

const SOL_PRICE = 185.5
const MAX_LIQUIDITY_USD = 1200
const MAX_HOLDERS = 32
const MAX_TIME_SECONDS = 1680 // 28 minutes exactly

export const useTokenSimulation = (token: Token | null, isFastCamera: boolean) => {
  const [tokenData, setTokenData] = useState<TokenData>({
    price: 0.000001,
    marketCap: 185.5,
    volume24h: 10,
    liquidity: 1,
    liquidityUSD: 185.5,
    priceChange: 0,
    holders: 0,
  })
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isRugPulled, setIsRugPulled] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!token || isRugPulled) return

    const intervalDuration = isFastCamera ? Math.floor(2000 / 56) : 2000

    intervalRef.current = setInterval(() => {
      setTimeElapsed((prev) => {
        const newTime = prev + 1

        setTokenData((prevData) => {
          const timeProgress = Math.min(newTime / MAX_TIME_SECONDS, 1)
          const targetLiquidityUSD = 185.5 + (MAX_LIQUIDITY_USD - 185.5) * timeProgress
          const targetHolders = Math.floor(MAX_HOLDERS * timeProgress)

          const isEarlyPhase = newTime <= 10
          let liquidityMultiplier: number
          let holdersChange: number

          if (isEarlyPhase) {
            const earlyProgress = newTime / 10
            const targetEarlyLiquidity = 185.5 + (300 - 185.5) * earlyProgress
            liquidityMultiplier = targetEarlyLiquidity / prevData.liquidityUSD
            holdersChange = newTime <= 3 ? 1 : Math.random() < 0.6 ? 1 : 0
          } else {
            const currentTarget = newTime >= MAX_TIME_SECONDS ? prevData.liquidityUSD : targetLiquidityUSD
            const liquidityGap = currentTarget - prevData.liquidityUSD

            const isWithdrawal = Math.random() < 0.04 && prevData.holders > 1
            const isNewHolder = Math.random() < 0.08 + Math.min(timeProgress, 1) * 0.05

            if (isWithdrawal) {
              liquidityMultiplier = 0.85 + Math.random() * 0.1
              holdersChange = -Math.floor(Math.random() * 2 + 1)
            } else if (
              isNewHolder &&
              (newTime < MAX_TIME_SECONDS ? prevData.holders < targetHolders : Math.random() < 0.1)
            ) {
              const growthNeeded = liquidityGap > 0 ? Math.min(0.15, liquidityGap / prevData.liquidityUSD) : 0.05
              liquidityMultiplier = 1 + growthNeeded + Math.random() * 0.08
              holdersChange = Math.floor(Math.random() * 2 + 1)
            } else {
              if (liquidityGap > 0 && newTime < MAX_TIME_SECONDS) {
                const progressionRate = Math.min(0.02, (liquidityGap / prevData.liquidityUSD) * 0.1)
                liquidityMultiplier = 1 + progressionRate + (Math.random() * 0.04 - 0.02)
              } else {
                liquidityMultiplier = 1 + (Math.random() * 0.04 - 0.02)
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
          const marketCapFluctuation = 0.92 + Math.random() * 0.16
          const newMarketCap = baseMarketCap * marketCapFluctuation

          const baseVolume = newLiquidityUSD * 0.12
          const activityMultiplier = 0.6 + Math.random() * 0.8
          const holderVolumeBoost = Math.max(1, Math.sqrt(newHolders / 2))
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

  const triggerRugPull = () => {
    setIsRugPulled(true)

    let step = 0
    const rugPullInterval = setInterval(() => {
      step++
      const progress = step / 15

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

  return {
    tokenData,
    chartData,
    timeElapsed,
    isRugPulled,
    triggerRugPull,
    setChartData,
  }
}
