import { Wrench } from "lucide-react"

export function Maintenance() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Wrench className="text-muted-foreground size-10" />
      <h1 className="text-2xl font-bold">Under Maintenance</h1>
      <p className="text-muted-foreground max-w-sm">
        This site is temporarily undergoing scheduled maintenance. Please check back
        shortly.
      </p>
    </main>
  )
}
