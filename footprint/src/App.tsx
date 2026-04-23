/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Map as MapIcon, Book, Globe, Compass, Filter, ChevronDown, Menu } from 'lucide-react';
import ChinaMap from './components/ChinaMap';
import TravelCard from './components/TravelCard';
import JournalModal from './components/JournalModal';
import { travelData } from './mockData';
import { TravelEntry } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<TravelEntry | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'gallery'>('map');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    travelData.forEach(entry => entry.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredEntries = useMemo(() => {
    return travelData.filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || entry.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none uppercase">Footprints</h1>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Travel Journal</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setViewMode('map')}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-all",
                viewMode === 'map' ? "text-blue-600" : "text-gray-400 hover:text-gray-900"
              )}
            >
              足迹地图
            </button>
            <button 
              onClick={() => setViewMode('gallery')}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-all",
                viewMode === 'gallery' ? "text-blue-600" : "text-gray-400 hover:text-gray-900"
              )}
            >
              游记灵感
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="搜索目的地或故事..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/20 rounded-full text-sm font-medium transition-all w-64 outline-none"
              />
            </div>
            <button className="md:hidden p-2 text-gray-900">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-20">
        {/* Full Screen Map / Header */}
        <section className="relative px-6 py-12 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                  <Globe className="w-3.5 h-3.5" />
                  以北京为基准 · 走向全国
                </div>
                <h2 className="text-6xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">
                  你的旅行<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">足迹与故事</span>
                </h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10 max-w-md">
                  这里记录了从北京出发的每一次冒险。每一个点都是一段回忆，每一篇文章都是一次生命的印记。
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 w-32 hover:border-blue-500 transition-colors">
                    <div className="text-3xl font-black text-gray-900 mb-1">{travelData.length}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">记录篇章</div>
                  </div>
                  <div className="text-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 w-32 hover:border-blue-500 transition-colors">
                    <div className="text-3xl font-black text-gray-900 mb-1">{new Set(travelData.map(e => e.province)).size}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">踏过省份</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-8 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-gray-200/50 border border-white h-[600px] overflow-hidden"
              >
                <ChinaMap 
                  entries={filteredEntries} 
                  onCityClick={(city) => {
                    const entry = travelData.find(e => e.city === city);
                    if (entry) setSelectedEntry(entry);
                  }}
                />
              </motion.div>
              
              {/* Floating Tooltip/Hint */}
              <div className="absolute -bottom-6 -left-6 bg-black text-white p-6 rounded-3xl shadow-2xl hidden md:block max-w-64">
                <div className="flex items-center gap-3 mb-2">
                  <MapIcon className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-black uppercase tracking-widest">交互建议</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  点击地图上的光圈，或搜索特定的城市，开启一段尘封的往事。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Gallery */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4 flex items-center gap-4">
                游记归档
                <Book className="w-8 h-8 text-blue-600" />
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                    !selectedTag ? "bg-black text-white" : "bg-white text-gray-400 hover:bg-gray-100"
                  )}
                >
                  全部故事
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                      selectedTag === tag ? "bg-black text-white" : "bg-white text-gray-400 hover:bg-gray-100"
                    )}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <Filter className="w-4 h-4" />
              <span>显示 {filteredEntries.length} 篇结果</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map(entry => (
                <TravelCard 
                  key={entry.id} 
                  entry={entry} 
                  onClick={() => setSelectedEntry(entry)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredEntries.length === 0 && (
            <div className="py-32 text-center">
              <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <p className="text-xl font-bold text-gray-400">没有找到相关故事...</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedTag(null);}}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                清除所有过滤项
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Compass className="w-5 h-5 text-gray-900" />
              </div>
              <h1 className="text-lg font-black tracking-tight uppercase">Footprints</h1>
            </div>
            <p className="text-gray-400 text-sm font-medium">
              Made with passion for explorers and storytellers.
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">Hexo Theme</a>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">Github</a>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">Connect</a>
          </div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            © 2024 Beijing Traveler
          </div>
        </div>
      </footer>

      <JournalModal 
        entry={selectedEntry} 
        onClose={() => setSelectedEntry(null)} 
      />
    </div>
  );
}
