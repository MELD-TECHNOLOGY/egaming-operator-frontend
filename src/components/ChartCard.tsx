import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      <div className="h-64">
        {children}
      </div>
    </div>
  );
};