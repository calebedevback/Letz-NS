import React from 'react';
import { useStore } from '../store';
import { Share2, GlassWater, Music, Moon } from '../components/Icons';

export const Profile: React.FC = () => {
  const { user, logout, checkIns, places } = useStore();

  if (!user) return null;

  // Mock History
  const history = checkIns.slice(0, 5).map(c => {
    const place = places.find(p => p.id === c.placeId);
    return { place, ...c };
  }).filter(h => h.place);

  return (
    <div className="pb-24 pt-12 px-6">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
           <div className="w-28 h-28 rounded-full border-4 border-neon-purple p-1 shadow-[0_0_30px_rgba(167,139,250,0.3)]">
             <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
           </div>
           <div className="absolute bottom-0 right-0 bg-neon-cyan text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-black">
             LVL 12
           </div>
        </div>
        <h1 className="text-2xl font-black text-white">{user.name}</h1>
        <p className="text-gray-400 text-sm">@visitantevip • São Paulo</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
         <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10">
            <span className="text-2xl font-black text-white mb-1">14</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest text-center">Rolês Mês</span>
         </div>
         <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10">
            <span className="text-2xl font-black text-white mb-1">84</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest text-center">Amigos</span>
         </div>
         <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10">
            <span className="text-2xl font-black text-white mb-1">Top</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest text-center">Eletrônica</span>
         </div>
      </div>

      {/* Vibe DNA */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Vibe DNA</h3>
        <div className="flex gap-3">
           <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm font-bold">
             <Music size={16} /> Tech House
           </div>
           <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-900/30 border border-pink-500/30 text-pink-300 text-sm font-bold">
             <GlassWater size={16} /> Gin Tônica
           </div>
           <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-sm font-bold">
             <Moon size={16} /> After
           </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-10">
        <button className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <Share2 size={20} />
          Convidar Amigos
        </button>
        <button 
          onClick={logout}
          className="w-full py-4 rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20"
        >
          Sair
        </button>
      </div>

      {/* History */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Histórico Recente</h3>
        <div className="space-y-4">
          {history.map((h, i) => (
             <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                <img src={h.place?.photo} className="w-12 h-12 rounded-lg object-cover grayscale" />
                <div>
                   <h4 className="font-bold text-white">{h.place?.name}</h4>
                   <p className="text-xs text-gray-500">Há 2 dias • {h.place?.type}</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};