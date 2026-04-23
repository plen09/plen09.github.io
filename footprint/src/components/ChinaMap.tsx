import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line
} from "react-simple-maps";
import { GEO_URL, PROVINCES_DATA } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const BEIJING_COORDS: [number, number] = [116.4074, 39.9042];

interface ChinaMapProps {
  visitedIds: string[];
  onToggleProvince: (id: string) => void;
  selectedId: string | null;
  onSelectProvince: (id: string) => void;
}

export default function ChinaMap({
  visitedIds,
  onToggleProvince,
  selectedId,
  onSelectProvince
}: ChinaMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Map projection settings for China
  const projectionConfig = {
    center: [105, 36] as [number, number],
    scale: 850,
  };

  return (
    <div className="relative w-full h-[600px] md:h-[750px] bg-white/[0.02] overflow-hidden rounded-[32px] border border-white/10 shadow-inner group">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.05),transparent)]" />
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={projectionConfig}
        className="w-full h-full"
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const province = PROVINCES_DATA.find(p => 
                geo.properties.name.includes(p.name) || p.name.includes(geo.properties.name)
              );
              const id = province?.id || geo.rsmKey;
              const isVisited = visitedIds.includes(id);
              const isSelected = selectedId === id;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => province && setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => province && onToggleProvince(id)}
                  style={{
                    default: {
                      fill: isVisited ? "#3b82f6" : "rgba(255,255,255,0.03)",
                      stroke: isSelected ? "#fff" : "rgba(255,255,255,0.1)",
                      strokeWidth: isSelected ? 1.5 : 0.5,
                      outline: "none",
                      transition: "all 300ms",
                    },
                    hover: {
                      fill: isVisited ? "#60a5fa" : "rgba(255,255,255,0.08)",
                      stroke: "rgba(255,255,255,0.3)",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#2563eb",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Lines from Beijing for visited places */}
        {visitedIds.map(id => {
          const p = PROVINCES_DATA.find(prov => prov.id === id);
          if (!p || id === "11" || !p.coords) return null;
          
          return (
            <Line
              key={`line-${id}`}
              from={BEIJING_COORDS}
              to={p.coords as [number, number]}
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeOpacity={0.15}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Beijing Marker */}
        <Marker coordinates={BEIJING_COORDS}>
          <circle r={6} fill="#3b82f6" className="animate-pulse" />
          <circle r={3} fill="#fff" />
          <text
            textAnchor="middle"
            y={-15}
            style={{ fontFamily: "Inter", fill: "#fff", fontSize: 10, fontWeight: "bold", letterSpacing: "1px" }}
          >
            BEIJING
          </text>
        </Marker>
      </ComposableMap>

      {/* Info Overlay */}
      <div className="absolute bottom-10 right-10 w-72 backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl transition-all">
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <h3 className="text-lg font-semibold text-white tracking-tight">
              {hoveredId ? PROVINCES_DATA.find(p => p.id === hoveredId)?.name : "探索版图"}
            </h3>
            {hoveredId && (
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {visitedIds.includes(hoveredId) ? "已点亮" : "待出发"}
                </span>
            )}
        </div>
        <p className="text-slate-400 text-xs leading-relaxed font-medium">
          {hoveredId 
            ? `该省份距离中心城市北京约为 ${PROVINCES_DATA.find(p => p.id === hoveredId)?.distanceFromBeijing.toLocaleString()} 公里。`
            : "漫步华夏大地，每一站都是时光的印记。点击地图点亮你的足迹，见证属于你的地理诗篇。"}
        </p>
      </div>

      {/* Legend */}
      <div className="absolute top-10 left-10 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
          <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">已点亮足迹</span>
        </div>
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">暂未抵达</span>
        </div>
      </div>
    </div>
  );
}
