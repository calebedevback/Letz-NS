import React from 'react';
import { useStore } from '../store';
import { PlaceCard } from '../components/PlaceCard';
import { Zap, TrendingUp, Users } from '../components/Icons';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const places = useStore(state => state.places);
  const checkIns = useStore(state => state.checkIns);
  const user = useStore(state => state.user);

  // Sort Logic
  const trendingPlaces = [...places].sort((a, b) => b.currentCount - a.currentCount).slice(0, 3);
  const feedPlaces = [...places].sort((a, b) => b.currentCount - a.currentCount).slice(3);

  const totalActive = checkIns.length * 12; // Fake multiplier for "vibe"
  const friendCount = 11; // Dynamic header data

  return (
    <div className="pb-24 pt-6">
      {/* Header */}
      <div className="px-6 mb-8">
         <h1 className="text-3xl font-black leading-tight mb-2">
           <span className="text-gray-400 text-lg block font-semibold mb-1">Boa noite, {user?.name?.split(' ')[0]}</span>
           SP tá com <span className="text-neon-cyan">{totalActive} rolês</span> bombando agora.
         </h1>
         <div className="flex gap-3 mt-4">
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold text-neon-pink">
               <Users size={14} />
               {friendCount} amigos online
            </div>
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold text-neon-purple">
               <TrendingUp size={14} />
               Vila Madalena em alta
            </div>
         </div>
      </div>

      {/* Top 3 Horizontal Scroll */}
      <div className="mb-10">
        <div className="px-6 mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="text-neon-cyan fill-neon-cyan" size={20} />
            TOP 3 AGORA
          </h2>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar px-6 pb-8 snap-x snap-mandatory gap-6">
          {trendingPlaces.map((place, index) => (
             <div key={place.id} className="snap-center shrink-0">
               <PlaceCard place={place} featured rank={index + 1} />
             </div>
          ))}
        </div>
      </div>

      {/* Main Feed */}
      <div className="px-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="text-neon-purple" size={20} />
          Próximas 12h
        </h2>
        
        <div className="space-y-6">
           {feedPlaces.map((place, index) => (
             <motion.div
               key={place.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
             >
               <PlaceCard place={place} />
             </motion.div>
           ))}
        </div>

        <div className="h-20 flex items-center justify-center text-gray-600 text-sm font-medium uppercase tracking-widest mt-8">
           Fim dos rolês por perto
        </div>
      </div>
    </div>
  );
};