import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { PHOTOS } from "../config";
import { resolveImage } from "../utils/images";
import SectionCard from "./SectionCard";

const LAST = PHOTOS.length - 1;
const DEFAULT_RATIO = 4 / 5;
const NAV =
  "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-wine/90 text-ink shadow-tile ring-1 ring-white/10 transition-opacity duration-200 disabled:pointer-events-none disabled:opacity-0";

export default function PhotoCarousel({ className = "", delay = 0 }) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [ratios, setRatios] = useState({}); // proporción real de cada foto (ancho/alto)
  const frameRef = useRef(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const el = frameRef.current;
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    controls.set({ x: -index * width });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const saveRatio = (file, img) => {
    if (!img?.naturalWidth) return;
    const r = img.naturalWidth / img.naturalHeight;
    setRatios((prev) => (prev[file] === r ? prev : { ...prev, [file]: r }));
  };

  // El marco toma la altura natural de la foto actual (limitada a 78% de la pantalla por CSS)
  const ratio = ratios[PHOTOS[index].file] ?? DEFAULT_RATIO;
  const height = width ? Math.max(240, Math.round(width / ratio)) : 420;

  const goTo = (i) => {
    const n = Math.max(0, Math.min(LAST, i));
    setIndex(n);
    controls.start({ x: -n * width, transition: { type: "spring", duration: 0.45, bounce: 0 } });
  };

  const onDragEnd = (_, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) > 60 || Math.abs(velocity.x) > 500;
    goTo(swipe ? index + (offset.x < 0 ? 1 : -1) : index);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  };

  return (
    <SectionCard title="Nuestros momentos" className={className} delay={delay}>
      <motion.div
        ref={frameRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Fotos de nuestros recuerdos"
        initial={false}
        animate={{ height }}
        transition={{ type: "spring", duration: 0.45, bounce: 0 }}
        style={{ maxHeight: "78dvh" }}
        className="relative overflow-hidden rounded-[2rem] bg-black/30 shadow-[0_16px_32px_-14px_rgba(10,0,5,0.6)] ring-1 ring-white/10"
      >
        <motion.div
          className="flex h-full cursor-grab touch-pan-y active:cursor-grabbing"
          drag="x"
          dragElastic={0.15}
          dragConstraints={{ left: -LAST * width, right: 0 }}
          onDragEnd={onDragEnd}
          animate={controls}
        >
          {PHOTOS.map(({ file, caption }) => {
            const src = resolveImage(file);
            return (
              <figure key={file} className="h-full w-full shrink-0">
                {src ? (
                  <img
                    ref={(el) => el?.complete && saveRatio(file, el)}
                    src={src}
                    alt={caption}
                    draggable={false}
                    onLoad={(e) => saveRatio(file, e.currentTarget)}
                    className="h-full w-full select-none object-contain"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center p-6 text-center text-sm text-ink/70">
                    <div>
                      <Heart className="mx-auto mb-2 text-lime" />
                      Agrega <code>src/assets/images/{file}</code>
                    </div>
                  </div>
                )}
              </figure>
            );
          })}
        </motion.div>

        <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-wine/90 px-3 py-1 text-[12px] font-semibold tabular-nums">
          {index + 1} / {PHOTOS.length}
        </span>

        <motion.p
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="pointer-events-none absolute inset-x-4 bottom-4 z-10 rounded-3xl border border-white/10 bg-wine/90 px-5 py-4 font-serif text-[1.35rem] leading-tight tracking-[-0.01em]"
        >
          {PHOTOS[index].caption}
        </motion.p>

        <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Foto anterior" className={`${NAV} left-3`}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => goTo(index + 1)} disabled={index === LAST} aria-label="Foto siguiente" className={`${NAV} right-3`}>
          <ChevronRight size={20} />
        </button>
      </motion.div>

      <div className="mt-4 flex justify-center">
        {PHOTOS.map(({ file }, i) => (
          <button
            key={file}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir a la foto ${i + 1}`}
            aria-current={i === index}
            className="grid h-8 place-items-center px-[3px]"
          >
            <motion.span
              className="block h-1.5 rounded-full"
              animate={{
                width: i === index ? 22 : 6,
                backgroundColor: i === index ? "#B6F23A" : "rgba(242,201,207,0.28)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
