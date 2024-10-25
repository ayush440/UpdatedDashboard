<template>
  <header class="bg-white shadow-sm rounded-lg w-full max-w-7xl mx-auto mt-1">
    <div class="px-6 py-4 flex items-center justify-between">
      <div class="flex items-center">
        <button @click="$emit('toggle-menu')" class="mr-4 md:hidden">
          <MenuIcon class="h-6 w-6" />
        </button>
        <h1 class="text-xl font-semibold">Hello {{ authStore.user?.name || 'Social User' }} 👋🏻</h1>
      </div>
      <div class="flex items-center bg-gray-100 rounded-full">
  <button 
    :class="[
      'px-4 py-2 rounded-l-full transition-colors duration-300 ease-in-out',
      mode === 'Paper' ? 'bg-indigo-600 text-white' : 'text-gray-700'
    ]"
    @click="changeMode('Paper')"
  >
    Paper
  </button>
  <button 
    :class="[
      'px-4 py-2 rounded-r-full transition-colors duration-300 ease-in-out',
      mode === 'Live' ? 'bg-indigo-600 text-white' : 'text-gray-700'
    ]"
    @click="changeMode('Live')"
  >
    Live
  </button>
</div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { MenuIcon } from 'lucide-vue-next'

const authStore = useAuthStore()

const props = defineProps({
  mode: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['toggle-menu', 'set-mode'])

const changeMode = (newMode) => {
  emit('set-mode', newMode)
}
</script>