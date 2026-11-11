import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { CLOSING, NAMES } from "../config";
import { rainHearts } from "../utils/hearts";
import Button from "./Button";
import SectionCard from "./SectionCard";

export default function Closing({ className = "", delay = 0 }) {
  return (
    <SectionCard className={`justify-between gap-10 bg-blush/[0.12] ${className}`} delay={delay}>
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
        className="grid size-16 place-items-center rounded-full bg-white/10 shadow-tile ring-1 ring-white/10"
      >
        <Heart size={28} className="fill-lime text-lime" aria-hidden />
      </motion.span>
      <p className="max-w-[18ch] font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.03em] md:max-w-[22ch]">
        {CLOSING.message}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-ink/70">Te quiero, {NAMES.her}.</p>
        <Button variant="blush" onClick={() => rainHearts()}>
          Lanzar corazones 💗
        </Button>
      </div>
    </SectionCard>
  );
}
