import { useState, useEffect } from "react"
import { Home, Zap, Droplets, BarChart3 } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Create Token", href: "/create", icon: Zap },
  { name: "Add Liquidity", href: "/liquidity", icon: Droplets },
  { name: "Portfolio", href: "/portfolio", icon: BarChart3 },
]

export function Navigation () {
  const [activeTab, setActiveTab] = useState("Home")

  useEffect(() => {
    const currentPath = window.location.pathname
    const currentNav = navigation.find((nav) => nav.href === currentPath)
    if (currentNav) {
      setActiveTab(currentNav.name)
    }
  }, [])

  return (
    <nav className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-black text-foreground">Genisys</span>
          </a>

          <div className="flex-1 flex justify-center">
            <div className="flex space-x-1">
              {navigation.map((item) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveTab(item.name)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === item.name
                      ? "bg-blue-600/90 text-white shadow-lg shadow-blue-600/25 backdrop-blur-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                  >
                    <IconComponent size={16} />
                    <span>{item.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
