import React from 'react';

interface ChartBarProps {
  height: number;
  label: string;
  value: string;
  color: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ height, label, value, color }) => (
  <div className="flex flex-col items-center">
    <div className="text-xs text-gray-600 mb-2">{value}</div>
    <div 
      className="w-8 rounded-t-md"
      style={{ 
        height: `${height}%`, 
        backgroundColor: color,
        minHeight: '20px'
      }}
    />
    <div className="text-xs text-gray-500 mt-2 text-center">{label}</div>
  </div>
);

interface SimpleChartProps {
  data: Array<{
    label: string;
    value: number;
    displayValue: string;
    color: string;
  }>;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="h-full flex items-end justify-between px-4">
      {data.map((item, index) => (
        <ChartBar
          key={index}
          height={(item.value / maxValue) * 100}
          label={item.label}
          value={item.displayValue}
          color={item.color}
        />
      ))}
    </div>
  );
};