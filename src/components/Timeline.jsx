import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { TIMELINE } from "../config";
import SectionCard from "./SectionCard";

export default function Timeline({ className = "", delay = 0 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <SectionCard title="Nuestra historia" className={className} delay={delay}>
      <ol ref={ref} className="relative space-y-10 py-2 md:space-y-12">
        <div
          aria-hidden
          className="absolute bottom-2 left-[6px] top-2 w-[3px] rounded-full bg-white/10 md:left-1/2 md:-ml-[1.5px]"
        >
          <motion.div
            style={{ scaleY: reduce ? 1 : scaleY, originY: 0 }}
            className="h-full w-full rounded-full bg-lime"
          />
        </div>

        {TIMELINE.map((item, i) => {
          const left = i % 2 === 0;
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className={`relative pl-8 ${
                left ? "md:w-1/2 md:pl-0 md:pr-12 md:text-right" : "md:ml-auto md:w-1/2 md:pl-12"
              }`}
            >
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
                className={`absolute top-2 left-0 size-[14px] rounded-full bg-lime ring-4 ring-wine ${
                  left ? "md:left-auto md:-right-[7px]" : "md:-left-[7px]"
                }`}
              />
              <p className="text-[13px] font-medium text-ink/70">{item.date}</p>
              <h3 className="mt-1 font-serif text-[1.9rem] leading-[1] tracking-[-0.025em]">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink/75">{item.text}</p>
            </motion.li>
          );
        })}
      </ol>
    </SectionCard>
  );
}
