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

const RegionalSales = ({ data }) => {
  const chartData = useMemo(() => {
    const regions = data.reduce((acc, curr) => {
      if (!acc[curr.region]) acc[curr.region] = { region: curr.region, sales: 0 };
      acc[curr.region].sales += curr.sales;
      return acc;
    }, {});

    return Object.values(regions).sort((a, b) => b.sales - a.sales);
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[rgba(18,18,18,0.9)] p-4 border border-[rgba(157,0,255,0.2)] rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-white font-medium mb-1">{label}</p>
          <p className="text-sm font-semibold text-[#9d00ff]">
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
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card p-6 h-96 w-full"
    >
      <h3 className="text-[#9d00ff] text-sm font-semibold tracking-wider uppercase mb-4 neon-text">
        Regional Sales
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart 
          data={chartData} 
          layout="vertical"
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis 
            type="number"
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value >= 1000 ? value / 1000 + 'k' : value}`}
          />
          <YAxis 
            type="category"
            dataKey="region" 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
          <Bar dataKey="sales" radius={[0, 8, 8, 0]} animationDuration={1500} fill="#9d00ff">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`rgba(157,0,255,${0.5 + Math.min(index * 0.1, 0.5)})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default RegionalSales;
