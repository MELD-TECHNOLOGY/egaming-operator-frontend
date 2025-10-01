import React, { useState } from 'react';
import { Calendar, ChevronDown, Download } from 'lucide-react';
import { StatsCard } from '../../components/StatsCard';

interface ReportData {
  stakeId: string;
  customerName: string;
  gamePlayed: string;
  amount: string;
  winnings: string;
  location: string;
  lga: string;
  date: string;
  rawDate: Date;
  operator: string;
}

// Generate more sample data for better pagination testing
const generateMockData = (): ReportData[] => {
  const baseData = [
  {
    stakeId: 'ST001',
    customerName: 'Ralph Edwards',
    gamePlayed: 'Sporty Hero',
    amount: '₦ 32,253',
    winnings: '₦ 32,253',
    location: 'Enugu City',
    lga: 'Enugu East',
    date: '2025-01-15 2:30 PM',
    rawDate: new Date('2025-01-15'),
    operator: 'SportyBet'
  },
  {
    stakeId: 'ST002',
    customerName: 'Courtney Henry',
    gamePlayed: 'Lotto',
    amount: '₦ 32,253',
    winnings: '₦ 32,253',
    location: 'Enugu City',
    lga: 'Enugu East',
    date: '2025-01-15 2:30 PM',
    rawDate: new Date('2025-01-15'),
    operator: 'BetNaija'
  },
  {
    stakeId: 'ST003',
    customerName: 'Kristin Watson',
    gamePlayed: 'Sporty Football',
    amount: '₦ 32,253',
    winnings: '₦ 32,253',
    location: 'Enugu City',
    lga: 'Enugu East',
    date: '2025-01-15 2:30 PM',
    rawDate: new Date('2025-01-15'),
    operator: 'SportyBet'
  },
  {
    stakeId: 'ST004',
    customerName: 'Cody Fisher',
    gamePlayed: 'Baba Ijebu',
    amount: '₦ 32,253',
    winnings: '₦ 32,253',
    location: 'Enugu City',
    lga: 'Enugu East',
    date: '2025-01-15 2:30 PM',
    rawDate: new Date('2025-01-15'),
    operator: 'Bet9ja'
  },
  {
    stakeId: 'ST005',
    customerName: 'Jane Cooper',
    gamePlayed: 'Premier Lotto',
    amount: '₦ 45,000',
    winnings: '₦ 45,000',
    location: 'Enugu City',
    lga: 'Enugu North',
    date: '2025-01-16 3:45 PM',
    rawDate: new Date('2025-01-16'),
    operator: 'BetNaija'
  },
  {
    stakeId: 'ST006',
    customerName: 'Robert Fox',
    gamePlayed: 'Virtual Football',
    amount: '₦ 15,500',
    winnings: '₦ 15,500',
    location: 'Enugu City',
    lga: 'Enugu South',
    date: '2025-01-14 1:20 PM',
    rawDate: new Date('2025-01-14'),
    operator: 'Bet9ja'
  }
  ];

  // Generate additional records for pagination testing
  const additionalData: ReportData[] = [];
  const names = ['John Doe', 'Sarah Wilson', 'Mike Johnson', 'Lisa Brown', 'David Lee', 'Emma Davis', 'Chris Taylor', 'Anna White'];
  const games = ['Sporty Hero', 'Lotto', 'Baba Ijebu', 'Premier Lotto', 'Virtual Football', 'Sporty Football'];
  const operators = ['SportyBet', 'BetNaija', 'Bet9ja'];
  const lgas = ['Enugu East', 'Enugu North', 'Enugu South'];

  for (let i = 7; i <= 150; i++) {
    const randomDate = new Date(2025, 0, Math.floor(Math.random() * 20) + 1);
    additionalData.push({
      stakeId: `ST${i.toString().padStart(3, '0')}`,
      customerName: names[Math.floor(Math.random() * names.length)],
      gamePlayed: games[Math.floor(Math.random() * games.length)],
      amount: `₦ ${(Math.random() * 50000 + 10000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      winnings: `₦ ${(Math.random() * 50000 + 10000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      location: 'Enugu City',
      lga: lgas[Math.floor(Math.random() * lgas.length)],
      date: `${randomDate.toISOString().split('T')[0]} ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      rawDate: randomDate,
      operator: operators[Math.floor(Math.random() * operators.length)]
    });
  }

  return [...baseData, ...additionalData];
};

const mockReportData = generateMockData();

const operators = ['All Operators', 'SportyBet', 'BetNaija', 'Bet9ja'];
const lgas = ['All LGAs', 'Enugu East', 'Enugu North', 'Enugu South'];

export const Reports: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<ReportData[]>(mockReportData);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    operator: 'All Operators',
    lga: 'All LGAs'
  });
  
  const resultsPerPage = 10;
  const totalResults = filteredData.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  
  // Get current page data
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const convertToCSV = (data: ReportData[]): string => {
    const headers = ['Stake ID', 'Customer Name', 'Game Played', 'Amount', 'Winnings', 'Location', 'LGA', 'Date'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.stakeId,
        `"${row.customerName}"`,
        `"${row.gamePlayed}"`,
        `"${row.amount}"`,
        `"${row.winnings}"`,
        `"${row.location}"`,
        row.lga,
        `"${row.date}"`
      ].join(','))
    ].join('\n');
    
    return csvContent;
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csvContent = convertToCSV(filteredData);
    const filename = `stakes-report-${new Date().toISOString().split('T')[0]}.csv`;
    downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
  };

  const handleExportPDF = () => {
    // Create a simple HTML table for PDF generation
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Stakes Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .header { text-align: center; margin-bottom: 20px; }
          .date { font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Stakes Report</h1>
          <p class="date">Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Total Records: ${filteredData.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Stake ID</th>
              <th>Customer Name</th>
              <th>Game Played</th>
              <th>Amount</th>
              <th>Winnings</th>
              <th>Location</th>
              <th>LGA</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${filteredData.map(row => `
              <tr>
                <td>${row.stakeId}</td>
                <td>${row.customerName}</td>
                <td>${row.gamePlayed}</td>
                <td>${row.amount}</td>
                <td>${row.winnings}</td>
                <td>${row.location}</td>
                <td>${row.lga}</td>
                <td>${row.date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    const filename = `stakes-report-${new Date().toISOString().split('T')[0]}.html`;
    downloadFile(htmlContent, filename, 'text/html;charset=utf-8;');
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    let filtered = [...mockReportData];

    // Filter by date range
    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      filtered = filtered.filter(item => item.rawDate >= fromDate);
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      filtered = filtered.filter(item => item.rawDate <= toDate);
    }

    // Filter by operator
    if (filters.operator !== 'All Operators') {
      filtered = filtered.filter(item => item.operator === filters.operator);
    }

    // Filter by LGA
    if (filters.lga !== 'All LGAs') {
      filtered = filtered.filter(item => item.lga === filters.lga);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const paginationRange = getPaginationRange();

  const renderPaginationButton = (page: number | string, isActive = false) => (
    <button
      key={page}
      onClick={() => typeof page === 'number' && goToPage(page)}
      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : typeof page === 'string' 
            ? 'text-gray-400 cursor-default'
            : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
      }`}
      disabled={typeof page === 'string'}
    >
      {page}
    </button>
  );

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Check all Stakes and Winnings Reports here</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Stakes Count"
          value={filteredData.length.toLocaleString()}
          change=""
          changeType="positive"
          period=""
        />
        <StatsCard
          title="Active Operators"
          value={new Set(filteredData.map(item => item.operator)).size.toString()}
          change=""
          changeType="positive"
          period=""
        />
        <StatsCard
          title="Total Amount"
          value="₦1.8M"
          change=""
          changeType="positive"
          period=""
        />
        <StatsCard
          title="Total Winnings"
          value="₦1.8M"
          change=""
          changeType="positive"
          period=""
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Filters</h3>
        <div className="flex flex-wrap items-center gap-4">
          {/* From Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => handleFilterChange('fromDate', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="From Date"
            />
          </div>

          {/* Separator */}
          <span className="text-gray-400">-</span>

          {/* To Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => handleFilterChange('toDate', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="To Date"
            />
          </div>

          {/* All Operators */}
          <select
            value={filters.operator}
            onChange={(e) => handleFilterChange('operator', e.target.value)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {operators.map(operator => (
              <option key={operator} value={operator}>{operator}</option>
            ))}
          </select>

          {/* All LGAs */}
          <select
            value={filters.lga}
            onChange={(e) => handleFilterChange('lga', e.target.value)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {lgas.map(lga => (
              <option key={lga} value={lga}>{lga}</option>
            ))}
          </select>

          {/* Apply Filters Button */}
          <button 
            onClick={applyFilters}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Reports</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Stake ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    Customer Name
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    Game Played
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    Amount
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Winnings</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    LGA
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    Date
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPageData.map((row) => (
                <tr key={row.stakeId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.stakeId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.gamePlayed}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.winnings}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.lga}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {paginationRange.map((page, index) => 
                renderPaginationButton(page, page === currentPage)
              )}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of {totalResults.toLocaleString()} results
          </div>
        </div>
      </div>
    </div>
  );
};