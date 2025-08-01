import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Network, Zap, Eye } from 'lucide-react';
import SigilCreator from './components/SigilCreator';
import SigilGallery from './components/SigilGallery';
import GnosisHeatmap from './components/GnosisHeatmap';
import SynchronicityWeb from './components/SynchronicityWeb';
import RealityTunnelNav from './components/RealityTunnelNav';
import { Toaster } from 'react-hot-toast';

type View = 'sigils' | 'gnosis' | 'synchronicity' | 'tunnels' | 'servitors';

function App() {
    const [currentView, setCurrentView] = useState<View>('sigils');
    const [showCreator, setShowCreator] = useState(false);

    const navItems = [
        { id: 'sigils' as View, label: 'Sigils', icon: Sparkles },
        { id: 'gnosis' as View, label: 'Gnosis States', icon: Moon },
        { id: 'synchronicity' as View, label: 'Synchronicity Web', icon: Network },
        { id: 'tunnels' as View, label: 'Reality Tunnels', icon: Eye },
        { id: 'servitors' as View, label: 'Servitors', icon: Zap },
    ];

    return (
        <div className="min-h-screen bg-void-black text-astral-white">
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#1a1a1a',
                        color: '#f0f9ff',
                        border: '1px solid #9333ea',
                    },
                }}
            />

            {/* Header */}
            <header className="border-b border-chaos-purple/30 backdrop-blur-lg bg-void-black/80 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <motion.h1
                        className="text-2xl font-bold neon-text"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        🌀 Sigil Resonance Tracker
                    </motion.h1>

                    <nav className="flex gap-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setCurrentView(item.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentView === item.id
                                            ? 'bg-chaos-purple/20 text-chaos-purple border border-chaos-purple'
                                            : 'hover:bg-chaos-purple/10'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={18} />
                                    <span className="hidden md:inline">{item.label}</span>
                                </motion.button>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    key={currentView}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentView === 'sigils' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl font-bold">Sigil Collection</h2>
                                <motion.button
                                    onClick={() => setShowCreator(!showCreator)}
                                    className="px-6 py-3 bg-chaos-purple rounded-lg font-semibold hover:bg-chaos-purple/80 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {showCreator ? 'View Gallery' : 'Create New Sigil'}
                                </motion.button>
                            </div>

                            {showCreator ? <SigilCreator /> : <SigilGallery />}
                        </div>
                    )}

                    {currentView === 'gnosis' && <GnosisHeatmap />}
                    {currentView === 'synchronicity' && <SynchronicityWeb />}
                    {currentView === 'tunnels' && <RealityTunnelNav />}
                    {currentView === 'servitors' && (
                        <div className="text-center py-20">
                            <h2 className="text-3xl font-bold mb-4">Servitor Dashboard</h2>
                            <p className="text-gray-400">Coming soon... The digital familiars await.</p>
                        </div>
                    )}
                </motion.div>
            </main>

            {/* Ambient Background Effect */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chaos-purple/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sigil-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
            </div>
        </div>
    );
}

export default App; 