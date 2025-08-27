import { useState, useEffect } from "react"
import { Home, Zap, Droplets, BarChart3, Menu, X } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Create Token", href: "/create", icon: Zap },
  { name: "Add Liquidity", href: "/liquidity", icon: Droplets },
  { name: "Portfolio", href: "/portfolio", icon: BarChart3 },
]

export function Navigation () {
  const [activeTab, setActiveTab] = useState("Home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const currentPath = window.location.pathname
    const currentNav = navigation.find((nav) => nav.href === currentPath)
    if (currentNav) {
      setActiveTab(currentNav.name)
    }
  }, [])

  const handleLinkClick = (name: string) => {
    setActiveTab(name)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-black text-foreground">Genisys</span>
          </a>

          <div className="hidden md:flex flex-1 justify-center">
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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-800/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => handleLinkClick(item.name)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${activeTab === item.name
                      ? "bg-blue-600/90 text-white shadow-lg shadow-blue-600/25"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                  >
                    <IconComponent size={20} />
                    <span>{item.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
