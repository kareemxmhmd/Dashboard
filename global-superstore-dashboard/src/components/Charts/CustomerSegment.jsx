import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#00f3ff", "#9d00ff", "#ff00ea"];

const CustomerSegment = ({ data }) => {
  const chartData = useMemo(() => {
    const segments = data.reduce((acc, curr) => {
      if (!acc[curr.segment]) acc[curr.segment] = { name: curr.segment, value: 0 };
      acc[curr.segment].value += curr.sales;
      return acc;
    }, {});
    return Object.values(segments).sort((a, b) => b.value - a.value);
  }, [data]);

  const totalSales = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[rgba(18,18,18,0.9)] p-4 border border-[rgba(255,255,255,0.1)] rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-white font-medium mb-1">{payload[0].name}</p>
          <p className="text-sm font-semibold" style={{ color: payload[0].payload.fill }}>
            ${payload[0].value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            <span className="text-gray-400 ml-2 text-xs">
              ({((payload[0].value / totalSales) * 100).toFixed(1)}%)
            </span>
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
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-6 h-96 w-full relative"
    >
      <h3 className="text-[#00f3ff] text-sm font-semibold tracking-wider uppercase mb-4 neon-text">
        Customer Segment
      </h3>
      <div className="absolute inset-0 flex items-center justify-center top-10 pointer-events-none">
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest">Total</p>
          <p className="text-white text-xl font-bold">
            ${totalSales >= 1000000 ? (totalSales / 1000000).toFixed(1) + "M" : (totalSales / 1000).toFixed(1) + "K"}
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36}/>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1500}
            animationBegin={200}
            stroke="rgba(0,0,0,0)"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CustomerSegment;
