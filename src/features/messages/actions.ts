"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/features/auth/session"

export type MessageStatus = "NEW" | "READ" | "REPLIED"

export async function updateMessageStatus(id: string, status: MessageStatus) {
  await requireSession()
  await prisma.message.update({ where: { id }, data: { status } })
  revalidatePath("/admin/messages")
}

export async function deleteMessage(id: string) {
  await requireSession()
  await prisma.message.delete({ where: { id } })
  revalidatePath("/admin/messages")
}
