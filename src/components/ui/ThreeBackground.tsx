"use client";

import { useEffect, useRef } from "react";
import type * as THREENS from "three";

type Three = typeof THREENS;

// Far layers carry a larger base size to offset perspective attenuation, so
// they stay visible without flattening the near/far size difference.
const LAYERS = [
  { count: 820, zNear: -70, zFar: -30, size: 0.26, opacity: 0.3, spread: 90 },
  { count: 520, zNear: -30, zFar: -14, size: 0.19, opacity: 0.5, spread: 55 },
  { count: 260, zNear: -14, zFar: -3, size: 0.135, opacity: 0.7, spread: 30 },
];

/** Soft round sprite, so points read as motes rather than squares. */
function makeDotTexture(THREE: Three) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.65)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let teardown: (() => void) | undefined;

    // Loaded as its own async chunk so three never blocks first paint.
    import("three")
      .then((THREE) => {
        if (disposed) return;
        teardown = start(THREE, mount);
      })
      .catch(() => {
        /* No WebGL or chunk failed: the CSS starfield stays as-is. */
      });

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}

function start(THREE: Three, mount: HTMLDivElement): (() => void) | undefined {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  const bgColor = new THREE.Color(read("--color-bg", "#0a0908"));
  const moteColor = new THREE.Color(read("--color-fg", "#e8e4dc"));
  const accentColor = new THREE.Color(read("--color-accent-readable", "#d65d72"));

  let renderer: THREENS.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
  } catch {
    return undefined;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearAlpha(0);
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Exponential fog is what makes distance read as distance: far motes dissolve
  // into the page background instead of just getting smaller.
  scene.fog = new THREE.FogExp2(bgColor.getHex(), 0.019);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    140
  );
  camera.position.set(0, 0, 8);

  const dot = makeDotTexture(THREE);
  const field = new THREE.Group();
  scene.add(field);

  const disposables: { dispose(): void }[] = [dot];

  const addLayer = (
    cfg: (typeof LAYERS)[number] & { color: THREENS.Color }
  ) => {
    const positions = new Float32Array(cfg.count * 3);
    for (let i = 0; i < cfg.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * cfg.spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * cfg.spread * 0.62;
      positions[i * 3 + 2] = cfg.zNear + Math.random() * (cfg.zFar - cfg.zNear);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: cfg.size,
      map: dot,
      color: cfg.color,
      transparent: true,
      opacity: cfg.opacity,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    disposables.push(geometry, material);
    field.add(new THREE.Points(geometry, material));
  };

  LAYERS.forEach((cfg) => addLayer({ ...cfg, color: moteColor }));
  // A sparse wine layer so the field carries the brand colour, not just bone.
  addLayer({
    count: 70,
    zNear: -26,
    zFar: -6,
    size: 0.32,
    opacity: 0.55,
    spread: 46,
    color: accentColor,
  });

  let pointerX = 0;
  let pointerY = 0;
  let scroll = 0;
  let camX = 0;
  let camY = 0;
  let camZ = 8;
  let running = true;
  let frame = 0;

  const onPointerMove = (e: PointerEvent) => {
    pointerX = e.clientX / window.innerWidth - 0.5;
    pointerY = e.clientY / window.innerHeight - 0.5;
  };

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scroll = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
  };

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const onVisibility = () => {
    running = !document.hidden;
    if (running) frame = requestAnimationFrame(tick);
  };

  const onContextLost = (e: Event) => {
    e.preventDefault();
    running = false;
    cancelAnimationFrame(frame);
  };

  function tick() {
    if (!running) return;

    // Lateral drift from the pointer; layers at different depths separate on
    // their own because the camera actually moves through a 3D field.
    camX += (pointerX * 3.2 - camX) * 0.035;
    camY += (-pointerY * 1.9 - camY) * 0.035;
    // Scrolling flies the camera forward, so the near motes sweep past.
    camZ += (8 - scroll * 9 - camZ) * 0.045;

    camera.position.set(camX, camY, camZ);
    camera.lookAt(0, 0, -20);

    field.rotation.y += 0.00016;
    field.rotation.x = Math.sin(Date.now() * 0.00004) * 0.03;

    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  }

  onScroll();
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);

  document.documentElement.classList.add("three-active");
  frame = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(frame);
    document.documentElement.classList.remove("three-active");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
