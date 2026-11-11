import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { OPEN_WHEN } from "../config";
import { burstHearts } from "../utils/hearts";
import SectionCard from "./SectionCard";

const EASE = [0.23, 1, 0.32, 1];

export default function OpenWhen({ className = "", delay = 0 }) {
  const [selected, setSelected] = useState(null);
  const [opened, setOpened] = useState([]);
  const reduce = useReducedMotion();
  const current = OPEN_WHEN.find((l) => l.id === selected);

  const pick = (e, id) => {
    setSelected(id);
    if (!opened.includes(id)) {
      setOpened((o) => [...o, id]);
      const r = e.currentTarget.getBoundingClientRect();
      burstHearts({
        x: (r.left + r.width / 2) / window.innerWidth,
        y: (r.top + r.height / 2) / window.innerHeight,
      });
    }
  };

  return (
    <SectionCard title="Ábrela cuando…" className={className} delay={delay}>
      <div className="grid grid-cols-2 gap-3">
        {OPEN_WHEN.map(({ id, label }) => {
          const isOpen = opened.includes(id);
          const active = selected === id;
          return (
            <motion.button
              key={id}
              type="button"
              onClick={(e) => pick(e, id)}
              aria-pressed={active}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className={`relative h-32 overflow-hidden rounded-3xl bg-[#f7d7db] text-left shadow-tile ring-1 ${
                active ? "ring-2 ring-lime" : "ring-white/10"
              }`}
            >
              <span className="absolute inset-0 bg-[#efbcc4]" style={{ clipPath: "polygon(0 100%, 50% 38%, 100% 100%)" }} aria-hidden />
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[62%] bg-[#f2c9cf]"
                style={{ transformOrigin: "top", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                animate={{ rotateX: isOpen ? 180 : 0, opacity: isOpen ? 0.5 : 1 }}
                transition={reduce ? { duration: 0.01 } : { duration: 0.4, ease: EASE }}
              />
              <motion.span
                aria-hidden
                className="absolute left-1/2 top-[44%] z-10 -ml-4 -mt-4 grid size-8 place-items-center rounded-full bg-lime shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_3px_6px_-1px_rgba(60,100,0,0.5)]"
                animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.5 : 1 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <Heart size={13} className="fill-wine text-wine" />
              </motion.span>
              <span className="absolute inset-x-3 bottom-3 z-10 text-[13px] font-semibold leading-tight tracking-[-0.01em] text-wine/80">
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 grid min-h-[9.5rem] place-items-center rounded-[2rem] bg-black/20 p-6 text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected ?? "vacio"}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {current ? (
              <>
                <p className="mb-2 text-[13px] font-medium text-ink/70">Ábrela cuando {current.label}</p>
                <p className="font-serif text-[1.65rem] leading-[1.1] tracking-[-0.02em]">{current.text}</p>
              </>
            ) : (
              <p className="text-[15px] text-ink/70">Elige un sobre para abrirlo</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}
