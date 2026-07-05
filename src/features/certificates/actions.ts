"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/features/auth/session"
import {
  certificateFormSchema,
  type CertificateFormValues,
} from "@/features/certificates/schema"

function toPrismaData(values: CertificateFormValues) {
  const data = certificateFormSchema.parse(values)
  return {
    ...data,
    credentialUrl: data.credentialUrl || null,
    imageUrl: data.imageUrl || null,
    issueDate: new Date(data.issueDate),
  }
}

export async function createCertificate(values: CertificateFormValues) {
  await requireSession()
  const certificate = await prisma.certificate.create({ data: toPrismaData(values) })
  revalidatePath("/")
  revalidatePath("/admin/certificates")
  return certificate
}

export async function updateCertificate(id: string, values: CertificateFormValues) {
  await requireSession()
  const certificate = await prisma.certificate.update({
    where: { id },
    data: toPrismaData(values),
  })
  revalidatePath("/")
  revalidatePath("/admin/certificates")
  return certificate
}

export async function deleteCertificate(id: string) {
  await requireSession()
  await prisma.certificate.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/certificates")
}
