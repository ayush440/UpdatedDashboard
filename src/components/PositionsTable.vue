<template>
  <div class="w-full bg-white p-6 rounded-lg">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Positions</h2>
      <button @click="$emit('view-all')" class="text-indigo-600 hover:text-indigo-800">All</button>
    </div>
    <div class="space-y-2">
      <div v-for="(position, index) in positions" :key="position.id" class="relative">
        <div
          :class="[
            'cursor-pointer transition-colors duration-150 ease-in-out rounded-lg overflow-hidden',
            index % 2 === 0 ? 'bg-[#E3F5FF]' : 'bg-[#EDF4FF]',
            expandedRows[position.id] ? 'rounded-b-none' : ''
          ]"
          @click="toggleExpand(position.id)"
        >
          <div class="grid grid-cols-5 items-center px-4 py-3">
            <div>{{ position.strategy }}</div>
            <div>{{ position.quantity }}</div>
            <div>{{ position.side }}</div>
            <div>{{ position.time }}</div>
            <div class="text-right">
              <ChevronDownIcon v-if="expandedRows[position.id]" class="w-5 h-5 text-gray-400 inline-block" />
              <ChevronRightIcon v-else class="w-5 h-5 text-gray-400 inline-block" />
            </div>
          </div>
        </div>
        <div v-if="expandedRows[position.id]" :class="[index % 2 === 0 ? 'bg-[#E3F5FF]' : 'bg-[#EDF4FF]', 'rounded-b-lg']">
          <div class="px-4 py-3 grid grid-cols-4 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Broker</p>
              <p class="mt-1 text-sm text-gray-900">{{ position.broker }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Buy Price</p>
              <p class="mt-1 text-sm text-gray-900">{{ position.buyPrice }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Sell Price</p>
              <p class="mt-1 text-sm text-gray-900">{{ position.sellPrice }}</p>
            </div>
            <div class="flex items-center justify-end">
              <button class="bg-[#EDF4FF] text-indigo-600 px-4 py-2 rounded-lg text-sm border border-indigo-200 transition-all duration-150 flex items-center space-x-2 hover:border-indigo-800 hover:bg-[#EDF4FF] hover:shadow-glow">
    <RefreshCcwIcon class="w-4 h-4" />
    <span>Square off</span>
  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronRightIcon, ChevronDownIcon, RefreshCcwIcon } from 'lucide-vue-next'

const props = defineProps({
  positions: {
    type: Array,
    required: true
  }
})

const expandedRows = ref({})

const toggleExpand = (id) => {
  expandedRows.value[id] = !expandedRows.value[id]
}

defineEmits(['view-all'])
</script>

<style scoped>
.hover\:shadow-glow:hover {
  box-shadow: 0 0 5px rgba(37, 99, 235, 1), 0 0 10px rgba(37, 99, 235, 1);
  border-color: rgba(37, 99, 235, 1);
}
</style>