export default function CrispFullscreenImage() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0f172a]">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="h-full min-h-screen w-full object-cover object-center"
      >
        <source src="/crisp-hero.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.06)_38%,rgba(15,23,42,0.2)_100%)]" />
    </section>
  );
}
