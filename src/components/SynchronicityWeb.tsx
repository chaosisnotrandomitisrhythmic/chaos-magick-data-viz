import { motion } from 'framer-motion';

const SynchronicityWeb = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
        >
            <h2 className="text-3xl font-bold mb-4">Synchronicity Web</h2>
            <p className="text-gray-400">
                Visualize the connections between sigils, events, and manifestations.
            </p>
        </motion.div>
    );
};

export default SynchronicityWeb; 