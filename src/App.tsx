import React, { useState } from 'react';
import { Sidebar } from './screens/Sidebar';
import { Dashboard } from './screens/Dashboard';
import { Reports } from './screens/Reports';
import { Settings } from './screens/Settings';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'reports' | 'settings'>('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      {activeView === 'dashboard' && <Dashboard />}
      {activeView === 'reports' && <Reports />}
      {activeView === 'settings' && <Settings />}
    </div>
  );
};