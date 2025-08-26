"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navigation } from "../../Navigation"
import { AnimatedCounter } from "../../Animated-counter"
import { X } from "lucide-react"

const generateRandomData = (baseValue: number, variance: number) => {
  return baseValue + (Math.random() - 0.5) * variance
}

const HomePage: React.FC = () => {
  const [bannerVisible, setBannerVisible] = useState(true)
  const [tokensCreated, setTokensCreated] = useState(2840)
  const [totalLiquidity, setTotalLiquidity] = useState(2.9)
  const [volume24h, setVolume24h] = useState(265)
  const [isClient, setIsClient] = useState(false)

  const [customerTokens, setCustomerTokens] = useState([
    {
      name: "Diamond Hands",
      symbol: "DHND",
      price: 0.00018436,
      change: "+1.9%",
      volume: 2282,
      mcap: 18436,
      color: "text-success",
      volumeBar: 75,
      trend: "up",
    },
    {
      name: "Rocket Fuel",
      symbol: "FUEL",
      price: 0.00025281,
      change: "-5.8%",
      volume: 3788,
      mcap: 32581,
      color: "text-destructive",
      volumeBar: 45,
      trend: "down",
    },
    {
      name: "Degen Ape",
      symbol: "DAPE",
      price: 0.00009322,
      change: "+1.2%",
      volume: 1435,
      mcap: 9322,
      color: "text-success",
      volumeBar: 65,
      trend: "up",
    },
    {
      name: "Galaxy Token",
      symbol: "GLXY",
      price: 0.00002566,
      change: "-2.7%",
      volume: 6913,
      mcap: 62566,
      color: "text-destructive",
      volumeBar: 35,
      trend: "down",
    },
    {
      name: "Shiba Sol",
      symbol: "SHIB",
      price: 0.0002233,
      change: "-2.8%",
      volume: 921,
      mcap: 2233,
      color: "text-destructive",
      volumeBar: 25,
      trend: "down",
    },
    {
      name: "Exit Scam",
      symbol: "EXIT",
      price: 0.000108,
      change: "-5.0%",
      volume: 5,
      mcap: 58,
      color: "text-destructive",
      volumeBar: 5,
      trend: "down",
    },
  ])

  useEffect(() => {
    setIsClient(true)

    // Load saved values from localStorage if available
    const savedTokens = localStorage.getItem("genisys-tokens-created")
    const savedVolume = localStorage.getItem("genisys-volume-24h")

    if (savedTokens) {
      setTokensCreated(Number.parseInt(savedTokens))
    }
    if (savedVolume) {
      setVolume24h(Number.parseFloat(savedVolume))
    }
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      // Tokens created - always increases, never decreases
      setTokensCreated((prev) => {
        const newValue = prev + Math.floor(Math.random() * 3) + 1 // +1 to +3 tokens
        localStorage.setItem("genisys-tokens-created", newValue.toString())
        return newValue
      })

      // Total liquidity - can fluctuate
      setTotalLiquidity((prev) => Math.max(2.0, Number(generateRandomData(prev, 0.05).toFixed(1))))

      // 24h volume - slower changes, can go up/down but never to 0
      setVolume24h((prev) => {
        const newValue = Math.max(200, Number(generateRandomData(prev, 15).toFixed(1)))
        localStorage.setItem("genisys-volume-24h", newValue.toString())
        return newValue
      })

      // Update customer tokens with realistic market movements
      setCustomerTokens((prev) =>
        prev.map((token) => {
          const priceChange = generateRandomData(0, token.price * 0.02) // 2% max change
          const newPrice = Math.max(0.000001, token.price + priceChange)
          const volumeChange = generateRandomData(0, token.volume * 0.05) // 5% max change
          const newVolume = Math.max(0, Math.floor(token.volume + volumeChange))
          const mcapChange = generateRandomData(0, token.mcap * 0.03) // 3% max change
          const newMcap = Math.max(50, Math.floor(token.mcap + mcapChange))

          const changePercent = ((newPrice - token.price) / token.price) * 100
          const isPositive = changePercent > 0

          return {
            ...token,
            price: newPrice,
            volume: newVolume,
            mcap: newMcap,
            change: `${isPositive ? "+" : ""}${changePercent.toFixed(1)}%`,
            color: isPositive ? "text-success" : "text-destructive",
            trend: isPositive ? "up" : "down",
            volumeBar: Math.max(5, Math.min(100, Math.floor(generateRandomData(token.volumeBar, 5)))),
          }
        }),
      )
    }, 8000) // Slower updates for more realistic feel

    return () => clearInterval(interval)
  }, [isClient])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {bannerVisible && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 text-center text-sm relative">
          <span>⚡ Limited Time Offer: Token creation is now FREE! Don't miss out on launching your project.</span>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tight">
                Create SPL Tokens <span className="text-gradient">In Seconds</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Deploy Solana tokens instantly with our advanced AI-powered token creator. No coding required, just
                point, click, and launch.
              </p>
            </div>

            <a className="pt-4" href="/create">
              <button className="gradient-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25 cursor-pointer">
                Create Token Now →
              </button>
            </a>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer">
                  <AnimatedCounter key={tokensCreated} end={tokensCreated} duration={3000} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">Tokens Created</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer">
                  <AnimatedCounter
                    key={totalLiquidity}
                    end={totalLiquidity}
                    decimals={1}
                    prefix="$"
                    suffix="M"
                    duration={3000}
                  />
                </div>
                <p className="text-sm text-muted-foreground font-medium">Total Liquidity</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent cursor-pointer">
                  <AnimatedCounter key={volume24h} end={volume24h} decimals={1} prefix="$" suffix="K" duration={3000} />
                </div>
                <p className="text-sm text-muted-foreground font-medium">24H Volume</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="glass-effect rounded-2xl p-8 max-w-md w-full shadow-xl hover:shadow-primary/10 transition-all duration-500">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 gradient-accent rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-accent-foreground text-2xl">🚀</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground text-lg">MOON ROCKET</p>
                  <p className="text-muted-foreground">$MOON</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground text-lg">100,000,000</p>
                  <p className="text-xs text-muted-foreground">To the moon!</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <p className="text-sm text-muted-foreground text-center font-medium">Creating token...</p>
                <div className="w-full bg-muted/60 rounded-full h-3">
                  <div className="gradient-primary h-3 rounded-full w-3/4 animate-pulse shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Genisys Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">Why Choose Genisys?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional token creation tools with enterprise-grade security and seamless deployment on Solana.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast Deploy",
                desc: "Create and deploy your SPL token in under 30 seconds. 200x faster for maximum speed.",
              },
              {
                icon: "💧",
                title: "Instant Liquidity",
                desc: "One-click liquidity pools on Raydium allow your token to start trading immediately after launch.",
              },
              {
                icon: "📊",
                title: "Professional Charts",
                desc: "Automatic integration with DexScreener and Birdeye for Jupiter, so your token appears where it matters.",
              },
              {
                icon: "🚀",
                title: "Launch Toolkit",
                desc: "Everything you need for a successful launch: buy-bots, socials, and marketing tools in one place.",
              },
              {
                icon: "🔥",
                title: "Fire Features",
                desc: "Burn and freeze functionality, renounce ownership, and more to keep your holders engaged and secure.",
              },
              {
                icon: "👥",
                title: "Mass Distribution",
                desc: "Use our token multisender to distribute tokens to thousands of users with a single click.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Tokens Section */}
        <div className="glass-effect rounded-3xl p-10 mb-32 shadow-xl">
          <h3 className="text-4xl font-black text-foreground mb-6 text-center">Tokens Made by Our Customers</h3>
          <p className="text-muted-foreground mb-12 text-center max-w-2xl mx-auto text-lg">
            Real tokens created with Genisys. From moon shots to rug pulls, we've seen it all.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customerTokens.map((token, index) => (
              <div
                key={index}
                className="bg-muted/30 rounded-2xl p-8 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <span className="text-primary-foreground font-bold text-lg">{token.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-lg">{token.name}</p>
                      <p className="text-sm text-muted-foreground font-semibold">{token.symbol}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-black ${token.color}`}>{token.change}</div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground font-semibold">Volume</span>
                    <span className={`text-sm font-bold ${token.trend === "up" ? "text-success" : "text-destructive"}`}>
                      {token.trend === "up" ? "↗" : "↘"}
                    </span>
                  </div>
                  <div className="w-full bg-muted/80 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 shadow-sm ${token.trend === "up" ? "gradient-success" : "gradient-warning"
                        }`}
                      style={{ width: `${token.volumeBar}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3 text-base">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">Vol:</span>
                    <span className="font-bold text-foreground">
                      $
                      <AnimatedCounter
                        key={`${token.symbol}-vol-${token.volume}`}
                        end={token.volume}
                        duration={2000}
                      />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">MCap:</span>
                    <span className="font-bold text-foreground">
                      $
                      <AnimatedCounter
                        key={`${token.symbol}-mcap-${token.mcap}`}
                        end={token.mcap}
                        duration={2000}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <section className="gradient-primary backdrop-blur-sm rounded-3xl px-10 py-20 text-center border border-primary/20 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-primary-foreground mb-8">Ready to Launch Your Token?</h2>
          <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of projects that trust Genisys for their token creation needs.
          </p>
          <a href="/create" className="rounded-2xl gradient-accent px-16 py-6 text-xl font-bold text-accent-foreground transition-all duration-300 hover:shadow-2xl hover:shadow-accent/30 transform hover:scale-105 border border-accent/30">
            Get Started Now →
          </a>
        </section>
      </main>
    </div>
  )
}

export default HomePage
