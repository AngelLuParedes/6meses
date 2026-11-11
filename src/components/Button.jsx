import { motion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 500, damping: 30 };

const VARIANTS = {
  lime: "bg-lime shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_2px_rgba(0,0,0,0.3),0_12px_26px_-10px_rgba(182,242,58,0.55)]",
  blush:
    "bg-blush shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.3),0_12px_26px_-10px_rgba(242,201,207,0.4)]",
};

export default function Button({ variant = "lime", className = "", children, ...props }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className={`rounded-full px-7 py-3.5 text-[15px] font-semibold tracking-[-0.01em] text-wine ring-1 ring-black/10 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
