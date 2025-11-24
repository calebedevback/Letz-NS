import React, { useState } from 'react';
import { Place } from '../types';
import { Users, Zap } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

interface PlaceCardProps {
  place: Place;
  featured?: boolean;
  rank?: number;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, featured = false, rank }) => {
  const { user, toggleCheckIn, checkIns } = useStore();
  const [isExploding, setIsExploding] = useState(false);
  
  const isCheckedIn = checkIns.some(c => c.userId === user?.uid && c.placeId === place.id);

  const handleCheckIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCheckedIn) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 1000);
    }
    toggleCheckIn(place.id);
  };

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-md shadow-xl ${featured ? 'min-w-[85vw] h-[400px]' : 'w-full h-[280px] mb-6'}`}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={place.photo} alt={place.name} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Rank Badge */}
      {rank && (
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-neon-purple/90 flex items-center justify-center font-black text-lg text-black shadow-[0_0_15px_rgba(167,139,250,0.6)] z-10 border-2 border-white/20">
          #{rank}
        </div>
      )}

      {/* Trending Badge */}
      {place.trending && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-neon-pink/90 flex items-center gap-1 shadow-[0_0_15px_rgba(247,37,133,0.6)] z-10">
          <Zap size={14} className="text-white fill-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wide">Bombando</span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h3 className={`font-black text-white leading-none mb-1 ${featured ? 'text-3xl' : 'text-2xl'}`}>
              {place.name}
            </h3>
            <p className="text-gray-300 text-sm font-medium flex items-center gap-2">
              {place.neighborhood} • <span className="text-neon-cyan">{place.type}</span>
            </p>
          </div>
        </div>

        {/* Vibe Tags */}
        <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
          {place.vibeTags.map(tag => (
            <span key={tag} className="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-gray-200">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Stats & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="flex -space-x-2">
                {[...Array(Math.min(3, place.friendCount + 2))].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-700 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${place.id}${i}`} alt="Friend" />
                  </div>
                ))}
             </div>
             <div className="text-xs">
               <span className="block font-bold text-white">{place.currentCount} pessoas</span>
               <span className="text-neon-purple font-medium">{place.friendCount > 0 ? `+${place.friendCount} amigos` : 'Seja o primeiro'}</span>
             </div>
          </div>

          <button 
            onClick={handleCheckIn}
            className={`relative px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 overflow-hidden group ${
              isCheckedIn 
                ? 'bg-neon-purple text-black shadow-[0_0_20px_rgba(167,139,250,0.5)]' 
                : 'bg-white/20 border border-white/20 text-white hover:bg-white/30'
            }`}
          >
             {isExploding && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 rounded-full bg-white/30"
                  />
               </div>
             )}
             <span className="relative z-10 flex items-center gap-2">
               {isCheckedIn ? 'VOCÊ VAI' : 'VAI'}
               {isCheckedIn && <Users size={16} />}
             </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};