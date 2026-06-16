import { useTranslation } from "react-i18next"
import {
  NAV_ITEMS,
  MOBILE_TAB_ITEMS,
  SIDEBAR_SECTIONS,
  type NavItem,
  type NavChild,
  type MobileTabItem,
  type SidebarSection,
} from "@/config/nav"

export type ResolvedNavChild = NavChild & { name: string }
export type ResolvedNavItem = Omit<NavItem, "children"> & {
  name: string
  children?: ResolvedNavChild[]
}

export type ResolvedMobileTabItem = Omit<MobileTabItem, "name"> & { name: string }
export type ResolvedSidebarSection = Omit<SidebarSection, "label" | "itemLabelKeys"> & {
  label: string
  itemLabelKeys: string[]
}

export function useNavItems(): ResolvedNavItem[] {
  const { t } = useTranslation("nav")

  return NAV_ITEMS.map((item) => ({
    ...item,
    name: t(item.labelKey),
    children: item.children?.map((child) => ({
      ...child,
      name: t(child.labelKey),
    })),
  }))
}

export function useMobileTabItems(): ResolvedMobileTabItem[] {
  const { t } = useTranslation("nav")

  return MOBILE_TAB_ITEMS.map((item) => ({
    ...item,
    name: t(item.labelKey),
  }))
}

export function useSidebarSections(): ResolvedSidebarSection[] {
  const { t } = useTranslation("nav")

  return SIDEBAR_SECTIONS.map((section) => ({
    ...section,
    label: t(section.labelKey),
  }))
}

export function useNavLabel(labelKey: string): string {
  const { t } = useTranslation("nav")
  return t(labelKey)
}
