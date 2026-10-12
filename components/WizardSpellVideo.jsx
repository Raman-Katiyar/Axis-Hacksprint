export default function WizardSpellVideo() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <video
        className="block h-auto w-full"
        src="/wizard-spell.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label="Wizard spell video"
      />
    </div>
  );
}
