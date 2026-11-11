import { useEffect, useState } from "react";
import { START_DATE } from "../config";
import SectionCard from "./SectionCard";

function calc() {
  const s = Math.floor(Math.max(0, Date.now() - new Date(START_DATE).getTime()) / 1000);
  return {
    days: Math.floor(s / 86400),
    parts: {
      Horas: Math.floor((s % 86400) / 3600),
      Minutos: Math.floor((s % 3600) / 60),
      Segundos: s % 60,
    },
  };
}

export default function LoveCounter({ className = "", delay = 0 }) {
  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionCard title="Nuestro tiempo juntos" className={className} delay={delay}>
      <div className="flex flex-1 flex-col justify-between gap-8">
        <div>
          <div className="font-serif text-lime text-[clamp(6rem,17vw,10.5rem)] leading-[0.82] tracking-[-0.045em] tabular-nums">
            {t.days}
          </div>
          <p className="mt-3 text-[17px] tracking-[-0.015em] text-ink/70">días a tu lado</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(t.parts).map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl bg-white/[0.07] px-3 pb-4 pt-5 text-center shadow-tile ring-1 ring-white/10"
            >
              <div className="text-[32px] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                {String(value).padStart(2, "0")}
              </div>
              <div className="mt-2 text-[12px] font-medium text-ink/70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
