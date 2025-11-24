import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, MapPin, User } from './Icons';
import { motion } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background text-white pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[-10%] right-[-20%] w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[100px] opacity-50 animate-pulse-fast" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-neon-cyan/20 rounded-full blur-[100px] opacity-40" />
      </div>

      <main className="relative z-10">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          <Link to="/home" className="relative flex flex-col items-center justify-center w-full h-full">
            {isActive('/home') && (
              <motion.div layoutId="nav-glow" className="absolute inset-0 bg-neon-purple/10 blur-md" />
            )}
            <Home className={`w-6 h-6 ${isActive('/home') ? 'text-neon-purple stroke-[2.5px]' : 'text-gray-500'}`} />
            <span className="text-[10px] mt-1 font-medium">Feed</span>
          </Link>

          <Link to="/map" className="relative flex flex-col items-center justify-center w-full h-full">
             {isActive('/map') && (
              <motion.div layoutId="nav-glow" className="absolute inset-0 bg-neon-cyan/10 blur-md" />
            )}
            <div className={`relative ${isActive('/map') ? '-translate-y-3' : ''} transition-transform duration-200`}>
              <div className={`p-3 rounded-full ${isActive('/map') ? 'bg-neon-cyan shadow-[0_0_20px_rgba(34,211,238,0.6)]' : 'bg-gray-800'}`}>
                <MapPin className={`w-6 h-6 ${isActive('/map') ? 'text-black' : 'text-gray-400'}`} />
              </div>
            </div>
          </Link>

          <Link to="/profile" className="relative flex flex-col items-center justify-center w-full h-full">
             {isActive('/profile') && (
              <motion.div layoutId="nav-glow" className="absolute inset-0 bg-neon-pink/10 blur-md" />
            )}
            <User className={`w-6 h-6 ${isActive('/profile') ? 'text-neon-pink stroke-[2.5px]' : 'text-gray-500'}`} />
            <span className="text-[10px] mt-1 font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};