import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { MapPage } from './pages/MapPage';
import { Profile } from './pages/Profile';
import { AnimatePresence, motion } from 'framer-motion';

// Private Route Wrapper
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useStore(state => state.user);
  return user ? <Layout>{children}</Layout> : <Navigate to="/" />;
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <h1 className="text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink tracking-tighter drop-shadow-[0_0_25px_rgba(167,139,250,0.8)]">
            Letz
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <HashRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </AnimatePresence>
    </HashRouter>
  );
}