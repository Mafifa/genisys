import { Navigation } from "../../Navigation"
import { AnimatedCounter } from "../../Animated-counter"
import { Chart } from "../../Chart"

const volumeData = [125000, 142000, 138000, 161000, 158000, 187000, 202000, 195000, 225000, 242000, 238000, 265000]
const liquidityData = [1800000, 1950000, 2120000, 2280000, 2450000, 2600000, 2750000, 2900000]
const tokenData = [1200, 1350, 1420, 1580, 1670, 1890, 2030, 2180, 2340, 2510, 2670, 2840]

export default function HomePage () {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
            Create SPL Tokens{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">In Seconds</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Deploy Solana tokens instantly with our advanced token creator. No coding required, just point, click, and
            launch.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105">
            Create Token Now →
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Total Tokens Created */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-muted-foreground">Tokens Created</h3>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <span className="text-primary text-2xl">⚡</span>
              </div>
            </div>
            <div className="text-5xl font-black text-foreground mb-4">
              <AnimatedCounter end={2840} duration={3000} suffix="+" />
            </div>
            <div className="h-20 mb-4">
              <Chart data={tokenData} color="oklch(0.6 0.2 200)" height={80} />
            </div>
            <p className="text-sm text-accent font-medium">+156 this week</p>
          </div>

          {/* Total Liquidity */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-muted-foreground">Total Liquidity</h3>
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                <span className="text-secondary text-2xl">💧</span>
              </div>
            </div>
            <div className="text-5xl font-black text-foreground mb-4">
              <AnimatedCounter end={2.9} decimals={1} prefix="$" suffix="M" duration={3500} />
            </div>
            <div className="h-20 mb-4">
              <Chart data={liquidityData} color="oklch(0.65 0.25 280)" height={80} />
            </div>
            <p className="text-sm text-secondary font-medium">+18.2% this month</p>
          </div>

          {/* 24h Volume */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-muted-foreground">24h Volume</h3>
              <div className="w-12 h-12 bg-chart-3/20 rounded-xl flex items-center justify-center">
                <span className="text-chart-3 text-2xl">📈</span>
              </div>
            </div>
            <div className="text-5xl font-black text-foreground mb-4">
              <AnimatedCounter end={265000} prefix="$" suffix="K" duration={2500} />
            </div>
            <div className="h-20 mb-4">
              <Chart data={volumeData} color="oklch(0.65 0.25 30)" height={80} />
            </div>
            <p className="text-sm text-chart-3 font-medium">+12.8% from yesterday</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-foreground mb-4">Why Choose Genisys?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional token creation tools with enterprise-grade security and seamless deployment on Genisys.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Lightning Fast Deploy</h3>
            <p className="text-muted-foreground">
              Create and deploy your SPL token in under 30 seconds. 200x faster for maximum speed.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-secondary/50 transition-all duration-300">
            <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-secondary text-3xl">💧</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Instant Liquidity</h3>
            <p className="text-muted-foreground">
              One-click liquidity pools on Raydium allow your token to start trading immediately after launch.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-accent/50 transition-all duration-300">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-accent text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Professional Charts</h3>
            <p className="text-muted-foreground">
              Automatic integration with TradingView and Birdeye for Jupiter, so your token appears where it matters.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-chart-3/50 transition-all duration-300">
            <div className="w-16 h-16 bg-chart-3/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-chart-3 text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Launch Toolkit</h3>
            <p className="text-muted-foreground">
              Everything you need for a successful launch: buy-bots, socials, and marketing tools in one place.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-destructive/50 transition-all duration-300">
            <div className="w-16 h-16 bg-destructive/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-destructive text-3xl">🔥</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Fire Features</h3>
            <p className="text-muted-foreground">
              Burn and freeze functionality, renounce ownership, and more to keep your holders engaged and secure.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Mass Distribution</h3>
            <p className="text-muted-foreground">
              Use our token multisender to distribute tokens to thousands of users with a single click.
            </p>
          </div>
        </div>

        <div className="text-center mb-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-border">
          <h2 className="text-4xl font-black text-foreground mb-4">Ready to Launch Your Token?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of projects that trust Genisys for their token creation needs.
          </p>
          <button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
            Start Creating Now
          </button>
        </div>

        {/* Recent Token Launches */}
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border">
          <h3 className="text-3xl font-bold text-foreground mb-8">Tokens Made by Our Customers</h3>
          <p className="text-muted-foreground mb-8">
            Real tokens created with Genisys. From moon shots to rug pulls, we've seen it all.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Diamond Hands",
                symbol: "DHND",
                price: 0.00012417,
                change: "+11.3%",
                volume: 1482,
                mcap: 10417,
                color: "text-accent",
              },
              {
                name: "Rocket Fuel",
                symbol: "FUEL",
                price: 0.00013011,
                change: "+10.2%",
                volume: 7159,
                mcap: 18911,
                color: "text-accent",
              },
              {
                name: "Degen Ape",
                symbol: "DAPE",
                price: 0.00005744,
                change: "-41.4%",
                volume: 1408,
                mcap: 5744,
                color: "text-destructive",
              },
              {
                name: "Galaxy Token",
                symbol: "GLXY",
                price: 0.00014189,
                change: "+24.3%",
                volume: 8185,
                mcap: 84189,
                color: "text-accent",
              },
              {
                name: "Shiba Sol",
                symbol: "SHIB",
                price: 0.0001268,
                change: "-26.7%",
                volume: 1009,
                mcap: 1680,
                color: "text-destructive",
              },
              {
                name: "Exit Scam",
                symbol: "EXIT",
                price: 0.000001,
                change: "-5.0%",
                volume: 0,
                mcap: 50,
                color: "text-destructive",
              },
            ].map((token, index) => (
              <div
                key={index}
                className="bg-muted/20 rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{token.name}</p>
                      <p className="text-sm text-muted-foreground">{token.symbol}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${token.color}`}>{token.change}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="text-sm font-medium text-foreground">
                      $<AnimatedCounter end={token.price} decimals={8} duration={2000 + index * 200} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Vol:</span>
                    <span className="text-sm font-medium text-foreground">
                      $<AnimatedCounter end={token.volume} duration={2200 + index * 200} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">MCap:</span>
                    <span className="text-sm font-medium text-foreground">
                      $<AnimatedCounter end={token.mcap} duration={2400 + index * 200} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
