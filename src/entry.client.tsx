import { startTransition, StrictMode } from "react"
import { HydratedRouter } from "react-router/dom"
import { hydrateRoot } from "react-dom/client"
import "@/i18n"

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  )
})
