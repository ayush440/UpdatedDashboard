<template>
  <div class="">
    <Sidebar :isOpen="isSidebarOpen" @close="toggleSidebar" />
    <div class=" flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-[#e3f5ff]">
        
        <div class=" px-5">
          <Header @toggle-menu="toggleSidebar" />
        </div>
        
        <div class="container mx-auto px-6 py-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-semibold mb-4">Today's profit</h2>
              <DonutChart :data="profitData" />
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-semibold mb-2">Today's Sales</h2>
              <p class="text-sm text-gray-500 mb-4">Sales Summary</p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  title="Total Profit"
                  value="₹1k"
                  change="+8% from yesterday"
                  icon="TrendingUp"
                />
                <StatCard
                  title="Strategy Deployed"
                  value="32"
                  change="+4% from yesterday"
                  icon="Zap"
                />
                <StatCard
                  title="Total Orders"
                  value="53"
                  change="+3% from yesterday"
                  icon="ShoppingCart"
                />
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <PositionsTable :positions="positions" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import DonutChart from '../components/DonutChart.vue'
import StatCard from '../components/Statcard.vue'
import PositionsTable from '../components/PositionsTable.vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'

const authStore = useAuthStore()
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const profitData = ref([
  { name: 'Strategy 1', value: 25, color: '#FF6384' },
  { name: 'Strategy 2', value: 25, color: '#36A2EB' },
  { name: 'Strategy 3', value: 30, color: '#FFCE56' },
  { name: 'Strategy 4', value: 20, color: '#4BC0C0' },
])

const positions = ref([
  { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
  { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
  { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
  { name: 'Broker Angel-A423683', buyPrice: '₹543.56', sellPrice: '₹643.56', action: 'Square off' },
  { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
])
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');

.font-albert-sans {
  font-family: 'Albert Sans', sans-serif;
}
</style>