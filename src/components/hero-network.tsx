"use client";

import { useEffect, useRef } from "react";

/**
 * Malha de rotas no fundo do hero.
 *
 * Nós distribuídos de forma assimétrica (abertos atrás do título, mais densos nas bordas),
 * ligados aos vizinhos mais próximos. Em repouso, a malha deriva devagar e, de tempos em
 * tempos, um pulso amarelo percorre uma rota — como uma transação passando pelo fluxo.
 * Com o cursor por perto, nós e rotas ganham contraste e conexões latentes aparecem.
 *
 * Um único <canvas>, grafo pré-calculado (sem comparação de todos os pares por quadro),
 * pausado fora da tela e com a aba oculta. Sem hover (toque): só o ambiente, mais leve.
 * Com prefers-reduced-motion: um quadro estático.
 */

type Node = {
  x: number;
  y: number;
  /** Profundidade 0 (fundo) a 1 (frente): tamanho, brilho e paralaxe. */
  z: number;
  ax: number;
  ay: number;
  fx: number;
  fy: number;
  phase: number;
  /** Posição desenhada no quadro atual. */
  px: number;
  py: number;
  /** Ativação suavizada pela proximidade do cursor (0–1). */
  glow: number;
};

type Edge = { a: number; b: number; latent: boolean };
type Pulse = { edge: number; t: number; speed: number; forward: boolean };

const BRAND = "242, 183, 12";
const NEUTRAL = "212, 212, 216";
const RADIUS = 190;

/** Gerador determinístico para que o desenho não mude a cada recarga. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Densidade relativa: baixa atrás do título (esquerda, centro), maior nas bordas e à direita. */
function density(x: number, y: number, w: number, h: number, wide: boolean) {
  const nx = x / w;
  const ny = y / h;
  if (!wide) {
    // Em telas estreitas o texto ocupa a largura toda: malha concentrada no alto e nas bordas.
    const edge = Math.min(nx, 1 - nx);
    return 0.25 + 0.75 * Math.max(1 - edge * 3.2, ny < 0.18 ? 1 : 0, ny > 0.82 ? 0.8 : 0);
  }
  const textZone = Math.exp(-(((nx - 0.26) / 0.24) ** 2) - ((ny - 0.5) / 0.32) ** 2);
  const rightBias = 0.35 + 0.65 * nx;
  const edges = Math.max(0, 1 - Math.min(ny, 1 - ny) * 5);
  return Math.min(1, Math.max(0.08, rightBias * (1 - 0.85 * textZone) + edges * 0.4));
}

function buildGraph(w: number, h: number, count: number, wide: boolean) {
  const random = rng(Math.round(w) * 7 + Math.round(h) * 13 + count);
  const nodes: Node[] = [];
  const minDist = Math.sqrt((w * h) / count) * 0.55;
  let attempts = 0;
  while (nodes.length < count && attempts < count * 60) {
    attempts++;
    const x = random() * w;
    const y = random() * h;
    if (random() > density(x, y, w, h, wide)) continue;
    if (nodes.some((n) => (n.x - x) ** 2 + (n.y - y) ** 2 < minDist * minDist)) continue;
    const z = random();
    nodes.push({
      x,
      y,
      z,
      ax: 3 + random() * 7,
      ay: 3 + random() * 7,
      fx: (Math.PI * 2) / (14 + random() * 16),
      fy: (Math.PI * 2) / (16 + random() * 18),
      phase: random() * Math.PI * 2,
      px: x,
      py: y,
      glow: 0,
    });
  }

  // Rotas: 2 vizinhos mais próximos (visíveis) + até 2 seguintes (latentes, só perto do cursor).
  const edges: Edge[] = [];
  const seen = new Set<string>();
  const maxLen = minDist * 3.2;
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i && o.d < maxLen * maxLen)
      .sort((p, q) => p.d - q.d)
      .slice(0, 4);
    near.forEach((o, rank) => {
      const key = i < o.j ? `${i}-${o.j}` : `${o.j}-${i}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({ a: i, b: o.j, latent: rank >= 2 });
    });
  });

  return { nodes, edges };
}

export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    let width = 0;
    let height = 0;
    let graph = buildGraph(1, 1, 1, true);
    let visibleEdges: number[] = [];
    let pulses: Pulse[] = [];
    let nextPulseAt = 0;
    let frame = 0;
    let running = false;
    let inView = true;
    const pointer = { x: -9999, y: -9999, active: false };
    // Paralaxe suavizada, para a profundidade acompanhar o cursor sem tranco.
    const parallax = { x: 0, y: 0 };

    function resize() {
      const rect = host!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = width >= 1024;
      const area = width * height;
      const count = Math.round(Math.min(wide ? 78 : width >= 640 ? 48 : 28, area / (wide ? 9500 : 11000)));
      graph = buildGraph(width, height, count, wide);
      visibleEdges = graph.edges.map((_, i) => i).filter((i) => !graph.edges[i].latent);
      pulses = [];
      draw(performance.now());
    }

    function spawnPulse(now: number) {
      if (!visibleEdges.length) return;
      // Prefere rotas na metade direita, longe do título.
      for (let tries = 0; tries < 6; tries++) {
        const edge = visibleEdges[Math.floor(Math.random() * visibleEdges.length)];
        const { a, b } = graph.edges[edge];
        const mid = (graph.nodes[a].x + graph.nodes[b].x) / 2;
        if (width < 1024 || mid > width * 0.42 || tries === 5) {
          pulses.push({ edge, t: 0, speed: 0.00028 + Math.random() * 0.00018, forward: Math.random() > 0.5 });
          break;
        }
      }
      const calm = !canHover.matches;
      nextPulseAt = now + (calm ? 4200 : 2400) + Math.random() * 2200;
    }

    let last = performance.now();
    function draw(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      const t = now / 1000;
      const animate = !reduceMotion.matches;
      const interactive = animate && canHover.matches && pointer.active;
      const { nodes, edges } = graph;

      parallax.x += ((interactive ? (pointer.x / width - 0.5) : 0) - parallax.x) * 0.04;
      parallax.y += ((interactive ? (pointer.y / height - 0.5) : 0) - parallax.y) * 0.04;

      ctx!.clearRect(0, 0, width, height);

      // Posições: deriva lenta + atração suave em direção ao cursor.
      for (const n of nodes) {
        const drift = animate ? 1 : 0;
        let x = n.x + Math.sin(t * n.fx + n.phase) * n.ax * drift - parallax.x * 10 * n.z;
        let y = n.y + Math.cos(t * n.fy + n.phase) * n.ay * drift - parallax.y * 8 * n.z;
        let target = 0;
        if (interactive) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            const k = 1 - d / RADIUS;
            target = k * k;
            const pull = target * 9;
            x += (dx / (d || 1)) * pull;
            y += (dy / (d || 1)) * pull;
          }
        }
        n.glow += (target - n.glow) * (animate ? 0.08 : 1);
        n.px = x;
        n.py = y;
      }

      // Rotas.
      ctx!.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const g = Math.max(a.glow, b.glow);
        const depth = 0.55 + 0.45 * ((a.z + b.z) / 2);
        if (e.latent) {
          if (g < 0.04) continue;
          ctx!.strokeStyle = `rgba(${BRAND}, ${(g * 0.32).toFixed(3)})`;
        } else if (g > 0.04) {
          ctx!.strokeStyle = `rgba(${BRAND}, ${(0.06 + g * 0.3).toFixed(3)})`;
        } else {
          ctx!.strokeStyle = `rgba(${NEUTRAL}, ${(0.075 * depth).toFixed(3)})`;
        }
        ctx!.beginPath();
        ctx!.moveTo(a.px, a.py);
        ctx!.lineTo(b.px, b.py);
        ctx!.stroke();
      }

      // Nós.
      for (const n of nodes) {
        const r = 0.9 + n.z * 1.3 + n.glow * 1.4;
        ctx!.fillStyle =
          n.glow > 0.05
            ? `rgba(${BRAND}, ${(0.35 + n.glow * 0.55).toFixed(3)})`
            : `rgba(${NEUTRAL}, ${(0.16 + n.z * 0.22).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(n.px, n.py, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Pulsos: um ponto amarelo percorre a rota e acende o nó de chegada.
      if (animate) {
        if (now >= nextPulseAt && pulses.length < 3) spawnPulse(now);
        pulses = pulses.filter((p) => p.t < 1);
        for (const p of pulses) {
          p.t += p.speed * dt;
          const e = edges[p.edge];
          const from = nodes[p.forward ? e.a : e.b];
          const to = nodes[p.forward ? e.b : e.a];
          const k = Math.min(1, p.t);
          const ease = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
          const x = from.px + (to.px - from.px) * ease;
          const y = from.py + (to.py - from.py) * ease;
          const fade = Math.sin(Math.PI * k);
          ctx!.strokeStyle = `rgba(${BRAND}, ${(0.22 * fade).toFixed(3)})`;
          ctx!.beginPath();
          ctx!.moveTo(from.px, from.py);
          ctx!.lineTo(x, y);
          ctx!.stroke();
          ctx!.fillStyle = `rgba(${BRAND}, ${(0.85 * fade).toFixed(3)})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx!.fill();
          if (k > 0.92) to.glow = Math.max(to.glow, 0.35);
        }
      }
    }

    function loop(now: number) {
      draw(now);
      frame = requestAnimationFrame(loop);
    }

    function sync() {
      const shouldRun = !reduceMotion.matches && inView && document.visibilityState === "visible";
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
        draw(performance.now());
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = host!.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
    }
    function onPointerLeave() {
      pointer.active = false;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    intersection.observe(host);

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", sync);
    reduceMotion.addEventListener("change", sync);

    resize();
    sync();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", sync);
      reduceMotion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
    />
  );
}
