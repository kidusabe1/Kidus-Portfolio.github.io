import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

const IS_MOBILE    = typeof window !== 'undefined' && window.innerWidth < 768;
const PREFERS_REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const COUNT        = IS_MOBILE ? 40 : 85;
const MAX_DIST     = IS_MOBILE ? 120 : 145;
const SPEED        = PREFERS_REDUCED ? 0.08 : 0.28;
const REPEL_RADIUS = 110;
const REPEL_FORCE  = 2.2;

function makeParticle(w, h) {
  const angle = Math.random() * Math.PI * 2;
  const spd   = SPEED * (0.4 + Math.random() * 0.6);
  return { x: Math.random() * w, y: Math.random() * h, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd };
}

export default function Constellation() {
  const { isDark } = useTheme();
  const canvasRef  = useRef(null);
  const rafRef     = useRef(0);
  const ptRef      = useRef([]);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const dimsRef    = useRef({ w: 0, h: 0 });
  const themeRef   = useRef(isDark);

  // Keep themeRef in sync so the canvas loop can read it without re-init
  useEffect(() => { themeRef.current = isDark; }, [isDark]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.5 : 2);
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
      const { x: mx, y: my } = mouseRef.current;
      const dark = themeRef.current;

      // Particle colors flip with theme
      const dotColor  = dark ? 'rgba(220,220,220,0.50)' : 'rgba(30,30,30,0.40)';
      const lineBase  = dark ? [200, 200, 200] : [30, 30, 30];
      const lineMaxA  = dark ? 0.18 : 0.14;

      ctx.clearRect(0, 0, w, h);

      const pts = ptRef.current;

      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * force * 0.06;
          p.vy += (dy / dist) * force * 0.06;
        }
        p.vx *= 0.98; p.vy *= 0.98;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd < SPEED * 0.3) { p.vx += (Math.random() - 0.5) * 0.05; p.vy += (Math.random() - 0.5) * 0.05; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      }

      // Draw lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * lineMaxA;
            ctx.strokeStyle = `rgba(${lineBase[0]},${lineBase[1]},${lineBase[2]},${a.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }

      // Draw dots
      ctx.fillStyle = dotColor;
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill(); }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
  }, []);

  useEffect(() => {
    init();
    const onResize    = () => { cancelAnimationFrame(rafRef.current); init(); };
    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave     = ()  => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener('resize',    onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize',    onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [init]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        maskImage:
          'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.7) 55%, black 80%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.7) 55%, black 80%)',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
