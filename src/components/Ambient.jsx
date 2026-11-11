// Luz de fondo con gradientes radiales (baratos en scroll) sobre el vino
const orb = (color) => ({
  background: `radial-gradient(closest-side, ${color}, rgba(74,16,34,0))`,
});

export default function Ambient() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{ transform: "translateZ(0)" }}
      >
        <div className="absolute -left-40 -top-40 size-[640px] rounded-full" style={orb("rgba(242,201,207,0.16)")} />
        <div className="absolute -right-48 top-[35%] size-[700px] rounded-full" style={orb("rgba(130,32,64,0.85)")} />
        <div className="absolute -bottom-48 left-[-15%] size-[640px] rounded-full" style={orb("rgba(182,242,58,0.07)")} />
      </div>
      <div aria-hidden className="grain" />
    </>
  );
}
