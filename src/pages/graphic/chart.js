export function renderChart({ type, labels, data, label, backgroundColor, title, legendPosition = "top", yAxisFormat = null }) {
  const ctx = document.getElementById("graphic").getContext("2d");
  if (window.currentChart) {
    window.currentChart.destroy();
  }
  window.currentChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: backgroundColor
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title
        },
        legend: {
          position: legendPosition
        }
      },
      scales: {
        y: yAxisFormat ? {
          beginAtZero: true,
          ticks: {
            callback: yAxisFormat
          }
        } : undefined
      }
    }
  });
}