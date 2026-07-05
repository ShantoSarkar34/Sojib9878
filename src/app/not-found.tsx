import Link from "next/link"
import { Compass } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Compass className="text-muted-foreground size-10" />
      <h1 className="text-gradient-brand text-5xl font-extrabold">404</h1>
      <p className="text-muted-foreground max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        Back to Home
      </Button>
    </main>
  )
}
