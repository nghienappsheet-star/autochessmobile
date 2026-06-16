import * as React from "react"
import { LazyMotion, domAnimation } from "motion/react"

/** Loads motion features on demand — wrap app shell to reduce initial bundle. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

export { m as motion, AnimatePresence } from "motion/react"
