"use client"

import { useRef, useState } from "react"
import { FileText, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ResumeUpload({
  value,
  onChange,
}: {
  value: string | null
  onChange: (url: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", "resume")

    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error ?? "Upload failed")
        return
      }

      onChange(data.url)
    } catch {
      toast.error("Upload failed")
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex items-center gap-3">
      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary flex items-center gap-2 text-sm hover:underline"
        >
          <FileText className="size-4" />
          View current resume
        </a>
      ) : (
        <span className="text-muted-foreground flex items-center gap-2 text-sm">
          <FileText className="size-4" />
          No resume uploaded
        </span>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading && <Spinner />}
        {value ? "Replace" : "Upload"}
      </Button>

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onChange(null)}
          aria-label="Remove resume"
        >
          <X className="size-4" />
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
