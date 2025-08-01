import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

interface SigilParticleEffectProps {
    width?: number;
    height?: number;
    particleCount?: number;
    colors?: string[];
}

const SigilParticleEffect: React.FC<SigilParticleEffectProps> = ({
    width = 300,
    height = 300,
    particleCount = 50,
    colors = ['#9333ea', '#06b6d4', '#ec4899']
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize particles
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: Math.random(),
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 3 + 1
        }));

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, width, height);

            particlesRef.current.forEach((particle, index) => {
                // Update particle position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 0.01;

                // Wrap around edges
                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                // Reset dead particles
                if (particle.life <= 0) {
                    particlesRef.current[index] = {
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        life: 1,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        size: Math.random() * 3 + 1
                    };
                }

                // Draw particle
                ctx.globalAlpha = particle.life;
                ctx.fillStyle = particle.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections to nearby particles
                particlesRef.current.forEach((otherParticle) => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );

                    if (distance < 50 && particle !== otherParticle) {
                        ctx.globalAlpha = particle.life * 0.2 * (1 - distance / 50);
                        ctx.strokeStyle = particle.color;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [width, height, particleCount, colors]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute inset-0 opacity-50"
        />
    );
};

export default SigilParticleEffect;