"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { adminNavLinks } from "@/constants/admin"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <aside className="bg-sidebar text-sidebar-foreground flex h-full w-64 flex-col border-r">
      <div className="px-6 py-5 text-lg font-bold">Admin</div>

      <nav className="flex-1 space-y-1 px-3">
        {adminNavLinks.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-sidebar-border border-t p-3">
        <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
          <LogOut className="size-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
