import { cn } from "@/lib/utils"

/**
 * Ambient animated aurora + grid backdrop. Purely decorative, fixed behind
 * all content. Sits at -z-10 so sections render on top.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      suppressHydrationWarning
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="bg-dots absolute inset-0 opacity-60" />
      <div className="from-background/0 via-background/0 to-background absolute inset-0 bg-gradient-to-b" />
      <div className="animate-aurora bg-aurora-1 absolute -top-1/4 left-1/4 h-[45rem] w-[45rem] rounded-full blur-[120px]" />
      <div
        className="animate-aurora bg-aurora-2 absolute top-1/3 -right-1/4 h-[40rem] w-[40rem] rounded-full blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-aurora bg-aurora-3 absolute -bottom-1/4 left-1/3 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  )
}
