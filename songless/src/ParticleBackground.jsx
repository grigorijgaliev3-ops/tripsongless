import { useEffect, useRef } from "react";

/* ============= Универсальный фон с эмодзи ============= */
export default function ParticleBackground({ boost, symbol = "🧂" }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const boostRef = useRef(0);
  const rafRef = useRef(null);
  const symbolRef = useRef(symbol);

  useEffect(() => {
    symbolRef.current = symbol;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = Math.min(16, particlesRef.current.length || 12);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 14 + Math.random() * 22,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      rot: (Math.random() - 0.5) * 0.2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      alpha: 0.12 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [symbol]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;

    const resize = () => {
      // Ограничиваем плотность пикселей — на 4K/Retina это главный источник лагов
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(16, Math.max(8, Math.floor((width * height) / 150000)));

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 14 + Math.random() * 22,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      rot: (Math.random() - 0.5) * 0.2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      alpha: 0.12 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
    }));

    let last = performance.now();
    let acc = 0;

    const tick = (now) => {
      rafRef.current = requestAnimationFrame(tick);
      if (document.hidden) return;

      // Держим ~30 fps вместо 60 — визуально незаметно, нагрузка вдвое меньше
      acc += now - last;
      last = now;
      if (acc < 32) return;
      const dt = Math.min(50, acc) / 16.67;
      acc = 0;

      boostRef.current += (boost - boostRef.current) * 0.06;
      const b = boostRef.current;
      const speedMult = 1 + b * 8;
      const scaleMult = 1 + b * 0.4;

      ctx.clearRect(0, 0, width, height);
      const currentSymbol = symbolRef.current;
      const glow = b > 0.1;

      for (const p of particlesRef.current) {
        p.x += p.vx * dt * speedMult;
        p.y += p.vy * dt * speedMult;
        p.rot += p.rotSpeed * dt * speedMult;
        p.phase += 0.015 * speedMult;

        if (p.x < -60) p.x = width + 60;
        if (p.x > width + 60) p.x = -60;
        if (p.y < -60) p.y = height + 60;
        if (p.y > height + 60) p.y = -60;

        const pulse = 0.85 + Math.sin(p.phase) * 0.15;
        const size = p.size * scaleMult * pulse;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.font = `${size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = p.alpha * (1 + b * 0.9);
        // Свечение только в момент победы — постоянные тени дорого стоят
        ctx.shadowBlur = glow ? 20 * (1 + b * 2) : 0;
        ctx.shadowColor = "rgba(167, 139, 250, 0.9)";
        ctx.fillText(currentSymbol, 0, 0);
        ctx.restore();
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [boost]);

  return <canvas ref={canvasRef} className="bg-canvas" />;
}
