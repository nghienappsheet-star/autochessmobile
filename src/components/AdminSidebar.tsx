import * as React from "react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  BarChart, Users, ShieldAlert, Accessibility,
  Activity, Package, Gem, Shield,
  Newspaper, MessageSquare, Trophy,
  Image as ImageIcon, BarChart2, Settings,
  Bell, Globe, Share2
} from "lucide-react"
import { motion, AnimatePresence } from "@/components/motion/MotionProvider"

const ADMIN_NAV = [
  { group: 'Hệ thống', items: [
    { name: 'Tổng quan', path: '/admin', icon: BarChart },
    { name: 'Người dùng', path: '/admin/nguoi-dung', icon: Users },
    { name: 'Vai trò & Phân quyền', path: '/admin/vai-tro', icon: ShieldAlert },
  ]},
  { group: 'Game Data', items: [
    { name: 'Tướng', path: '/admin/tuong', icon: Accessibility },
    { name: 'Tộc / Hệ', path: '/admin/toc-he', icon: Activity },
    { name: 'Trang bị', path: '/admin/trang-bi', icon: Package },
    { name: 'Dị vật', path: '/admin/di-vat', icon: Gem },
    { name: 'Đội hình', path: '/admin/doi-hinh', icon: Shield },
  ]},
  { group: 'Nội dung', items: [
    { name: 'Banners', path: '/admin/banners', icon: ImageIcon },
    { name: 'Bài viết', path: '/admin/bai-viet', icon: Newspaper },
    { name: 'Bình luận', path: '/admin/binh-luan', icon: MessageSquare },
    { name: 'Đội ngũ', path: '/admin/doi-ngu', icon: Users },
    { name: 'Kênh cộng đồng', path: '/admin/kenh-cong-dong', icon: Share2 },
    { name: 'Bảng xếp hạng', path: '/admin/bang-xep-hang', icon: Trophy },
    { name: 'Sự kiện', path: '/admin/su-kien', icon: Bell },
  ]},
  { group: 'Công cụ', items: [
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Báo cáo', path: '/admin/bao-cao', icon: BarChart2 },
    { name: 'SEO', path: '/admin/seo', icon: Globe },
    { name: 'Cài đặt', path: '/admin/cai-dat', icon: Settings },
  ]}
]

export function AdminSidebar({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 border-r border-brand-border bg-brand-bg flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
      <div className="flex flex-col justify-center h-20 px-8">
        <div className="flex items-center font-sans font-bold text-xl tracking-tight leading-none">
            <span className="text-white">Auto</span>
            <span className="text-brand-gold ml-1">Chess</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-[12px] text-white font-bold tracking-tight">Mobile</span>
          <span className="text-[12px] text-brand-gold font-bold tracking-tight">.vn</span>
        </div>
        <span className="text-[9px] text-brand-text-sub font-semibold tracking-wider uppercase mt-2 opacity-40">ADMIN CONTROL PANEL</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        {ADMIN_NAV.map((group, i) => (
            <div key={i} className="mb-5">
                <div className="px-8 mb-1.5">
                   <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-sub opacity-50">{group.group}</span>
                </div>
                <ul className="space-y-[2px] px-4">
                {group.items.map((item) => (
                    <li key={item.path}>
                    <NavLink
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) =>
                        cn(
                            "group flex items-center gap-3 rounded-xl px-4 py-2 text-[13px] font-medium transition-all relative overflow-hidden",
                            isActive 
                            ? "bg-gold-gradient text-black shadow-[0_4px_12px_rgba(245,180,60,0.15)]" 
                            : "text-brand-text-sub hover:bg-white/5 hover:text-white"
                        )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn("h-4 w-4 stroke-[2px]", isActive ? "text-black" : "text-brand-text-sub group-hover:text-white")} />
                                {item.name}
                            </>
                        )}
                    </NavLink>
                    </li>
                ))}
                </ul>
            </div>
        ))}
      </nav>
    </aside>
    </>
  )
}
