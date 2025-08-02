import { useState } from 'react';

const RealityTunnelNav = () => {
    const [currentTunnel, setCurrentTunnel] = useState('CONSENSUS');

    const tunnels = [
        {
            id: 'CONSENSUS',
            name: 'CONSENSUS_REALITY',
            beliefs: ['MATERIALISM', 'LINEAR_TIME', 'CAUSALITY'],
            stability: 95,
            color: 'text-black opacity-50'
        },
        {
            id: 'CHAOS',
            name: 'CHAOS_PARADIGM',
            beliefs: ['BELIEF_AS_TOOL', 'NOTHING_TRUE', 'EVERYTHING_PERMITTED'],
            stability: 42,
            color: 'text-black'
        },
        {
            id: 'QUANTUM',
            name: 'QUANTUM_MYSTICISM',
            beliefs: ['OBSERVER_EFFECT', 'ENTANGLEMENT', 'PROBABILITY_WAVES'],
            stability: 68,
            color: 'text-black'
        },
        {
            id: 'ANIMIST',
            name: 'ANIMIST_WORLDVIEW',
            beliefs: ['SPIRIT_IN_ALL', 'SACRED_NATURE', 'ANCESTOR_WISDOM'],
            stability: 77,
            color: 'text-black'
        },
    ];

    const selectedTunnel = tunnels.find(t => t.id === currentTunnel);

    const asciiTunnel = `
    ╔═══════════════════════════════╗
    ║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
    ║ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ║
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║
    ║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ║███████████ YOU ███████████████║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║
    ║ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ║
    ║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
    ╚═══════════════════════════════╝`;

    return (
        <div className="space-y-4">
            <div className="card">
                <div className="divider flex justify-between items-center">
                    <span className="font-bold uppercase tracking-wider">REALITY_TUNNEL_NAVIGATOR</span>
                    <span className="text-xs text-black">
                        CURRENT: {currentTunnel}
                    </span>
                </div>

                <div className="p-4">
                    {/* Tunnel Selection */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                        {tunnels.map(tunnel => (
                            <button
                                key={tunnel.id}
                                onClick={() => setCurrentTunnel(tunnel.id)}
                                className={`text-xs ${currentTunnel === tunnel.id
                                        ? 'btn-primary'
                                        : 'btn-secondary'
                                    }`}
                            >
                                [{tunnel.id}]
                            </button>
                        ))}
                    </div>

                    {/* ASCII Visualization */}
                    <div className="flex justify-center mb-6">
                        <pre className={`text-xs ${selectedTunnel?.color}`}>
                            {asciiTunnel}
                        </pre>
                    </div>

                    {/* Tunnel Info */}
                    {selectedTunnel && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div className="text-black mb-2 text-sm font-bold">
                                    TUNNEL_PROPERTIES:
                                </div>
                                <div className="space-y-1 text-xs">
                                    <div>NAME: {selectedTunnel.name}</div>
                                    <div>STABILITY: {selectedTunnel.stability}%</div>
                                    <div>FLUX_RESISTANCE: {100 - selectedTunnel.stability}%</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-black mb-2 text-sm font-bold">
                                    CORE_BELIEFS:
                                </div>
                                <div className="space-y-1 text-xs">
                                    {selectedTunnel.beliefs.map((belief, idx) => (
                                        <div key={idx}>
                                            [{idx + 1}] {belief}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Warning Panel */}
            <div className="card">
                <div className="divider bg-black text-white">
                    <span>⚠ WARNING</span>
                </div>
                <div className="p-4 text-xs">
                    <p className="text-black mb-2 font-bold">
                        REALITY_TUNNEL_SHIFT_IN_PROGRESS...
                    </p>
                    <p>
                        COGNITIVE_DISSONANCE_EXPECTED. MAINTAIN_OBSERVER_AWARENESS.
                        BELIEF_FLEXIBILITY_REQUIRED. DOGMA_INCOMPATIBLE.
                    </p>
                    <div className="mt-4 text-black font-bold">
                        REMEMBER: THE_MAP_IS_NOT_THE_TERRITORY
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealityTunnelNav; 