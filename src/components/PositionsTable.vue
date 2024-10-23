<template>
  <div class="positions-table">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Positions</h2>
      <button @click="$emit('view-all')" class="text-indigo-600 hover:text-indigo-800">All</button>
    </div>
    <div class="overflow-auto">
      <table class="min-w-full">
        <thead>
          <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th class="px-6 py-3 sticky top-0 bg-[#F7F9FB]">STRATEGY NAME</th>
            <th class="px-6 py-3 sticky top-0 bg-[#F7F9FB]">VALUE</th>
            <th class="px-6 py-3 sticky top-0 bg-[#F7F9FB]">ACTION</th>
            <th class="px-6 py-3 sticky top-0 bg-[#F7F9FB]">TIME</th>
            <th class="px-6 py-3 sticky top-0 bg-[#F7F9FB]"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(position, index) in positions" :key="index">
            <tr 
              :class="[
                'cursor-pointer transition-colors duration-150 ease-in-out',
                index % 2 === 0 ? 'bg-[#E5ECF6]' : 'bg-[#E3F5FF]',
                expandedRows[index] ? 'bg-white' : ''
              ]"
              @click="toggleExpand(index)"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ position.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ position.value }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ position.action }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ position.time }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <ChevronDownIcon v-if="expandedRows[index]" class="w-5 h-5 text-gray-400" />
                <ChevronRightIcon v-else class="w-5 h-5 text-gray-400" />
              </td>
            </tr>
            <tr v-if="expandedRows[index]" class="bg-white">
              <td colspan="5" class="px-6 py-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-sm font-medium text-gray-500">Broker</p>
                    <p class="mt-1 text-sm text-gray-900">{{ position.name }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Buy price</p>
                    <p class="mt-1 text-sm text-gray-900">{{ position.buyPrice }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Sell price</p>
                    <p class="mt-1 text-sm text-gray-900">{{ position.sellPrice }}</p>
                  </div>
                  <button class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                    Square off
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronRightIcon, ChevronDownIcon } from 'lucide-vue-next'

const props = defineProps({
  positions: {
    type: Array,
    required: true
  }
})

const expandedRows = ref({})

const toggleExpand = (index) => {
  expandedRows.value[index] = !expandedRows.value[index]
}

defineEmits(['view-all'])
</script>

<style scoped>
.positions-table {
  font-family: 'Albert Sans', sans-serif;
  width: 100%;
  height: 484px;
  min-width: 400px;
  padding: 24px;
  border-radius: 4px 0 0 0;
  background: #F7F9FB;
  display: flex;
  flex-direction: column;
}

.overflow-auto {
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: none;  /* For Firefox */
  -ms-overflow-style: none;  /* For Internet Explorer and Edge */
}

.overflow-auto::-webkit-scrollbar {
  display: none;  /* For Chrome, Safari, and Opera */
}

table {
  border-collapse: separate;
  border-spacing: 0 8px;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #F7F9FB;
}

tbody tr {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

td, th {
  border: none;
}

td:first-child, th:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

td:last-child, th:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>