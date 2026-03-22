/* Pure CSS gradient mesh — no canvas, fully GPU-accelerated.
   5 large blurred blobs drift slowly around each other.          */

const blobs = [
  {
    size: '65vmax',
    style: {
      top: '-15%', left: '-10%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 65%)',
      animation: 'blob1 22s ease-in-out infinite',
    },
  },
  {
    size: '55vmax',
    style: {
      top: '30%', right: '-15%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 65%)',
      animation: 'blob2 28s ease-in-out infinite',
    },
  },
  {
    size: '50vmax',
    style: {
      bottom: '-10%', left: '20%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.040) 0%, transparent 65%)',
      animation: 'blob3 20s ease-in-out infinite',
    },
  },
  {
    size: '45vmax',
    style: {
      top: '15%', left: '40%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 65%)',
      animation: 'blob4 32s ease-in-out infinite',
    },
  },
  {
    size: '40vmax',
    style: {
      bottom: '20%', right: '10%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.030) 0%, transparent 65%)',
      animation: 'blob5 18s ease-in-out infinite',
    },
  },
];

export default function GradientMesh() {
  return (
    <>
      <style>{`
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(60px,-80px) scale(1.08); }
          66%      { transform: translate(-40px,50px) scale(0.94); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-80px,60px) scale(1.12); }
          70%      { transform: translate(50px,-40px) scale(0.90); }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          30%      { transform: translate(70px,40px) scale(0.92); }
          60%      { transform: translate(-30px,-70px) scale(1.10); }
        }
        @keyframes blob4 {
          0%,100% { transform: translate(0,0) scale(1); }
          45%      { transform: translate(-60px,-50px) scale(1.06); }
          75%      { transform: translate(40px,60px) scale(0.95); }
        }
        @keyframes blob5 {
          0%,100% { transform: translate(0,0) scale(1); }
          35%      { transform: translate(50px,-60px) scale(1.14); }
          65%      { transform: translate(-50px,40px) scale(0.88); }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {blobs.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: b.size,
              height: b.size,
              filter: 'blur(72px)',
              willChange: 'transform',
              ...b.style,
            }}
          />
        ))}
      </div>
    </>
  );
}
