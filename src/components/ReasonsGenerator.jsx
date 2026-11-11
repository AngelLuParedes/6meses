import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { REASONS } from "../config";
import Button from "./Button";
import SectionCard from "./SectionCard";

export default function ReasonsGenerator({ className = "", delay = 0 }) {
  const [current, setCurrent] = useState(null);

  const next = () => {
    let i;
    do {
      i = Math.floor(Math.random() * REASONS.length);
    } while (REASONS.length > 1 && REASONS[i] === current);
    setCurrent(REASONS[i]);
  };

  return (
    <SectionCard title="Razones para amarte" className={className} delay={delay}>
      <div className="grid min-h-[13rem] flex-1 place-items-center rounded-[2rem] bg-black/20 p-7 text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <AnimatePresence mode="wait">
          <motion.p
            key={current ?? "vacio"}
            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className={
              current
                ? "font-serif text-[2.1rem] leading-[1.05] tracking-[-0.025em]"
                : "text-[15px] text-ink/70"
            }
          >
            {current ?? "Toca el botón para descubrir una razón"}
          </motion.p>
        </AnimatePresence>
      </div>
      <Button onClick={next} className="mt-5 w-full">
        {current ? "Otra razón" : "Dame una razón"}
      </Button>
    </SectionCard>
  );
}
