import confetti from "canvas-confetti";

const heart = confetti.shapeFromPath({
  path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
});

const base = {
  shapes: [heart],
  scalar: 2,
  colors: ["#B6F23A", "#F2C9CF", "#FFFFFF", "#9a2a4c"],
  disableForReducedMotion: true,
};

export function burstHearts(origin = { x: 0.5, y: 0.6 }) {
  confetti({
    ...base,
    particleCount: 60,
    spread: 80,
    startVelocity: 35,
    origin,
  });
}

export function rainHearts(duration = 2500) {
  const end = Date.now() + duration;
  (function frame() {
    confetti({ ...base, particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
    confetti({ ...base, particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
