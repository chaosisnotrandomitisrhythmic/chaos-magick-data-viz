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

// Letter to abstract shape mappings for transformation
const letterToShape = {
    'A': 'M50,150 L100,50 L150,150 M75,100 L125,100',
    'B': 'M50,50 L50,150 M50,50 Q100,50 100,75 Q100,100 50,100 M50,100 Q100,100 100,125 Q100,150 50,150',
    'C': 'M150,50 Q50,50 50,100 Q50,150 150,150',
    'D': 'M50,50 L50,150 M50,50 Q150,75 150,100 Q150,125 50,150',
    'E': 'M150,50 L50,50 L50,150 L150,150 M50,100 L100,100',
    'F': 'M150,50 L50,50 L50,150 M50,100 L100,100',
    'G': 'M150,50 Q50,50 50,100 Q50,150 150,150 L150,100 L100,100',
    'H': 'M50,50 L50,150 M150,50 L150,150 M50,100 L150,100',
    'I': 'M75,50 L125,50 M100,50 L100,150 M75,150 L125,150',
    'J': 'M100,50 L150,50 M125,50 L125,125 Q125,150 100,150 Q75,150 75,125',
    'K': 'M50,50 L50,150 M150,50 L50,100 L150,150',
    'L': 'M50,50 L50,150 L150,150',
    'M': 'M50,150 L50,50 L100,100 L150,50 L150,150',
    'N': 'M50,150 L50,50 L150,150 L150,50',
    'O': 'M100,50 Q150,50 150,100 Q150,150 100,150 Q50,150 50,100 Q50,50 100,50',
    'P': 'M50,150 L50,50 M50,50 Q100,50 100,75 Q100,100 50,100',
    'Q': 'M100,50 Q150,50 150,100 Q150,150 100,150 Q50,150 50,100 Q50,50 100,50 M120,130 L150,160',
    'R': 'M50,150 L50,50 M50,50 Q100,50 100,75 Q100,100 50,100 M75,100 L150,150',
    'S': 'M150,50 Q50,50 50,75 Q50,100 100,100 Q150,100 150,125 Q150,150 50,150',
    'T': 'M50,50 L150,50 M100,50 L100,150',
    'U': 'M50,50 L50,125 Q50,150 75,150 Q100,150 125,150 Q150,150 150,125 L150,50',
    'V': 'M50,50 L100,150 L150,50',
    'W': 'M50,50 L75,150 L100,100 L125,150 L150,50',
    'X': 'M50,50 L150,150 M150,50 L50,150',
    'Y': 'M50,50 L100,100 L150,50 M100,100 L100,150',
    'Z': 'M50,50 L150,50 L50,150 L150,150'
};

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
            label: 'Statement of Intent',
            description: 'Your original desire expressed in words',
            content: statement,
            visualization: (
                <div className="text-2xl font-bold text-center p-8 bg-gradient-to-br from-chaos-purple/20 to-sigil-cyan/20 rounded-lg">
                    {statement}
                </div>
            )
        });

        // Step 2: Remove Spaces & Uppercase
        const uppercased = statement.toUpperCase().replace(/\s/g, '');
        transformationSteps.push({
            label: 'Condensation',
            description: 'Remove spaces and convert to uppercase - condensing the energy',
            content: uppercased,
            visualization: (
                <div className="space-y-4">
                    <div className="text-xl font-mono tracking-wider text-center">
                        {uppercased.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="inline-block mx-1 text-sigil-cyan"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </div>
            )
        });

        // Step 3: Remove Vowels
        const noVowels = uppercased.replace(/[AEIOU]/g, '');
        transformationSteps.push({
            label: 'Vowel Extraction',
            description: 'Remove vowels - stripping away the obvious meaning',
            content: noVowels,
            visualization: (
                <div className="space-y-4">
                    <div className="text-xl font-mono tracking-wider text-center">
                        {uppercased.split('').map((char, i) => {
                            const isVowel = /[AEIOU]/.test(char);
                            return (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 1 }}
                                    animate={{ 
                                        opacity: isVowel ? 0 : 1,
                                        scale: isVowel ? 0 : 1
                                    }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`inline-block mx-1 ${isVowel ? 'text-red-500' : 'text-sigil-cyan'}`}
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                    </div>
                    <div className="text-xl font-mono tracking-wider text-center mt-4">
                        {noVowels.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.05 }}
                                className="inline-block mx-1 text-chaos-purple"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </div>
            )
        });

        // Step 4: Remove Duplicates
        const uniqueLetters = [...new Set(noVowels)].join('');
        transformationSteps.push({
            label: 'Essence Distillation',
            description: 'Remove duplicate letters - finding the unique essence',
            content: uniqueLetters,
            visualization: (
                <div className="space-y-4">
                    <div className="text-xl font-mono tracking-wider text-center">
                        {noVowels.split('').map((char, i) => {
                            const firstIndex = noVowels.indexOf(char);
                            const isDuplicate = i !== firstIndex;
                            return (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 1 }}
                                    animate={{ 
                                        opacity: isDuplicate ? 0.2 : 1,
                                        scale: isDuplicate ? 0.8 : 1
                                    }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`inline-block mx-1 ${isDuplicate ? 'text-gray-500' : 'text-chaos-purple'}`}
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                    </div>
                    <div className="text-2xl font-bold tracking-widest text-center mt-4">
                        {uniqueLetters.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="inline-block mx-2 text-sigil-cyan glow-text"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </div>
            )
        });

        // Step 5: Letter to Shape Transformation
        transformationSteps.push({
            label: 'Symbolic Abstraction',
            description: 'Watch as letters transform into abstract symbolic forms',
            content: 'Letters morphing into shapes',
            visualization: (
                <LetterToShapeTransformation letters={uniqueLetters} />
            )
        });

        // Step 6: Shape Combination and Overlap
        transformationSteps.push({
            label: 'Geometric Fusion',
            description: 'Individual shapes combine and overlap to create unified form',
            content: 'Shapes merging',
            visualization: (
                <ShapeCombination letters={uniqueLetters} />
            )
        });

        // Step 7: Final Abstract Sigil
        const sigilPath = generateSigilPath(uniqueLetters);
        setFinalSigilPath(sigilPath);
        
        transformationSteps.push({
            label: 'Sigil Manifestation',
            description: 'The final abstract sigil charged with your intention',
            content: 'Abstract sigil generated',
            visualization: (
                <div className="flex flex-col items-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <SigilParticleEffect width={300} height={300} />
                        <svg
                            width="300"
                            height="300"
                            className="glow-sigil relative z-10"
                            viewBox="0 0 200 200"
                        >
                            <motion.path
                                d={sigilPath}
                                fill="none"
                                stroke="url(#sigilGradient)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <defs>
                                <linearGradient id="sigilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#9333ea" />
                                    <stop offset="50%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#9333ea" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="text-sm text-gray-400 text-center"
                    >
                        The sigil is now charged with your intention
                    </motion.p>
                </div>
            )
        });

        setSteps(transformationSteps);
    };

    const generateSigilPath = (letters: string): string => {
        const nodes = letters.split('').map((letter, i) => ({
            id: letter,
            x: 100 + Math.cos(i * 2 * Math.PI / letters.length) * 60,
            y: 100 + Math.sin(i * 2 * Math.PI / letters.length) * 60,
        }));

        const links: any[] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() > 0.4) {
                    links.push({ source: i, target: j });
                }
            }
        }

        const line = d3.line<{x: number, y: number}>()
            .x((d) => d.x)
            .y((d) => d.y)
            .curve(d3.curveBasis);

        const pathData = links.map(link => {
            const source = nodes[link.source];
            const target = nodes[link.target];
            const midX = (source.x + target.x) / 2 + (Math.random() - 0.5) * 30;
            const midY = (source.y + target.y) / 2 + (Math.random() - 0.5) * 30;
            return line([source, { x: midX, y: midY }, target]);
        }).join(' ');

        const circles = nodes.map(node =>
            `M ${node.x},${node.y} m -8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0`
        ).join(' ');

        // Add some decorative elements
        const decorative = nodes.map((node, i) => {
            const angle = (i * 2 * Math.PI) / nodes.length;
            const x2 = node.x + Math.cos(angle) * 20;
            const y2 = node.y + Math.sin(angle) * 20;
            return `M ${node.x},${node.y} L ${x2},${y2}`;
        }).join(' ');

        return `${pathData} ${circles} ${decorative}`;
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
            {/* Sound Toggle */}
            <div className="flex justify-end mb-4">
                <motion.button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 rounded-lg bg-void-black/50 border border-chaos-purple/30 hover:border-chaos-purple transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                >
                    {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8">
                {steps.map((_, index) => (
                    <div key={index} className="flex items-center">
                        <motion.div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                index <= currentStep
                                    ? 'bg-chaos-purple border-chaos-purple'
                                    : 'bg-transparent border-gray-600'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => !isAnimating && setCurrentStep(index)}
                        >
                            <span className="text-sm font-bold">{index + 1}</span>
                        </motion.div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-12 h-0.5 ${
                                    index < currentStep ? 'bg-chaos-purple' : 'bg-gray-600'
                                }`}
                            />
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
                    className="bg-void-black/50 backdrop-blur-lg rounded-xl p-8 border border-chaos-purple/30"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Eye className="text-chaos-purple" size={24} />
                        <h3 className="text-2xl font-bold">{steps[currentStep].label}</h3>
                    </div>
                    
                    <p className="text-gray-400 mb-6">{steps[currentStep].description}</p>
                    
                    <div className="min-h-[200px] flex items-center justify-center">
                        {steps[currentStep].visualization}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <motion.button
                            onClick={handlePrevious}
                            disabled={currentStep === 0 || isAnimating}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                currentStep === 0
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-chaos-purple hover:bg-chaos-purple/80'
                            }`}
                            whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
                            whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
                        >
                            Previous
                        </motion.button>

                        <motion.button
                            onClick={handleNext}
                            disabled={isAnimating}
                            className="px-6 py-3 bg-sigil-cyan rounded-lg font-semibold hover:bg-sigil-cyan/80 transition-colors flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {currentStep === steps.length - 1 ? (
                                <>
                                    <Sparkles size={20} />
                                    Complete Transformation
                                </>
                            ) : (
                                <>
                                    Next
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// Component for Letter to Shape Transformation
const LetterToShapeTransformation: React.FC<{ letters: string }> = ({ letters }) => {
    const [stage, setStage] = useState(0);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (stage < 3) {
                setStage(stage + 1);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [stage]);

    const getLetterPath = (letter: string) => {
        return letterToShape[letter as keyof typeof letterToShape] || letterToShape['A'];
    };

    // Generate morph path that transitions from letter outline to abstract shape
    const getMorphPath = (letter: string, progress: number) => {
        const letterPath = getLetterPath(letter);
        // This creates an intermediate state between letter and abstract form
        return letterPath;
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                {letters.split('').slice(0, 9).map((letter, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        <svg
                            width="150"
                            height="150"
                            viewBox="0 0 200 200"
                            className="border border-chaos-purple/20 rounded-lg bg-void-black/50"
                        >
                            {/* Background glow effect */}
                            {stage >= 2 && (
                                <motion.circle
                                    cx="100"
                                    cy="100"
                                    r="60"
                                    fill="url(#glowGradient)"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: 0.3 }}
                                    transition={{ duration: 1 }}
                                />
                            )}

                            {/* Letter Text */}
                            <motion.text
                                x="100"
                                y="100"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="80"
                                fill="#9333ea"
                                opacity={stage === 0 ? 1 : stage === 1 ? 0.5 : 0}
                                transition={{ duration: 1 }}
                                className="font-bold"
                            >
                                {letter}
                            </motion.text>

                            {/* Transformation Lines */}
                            {stage >= 1 && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: stage === 1 ? 0.5 : 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <motion.path
                                        d={getLetterPath(letter)}
                                        fill="none"
                                        stroke="#06b6d4"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        strokeDasharray="5 5"
                                        className={stage >= 2 ? "animate-pulse" : ""}
                                    />
                                </motion.g>
                            )}

                            {/* Abstract Form */}
                            {stage >= 2 && (
                                <motion.g
                                    initial={{ opacity: 0, rotate: 0 }}
                                    animate={{ 
                                        opacity: 1, 
                                        rotate: (index * 45) % 360,
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 1 }}
                                    style={{ transformOrigin: '100px 100px' }}
                                >
                                    <motion.path
                                        d={getLetterPath(letter)}
                                        fill="none"
                                        stroke="url(#letterGradient)"
                                        strokeWidth="3"
                                        filter="url(#glow)"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    
                                    {/* Additional decorative elements */}
                                    <motion.circle
                                        cx="100"
                                        cy="100"
                                        r="4"
                                        fill="#06b6d4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.5, 1] }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    />
                                </motion.g>
                            )}

                            {/* Energy particles */}
                            {stage >= 3 && (
                                <>
                                    {[...Array(3)].map((_, i) => (
                                        <motion.circle
                                            key={i}
                                            r="2"
                                            fill="#9333ea"
                                            initial={{ 
                                                x: 100, 
                                                y: 100,
                                                scale: 0
                                            }}
                                            animate={{ 
                                                x: 100 + Math.cos(i * 120 * Math.PI / 180) * 40,
                                                y: 100 + Math.sin(i * 120 * Math.PI / 180) * 40,
                                                scale: [0, 1, 0]
                                            }}
                                            transition={{ 
                                                duration: 2, 
                                                repeat: Infinity,
                                                delay: i * 0.3
                                            }}
                                        />
                                    ))}
                                </>
                            )}

                            <defs>
                                <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#9333ea" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                                <radialGradient id="glowGradient">
                                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                                </radialGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                        </svg>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-4 text-sm text-gray-400">
                {stage === 0 && "Original letters from your intention"}
                {stage === 1 && "Tracing geometric forms within each letter"}
                {stage === 2 && "Abstracting into mystical symbols"}
                {stage === 3 && "Symbols charged with transformative energy"}
            </div>
        </div>
    );
};

// Component for Shape Combination
const ShapeCombination: React.FC<{ letters: string }> = ({ letters }) => {
    const [combinationStage, setCombinationStage] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (combinationStage < 3) {
                setCombinationStage(combinationStage + 1);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [combinationStage]);

    const getLetterPath = (letter: string, index: number) => {
        const basePath = letterToShape[letter as keyof typeof letterToShape] || letterToShape['A'];
        // Apply transformation based on position in circle
        const angle = (index * 2 * Math.PI) / letters.length;
        const translateX = Math.cos(angle) * 50;
        const translateY = Math.sin(angle) * 50;
        return { path: basePath, translateX, translateY, angle: (angle * 180) / Math.PI };
    };

    return (
        <div className="flex justify-center">
            <svg width="400" height="400" viewBox="0 0 400 400" className="border border-chaos-purple/20 rounded-lg">
                <g transform="translate(200, 200)">
                    {letters.split('').map((letter, index) => {
                        const { path, translateX, translateY, angle } = getLetterPath(letter, index);
                        return (
                            <motion.g
                                key={index}
                                initial={{ 
                                    opacity: 0,
                                    x: translateX * 2,
                                    y: translateY * 2,
                                    scale: 0.5
                                }}
                                animate={{
                                    opacity: combinationStage >= 1 ? 0.7 : 0,
                                    x: combinationStage >= 2 ? 0 : translateX,
                                    y: combinationStage >= 2 ? 0 : translateY,
                                    scale: combinationStage >= 2 ? 1.2 : 1,
                                    rotate: combinationStage >= 3 ? angle : 0
                                }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                            >
                                <path
                                    d={path}
                                    fill="none"
                                    stroke={combinationStage >= 3 ? "url(#combinedGradient)" : "#06b6d4"}
                                    strokeWidth="2"
                                    opacity={combinationStage >= 3 ? 0.8 : 1}
                                    transform="translate(-100, -100) scale(0.8)"
                                />
                            </motion.g>
                        );
                    })}

                    {/* Central binding circle */}
                    {combinationStage >= 3 && (
                        <motion.circle
                            r="80"
                            fill="none"
                            stroke="url(#combinedGradient)"
                            strokeWidth="1"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                            transition={{ duration: 1 }}
                        />
                    )}
                </g>

                <defs>
                    <linearGradient id="combinedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333ea" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#9333ea" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default SigilTransformationVisualizer;