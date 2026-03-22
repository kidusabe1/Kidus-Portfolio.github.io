import { useEffect, useRef, useCallback } from 'react';

const CELL     = 5;
const INTERVAL = 180;   // slightly slower → more meditative
const DENSITY  = 0.10;
const MAX_AGE  = 30;    // generations to reach full brightness
const BUCKETS  = 6;     // alpha steps for batched drawing

// Min/max alpha for cells — never fully transparent, never too bright
const ALPHA_MIN = 0.07;
const ALPHA_MAX = 0.32;

// Several click patterns to keep things interesting
const PATTERNS = {
  glider:    [[0,1],[1,2],[2,0],[2,1],[2,2]],
  blinker:   [[0,0],[0,1],[0,2]],
  toad:      [[0,1],[0,2],[0,3],[1,0],[1,1],[1,2]],
  rpentomino:[[0,1],[0,2],[1,0],[1,1],[2,1]],
  beacon:    [[0,0],[0,1],[1,0],[2,3],[3,2],[3,3]],
};
const PATTERN_KEYS = Object.keys(PATTERNS);

export default function GameOfLife() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(0);
  // Store age (0 = dead, 1..MAX_AGE = alive for N gens)
  const gridRef   = useRef(null);
  const colsRef   = useRef(0);
  const rowsRef   = useRef(0);
  const lastRef   = useRef(0);
  const dimsRef   = useRef({ w: 0, h: 0 });

  const idx = (r, c) => r * colsRef.current + c;

  const neighbors = (grid, r, c) => {
    const R = rowsRef.current, C = colsRef.current;
    let n = 0;
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        n += grid[idx((r + dr + R) % R, (c + dc + C) % C)] > 0 ? 1 : 0;
      }
    return n;
  };

  const step = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const R = rowsRef.current, C = colsRef.current;
    const next = new Uint8Array(R * C);
    for (let r = 0; r < R; r++)
      for (let c = 0; c < C; c++) {
        const n = neighbors(grid, r, c);
        const age = grid[idx(r, c)];
        if (age > 0) {
          // Alive: survive on 2 or 3 neighbors — increment age, cap at MAX_AGE
          next[idx(r, c)] = (n === 2 || n === 3) ? Math.min(age + 1, MAX_AGE) : 0;
        } else {
          // Dead: born on exactly 3 neighbors — start at age 1
          next[idx(r, c)] = n === 3 ? 1 : 0;
        }
      }
    gridRef.current = next;
  };

  const draw = (ctx) => {
    const grid = gridRef.current;
    if (!grid) return;
    const { w, h } = dimsRef.current;
    const R = rowsRef.current, C = colsRef.current;

    ctx.clearRect(0, 0, w, h);

    // Batch draw by age bucket for performance
    for (let b = 1; b <= BUCKETS; b++) {
      const t = b / BUCKETS;
      const alpha = ALPHA_MIN + t * (ALPHA_MAX - ALPHA_MIN);
      ctx.fillStyle = `rgba(210, 210, 210, ${alpha.toFixed(3)})`;
      for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++) {
          const age = grid[idx(r, c)];
          if (age === 0) continue;
          const bucket = Math.min(Math.ceil((age / MAX_AGE) * BUCKETS), BUCKETS);
          if (bucket === b)
            ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
        }
    }
  };

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w   = window.innerWidth;
    const h   = window.innerHeight;

    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(w / CELL);
    const rows = Math.ceil(h / CELL);
    colsRef.current = cols;
    rowsRef.current = rows;
    dimsRef.current = { w, h };

    // Seed with random ages so the grid looks "lived-in" from the start
    const grid = new Uint8Array(rows * cols);
    for (let i = 0; i < grid.length; i++)
      grid[i] = Math.random() < DENSITY ? Math.ceil(Math.random() * MAX_AGE) : 0;
    gridRef.current = grid;
    lastRef.current = performance.now();

    cancelAnimationFrame(rafRef.current);
    const loop = (now) => {
      if (now - lastRef.current >= INTERVAL) {
        step();
        draw(ctx);
        lastRef.current = now;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    draw(ctx);
    rafRef.current = requestAnimationFrame(loop);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    init();

    const onResize = () => { cancelAnimationFrame(rafRef.current); init(); };

    const onClick = (e) => {
      const grid = gridRef.current;
      if (!grid) return;
      // Pick a random pattern
      const pattern = PATTERNS[PATTERN_KEYS[Math.floor(Math.random() * PATTERN_KEYS.length)]];
      const col = Math.floor(e.clientX / CELL);
      const row = Math.floor(e.clientY / CELL);
      for (const [dr, dc] of pattern) {
        const r = row + dr, c = col + dc;
        if (r >= 0 && r < rowsRef.current && c >= 0 && c < colsRef.current)
          grid[idx(r, c)] = 1;
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('click', onClick);
    };
  }, [init]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        // Asymmetric ellipse — slightly off-center for a more organic feel
        maskImage:
          'radial-gradient(ellipse 78% 70% at 52% 48%, transparent 22%, rgba(0,0,0,0.15) 45%, black 72%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 78% 70% at 52% 48%, transparent 22%, rgba(0,0,0,0.15) 45%, black 72%)',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
