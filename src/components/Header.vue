<template>
  <header class="bg-white shadow-sm rounded-lg w-full max-w-7xl mx-auto mb-6 mt-5">
    <div class="px-6 py-4 flex items-center justify-between">
      <div class="flex items-center">
        <button @click="$emit('toggle-menu')" class="mr-4 md:hidden">
          <MenuIcon class="h-6 w-6" />
        </button>
        <h1 class="text-xl font-semibold">Hello {{ authStore.user?.name || 'Roshni' }} 👋🏻</h1>
      </div>
      <div class="flex items-center bg-gray-100 rounded-full">
        <button 
          :class="['px-4 py-2 rounded-full', mode === 'Paper' ? 'bg-indigo-600 text-white' : 'text-gray-700']"
          @click="setMode('Paper')"
        >
          Paper
        </button>
        <button 
          :class="['px-4 py-2 rounded-full', mode === 'Live' ? 'bg-indigo-600 text-white' : 'text-gray-700']"
          @click="setMode('Live')"
        >
          Live
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { MenuIcon } from 'lucide-vue-next'

const authStore = useAuthStore()
const mode = ref('Paper')
const setMode = (newMode) => {
  mode.value = newMode
}

defineEmits(['toggle-menu'])
</script>

<style scoped>
.header-container {
  width: 100%;
  max-width: 1142px;
  height: 88.57px;
  margin: 0 auto;
  border-radius: 3.77px;
}

.header-content {
  width: 100%;
  height: 100%;
  padding: 24.5px 26.38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 3.77px;
}
</style>