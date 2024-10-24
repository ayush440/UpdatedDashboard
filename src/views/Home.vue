<template>
  <div class="h-screen bg-[#e3f5ff]">
    <Sidebar :isOpen="isSidebarOpen" @close="toggleSidebar" />
    <div class="flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="px-2 py-1">
          
          <Header @toggle-menu="toggleSidebar" :mode="mode" @set-mode="setMode" />
        </div>
        <div class="container mx-auto px-2 py-1">
         
          <div class="grid grid-cols-1 md:grid-cols-[40%_60%] gap-2 mb-2">
            
            <DonutChart :data="currentData.profitData" />
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-semibold mb-4">Today's Sales</h2>
              
              <p class="text-xs text-gray-500 mb-4">Sales Summary</p>
              <div class="grid grid-cols-3 gap-4">
                <StatCard
                  v-for="(stat, index) in currentData.statsData"
                  :key="index"
                  :title="stat.title"
                  :value="stat.value"
                  :change="stat.change"
                  :icon="stat.icon"
                />
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm">
            <PositionsTable :positions="currentPositions" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePositionStore } from '../stores/positions'
import { usePositionStore as usePaperPositionStore } from '../stores/paperpositions'
import DonutChart from '../components/DonutChart.vue'
import StatCard from '../components/Statcard.vue'
import PositionsTable from '../components/PositionsTable.vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'

const mode = ref('Paper')
const isSidebarOpen = ref(false)
const positionStore = usePositionStore()
const paperPositionStore = usePaperPositionStore()

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const setMode = (newMode) => {
  mode.value = newMode
  if (mode.value === 'Paper') {
    paperPositionStore.fetchPositions()
  } else {
    positionStore.fetchPositions()
  }
}

const currentPositions = computed(() => {
  return mode.value === 'Paper' ? paperPositionStore.positions : positionStore.positions
})

const calculateProfitData = (positions) => {
  const strategyProfits = positions.reduce((acc, position) => {
    if (!acc[position.strategy]) {
      acc[position.strategy] = 0
    }
    acc[position.strategy] += parseFloat(position.pnl)
    return acc
  }, {})

  return Object.entries(strategyProfits).map(([strategy, profit], index) => ({
    name: strategy,
    value: profit,
    color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index % 4]
  }))
}

const currentData = computed(() => {
  const positions = currentPositions.value
  const profitData = calculateProfitData(positions)
  const totalProfit = profitData.reduce((sum, item) => sum + item.value, 0)
  const totalOrders = positions.length
  const strategyDeployed = new Set(positions.map(p => p.strategy)).size

  return {
    profitData,
    statsData: [
      { title: "Total Profit", value: `₹${totalProfit.toFixed(2)}`, change: "+8% from yesterday", icon: "TrendingUp" },
      { title: "Strategy Deployed", value: strategyDeployed.toString(), change: "+4% from yesterday", icon: "Zap" },
      { title: "Total Orders", value: totalOrders.toString(), change: "+3% from yesterday", icon: "ShoppingCart" },
    ],
  }
})

onMounted(() => {
  paperPositionStore.fetchPositions()
  positionStore.fetchPositions()
})

watch([() => paperPositionStore.positions, () => positionStore.positions], () => {
  currentData.value
}, { deep: true })
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');

.font-albert-sans {
  font-family: 'Albert Sans', sans-serif;
}
</style>