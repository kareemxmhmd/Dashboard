import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, ShoppingCart } from "lucide-react";

const KPICard = ({ title, value, icon, delay, prefix = "", suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(value * easeOutQuart);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [value]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2);
    if (num >= 1000) return (num / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 }) + "K";
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const isMillion = value >= 1000000;
  const suffixStr = typeof value === 'number' ? (isMillion && !suffix ? 'M' : suffix) : suffix;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-6 flex items-center justify-between relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,243,255,0.05)] to-[rgba(157,0,255,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div>
        <p className="text-[var(--color-neon-cyan)] text-sm font-semibold tracking-wider uppercase mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-white flex items-center gap-1 neon-text">
          {prefix}{typeof value === 'number' ? formatNumber(displayValue) : displayValue}{suffixStr}
        </h3>
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <TrendingUp size={12} className="text-green-400" />
          <span className="text-green-400 font-medium">+15.2%</span> vs last year
        </p>
      </div>

      <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-[rgba(255,255,255,0.1)] group-hover:border-[var(--color-neon-cyan)] transition-colors duration-300">
        {icon}
      </div>
    </motion.div>
  );
};

export const KPICards = ({ data }) => {
  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
  const totalOrders = data.length;
  // Unique customers approximation based on segments
  const totalCustomers = Math.floor(totalOrders * 0.67);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 z-10 relative">
      <KPICard 
        title="Total Sales" 
        value={totalSales} 
        prefix="$"
        icon={<DollarSign className="text-[var(--color-neon-cyan)]" size={24} />} 
        delay={0.1} 
      />
      <KPICard 
        title="Total Profit" 
        value={totalProfit} 
        prefix="$"
        icon={<TrendingUp className="text-[var(--color-neon-purple)]" size={24} />} 
        delay={0.2} 
      />
      <KPICard 
        title="Total Orders" 
        value={totalOrders} 
        icon={<ShoppingCart className="text-[var(--color-neon-pink)]" size={24} />} 
        delay={0.3} 
      />
      <KPICard 
        title="Total Customers" 
        value={totalCustomers} 
        icon={<Users className="text-[#00ff9d]" size={24} />} 
        delay={0.4} 
      />
    </div>
  );
};
