import { motion } from 'framer-motion';

const GnosisHeatmap = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
        >
            <h2 className="text-3xl font-bold mb-4">Gnosis State Analytics</h2>
            <p className="text-gray-400">
                Track your optimal times for magical work based on biorhythms and past sessions.
            </p>
        </motion.div>
    );
};

export default GnosisHeatmap; 