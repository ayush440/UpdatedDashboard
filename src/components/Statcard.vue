<template>
  <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <div class="flex flex-col items-start">
      <div class="bg-indigo-100 rounded-full p-3 mb-4">
        <component :is="iconComponent" class="w-6 h-6 text-indigo-600" />
      </div>
      <h3 class="text-3xl font-bold text-gray-900 mb-1">{{ value }}</h3>
      <p class="text-sm text-gray-500 mb-1">{{ title }}</p>
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
</script>