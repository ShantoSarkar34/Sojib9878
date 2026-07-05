import { del, put } from "@vercel/blob"

export async function uploadFile(file: File, folder: string) {
  const extension = file.name.split(".").pop() ?? "bin"
  const pathname = `${folder}/${crypto.randomUUID()}.${extension}`

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
  })

  return blob.url
}

export async function deleteFile(url: string) {
  await del(url)
}
