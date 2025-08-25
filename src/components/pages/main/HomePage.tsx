import type React from "react"
import { Navigation } from "../../Navigation"
import { AnimatedCounter } from "../../Animated-counter"
import { Chart } from "../../Chart"

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-6 py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center">
              <h1 className="font-montserrat text-5xl font-bold leading-tight text-white lg:text-6xl">
                Create SPL Tokens{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  In Seconds
                </span>
              </h1>
              <p className="mt-6 text-xl text-slate-300 font-open-sans">
                Deploy Solana tokens instantly with our advanced AI-powered token creator. No coding required, just
                point, click, and launch.
              </p>
              <button className="mt-8 w-fit rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-montserrat font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/25">
                Create Token Now →
              </button>
            </div>

            {/* Token Creation Preview */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      🚀
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold text-white">GENISYS TOKEN</div>
                      <div className="text-sm text-slate-400">$GNSY</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="font-montserrat font-bold text-white">
                        <AnimatedCounter end={1000000} duration={2000} />
                      </div>
                      <div className="text-sm text-slate-400">Supply</div>
                    </div>
                  </div>
                  <div className="text-center text-slate-400 text-sm">Creating token...</div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-800/50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="font-montserrat text-4xl font-bold text-white lg:text-5xl">
                <AnimatedCounter end={2840} duration={2500} />+
              </div>
              <div className="mt-2 font-open-sans text-slate-400">Tokens Created</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl font-bold text-white lg:text-5xl">
                $<AnimatedCounter end={2.9} duration={2500} decimals={1} />M
              </div>
              <div className="mt-2 font-open-sans text-slate-400">Total Liquidity</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl font-bold text-white lg:text-5xl">
                $<AnimatedCounter end={265} duration={2500} />K
              </div>
              <div className="mt-2 font-open-sans text-slate-400">24H Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-montserrat text-3xl font-bold text-white">Platform Analytics</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700">
              <h3 className="mb-4 font-montserrat text-xl font-semibold text-white">Token Creation Volume</h3>
              <Chart
                data={[
                  { name: "Jan", value: 120 },
                  { name: "Feb", value: 190 },
                  { name: "Mar", value: 280 },
                  { name: "Apr", value: 350 },
                  { name: "May", value: 420 },
                  { name: "Jun", value: 580 },
                ]}
                color="#3B82F6"
              />
            </div>
            <div className="rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700">
              <h3 className="mb-4 font-montserrat text-xl font-semibold text-white">Liquidity Growth</h3>
              <Chart
                data={[
                  { name: "Jan", value: 0.5 },
                  { name: "Feb", value: 0.8 },
                  { name: "Mar", value: 1.2 },
                  { name: "Apr", value: 1.8 },
                  { name: "May", value: 2.3 },
                  { name: "Jun", value: 2.9 },
                ]}
                color="#8B5CF6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Genisys Section */}
      <section className="bg-slate-800/30 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-white mb-4">Why Choose Genisys?</h2>
            <p className="font-open-sans text-slate-400 max-w-2xl mx-auto">
              Professional token creation tools with enterprise-grade security and seamless deployment on Genisys.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">⚡</div>
              <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Lightning Fast Deploy</h3>
              <p className="font-open-sans text-slate-400">
                Create and deploy your SPL token in under 30 seconds. 200x faster for maximum speed.
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">💧</div>
              <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Instant Liquidity</h3>
              <p className="font-open-sans text-slate-400">
                One-click liquidity pools on Raydium allow your token to start trading immediately after launch.
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700 hover:border-green-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">📊</div>
              <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Professional Charts</h3>
              <p className="font-open-sans text-slate-400">
                Automatic integration with DexScreener and Birdeye for Jupiter, so your token appears where it matters.
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700 hover:border-orange-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">🚀</div>
              <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Launch Toolkit</h3>
              <p className="font-open-sans text-slate-400">
                Everything you need for a successful launch: buy-bots, socials, and marketing tools in one place.
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700 hover:border-red-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">🔥</div>
              <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Fire Features</h3>
              <p className="font-open-sans text-slate-400">
                Burn and freeze functionality, renounce ownership, and more to keep your holders engaged and secure.
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm border border-slate-700 hover:border-pink-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">👥</div>
              <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Mass Distribution</h3>
              <p className="font-open-sans text-slate-400">
                Use our token multisender to distribute tokens to thousands of users with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tokens Made by Customers */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-white mb-4">Tokens Made by Our Customers</h2>
            <p className="font-open-sans text-slate-400">
              Real tokens created with Genisys. From moon shots to rug pulls, we've seen it all.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                symbol: "HQ",
                name: "Diamond Hands",
                ticker: "$HODL",
                price: 0.00016417,
                change: 11.3,
                vol: 1482,
                mcap: 16417,
                positive: true,
              },
              {
                symbol: "RL",
                name: "Rocket Fuel",
                ticker: "$BLAST",
                price: 0.00038011,
                change: 10.2,
                vol: 7159,
                mcap: 38011,
                positive: true,
              },
              {
                symbol: "AP",
                name: "Degen Ape",
                ticker: "$APE",
                price: 0.00005744,
                change: -41.4,
                vol: 1408,
                mcap: 5744,
                positive: false,
              },
              {
                symbol: "GA",
                name: "Galaxy Token",
                ticker: "$GALAXY",
                price: 0.00014189,
                change: 24.3,
                vol: 8185,
                mcap: 84189,
                positive: true,
              },
              {
                symbol: "SH",
                name: "Shiba Sol",
                ticker: "$SHIB",
                price: 0.0000168,
                change: -26.7,
                vol: 1009,
                mcap: 1680,
                positive: false,
              },
              {
                symbol: "RE",
                name: "Exit Scam",
                ticker: "$REKT",
                price: 0.000001,
                change: -5.0,
                vol: 0,
                mcap: 50,
                positive: false,
              },
            ].map((token, index) => (
              <div
                key={token.symbol}
                className="rounded-xl bg-slate-800/50 p-4 backdrop-blur-sm border border-slate-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                    {token.symbol}
                  </div>
                  <div className="flex-1">
                    <div className="font-montserrat font-semibold text-white">{token.name}</div>
                    <div className="text-sm text-slate-400">{token.ticker}</div>
                  </div>
                  <div className={`text-sm font-semibold ${token.positive ? "text-green-400" : "text-red-400"}`}>
                    {token.positive ? "+" : ""}
                    <AnimatedCounter end={token.change} duration={2000} decimals={1} />%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400">Price</div>
                    <div className="font-montserrat font-semibold text-white">
                      $<AnimatedCounter end={token.price} duration={2500} decimals={8} />
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Vol</div>
                    <div className="font-montserrat font-semibold text-white">
                      $<AnimatedCounter end={token.vol} duration={2500} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">MCap</span>
                    <span className="font-montserrat font-semibold text-white">
                      $<AnimatedCounter end={token.mcap} duration={2500} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-montserrat text-4xl font-bold text-white mb-6">Ready to Launch Your Token?</h2>
          <p className="font-open-sans text-xl text-slate-300 mb-8">
            Join thousands of projects that trust Genisys for their token creation needs.
          </p>
          <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-4 font-montserrat text-lg font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/25">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
