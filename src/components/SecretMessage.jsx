import { useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Lock, LockOpen } from "lucide-react";
import { SECRET } from "../config";
import { burstHearts } from "../utils/hearts";
import Button from "./Button";
import SectionCard from "./SectionCard";

const norm = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

export default function SecretMessage({ className = "", delay = 0 }) {
  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrong, setWrong] = useState(false);
  const shake = useAnimationControls();

  const submit = (e) => {
    e.preventDefault();
    if (SECRET.answers.some((a) => norm(a) === norm(value))) {
      setUnlocked(true);
      setWrong(false);
      burstHearts({ x: 0.5, y: 0.6 });
    } else {
      setWrong(true);
      shake.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.4 } });
    }
  };

  return (
    <SectionCard title="Mensaje secreto" className={className} delay={delay}>
      <AnimatePresence mode="wait">
        {unlocked ? (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
            className="flex flex-1 flex-col gap-5"
          >
            <span className="grid size-14 place-items-center rounded-full bg-white/10 shadow-tile ring-1 ring-white/10">
              <LockOpen size={24} className="text-lime" aria-hidden />
            </span>
            <p className="font-serif text-[1.9rem] leading-[1.05] tracking-[-0.025em]">{SECRET.message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="locked"
            onSubmit={submit}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="flex flex-1 flex-col gap-5"
          >
            <span className="grid size-14 place-items-center rounded-full bg-white/10 shadow-tile ring-1 ring-white/10">
              <Lock size={24} className="text-ink/70" aria-hidden />
            </span>
            <p className="text-[15px] leading-relaxed text-ink/75">{SECRET.hint}</p>
            <motion.div animate={shake}>
              <input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setWrong(false);
                }}
                placeholder="DD/MM/AAAA"
                inputMode="numeric"
                autoComplete="off"
                aria-label="Clave secreta"
                aria-invalid={wrong}
                className="w-full rounded-2xl text-ink border border-white/10 bg-white/10 px-5 py-3.5 text-[16px] tracking-[-0.01em] shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] outline-none ring-1 ring-white/10 transition-shadow placeholder:text-ink/35 focus:ring-2 focus:ring-blush"
              />
              <p className="mt-2 min-h-5 text-[13px] text-[#ff9aa8]" role="status">
                {wrong ? "Esa no es. Inténtalo de nuevo." : ""}
              </p>
            </motion.div>
            <Button type="submit" className="mt-auto w-full">
              Desbloquear
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </SectionCard>
  );
}
