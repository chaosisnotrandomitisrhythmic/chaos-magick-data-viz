import { useCallback, useRef } from 'react';

// This hook creates synthetic audio for the transformation process
export const useTransformationSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    const initAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    const playTransformationSound = useCallback((type: 'step' | 'complete') => {
        try {
            const audioContext = initAudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            if (type === 'step') {
                // Rising tone for each step
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            } else if (type === 'complete') {
                // Harmonic chord for completion
                const frequencies = [261.63, 329.63, 392.00]; // C major chord
                frequencies.forEach((freq, i) => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    
                    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
                    osc.type = 'sine';
                    
                    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
                    
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    
                    osc.start(audioContext.currentTime + i * 0.1);
                    osc.stop(audioContext.currentTime + 1);
                });
            }
        } catch (error) {
            console.warn('Audio playback failed:', error);
        }
    }, [initAudioContext]);

    return { playTransformationSound };
};