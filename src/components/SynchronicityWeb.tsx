import { useState, useEffect } from 'react';

const SynchronicityWeb = () => {
    const [connections, setConnections] = useState<string[]>([]);
    const [events] = useState([
        { id: 'E001', type: 'NUMBER', desc: '23:23 REPEATING' },
        { id: 'E002', type: 'SYMBOL', desc: 'SPIRAL PATTERN' },
        { id: 'E003', type: 'DREAM', desc: 'SIGIL ACTIVATION' },
        { id: 'E004', type: 'ENCOUNTER', desc: 'MEANINGFUL MEETING' },
        { id: 'E005', type: 'MEDIA', desc: 'SYNC MESSAGE' },
    ]);

    useEffect(() => {
        // Simulate network connections
        const interval = setInterval(() => {
            const newConnection = `[${events[Math.floor(Math.random() * events.length)].id}] <---> [${events[Math.floor(Math.random() * events.length)].id}]`;
            setConnections(prev => [...prev.slice(-4), newConnection]);
        }, 2000);

        return () => clearInterval(interval);
    }, [events]);

    const asciiWeb = `
         E001 -------- E002
          |  \\        /  |
          |   \\      /   |
          |    E003     |
          |   /    \\    |
          |  /      \\   |
         E004 ------ E005
    `;

    return (
        <div className="terminal-window">
            <div className="terminal-header">
                <span>SYNCHRONICITY_DETECTOR</span>
                <span className="text-xs animate-pulse text-terminal-amber">◉ SCANNING</span>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Network Visualization */}
                    <div>
                        <div className="text-terminal-cyan mb-2 text-sm">
                            &gt; NETWORK_TOPOLOGY:
                        </div>
                        <pre className="text-xs text-terminal-green">
                            {asciiWeb}
                        </pre>
                    </div>

                    {/* Event List */}
                    <div>
                        <div className="text-terminal-cyan mb-2 text-sm">
                            &gt; ACTIVE_NODES:
                        </div>
                        <div className="space-y-1 text-xs">
                            {events.map(event => (
                                <div key={event.id} className="flex justify-between">
                                    <span className="text-terminal-green">{event.id}</span>
                                    <span className="text-terminal-amber">[{event.type}]</span>
                                    <span>{event.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Connection Log */}
                <div className="mt-4 border-t border-terminal-green pt-4">
                    <div className="text-terminal-cyan mb-2 text-sm">
                        &gt; RECENT_CONNECTIONS:
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                        {connections.length === 0 ? (
                            <div className="text-terminal-gray">AWAITING SYNCHRONICITY EVENTS...</div>
                        ) : (
                            connections.map((conn, idx) => (
                                <div key={idx} className="text-terminal-green">
                                    {new Date().toLocaleTimeString()} {conn}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Statistics */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                    <div className="text-center">
                        <div className="text-terminal-amber">RESONANCE</div>
                        <div className="text-2xl font-bold text-terminal-green">
                            {Math.floor(Math.random() * 30 + 70)}%
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-terminal-amber">FLUX_RATE</div>
                        <div className="text-2xl font-bold text-terminal-green">
                            {(Math.random() * 2 + 1).toFixed(1)}Hz
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-terminal-amber">COHERENCE</div>
                        <div className="text-2xl font-bold text-terminal-green">
                            {Math.floor(Math.random() * 20 + 80)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SynchronicityWeb; 