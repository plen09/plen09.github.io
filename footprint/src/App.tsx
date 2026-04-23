/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChinaMap from './components/ChinaMap';
import { PROVINCES_DATA } from './constants';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'china-footprint-visited';

export default function App() {
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setVisitedIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved footprint', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visitedIds));
    }
  }, [visitedIds, isLoaded]);

  const handleToggleProvince = (id: string) => {
    setVisitedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  if (!isLoaded) return null;

  return (
    <div className="relative w-full h-screen bg-[#050508] text-slate-200 font-sans overflow-hidden flex items-center justify-center p-4 md:p-8">
      {/* Background Mesh Gradients */}
      <div className="mesh-gradient-1" />
      <div className="mesh-gradient-2" />
      <div className="mesh-gradient-3" />

      {/* Main Glass Layout Container */}
      <div className="w-full max-w-7xl h-full glass-card rounded-[40px] flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-full md:w-80 lg:w-96 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5 z-20">
          <Sidebar 
            visitedIds={visitedIds} 
            onToggleProvince={handleToggleProvince} 
            onClear={() => setVisitedIds([])}
          />
        </aside>

        {/* Main Content (Map) */}
        <main className="flex-1 relative flex flex-col min-w-0">
          {/* Navigation Bar / Tabs */}
          <div className="flex gap-8 px-10 py-6 border-b border-white/5 bg-white/[0.02]">
            <button className="text-white border-b-2 border-blue-500 pb-1 text-sm font-medium tracking-wide">足迹地图</button>
            <button className="text-slate-400 hover:text-white transition-colors pb-1 text-sm font-medium tracking-wide">旅行日志</button>
            <button className="text-slate-400 hover:text-white transition-colors pb-1 text-sm font-medium tracking-wide">年度回顾</button>
          </div>

          <div className="flex-1 p-4 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
            {/* Top Bar for Mobile (Optional, hidden by CSS layout mostly) */}
            <div className="flex md:hidden items-center justify-between px-2 pt-2 pb-4">
              <h1 className="text-xl font-bold text-white tracking-tight">足迹足音</h1>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {visitedIds.length} / {PROVINCES_DATA.length}
              </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 min-h-[500px]">
              <ChinaMap 
                visitedIds={visitedIds}
                onToggleProvince={handleToggleProvince}
                selectedId={selectedId}
                onSelectProvince={setSelectedId}
              />
            </div>

            {/* Quote / Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center pt-8 pb-4"
            >
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-light mb-4">
                “ 读万卷书，行万里路 ”
              </p>
              <div className="flex items-center justify-center gap-6 opacity-30">
                <div className="h-px w-8 bg-white/20" />
                <div className="text-[9px] text-slate-500 font-mono tracking-widest">EST. 2024 • VIBE CODING × HEXO</div>
                <div className="h-px w-8 bg-white/20" />
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Hexo Tip Overlay */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => alert("本页面采用 Frosted Glass 设计语言，完美适配现代 Hexo 博客。")}
          className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-white rounded-2xl transition-all shadow-2xl group"
          title="Theme Info"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

