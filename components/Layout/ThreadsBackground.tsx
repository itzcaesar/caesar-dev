import React, { useEffect, useRef } from 'react';

const ThreadsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const threads: Thread[] = [];
    const numThreads = 8;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Thread {
      x: number;
      y: number;
      length: number;
      speed: number;
      amplitude: number;
      frequency: number;
      offset: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = -10;
        this.length = Math.random() * 100 + 50;
        this.speed = Math.random() * 0.5 + 0.3;
        this.amplitude = Math.random() * 30 + 10;
        this.frequency = Math.random() * 0.02 + 0.01;
        this.offset = Math.random() * Math.PI * 2;
        // Use theme colors: white with low opacity or accent color
        this.color = Math.random() > 0.7 
          ? 'rgba(204, 255, 0, 0.15)' // Accent color
          : 'rgba(255, 255, 255, 0.08)'; // White
      }

      update() {
        this.y += this.speed;
        
        // Reset when thread goes off screen
        if (this.y > canvas!.height + this.length) {
          this.y = -this.length;
          this.x = Math.random() * canvas!.width;
          this.speed = Math.random() * 0.5 + 0.3;
        }
      }

      draw() {
        if (!ctx) return;

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        // Draw wavy thread
        for (let i = 0; i < this.length; i++) {
          const x = this.x + Math.sin((this.y + i) * this.frequency + this.offset) * this.amplitude;
          const y = this.y + i;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }
    }

    // Initialize threads
    for (let i = 0; i < numThreads; i++) {
      threads.push(new Thread());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'; // Slight trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      threads.forEach(thread => {
        thread.update();
        thread.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ThreadsBackground;
