import Link from "next/link"

import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getStats() {
  const [projects, messages, skills, experiences] = await Promise.all([
    prisma.project.count(),
    prisma.message.count({ where: { status: "NEW" } }),
    prisma.skill.count(),
    prisma.experience.count(),
  ])
  return { projects, messages, skills, experiences }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: "Projects", value: stats.projects, href: "/admin/projects" },
    { label: "Unread Messages", value: stats.messages, href: "/admin/messages" },
    { label: "Skills", value: stats.skills, href: "/admin/skills" },
    { label: "Experience Entries", value: stats.experiences, href: "/admin/experience" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Overview of your portfolio content.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
