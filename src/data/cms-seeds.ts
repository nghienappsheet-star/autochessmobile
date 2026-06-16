import type {
  Post,
  Banner,
  Relic,
  Comment,
  CommunityPost,
  TeamMember,
  CommunityChannel,
  AdminEvent,
  MediaAsset,
  LeaderboardPlayer,
} from "@/types/domain"

const SAMPLE_CONTENT_1 = `## Tổng quan mùa S20

Mùa giải S20 mang đến nhiều thay đổi về kinh tế và meta. Bài viết tóm tắt lộ trình leo rank hiệu quả cho người mới và kỳ cựu.

### Giai đoạn early game

- Ưu tiên **2–3 synergy** ổn định trước khi roll.
- Giữ ít nhất **10 gold** interest mỗi round khi có thể.
- Quan sát lobby: nếu nhiều người chơi cùng hệ, hãy pivot sớm.

### Giai đoạn mid game

| Mốc level | Hành động |
|-----------|-----------|
| Level 6 | Hoàn thiện frontline |
| Level 7 | Roll nhẹ tìm carry 2 sao |
| Level 8 | Chốt carry 3 sao hoặc 4-cost |

> **Mẹo:** Đừng roll all-in trước khi biết đối thủ đang build gì.

### Late game

Khi vào top 4, positioning quyết định 50% trận. Hãy dùng công cụ **Tìm đội hình** trên site để so khớp counter.

---

Chúc các bạn leo rank vui vẻ!`

const SAMPLE_CONTENT_2 = `## Top meta hiện tại

Dưới đây là các đội hình có tỷ lệ thắng cao trên server VN tuần này.

1. **9 Warrior** — frontline cực dày, counter Mage.
2. **6 Hunter + 2 Ranger** — burst physical mạnh.
3. **4 Marine + 3 Mage** — khống chế + sustain.

### Cách counter

- Warrior: dùng **% HP damage** hoặc Assassin dive backline.
- Hunter: giảm heal, burst nhanh trước khi họ scale.

\`\`\`text
Lưu ý: meta thay đổi sau mỗi patch — theo dõi trang Tin tức.
\`\`\``

const SAMPLE_CONTENT_3 = `## Patch 20.5 — Điểm nổi bật

### Thay đổi tướng

- **Marine Lord**: giảm armor bonus 15% → 12%.
- **Feathered**: tăng dodge cap.

### Thay đổi trang bị

- *Kiếm Quỷ*: +40 → +45 physical damage.

### Kết luận

Meta sẽ nghiêng về physical carry trong 1–2 tuần. Cập nhật đội hình yêu thích trên trang **Đội hình** của bạn.`

export const DEFAULT_POSTS: Post[] = [
  {
    id: "1",
    title: "Hướng dẫn leo rank hiệu quả mùa S20",
    author: "Admin",
    category: "Hướng dẫn",
    views: "12K",
    status: "Xuất bản",
    date: "20/05/2024",
    image: "bg-brand-red",
    excerpt:
      "Lộ trình leo rank từ Bronze đến King: kinh tế, pivot và positioning cho mùa S20.",
    content: SAMPLE_CONTENT_1,
  },
  {
    id: "2",
    title: "Top 10 đội hình mạnh nhất meta hiện tại",
    author: "PlayerOne",
    category: "Chiến thuật",
    views: "8.5K",
    status: "Xuất bản",
    date: "19/05/2024",
    image: "bg-blue-600",
    excerpt: "Danh sách đội hình tier S–A và cách counter phổ biến trên server VN.",
    content: SAMPLE_CONTENT_2,
  },
  {
    id: "3",
    title: "Phân tích chi tiết bản cập nhật 20.5",
    author: "Admin",
    category: "Tin tức",
    views: "5.2K",
    status: "Xuất bản",
    date: "18/05/2024",
    image: "bg-indigo-600",
    excerpt: "Tóm tắt thay đổi tướng, trang bị và dự đoán meta sau patch 20.5.",
    content: SAMPLE_CONTENT_3,
  },
  {
    id: "4",
    title: "Mẹo quản lý kinh tế hiệu quả",
    author: "JustWin",
    category: "Mẹo chơi",
    views: "4K",
    status: "Bản nháp",
    date: "18/05/2024",
    image: "bg-green-600",
    excerpt: "Interest, streak và thời điểm roll để tối ưu gold mỗi trận.",
    content: "## Kinh tế cơ bản\n\nGiữ streak win/loss và interest 50 gold khi có thể.",
  },
  {
    id: "5",
    title: "Giới thiệu tướng mới: xxx",
    author: "Admin",
    category: "Tin tức",
    views: "20",
    status: "Chờ duyệt",
    date: "17/05/2024",
    image: "bg-yellow-600",
    excerpt: "Preview tướng mới sắp ra mắt — skill và synergy dự kiến.",
    content: "Nội dung đang được biên tập.",
  },
]

export const DEFAULT_BANNERS: Banner[] = [
  {
    id: "1",
    title: "Autochess Meta",
    subtitle: "Nơi cập nhật chiến thuật & meta mạnh nhất",
    description:
      "Khám phá, chia sẻ và bình chọn những đội hình mạnh nhất từ cộng đồng.",
    image:
      "https://yt3.ggpht.com/iTJyyUiZv3dQgzitw5Qh1ZQe4Kx5IZGvJEQY1N4_UIGrxCdg2v_oib5R7zMIBnn6VMVlo2AQSRUWMA=s1600-rw-nd-v1",
    primaryButtonText: "KHÁM PHÁ ĐỘI HÌNH",
    primaryButtonLink: "/doi-hinh",
    secondaryButtonText: "TẠO ĐỘI HÌNH",
    secondaryButtonLink: "/cong-cu",
    status: "Hiện",
  },
  {
    id: "2",
    title: "Tuyển cộng tác viên",
    subtitle: "Cộng đồng cùng xây dựng meta",
    description:
      "Không phải tuyển dụng nhân viên, chúng tôi tìm kiếm những game thủ kỳ cựu cùng tham gia cập nhật và phát triển dữ liệu chung.",
    image:
      "https://yt3.ggpht.com/zLnhIYLvs1vxHVia2r2t42Qt54HY3VRDELgvU7v0bnznPmHzAuLVs9ejhm5xKlk1ID6H4f2_xAAqYD4=s1600-rw-nd-v1",
    primaryButtonText: "ĐĂNG KÝ NGAY",
    primaryButtonLink: "#",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    status: "Hiện",
  },
]

export const DEFAULT_RELICS: Relic[] = [
  {
    id: "1",
    name: "Nhẫn Băng",
    effect: "Tăng 20% giáp cho đồng minh xung quanh",
    rating: "S",
    tier: 1,
    type: "Phòng thủ",
    status: "Hiện",
  },
  {
    id: "2",
    name: "Kiếm Quỷ",
    effect: "Tăng 50 sát thương vật lý",
    rating: "A",
    tier: 2,
    type: "Tấn công",
    status: "Hiện",
  },
  {
    id: "3",
    name: "Gậy Thần",
    effect: "Tăng 30% sát thương kỹ năng",
    rating: "S",
    tier: 1,
    type: "Phép thuật",
    status: "Hiện",
  },
]

export const DEFAULT_COMMENTS: Comment[] = [
  {
    id: "1",
    threadId: "1",
    author: "GamerPro99",
    avatar: "GP",
    target: "Đội hình Sát Thủ",
    content: "Đội hình này cực lỗi sát thương luôn, vừa lật kèo top 8 lên top 1!",
    date: "20/05/2024",
    status: "Chờ duyệt",
  },
  {
    id: "2",
    threadId: "1",
    author: "MetaMaster",
    avatar: "MM",
    target: "9 Warrior",
    content: "Thử đội hình 6 Mage + 2 Warlock, burst magic xuyên giáp khá tốt.",
    date: "20/05/2024",
    status: "Đã duyệt",
  },
  {
    id: "3",
    threadId: "1",
    author: "Top4King",
    avatar: "TK",
    target: "9 Warrior",
    content: "9 Warrior late game khó bị one-shot nếu có đủ CC. Chú ý item giảm hồi chiêu.",
    date: "19/05/2024",
    status: "Đã duyệt",
  },
  {
    id: "4",
    threadId: "2",
    author: "LeoRankDem",
    avatar: "RD",
    target: "Gậy Thần (Relic)",
    content: "Mới test thử, kích pháp có vẻ mượt mà dồn dmg bá đạo thật sự.",
    date: "19/05/2024",
    status: "Đã duyệt",
  },
  {
    id: "5",
    threadId: "3",
    author: "NoobPlayer01",
    avatar: "NP",
    target: "Đội hình Hoang Dã",
    content: "Sao mốc kích 4 hoang dã đánh chậm thế nhỉ, có ai bị lỗi giống vậy ko?",
    date: "18/05/2024",
    status: "Đã duyệt",
  },
  {
    id: "6",
    threadId: "1",
    author: "toxic_user_anti",
    avatar: "TU",
    target: "Kiếm Quỷ",
    content: "Vật phẩm rác rưởi, cân bằng quá tệ, khuyên ae đừng xài phí thời gian.",
    date: "18/05/2024",
    status: "Báo cáo",
  },
  {
    id: "7",
    threadId: "1",
    parentId: "2",
    author: "WarriorFan",
    avatar: "WF",
    target: "9 Warrior",
    content: "6 Mage + 2 Warlock mình thử rồi, khá ổn nếu có đủ CC.",
    date: "20/05/2024",
    status: "Đã duyệt",
  },
]

export const DEFAULT_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "1",
    author: "AutoChessGod",
    avatar: "bg-brand-gold",
    title: "Tại sao 9 Warrior đang bá đạo ở patch này?",
    content:
      "Mọi người cho mình hỏi với lượng giáp khổng lồ từ 9 Warrior, có đội hình nào thuần phép hoặc sát thương chuẩn có thể xuyên qua được không?",
    time: "2 giờ trước",
    likes: 142,
    comments: 34,
    tags: ["Thảo luận", "Meta"],
  },
  {
    id: "2",
    author: "NewbieTFT",
    avatar: "bg-brand-green",
    title: "Cần hướng dẫn cách xếp bài late game",
    content:
      "Mình thường xuyên lọt top 4 nhưng toàn thua ở round quyết định vì xếp bài sai. Cụ thể là cách đặt position cho Assassin và chống Assassin như thế nào?",
    time: "5 giờ trước",
    likes: 56,
    comments: 12,
    tags: ["Người mới", "Hướng dẫn"],
  },
  {
    id: "3",
    author: "MageSlayer",
    avatar: "bg-tier-b",
    title: "Trải nghiệm thử giáo án 6 Marine - Quá khủng!",
    content:
      "Hôm nay mình test 6 Marine kẹp với 3 Hunter. Bọn Mage bên kia tung skill như muỗi đốt inox. Khuyên anh em rank dưới nên thử.",
    time: "1 ngày trước",
    likes: 230,
    comments: 89,
    tags: ["Đội hình dị", "Review"],
  },
]

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Admin",
    role: "Sáng lập & Quản trị",
    avatar: "bg-brand-gold",
    bio: "Xây dựng Auto Chess Mobile VN — nơi cập nhật meta, đội hình và công cụ cho kỳ thủ Việt.",
    socialUrl: "https://facebook.com",
    order: 1,
    status: "Hiện",
  },
  {
    id: "2",
    name: "MetaMaster",
    role: "Biên tập Meta",
    avatar: "bg-tier-b",
    bio: "Theo dõi patch notes, phân tích tier list và duy trì dữ liệu đội hình meta hàng tuần.",
    order: 2,
    status: "Hiện",
  },
  {
    id: "3",
    name: "PlayerOne",
    role: "Cộng tác viên",
    avatar: "bg-brand-green",
    bio: "Đóng góp giáo án leo rank và hướng dẫn người mới từ trải nghiệm thực chiến server VN.",
    order: 3,
    status: "Hiện",
  },
]

export const DEFAULT_COMMUNITY_CHANNELS: CommunityChannel[] = [
  {
    id: "1",
    platform: "youtube",
    name: "Yequen",
    url: "https://youtube.com",
    highlight: "Cao thủ",
    description:
      "Kênh cao thủ leo rank — học positioning, kinh tế và pivot meta từ góc nhìn top server VN.",
    order: 1,
    status: "Hiện",
  },
  {
    id: "2",
    platform: "youtube",
    name: "AutoChess VN Guide",
    url: "https://youtube.com",
    highlight: "Hướng dẫn",
    description: "Series hướng dẫn từng bước cho người mới, giải thích synergy và item build cơ bản.",
    order: 2,
    status: "Hiện",
  },
  {
    id: "3",
    platform: "tiktok",
    name: "TFT Tips VN",
    url: "https://tiktok.com",
    highlight: "Tips nhanh",
    description: "Clip ngắn meta mới, mẹo xếp bài và counter đội hình phổ biến — xem trong 1 phút.",
    order: 1,
    status: "Hiện",
  },
  {
    id: "4",
    platform: "facebook",
    name: "Auto Chess Mobile VN",
    url: "https://facebook.com",
    highlight: "Cộng đồng chính",
    description: "Group thảo luận meta, hỏi đáp nhanh và cập nhật sự kiện từ cộng đồng game thủ.",
    order: 1,
    status: "Hiện",
  },
  {
    id: "5",
    platform: "discord",
    name: "Auto Chess VN Discord",
    url: "https://discord.com",
    highlight: "Chat trực tiếp",
    description: "Kênh chat real-time, chia sẻ comp và nhận feedback từ cao thủ trong cộng đồng.",
    order: 1,
    status: "Hiện",
  },
]

export const DEFAULT_EVENTS: AdminEvent[] = [
  {
    id: "1",
    title: "Auto Chess Championship 2026 - Mùa S20",
    prize: "50,000,000 VND",
    date: "25/06/2026",
    participants: "128 Kì thủ",
    status: "Cho đăng ký",
  },
  {
    id: "2",
    title: "Thách đấu Siêu Cup Sát Thủ Bóng Đêm",
    prize: "15,000,000 VND",
    date: "18/06/2026",
    participants: "64 Kì thủ",
    status: "Sắp diễn ra",
  },
  {
    id: "3",
    title: "Giao hữu Clan War - Hoang Dã Đại Chiến",
    prize: "Qua tặng Code Trân Bảo",
    date: "12/06/2026",
    participants: "16 Clan",
    status: "Kết thúc",
  },
]

export const DEFAULT_MEDIA: MediaAsset[] = [
  {
    id: "1",
    name: "banner_championship_s20.png",
    category: "Banners",
    size: "1.2 MB",
    url: "https://yt3.ggpht.com/iTJyyUiZv3dQgzitw5Qh1ZQe4Kx5IZGvJEQY1N4_UIGrxCdg2v_oib5R7zMIBnn6VMVlo2AQSRUWMA=s1600-rw-nd-v1",
    alt: "Banner Championship S20",
    uploadedAt: "15/05/2024",
  },
  {
    id: "2",
    name: "banner_recruitment_collaborator.png",
    category: "Banners",
    size: "840 KB",
    url: "https://yt3.ggpht.com/zLnhIYLvs1vxHVia2r2t42Qt54HY3VRDELgvU7v0bnznPmHzAuLVs9ejhm5xKlk1ID6H4f2_xAAqYD4=s1600-rw-nd-v1",
    alt: "Banner tuyển CTV",
    uploadedAt: "14/05/2024",
  },
  {
    id: "3",
    name: "icon_kiem_quy.png",
    category: "Trang bị",
    size: "45 KB",
    url: "https://img.icons8.com/color/96/sword.png",
    alt: "Icon Kiếm Quỷ",
    uploadedAt: "12/05/2024",
  },
  {
    id: "4",
    name: "icon_nhan_bang.png",
    category: "Trang bị",
    size: "38 KB",
    url: "https://img.icons8.com/color/96/diamond-ring.png",
    alt: "Icon Nhẫn Băng",
    uploadedAt: "12/05/2024",
  },
  {
    id: "5",
    name: "sprite_sat_thu.png",
    category: "Tướng",
    size: "125 KB",
    url: "https://img.icons8.com/color/96/ninja.png",
    alt: "Sprite Sát Thủ",
    uploadedAt: "10/05/2024",
  },
]

export const DEFAULT_PLAYERS: LeaderboardPlayer[] = [
  { id: "1", rank: 1, name: "T_Rex_Auto", server: "VN-1", mmr: 3450, tier: "Queen", winRate: "32.4%", matches: 154 },
  { id: "2", rank: 2, name: "Shin_Z", server: "VN-1", mmr: 3390, tier: "Queen", winRate: "30.1%", matches: 142 },
  { id: "3", rank: 3, name: "Kenji_VN", server: "VN-2", mmr: 3280, tier: "Queen", winRate: "28.5%", matches: 168 },
  { id: "4", rank: 4, name: "AutoQueen99", server: "VN-1", mmr: 3120, tier: "King", winRate: "26.4%", matches: 120 },
  { id: "5", rank: 5, name: "Bao_Bao", server: "VN-3", mmr: 3050, tier: "King", winRate: "25.8%", matches: 110 },
]
