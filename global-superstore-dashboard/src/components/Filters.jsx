import React from "react";
import { Filter } from "lucide-react";

const Filters = ({ filters, setFilters, dataOptions }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const selectClasses = "bg-[rgba(18,18,18,0.8)] text-white border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 outline-none focus:border-[var(--color-neon-cyan)] transition-colors appearance-none cursor-pointer w-full text-sm";

  return (
    <div className="glass-card p-4 mb-8 flex flex-col md:flex-row items-center gap-4 z-20 relative backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[var(--color-neon-cyan)] mr-4 whitespace-nowrap">
        <Filter size={18} />
        <span className="font-semibold tracking-wider text-sm uppercase">Filters</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative">
        <div className="relative">
          <select name="year" value={filters.year} onChange={handleChange} className={selectClasses}>
            <option value="All">All Years</option>
            {dataOptions.years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select name="region" value={filters.region} onChange={handleChange} className={selectClasses}>
            <option value="All">All Regions</option>
            {dataOptions.regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select name="category" value={filters.category} onChange={handleChange} className={selectClasses}>
            <option value="All">All Categories</option>
            {dataOptions.categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select name="segment" value={filters.segment} onChange={handleChange} className={selectClasses}>
            <option value="All">All Segments</option>
            {dataOptions.segments.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
