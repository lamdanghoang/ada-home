import { DollarSign, TrendingUp, Wallet } from 'lucide-react'
import { Card } from "@/components/ui/card"

export default function PortfolioDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Value Card */}
        <Card className="p-6 bg-opacity-10 bg-white backdrop-blur-lg border-gray-800">
          <div className="space-y-6">
            <div>
              <h2 className="text-gray-400 text-sm">Value</h2>
              <div className="text-4xl font-bold text-white">$0</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-purple-500/10">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Rent Earned</p>
                  <p className="text-lg font-semibold text-white">$0</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-purple-500/10">
                  <Wallet className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Invested</p>
                  <p className="text-lg font-semibold text-white">$0</p>
                </div>
              </div>
            </div>

            {/* Decorative Illustration */}
            <div className="absolute right-6 top-6 w-48 h-48 opacity-50">
              <div className="relative w-full h-full">
                <div className="absolute right-0 bottom-0 w-16 h-20 rounded-t-full bg-purple-400/20" />
                <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-purple-400/30" />
                <div className="absolute right-8 bottom-16 w-6 h-6 rounded-full bg-purple-400/20" />
                <div className="absolute right-0 bottom-0 w-4 h-16 bg-purple-400/10 flex space-x-1">
                  <div className="w-1 bg-purple-400/20" style={{ height: '40%' }} />
                  <div className="w-1 bg-purple-400/20" style={{ height: '60%' }} />
                  <div className="w-1 bg-purple-400/20" style={{ height: '80%' }} />
                  <div className="w-1 bg-purple-400/20" style={{ height: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Assets Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">My Assets</h2>
          <Card className="p-12 bg-opacity-10 bg-white backdrop-blur-lg border-gray-800">
            <div className="text-center text-gray-400">
              No Properties Available
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}