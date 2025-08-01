import { useState, useEffect } from 'react';
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

        // Step 5: Abstract Sigil
        const sigilPath = generateSigilPath(uniqueLetters);
        setFinalSigilPath(sigilPath);
        
        transformationSteps.push({
            label: 'Sigil Manifestation',
            description: 'Transform letters into abstract symbolic form',
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
                                className={`w-16 h-0.5 ${
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

export default SigilTransformationVisualizer;