import { defineStore } from 'pinia'

export const usePositionStore = defineStore('paperPositions', {
  state: () => ({
    positions: [
      {
        id: 1,
        strategy: 'AGGRESSIVE GROWTH (NIFTY)',
        broker: 'Zerodha (Z123456)',
        script: 'NIFTY15FEB2418000PE(NFO)',
        product: 'INTRADAY',
        side: 'SELL',
        quantity: 300,
        buyPrice: '10:00:00@ 50',
        sellPrice: '10:30:00@ 55',
        status: 'CLOSED',
        pnl: 1500
      },
      {
        id: 2,
        strategy: 'CONSERVATIVE STABILITY (BANKNIFTY)',
        broker: 'Upstox (U789012)',
        script: 'BANKNIFTY15FEB2416000CE(NFO)',
        product: 'INTRADAY',
        side: 'BUY',
        quantity: 200,
        buyPrice: '09:45:00@ 20',
        sellPrice: '10:20:00@ 30',
        status: 'CLOSED',
        pnl: 2000
      },
      {
        id: 3,
        strategy: 'BALANCED STRATEGY (NIFTY)',
        broker: 'Angel (A537412)',
        script: 'NIFTY15FEB2419000PE(NFO)',
        product: 'INTRADAY',
        side: 'SELL',
        quantity: 400,
        buyPrice: '10:15:00@ 10',
        sellPrice: '10:45:00@ 12',
        status: 'OPEN',
        pnl: 800
      },
      {
        id: 4,
        strategy: 'RISK MANAGEMENT (BANKNIFTY)',
        broker: '5Paisa (P456789)',
        script: 'BANKNIFTY15FEB2417000CE(NFO)',
        product: 'INTRADAY',
        side: 'BUY',
        quantity: 600,
        buyPrice: '10:05:00@ 15',
        sellPrice: '10:50:00@ 18',
        status: 'OPEN',
        pnl: 900
      },
      // Add more positions as needed...
    ]
  }),
  actions: {
    async fetchPositions() {
      // In a real application, you would fetch the positions from an API
      // For now, we'll just use the hardcoded data
      // this.positions = await api.getPositions()
    }
  }
})
