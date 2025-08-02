import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as d3 from 'd3';
import { useMagickStore } from '../store/useMagickStore';
import { GnosisMethod } from '../types';
import toast from 'react-hot-toast';
import SigilTransformationVisualizer from './SigilTransformationVisualizer';

const SigilCreator = () => {
    const [statement, setStatement] = useState('');
    const [gnosisMethod, setGnosisMethod] = useState<GnosisMethod>('meditation');
    const [paradigm, setParadigm] = useState('chaos');
    const [sigilPath, setSigilPath] = useState<string>('');
    const [showVisualizer, setShowVisualizer] = useState(false);

    const addSigil = useMagickStore((state) => state.addSigil);

    const generateSigil = () => {
        if (!statement.trim()) {
            toast.error('ERROR: NO STATEMENT PROVIDED');
            return;
        }

        // Austin Osman Spare's method
        // 1. Remove spaces and convert to uppercase
        let processedStatement = statement.toUpperCase().replace(/\s/g, '');

        // 2. Remove vowels
        processedStatement = processedStatement.replace(/[AEIOU]/g, '');

        // 3. Remove duplicate letters
        const uniqueLetters = [...new Set(processedStatement)].join('');

        // 4. Generate abstract sigil from remaining letters
        // Create a force-directed layout for the sigil
        const nodes = uniqueLetters.split('').map((letter, i) => ({
            id: letter,
            x: 100 + Math.cos(i * 2 * Math.PI / uniqueLetters.length) * 50,
            y: 100 + Math.sin(i * 2 * Math.PI / uniqueLetters.length) * 50,
        }));

        // Generate random connections between letters
        const links: any[] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() > 0.5) {
                    links.push({ source: i, target: j });
                }
            }
        }

        // Create SVG path
        const pathData = generateSVGPath(nodes, links);
        setSigilPath(pathData);
    };

    const generateSVGPath = (nodes: any[], links: any[]) => {
        let path = '';

        // Draw connections with more angular, industrial style
        links.forEach(link => {
            const source = nodes[link.source];
            const target = nodes[link.target];

            // More angular connections inspired by industrial aesthetic
            const midX = (source.x + target.x) / 2;
            const midY = (source.y + target.y) / 2;

            // Create sharp angles instead of curves
            path += `M ${source.x} ${source.y} L ${midX + (Math.random() - 0.5) * 30} ${midY + (Math.random() - 0.5) * 30} L ${target.x} ${target.y} `;
        });

        // Add paradigm-specific elements
        if (paradigm === 'chaos') {
            // Add Psychick Cross inspired element - vertical and horizontal bars
            path += `M 100 20 L 100 180 M 50 80 L 150 80 M 50 120 L 150 120 `;

            // Add chaos arrows pointing outward
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const x1 = 100 + Math.cos(angle) * 60;
                const y1 = 100 + Math.sin(angle) * 60;
                const x2 = 100 + Math.cos(angle) * 80;
                const y2 = 100 + Math.sin(angle) * 80;
                path += `M ${x1} ${y1} L ${x2} ${y2} `;
            }
        } else if (paradigm === 'hermetic') {
            // Triangle within circle (hermetic symbol)
            path += `M 100 40 L 140 130 L 60 130 Z `;
            path += `M 100 30 A 70 70 0 1 0 100 170 A 70 70 0 1 0 100 30 `;
        } else if (paradigm === 'shamanic') {
            // More organic, spiral with cross elements
            for (let i = 0; i < 50; i++) {
                const angle = i * 0.2;
                const radius = i * 1.5;
                const x = 100 + radius * Math.cos(angle);
                const y = 100 + radius * Math.sin(angle);
                path += `L ${x} ${y} `;

                // Add cross marks at intervals
                if (i % 10 === 0 && i > 0) {
                    path += `M ${x - 5} ${y} L ${x + 5} ${y} M ${x} ${y - 5} L ${x} ${y + 5} `;
                }
            }
        } else if (paradigm === 'cybernetic') {
            // Circuit-like patterns
            for (let i = 0; i < 5; i++) {
                const y = 40 + i * 30;
                path += `M 40 ${y} L 160 ${y} `;

                // Add nodes
                for (let j = 0; j < 4; j++) {
                    const x = 50 + j * 35;
                    path += `M ${x} ${y} m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 `;

                    // Vertical connections
                    if (i < 4 && Math.random() > 0.5) {
                        path += `M ${x} ${y} L ${x} ${y + 30} `;
                    }
                }
            }
        }

        // Add letter glyphs as angular symbols around the sigil
        nodes.forEach((node, i) => {
            const angle = (i / nodes.length) * Math.PI * 2;
            const x = 100 + Math.cos(angle) * 90;
            const y = 100 + Math.sin(angle) * 90;

            // Create angular glyph inspired by the letter
            const size = 8;
            path += `M ${x - size} ${y} L ${x} ${y - size} L ${x + size} ${y} L ${x} ${y + size} Z `;
        });

        return path;
    };

    const chargeSigil = () => {
        if (!sigilPath) {
            toast.error('ERROR: GENERATE SIGIL FIRST');
            return;
        }

        const newSigil = {
            id: uuidv4(),
            created: new Date(),
            statement,
            abstractForm: sigilPath,
            chargedDates: [new Date()],
            gnosisMethod,
            manifestations: [],
            resonanceStrength: 0.5,
            paradigm,
        };

        addSigil(newSigil);
        toast.success('SIGIL STORED IN DATABASE');

        // Reset form
        setStatement('');
        setSigilPath('');
    };

    const gnosisMethods = [
        { value: 'meditation', label: 'MEDITATION' },
        { value: 'breathwork', label: 'BREATHWORK' },
        { value: 'dance', label: 'DANCE' },
        { value: 'sensory_deprivation', label: 'SENSORY_DEP' },
        { value: 'entheogens', label: 'ENTHEOGENS' },
        { value: 'pain', label: 'PAIN' },
        { value: 'exhaustion', label: 'EXHAUSTION' },
        { value: 'sexual', label: 'SEXUAL' },
    ];

    const paradigms = [
        { value: 'chaos', label: 'CHAOS' },
        { value: 'hermetic', label: 'HERMETIC' },
        { value: 'shamanic', label: 'SHAMANIC' },
        { value: 'cybernetic', label: 'CYBERNETIC' },
    ];

    return (
        <div className="space-y-6">
            <div className="card">
                <div className="divider">
                    <span className="font-bold uppercase tracking-wider">SIGIL_GENERATOR_v2.0</span>
                </div>

                <div className="space-y-4">
                    {/* Statement Input */}
                    <div>
                        <label className="block text-black mb-2 uppercase text-sm font-bold">
                            STATEMENT_OF_INTENT:
                        </label>
                        <textarea
                            value={statement}
                            onChange={(e) => setStatement(e.target.value)}
                            className="input-field w-full h-24 resize-none"
                            placeholder="ENTER YOUR WILL..."
                        />
                    </div>

                    {/* Gnosis Method */}
                    <div>
                        <label className="block text-black mb-2 uppercase text-sm font-bold">
                            GNOSIS_METHOD:
                        </label>
                        <select
                            value={gnosisMethod}
                            onChange={(e) => setGnosisMethod(e.target.value as GnosisMethod)}
                            className="input-field w-full"
                        >
                            {gnosisMethods.map(method => (
                                <option key={method.value} value={method.value}>
                                    {method.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Paradigm */}
                    <div>
                        <label className="block text-black mb-2 uppercase text-sm font-bold">
                            PARADIGM:
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {paradigms.map(p => (
                                <button
                                    key={p.value}
                                    onClick={() => setParadigm(p.value)}
                                    className={`text-sm ${paradigm === p.value
                                        ? 'btn-primary'
                                        : 'btn-secondary'
                                        }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={generateSigil}
                            className="btn-primary flex-1"
                        >
                            GENERATE
                        </button>
                        <button
                            onClick={() => setShowVisualizer(!showVisualizer)}
                            className="btn-secondary flex-1"
                            disabled={!statement}
                        >
                            VISUALIZE
                        </button>
                        <button
                            onClick={chargeSigil}
                            className="btn-primary flex-1"
                            disabled={!sigilPath}
                        >
                            CHARGE
                        </button>
                    </div>
                </div>
            </div>

            {/* Sigil Display */}
            {sigilPath && (
                <div className="card">
                    <div className="divider flex justify-between items-center">
                        <span className="font-bold uppercase tracking-wider">SIGIL_OUTPUT</span>
                        <span className="text-xs text-black animate-pulse">
                            ◉ TRANSMITTING
                        </span>
                    </div>
                    <div className="relative">
                        <div className="flex justify-center p-8">
                            <svg
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                                className="border-2 border-black"
                                style={{
                                    filter: 'contrast(1.5) brightness(1.2)',
                                }}
                            >
                                {/* Background grid */}
                                <defs>
                                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000000" strokeWidth="0.5" opacity="0.2" />
                                    </pattern>
                                </defs>
                                <rect width="200" height="200" fill="url(#grid)" />

                                {/* Main sigil path */}
                                <path
                                    d={sigilPath}
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    style={{
                                        strokeDasharray: '1000',
                                        strokeDashoffset: '0',
                                        animation: 'sigilDraw 3s ease-out',
                                    }}
                                />

                                {/* Glitch effect overlay */}
                                <path
                                    d={sigilPath}
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="1"
                                    opacity="0.3"
                                    style={{
                                        transform: 'translate(2px, -2px)',
                                    }}
                                />
                                <path
                                    d={sigilPath}
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="1"
                                    opacity="0.3"
                                    style={{
                                        transform: 'translate(-2px, 2px)',
                                    }}
                                />
                            </svg>
                        </div>


                        <div className="text-center space-y-2 pb-4">
                            <div className="text-xs text-black uppercase font-bold">
                                SIGIL GENERATED - READY FOR CHARGING
                            </div>
                            <div className="text-xs text-black">
                                PSYCHICK CROSS PROTOCOL: ACTIVE
                            </div>
                            <div className="text-xs text-black">
                                REALITY FREQUENCY: {Math.floor(Math.random() * 900 + 100)}Hz
                            </div>
                        </div>
                    </div>


                </div>
            )}

            {/* Transformation Visualizer */}
            {showVisualizer && statement && (
                <div className="card">
                    <div className="divider">
                        <span className="font-bold uppercase tracking-wider">TRANSFORMATION_VISUALIZER</span>
                    </div>
                    <SigilTransformationVisualizer statement={statement} />
                </div>
            )}
        </div>
    );
};

export default SigilCreator; 