import packageJson from "../package.json"

export const config = {
  runtime: "edge",
}

export default function handler(_request: Request): Response {
  const body = {
    status: "ok",
    version: packageJson.version,
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    env: process.env.VERCEL_ENV ?? "development",
    timestamp: new Date().toISOString(),
  }

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  })
}
