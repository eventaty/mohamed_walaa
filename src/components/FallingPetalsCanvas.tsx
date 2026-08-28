import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  colorType: 'petal' | 'gold' | 'sparkle';
  oscillationSpeed: number;
  oscillationDistance: number;
  time: number;
}

export const FallingPetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(32, Math.floor(width / 35));
    const particles: Particle[] = [];

    const createParticle = (initialY?: number): Particle => {
      const typeRandom = Math.random();
      let colorType: 'petal' | 'gold' | 'sparkle' = 'petal';
      if (typeRandom > 0.6) colorType = 'gold';
      if (typeRandom > 0.85) colorType = 'sparkle';

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size: colorType === 'petal' ? Math.random() * 8 + 6 : Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: colorType === 'petal' ? Math.random() * 0.8 + 0.6 : Math.random() * 0.5 + 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.6 + 0.25,
        colorType,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 30 + 10,
        time: Math.random() * 100,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate((rotation * Math.PI) / 180);
      context.beginPath();

      // Curved rose petal shape
      context.moveTo(0, 0);
      context.bezierCurveTo(size / 2, -size / 2, size, -size / 4, size, size / 2);
      context.bezierCurveTo(size, size, size / 2, size * 1.3, 0, size * 1.5);
      context.bezierCurveTo(-size / 2, size * 1.3, -size, size, -size, size / 2);
      context.bezierCurveTo(-size, -size / 4, -size / 2, -size / 2, 0, 0);

      const gradient = context.createLinearGradient(-size, -size, size, size);
      gradient.addColorStop(0, `rgba(227, 38, 54, ${opacity})`);
      gradient.addColorStop(0.7, `rgba(168, 28, 47, ${opacity * 0.85})`);
      gradient.addColorStop(1, `rgba(100, 10, 25, ${opacity * 0.6})`);

      context.fillStyle = gradient;
      context.shadowColor = 'rgba(227, 38, 54, 0.4)';
      context.shadowBlur = 4;
      context.fill();
      context.restore();
    };

    const drawGold = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      context.save();
      context.beginPath();
      context.arc(x, y, size / 2, 0, Math.PI * 2);
      context.fillStyle = `rgba(245, 208, 97, ${opacity})`;
      context.shadowColor = 'rgba(212, 175, 55, 0.7)';
      context.shadowBlur = 6;
      context.fill();
      context.restore();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
      const spikes = 4;
      const outerRadius = size * 1.5;
      const innerRadius = size * 0.3;
      let rot = (Math.PI / 2) * 3;
      let step = Math.PI / spikes;

      context.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        let px = Math.cos(rot) * outerRadius;
        let py = Math.sin(rot) * outerRadius;
        context.lineTo(px, py);
        rot += step;

        px = Math.cos(rot) * innerRadius;
        py = Math.sin(rot) * innerRadius;
        context.lineTo(px, py);
        rot += step;
      }
      context.lineTo(0, -outerRadius);
      context.closePath();
      context.fillStyle = `rgba(255, 246, 214, ${opacity})`;
      context.shadowColor = 'rgba(255, 215, 0, 0.8)';
      context.shadowBlur = 8;
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.time += p.oscillationSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.time) * 0.5;
        p.rotation += p.rotationSpeed;

        if (p.colorType === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity);
        } else if (p.colorType === 'gold') {
          drawGold(ctx, p.x, p.y, p.size, p.opacity);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.opacity);
        }

        // Wrap around bottom
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="falling-petals-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
    />
  );
};
