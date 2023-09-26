import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = ({ data }) => {
  const uniqueSectors = new Set();

  const chartData = data.reduce((accumulator, item) => {
    if (!uniqueSectors.has(item.sector)) {
      uniqueSectors.add(item.sector);
      accumulator.push({
        sector: item.sector,
        intensity: item.intensity,
      });
    } else {
      const existingSector = accumulator.find(
        (entry) => entry.sector === item.sector
      );
      if (existingSector) {
        existingSector.intensity += item.intensity;
      }
    }
    return accumulator;
  }, []);

  var visualData = {
    labels: chartData.map((d) => d.sector),
    datasets: [
      {
        label: `Intensity`,
        data: chartData.map((d) => d.intensity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Bar data={visualData} height={400} options={options} />
    </div>
  );
};

export default BarChart;
