import React from 'react';
import { PROVINCES_DATA } from '../constants';
import { motion } from 'framer-motion';
import { MapPin, Trophy, Plane, Home, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  visitedIds: string[];
  onToggleProvince: (id: string) => void;
  onClear: () => void;
}

export default function Sidebar({ visitedIds, onToggleProvince, onClear }: SidebarProps) {
  const visitedProvinces = PROVINCES_DATA.filter(p => visitedIds.includes(p.id));
  const visitedCount = visitedIds.length;
  const totalCount = PROVINCES_DATA.length;
  const percentage = Math.round((visitedCount / totalCount) * 100);

  const furthestProvince = visitedProvinces.length > 0 
    ? visitedProvinces.reduce((prev, current) => (prev.distanceFromBeijing > current.distanceFromBeijing) ? prev : current)
    : null;

  return (
    <div className="flex flex-col h-full gap-8 p-8 bg-white/[0.01] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-500/20">
            BJ
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">足迹足音</h1>
            <p className="text-slate-400 text-[10px] uppercase tracking-[2px] mt-0.5">Journey Record</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-stat relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Trophy className="w-12 h-12" />
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-light text-white mb-1">
              {percentage}<span className="text-sm font-normal text-slate-500 ml-1">%</span>
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">足迹覆盖率</div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-stat">
            <div className="text-xl font-light text-white mb-1">{visitedCount}</div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">已历省份</div>
          </div>
          <div className="glass-stat">
            <div className="text-xl font-light text-white mb-1">{totalCount - visitedCount}</div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">待寻之地</div>
          </div>
        </div>
        
        {furthestProvince && (
          <div className="glass-stat bg-blue-500/5 border-blue-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="w-3 h-3 text-blue-400" />
              <div className="text-[9px] text-blue-400 uppercase tracking-[2px] font-semibold">最远抵达</div>
            </div>
            <div className="text-sm font-medium text-white">{furthestProvince.name}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{furthestProvince.distanceFromBeijing.toLocaleString()} km from Beijing</div>
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 flex flex-col min-h-0">
        <h2 className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4 px-2">足迹清单</h2>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {visitedProvinces.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-white/5 rounded-3xl">
              <p className="text-slate-600 text-sm italic">尚无足迹，开启你的旅程吧</p>
            </div>
          ) : (
            visitedProvinces.map(p => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold">
                    {p.name.substring(0, 1)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white tracking-wide">{p.name}</div>
                    <div className="text-[10px] text-slate-500">{p.capital} • {p.distanceFromBeijing}km</div>
                  </div>
                </div>
                <button 
                  onClick={() => onToggleProvince(p.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-rose-400 transition-opacity"
                  title="Remove"
                >
                  <Home className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
          <span className="text-[10px] text-slate-500 font-medium">位置: 北京·朝阳</span>
        </div>
        <button 
          onClick={() => {
            if (confirm("确定要清空所有足迹记录吗？")) {
                onClear();
            }
          }}
          className="text-[10px] text-slate-700 hover:text-blue-400 transition-colors uppercase tracking-widest font-semibold"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
