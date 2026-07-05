export function LoadingScreen({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
      <div className="relative size-16">
        {/* soft glow */}
        <div className="bg-gradient-brand absolute inset-0 rounded-full opacity-40 blur-xl" />
        {/* spinning gradient ring */}
        <div
          className="relative size-16 animate-spin rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 8%, var(--brand-to) 55%, var(--brand-from) 100%)",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
          }}
        />
      </div>
      <p className="text-muted-foreground animate-pulse text-sm font-medium">{label}</p>
    </div>
  )
}
