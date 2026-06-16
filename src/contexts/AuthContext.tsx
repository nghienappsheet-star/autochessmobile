import * as React from "react"
import { loadJson, saveJson } from "@/lib/storage"
import { syncPublicLoginToAdminUsers } from "@/lib/auth-bridge"

const AUTH_USER_KEY = "auto_chess_user"

export type PublicUserRole = "Quản trị viên" | "Moderator" | "Thành viên"

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt?: string;
  role?: PublicUserRole;
  metadata?: Record<string, unknown>;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  updateUser: (patch: Partial<User>) => void;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  openLogin: () => void;
  openRegister: () => void;
  showLogoutConfirm: boolean;
  setShowLogoutConfirm: (show: boolean) => void;
  triggerLogout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  updateUser: () => {},
  logout: () => {},
  showAuthModal: false,
  setShowAuthModal: () => {},
  authMode: 'login',
  setAuthMode: () => {},
  openLogin: () => {},
  openRegister: () => {},
  showLogoutConfirm: false,
  setShowLogoutConfirm: () => {},
  triggerLogout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(() => loadJson<User | null>(AUTH_USER_KEY, null))
  
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('login')
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false)

  const persistUser = (nextUser: User) => {
    setUser(nextUser)
    saveJson(AUTH_USER_KEY, nextUser)
  }

  const login = (newUser: User) => {
    const sessionUser = {
      ...newUser,
      joinedAt: newUser.joinedAt ?? new Date().toISOString(),
    }
    persistUser(sessionUser)
    syncPublicLoginToAdminUsers(sessionUser)
    setShowAuthModal(false)
  }

  const updateUser = (patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextUser = { ...prev, ...patch }
      saveJson(AUTH_USER_KEY, nextUser)
      return nextUser
    })
  }

  const logout = () => {
    setUser(null)
    saveJson(AUTH_USER_KEY, null)
    setShowLogoutConfirm(false)
  }

  const triggerLogout = () => {
    setShowLogoutConfirm(true)
  }

  const openLogin = () => {
    setAuthMode('login')
    setShowAuthModal(true)
  }

  const openRegister = () => {
    setAuthMode('register')
    setShowAuthModal(true)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login,
      updateUser,
      logout, 
      showAuthModal, 
      setShowAuthModal, 
      authMode, 
      setAuthMode, 
      openLogin, 
      openRegister,
      showLogoutConfirm,
      setShowLogoutConfirm,
      triggerLogout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
