import { useEffect, useRef, useCallback } from 'react';

const COUNT       = 160;
const SPEED       = 0.9;
const TAIL        = 28;     // positions stored per particle
const ALPHA_HEAD  = 0.22;
const ALPHA_TAIL  = 0.0;

// Multi-octave sine noise → smooth flow angle
function flowAngle(x, y, t) {
  return (
    Math.sin(x * 0.0040 + t * 0.35) * Math.cos(y * 0.0030 + t * 0.22) +
    Math.sin(x * 0.0090 - t * 0.28) * 0.45 +
    Math.cos(y * 0.0055 + t * 0.18) * 0.30
  ) * Math.PI * 1.6;
}

function makeParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    tail: [],
    life: 0,
    maxLife: 250 + Math.random() * 350,
  };
}

export default function NoiseField() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(0);
  const ptRef     = useRef([]);
  const tRef      = useRef(0);
  const dimsRef   = useRef({ w: 0, h: 0 });

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth, h = window.innerHeight;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.scale(dpr, dpr);
    dimsRef.current = { w, h };

    ptRef.current = Array.from({ length: COUNT }, () => makeParticle(w, h));

    cancelAnimationFrame(rafRef.current);
    const loop = () => {
      const { w, h } = dimsRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const p of ptRef.current) {
        const angle = flowAngle(p.x, p.y, tRef.current);
        p.tail.push({ x: p.x, y: p.y });
        if (p.tail.length > TAIL) p.tail.shift();
        p.x += Math.cos(angle) * SPEED;
        p.y += Math.sin(angle) * SPEED;
        p.life++;

        if (p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10 || p.life > p.maxLife) {
          Object.assign(p, makeParticle(w, h));
          continue;
        }

        // Draw tail — alpha fades from tail to head
        for (let i = 1; i < p.tail.length; i++) {
          const t = i / p.tail.length;
          const alpha = ALPHA_TAIL + t * (ALPHA_HEAD - ALPHA_TAIL);
          ctx.strokeStyle = `rgba(210,210,210,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.tail[i - 1].x, p.tail[i - 1].y);
          ctx.lineTo(p.tail[i].x, p.tail[i].y);
          ctx.stroke();
        }
      }

      tRef.current += 0.007;
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
  }, []);

  useEffect(() => {
    init();
    const onResize = () => { cancelAnimationFrame(rafRef.current); init(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', onResize); };
  }, [init]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 28%, rgba(0,0,0,0.2) 52%, black 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 28%, rgba(0,0,0,0.2) 52%, black 78%)',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
