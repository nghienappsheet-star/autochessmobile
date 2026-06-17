import * as React from "react"
import { Button } from "@/components/ui/core"
import { ImagePlus, Loader2 } from "lucide-react"
import { isCloudinaryConfigured, uploadImageToCloudinary } from "@/lib/cloudinary"
import { cn } from "@/lib/utils"

type CloudinaryFileUploadProps = {
  onUploaded: (urls: string[]) => void
  onError?: (message: string) => void
  disabled?: boolean
  multiple?: boolean
  accept?: string
  className?: string
  label?: string
  uploadingLabel?: string
  variant?: "default" | "outline"
}

export function CloudinaryFileUpload({
  onUploaded,
  onError,
  disabled = false,
  multiple = false,
  accept = "image/*",
  className,
  label = "Tải ảnh",
  uploadingLabel = "Đang tải lên...",
  variant = "outline",
}: CloudinaryFileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = React.useState(false)

  if (!isCloudinaryConfigured()) return null

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of Array.from(files) as File[]) {
        const url = await uploadImageToCloudinary(file)
        urls.push(url)
      }
      onUploaded(urls)
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant={variant}
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || uploading}
        className={cn("h-11 rounded-xl border-brand-border shrink-0", className)}
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <ImagePlus className="w-4 h-4 mr-2" />
        )}
        {uploading ? uploadingLabel : label}
      </Button>
    </>
  )
}
