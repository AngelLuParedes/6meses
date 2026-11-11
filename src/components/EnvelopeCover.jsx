import { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Heart } from "lucide-react";
import { burstHearts } from "../utils/hearts";
import { COVER_TITLE } from "../config";

const EASE = [0.23, 1, 0.32, 1];
const TILT = { stiffness: 150, damping: 18 };

export default function EnvelopeCover({ onOpen }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-1, 1], [9, -9]), TILT);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-11, 11]), TILT);

  const onPointerMove = (e) => {
    if (reduce || open || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const handleOpen = (e) => {
    if (open) return;
    setOpen(true);
    reset();
    const r = e.currentTarget.getBoundingClientRect();
    burstHearts({
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height * 0.45) / window.innerHeight,
    });
    setTimeout(onOpen, reduce ? 200 : 1150);
  };

  const spring = reduce ? { duration: 0.01 } : { type: "spring", stiffness: 140, damping: 20 };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
      transition={{ duration: 0.45, ease: EASE }}
      className="relative z-10 grid min-h-dvh place-items-center px-4 py-10"
    >
      <div className="flex flex-col items-center gap-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-serif text-[clamp(3.25rem,9vw,6.5rem)] leading-[0.92] tracking-[-0.035em]"
        >
          {COVER_TITLE}
        </motion.h1>

        <div className="pt-16 [perspective:1000px]">
          <motion.button
            type="button"
            onClick={handleOpen}
            onPointerMove={onPointerMove}
            onPointerLeave={reset}
            disabled={open}
            aria-label="Abrir el sobre"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={open || reduce ? undefined : { scale: 1.03 }}
            whileTap={open ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.15 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative block h-52 w-[22rem] max-w-[84vw] disabled:cursor-default"
          >
            <span aria-hidden className="absolute -bottom-6 left-[8%] h-9 w-[84%] rounded-[50%] bg-black/40 blur-xl" />
            <span className="absolute inset-0 rounded-3xl bg-[#c98b95] shadow-[inset_0_2px_10px_rgba(70,20,35,0.35),0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-white/10" />

            <motion.span
              aria-hidden
              className="absolute inset-x-4 top-3 bottom-3 z-10 rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(120,60,80,0.18)] ring-1 ring-white/10"
              animate={{ y: open ? -96 : 0 }}
              transition={{ ...spring, delay: open ? 0.3 : 0 }}
            >
              <span className="font-serif text-xl leading-none text-wine/70">Para ti</span>
              <span className="mt-3 block h-1.5 w-2/3 rounded-full bg-wine/10" />
              <span className="mt-2 block h-1.5 w-1/2 rounded-full bg-wine/10" />
            </motion.span>

            <span aria-hidden className="absolute inset-0 z-20 rounded-3xl bg-[#f7d7db]" style={{ clipPath: "polygon(0 0, 52% 52%, 0 100%)" }} />
            <span aria-hidden className="absolute inset-0 z-20 rounded-3xl bg-[#efbcc4]" style={{ clipPath: "polygon(100% 0, 48% 52%, 100% 100%)" }} />
            <span aria-hidden className="absolute inset-0 z-20 rounded-3xl bg-[#fdeef0]" style={{ clipPath: "polygon(0 100%, 50% 46%, 100% 100%)" }} />

            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[60%] bg-[#f2c9cf]"
              style={{ transformOrigin: "top", clipPath: "polygon(0 0, 100% 0, 50% 100%)", zIndex: 30, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
              animate={{ rotateX: open ? 180 : 0, transitionEnd: open ? { zIndex: 5 } : {} }}
              transition={reduce ? { duration: 0.01 } : { duration: 0.5, ease: EASE }}
            />

            <motion.span
              aria-hidden
              className="absolute left-1/2 top-[52%] z-40 -ml-6 -mt-6 grid size-12 place-items-center rounded-full bg-lime shadow-[inset_0_2px_3px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(60,100,0,0.45),0_6px_12px_-2px_rgba(60,100,0,0.5)] ring-1 ring-[#8fbf1f]/50"
              animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <Heart size={18} className="fill-wine text-wine" />
            </motion.span>
          </motion.button>
        </div>

        <p className="text-[15px] text-ink/70">Toca el sobre para abrirlo</p>
      </div>
    </motion.div>
  );
}
