<template>
  <div class="donut-chart-container">
    <div class="donut-chart">
      <div class="text-lg font-semibold mb-6 -mt-10 text-[#05004E]">
        <h2> Today's profit</h2>
      </div>
      <canvas ref="chartRef"></canvas>
    </div>
    <div class="legend-wrapper">
      <div v-for="(item, index) in chartData" :key="index" class="legend-item">
        <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
        <!-- Added title attribute to show full name on hover -->
        <span class="legend-name" :title="item.name">{{ item.name }}</span>
        <span class="legend-value">{{ item.percentage }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const chartRef = ref(null);
let chart = null;

const chartData = computed(() => {
  const total = props.data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#FF0000', '#5D5FEF', '#A1E3CB', '#A8C5DA'];
  return props.data.map((item, index) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
    color: colors[index] || item.color
  }));
});

const createChart = () => {
  const ctx = chartRef.value.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, '#FF0000');
  gradient.addColorStop(1, '#FFA2A2');

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartData.value.map(item => item.name),
      datasets: [{
        data: chartData.value.map(item => item.value),
        backgroundColor: chartData.value.map((item, index) => index === 0 ? gradient : item.color),
        borderWidth: 0,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      cutout: '50%',
      spacing: 2
    }
  });
};

const updateChart = () => {
  if (chart) {
    chart.data.labels = chartData.value.map(item => item.name);
    chart.data.datasets[0].data = chartData.value.map(item => item.value);
    chart.data.datasets[0].backgroundColor = chartData.value.map((item, index) =>
      index === 0 ? chartRef.value.getContext('2d').createLinearGradient(0, 0, 0, 200) : item.color
    );
    chart.update();
  }
};

const handleResize = () => {
  if (chart) {
    chart.resize();
  }
};

onMounted(() => {
  createChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
  }
  window.removeEventListener('resize', handleResize);
});

watch(() => props.data, updateChart, { deep: true });
</script>

<style scoped>
.donut-chart-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-right: 20%;
}

.donut-chart {
  flex: 1;
  height: 200px;
  width: 100%;
  max-width: 200px;
  margin: 0;
}

.legend-wrapper {
  flex: 1;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.legend-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 12px;
}

/* Updated .legend-name to have ellipsis and tooltip on hover */
.legend-name {
  flex: 1;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 120px; /* Adjust width based on your preference */
  cursor: pointer;
  
}

.legend-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-left: 12px;
}

@media (max-width: 768px) {
  .donut-chart-container {
    flex-direction: column;
    align-items: center;
  }

  .donut-chart {
    height: 300px;
    max-width: 100%;
    margin: 20px 0;
  }

  .legend-wrapper {
    padding-left: 0;
    margin-top: 20px;
  }
}
</style>