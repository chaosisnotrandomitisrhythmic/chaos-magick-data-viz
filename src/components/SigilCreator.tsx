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

        // Create rhythmic patterns based on statement essence
        const pathData = generateRhythmicSigil(statement, paradigm);
        setSigilPath(pathData);
    };

    const generateRhythmicSigil = (statement: string, paradigm: string) => {
        // Create deterministic seed from statement for consistent generation
        const cleanStatement = statement.toLowerCase().replace(/[^a-z]/g, '');
        let seed = 0;
        for (let i = 0; i < cleanStatement.length; i++) {
            seed += cleanStatement.charCodeAt(i) * (i + 1);
        }

        // Simple seeded random function for consistent results
        const seededRandom = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };

        // Extract core rhythm - just the first 3 most significant letters
        const uniqueLetters = [...new Set(cleanStatement)];
        const coreLetters = uniqueLetters.slice(0, 3);

        // Single rhythm value from statement essence
        const rhythm = coreLetters.reduce((sum, letter) =>
            sum + (letter.charCodeAt(0) - 97) / 25, 0
        ) / Math.max(coreLetters.length, 1);

        // Phase determines rotation/orientation
        const phase = (seed % 8) * (Math.PI / 4); // 8 cardinal directions

        // SVG path
        let path = '';
        const center = { x: 100, y: 100 };
        const radius = 60;

        if (paradigm === 'chaos') {
            // PURE PSYCHICK CROSS - Maximum 4 lines

            // Core cross - size based on rhythm
            const crossSize = radius * (0.6 + rhythm * 0.4);

            // Main vertical stroke
            path += `M ${center.x} ${center.y - crossSize} L ${center.x} ${center.y + crossSize} `;

            // Main horizontal stroke
            path += `M ${center.x - crossSize} ${center.y} L ${center.x + crossSize} ${center.y} `;

            // Single power mark - position determined by phase
            if (rhythm > 0.3) {
                const markRadius = crossSize * 0.7;
                const x = center.x + Math.cos(phase) * markRadius;
                const y = center.y + Math.sin(phase) * markRadius;

                // One diagonal cut
                const cutSize = 8;
                const cutAngle = phase + Math.PI / 4;
                path += `M ${x - Math.cos(cutAngle) * cutSize} ${y - Math.sin(cutAngle) * cutSize} `;
                path += `L ${x + Math.cos(cutAngle) * cutSize} ${y + Math.sin(cutAngle) * cutSize} `;
            }

        } else if (paradigm === 'hermetic') {
            // TRIANGLE + DOT - Maximum 4 lines
            const triRadius = radius * 0.8;

            // Triangle - 3 lines
            for (let i = 0; i < 3; i++) {
                const angle1 = phase + (i / 3) * Math.PI * 2 - Math.PI / 2;
                const angle2 = phase + ((i + 1) % 3 / 3) * Math.PI * 2 - Math.PI / 2;

                const x1 = center.x + Math.cos(angle1) * triRadius;
                const y1 = center.y + Math.sin(angle1) * triRadius;
                const x2 = center.x + Math.cos(angle2) * triRadius;
                const y2 = center.y + Math.sin(angle2) * triRadius;

                path += `M ${x1} ${y1} L ${x2} ${y2} `;
            }

            // Center mark if rhythm is strong
            if (rhythm > 0.5) {
                path += `M ${center.x - 3} ${center.y} L ${center.x + 3} ${center.y} `;
            }

        } else if (paradigm === 'shamanic') {
            // SPIRAL - Single continuous line
            const points = 12; // Fixed for simplicity
            const maxRadius = radius * 0.9;
            const turns = 1.5 + rhythm; // 1.5-2.5 turns

            path += `M ${center.x} ${center.y} `;

            for (let i = 1; i <= points; i++) {
                const t = i / points;
                const angle = phase + t * turns * Math.PI * 2;
                const r = t * maxRadius;
                const x = center.x + Math.cos(angle) * r;
                const y = center.y + Math.sin(angle) * r;

                path += `L ${x} ${y} `;
            }

            // Single terminus mark
            const endAngle = phase + turns * Math.PI * 2;
            const endX = center.x + Math.cos(endAngle) * maxRadius;
            const endY = center.y + Math.sin(endAngle) * maxRadius;
            path += `M ${endX - 4} ${endY - 4} L ${endX + 4} ${endY + 4} `;

        } else if (paradigm === 'cybernetic') {
            // MINIMAL CIRCUIT - 3-4 nodes, 2-3 connections
            const nodeCount = rhythm > 0.5 ? 3 : 2;
            const nodes = [];

            // Generate node positions
            for (let i = 0; i < nodeCount; i++) {
                const angle = phase + (i / nodeCount) * Math.PI * 2;
                const r = radius * 0.6;
                nodes.push({
                    x: center.x + Math.cos(angle) * r,
                    y: center.y + Math.sin(angle) * r
                });
            }

            // Connect nodes in sequence
            for (let i = 0; i < nodes.length - 1; i++) {
                path += `M ${nodes[i].x} ${nodes[i].y} L ${nodes[i + 1].x} ${nodes[i + 1].y} `;
            }

            // Close circuit if rhythm is strong
            if (rhythm > 0.4 && nodes.length > 2) {
                path += `M ${nodes[nodes.length - 1].x} ${nodes[nodes.length - 1].y} L ${nodes[0].x} ${nodes[0].y} `;
            }

            // Node marks
            nodes.forEach(node => {
                const size = 3;
                path += `M ${node.x - size} ${node.y - size} L ${node.x + size} ${node.y + size} `;
                path += `M ${node.x + size} ${node.y - size} L ${node.x - size} ${node.y + size} `;
            });
        }

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
                                    {/* Photocopy effect filter */}
                                    <filter id="photocopy">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                                        <feColorMatrix in="noise" type="saturate" values="0" />
                                        <feComponentTransfer>
                                            <feFuncA type="discrete" tableValues="0 .5 .5 .5 .5 1" />
                                        </feComponentTransfer>
                                        <feComposite operator="multiply" in2="SourceGraphic" />
                                    </filter>
                                </defs>
                                <rect width="200" height="200" fill="url(#grid)" />

                                {/* Main sigil path with heavy stroke */}
                                <g filter="url(#photocopy)">
                                    <path
                                        d={sigilPath}
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="4"
                                        strokeLinecap="square"
                                        strokeLinejoin="miter"
                                        style={{
                                            strokeDasharray: '1000',
                                            strokeDashoffset: '0',
                                            animation: 'sigilDraw 1.5s ease-out',
                                        }}
                                    />

                                    {/* Double exposure effect */}
                                    <path
                                        d={sigilPath}
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        opacity="0.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            transform: 'translate(1px, -1px)',
                                        }}
                                    />
                                    <path
                                        d={sigilPath}
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="1"
                                        opacity="0.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            transform: 'translate(-1px, 1px)',
                                        }}
                                    />
                                </g>
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