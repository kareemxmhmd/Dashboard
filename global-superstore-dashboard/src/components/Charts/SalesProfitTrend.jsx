import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const SalesProfitTrend = ({ data }) => {
  const chartData = useMemo(() => {
    const monthly = data.reduce((acc, curr) => {
      const month = curr.date.substring(0, 7); // YYYY-MM
      if (!acc[month]) acc[month] = { date: month, sales: 0, profit: 0 };
      acc[month].sales += curr.sales;
      acc[month].profit += curr.profit;
      return acc;
    }, {});

    return Object.values(monthly).sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[rgba(18,18,18,0.9)] p-4 border border-[rgba(0,243,255,0.2)] rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 h-96 w-full"
    >
      <h3 className="text-[var(--color-neon-cyan)] text-sm font-semibold tracking-wider uppercase mb-4 neon-text">
        Sales & Profit Trend
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9d00ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#9d00ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="date" 
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
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Line 
            type="monotone" 
            dataKey="sales" 
            name="Sales" 
            stroke="#00f3ff" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#00f3ff", stroke: "#fff", strokeWidth: 2 }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="profit" 
            name="Profit" 
            stroke="#9d00ff" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#9d00ff", stroke: "#fff", strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SalesProfitTrend;
