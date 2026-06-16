import { usePersistedEntity } from "@/lib/persistence-hooks"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import type { AdminUserRecord } from "@/components/admin/AdminUserForm"

export type AdminRoleRecord = {
  id: string
  name: string
  code: string
  desc: string
  users: number
  scopes: string[]
}

export const DEFAULT_ADMIN_USERS: AdminUserRecord[] = [
  { id: 1, name: "Admin_Master", email: "admin@5fedu.com", role: "Admin", status: "Hoạt động", date: "20/05/2024" },
  { id: 2, name: "Moderator_Zen", email: "zen.mod@autochess.io", role: "Moderator", status: "Hoạt động", date: "20/05/2024" },
  { id: 3, name: "PlayerOne", email: "player1@gmail.com", role: "Thành viên", status: "Hoạt động", date: "20/05/2024" },
  { id: 4, name: "StrategyKing", email: "king@meta.com", role: "Thành viên", status: "Hoạt động", date: "19/05/2024" },
  { id: 5, name: "TrollBot_99", email: "troll@trash.com", role: "Thành viên", status: "Bị khóa", date: "18/05/2024" },
]

export const DEFAULT_ADMIN_ROLES: AdminRoleRecord[] = [
  {
    id: "1",
    name: "Super Admin",
    code: "SUPER_ADMIN",
    desc: "Toàn quyền cấu hình hệ thống, quản lý cơ sở dữ liệu, sửa đổi tướng, tộc hệ và tài khoản người dùng.",
    users: 2,
    scopes: ["all"],
  },
  {
    id: "2",
    name: "Editor",
    code: "EDITOR",
    desc: "Được quyền biên tập bài viết, đăng tin tức, quản lý Banners và tạo các cẩm nang đội hình mới.",
    users: 4,
    scopes: ["write:posts", "write:comps", "read:heroes"],
  },
  {
    id: "3",
    name: "Moderator",
    code: "MODERATOR",
    desc: "Duyệt bình luận của cộng đồng, kiểm duyệt nội dung bài đăng thành viên và báo cáo vi phạm.",
    users: 3,
    scopes: ["read:users", "write:comments", "flag_moderate"],
  },
  {
    id: "4",
    name: "Vip Member",
    code: "VIP_MEMBER",
    desc: "Người dùng đặc biệt, hưởng đặc quyền bình luận nâng cao và ưu tiên duyệt bài đăng chiến thuật nhanh.",
    users: 84,
    scopes: ["priority_posting"],
  },
]

export function useAdminUsersState() {
  return usePersistedEntity<AdminUserRecord[]>(STORAGE_KEYS.adminUsers, DEFAULT_ADMIN_USERS)
}

export function useAdminRolesState() {
  return usePersistedEntity<AdminRoleRecord[]>(STORAGE_KEYS.adminRoles, DEFAULT_ADMIN_ROLES)
}
