import { useState } from 'react';

const RealityTunnelNav = () => {
    const [currentTunnel, setCurrentTunnel] = useState('CONSENSUS');

    const tunnels = [
        {
            id: 'CONSENSUS',
            name: 'CONSENSUS_REALITY',
            beliefs: ['MATERIALISM', 'LINEAR_TIME', 'CAUSALITY'],
            stability: 95,
            color: 'text-terminal-gray'
        },
        {
            id: 'CHAOS',
            name: 'CHAOS_PARADIGM',
            beliefs: ['BELIEF_AS_TOOL', 'NOTHING_TRUE', 'EVERYTHING_PERMITTED'],
            stability: 42,
            color: 'text-terminal-green'
        },
        {
            id: 'QUANTUM',
            name: 'QUANTUM_MYSTICISM',
            beliefs: ['OBSERVER_EFFECT', 'ENTANGLEMENT', 'PROBABILITY_WAVES'],
            stability: 68,
            color: 'text-terminal-cyan'
        },
        {
            id: 'ANIMIST',
            name: 'ANIMIST_WORLDVIEW',
            beliefs: ['SPIRIT_IN_ALL', 'SACRED_NATURE', 'ANCESTOR_WISDOM'],
            stability: 77,
            color: 'text-terminal-amber'
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
            <div className="terminal-window">
                <div className="terminal-header">
                    <span>REALITY_TUNNEL_NAVIGATOR</span>
                    <span className="text-xs text-terminal-amber">
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
                                className={`terminal-button text-xs ${currentTunnel === tunnel.id
                                        ? 'bg-terminal-green text-terminal-bg'
                                        : ''
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
                                <div className="text-terminal-cyan mb-2 text-sm">
                                    &gt; TUNNEL_PROPERTIES:
                                </div>
                                <div className="space-y-1 text-xs">
                                    <div>NAME: {selectedTunnel.name}</div>
                                    <div>STABILITY: {selectedTunnel.stability}%</div>
                                    <div>FLUX_RESISTANCE: {100 - selectedTunnel.stability}%</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-terminal-cyan mb-2 text-sm">
                                    &gt; CORE_BELIEFS:
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
            <div className="terminal-window">
                <div className="terminal-header bg-terminal-amber text-terminal-bg">
                    <span>⚠ WARNING</span>
                </div>
                <div className="p-4 text-xs">
                    <p className="text-terminal-amber mb-2">
                        REALITY_TUNNEL_SHIFT_IN_PROGRESS...
                    </p>
                    <p>
                        COGNITIVE_DISSONANCE_EXPECTED. MAINTAIN_OBSERVER_AWARENESS.
                        BELIEF_FLEXIBILITY_REQUIRED. DOGMA_INCOMPATIBLE.
                    </p>
                    <div className="mt-4 text-terminal-green">
                        &gt; REMEMBER: THE_MAP_IS_NOT_THE_TERRITORY
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealityTunnelNav; 