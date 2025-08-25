import { useEffect, useRef } from "react"

interface ChartProps {
  data: number[]
  color?: string
  height?: number
  className?: string
}

export function Chart ({ data, color = "#0891b2", height = 60, className = "" }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)

    if (data.length < 2) return

    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const stepX = rect.width / (data.length - 1)

    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctx.beginPath()
    data.forEach((value, index) => {
      const x = index * stepX
      const y = rect.height - ((value - min) / range) * rect.height

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Add gradient fill
    ctx.globalAlpha = 0.1
    ctx.fillStyle = color
    ctx.lineTo(rect.width, rect.height)
    ctx.lineTo(0, rect.height)
    ctx.closePath()
    ctx.fill()
  }, [data, color, height])

  return <canvas ref={canvasRef} className={`w-full ${className}`} style={{ height: `${height}px` }} />
}
