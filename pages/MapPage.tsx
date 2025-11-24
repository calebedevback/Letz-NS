import React, { useState } from 'react';
import { useStore } from '../store';
import { MapPin, Navigation, Users } from '../components/Icons';
import { Place } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const MapPage: React.FC = () => {
  const places = useStore(state => state.places);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [filter, setFilter] = useState('Todos');

  const filters = ['Todos', 'Balada', 'Bar', 'After', 'Grátis'];

  // Mock Map Visuals since we don't have a valid Google Maps Key
  // We project the lat/long to a relative % container for visual demo purposes
  const getRelativePos = (lat: number, lng: number) => {
     // Bounds roughly around central SP hotspots
     const minLat = -23.60;
     const maxLat = -23.52;
     const minLng = -46.70;
     const maxLng = -46.63;

     const y = ((lat - minLat) / (maxLat - minLat)) * 100;
     const x = ((lng - minLng) / (maxLng - minLng)) * 100;
     
     return { top: `${100 - y}%`, left: `${x}%` };
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full bg-[#111] overflow-hidden">
      {/* Filter Chips */}
      <div className="absolute top-4 left-0 w-full z-20 px-4 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/10 backdrop-blur-md ${filter === f ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-black/60 text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Map Layer */}
      <div className="w-full h-full relative opacity-80">
        {/* Dark Mode Map Background Placeholder */}
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-46.65, -23.55,12/800x1200?access_token=pk.mock')] bg-cover bg-center grayscale brightness-50" style={{backgroundColor: '#1a1a1a'}}>
           {/* Grid lines to simulate map if image fails */}
           <div className="w-full h-full opacity-10" style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        {/* Render Pins */}
        {places.map(place => {
           const pos = getRelativePos(place.lat, place.lng);
           const isSelected = selectedPlace?.id === place.id;
           const scale = Math.min(1 + (place.currentCount / 500), 2); // Size based on popularity

           return (
             <div 
               key={place.id}
               className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10"
               style={pos}
               onClick={() => setSelectedPlace(place)}
             >
                <div className="relative flex items-center justify-center">
                   {/* Pulse Ring */}
                   <div 
                    className={`absolute rounded-full opacity-50 animate-pulse-fast ${place.trending ? 'bg-neon-pink' : 'bg-neon-purple'}`}
                    style={{ width: `${40 * scale}px`, height: `${40 * scale}px` }} 
                   />
                   {/* Core Pin */}
                   <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)] ${place.trending ? 'bg-neon-pink' : 'bg-neon-purple'}`} />
                </div>
             </div>
           );
        })}

        {/* User Location */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
           <div className="w-20 h-20 bg-neon-cyan/20 rounded-full animate-ping absolute top-0 left-0"></div>
           <div className="w-4 h-4 bg-neon-cyan border-2 border-white rounded-full relative z-10 shadow-[0_0_20px_#22d3ee]"></div>
        </div>
      </div>

      {/* "My Friends" Floating Button */}
      <button className="absolute right-4 bottom-8 bg-black/80 backdrop-blur-md border border-white/20 text-white p-3 rounded-full shadow-lg z-20 flex items-center gap-2">
        <Users size={20} className="text-neon-purple" />
      </button>

      {/* Selected Place Popup */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 w-full z-30 rounded-t-[2rem] overflow-hidden"
          >
             <div className="glass-panel border-t border-white/20 p-0 bg-[#0a0a0a] shadow-2xl">
               <div className="h-32 w-full relative">
                 <img src={selectedPlace.photo} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                 <button 
                   onClick={() => setSelectedPlace(null)}
                   className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                 >✕</button>
               </div>
               
               <div className="px-6 pb-8 -mt-12 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-white mb-1">{selectedPlace.name}</h2>
                      <p className="text-neon-cyan font-bold text-sm">{selectedPlace.currentCount} pessoas agora</p>
                    </div>
                    <button className="bg-neon-purple text-black font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(167,139,250,0.4)]">
                      VAI
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} /> {selectedPlace.neighborhood}
                    </div>
                    <div className="flex items-center gap-1 text-neon-pink">
                      <Navigation size={14} /> 1.2 km
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                     <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                           <img key={i} src={`https://i.pravatar.cc/150?u=${selectedPlace.id}${i}`} className="w-8 h-8 rounded-full border-2 border-black" />
                        ))}
                     </div>
                     <span className="text-xs font-medium text-white">
                        <span className="font-bold">Ana, João</span> e mais 3 amigos
                     </span>
                  </div>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};