<template>
  <div class="donut-chart">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const chartRef = ref(null);
let chart = null;

const createChart = () => {
  const ctx = chartRef.value.getContext('2d');
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: props.data.map(item => item.name),
      datasets: [{
        data: props.data.map(item => item.value),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }

          return props.data.map((item, index) => {
            if (index === 0 || index === 1) {
              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, item.color);
              gradient.addColorStop(1, '#ffffff');
              return gradient;
            }
            return item.color;
          });
        },
        borderWidth: 0,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            font: {
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              size: 12
            },
            generateLabels: (chart) => {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => {
                  return {
                    text: `${label} ${data.datasets[0].data[i]}`,
                    fillStyle: props.data[i].color,
                    hidden: isNaN(data.datasets[0].data[i]),
                    index: i
                  };
                });
              }
              return [];
            }
          }
        },
        tooltip: {
          enabled: true
        }
      },
      cutout: '50%',
      spacing: 5
    }
  });
}

const updateChart = () => {
  if (chart) {
    chart.data.labels = props.data.map(item => item.name);
    chart.data.datasets[0].data = props.data.map(item => item.value);
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
.donut-chart {
  height: 166px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

@media (max-width: 768px) {
  .donut-chart {
    height: 300px;
    max-width: 100%;
  }
}
</style>