import { motion, useReducedMotion } from "framer-motion";

export default function SectionCard({ title, children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -4 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        delay,
        opacity: { duration: 0.35, delay },
      }}
      className={`relative flex flex-col rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 ring-1 ring-white/5 shadow-glass backdrop-blur-md md:p-8 ${className}`}
    >
      {title && (
        <h2 className="mb-6 font-serif text-[2rem] leading-none tracking-[-0.02em]">
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  );
}
