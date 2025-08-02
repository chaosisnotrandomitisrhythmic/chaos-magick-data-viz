import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import { ArrowRight, Eye, Sparkles, Volume2, VolumeX } from 'lucide-react';
import SigilParticleEffect from './SigilParticleEffect';
import { useTransformationSound } from '../hooks/useTransformationSound';

interface TransformationStep {
    label: string;
    description: string;
    content: string;
    visualization?: React.ReactNode;
}

interface SigilTransformationVisualizerProps {
    statement: string;
    onComplete?: (sigilPath: string) => void;
}

const SigilTransformationVisualizer: React.FC<SigilTransformationVisualizerProps> = ({
    statement,
    onComplete
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<TransformationStep[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [finalSigilPath, setFinalSigilPath] = useState<string>('');
    const [soundEnabled, setSoundEnabled] = useState(true);
    const { playTransformationSound } = useTransformationSound();

    useEffect(() => {
        if (statement) {
            generateTransformationSteps();
        }
    }, [statement]);

    const generateTransformationSteps = () => {
        const transformationSteps: TransformationStep[] = [];

        // Step 1: Original Statement
        transformationSteps.push({
            label: 'STATEMENT OF INTENT',
            description: 'Your will expressed in language',
            content: statement,
            visualization: (
                <div className="text-2xl font-bold text-center p-8 bg-white border-4 border-black">
                    <div className="font-mono uppercase tracking-wider">
                        {statement}
                    </div>
                </div>
            )
        });

        // Step 2: Extract Essence
        const cleanStatement = statement.toLowerCase().replace(/[^a-z]/g, '');
        const uniqueLetters = [...new Set(cleanStatement)];
        const coreLetters = uniqueLetters.slice(0, 3);

        transformationSteps.push({
            label: 'RHYTHMIC EXTRACTION',
            description: 'Finding the core rhythm within your statement',
            content: coreLetters.join(' - '),
            visualization: (
                <RhythmicExtraction statement={statement} coreLetters={coreLetters} />
            )
        });

        // Step 3: Calculate Rhythm
        const rhythm = coreLetters.reduce((sum, letter) =>
            sum + (letter.charCodeAt(0) - 97) / 25, 0
        ) / Math.max(coreLetters.length, 1);

        let seed = 0;
        for (let i = 0; i < cleanStatement.length; i++) {
            seed += cleanStatement.charCodeAt(i) * (i + 1);
        }
        const phase = (seed % 8) * (Math.PI / 4);

        transformationSteps.push({
            label: 'PHASE ALIGNMENT',
            description: 'Determining the geometric orientation',
            content: `Rhythm: ${(rhythm * 100).toFixed(0)}% | Phase: ${(phase * 180 / Math.PI).toFixed(0)}°`,
            visualization: (
                <PhaseAlignment rhythm={rhythm} phase={phase} />
            )
        });

        // Step 4: Geometric Manifestation
        const sigilPath = generateMinimalSigil(rhythm, phase);
        setFinalSigilPath(sigilPath);

        transformationSteps.push({
            label: 'SIGIL MANIFESTATION',
            description: 'The pure geometric form emerges',
            content: 'Minimal rhythmic pattern',
            visualization: (
                <SigilManifestation sigilPath={sigilPath} />
            )
        });

        setSteps(transformationSteps);
    };

    const generateMinimalSigil = (rhythm: number, phase: number): string => {
        // Extract intricate rhythms from the statement
        const cleanStatement = statement.toLowerCase().replace(/[^a-z]/g, '');
        
        // Calculate harmonic frequencies
        const letterFreqs = new Map<string, number>();
        for (const letter of cleanStatement) {
            letterFreqs.set(letter, (letterFreqs.get(letter) || 0) + 1);
        }
        
        const uniqueLetters = [...new Set(cleanStatement)];
        const harmonics = uniqueLetters.slice(0, 8).map(letter => {
            const freq = letterFreqs.get(letter) || 1;
            return (letter.charCodeAt(0) - 97) * freq / cleanStatement.length;
        });
        
        // Generate multiple phase angles for complexity
        const phaseAngles = [];
        for (let i = 0; i < Math.min(cleanStatement.length, 13); i++) {
            const char = cleanStatement.charCodeAt(i);
            phaseAngles.push((char * (i + 1) % 360) * Math.PI / 180);
        }
        
        // Determine line count: 7-13 based on complexity
        const vowels = cleanStatement.match(/[aeiou]/g) || [];
        const consonants = cleanStatement.match(/[^aeiou]/g) || [];
        const vowelRhythm = vowels.length / Math.max(cleanStatement.length, 1);
        const complexity = (uniqueLetters.length / 26) * vowelRhythm * rhythm;
        const lineCount = Math.min(Math.max(Math.floor(7 + complexity * 6), 7), 13);
        
        let path = '';
        const center = { x: 100, y: 100 };
        const radius = 60;
        
        // INTRICATE PATTERN - 7-13 lines
        const crossSize = radius * (0.5 + rhythm * 0.5);
        
        // Core structure
        path += `M ${center.x} ${center.y - crossSize} L ${center.x} ${center.y + crossSize} `;
        path += `M ${center.x - crossSize} ${center.y} L ${center.x + crossSize} ${center.y} `;
        
        let linesAdded = 2;
        
        // Add rhythmic marks based on harmonics
        for (let i = 0; i < Math.min(phaseAngles.length, lineCount - 2); i++) {
            const angle = phaseAngles[i];
            const harmonic = harmonics[i % harmonics.length] || rhythm;
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
            if (linesAdded >= lineCount) break;
        }

        return path;
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setIsAnimating(true);
            if (soundEnabled) {
                playTransformationSound('step');
            }
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                setIsAnimating(false);
            }, 300);
        } else if (onComplete && finalSigilPath) {
            if (soundEnabled) {
                playTransformationSound('complete');
            }
            onComplete(finalSigilPath);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(currentStep - 1);
                setIsAnimating(false);
            }, 300);
        }
    };

    if (!statement || steps.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8">
                {steps.map((_, index) => (
                    <div key={index} className="flex items-center flex-1">
                        <div
                            className={`w-10 h-10 border-2 border-black flex items-center justify-center cursor-pointer ${index <= currentStep
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black'
                                }`}
                            onClick={() => !isAnimating && setCurrentStep(index)}
                        >
                            <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-1 h-0.5 bg-black mx-2" />
                        )}
                    </div>
                ))}
            </div>

            {/* Current Step Display */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border-2 border-black p-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">◉</span>
                        <h3 className="text-2xl font-bold uppercase tracking-wider">{steps[currentStep].label}</h3>
                    </div>

                    <p className="text-black mb-6 uppercase text-sm">{steps[currentStep].description}</p>

                    <div className="min-h-[300px] flex items-center justify-center">
                        {steps[currentStep].visualization}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 0 || isAnimating}
                            className={`px-6 py-3 font-bold uppercase tracking-wider transition-colors ${currentStep === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'btn-secondary'
                                }`}
                        >
                            PREVIOUS
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={isAnimating}
                            className="btn-primary px-6 py-3 flex items-center gap-2"
                        >
                            {currentStep === steps.length - 1 ? (
                                <>
                                    COMPLETE
                                    <span className="text-lg">⚡</span>
                                </>
                            ) : (
                                <>
                                    NEXT
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// Component for Rhythmic Extraction
const RhythmicExtraction: React.FC<{ statement: string; coreLetters: string[] }> = ({ statement, coreLetters }) => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <div className="text-lg font-mono uppercase tracking-widest mb-4">
                    {statement}
                </div>
                <div className="flex justify-center items-center gap-4">
                    <span className="text-4xl">→</span>
                    <div className="flex gap-4">
                        {coreLetters.map((letter, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.3 }}
                                className="w-16 h-16 border-4 border-black flex items-center justify-center"
                            >
                                <span className="text-2xl font-bold uppercase">{letter}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center text-sm uppercase">
                Core rhythmic elements extracted
            </div>
        </div>
    );
};

// Component for Phase Alignment
const PhaseAlignment: React.FC<{ rhythm: number; phase: number }> = ({ rhythm, phase }) => {
    const center = { x: 150, y: 150 };
    const radius = 100;

    return (
        <div className="flex flex-col items-center space-y-4">
            <svg width="300" height="300" viewBox="0 0 300 300" className="border-2 border-black">
                {/* Background circle */}
                <circle
                    cx={center.x}
                    cy={center.y}
                    r={radius}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                />

                {/* 8 cardinal directions */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                    const angle = i * Math.PI / 4;
                    const x1 = center.x + Math.cos(angle) * (radius - 10);
                    const y1 = center.y + Math.sin(angle) * (radius - 10);
                    const x2 = center.x + Math.cos(angle) * (radius + 10);
                    const y2 = center.y + Math.sin(angle) * (radius + 10);

                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="black"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Rhythm indicator */}
                <motion.circle
                    cx={center.x}
                    cy={center.y}
                    r={radius * rhythm}
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Phase indicator */}
                <motion.line
                    x1={center.x}
                    y1={center.y}
                    x2={center.x + Math.cos(phase) * radius}
                    y2={center.y + Math.sin(phase) * radius}
                    stroke="black"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Center point */}
                <circle cx={center.x} cy={center.y} r="5" fill="black" />
            </svg>

            <div className="text-center space-y-2">
                <div className="text-sm uppercase font-bold">
                    RHYTHM INTENSITY: {(rhythm * 100).toFixed(0)}%
                </div>
                <div className="text-sm uppercase font-bold">
                    PHASE ANGLE: {(phase * 180 / Math.PI).toFixed(0)}°
                </div>
            </div>
        </div>
    );
};

// Component for Sigil Manifestation
const SigilManifestation: React.FC<{ sigilPath: string }> = ({ sigilPath }) => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative"
            >
                <svg
                    width="300"
                    height="300"
                    viewBox="0 0 200 200"
                    className="border-4 border-black bg-white"
                >
                    {/* Grid background */}
                    <defs>
                        <pattern id="manifestGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000000" strokeWidth="0.5" opacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="200" height="200" fill="url(#manifestGrid)" />

                    {/* Main sigil */}
                    <motion.path
                        d={sigilPath}
                        fill="none"
                        stroke="black"
                        strokeWidth="5"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Glitch overlay */}
                    <motion.path
                        d={sigilPath}
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        opacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: 1,
                            x: [0, 1, -1, 0],
                            y: [0, -1, 1, 0]
                        }}
                        transition={{
                            pathLength: { duration: 2, ease: "easeInOut" },
                            x: { duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 3 },
                            y: { duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 3 }
                        }}
                    />
                </svg>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center space-y-2"
            >
                <div className="text-xs uppercase font-bold">
                    SIGIL GENERATED
                </div>
                <div className="text-xs uppercase">
                    CHAOS IS NOT RANDOM - IT IS RHYTHMIC
                </div>
            </motion.div>
        </div>
    );
};

export default SigilTransformationVisualizer;