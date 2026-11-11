import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Ambient from "../components/Ambient";
import EnvelopeCover from "../components/EnvelopeCover";
import Letter from "../components/Letter";
import LoveCounter from "../components/LoveCounter";
import PhotoCarousel from "../components/PhotoCarousel";
import ReasonsGenerator from "../components/ReasonsGenerator";
import SpotifyPlayer from "../components/SpotifyPlayer";
import Closing from "../components/Closing";
import Timeline from "../components/Timeline";
import OpenWhen from "../components/OpenWhen";
import SecretMessage from "../components/SecretMessage";
import { HERO_TITLE } from "../config";

function HeroTitle() {
  const reduce = useReducedMotion();
  return (
    <h1 className="text-balance font-serif text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.92] tracking-[-0.035em]">
      {HERO_TITLE.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="mr-[0.22em] inline-block"
          initial={{ opacity: 0, y: reduce ? 0 : "0.4em", filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 + i * 0.07 }}
        >
          {w}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Ambient />
      <AnimatePresence mode="wait">
        {!opened ? (
          <EnvelopeCover key="cover" onOpen={() => setOpened(true)} />
        ) : (
          <main
            key="main"
            className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-14 md:px-8 md:pt-24"
          >
            <HeroTitle />
            <div className="mt-10 grid grid-cols-1 gap-4 md:mt-20 lg:grid-cols-12 lg:gap-5">
              <Letter className="lg:col-span-5" delay={0.5} />
              <PhotoCarousel className="lg:col-span-7" delay={0.6} />
              <LoveCounter className="lg:col-span-7" />
              <ReasonsGenerator className="lg:col-span-5" />
              <Timeline className="lg:col-span-12" />
              <OpenWhen className="lg:col-span-7" />
              <SecretMessage className="lg:col-span-5" />
              <SpotifyPlayer className="lg:col-span-5" />
              <Closing className="lg:col-span-7" />
            </div>
          </main>
        )}
      </AnimatePresence>
    </>
  );
}
