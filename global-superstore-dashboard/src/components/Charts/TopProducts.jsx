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

const TopProducts = ({ data }) => {
  const chartData = useMemo(() => {
    const products = data.reduce((acc, curr) => {
      if (!acc[curr.productName]) acc[curr.productName] = { name: curr.productName, sales: 0 };
      acc[curr.productName].sales += curr.sales;
      return acc;
    }, {});

    return Object.values(products)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);
  }, [data]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[rgba(18,18,18,0.9)] p-4 border border-[rgba(0,243,255,0.2)] rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-white font-medium mb-1">{payload[0].payload.name}</p>
          <p className="text-sm font-semibold text-[#00f3ff]">
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
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card p-6 h-[450px] w-full"
    >
      <h3 className="text-[#00f3ff] text-sm font-semibold tracking-wider uppercase mb-4 neon-text">
        Top 10 Products by Sales
      </h3>
      <ResponsiveContainer width="100%" height="95%">
        <BarChart 
          data={chartData} 
          layout="vertical"
          margin={{ top: 10, right: 30, left: 60, bottom: 0 }}
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
            dataKey="name" 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
          <Bar dataKey="sales" radius={[0, 8, 8, 0]} animationDuration={1500}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index < 3 ? '#00f3ff' : `rgba(0,243,255,${0.8 - index * 0.05})`} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default TopProducts;
