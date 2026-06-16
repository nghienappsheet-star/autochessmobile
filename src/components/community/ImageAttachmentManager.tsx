import * as React from "react"
import { Button, Input } from "@/components/ui/core"
import { ArrowDown, ArrowUp, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CloudinaryFileUpload } from "@/components/shared/CloudinaryFileUpload"
import { isPersistableImageUrl } from "@/lib/media-url"
import type { CommunityPostImage } from "@/types/domain"
import { cn } from "@/lib/utils"

type ImageAttachmentManagerProps = {
  images: CommunityPostImage[]
  onChange: (images: CommunityPostImage[]) => void
}

export function ImageAttachmentManager({ images, onChange }: ImageAttachmentManagerProps) {
  const { t } = useTranslation("community")
  const [urlInput, setUrlInput] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const addImage = (url: string) => {
    const trimmed = url.trim()
    if (!trimmed) return
    if (!isPersistableImageUrl(trimmed)) {
      setError(t("composer.invalidImageUrl"))
      return
    }
    onChange([...images, { url: trimmed, caption: "" }])
    setUrlInput("")
    setError(null)
  }

  const updateCaption = (index: number, caption: string) => {
    onChange(images.map((img, i) => (i === index ? { ...img, caption } : img)))
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const moveImage = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= images.length) return
    const next = [...images]
    ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
    onChange(next)
  }

  const handleUploaded = (urls: string[]) => {
    onChange([
      ...images,
      ...urls.map((url) => ({ url, caption: "" })),
    ])
    setError(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <CloudinaryFileUpload
          multiple
          onUploaded={handleUploaded}
          onError={(message) => setError(message || t("composer.uploadError"))}
          label={t("composer.uploadImage")}
          uploadingLabel={t("composer.uploading")}
        />

        <div className="flex flex-1 gap-2 min-w-0">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={t("composer.pasteUrl")}
            className="h-11 rounded-xl bg-brand-card-2 border-brand-border flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addImage(urlInput)
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addImage(urlInput)}
            disabled={!urlInput.trim()}
            className="h-11 rounded-xl border-brand-border shrink-0"
          >
            {t("composer.addUrl")}
          </Button>
        </div>
      </div>

      {error && <p className="text-[12px] text-brand-red font-medium">{error}</p>}

      {images.length > 0 && (
        <div className="space-y-4">
          {images.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-brand-border bg-brand-card-2"
            >
              <div className="shrink-0 w-full sm:w-40 h-28 rounded-lg overflow-hidden border border-brand-border bg-brand-card">
                <img src={image.url} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                  {t("composer.caption")}
                </label>
                <Input
                  value={image.caption ?? ""}
                  onChange={(e) => updateCaption(index, e.target.value)}
                  placeholder={t("composer.captionPlaceholder")}
                  className="h-10 rounded-xl bg-brand-bg border-brand-border"
                />
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-brand-text-sub"
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                    aria-label={t("composer.moveUp")}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-brand-text-sub"
                    onClick={() => moveImage(index, 1)}
                    disabled={index === images.length - 1}
                    aria-label={t("composer.moveDown")}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-brand-red hover:text-brand-red"
                    onClick={() => removeImage(index)}
                    aria-label={t("composer.removeImage")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function CommunityPostImageGallery({
  images,
  className,
}: {
  images: CommunityPostImage[]
  className?: string
}) {
  if (!images.length) return null

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>
      {images.map((image, index) => (
        <figure key={`${image.url}-${index}`} className="space-y-2">
          <div className="rounded-xl overflow-hidden border border-brand-border bg-brand-card-2">
            <img src={image.url} alt={image.caption ?? ""} className="w-full object-cover max-h-80" />
          </div>
          {image.caption?.trim() && (
            <figcaption className="text-[12px] text-brand-text-sub text-center leading-relaxed px-2">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
