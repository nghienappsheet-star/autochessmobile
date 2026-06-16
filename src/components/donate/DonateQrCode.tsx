import * as React from "react"
import { QRCodeSVG } from "qrcode.react"
import { cn } from "@/lib/utils"
import {
  buildDonateQrPayload,
  buildVietQrImageUrl,
  type VietQrImageTemplate,
} from "@/lib/vietqr"

export type DonateQrSettings = {
  bankCode: string
  bankName: string
  accountNo: string
  accountName: string
}

const OFFICIAL_TEMPLATES: VietQrImageTemplate[] = ["compact", "qr_only"]

const MIN_OFFICIAL_PNG_BYTES = 2_000

async function fetchOfficialVietQrBlob(
  settings: DonateQrSettings,
  template: VietQrImageTemplate,
): Promise<Blob | null> {
  const url = buildVietQrImageUrl(
    {
      donateBankCode: settings.bankCode,
      donateAccountNo: settings.accountNo,
      donateAccountName: settings.accountName,
    },
    template,
  )

  if (!url) return null

  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const blob = await response.blob()
    if (!blob.type.startsWith("image/") || blob.size < MIN_OFFICIAL_PNG_BYTES) {
      return null
    }

    return blob
  } catch {
    return null
  }
}

function useOfficialVietQrImage(settings: DonateQrSettings) {
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<"loading" | "ready" | "failed">("loading")

  React.useEffect(() => {
    let cancelled = false

    setObjectUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous)
      return null
    })
    setStatus("loading")

    void (async () => {
      for (const template of OFFICIAL_TEMPLATES) {
        const blob = await fetchOfficialVietQrBlob(settings, template)
        if (cancelled) return
        if (!blob) continue

        const nextUrl = URL.createObjectURL(blob)
        setObjectUrl((previous) => {
          if (previous) URL.revokeObjectURL(previous)
          return nextUrl
        })
        setStatus("ready")
        return
      }

      if (!cancelled) setStatus("failed")
    })()

    return () => {
      cancelled = true
      setObjectUrl((previous) => {
        if (previous) URL.revokeObjectURL(previous)
        return null
      })
    }
  }, [settings.bankCode, settings.accountNo, settings.accountName])

  return { objectUrl, status }
}

type DonateQrImageProps = {
  settings: DonateQrSettings
  size: number
  className?: string
  alt?: string
  title?: string
}

function LocalVietQr({
  payload,
  size,
  className,
  title,
}: {
  payload: string
  size: number
  className?: string
  title?: string
}) {
  return (
    <div
      className={cn("inline-flex flex-col items-center bg-white", className)}
      style={{ width: size }}
      title={title}
    >
      <QRCodeSVG value={payload} size={size} level="M" bgColor="#ffffff" fgColor="#000000" />
      <p className="mt-1 text-[8px] font-semibold uppercase tracking-wide text-brand-red leading-none">
        VietQR
      </p>
    </div>
  )
}

export function DonateQrImage({ settings, size, className, alt = "", title }: DonateQrImageProps) {
  const { objectUrl, status } = useOfficialVietQrImage(settings)

  const payload = React.useMemo(
    () =>
      buildDonateQrPayload({
        donateBankCode: settings.bankCode,
        donateAccountNo: settings.accountNo,
      }),
    [settings.bankCode, settings.accountNo],
  )

  if (!payload) {
    return (
      <div
        className={cn(
          className,
          "flex items-center justify-center rounded-xl bg-brand-card-2 text-brand-text-sub text-[11px] text-center px-2",
        )}
        style={{ width: size, height: size }}
        title={title}
      >
        Cấu hình QR chưa hợp lệ
      </div>
    )
  }

  if (objectUrl && status === "ready") {
    return (
      <img
        src={objectUrl}
        alt={alt}
        title={title}
        width={size}
        height={size}
        className={cn("object-contain bg-white", className)}
      />
    )
  }

  return (
    <LocalVietQr payload={payload} size={size} className={className} title={title} />
  )
}
