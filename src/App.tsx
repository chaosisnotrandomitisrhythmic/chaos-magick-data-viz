import { useState, useEffect } from 'react';
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
    const [terminalText, setTerminalText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    const asciiHeader = `
╔═══════════════════════════════════════════════════════════════════╗
║  ███████╗██╗ ██████╗ ██╗██╗         ████████╗██████╗  ██████╗   ║
║  ██╔════╝██║██╔════╝ ██║██║         ╚══██╔══╝██╔══██╗██╔════╝   ║
║  ███████╗██║██║  ███╗██║██║            ██║   ██████╔╝██║        ║
║  ╚════██║██║██║   ██║██║██║            ██║   ██╔══██╗██║        ║
║  ███████║██║╚██████╔╝██║███████╗       ██║   ██║  ██║╚██████╗   ║
║  ╚══════╝╚═╝ ╚═════╝ ╚═╝╚══════╝       ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ║
╚═══════════════════════════════════════════════════════════════════╝`;

    const menuItems = [
        { id: 'sigils' as View, label: '[1] SIGILS', cmd: '1' },
        { id: 'gnosis' as View, label: '[2] GNOSIS_STATES', cmd: '2' },
        { id: 'synchronicity' as View, label: '[3] SYNC_WEB', cmd: '3' },
        { id: 'tunnels' as View, label: '[4] REALITY_TUNNELS', cmd: '4' },
        { id: 'servitors' as View, label: '[5] SERVITORS', cmd: '5' },
    ];

    useEffect(() => {
        const text = `INITIALIZING CHAOS_MAGICK_SYSTEM v2.0.0...
[OK] LOADING SIGIL_ENGINE...
[OK] CONNECTING TO ASTRAL_PLANE...
[OK] SYNCHRONICITY_DETECTOR ONLINE...
[OK] REALITY_TUNNEL_NAVIGATOR READY...

SYSTEM READY. SELECT MODULE:`;

        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setTerminalText(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 20);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorTimer);
    }, []);

    return (
        <div className="min-h-screen bg-terminal-bg text-terminal-green p-4 terminal-grid">
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#000000',
                        color: '#00ff00',
                        border: '1px solid #00ff00',
                        borderRadius: '0',
                        fontFamily: 'VT323, monospace',
                        fontSize: '18px',
                        textTransform: 'uppercase',
                    },
                }}
            />

            <div className="max-w-6xl mx-auto">
                {/* ASCII Header */}
                <pre className="text-terminal-green text-center mb-4 text-xs sm:text-sm md:text-base glow-green">
                    {asciiHeader}
                </pre>

                {/* Terminal Window */}
                <div className="terminal-window mb-6">
                    <div className="terminal-header">
                        <span>CHAOS_MAGICK_TERMINAL</span>
                        <span className="text-xs">
                            <span className="text-terminal-amber">[●]</span>
                            <span className="text-terminal-green ml-1">[●]</span>
                            <span className="text-terminal-cyan ml-1">[●]</span>
                        </span>
                    </div>

                    <div className="font-mono text-sm mb-4">
                        <pre className="whitespace-pre-wrap">{terminalText}</pre>
                        {showCursor && <span className="animate-blink">_</span>}
                    </div>

                    {/* Navigation */}
                    <div className="border-t border-terminal-green pt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentView(item.id)}
                                    className={`terminal-button text-sm ${currentView === item.id
                                            ? 'bg-terminal-green text-terminal-bg'
                                            : ''
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="terminal-window">
                    <div className="terminal-header">
                        <span>MODULE: {currentView.toUpperCase()}</span>
                        <span className="text-xs animate-pulse">◼ REC</span>
                    </div>

                    <div className="min-h-[400px]">
                        {currentView === 'sigils' && (
                            <div>
                                <div className="mb-4 pb-4 border-b border-terminal-green">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold uppercase">
                                            &gt; SIGIL_COLLECTION
                                        </h2>
                                        <button
                                            onClick={() => setShowCreator(!showCreator)}
                                            className="terminal-button text-sm"
                                        >
                                            {showCreator ? '[VIEW_GALLERY]' : '[CREATE_NEW]'}
                                        </button>
                                    </div>
                                </div>

                                {showCreator ? <SigilCreator /> : <SigilGallery />}
                            </div>
                        )}

                        {currentView === 'gnosis' && (
                            <div>
                                <h2 className="text-xl font-bold uppercase mb-4">
                                    &gt; GNOSIS_STATE_MONITOR
                                </h2>
                                <GnosisHeatmap />
                            </div>
                        )}

                        {currentView === 'synchronicity' && (
                            <div>
                                <h2 className="text-xl font-bold uppercase mb-4">
                                    &gt; SYNCHRONICITY_NETWORK
                                </h2>
                                <SynchronicityWeb />
                            </div>
                        )}

                        {currentView === 'tunnels' && (
                            <div>
                                <h2 className="text-xl font-bold uppercase mb-4">
                                    &gt; REALITY_TUNNEL_NAVIGATOR
                                </h2>
                                <RealityTunnelNav />
                            </div>
                        )}

                        {currentView === 'servitors' && (
                            <div className="text-center py-20">
                                <pre className="text-terminal-amber mb-4">
                                    {`    ___________
   /           \\
  /   [ERROR]   \\
 /_______________\\
 |  MODULE NOT   |
 |   AVAILABLE   |
 |_______________|`}
                                </pre>
                                <p className="text-terminal-amber uppercase animate-blink">
                                    &gt; SERVITOR_MODULE_OFFLINE
                                </p>
                                <p className="text-terminal-green mt-2">
                                    DIGITAL_FAMILIARS AWAIT INITIALIZATION...
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Bar */}
                <div className="terminal-window mt-4 flex justify-between items-center text-xs">
                    <span>USER: CHAOS_PRACTITIONER</span>
                    <span>REALITY_FLUX: {Math.floor(Math.random() * 100)}%</span>
                    <span>SYSTEM_TIME: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
}

export default App; 