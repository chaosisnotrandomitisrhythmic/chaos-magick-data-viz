import { useState, useEffect } from 'react';

const GnosisHeatmap = () => {
    const [data, setData] = useState<number[][]>([]);

    useEffect(() => {
        // Generate random gnosis intensity data for visualization
        const heatmapData = Array(7).fill(null).map(() =>
            Array(24).fill(null).map(() => Math.random())
        );
        setData(heatmapData);
    }, []);

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const hours = Array(24).fill(null).map((_, i) => i);

    const getIntensityChar = (value: number) => {
        if (value > 0.8) return '█';
        if (value > 0.6) return '▓';
        if (value > 0.4) return '▒';
        if (value > 0.2) return '░';
        return ' ';
    };

    return (
        <div className="terminal-window">
            <div className="terminal-header">
                <span>GNOSIS_STATE_ANALYZER</span>
            </div>

            <div className="p-4">
                <div className="mb-4">
                    <p className="text-terminal-green mb-2">
                        &gt; BIORHYTHM ANALYSIS COMPLETE
                    </p>
                    <p className="text-terminal-amber text-sm">
                        OPTIMAL GNOSIS WINDOWS DETECTED
                    </p>
                </div>

                {/* ASCII Heatmap */}
                <div className="overflow-x-auto">
                    <pre className="text-xs text-terminal-green">
                        <div className="mb-2">
                            {'    ' + hours.map(h => h.toString().padStart(2, '0')).join(' ')}
                        </div>
                        {days.map((day, dayIndex) => (
                            <div key={day}>
                                {day} {data[dayIndex]?.map(value =>
                                    `[${getIntensityChar(value)}]`
                                ).join('') || ''}
                            </div>
                        ))}
                    </pre>
                </div>

                <div className="mt-4 border-t border-terminal-green pt-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                            <span className="text-terminal-cyan">LEGEND:</span>
                            <div className="mt-1 space-y-1">
                                <div>[█] PEAK_STATE (80-100%)</div>
                                <div>[▓] HIGH_STATE (60-80%)</div>
                                <div>[▒] MED_STATE (40-60%)</div>
                                <div>[░] LOW_STATE (20-40%)</div>
                                <div>[ ] MIN_STATE (0-20%)</div>
                            </div>
                        </div>
                        <div>
                            <span className="text-terminal-cyan">STATS:</span>
                            <div className="mt-1 space-y-1">
                                <div>PEAK_HOURS: {Math.floor(Math.random() * 5 + 2)}</div>
                                <div>AVG_INTENSITY: {(Math.random() * 0.5 + 0.3).toFixed(2)}</div>
                                <div>BEST_DAY: {days[Math.floor(Math.random() * 7)]}</div>
                                <div>WORST_DAY: {days[Math.floor(Math.random() * 7)]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GnosisHeatmap; 