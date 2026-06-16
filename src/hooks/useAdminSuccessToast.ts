import * as React from "react"

export function useAdminSuccessToast(durationMs = 3000) {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  const showSuccess = React.useCallback(
    (message: string) => {
      setSuccessMessage(message)
      window.setTimeout(() => setSuccessMessage(null), durationMs)
    },
    [durationMs]
  )

  const clearSuccess = React.useCallback(() => setSuccessMessage(null), [])

  return { successMessage, showSuccess, clearSuccess }
}
