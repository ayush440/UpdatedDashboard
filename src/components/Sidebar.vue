<template>
  <div 
    :class="[
      'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0'
    ]"
  >
    <div class="flex flex-col h-full">
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center">
          <img src="../assets/images/dummy.png" alt="Logo" class="w-8 h-8 mr-2 object-contain" />
          <span class="text-xl font-bold text-gray-800">Logo here</span>
        </div>
      </div>
      
      <nav class="flex-1 overflow-y-auto py-4">
        <div class="px-4 space-y-2">
          <router-link 
            v-for="item in menuItems" 
            :key="item.path" 
            :to="item.path" 
            :class="[ 
              'flex items-center px-4 py-2 text-gray-700 rounded-lg transition-colors duration-200',
              $route.path === item.path ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-100'
            ]"
            @click="$emit('close')"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </nav>
      
      <!-- Updated Profile Section -->
      <div class="p-4 border-t border-gray-800">
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 mb-3">
            <img 
              src="../assets/images/profile.jpg" 
              alt="User Profile" 
              class="w-full h-full rounded-full object-cover"
            />
          </div>
          <router-link 
            to="/profile" 
            class="text-gray-800 font-semibold hover:underline"
            @click="$emit('close')"
          >
            {{ authStore.user?.name || 'Sam Wheeler' }}
          </router-link>
          <p class="text-gray-600 text-sm mt-1">{{ authStore.user?.email || 'samwheeler@example.com' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { HomeIcon, BarChartIcon, BriefcaseIcon, ShoppingCartIcon, LayersIcon, BookOpenIcon, UserIcon } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const route = useRoute()
const authStore = useAuthStore()

const menuItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Strategy', path: '/strategy', icon: BarChartIcon },
  { name: 'Broker', path: '/broker', icon: BriefcaseIcon },
  { name: 'Orders', path: '/orders', icon: ShoppingCartIcon },
  { name: 'Positions', path: '/positions', icon: LayersIcon },
  { name: 'Tutorials', path: '/tutorials', icon: BookOpenIcon },
]
</script>
