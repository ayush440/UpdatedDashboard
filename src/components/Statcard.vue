<template>
  <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <div class="flex flex-col items-start">
      <div class="bg-indigo-100 rounded-full p-2 mb-4">
        <component :is="iconComponent" class="w-6 h-6 text-indigo-600" />
      </div>
      <h3 class="text-3xl font-bold text-gray-900 mb-1">{{ formattedValue }}</h3>
      <p class="text-sm text-black mb-1">{{ title }}</p>
      <span :class="{ 'text-blue-500': isPositive, 'text-red-500': !isPositive }" class="text-xs font-medium">
        {{ change }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps({
  title: String,
  value: String,
  change: String,
  icon: String
})

const isPositive = computed(() => props.change.includes('+'))
const iconComponent = computed(() => LucideIcons[props.icon])

const formattedValue = computed(() => {
  const numValue = parseFloat(props.value.replace(/[^0-9.-]+/g, ""))
  if (isNaN(numValue)) return props.value

  if (numValue >= 1e9) return (numValue / 1e9).toFixed(1) + 'B'
  if (numValue >= 1e6) return (numValue / 1e6).toFixed(1) + 'M'
  if (numValue >= 1e3) return (numValue / 1e3).toFixed(1) + 'K'
  
  return props.value
})
</script>