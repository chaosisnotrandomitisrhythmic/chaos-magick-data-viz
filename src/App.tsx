import { useState } from 'react';
import SigilCreator from './components/SigilCreator';
import SigilGallery from './components/SigilGallery';
import GnosisHeatmap from './components/GnosisHeatmap';
import SynchronicityWeb from './components/SynchronicityWeb';
import RealityTunnelNav from './components/RealityTunnelNav';
import TOPYLogo from './components/TOPYLogo';
import { Toaster } from 'react-hot-toast';

type View = 'sigils' | 'gnosis' | 'synchronicity' | 'tunnels' | 'servitors';

function App() {
    const [currentView, setCurrentView] = useState<View>('sigils');
    const [showCreator, setShowCreator] = useState(false);

    const menuItems = [
        { id: 'sigils' as View, label: 'SIGILS' },
        { id: 'gnosis' as View, label: 'GNOSIS' },
        { id: 'synchronicity' as View, label: 'SYNCHRONICITY' },
        { id: 'tunnels' as View, label: 'REALITY TUNNELS' },
        { id: 'servitors' as View, label: 'SERVITORS' },
    ];

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#ffffff',
                        color: '#000000',
                        border: '2px solid #000000',
                        borderRadius: '0',
                        fontFamily: 'Courier New, monospace',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                    },
                }}
            />

            <div className="max-w-7xl mx-auto">
                {/* Header with TOPY Logo */}
                <div className="mb-12 border-b-4 border-black pb-8">
                    <TOPYLogo className="mb-8" />
                    <div className="text-center mt-8">
                        <h1 className="text-4xl font-bold tracking-widest mb-2">CHAOS MAGICK DATA VIZ</h1>
                        <p className="text-sm font-mono uppercase tracking-wider">Information Ov Thee Temple</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mb-8 border-b-2 border-black">
                    <div className="flex flex-wrap gap-0">
                        {menuItems.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentView(item.id)}
                                className={`px-6 py-3 border-r-2 border-black font-bold uppercase tracking-wider transition-all
                                    ${currentView === item.id 
                                        ? 'bg-black text-white' 
                                        : 'bg-white text-black hover:bg-gray-100'
                                    }
                                    ${index === 0 ? 'border-l-2' : ''}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="min-h-[600px]">
                    {currentView === 'sigils' && (
                        <div className="card">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-black">
                                <h2 className="text-2xl font-bold uppercase tracking-wider">
                                    SIGIL WORKINGS
                                </h2>
                                <button
                                    onClick={() => setShowCreator(!showCreator)}
                                    className="btn-primary"
                                >
                                    {showCreator ? 'VIEW COLLECTION' : 'CREATE NEW'}
                                </button>
                            </div>
                            {showCreator ? <SigilCreator /> : <SigilGallery />}
                        </div>
                    )}

                    {currentView === 'gnosis' && (
                        <div className="card">
                            <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 pb-4 border-b-2 border-black">
                                GNOSIS STATE RECORDS
                            </h2>
                            <GnosisHeatmap />
                        </div>
                    )}

                    {currentView === 'synchronicity' && (
                        <div className="card">
                            <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 pb-4 border-b-2 border-black">
                                SYNCHRONICITY MAPPING
                            </h2>
                            <SynchronicityWeb />
                        </div>
                    )}

                    {currentView === 'tunnels' && (
                        <div className="card">
                            <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 pb-4 border-b-2 border-black">
                                REALITY TUNNEL NAVIGATION
                            </h2>
                            <RealityTunnelNav />
                        </div>
                    )}

                    {currentView === 'servitors' && (
                        <div className="card">
                            <div className="text-center py-20">
                                <div className="mb-8">
                                    <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                                        <rect x="10" y="10" width="80" height="80" stroke="black" strokeWidth="2" fill="none" />
                                        <line x1="10" y1="10" x2="90" y2="90" stroke="black" strokeWidth="2" />
                                        <line x1="90" y1="10" x2="10" y2="90" stroke="black" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold uppercase mb-4">MODULE OFFLINE</h3>
                                <p className="font-mono text-sm">SERVITOR CONSTRUCTION PENDING</p>
                                <p className="font-mono text-xs mt-2">23 : 23 : 23</p>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t-4 border-black">
                    <div className="flex justify-between items-center text-xs font-mono uppercase">
                        <span>CHAOS PRACTITIONER INTERFACE</span>
                        <span>OV PSYCHICK YOUTH</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;