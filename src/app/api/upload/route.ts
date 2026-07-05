import { NextResponse } from "next/server"

import { getSession } from "@/features/auth/session"
import { uploadFile } from "@/lib/blob"

const IMAGE_FOLDERS = [
  "profile",
  "projects",
  "skills",
  "certificates",
  "settings",
] as const
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const MAX_RESUME_SIZE_BYTES = 10 * 1024 * 1024

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")
  const folder = formData.get("folder")

  if (!(file instanceof File) || typeof folder !== "string") {
    return NextResponse.json({ error: "Missing file or folder" }, { status: 400 })
  }

  if (folder === "resume") {
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Resume must be a PDF file" }, { status: 400 })
    }
    if (file.size > MAX_RESUME_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Resume must be smaller than 10MB" },
        { status: 400 }
      )
    }
  } else if (IMAGE_FOLDERS.includes(folder as (typeof IMAGE_FOLDERS)[number])) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Image must be smaller than 5MB" },
        { status: 400 }
      )
    }
  } else {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 })
  }

  const url = await uploadFile(file, folder)
  return NextResponse.json({ url })
}
