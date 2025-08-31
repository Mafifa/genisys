import { useEffect, useState } from "react"
import { MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react"

interface OrderBookEntry {
  price: number
  quantity: number
  total: number
}

interface OrderBookProps {
  currentPrice: number
}

const OrderBook = ({ currentPrice }: OrderBookProps) => {
  const [sellOrders, setSellOrders] = useState<OrderBookEntry[]>([])
  const [buyOrders, setBuyOrders] = useState<OrderBookEntry[]>([])
  const [operations, setOperations] = useState<
    Array<{
      price: number
      quantity: number
      time: string
      type: "buy" | "sell"
    }>
  >([])
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const generateOrders = (basePrice: number, isSell: boolean) => {
      const orders: OrderBookEntry[] = []
      let runningTotal = 0

      for (let i = 0; i < 8; i++) {
        const priceOffset = isSell ? (i + 1) * 0.1 : -(i + 1) * 0.1
        const price = basePrice * (1 + priceOffset / 100)
        const quantity = Math.random() * 0.5 + 0.001
        runningTotal += quantity

        orders.push({
          price: price,
          quantity: quantity,
          total: runningTotal,
        })
      }

      return isSell ? orders : orders.reverse()
    }

    const updateOrderBook = () => {
      setSellOrders(generateOrders(currentPrice, true))
      setBuyOrders(generateOrders(currentPrice, false))

      if (Math.random() < 0.3) {
        const newOp = {
          price: currentPrice * (0.999 + Math.random() * 0.002),
          quantity: Math.random() * 0.1 + 0.001,
          time: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          type: Math.random() > 0.5 ? ("buy" as const) : ("sell" as const),
        }

        setOperations((prev) => [newOp, ...prev.slice(0, 9)])
      }
    }

    updateOrderBook()
    const interval = setInterval(updateOrderBook, 2000)

    return () => clearInterval(interval)
  }, [currentPrice])

  const formatPrice = (price: number) => price.toFixed(8)
  const formatQuantity = (qty: number) => qty.toFixed(3)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="font-medium text-foreground">Order Book</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
            aria-label={isMinimized ? "Expand order book" : "Minimize order book"}
          >
            {isMinimized ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="p-3">
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
              <div>Price (USDT)</div>
              <div className="text-right">Amount (BTC)</div>
              <div className="text-right">Total (BTC)</div>
            </div>

            <div className="space-y-1 mb-2">
              {sellOrders.map((order, index) => (
                <div
                  key={`sell-${index}`}
                  className="grid grid-cols-3 gap-2 text-xs hover:bg-red-500/10 px-1 py-0.5 rounded"
                >
                  <div className="text-red-500 font-mono">{formatPrice(order.price)}</div>
                  <div className="text-right text-foreground font-mono">{formatQuantity(order.quantity)}</div>
                  <div className="text-right text-muted-foreground font-mono">{formatQuantity(order.total)}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between py-2 border-y border-border">
              <div className="text-green-500 font-bold font-mono text-sm">{formatPrice(currentPrice)}</div>
              <div className="text-xs text-green-500">↗ {formatPrice(currentPrice)}</div>
            </div>

            <div className="space-y-1 mt-2">
              {buyOrders.map((order, index) => (
                <div
                  key={`buy-${index}`}
                  className="grid grid-cols-3 gap-2 text-xs hover:bg-green-500/10 px-1 py-0.5 rounded"
                >
                  <div className="text-green-500 font-mono">{formatPrice(order.price)}</div>
                  <div className="text-right text-foreground font-mono">{formatQuantity(order.quantity)}</div>
                  <div className="text-right text-muted-foreground font-mono">{formatQuantity(order.total)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex gap-4">
                <span className="text-sm font-medium text-foreground">Recent Trades</span>
                <span className="text-sm text-muted-foreground">Top Movers</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="p-3">
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                <div>Price (USDT)</div>
                <div className="text-right">Amount (BTC)</div>
                <div className="text-right">Time</div>
              </div>

              <div className="space-y-1 max-h-32 overflow-y-auto">
                {operations.map((op, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                    <div className={`font-mono ${op.type === "buy" ? "text-green-500" : "text-red-500"}`}>
                      {formatPrice(op.price)}
                    </div>
                    <div className="text-right text-foreground font-mono">{formatQuantity(op.quantity)}</div>
                    <div className="text-right text-muted-foreground font-mono">{op.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {isMinimized && (
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Price</span>
            <div className="text-green-500 font-bold font-mono text-sm">{formatPrice(currentPrice)}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderBook
