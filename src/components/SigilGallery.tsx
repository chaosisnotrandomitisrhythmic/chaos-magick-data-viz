import { useMagickStore } from '../store/useMagickStore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const SigilGallery = () => {
    const sigils = useMagickStore((state) => state.sigils);
    const chargeSigil = useMagickStore((state) => state.chargeSigil);

    const handleCharge = (sigilId: string) => {
        chargeSigil(sigilId, new Date());
        toast.success('SIGIL CHARGED - ENERGY AMPLIFIED');
    };

    if (sigils.length === 0) {
        return (
            <div className="card">
                <div className="text-center py-10">
                    <p className="text-black text-center py-8 font-bold uppercase">
                        NO SIGILS IN DATABASE
                    </p>
                    <p className="text-black uppercase text-center">
                        CREATE YOUR FIRST SIGIL TO BEGIN
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sigils.map((sigil) => (
                <div
                    key={sigil.id}
                    className="card"
                >
                    <div className="divider flex justify-between items-center">
                        <span className="text-xs font-bold uppercase">SIGIL_{sigil.id.slice(0, 8)}</span>
                        <span className="text-xs text-black">
                            PWR: {Math.floor(sigil.resonanceStrength * 100)}%
                        </span>
                    </div>

                    {/* Sigil Visual */}
                    <div className="p-4 border-b-2 border-black relative">
                        <svg
                            width="120"
                            height="120"
                            className="mx-auto"
                            viewBox="0 0 200 200"
                            style={{
                                filter: 'contrast(1.2)',
                            }}
                        >
                            {/* Grid background */}
                            <defs>
                                <pattern id={`grid-${sigil.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000000" strokeWidth="0.3" opacity="0.1" />
                                </pattern>
                            </defs>
                            <rect width="200" height="200" fill={`url(#grid-${sigil.id})`} />

                            {/* Main sigil */}
                            <path
                                d={sigil.abstractForm}
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2"
                                style={{
                                    strokeWidth: Math.max(1, sigil.resonanceStrength * 3),
                                }}
                            />

                            {/* Glitch overlay */}
                            <path
                                d={sigil.abstractForm}
                                fill="none"
                                stroke="#000000"
                                strokeWidth="1"
                                opacity={sigil.resonanceStrength * 0.3}
                                style={{
                                    transform: 'translate(1px, -1px)',
                                }}
                            />
                        </svg>

                        {/* Psychick Cross indicator for charged sigils */}
                        {sigil.chargedDates.length > 3 && (
                            <div className="absolute top-2 right-2 text-black text-xs">
                                ✠
                            </div>
                        )}
                    </div>

                    {/* Sigil Info */}
                    <div className="p-4 space-y-2 text-xs font-mono">
                        <div className="flex justify-between">
                            <span className="text-black font-bold">CREATED:</span>
                            <span>{format(sigil.created, 'yyyy-MM-dd')}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-black font-bold">METHOD:</span>
                            <span className="uppercase">{sigil.gnosisMethod}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-black font-bold">PARADIGM:</span>
                            <span className="uppercase">{sigil.paradigm}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-black font-bold">CHARGES:</span>
                            <span>{sigil.chargedDates.length}</span>
                        </div>

                        {sigil.chargedDates.length > 0 && (
                            <div className="flex justify-between">
                                <span className="text-black font-bold">LAST:</span>
                                <span>
                                    {format(sigil.chargedDates[sigil.chargedDates.length - 1], 'MM/dd HH:mm')}
                                </span>
                            </div>
                        )}

                        <div className="pt-2">
                            <div className="text-black mb-1 font-bold">INTENT:</div>
                            <div className="text-black text-xs break-words">
                                {sigil.statement.slice(0, 50)}
                                {sigil.statement.length > 50 && '...'}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t-2 border-black">
                        <button
                            onClick={() => handleCharge(sigil.id)}
                            className="btn-primary w-full text-xs"
                        >
                            CHARGE_SIGIL
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SigilGallery; 