// src/components/ChartOptions.js
export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      stacked: true,
      display: false,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};
