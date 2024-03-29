import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const uniqueregions = new Set();

  const chartData = data.reduce((accumulator, item) => {
    if (!uniqueregions.has(item.region)) {
      uniqueregions.add(item.region);
      accumulator.push({
        region: item.region,
        likelihood: item.likelihood,
      });
    } else {
      const existingregion = accumulator.find(
        (entry) => entry.region === item.region
      );
      if (existingregion) {
        existingregion.likelihood += item.likelihood;
      }
    }
    return accumulator;
  }, []);

  var visualData = {
    labels: chartData.map((d) => d.region),
    datasets: [
      {
        label: `likelihood`,
        data: chartData.map((d) => d.likelihood),
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
      <Doughnut data={visualData} height={400} options={options} />
    </div>
  );
};

export default PieChart;
