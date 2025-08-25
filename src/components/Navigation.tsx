import { useState } from "react"

const navigation = [
  { name: "Home", href: "/", icon: "🏠" },
  { name: "Create Token", href: "/create", icon: "⚡" },
  { name: "Add Liquidity", href: "/liquidity", icon: "💧" },
  { name: "Portfolio", href: "/portfolio", icon: "📊" },
]

export function Navigation () {
  const [activeTab, setActiveTab] = useState("Home")

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-black text-foreground">Genisys</span>
          </div>

          <div className="flex space-x-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === item.name
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
