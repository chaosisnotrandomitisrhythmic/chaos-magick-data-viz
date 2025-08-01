import { motion } from 'framer-motion';

const RealityTunnelNav = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
        >
            <h2 className="text-3xl font-bold mb-4">Reality Tunnel Navigator</h2>
            <p className="text-gray-400">
                Switch between belief paradigms and track their effectiveness.
            </p>
        </motion.div>
    );
};

export default RealityTunnelNav; 