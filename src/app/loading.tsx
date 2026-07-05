import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/shared/container"

export default function Loading() {
  return (
    <main className="pt-20 pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-4 w-full max-w-sm" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
        <Skeleton className="mx-auto aspect-square w-full max-w-sm rounded-full" />
      </Container>
    </main>
  )
}
