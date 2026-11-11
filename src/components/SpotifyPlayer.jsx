import { useRef } from "react";
import { useInView } from "framer-motion";
import { SPOTIFY_PLAYLIST_ID } from "../config";
import SectionCard from "./SectionCard";

export default function SpotifyPlayer({ className = "", delay = 0 }) {
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: "300px" });

  return (
    <SectionCard title="Nuestra playlist" className={className} delay={delay}>
      <div
        ref={ref}
        className="min-h-[352px] flex-1 overflow-hidden rounded-[2rem] bg-white/5 shadow-[0_16px_32px_-14px_rgba(10,0,5,0.5)] ring-1 ring-white/10"
      >
        {near && (
          <iframe
            title="Playlist de Spotify"
            src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator`}
            width="100%"
            height="352"
            style={{ border: 0, display: "block" }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )}
      </div>
    </SectionCard>
  );
}
