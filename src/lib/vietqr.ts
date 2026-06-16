import { BANK_CODE_TO_BIN } from "@/lib/vietqr-bank-codes"

const NAPAS_GUID = "A000000727"
const SERVICE_CODE = "QRIBFTTA"
const CURRENCY_VND = "704"
const COUNTRY_VN = "VN"

function tlv(id: string, value: string): string {
  const length = value.length.toString().padStart(2, "0")
  return `${id}${length}${value}`
}

function crc16CcittFalse(payload: string): string {
  let crc = 0xffff

  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8
    for (let bit = 0; bit < 8; bit += 1) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff
      } else {
        crc = (crc << 1) & 0xffff
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0")
}

export function resolveBankBin(bankCode: string): string | null {
  const trimmed = bankCode.trim()
  if (!trimmed) return null
  if (/^\d{6}$/.test(trimmed)) return trimmed

  if (BANK_CODE_TO_BIN[trimmed]) return BANK_CODE_TO_BIN[trimmed]

  const upper = trimmed.toUpperCase()
  const caseInsensitive = Object.entries(BANK_CODE_TO_BIN).find(
    ([key]) => key.toUpperCase() === upper,
  )
  return caseInsensitive?.[1] ?? null
}

export type VietQrImageTemplate = "compact" | "compact2" | "qr_only" | "print"

/** Napas bank id for img.vietqr.io quick link (short code or 6-digit BIN). */
export function resolveVietQrBankId(bankCode: string): string | null {
  const trimmed = bankCode.trim()
  if (!trimmed) return null
  if (/^\d{6}$/.test(trimmed)) return trimmed
  if (BANK_CODE_TO_BIN[trimmed]) return trimmed

  const upper = trimmed.toUpperCase()
  const matched = Object.entries(BANK_CODE_TO_BIN).find(([key]) => key.toUpperCase() === upper)
  return matched?.[0] ?? null
}

export function buildVietQrImageUrl(
  input: {
    donateBankCode: string
    donateAccountNo: string
    donateAccountName: string
  },
  template: VietQrImageTemplate = "compact",
): string {
  const bankId = resolveVietQrBankId(input.donateBankCode)
  const accountNo = input.donateAccountNo.replace(/\s/g, "").trim()
  const accountName = encodeURIComponent(input.donateAccountName.trim())

  if (!bankId || !accountNo) return ""

  return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?accountName=${accountName}`
}

export function buildDonateQrPayload(input: {
  donateBankCode: string
  donateAccountNo: string
}): string | null {
  const bankBin = resolveBankBin(input.donateBankCode)
  const accountNumber = input.donateAccountNo.replace(/\s/g, "").trim()

  if (!bankBin || !/^\d{6}$/.test(bankBin) || !accountNumber || !/^\d+$/.test(accountNumber)) {
    return null
  }

  const accountDetails = tlv("00", bankBin) + tlv("01", accountNumber)
  const merchantAccountInfo =
    tlv("00", NAPAS_GUID) + tlv("01", accountDetails) + tlv("02", SERVICE_CODE)

  const payloadWithoutCrc =
    tlv("00", "01") +
    tlv("01", "11") +
    tlv("38", merchantAccountInfo) +
    tlv("53", CURRENCY_VND) +
    tlv("58", COUNTRY_VN)

  const crc = crc16CcittFalse(payloadWithoutCrc + "6304")
  return payloadWithoutCrc + tlv("63", crc)
}
