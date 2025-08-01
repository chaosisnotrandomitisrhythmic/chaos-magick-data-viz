import { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import * as d3 from 'd3';
import { useMagickStore } from '../store/useMagickStore';
import { GnosisMethod } from '../types';
import toast from 'react-hot-toast';
import { Sparkles, Zap } from 'lucide-react';

const SigilCreator = () => {
    const [statement, setStatement] = useState('');
    const [gnosisMethod, setGnosisMethod] = useState<GnosisMethod>('meditation');
    const [paradigm, setParadigm] = useState('chaos');
    const [sigilPath, setSigilPath] = useState<string>('');

    const addSigil = useMagickStore((state) => state.addSigil);

    const generateSigil = () => {
        if (!statement.trim()) {
            toast.error('Please enter a statement of intent');
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
        const svg = d3.create('svg')
            .attr('width', 200)
            .attr('height', 200);

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

        // Create path data
        const line = d3.line()
            .x((d: any) => d.x)
            .y((d: any) => d.y)
            .curve(d3.curveBasis);

        // Generate abstract sigil path
        const pathData = links.map(link => {
            const source = nodes[link.source];
            const target = nodes[link.target];
            const midX = (source.x + target.x) / 2 + (Math.random() - 0.5) * 20;
            const midY = (source.y + target.y) / 2 + (Math.random() - 0.5) * 20;
            return line([source, { x: midX, y: midY }, target]);
        }).join(' ');

        // Add some circular elements
        const circles = nodes.map(node =>
            `M ${node.x},${node.y} m -5,0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0`
        ).join(' ');

        const finalPath = `${pathData} ${circles}`;
        setSigilPath(finalPath);
    };

    const saveSigil = () => {
        if (!sigilPath) {
            toast.error('Please generate a sigil first');
            return;
        }

        const newSigil = {
            id: uuidv4(),
            created: new Date(),
            statement,
            abstractForm: sigilPath,
            chargedDates: [],
            gnosisMethod,
            manifestations: [],
            resonanceStrength: 0.5,
            paradigm,
        };

        addSigil(newSigil);
        toast.success('Sigil created and stored!');

        // Reset form
        setStatement('');
        setSigilPath('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-void-black/50 backdrop-blur-lg rounded-xl p-8 border border-chaos-purple/30"
        >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="text-chaos-purple" />
                Create New Sigil
            </h3>

            <div className="space-y-6">
                {/* Statement of Intent */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Statement of Intent
                    </label>
                    <textarea
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        placeholder="I will achieve..."
                        className="w-full px-4 py-3 bg-void-black/50 border border-chaos-purple/30 rounded-lg focus:outline-none focus:border-chaos-purple transition-colors resize-none"
                        rows={3}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        Write in present tense as if already achieved
                    </p>
                </div>

                {/* Gnosis Method */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Gnosis Method
                    </label>
                    <select
                        value={gnosisMethod}
                        onChange={(e) => setGnosisMethod(e.target.value as GnosisMethod)}
                        className="w-full px-4 py-3 bg-void-black/50 border border-chaos-purple/30 rounded-lg focus:outline-none focus:border-chaos-purple transition-colors"
                    >
                        <option value="meditation">Meditation</option>
                        <option value="dance">Dance/Movement</option>
                        <option value="exhaustion">Exhaustion</option>
                        <option value="sex">Sexual Gnosis</option>
                        <option value="pain">Pain</option>
                        <option value="intoxication">Intoxication</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Paradigm */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Current Paradigm
                    </label>
                    <input
                        type="text"
                        value={paradigm}
                        onChange={(e) => setParadigm(e.target.value)}
                        placeholder="chaos, psychological, energy, etc."
                        className="w-full px-4 py-3 bg-void-black/50 border border-chaos-purple/30 rounded-lg focus:outline-none focus:border-chaos-purple transition-colors"
                    />
                </div>

                {/* Generate Button */}
                <motion.button
                    onClick={generateSigil}
                    className="w-full px-6 py-3 bg-sigil-cyan rounded-lg font-semibold hover:bg-sigil-cyan/80 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Zap size={20} />
                    Generate Sigil
                </motion.button>

                {/* Sigil Preview */}
                {sigilPath && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-void-black/70 rounded-lg p-8 border border-sigil-cyan/30"
                    >
                        <svg
                            width="200"
                            height="200"
                            className="mx-auto glow-sigil"
                            viewBox="0 0 200 200"
                        >
                            <path
                                d={sigilPath}
                                fill="none"
                                stroke="#06b6d4"
                                strokeWidth="2"
                                className="animate-pulse-sigil"
                            />
                        </svg>

                        <motion.button
                            onClick={saveSigil}
                            className="w-full mt-6 px-6 py-3 bg-chaos-purple rounded-lg font-semibold hover:bg-chaos-purple/80 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Save Sigil to Collection
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default SigilCreator; 