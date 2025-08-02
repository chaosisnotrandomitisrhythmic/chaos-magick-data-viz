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
        // Deep rhythmic analysis of statement
        const cleanStatement = statement.toLowerCase().replace(/[^a-z]/g, '');
        
        // Create multiple seed values for intricate patterns
        let seed1 = 0, seed2 = 0, seed3 = 0;
        for (let i = 0; i < cleanStatement.length; i++) {
            const char = cleanStatement.charCodeAt(i);
            seed1 += char * (i + 1);
            seed2 += char * char * (i + 1);
            seed3 += Math.sin(char * (i + 1)) * 10000;
        }

        // Extract rhythmic frequencies from statement
        const letterFreqs = new Map<string, number>();
        for (const letter of cleanStatement) {
            letterFreqs.set(letter, (letterFreqs.get(letter) || 0) + 1);
        }
        
        // Calculate intricate rhythm patterns
        const vowels = cleanStatement.match(/[aeiou]/g) || [];
        const consonants = cleanStatement.match(/[^aeiou]/g) || [];
        const vowelRhythm = vowels.length / Math.max(cleanStatement.length, 1);
        const consonantDensity = consonants.length / Math.max(cleanStatement.length, 1);
        
        // Extract harmonic frequencies
        const uniqueLetters = [...new Set(cleanStatement)];
        const harmonics = uniqueLetters.map(letter => {
            const freq = letterFreqs.get(letter) || 1;
            return (letter.charCodeAt(0) - 97) * freq / cleanStatement.length;
        });
        
        // Calculate primary rhythm from harmonics
        const primaryRhythm = harmonics.reduce((sum, h) => sum + h, 0) / Math.max(harmonics.length, 1);
        
        // Generate phase angles based on letter patterns
        const phaseAngles = [];
        for (let i = 0; i < Math.min(cleanStatement.length, 13); i++) {
            const char = cleanStatement.charCodeAt(i);
            phaseAngles.push((char * (i + 1) % 360) * Math.PI / 180);
        }
        
        // Determine line count: 7-13 based on statement complexity
        const complexity = (uniqueLetters.length / 26) * vowelRhythm * consonantDensity;
        const lineCount = Math.floor(7 + complexity * 6);
        const actualLineCount = Math.min(Math.max(lineCount, 7), 13);
        
        // SVG path
        let path = '';
        const center = { x: 100, y: 100 };
        const radius = 60;

        if (paradigm === 'chaos') {
            // INTRICATE CHAOS CROSS - 7-13 lines based on rhythmic analysis
            
            // Core cross with variable thickness
            const crossSize = radius * (0.5 + primaryRhythm * 0.5);
            
            // Main vertical stroke with rhythm modulation
            path += `M ${center.x} ${center.y - crossSize} L ${center.x} ${center.y + crossSize} `;
            
            // Main horizontal stroke
            path += `M ${center.x - crossSize} ${center.y} L ${center.x + crossSize} ${center.y} `;
            
            // Add rhythmic marks based on harmonic frequencies
            let linesAdded = 2;
            
            for (let i = 0; i < Math.min(phaseAngles.length, actualLineCount - 2); i++) {
                const angle = phaseAngles[i];
                const harmonic = harmonics[i % harmonics.length];
                const distance = radius * (0.3 + harmonic * 0.4);
                
                if (i % 3 === 0) {
                    // Radial lines
                    const x1 = center.x + Math.cos(angle) * distance * 0.5;
                    const y1 = center.y + Math.sin(angle) * distance * 0.5;
                    const x2 = center.x + Math.cos(angle) * distance;
                    const y2 = center.y + Math.sin(angle) * distance;
                    path += `M ${x1} ${y1} L ${x2} ${y2} `;
                } else if (i % 3 === 1) {
                    // Angular cuts
                    const x = center.x + Math.cos(angle) * distance;
                    const y = center.y + Math.sin(angle) * distance;
                    const cutSize = 5 + harmonic * 10;
                    const cutAngle = angle + Math.PI / 4;
                    path += `M ${x - Math.cos(cutAngle) * cutSize} ${y - Math.sin(cutAngle) * cutSize} `;
                    path += `L ${x + Math.cos(cutAngle) * cutSize} ${y + Math.sin(cutAngle) * cutSize} `;
                } else {
                    // Connection lines
                    const prevAngle = phaseAngles[Math.max(0, i - 1)];
                    const x1 = center.x + Math.cos(prevAngle) * distance * 0.7;
                    const y1 = center.y + Math.sin(prevAngle) * distance * 0.7;
                    const x2 = center.x + Math.cos(angle) * distance * 0.7;
                    const y2 = center.y + Math.sin(angle) * distance * 0.7;
                    path += `M ${x1} ${y1} L ${x2} ${y2} `;
                }
                
                linesAdded++;
                if (linesAdded >= actualLineCount) break;
            }

        } else if (paradigm === 'hermetic') {
            // SACRED GEOMETRY - 7-13 lines with hermetic proportions
            const triRadius = radius * 0.8;
            const innerRadius = triRadius * primaryRhythm;
            
            // Primary triangle
            for (let i = 0; i < 3; i++) {
                const angle1 = phaseAngles[0] + (i / 3) * Math.PI * 2 - Math.PI / 2;
                const angle2 = phaseAngles[0] + ((i + 1) % 3 / 3) * Math.PI * 2 - Math.PI / 2;
                
                const x1 = center.x + Math.cos(angle1) * triRadius;
                const y1 = center.y + Math.sin(angle1) * triRadius;
                const x2 = center.x + Math.cos(angle2) * triRadius;
                const y2 = center.y + Math.sin(angle2) * triRadius;
                
                path += `M ${x1} ${y1} L ${x2} ${y2} `;
            }
            
            let linesAdded = 3;
            
            // Inner triangle if rhythm permits
            if (actualLineCount > 6 && primaryRhythm > 0.3) {
                for (let i = 0; i < 3 && linesAdded < actualLineCount; i++) {
                    const angle1 = phaseAngles[0] + (i / 3) * Math.PI * 2 + Math.PI / 6;
                    const angle2 = phaseAngles[0] + ((i + 1) % 3 / 3) * Math.PI * 2 + Math.PI / 6;
                    
                    const x1 = center.x + Math.cos(angle1) * innerRadius;
                    const y1 = center.y + Math.sin(angle1) * innerRadius;
                    const x2 = center.x + Math.cos(angle2) * innerRadius;
                    const y2 = center.y + Math.sin(angle2) * innerRadius;
                    
                    path += `M ${x1} ${y1} L ${x2} ${y2} `;
                    linesAdded++;
                }
            }
            
            // Hermetic rays from vertices
            for (let i = 0; i < harmonics.length && linesAdded < actualLineCount; i++) {
                const vertexAngle = phaseAngles[0] + (i % 3 / 3) * Math.PI * 2 - Math.PI / 2;
                const x1 = center.x + Math.cos(vertexAngle) * triRadius;
                const y1 = center.y + Math.sin(vertexAngle) * triRadius;
                const x2 = center.x + Math.cos(vertexAngle) * triRadius * 1.3;
                const y2 = center.y + Math.sin(vertexAngle) * triRadius * 1.3;
                
                path += `M ${x1} ${y1} L ${x2} ${y2} `;
                linesAdded++;
            }
            
            // Center cross if still need lines
            if (linesAdded < actualLineCount) {
                path += `M ${center.x - 5} ${center.y} L ${center.x + 5} ${center.y} `;
                linesAdded++;
                if (linesAdded < actualLineCount) {
                    path += `M ${center.x} ${center.y - 5} L ${center.x} ${center.y + 5} `;
                }
            }

        } else if (paradigm === 'shamanic') {
            // SPIRALING POWER - 7-13 lines with organic flow
            const maxRadius = radius * 0.9;
            const spiralTightness = 0.5 + primaryRhythm * 0.5;
            const turns = 1.5 + vowelRhythm * 2; // 1.5-3.5 turns
            
            // Main spiral path
            const spiralPoints = Math.min(actualLineCount * 2, 20);
            let prevX = center.x;
            let prevY = center.y;
            
            let linesAdded = 0;
            
            for (let i = 1; i <= spiralPoints && linesAdded < actualLineCount - 3; i++) {
                const t = i / spiralPoints;
                const angle = phaseAngles[0] + t * turns * Math.PI * 2;
                const r = t * maxRadius * (1 + Math.sin(t * Math.PI * 4) * spiralTightness * 0.2);
                const x = center.x + Math.cos(angle) * r;
                const y = center.y + Math.sin(angle) * r;
                
                if (i % 2 === 1) {
                    path += `M ${prevX} ${prevY} L ${x} ${y} `;
                    linesAdded++;
                }
                
                prevX = x;
                prevY = y;
            }
            
            // Power marks along spiral
            for (let i = 0; i < harmonics.length && linesAdded < actualLineCount; i++) {
                const t = (i + 1) / (harmonics.length + 1);
                const angle = phaseAngles[0] + t * turns * Math.PI * 2;
                const r = t * maxRadius;
                const x = center.x + Math.cos(angle) * r;
                const y = center.y + Math.sin(angle) * r;
                
                // Cross marks
                const markSize = 3 + harmonics[i] * 5;
                if (linesAdded < actualLineCount) {
                    path += `M ${x - markSize} ${y} L ${x + markSize} ${y} `;
                    linesAdded++;
                }
                if (linesAdded < actualLineCount) {
                    path += `M ${x} ${y - markSize} L ${x} ${y + markSize} `;
                    linesAdded++;
                }
            }
            
            // Terminal flourish
            if (linesAdded < actualLineCount) {
                const endAngle = phaseAngles[0] + turns * Math.PI * 2;
                const endX = center.x + Math.cos(endAngle) * maxRadius;
                const endY = center.y + Math.sin(endAngle) * maxRadius;
                path += `M ${endX - 6} ${endY - 6} L ${endX + 6} ${endY + 6} `;
            }

        } else if (paradigm === 'cybernetic') {
            // COMPLEX CIRCUIT - 7-13 lines forming intricate network
            const nodeCount = Math.min(Math.floor(3 + primaryRhythm * 3), 6);
            const nodes = [];
            
            // Generate node positions with rhythmic distribution
            for (let i = 0; i < nodeCount; i++) {
                const angleOffset = harmonics[i % harmonics.length] * Math.PI / 4;
                const angle = phaseAngles[0] + (i / nodeCount) * Math.PI * 2 + angleOffset;
                const r = radius * (0.4 + (i % 2) * 0.3 + harmonics[i % harmonics.length] * 0.2);
                nodes.push({
                    x: center.x + Math.cos(angle) * r,
                    y: center.y + Math.sin(angle) * r,
                    connections: []
                });
            }
            
            let linesAdded = 0;
            
            // Create connection matrix based on rhythmic patterns
            for (let i = 0; i < nodes.length && linesAdded < actualLineCount - nodeCount; i++) {
                for (let j = i + 1; j < nodes.length && linesAdded < actualLineCount - nodeCount; j++) {
                    const shouldConnect = (harmonics[i % harmonics.length] + harmonics[j % harmonics.length]) / 2 > 0.3;
                    if (shouldConnect || (i === 0 && j === nodes.length - 1)) {
                        path += `M ${nodes[i].x} ${nodes[i].y} L ${nodes[j].x} ${nodes[j].y} `;
                        linesAdded++;
                    }
                }
            }
            
            // Add data flow lines (partial connections)
            for (let i = 0; i < harmonics.length && linesAdded < actualLineCount - nodeCount; i++) {
                const node1 = nodes[i % nodes.length];
                const node2 = nodes[(i + 1) % nodes.length];
                const midX = (node1.x + node2.x) / 2 + Math.sin(phaseAngles[i]) * 10;
                const midY = (node1.y + node2.y) / 2 + Math.cos(phaseAngles[i]) * 10;
                
                if (linesAdded < actualLineCount - nodeCount) {
                    path += `M ${node1.x} ${node1.y} L ${midX} ${midY} `;
                    linesAdded++;
                }
            }
            
            // Node representations (X marks)
            for (let i = 0; i < nodes.length && linesAdded < actualLineCount; i++) {
                const node = nodes[i];
                const size = 2 + harmonics[i % harmonics.length] * 3;
                
                if (linesAdded < actualLineCount) {
                    path += `M ${node.x - size} ${node.y - size} L ${node.x + size} ${node.y + size} `;
                    linesAdded++;
                }
                if (linesAdded < actualLineCount) {
                    path += `M ${node.x + size} ${node.y - size} L ${node.x - size} ${node.y + size} `;
                    linesAdded++;
                }
            }
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