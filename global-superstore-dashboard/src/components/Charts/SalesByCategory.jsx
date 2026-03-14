import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#00f3ff", "#9d00ff", "#ff00ea"];

const SalesByCategory = ({ data }) => {
  const chartData = useMemo(() => {
    const categories = data.reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = { category: curr.category, sales: 0 };
      acc[curr.category].sales += curr.sales;
      return acc;
    }, {});

    return Object.values(categories).sort((a, b) => b.sales - a.sales);
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[rgba(18,18,18,0.9)] p-4 border border-[rgba(255,0,234,0.2)] rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-white font-medium mb-1">{label}</p>
          <p className="text-sm font-semibold text-[var(--color-neon-pink)]">
            Sales: ${payload[0].value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card p-6 h-96 w-full"
    >
      <h3 className="text-[var(--color-neon-pink)] text-sm font-semibold tracking-wider uppercase mb-4 neon-text">
        Sales by Category
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient key={`gradient-${index}`} id={`colorUv${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                <stop offset="95%" stopColor={color} stopOpacity={0.2} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="category" 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value >= 1000 ? value / 1000 + 'k' : value}`}
          />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
          <Bar dataKey="sales" radius={[8, 8, 0, 0]} animationDuration={1500}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#colorUv${index % COLORS.length})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SalesByCategory;
