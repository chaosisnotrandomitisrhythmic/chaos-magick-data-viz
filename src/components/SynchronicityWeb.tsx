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
        <div className="card">
            <div className="divider flex justify-between items-center">
                <span className="font-bold uppercase tracking-wider">SYNCHRONICITY_DETECTOR</span>
                <span className="text-xs animate-pulse text-black">◉ SCANNING</span>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Network Visualization */}
                    <div>
                        <div className="text-black mb-2 text-sm font-bold">
                            NETWORK_TOPOLOGY:
                        </div>
                        <pre className="text-xs text-black font-mono">
                            {asciiWeb}
                        </pre>
                    </div>

                    {/* Event List */}
                    <div>
                        <div className="text-black mb-2 text-sm font-bold">
                            ACTIVE_NODES:
                        </div>
                        <div className="space-y-1 text-xs">
                            {events.map(event => (
                                <div key={event.id} className="flex justify-between">
                                    <span className="text-black font-bold">{event.id}</span>
                                    <span className="text-black">[{event.type}]</span>
                                    <span>{event.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Connection Log */}
                <div className="mt-4 border-t-2 border-black pt-4">
                    <div className="text-black mb-2 text-sm font-bold">
                        RECENT_CONNECTIONS:
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                        {connections.length === 0 ? (
                            <div className="text-black opacity-50">AWAITING SYNCHRONICITY EVENTS...</div>
                        ) : (
                            connections.map((conn, idx) => (
                                <div key={idx} className="text-black">
                                    {new Date().toLocaleTimeString()} {conn}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Statistics */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                    <div className="text-center">
                        <div className="text-black font-bold">RESONANCE</div>
                        <div className="text-2xl font-bold text-black">
                            {Math.floor(Math.random() * 30 + 70)}%
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-black font-bold">FLUX_RATE</div>
                        <div className="text-2xl font-bold text-black">
                            {(Math.random() * 2 + 1).toFixed(1)}Hz
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-black font-bold">COHERENCE</div>
                        <div className="text-2xl font-bold text-black">
                            {Math.floor(Math.random() * 20 + 80)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SynchronicityWeb; 