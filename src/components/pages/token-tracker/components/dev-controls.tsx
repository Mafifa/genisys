"use client"

import type React from "react"
import { FastForward, Play } from "lucide-react"

interface DevControlsProps {
  isFastCamera: boolean
  toggleFastCamera: () => void
  isRugPulled: boolean
  timeElapsed: number
}

export const DevControls: React.FC<DevControlsProps> = ({
  isFastCamera,
  toggleFastCamera,
  isRugPulled,
  timeElapsed,
}) => {
  if (process.env.NODE_ENV !== "development") return null

  return (
    <>
      <div className="mb-4 flex justify-center">
        <button
          onClick={toggleFastCamera}
          disabled={isRugPulled}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isFastCamera ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
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

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <span>
          Time elapsed: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")} / 28:00
        </span>
        {isFastCamera && (
          <span className="ml-4 px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">🚀 FAST CAMERA (56x)</span>
        )}
      </div>
    </>
  )
}
