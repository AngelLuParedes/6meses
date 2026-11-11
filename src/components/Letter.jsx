import { LETTER, NAMES } from "../config";
import SectionCard from "./SectionCard";

export default function Letter({ className = "", delay = 0 }) {
  return (
    <SectionCard className={className} delay={delay}>
      <h2 className="font-serif text-[2.75rem] leading-[0.98] tracking-[-0.03em]">
        {LETTER.title}
      </h2>
      <p className="mb-5 mt-6 text-[15px] font-medium text-ink/70">{NAMES.her},</p>
      <div className="space-y-4 text-[16px] leading-[1.7] tracking-[-0.006em] text-ink/80">
        {LETTER.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className="mt-auto pt-8 text-right font-serif text-[1.75rem] leading-none">
        {NAMES.me} 💗
      </p>
    </SectionCard>
  );
}
