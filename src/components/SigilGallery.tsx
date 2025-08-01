import { motion } from 'framer-motion';
import { useMagickStore } from '../store/useMagickStore';
import { format } from 'date-fns';
import { Zap, Calendar, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const SigilGallery = () => {
    const sigils = useMagickStore((state) => state.sigils);
    const chargeSigil = useMagickStore((state) => state.chargeSigil);

    const handleCharge = (sigilId: string) => {
        chargeSigil(sigilId, new Date());
        toast.success('Sigil charged! Energy added to the resonance field.');
    };

    if (sigils.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No sigils created yet.</p>
                <p className="text-gray-500 mt-2">Create your first sigil to begin tracking.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sigils.map((sigil, index) => (
                <motion.div
                    key={sigil.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-void-black/50 backdrop-blur-lg rounded-xl p-6 border border-chaos-purple/30 hover:border-chaos-purple/50 transition-all"
                >
                    {/* Sigil Visual */}
                    <div className="mb-4 relative">
                        <svg
                            width="150"
                            height="150"
                            className="mx-auto glow-sigil"
                            viewBox="0 0 200 200"
                        >
                            <path
                                d={sigil.abstractForm}
                                fill="none"
                                stroke="#9333ea"
                                strokeWidth="2"
                                style={{
                                    filter: `drop-shadow(0 0 ${sigil.resonanceStrength * 20}px rgba(147, 51, 234, ${sigil.resonanceStrength}))`,
                                }}
                            />
                        </svg>

                        {/* Resonance Indicator */}
                        <div className="absolute top-2 right-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor: `rgba(236, 72, 153, ${sigil.resonanceStrength})`,
                                    boxShadow: `0 0 10px rgba(236, 72, 153, ${sigil.resonanceStrength})`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Sigil Info */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar size={14} />
                            <span>{format(new Date(sigil.created), 'MMM dd, yyyy')}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Eye size={14} className="text-sigil-cyan" />
                            <span className="text-sigil-cyan">{sigil.paradigm}</span>
                        </div>

                        <div className="text-sm">
                            <span className="text-gray-400">Method:</span>{' '}
                            <span className="text-gnosis-pink capitalize">{sigil.gnosisMethod}</span>
                        </div>

                        <div className="text-sm">
                            <span className="text-gray-400">Charged:</span>{' '}
                            <span className="font-semibold">{sigil.chargedDates.length} times</span>
                        </div>

                        {/* Charge Button */}
                        <motion.button
                            onClick={() => handleCharge(sigil.id)}
                            className="w-full mt-4 px-4 py-2 bg-chaos-purple/20 hover:bg-chaos-purple/30 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Zap size={16} />
                            Charge Sigil
                        </motion.button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default SigilGallery; 