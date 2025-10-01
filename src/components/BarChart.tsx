import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    displayValue: string;
    color: string;
  }>;
  title?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: title || 'Data',
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const item = data[context.dataIndex];
            return `${item.displayValue}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: '500' as const,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: {
          topLeft: 8,
          topRight: 8,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};