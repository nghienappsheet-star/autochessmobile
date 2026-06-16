const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUD_NAME?.trim() && UPLOAD_PRESET?.trim())
}

type CloudinaryUploadResponse = {
  secure_url?: string
  error?: { message?: string }
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured")
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET!)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  )

  const data = (await response.json()) as CloudinaryUploadResponse

  if (!response.ok || !data.secure_url) {
    throw new Error(data.error?.message ?? "Upload failed")
  }

  return data.secure_url
}
