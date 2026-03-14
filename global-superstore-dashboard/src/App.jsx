import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// Components
import { KPICards } from './components/KPICards';
import SalesProfitTrend from './components/Charts/SalesProfitTrend';
import SalesByCategory from './components/Charts/SalesByCategory';
import CustomerSegment from './components/Charts/CustomerSegment';
import RegionalSales from './components/Charts/RegionalSales';
import TopProducts from './components/Charts/TopProducts';
import Filters from './components/Filters';
import ParticlesBackground from './components/ParticlesBackground';

// Data loaded from public JSON

function App() {
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const [filters, setFilters] = useState({
    region: 'All',
    category: 'All',
    segment: 'All',
    year: 'All',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setRawData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter Data
  const filteredData = useMemo(() => {
    return rawData.filter((item) => {
      if (filters.region !== 'All' && item.region !== filters.region) return false;
      if (filters.category !== 'All' && item.category !== filters.category) return false;
      if (filters.segment !== 'All' && item.segment !== filters.segment) return false;
      if (filters.year !== 'All' && item.year !== filters.year) return false;
      return true;
    });
  }, [rawData, filters]);

  // Extract unique options for filters from rawData
  const dataOptions = useMemo(() => {
    const years = [...new Set(rawData.map(d => d.year))].sort();
    const regions = [...new Set(rawData.map(d => d.region))].sort();
    const categories = [...new Set(rawData.map(d => d.category))].sort();
    const segments = [...new Set(rawData.map(d => d.segment))].sort();
    return { years, regions, categories, segments };
  }, [rawData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-dark)]">
        <ParticlesBackground />
        <motion.div 
          animate={{ rotate: 360, opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-[rgba(0,243,255,0.2)] border-t-[var(--color-neon-cyan)] rounded-full z-10"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white font-sans relative pb-12">
      {/* Background Effects */}
      <ParticlesBackground />
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[rgba(0,243,255,0.15)] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[rgba(157,0,255,0.15)] rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-neon-cyan)] via-[var(--color-neon-purple)] to-[var(--color-neon-pink)]">
              Global Superstore
            </h1>
            <p className="text-gray-400 mt-2 text-sm max-w-xl">
              Interactive analytics dashboard. Review key performance indicators tailored for real-time visibility and detailed data exploration.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-neon-cyan)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-neon-cyan)]"></span>
            </span>
            <span className="text-sm text-[var(--color-neon-cyan)] font-medium tracking-widest uppercase">Live Data Mode</span>
          </div>
        </motion.div>

        {/* Filters */}
        <Filters filters={filters} setFilters={setFilters} dataOptions={dataOptions} />

        {/* Global KPI Stats */}
        <KPICards data={filteredData} />

        {/* Chart Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <SalesProfitTrend data={filteredData} />
          </div>
          <div className="lg:col-span-1">
            <CustomerSegment data={filteredData} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SalesByCategory data={filteredData} />
          </div>
          <div className="lg:col-span-1">
            <RegionalSales data={filteredData} />
          </div>
          <div className="lg:col-span-1">
            <TopProducts data={filteredData} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
