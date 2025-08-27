import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "../../Navigation"
import { ChevronLeft, ChevronRight, Upload, Copy, X } from "lucide-react"

const AI_TOKEN_DATA = [
  {
    name: "UniRoyal",
    symbol: "UNI",
    description:
      "UniRoyal is the legendary meme coin of the crypto realm. With its majestic horn and a royal crown, our coin represents the magic of limitless potential and a truly enchanted community. Join us and make your portfolio a thing of legend!",
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
    description:
      "CatCoin is the purr-fect meme coin for the internet's true royalty. With a dignified yet mischievous spirit, our coin represents the independent and cunning nature of cats. Join our kingdom and let's conquer the crypto world one paw at a time!",
    image: "/IA/4/4.png",
  },
  {
    name: "PandaKing",
    symbol: "PDK",
    description:
      "PandaKing is the chillest meme coin on the blockchain. With a regal crown and an easygoing spirit, our coin represents the calm and powerful nature of the panda. Join our kingdom and let's build a relaxed but resilient crypto community together!",
    image: "/IA/5/5.png",
  },
  {
    name: "ApeKing",
    symbol: "APE",
    description:
      "ApeKing is the meme coin that is leading the charge in the crypto jungle. With a crown that represents strength and a community that is loyal and united, ApeKing stands for the power of the collective. Join the tribe and let's conquer the market together!",
    image: "/IA/6/6.png",
  },
  {
    name: "WolfKing",
    symbol: "WLK",
    description:
      "WolfKing is the meme coin that leads the pack. With a regal crown and an unwavering gaze, our coin represents the strength, loyalty, and fierce independence of the lone wolf. Join our pack and run with the market leaders!",
    image: "/IA/7/7.png",
  },
  {
    name: "BearCrown",
    symbol: "BCR",
    description:
      "BearCrown is the steadfast meme coin of the crypto forest. Adorned with a regal crown, our coin embodies the strength, resilience, and grounded nature of the bear. Join the BearCrown community and build a strong portfolio!",
    image: "/IA/8/8.png",
  },
  {
    name: "PhoenixCoin",
    symbol: "PHX",
    description:
      "PhoenixCoin is the meme coin that rises from the ashes. Symbolizing rebirth and limitless growth, our coin represents the unstoppable spirit of the crypto market. Join our community and watch your portfolio rise to new heights!",
    image: "/IA/9/9.png",
  },
  {
    name: "LionKing",
    symbol: "LKG",
    description:
      "LionKing is the meme coin that dominates the crypto savanna. With a regal crown and a powerful roar, our coin represents courage, leadership, and strength. Join the pride and rule the market with LionKing!",
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
  boostVisibility: boolean
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  step: "payment" | "transaction"
  tokenData: TokenData
  totalCost: number
  onProceedToPayment: () => void
  onCheckTransaction: () => void
}

const PaymentModal = ({
  isOpen,
  onClose,
  step,
  tokenData,
  totalCost,
  onProceedToPayment,
  onCheckTransaction,
}: PaymentModalProps) => {
  const [transactionSignature, setTransactionSignature] = useState("")
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copySuccess, setCopySuccess] = useState<string>("")

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(type)
      setTimeout(() => setCopySuccess(""), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

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
    setTimeLeft(900) // Reset to 15 minutes
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
      window.location.href = "/token-tracker"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {step === "payment" ? "Complete Payment" : "Transaction Status"}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {step === "payment" ? (
            <>
              <div className="mb-6">
                <p className="text-slate-400 text-sm mb-2">Payment amount</p>
                <div className="flex items-center gap-2">
                  <p className="text-white text-xl sm:text-2xl font-bold">{totalCost.toFixed(6)} SOL</p>
                  <button
                    onClick={() => copyToClipboard(totalCost.toFixed(6), "amount")}
                    className="text-slate-400 hover:text-white transition-colors p-1 relative"
                    title="Copy amount"
                  >
                    <Copy className="w-4 h-4" />
                    {copySuccess === "amount" && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
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
                <div className="bg-slate-700 rounded-lg p-3 flex items-center justify-between gap-2">
                  <span className="text-green-400 text-xs sm:text-sm font-mono break-all flex-1">
                    genWi5DV9zgv4vFYcigqH36NqpgegMcREU2Q1yEJAYL
                  </span>
                  <button
                    onClick={() => copyToClipboard("genWi5DV9zgv4vFYcigqH36NqpgegMcREU2Q1yEJAYL", "address")}
                    className="text-slate-400 hover:text-white transition-colors p-1 flex-shrink-0 relative"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4" />
                    {copySuccess === "address" && (
                      <span className="absolute -top-8 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6 text-center">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-200 rounded flex items-center justify-center">
                    <span className="text-slate-500 text-xs sm:text-sm">QR Code</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm mt-2">Scan with your Solana wallet</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onProceedToPayment}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  {isLoading ? "Processing..." : "I've Sent the Payment"}
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Transaction step content - also made responsive */}
              <div className="mb-6">
                <label className="text-slate-400 text-sm mb-2 block">Transaction Signature</label>
                <input
                  type="text"
                  value={transactionSignature}
                  onChange={(e) => setTransactionSignature(e.target.value)}
                  placeholder="Enter transaction signature..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={onCheckTransaction}
                  disabled={isLoading || !transactionSignature.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  {isLoading ? "Checking..." : "Verify Transaction"}
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
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
  const [formErrors, setFormErrors] = useState<string[]>([])
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
    boostVisibility: false,
  })

  const calculateTotalCost = () => {
    let baseCost = 0.25 // Base cost
    if (tokenData.boostVisibility) {
      baseCost += 0.15 // Boost visibility cost
    }
    return baseCost
  }

  const steps = [
    { number: 1, title: "Token Info", completed: currentStep > 1 },
    { number: 2, title: "Advanced Settings", completed: currentStep > 2 },
    { number: 3, title: "Review & Create", completed: false },
  ]

  const validateCurrentStep = () => {
    const errors: string[] = []

    if (currentStep === 1) {
      if (!tokenData.name.trim()) errors.push("Token name is required")
      if (!tokenData.symbol.trim()) errors.push("Token symbol is required")
      if (!tokenData.description.trim()) errors.push("Token description is required")
      if (!tokenData.totalSupply.trim()) errors.push("Total supply is required")
    }

    if (currentStep === 2) {
      if (tokenData.customCreator && !tokenData.creatorAddress.trim()) {
        errors.push("Creator address is required when custom creator is enabled")
      }
      if (tokenData.addLiquidity) {
        const quoteAmount = Number.parseFloat(tokenData.quoteTokenAmount)
        if (isNaN(quoteAmount) || quoteAmount < calculateTotalCost() || quoteAmount > 100) {
          errors.push(`Quote token amount must be between ${calculateTotalCost().toFixed(2)} and 100 SOL`)
        }
      }
    }

    setFormErrors(errors)
    return errors.length === 0
  }

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return
    }

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
      setFormErrors([]) // Clear errors when going back
    }
  }

  const handleProceedToPayment = () => {
    setPaymentStep("transaction")
  }

  const handleCheckTransaction = () => {
    const newToken = {
      name: tokenData.name,
      symbol: tokenData.symbol,
      totalSupply: tokenData.totalSupply,
      decimals: tokenData.decimals,
      description: tokenData.description,
      iconUrl: tokenData.iconUrl,
      createdAt: new Date().toISOString(),
    }

    try {
      const existingTokens = JSON.parse(localStorage.getItem("createdTokens") || "[]")
      const updatedTokens = [...existingTokens, newToken]
      localStorage.setItem("createdTokens", JSON.stringify(updatedTokens))
      console.log("Token saved to portfolio successfully!")
    } catch (error) {
      console.error("Error saving token to storage:", error)
    }

    console.log("Transaction verified successfully!")
    // Here you would typically show success message or redirect
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setTokenData({ ...tokenData, icon: file, iconUrl: imageUrl })
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
              {formErrors.length > 0 && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-2">Please fix the following errors:</h4>
                  <ul className="text-red-400 text-sm space-y-1">
                    {formErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

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
                    <label htmlFor="icon-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors">
                        {tokenData.iconUrl ? (
                          <div className="flex flex-col items-center">
                            <img
                              src={tokenData.iconUrl || "/placeholder.svg"}
                              alt="Token icon"
                              className="w-16 h-16 rounded-full mb-4 object-cover"
                            />
                            <p className="text-green-400 mb-2">
                              {tokenData.icon ? "Custom Image Uploaded" : "AI Generated Icon"}
                            </p>
                            <p className="text-slate-400 text-sm">Click to upload a different image</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-blue-400 mb-2">Click to upload or drag and drop</p>
                            <p className="text-slate-400 text-sm">PNG, JPG, up to 10MB</p>
                          </>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="icon-upload"
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-blue-400 mb-2">{calculateTotalCost().toFixed(2)} SOL</div>
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
                        <label className="text-slate-300 text-sm mb-2 block">Creator Address *</label>
                        <input
                          type="text"
                          value={tokenData.creatorAddress}
                          onChange={(e) => setTokenData({ ...tokenData, creatorAddress: e.target.value })}
                          placeholder="Enter Solana wallet address"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border-2 border-yellow-600">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h3 className="text-white font-semibold">Boost Visibility</h3>
                          <span className="text-yellow-400 text-xs bg-yellow-600/20 px-2 py-1 rounded-full">
                            +0.15 SOL
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm">
                          Increase your token's visibility and reach more potential investors.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tokenData.boostVisibility}
                          onChange={(e) => setTokenData({ ...tokenData, boostVisibility: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>

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
                            <label className="text-slate-300 text-sm">
                              Base Token amount ({tokenData.symbol || "TOKEN"})
                            </label>
                            <span className="text-slate-400 text-xs">
                              Available: {tokenData.totalSupply.toLocaleString()} MAX
                            </span>
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
                            <span className="text-slate-400 text-xs">
                              Min: {calculateTotalCost().toFixed(2)} SOL | Max: 100 SOL
                            </span>
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
                      <span className="text-white">{tokenData.name || "Token Name"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Symbol:</span>
                      <span className="text-white">{tokenData.symbol || "SYMBOL"}</span>
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
                    {tokenData.boostVisibility && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Boost Visibility:</span>
                        <span className="text-yellow-400">Enabled (+0.15 SOL)</span>
                      </div>
                    )}
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
                      <span className="text-2xl font-bold text-blue-400">{calculateTotalCost().toFixed(2)} SOL</span>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between my-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
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
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Cost:</span>
                  <span className="text-blue-400 font-bold">{calculateTotalCost().toFixed(2)} SOL</span>
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
                  {tokenData.boostVisibility && (
                    <span className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-full">Boost Visibility</span>
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
        totalCost={calculateTotalCost()}
        onProceedToPayment={handleProceedToPayment}
        onCheckTransaction={handleCheckTransaction}
      />
    </div>
  )
}
