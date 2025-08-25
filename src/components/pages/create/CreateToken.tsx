import type React from "react"

import { useState } from "react"
import { Navigation } from "../../Navigation"
import { ChevronLeft, ChevronRight, Upload, Copy, RefreshCw } from "lucide-react"

const AI_TOKEN_DATA = [
  {
    name: "DogeRoyal",
    symbol: "DRL",
    description:
      "DogeRoyal is the meme cryptocurrency that combines the playful and community-driven spirit of doges with a touch of royalty. Our symbol represents nobility and loyalty, the pillars of our community. Join the DogeRoyal kingdom and be part of the real fun in the crypto world!",
    image: "/IA/1/1.png",
  },
  {
    name: "FrogKing",
    symbol: "FKG",
    description:
      "FrogKing is the meme coin that has come to claim its throne in the world of cryptocurrencies. With a crown that symbolizes power and a vibrant community, FrogKing represents the rise of a new leader in the kingdom of digital coins. Hop in with us and be part of the amphibian royalty!",
    image: "/IA/2/2.png",
  },
  {
    name: "CanineUnit",
    symbol: "CUNIT",
    description:
      "CanineUnit is the meme coin that upholds law and order in the crypto world. With its logo inspired by a service badge, our coin symbolizes loyalty, teamwork, and security. Join the patrol and keep your wallet safe with CanineUnit!",
    image: "/IA/3/3.png",
  },
  {
    name: "CatCoin",
    symbol: "CATCO",
    description: "CatCoin is the purr-fect meme coin for the internet's true royalty. With a dignified yet mischievous spirit, our coin represents the independent and cunning nature of cats. Join our kingdom and let's conquer the crypto world one paw at a time!",
    image: "/IA/4/4.png",
  },
  {
    name: "PandaKing",
    symbol: "PDK",
    description: "PandaKing is the chillest meme coin on the blockchain. With a regal crown and an easygoing spirit, our coin represents the calm and powerful nature of the panda. Join our kingdom and let's build a relaxed but resilient crypto community together!",
    image: "/IA/5/5.png",
  },
  {
    name: "ApeKing",
    symbol: "APE",
    description: "ApeKing is the meme coin that is leading the charge in the crypto jungle. With a crown that represents strength and a community that is loyal and united, ApeKing stands for the power of the collective. Join the tribe and let's conquer the market together!",
    image: "/IA/6/6.png",
  },
  {
    name: "WolfKing",
    symbol: "WLK",
    description: "WolfKing is the meme coin that leads the pack. With a regal crown and an unwavering gaze, our coin represents the strength, loyalty, and fierce independence of the lone wolf. Join our pack and run with the market leaders!",
    image: "/IA/7/7.png",
  },
  {
    name: "BearCrown",
    symbol: "BCR",
    description: "BearCrown is the steadfast meme coin of the crypto forest. Adorned with a regal crown, our coin embodies the strength, resilience, and grounded nature of the bear. Join the BearCrown community and build a strong portfolio!",
    image: "/IA/8/8.png",
  },
  {
    name: "PhoenixCoin",
    symbol: "PHX",
    description: "PhoenixCoin is the meme coin that rises from the ashes. Symbolizing rebirth and limitless growth, our coin represents the unstoppable spirit of the crypto market. Join our community and watch your portfolio rise to new heights!",
    image: "/IA/9/9.png",
  },
  {
    name: "LionKing",
    symbol: "LKG",
    description: "LionKing is the meme coin that dominates the crypto savanna. With a regal crown and a powerful roar, our coin represents courage, leadership, and strength. Join the pride and rule the market with LionKing!",
    image: "/IA/10/10.png",
  },
]

interface TokenData {
  name: string
  symbol: string
  totalSupply: string
  decimals: number
  description: string
  icon: File | null
  iconUrl?: string
  revokeFreeze: boolean
  revokeMint: boolean
  revokeUpdate: boolean
  customCreator: boolean
  creatorAddress: string
  addLiquidity: boolean
  baseTokenAmount: string
  quoteTokenAmount: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  step: "payment" | "transaction"
  tokenData: TokenData
  onProceedToPayment: () => void
  onCheckTransaction: () => void
}

const PaymentModal = ({
  isOpen,
  onClose,
  step,
  tokenData,
  onProceedToPayment,
  onCheckTransaction,
}: PaymentModalProps) => {
  const [transactionSignature, setTransactionSignature] = useState("")
  const [timeLeft, setTimeLeft] = useState(840) // 14:00 minutes in seconds
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate random server error (20% chance)
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate random server error (30% chance)
      if (Math.random() < 0.3) {
        throw new Error("Failed to verify transaction. Please check your signature and try again.")
      }

      onCheckTransaction()
      onClose()
      // Here you would typically redirect to success page or show success message
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
            </div>
            <span className="text-white font-semibold">SecPay</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {step === "payment" ? (
          <>
            <div className="mb-6">
              <p className="text-slate-400 text-sm mb-2">Payment amount</p>
              <p className="text-white text-2xl font-bold">1.000000 SOL</p>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-500 text-sm">Expiration time</span>
              <span className="text-green-500 text-sm font-mono">{formatTime(timeLeft)}</span>
            </div>

            <div className="mb-4">
              <label className="text-slate-400 text-sm mb-2 block">Select currency</label>
              <div className="bg-slate-700 rounded-lg p-3 flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-white">SOL</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-slate-400 text-sm mb-2 block">Select network</label>
              <div className="bg-slate-700 rounded-lg p-3">
                <span className="text-white">Mainnet</span>
              </div>
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

            <div className="text-center">
              <p className="text-slate-400 text-xs">Encrypted & Secure Payment</p>
              <p className="text-slate-400 text-xs">
                By paying you agree to our <span className="text-blue-400 underline">terms of service</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-slate-400 text-sm mb-2">Payment amount</p>
              <div className="flex items-center gap-2">
                <p className="text-white text-2xl font-bold">1.000000 SOL</p>
                <button className="text-slate-400 hover:text-white">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-500 text-sm">Expiration time</span>
              <span className="text-green-500 text-sm font-mono">{formatTime(timeLeft)}</span>
            </div>

            <div className="mb-4">
              <label className="text-slate-400 text-sm mb-2 block">Send to this address</label>
              <div className="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
                <span className="text-green-400 text-sm font-mono">od1nhsGkZXfFAU16f3DyabJ8Mw7UK2cmRsZEqGmPFMy</span>
                <button className="text-slate-400 hover:text-white">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
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

            <div className="text-center">
              <p className="text-slate-400 text-xs">Encrypted & Secure Payment</p>
              <p className="text-slate-400 text-xs">
                By paying you agree to our <span className="text-blue-400 underline">terms of service</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function CreateToken () {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"payment" | "transaction">("payment")
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [currentAiIndex, setCurrentAiIndex] = useState(0)
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    symbol: "",
    totalSupply: "1000000000",
    decimals: 9,
    description: "",
    icon: null,
    iconUrl: "",
    revokeFreeze: true,
    revokeMint: true,
    revokeUpdate: true,
    customCreator: false,
    creatorAddress: "",
    addLiquidity: false,
    baseTokenAmount: "900000000",
    quoteTokenAmount: "1",
  })

  const steps = [
    { number: 1, title: "Token Info", completed: currentStep > 1 },
    { number: 2, title: "Advanced Settings", completed: currentStep > 2 },
    { number: 3, title: "Review & Create", completed: false },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowPaymentModal(true)
      setPaymentStep("payment") // Reset to payment step when opening modal
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleProceedToPayment = () => {
    setPaymentStep("transaction")
  }

  const handleCheckTransaction = () => {
    console.log("Transaction verified successfully!")
    // Here you would typically show success message or redirect
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setTokenData({ ...tokenData, icon: file })
    }
  }

  const handleAskAI = async () => {
    setIsAiLoading(true)

    try {
      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Get current AI data
      const aiData = AI_TOKEN_DATA[currentAiIndex]

      // Update token data with AI generated content
      setTokenData((prev) => ({
        ...prev,
        name: aiData.name,
        symbol: aiData.symbol,
        description: aiData.description,
        iconUrl: aiData.image,
        icon: null, // Clear any uploaded file
      }))

      // Move to next AI data for next time
      setCurrentAiIndex((prev) => (prev + 1) % AI_TOKEN_DATA.length)
    } catch (error) {
      console.error("AI generation failed:", error)
    } finally {
      setIsAiLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${step.completed ? "bg-blue-600" : currentStep === step.number ? "bg-blue-600" : "bg-slate-700"
                    }`}
                >
                  {step.completed ? "✓" : step.number}
                </div>
                <span className="text-slate-400 text-sm mt-2">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 mx-4 ${step.completed ? "bg-blue-600" : "bg-slate-700"}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              {currentStep === 1 && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">Step 1: Token Info</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Token Name</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tokenData.name}
                          onChange={(e) => setTokenData({ ...tokenData, name: e.target.value })}
                          placeholder="Dogecoin"
                          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={handleAskAI}
                          disabled={isAiLoading}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-white text-sm transition-colors flex items-center gap-2"
                        >
                          {isAiLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              AI...
                            </>
                          ) : (
                            "Ask AI"
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Symbol</label>
                      <input
                        type="text"
                        value={tokenData.symbol}
                        onChange={(e) => setTokenData({ ...tokenData, symbol: e.target.value })}
                        placeholder="DOGE"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Total Supply</label>
                      <input
                        type="text"
                        value={tokenData.totalSupply}
                        onChange={(e) => setTokenData({ ...tokenData, totalSupply: e.target.value })}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Decimals</label>
                      <select
                        value={tokenData.decimals}
                        onChange={(e) => setTokenData({ ...tokenData, decimals: Number.parseInt(e.target.value) })}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        {[...Array(19)].map((_, i) => (
                          <option key={i} value={i}>
                            {i} decimals
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-slate-300 text-sm mb-2 block">Description</label>
                    <textarea
                      value={tokenData.description}
                      onChange={(e) => setTokenData({ ...tokenData, description: e.target.value })}
                      placeholder="Describe your token project..."
                      rows={4}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="text-slate-300 text-sm mb-2 block">Token Icon</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                      {tokenData.iconUrl ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={tokenData.iconUrl || "/placeholder.svg"}
                            alt="Token icon"
                            className="w-16 h-16 rounded-full mb-4"
                          />
                          <p className="text-green-400 mb-2">AI Generated Icon</p>
                          <p className="text-slate-400 text-sm">Click to upload a different image</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-blue-400 mb-2">Click to upload or drag and drop</p>
                          <p className="text-slate-400 text-sm">PNG, JPG, up to 10MB</p>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="icon-upload"
                      />
                      <label htmlFor="icon-upload" className="cursor-pointer">
                        <span className="sr-only">Upload file</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-blue-400 mb-2">1.00 SOL</div>
                    <div className="text-slate-400">Total Cost</div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-6">Step 2: Advanced Settings</h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h3 className="text-white font-semibold">Revoke Freeze Authority</h3>
                        </div>
                        <p className="text-slate-400 text-sm">
                          Freeze Authority allows you to freeze token accounts of holders.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.revokeFreeze}
                          onChange={(e) => setTokenData({ ...tokenData, revokeFreeze: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h3 className="text-white font-semibold">Revoke Mint Authority</h3>
                        </div>
                        <p className="text-slate-400 text-sm">
                          Mint Authority allows you to mint more supply of your token.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.revokeMint}
                          onChange={(e) => setTokenData({ ...tokenData, revokeMint: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h3 className="text-white font-semibold">Revoke Update Authority</h3>
                        </div>
                        <p className="text-slate-400 text-sm">Update Authority allows you to update token metadata.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.revokeUpdate}
                          onChange={(e) => setTokenData({ ...tokenData, revokeUpdate: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h3 className="text-white font-semibold">Custom Creator Address</h3>
                        </div>
                        <p className="text-slate-400 text-sm">Customize who created the token</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.customCreator}
                          onChange={(e) => setTokenData({ ...tokenData, customCreator: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {tokenData.customCreator && (
                      <div>
                        <label className="text-slate-300 text-sm mb-2 block">Creator Address</label>
                        <input
                          type="text"
                          value={tokenData.creatorAddress}
                          onChange={(e) => setTokenData({ ...tokenData, creatorAddress: e.target.value })}
                          placeholder="Enter Solana wallet address"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h3 className="text-white font-semibold">Add Initial Liquidity</h3>
                        </div>
                        <p className="text-slate-400 text-sm">Create a liquidity pool on Raydium instantly.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.addLiquidity}
                          onChange={(e) => setTokenData({ ...tokenData, addLiquidity: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {tokenData.addLiquidity && (
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-slate-300 text-sm">Base Token amount (CHRP)</label>
                            <span className="text-slate-400 text-xs">Available: 1,000,000,000 MAX</span>
                          </div>
                          <input
                            type="text"
                            value={tokenData.baseTokenAmount}
                            onChange={(e) => setTokenData({ ...tokenData, baseTokenAmount: e.target.value })}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-slate-300 text-sm">Quote Token amount (SOL)</label>
                            <span className="text-slate-400 text-xs">Min: 0.3 SOL | Max: 100 SOL</span>
                          </div>
                          <input
                            type="text"
                            value={tokenData.quoteTokenAmount}
                            onChange={(e) => setTokenData({ ...tokenData, quoteTokenAmount: e.target.value })}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">Step 3: Review & Create</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name:</span>
                      <span className="text-white">{tokenData.name || "ChirpCoin"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Symbol:</span>
                      <span className="text-white">{tokenData.symbol || "CHRP"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Supply:</span>
                      <span className="text-white">{tokenData.totalSupply.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Decimals:</span>
                      <span className="text-white">{tokenData.decimals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Features:</span>
                      <span className="text-white">
                        {[
                          tokenData.revokeFreeze && "Revoke Freeze",
                          tokenData.revokeMint && "Revoke Mint",
                          tokenData.revokeUpdate && "Revoke Update",
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                    {tokenData.addLiquidity && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Initial Liquidity:</span>
                        <span className="text-white">{tokenData.quoteTokenAmount} SOL</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-700 rounded-lg p-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total Cost:</span>
                      <span className="text-2xl font-bold text-blue-400">1.00 SOL</span>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {currentStep === 3 ? "Create Token" : "Next"}
                  {currentStep !== 3 && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Token Preview */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6">Token Preview</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden">
                  {tokenData.iconUrl ? (
                    <img
                      src={tokenData.iconUrl || "/placeholder.svg"}
                      alt="Token icon"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl">?</span>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{tokenData.name || "Token Name"}</h4>
                  <p className="text-slate-400">${tokenData.symbol || "SYMBOL"}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Supply:</span>
                  <span className="text-white">{tokenData.totalSupply.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Decimals:</span>
                  <span className="text-white">{tokenData.decimals}</span>
                </div>
              </div>

              {tokenData.description && (
                <div className="mb-6">
                  <h5 className="text-slate-400 text-sm mb-2">Description:</h5>
                  <p className="text-white text-sm">{tokenData.description}</p>
                </div>
              )}

              <div className="mb-4">
                <h5 className="text-slate-400 text-sm mb-3">Security Features:</h5>
                <div className="flex flex-wrap gap-2">
                  {tokenData.revokeFreeze && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                      Revoke Freeze Authority
                    </span>
                  )}
                  {tokenData.revokeMint && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Revoke Mint Authority</span>
                  )}
                  {tokenData.revokeUpdate && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                      Revoke Update Authority
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        step={paymentStep}
        tokenData={tokenData}
        onProceedToPayment={handleProceedToPayment}
        onCheckTransaction={handleCheckTransaction}
      />
    </div>
  )
}
