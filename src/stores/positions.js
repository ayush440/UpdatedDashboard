import { defineStore } from 'pinia';

export const usePositionStore = defineStore('positions', {
  state: () => ({
    positions: [
      {
        id: 1,
        strategy: 'DOMAIN TREND(NIFTY)',
        broker: 'Angel (A537412)',
        script: 'NIFTY15FEB2420000PE(NFO)',
        product: 'INTRADAY',
        side: 'SELL',
        quantity: 500,
        buyPrice: '09:13:54@ 0',
        sellPrice: '09:13:54@ 0',
        status: 'CLOSED',
        pnl: 0,
      },
      {
        id: 2,
        strategy: 'DOMAIN PRICE ACTION(BANKNIFTY)',
        broker: 'Angel (A537412)',
        script: 'NIFTY15FEB2422000CE(NFO)',
        product: 'INTRADAY',
        side: 'BUY',
        quantity: 500,
        buyPrice: '09:13:54@ 0',
        sellPrice: '09:13:54@ 7',
        status: 'CLOSED',
        pnl: 0,
      },
      {
        id: 3,
        strategy: 'DOMAIN REVERSAL(BANKNIFTY)',
        broker: 'Angel (A537412)',
        script: 'NIFTY15FEB2423000CE(NFO)',
        product: 'INTRADAY',
        side: 'BUY',
        quantity: 300,
        buyPrice: '09:15:00@ 3',
        sellPrice: '09:30:00@ 6',
        status: 'OPEN',
        pnl: 900,
      },
      {
        id: 4,
        strategy: 'DOMAIN SCALPING(NIFTY)',
        broker: 'Zerodha (Z123456)',
        script: 'NIFTY15FEB2421000PE(NFO)',
        product: 'INTRADAY',
        side: 'SELL',
        quantity: 200,
        buyPrice: '09:10:00@ 2',
        sellPrice: '09:15:00@ 4',
        status: 'CLOSED',
        pnl: 400,
      },
      
      // Add more unique positions as needed...
    ],
  }),
  actions: {
    async fetchPositions() {
      // In a real application, you would fetch the positions from an API
      // For now, we'll just use the hardcoded data
      // this.positions = await api.getPositions()
    },
  },
});
