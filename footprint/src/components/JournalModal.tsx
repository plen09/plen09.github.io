import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, Share2, Heart, MessageSquare } from 'lucide-react';
import { TravelEntry } from '../types';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface JournalModalProps {
  entry: TravelEntry | null;
  onClose: () => void;
}

const JournalModal: React.FC<JournalModalProps> = ({ entry, onClose }) => {
  if (!entry) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left: Content Card */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
            <header className="mb-10">
              <div className="flex items-center gap-4 mb-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(entry.date), 'yyyy MMMM do', { locale: zhCN })}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  {entry.city}, {entry.province}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                {entry.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                {entry.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-gray-100 text-xs font-bold text-gray-500 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            <article className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
              {entry.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <p className="itallic pt-8 text-gray-400">—— 记录于 {entry.city}</p>
            </article>

            {/* Interactions */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-bold">128</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm font-bold">24</span>
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Share</span>
              </button>
            </div>
          </div>

          {/* Right: Media Section */}
          <div className="hidden md:block w-[40%] h-full bg-gray-50">
            <div className="h-full flex flex-col p-4 gap-4">
              {entry.images.length > 0 && (
                <div className="flex-1 rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={entry.images[0]}
                    alt={entry.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {entry.images.length > 0 && (
                <div className="h-[200px] flex gap-4">
                   <div className="flex-1 bg-gray-200 rounded-xl overflow-hidden animate-pulse"></div>
                   <div className="flex-1 bg-gray-200 rounded-xl overflow-hidden animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JournalModal;
