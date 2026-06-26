import type { AppLoadContext, EntryContext } from "react-router"
import { handleRequest as vercelHandleRequest } from "@vercel/react-router/entry.server"

export { streamTimeout } from "@vercel/react-router/entry.server"

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
) {
  return vercelHandleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    routerContext,
    loadContext
  )
}
