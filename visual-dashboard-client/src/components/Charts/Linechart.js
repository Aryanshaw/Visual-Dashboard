import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const uniquetopics = new Set();

  const chartData = data.reduce((accumulator, item) => {
    if (!uniquetopics.has(item.topic)) {
      uniquetopics.add(item.topic);
      accumulator.push({
        topic: item.topic,
        relevance: item.relevance,
      });
    } else {
      const existingtopic = accumulator.find(
        (entry) => entry.topic === item.topic
      );
      if (existingtopic) {
        existingtopic.relevance += item.relevance;
      }
    }
    return accumulator;
  }, []);

  var visualData = {
    labels: chartData.map((d) => d.topic),
    datasets: [
      {
        label: `Relevance`,
        data: chartData.map((d) => d.relevance),
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
      <Line data={visualData} height={400} options={options} />
    </div>
  );
};

export default LineChart;
