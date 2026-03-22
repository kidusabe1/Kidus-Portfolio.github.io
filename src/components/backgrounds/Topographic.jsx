import { useEffect, useRef, useCallback } from 'react';

// Number of contour "layers" drawn
const LINES   = 22;
const ALPHA   = 0.09;

// Layered sine noise — returns a height value in [0,1]
function heightAt(x, y, t) {
  return (
    Math.sin(x * 0.0045 + t * 0.20) * 0.40 +
    Math.sin(x * 0.0120 - y * 0.0060 + t * 0.14) * 0.25 +
    Math.cos(y * 0.0080 + x * 0.0030 - t * 0.18) * 0.20 +
    Math.sin(x * 0.0200 + y * 0.0100 + t * 0.25) * 0.15
  ) * 0.5 + 0.5;
}

export default function Topographic() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(0);
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

    // Step size for sampling — larger = faster, coarser
    const STEP = 6;

    cancelAnimationFrame(rafRef.current);
    const loop = () => {
      const { w, h } = dimsRef.current;
      const t = tRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(200,200,200,${ALPHA})`;
      ctx.lineWidth = 0.9;

      // Draw each contour level as a set of line segments
      // using a simplified marching-squares-like scan
      for (let li = 0; li < LINES; li++) {
        const level = (li + 0.5) / LINES;

        ctx.beginPath();
        let pathStarted = false;

        for (let x = 0; x <= w; x += STEP) {
          // Scan column: find y positions where height crosses level
          let prevH = heightAt(x, 0, t);
          for (let y = STEP; y <= h; y += STEP) {
            const currH = heightAt(x, y, t);
            if ((prevH < level) !== (currH < level)) {
              // Linear interpolation to find exact crossing y
              const frac = (level - prevH) / (currH - prevH);
              const cy = y - STEP + frac * STEP;
              if (!pathStarted) {
                ctx.moveTo(x, cy);
                pathStarted = true;
              } else {
                ctx.lineTo(x, cy);
              }
            }
            prevH = currH;
          }
        }
        ctx.stroke();
      }

      tRef.current += 0.006;
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
        maskImage: 'radial-gradient(ellipse 88% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.25) 50%, black 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.25) 50%, black 78%)',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
