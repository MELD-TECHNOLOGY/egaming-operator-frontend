import React from 'react';
import { StatsCard } from './StatsCard';
import { ChartCard } from './ChartCard';
import { BarChart } from './BarChart';

export const Dashboard: React.FC = () => {
  const stakingData = [
    { label: 'JAN', value: 1600, displayValue: '1.6M', color: '#22C55E' },
    { label: 'FEB', value: 1200, displayValue: '1.2M', color: '#22C55E' },
    { label: 'MAR', value: 1800, displayValue: '1.8M', color: '#22C55E' },
    { label: 'APR', value: 1400, displayValue: '1.4M', color: '#22C55E' },
    { label: 'MAY', value: 2000, displayValue: '2.0M', color: '#22C55E' },
    { label: 'JUN', value: 1600, displayValue: '1.6M', color: '#22C55E' }
  ];

  const volumeData = [
    { label: 'JAN', value: 1200, displayValue: '1.2M', color: '#3B82F6' },
    { label: 'FEB', value: 1600, displayValue: '1.6M', color: '#3B82F6' },
    { label: 'MAR', value: 1000, displayValue: '1.0M', color: '#3B82F6' },
    { label: 'APR', value: 1800, displayValue: '1.8M', color: '#3B82F6' },
    { label: 'MAY', value: 1400, displayValue: '1.4M', color: '#3B82F6' },
    { label: 'JUN', value: 2200, displayValue: '2.2M', color: '#3B82F6' }
  ];

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Overview of your game staking platform</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">202.5</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Staked"
          value="16.8M"
          change="1.6%"
          changeType="positive"
          period="Last 30 days"
        />
        <StatsCard
          title="Stakes Volume"
          value="14.1M"
          change="0.8%"
          changeType="positive"
          period="Last 30 days"
        />
        <StatsCard
          title="Active Today"
          value="1,648"
          change="1.2%"
          changeType="positive"
          period="Last 30 days"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Stakes Count Overtime"
          subtitle="Monthly stakes count performance"
        >
          <BarChart data={stakingData} title="Stakes Count" />
        </ChartCard>

        <ChartCard
          title="Stakes Volume Overtime"
          subtitle="Monthly stakes volume trends"
        >
          <BarChart data={volumeData} title="Stakes Volume" />
        </ChartCard>
      </div>
    </div>
  );
};