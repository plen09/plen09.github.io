import React from 'react';
import { motion } from 'motion/react';
import { TravelEntry } from '../types';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface TravelCardProps {
  entry: TravelEntry;
  onClick: () => void;
}

const TravelCard: React.FC<TravelCardProps> = ({ entry, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={entry.images[0]}
          alt={entry.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-xs font-medium text-gray-400 uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {format(new Date(entry.date), 'yyyy.MM.dd', { locale: zhCN })}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {entry.city}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {entry.title}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {entry.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {entry.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-50 text-[10px] font-bold text-gray-400 rounded-full uppercase tracking-tighter">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-xs font-bold text-gray-900 hover:underline">阅读全文</span>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

export default TravelCard;
