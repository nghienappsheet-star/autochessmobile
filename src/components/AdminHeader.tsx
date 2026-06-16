import * as React from "react"
import { Search, Bell, Menu, LogOut, User as UserIcon, Home } from "lucide-react"
import { Input, Button } from "./ui/core"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, triggerLogout } = useAuth()
  const [showDropdown, setShowDropdown] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fallback to Admin mock user if no user is found in context
  const displayUser = user || {
    name: "Admin",
    email: "admin@autochessmobile.vn",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-brand-bg/80 backdrop-blur-xl px-4 sm:px-8">
      <div className="flex flex-1 items-center gap-3 sm:gap-6">
        <button 
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-text-sub hover:text-white transition-all flex-shrink-0"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative w-full max-w-sm group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-sub group-focus-within:text-brand-gold transition-colors" />
          <Input 
            type="search" 
            placeholder="Tìm kiếm nhanh..." 
            className="w-full bg-brand-card rounded-xl border-transparent pl-10 h-10 text-[12px] focus-visible:ring-1 focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold/30 transition-all font-medium"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 text-brand-text-sub">
        <Link to="/" className="inline-block">
          <Button 
            variant="outline" 
            className="h-10 px-3.5 text-[12px] font-semibold tracking-tight bg-brand-card border-brand-border text-brand-text-sub hover:text-white hover:bg-white/5 hover:border-white/20 transition-all rounded-xl flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4 text-brand-gold" />
            <span className="hidden xs:inline">Về trang chủ</span>
          </Button>
        </Link>
        <button className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center hover:text-white transition-all hover:border-brand-gold/30">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-red rounded-full ring-2 ring-brand-card"></span>
        </button>
        <div className="h-6 w-[1px] bg-white/10"></div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none p-1 rounded-xl hover:bg-white/5 transition-all text-left"
          >
            {displayUser.avatar ? (
              <img src={displayUser.avatar} alt="Avatar" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 object-cover transition-transform group-hover:scale-105" />
            ) : (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-black text-[12px] font-bold shadow-inner transition-transform group-hover:scale-105">
                AD
              </div>
            )}
            <div className="hidden sm:block">
              <div className="text-[13px] font-semibold text-white leading-none">{displayUser.name}</div>
              <div className="text-[10px] font-semibold text-brand-text-sub uppercase tracking-wider opacity-50 mt-1.5">Quản trị viên</div>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-brand-border bg-brand-card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 border-b border-white/5 mb-1.5">
                <div className="text-[13px] font-bold text-white truncate">{displayUser.name}</div>
                <div className="text-[11px] text-brand-text-sub truncate mt-0.5">{displayUser.email}</div>
              </div>
              <Link 
                to="/" 
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-text-sub hover:text-white hover:bg-white/5 transition-colors font-medium"
              >
                <Home className="h-4 w-4" />
                Về trang chủ
              </Link>
              <Link 
                to="/ho-so" 
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-text-sub hover:text-white hover:bg-white/5 transition-colors font-medium"
              >
                <UserIcon className="h-4 w-4" />
                Trang cá nhân
              </Link>
              <div className="my-1.5 h-[1px] bg-white/5 animate-none" />
              <button 
                onClick={() => {
                  setShowDropdown(false)
                  triggerLogout()
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-red hover:bg-brand-red/10 transition-colors font-semibold"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
