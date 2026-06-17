import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useLocation as useLocation$1, NavLink as NavLink$1, Link as Link$1, data, Navigate, useParams as useParams$1 } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { u as usePersistedEntity, S as STORAGE_KEYS, l as loadJson, s as saveJson, I as Input, B as Button, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter, g as SITE_URL, h as SITE_NAME, i as SITE_DESCRIPTION, j as DataProvider, r as renderSitemapXml, k as buildSitemapEntries, c as cn, m as Separator, p as pageTitle$2, n as getHeroIconUrl, o as Badge, q as getOrderedCompHeroes, C as Card, t as estimateReadingMinutes, v as isPostImageUrl, w as useAppStore, x as CLASSES, y as SectionHeader, z as Select, E as SelectTrigger, F as SelectValue, G as SelectContent, H as SelectItem, J as difficultyLabelKey, K as DEFAULT_COMMUNITY_POSTS, L as DEFAULT_POSTS, M as DEFAULT_RELICS, N as ITEMS, O as HEROES, R as RACES, P as COMPS, Q as BOARD_ROWS, T as BOARD_ROW_LABELS, U as BOARD_COLS, V as resolveCompBoard, W as getCompTop4, X as splitCoreFlexHeroIds, Y as getRecommendedItems, Z as roadmapHasContent, _ as getTraitHeroes, $ as getTraitDetailPath, a0 as TraitIcon, a1 as buildTraitItems, a2 as filterTraits, a3 as getTraitRelatedComps, a4 as raceToTraitItem, a5 as classToTraitItem, a6 as getTraitsListPath, a7 as routeKindToTraitKind, a8 as filterHeroes, a9 as isHeroNew, aa as getHeroSkins, ab as getRaceTraitPath, ac as getClassTraitPath, ad as getRelatedHeroes, ae as RACE_NAME_ALIASES, af as resolveHeroSkill, ag as resolveHeroStats, ah as getCompsForHero, ai as parseTimeRange, aj as getPublishedPosts, ak as filterNewsPosts, al as getCategoryCounts, am as getPopularPosts, an as getPostAuthors, ao as NEWS_TIME_RANGES, ap as splitFeaturedPosts, aq as CloudinaryFileUpload$1, ar as isPersistableImageUrl, as as isPersistableAvatarValue, at as AdminPageHeader, au as EMPTY_USER_FORM, av as useAdminListPage, aw as AdminListShell, ax as AdminDataTable, ay as AdminTable, az as AdminThead, aA as AdminTr, aB as AdminTh, aC as AdminTd, aD as AdminTableActionButton, aE as AdminToolbar, aF as AdminTableFooterText, aG as AdminFormDialog, aH as AdminDeleteDialog, aI as AdminSuccessBanner, aJ as userFormFromRecord, aK as nextNumericIdNumber, aL as EMPTY_ITEM_FORM, aM as AdminRowActions, aN as itemFromFormValue, aO as itemFormFromItem, aP as AdminItemDetailDialog, aQ as slugifyItemId, aR as createDefaultHeroDraft, aS as slugifyHeroId, aT as normalizeHeroDraft, aU as resetHeroFieldsFromSeed, aV as AdminInlineFilter, aW as EMPTY_COMP_FORM, aX as compFormFromComp, aY as nextNumericId, aZ as compFromFormValue, a_ as calcSynergiesFromHeroes, a$ as recordFromBoardSlots, b0 as AdminTraitPanel, b1 as AdminDetailDialog, b2 as AdminStatCards, b3 as EMPTY_BANNER_FORM, b4 as bannerFormFromBanner, b5 as AdminBannerDetailDialog, b6 as bannerFromFormValue, b7 as EMPTY_RELIC_FORM, b8 as AdminRelicDetailDialog, b9 as useAdminSuccessToast, ba as useAdminCrudDialogs, bb as AdminField, bc as AdminCommentDetailDrawer, bd as EMPTY_PLAYER_FORM, be as AdminTableScroll, bf as playerPatchFromFormValue, bg as playerFormFromPlayer, bh as playerFromFormValue, bi as EMPTY_EVENT_FORM, bj as eventFromFormValue, bk as eventFormFromEvent, bl as EMPTY_MEDIA_FORM, bm as mediaFromFormValue, bn as mediaFormFromAsset, A as AdminDemoBadge, bo as buildDefaultSeoDraft, bp as rowsToPagesMeta, bq as EMPTY_TEAM_FORM, br as teamFormFromMember, bs as teamFromFormValue, bt as teamPatchFromFormValue, bu as EMPTY_CHANNEL_FORM, bv as CHANNEL_PLATFORMS, bw as channelFormFromRecord, bx as channelFromFormValue, by as channelPatchFromFormValue } from "./admin-ui-BjWfzkMI.js";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { LazyMotion, domAnimation, AnimatePresence, m } from "motion/react";
import { X, User, Mail, Lock, AlertTriangle, LogOut, Scale, GitCompareArrows, Target, Search, LayoutGrid, Gem, Sparkles, UserRound, Layers, Globe2, Activity, Menu, UsersRound, MessagesSquare, Newspaper, PenSquare, Trophy, Wrench, BookOpen, Home, ShieldAlert, Info, ChevronDown, ChevronRight, Shield, Monitor, ExternalLink, MessageCircle, Globe, Github, LayoutDashboard, Swords, FileText, MessageSquare, Settings, Star, ThumbsUp, Eye, Clock, Calendar, ArrowUp, TrendingUp, Check, Copy, Filter, ChevronLeft, Bookmark, ShieldCheck, Users, BarChart3, GitBranch, Zap, ArrowRight, Share2, Facebook, Twitter, Link as Link$2, Medal, PenLine, Send, ArrowDown, ArrowLeft, MoreHorizontal, Heart, Pencil, Hammer, BarChart, Accessibility, Package, Image, Bell, BarChart2, Ban, Plus, Save, Layout as Layout$2, Bold, Type, List, CheckCircle, EyeOff, Key, Trash2, RefreshCw, ImageIcon, CloudLightning, Download, ArrowUpRight, ArrowDownRight, Sliders, Database } from "lucide-react";
import { useTranslation, initReactI18next, Trans } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate, useParams, useSearchParams, Routes, Route, Navigate as Navigate$1 } from "react-router-dom";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { QRCodeSVG } from "qrcode.react";
import "clsx";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, _loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");
    const readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html; charset=utf-8");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_ADMIN_USERS = [
  { id: 1, name: "Admin_Master", email: "admin@5fedu.com", role: "Admin", status: "Hoạt động", date: "20/05/2024" },
  { id: 2, name: "Moderator_Zen", email: "zen.mod@autochess.io", role: "Moderator", status: "Hoạt động", date: "20/05/2024" },
  { id: 3, name: "PlayerOne", email: "player1@gmail.com", role: "Thành viên", status: "Hoạt động", date: "20/05/2024" },
  { id: 4, name: "StrategyKing", email: "king@meta.com", role: "Thành viên", status: "Hoạt động", date: "19/05/2024" },
  { id: 5, name: "TrollBot_99", email: "troll@trash.com", role: "Thành viên", status: "Bị khóa", date: "18/05/2024" }
];
const DEFAULT_ADMIN_ROLES = [
  {
    id: "1",
    name: "Super Admin",
    code: "SUPER_ADMIN",
    desc: "Toàn quyền cấu hình hệ thống, quản lý cơ sở dữ liệu, sửa đổi tướng, tộc hệ và tài khoản người dùng.",
    users: 2,
    scopes: ["all"]
  },
  {
    id: "2",
    name: "Editor",
    code: "EDITOR",
    desc: "Được quyền biên tập bài viết, đăng tin tức, quản lý Banners và tạo các cẩm nang đội hình mới.",
    users: 4,
    scopes: ["write:posts", "write:comps", "read:heroes"]
  },
  {
    id: "3",
    name: "Moderator",
    code: "MODERATOR",
    desc: "Duyệt bình luận của cộng đồng, kiểm duyệt nội dung bài đăng thành viên và báo cáo vi phạm.",
    users: 3,
    scopes: ["read:users", "write:comments", "flag_moderate"]
  },
  {
    id: "4",
    name: "Vip Member",
    code: "VIP_MEMBER",
    desc: "Người dùng đặc biệt, hưởng đặc quyền bình luận nâng cao và ưu tiên duyệt bài đăng chiến thuật nhanh.",
    users: 84,
    scopes: ["priority_posting"]
  }
];
function useAdminUsersState() {
  return usePersistedEntity(STORAGE_KEYS.adminUsers, DEFAULT_ADMIN_USERS);
}
function useAdminRolesState() {
  return usePersistedEntity(STORAGE_KEYS.adminRoles, DEFAULT_ADMIN_ROLES);
}
const ADMIN_USERS_SYNC_EVENT = "admin-users-sync";
const VALID_ROLES = ["Quản trị viên", "Moderator", "Thành viên"];
function stableUuidFromEmail(email) {
  const normalized = email.trim().toLowerCase();
  const bytes = new TextEncoder().encode(normalized);
  let hash = 2166136261;
  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, 16777619);
  }
  const h2 = Math.imul(hash, 2654435761) >>> 0;
  const h3 = Math.imul(hash, 1597334677) >>> 0;
  const h4 = Math.imul(hash, 2246822519) >>> 0;
  const variant = (8 + hash % 4).toString(16);
  const part1 = (hash >>> 0).toString(16).padStart(8, "0");
  const part2 = (h2 & 65535).toString(16).padStart(4, "0");
  const part3 = (16384 | h3 & 4095).toString(16).padStart(4, "0");
  const part4 = `${variant}${(h4 & 4095).toString(16).padStart(3, "0")}`;
  const part5 = h3.toString(16).padStart(8, "0") + h4.toString(16).padStart(4, "0");
  return `${part1}-${part2}-${part3}-${part4}-${part5}`.slice(0, 36);
}
function parseAdminUserId(raw) {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = hash * 31 + raw.charCodeAt(i) | 0;
  }
  const positive = Math.abs(hash);
  return positive > 0 ? positive : 1;
}
function resolvePublicUserRole(user) {
  var _a;
  if (user.role && VALID_ROLES.includes(user.role)) return user.role;
  const metaRole = (_a = user.metadata) == null ? void 0 : _a.role;
  if (typeof metaRole === "string" && VALID_ROLES.includes(metaRole)) {
    return metaRole;
  }
  return "Thành viên";
}
function ensureStableUserId(user) {
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id)) {
    return user.id;
  }
  return stableUuidFromEmail(user.email);
}
function publicUserToAdminRecord(user, role) {
  const stableId = ensureStableUserId(user);
  const resolvedRole = resolvePublicUserRole(user);
  return {
    id: parseAdminUserId(stableId),
    name: user.name,
    email: user.email,
    role: resolvedRole,
    status: "Hoạt động",
    date: user.joinedAt ? new Date(user.joinedAt).toLocaleDateString("vi-VN") : (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN")
  };
}
function upsertAdminUserFromPublic(users, publicUser, role) {
  const next = publicUserToAdminRecord(publicUser);
  const index = users.findIndex((u) => u.email.toLowerCase() === next.email.toLowerCase());
  if (index === -1) return [...users, next];
  return users.map((u, i) => i === index ? { ...u, ...next, id: u.id } : u);
}
function syncPublicLoginToAdminUsers(publicUser) {
  const sessionUser = {
    ...publicUser,
    id: ensureStableUserId(publicUser)
  };
  const current = loadJson(STORAGE_KEYS.adminUsers, DEFAULT_ADMIN_USERS);
  const next = upsertAdminUserFromPublic(current, sessionUser);
  saveJson(STORAGE_KEYS.adminUsers, next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ADMIN_USERS_SYNC_EVENT));
  }
  return next;
}
const AUTH_USER_KEY = "auto_chess_user";
const AuthContext = React.createContext({
  user: null,
  login: () => {
  },
  updateUser: () => {
  },
  logout: () => {
  },
  showAuthModal: false,
  setShowAuthModal: () => {
  },
  authMode: "login",
  setAuthMode: () => {
  },
  openLogin: () => {
  },
  openRegister: () => {
  },
  showLogoutConfirm: false,
  setShowLogoutConfirm: () => {
  },
  triggerLogout: () => {
  }
});
const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => loadJson(AUTH_USER_KEY, null));
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState("login");
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const persistUser = (nextUser) => {
    setUser(nextUser);
    saveJson(AUTH_USER_KEY, nextUser);
  };
  const login2 = (newUser) => {
    const sessionUser = {
      ...newUser,
      joinedAt: newUser.joinedAt ?? (/* @__PURE__ */ new Date()).toISOString()
    };
    persistUser(sessionUser);
    syncPublicLoginToAdminUsers(sessionUser);
    setShowAuthModal(false);
  };
  const updateUser = (patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const nextUser = { ...prev, ...patch };
      saveJson(AUTH_USER_KEY, nextUser);
      return nextUser;
    });
  };
  const logout2 = () => {
    setUser(null);
    saveJson(AUTH_USER_KEY, null);
    setShowLogoutConfirm(false);
  };
  const triggerLogout = () => {
    setShowLogoutConfirm(true);
  };
  const openLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };
  const openRegister = () => {
    setAuthMode("register");
    setShowAuthModal(true);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: {
    user,
    login: login2,
    updateUser,
    logout: logout2,
    showAuthModal,
    setShowAuthModal,
    authMode,
    setAuthMode,
    openLogin,
    openRegister,
    showLogoutConfirm,
    setShowLogoutConfirm,
    triggerLogout
  }, children });
};
const useAuth = () => React.useContext(AuthContext);
function MotionProvider({ children }) {
  return /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children });
}
function AuthModal() {
  const { showAuthModal, setShowAuthModal, authMode, setAuthMode, login: login2 } = useAuth();
  const { t } = useTranslation("auth");
  if (!showAuthModal) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.namedItem("email").value.trim();
    const displayName = authMode === "register" ? form.elements.namedItem("name").value.trim() : "";
    const name = displayName || email.split("@")[0] || "Player";
    const role = authMode === "register" ? "Thành viên" : "Thành viên";
    login2({
      id: stableUuidFromEmail(email),
      name,
      email,
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
      role,
      metadata: { source: "local-mock", authMode }
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-brand-card border border-brand-border rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 border-b border-brand-border", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: authMode === "login" ? t("loginTitle") : t("registerTitle") }),
      /* @__PURE__ */ jsx("button", { onClick: () => setShowAuthModal(false), className: "text-brand-text-sub hover:text-white transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
      authMode === "register" && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[13px] text-brand-text-sub font-medium", children: t("displayNameLabel") }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-2.5 h-4 w-4 text-brand-text-sub" }),
          /* @__PURE__ */ jsx(Input, { required: true, name: "name", placeholder: t("displayNamePlaceholder"), className: "pl-9 bg-brand-card-2 border-brand-border" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[13px] text-brand-text-sub font-medium", children: t("emailLabel") }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-2.5 h-4 w-4 text-brand-text-sub" }),
          /* @__PURE__ */ jsx(Input, { type: "email", name: "email", required: true, placeholder: "name@example.com", className: "pl-9 bg-brand-card-2 border-brand-border" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[13px] text-brand-text-sub font-medium", children: t("passwordLabel") }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-2.5 h-4 w-4 text-brand-text-sub" }),
          /* @__PURE__ */ jsx(Input, { type: "password", name: "password", required: true, placeholder: "••••••••", className: "pl-9 bg-brand-card-2 border-brand-border" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full mt-2", children: authMode === "login" ? t("login") : t("createAccount") }),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-[13px] text-brand-text-sub mt-4", children: [
        authMode === "login" ? t("noAccount") + " " : t("hasAccount") + " ",
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setAuthMode(authMode === "login" ? "register" : "login"),
            className: "text-brand-gold hover:underline font-medium",
            children: authMode === "login" ? t("registerNow") : t("login")
          }
        )
      ] })
    ] })
  ] }) });
}
function LogoutConfirmModal() {
  const { showLogoutConfirm, setShowLogoutConfirm, logout: logout2 } = useAuth();
  const { t } = useTranslation(["auth", "common"]);
  return /* @__PURE__ */ jsx(Dialog, { open: showLogoutConfirm, onOpenChange: setShowLogoutConfirm, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[400px] border border-white/10 bg-brand-card p-6 sm:p-8 rounded-xl shadow-2xl", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { className: "flex flex-col items-center text-center space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl font-bold tracking-tight text-white uppercase", children: t("auth:logoutConfirmTitle") }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-[13.5px] text-brand-text-sub font-normal", children: t("auth:logoutConfirmDesc") })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "grid grid-cols-2 gap-3 mt-6 sm:space-x-0", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: () => setShowLogoutConfirm(false),
          className: "w-full h-11 border-white/5 bg-white/5 hover:bg-white/10 text-brand-text-sub hover:text-white rounded-xl text-[13px] font-bold uppercase",
          children: t("common:cancel")
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "danger",
          onClick: logout2,
          className: "w-full h-11 bg-brand-red hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold uppercase shadow-lg shadow-brand-red/10",
          children: [
            /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
            " ",
            t("auth:logout")
          ]
        }
      )
    ] })
  ] }) });
}
function getDefaultJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "vi-VN"
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icons/pwa-512x512.png`
      },
      {
        "@type": "VideoGame",
        name: "Auto Chess Mobile",
        genre: "Strategy",
        applicationCategory: "Game",
        operatingSystem: "Android, iOS"
      }
    ]
  };
}
function buildArticleJsonLd(input) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.image,
    datePublished: input.datePublished,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icons/pwa-512x512.png`
      }
    }
  };
}
function buildEntityJsonLd(input) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "Thing",
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image
  };
}
const indexCss = "/assets/index-Dv60FMaU.css";
const links = () => [{
  rel: "stylesheet",
  href: indexCss
}, {
  rel: "icon",
  href: "/icons/auto-chess-icon.jpg",
  type: "image/jpeg"
}, {
  rel: "apple-touch-icon",
  href: "/icons/apple-touch-icon.png"
}, {
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "dns-prefetch",
  href: "https://res.cloudinary.com"
}];
const meta$J = () => [{
  charSet: "utf-8"
}, {
  name: "viewport",
  content: "width=device-width, initial-scale=1"
}, {
  name: "theme-color",
  content: "#0D0E12"
}, {
  name: "apple-mobile-web-app-capable",
  content: "yes"
}, {
  name: "apple-mobile-web-app-title",
  content: "Auto Chess VN"
}];
function Layout$1({
  children
}) {
  const jsonLd = getDefaultJsonLd();
  return /* @__PURE__ */ jsxs("html", {
    lang: "vi",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(jsonLd)
        }
      }), null]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("a", {
        href: "#main-content",
        className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-brand-gold focus:px-4 focus:py-2 focus:text-black focus:font-semibold",
        children: "Bỏ qua nội dung"
      }), children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(DataProvider, {
    children: /* @__PURE__ */ jsx(AuthProvider, {
      children: /* @__PURE__ */ jsxs(MotionProvider, {
        children: [/* @__PURE__ */ jsx(AuthModal, {}), /* @__PURE__ */ jsx(LogoutConfirmModal, {}), /* @__PURE__ */ jsx(Outlet, {})]
      })
    })
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Đã xảy ra lỗi.";
  let details2 = "Vui lòng thử tải lại trang.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Lỗi";
    details2 = error.status === 404 ? "Trang bạn tìm không tồn tại." : error.statusText || details2;
  }
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-brand-bg text-brand-text-main flex items-center justify-center p-6",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-lg w-full bg-brand-card border border-brand-border rounded-xl p-6 space-y-3",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-bold",
        children: message
      }), /* @__PURE__ */ jsx("p", {
        className: "text-brand-text-sub",
        children: details2
      }), null]
    })
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout: Layout$1,
  default: root,
  links,
  meta: meta$J
}, Symbol.toStringTag, { value: "Module" }));
function loader$8() {
  const body = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
function loader$7() {
  const xml = renderSitemapXml(buildSitemapEntries());
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const NAV_ICONS = {
  home: Home,
  comps: LayoutGrid,
  library: BookOpen,
  tools: Wrench,
  leaderboard: Trophy,
  blog: PenSquare,
  news: Newspaper,
  discussion: MessagesSquare,
  community: UsersRound,
  menu: Menu
};
const LIBRARY_ICONS = {
  comps: LayoutGrid,
  traits: Activity,
  races: Globe2,
  classes: Layers,
  heroes: UserRound,
  items: Sparkles,
  relics: Gem
};
const TOOL_ICONS = {
  toolsTeamBuilder: LayoutGrid,
  toolsCompFinder: Search,
  toolsBanAdvisor: Target,
  toolsHeroCompare: GitCompareArrows,
  toolsCompCompare: Scale
};
const ICON_BY_LABEL = {
  ...NAV_ICONS,
  ...LIBRARY_ICONS,
  ...TOOL_ICONS
};
function getPageIcon(labelKey) {
  return ICON_BY_LABEL[labelKey];
}
const WIKI_DROPDOWN_LINKS = [
  {
    path: "/tuong",
    labelKey: "heroes",
    titleKey: "wikiHeroes",
    descKey: "wikiHeroesDesc",
    accent: "bg-orange-500/10 border-orange-500/10 text-orange-400 group-hover:bg-orange-500/20"
  },
  {
    path: "/trang-bi",
    labelKey: "items",
    titleKey: "wikiItems",
    descKey: "wikiItemsDesc",
    accent: "bg-brand-gold/10 border-brand-gold/10 text-brand-gold group-hover:bg-brand-gold/20"
  },
  {
    path: "/toc-he",
    labelKey: "traits",
    titleKey: "wikiTraits",
    descKey: "wikiTraitsDesc",
    accent: "bg-brand-gold/10 border-brand-gold/10 text-brand-gold group-hover:bg-brand-gold/20"
  },
  {
    path: "/di-vat",
    labelKey: "relics",
    titleKey: "wikiRelics",
    descKey: "wikiRelicsDesc",
    accent: "bg-purple-500/10 border-purple-500/10 text-purple-400 group-hover:bg-purple-500/20"
  }
];
const TOOL_SLUG_TO_I18N = {
  "tao-doi-hinh": "teamBuilder",
  "tim-doi-hinh": "compFinder",
  "ban-advisor": "banAdvisor",
  "so-sanh-tuong": "heroCompare",
  "so-sanh-doi-hinh": "compCompare"
};
const NAV_ITEMS = [
  { labelKey: "home", path: "/", icon: NAV_ICONS.home },
  {
    labelKey: "library",
    icon: NAV_ICONS.library,
    children: [
      { labelKey: "comps", path: "/doi-hinh", icon: LIBRARY_ICONS.comps },
      { labelKey: "traits", path: "/toc-he", icon: LIBRARY_ICONS.traits },
      { labelKey: "heroes", path: "/tuong", icon: LIBRARY_ICONS.heroes },
      { labelKey: "items", path: "/trang-bi", icon: LIBRARY_ICONS.items },
      { labelKey: "relics", path: "/di-vat", icon: LIBRARY_ICONS.relics }
    ]
  },
  {
    labelKey: "tools",
    icon: NAV_ICONS.tools,
    children: [
      { labelKey: "toolsTeamBuilder", path: "/cong-cu/tao-doi-hinh", icon: TOOL_ICONS.toolsTeamBuilder },
      { labelKey: "toolsBanAdvisor", path: "/cong-cu/ban-advisor", icon: TOOL_ICONS.toolsBanAdvisor },
      { labelKey: "toolsCompFinder", path: "/cong-cu/tim-doi-hinh", icon: TOOL_ICONS.toolsCompFinder },
      { labelKey: "toolsHeroCompare", path: "/cong-cu/so-sanh-tuong", icon: TOOL_ICONS.toolsHeroCompare },
      { labelKey: "toolsCompCompare", path: "/cong-cu/so-sanh-doi-hinh", icon: TOOL_ICONS.toolsCompCompare }
    ]
  },
  { labelKey: "leaderboard", path: "/bang-xep-hang", icon: NAV_ICONS.leaderboard },
  {
    labelKey: "blog",
    icon: NAV_ICONS.blog,
    children: [
      { labelKey: "news", path: "/tin-tuc", icon: NAV_ICONS.news },
      { labelKey: "discussion", path: "/thao-luan", icon: NAV_ICONS.discussion }
    ]
  },
  { labelKey: "community", path: "/cong-dong", icon: NAV_ICONS.community }
];
const LIBRARY_PATHS = ["/doi-hinh", "/tuong", "/trang-bi", "/toc-he", "/di-vat"];
const BLOG_PATHS = ["/tin-tuc", "/thao-luan"];
const MOBILE_TAB_ITEMS = [
  { labelKey: "home", path: "/", icon: NAV_ICONS.home, exact: true },
  { labelKey: "library", icon: NAV_ICONS.library, action: "hub", hubKey: "library", matchPaths: LIBRARY_PATHS },
  { labelKey: "tools", icon: NAV_ICONS.tools, action: "hub", hubKey: "tools", matchPrefix: "/cong-cu" },
  { labelKey: "blog", icon: NAV_ICONS.blog, action: "hub", hubKey: "blog", matchPaths: BLOG_PATHS },
  { labelKey: "menu", icon: NAV_ICONS.menu, action: "menu" }
];
const HUB_NAV_KEYS = {
  tools: "tools",
  library: "library",
  blog: "blog"
};
function getHubItems(hubKey) {
  const navItem = NAV_ITEMS.find((item) => item.labelKey === HUB_NAV_KEYS[hubKey]);
  return (navItem == null ? void 0 : navItem.children) ?? [];
}
function getToolNavChildren() {
  return getHubItems("tools");
}
function isHubPathActive(hubKey, pathname) {
  if (hubKey === "tools") {
    return pathname === "/cong-cu" || pathname.startsWith("/cong-cu/");
  }
  if (hubKey === "blog") {
    return BLOG_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  }
  return LIBRARY_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
function isNavChildActive(pathname, childPath) {
  return pathname === childPath || pathname.startsWith(`${childPath}/`);
}
const SIDEBAR_SECTIONS = [
  { labelKey: "sidebarSectionLookup", itemLabelKeys: ["home", "library"] },
  { labelKey: "sidebarSectionTools", itemLabelKeys: ["tools"] },
  { labelKey: "sidebarSectionNewsCommunity", itemLabelKeys: ["leaderboard", "blog", "community"] }
];
function isMobileTabActive(item, pathname, isMenuOpen = false, openHubKey = null) {
  if (item.action === "menu") return isMenuOpen;
  if (item.action === "hub" && item.hubKey) {
    return openHubKey === item.hubKey || isHubPathActive(item.hubKey, pathname);
  }
  if (!item.path) return false;
  if (item.exact) return pathname === item.path;
  if (item.matchPrefix) {
    return pathname === item.matchPrefix || pathname.startsWith(`${item.matchPrefix}/`);
  }
  if (item.matchPaths) {
    return item.matchPaths.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    );
  }
  return pathname === item.path || pathname.startsWith(`${item.path}/`);
}
function getQuickSearchLinks() {
  const links2 = [];
  for (const item of NAV_ITEMS) {
    if (item.path) {
      links2.push({ labelKey: item.labelKey, path: item.path, icon: item.icon });
    }
    if (item.children) {
      links2.push(...item.children);
    }
  }
  return links2;
}
const FOOTER_LIBRARY_LINKS = [
  { labelKey: "comps", path: "/doi-hinh" },
  { labelKey: "traits", path: "/toc-he" },
  { labelKey: "heroes", path: "/tuong" },
  { labelKey: "items", path: "/trang-bi" },
  { labelKey: "relics", path: "/di-vat" }
];
const FOOTER_TOOL_LINKS = [
  { labelKey: "toolsTeamBuilder", path: "/cong-cu/tao-doi-hinh" },
  { labelKey: "toolsCompFinder", path: "/cong-cu/tim-doi-hinh" },
  { labelKey: "toolsHeroCompare", path: "/cong-cu/so-sanh-tuong" }
];
const FOOTER_EXPLORE_LINKS = [
  { labelKey: "leaderboard", path: "/bang-xep-hang" },
  { labelKey: "news", path: "/tin-tuc" },
  { labelKey: "discussion", path: "/thao-luan" },
  { labelKey: "community", path: "/cong-dong" }
];
const FOOTER_MOBILE_QUICK_LINKS = [
  { labelKey: "news", path: "/tin-tuc" },
  { labelKey: "leaderboard", path: "/bang-xep-hang" },
  { labelKey: "discussion", path: "/thao-luan" },
  { labelKey: "community", path: "/cong-dong" }
];
function useNavItems() {
  const { t } = useTranslation("nav");
  return NAV_ITEMS.map((item) => {
    var _a;
    return {
      ...item,
      name: t(item.labelKey),
      children: (_a = item.children) == null ? void 0 : _a.map((child) => ({
        ...child,
        name: t(child.labelKey)
      }))
    };
  });
}
function useMobileTabItems() {
  const { t } = useTranslation("nav");
  return MOBILE_TAB_ITEMS.map((item) => ({
    ...item,
    name: t(item.labelKey)
  }));
}
function useSidebarSections() {
  const { t } = useTranslation("nav");
  return SIDEBAR_SECTIONS.map((section) => ({
    ...section,
    label: t(section.labelKey)
  }));
}
const DEFAULT_LOCALE = "vi";
const SUPPORTED_LOCALES = ["vi", "en"];
const LOCALE_STORAGE_KEY = "autochessmobile-locale";
const NAMESPACES = [
  "common",
  "nav",
  "auth",
  "footer",
  "home",
  "pages",
  "tools",
  "community",
  "news",
  "communityHub"
];
function resolveHtmlLang(locale) {
  return locale.startsWith("en") ? "en" : "vi";
}
const searchPlaceholder$5 = "Tìm kiếm...";
const searchAria$1 = "Tìm kiếm";
const searchPlaceholderExtended$1 = "Tướng, đội hình, công cụ...";
const quickLookupPlaceholder$1 = "Tra cứu nhanh...";
const quickLookupTitle$1 = "Tra cứu nhanh";
const noResults$1 = "Không có kết quả phù hợp";
const cancel$1 = "Hủy bỏ";
const closeAria$1 = "Đóng";
const share$1 = "Chia sẻ";
const details$1 = "Chi tiết";
const edit$1 = "Sửa";
const removeFavorite$1 = "Bỏ yêu thích";
const viewDetails$1 = "Xem chi tiết";
const viewAll$1 = "Xem tất cả";
const back$1 = "Quay lại";
const backToList$5 = "Quay lại danh sách";
const byAuthor$1 = "Bởi";
const today$1 = "Hôm nay";
const tierBadge$1 = "Bậc {{tier}}";
const top1$1 = "Top 1";
const top4$1 = "Top 4";
const all$1 = "Tất cả";
const clearFilters$1 = "Xóa bộ lọc";
const removeItem$1 = "Bỏ {{name}}";
const resultsCount$1 = "Hiển thị {{shown}} / {{total}}";
const gotIt$1 = "Đã hiểu";
const strategyTipsTitle$1 = "Mẹo chiến thuật kì thủ";
const swapTip$1 = "đổi mẹo hay";
const infoSupportTitle$1 = "Thông tin & Hỗ trợ kì thủ";
const infoSupportShort$1 = "Thông tin & hỗ trợ";
const infoTabGeneral$1 = "Thông tin chung";
const infoTabRollRates$1 = "Tỉ lệ Roll Cờ";
const infoIntro$1 = "Dự án <1>Cẩm nang Auto Chess Mobile VN</1> là nền tảng dữ liệu chiến thuật, bách khoa toàn thư phi lợi nhuận phục vụ riêng cho các kỳ thủ tại Việt Nam.";
const opsStatusTitle$1 = "Trạng thái vận hành";
const webVersionLabel$1 = "Bản cập nhật Web:";
const webVersionValue$1 = "v1.4.2 [Chính thức]";
const dataServerLabel$1 = "Máy chủ dữ liệu:";
const statusActive$1 = "Đang hoạt động";
const dataPartnerLabel$1 = "Đối tác dữ liệu:";
const dataPartnerValue$1 = "Drodo Studio";
const releaseCountryLabel$1 = "Quốc gia phát hành:";
const countryVN$1 = "Việt Nam (VN)";
const communityLinksTitle$1 = "Liên kết cộng đồng";
const linkOfficialSite$1 = "Trang chủ Auto Chess VNG";
const linkCommunityFB$1 = "Cộng đồng Kỳ Thủ Việt Nam";
const rollRatesDesc$1 = "Tỉ lệ phần trăm xuất hiện của các dải bậc tướng ($1 đến $5 vàng) dựa trên Cấp độ (Level) của người chơi hiện tại:";
const levelShort$1 = "Cấp";
const strategyTips$1 = ["Tích lũy 50 vàng nhanh nhất để nhận tối đa +5 vàng lợi tức mỗi vòng đấu.", "Quản lý chuỗi thắng hoặc chuỗi thua duy trì liên tục để nhận thưởng thêm vàng lợi tức.", "Ưu tiên xếp các tướng chống chịu có khống chế diện rộng lên hàng đầu để mở giao tranh sớm.", "Lên cấp độ 8 hoặc 9 trước các đối thủ nếu bạn đang hướng tới đội hình xoay quanh quân cờ 5 vàng.", "Lựa chọn các dị vật gia tăng sát thương vật lý cho đại hiệp hệ Thích Khách để tối ưu hóa đòn chí mạng.", "Đối thủ chơi đội hình Pháp Sư công phép mạnh mẽ? Hãy trang bị sớm Kháng Ma Bào để khắc chế.", "Đồng bộ tộc thủy tộc tăng mạnh cơ hội hồi năng lượng kỹ năng của toàn đội hình.", "Hãy luôn kiểm tra bàn cờ của đối phương để tránh việc bị tranh bài chủ lực và xoay bài khôn ngoan."];
const strategyTipsSidebar$1 = ["Tích lũy 50 vàng để nhận tối đa +5 lợi tức mỗi vòng.", "Kiểm tra bàn cờ đối phương để tránh bị tranh bài chủ lực.", "Lên level 8–9 sớm nếu đội hình cần quân cờ 5 vàng."];
const viCommon = {
  searchPlaceholder: searchPlaceholder$5,
  searchAria: searchAria$1,
  searchPlaceholderExtended: searchPlaceholderExtended$1,
  quickLookupPlaceholder: quickLookupPlaceholder$1,
  quickLookupTitle: quickLookupTitle$1,
  noResults: noResults$1,
  cancel: cancel$1,
  closeAria: closeAria$1,
  share: share$1,
  details: details$1,
  edit: edit$1,
  removeFavorite: removeFavorite$1,
  viewDetails: viewDetails$1,
  viewAll: viewAll$1,
  back: back$1,
  backToList: backToList$5,
  byAuthor: byAuthor$1,
  today: today$1,
  tierBadge: tierBadge$1,
  top1: top1$1,
  top4: top4$1,
  all: all$1,
  clearFilters: clearFilters$1,
  removeItem: removeItem$1,
  resultsCount: resultsCount$1,
  gotIt: gotIt$1,
  strategyTipsTitle: strategyTipsTitle$1,
  swapTip: swapTip$1,
  infoSupportTitle: infoSupportTitle$1,
  infoSupportShort: infoSupportShort$1,
  infoTabGeneral: infoTabGeneral$1,
  infoTabRollRates: infoTabRollRates$1,
  infoIntro: infoIntro$1,
  opsStatusTitle: opsStatusTitle$1,
  webVersionLabel: webVersionLabel$1,
  webVersionValue: webVersionValue$1,
  dataServerLabel: dataServerLabel$1,
  statusActive: statusActive$1,
  dataPartnerLabel: dataPartnerLabel$1,
  dataPartnerValue: dataPartnerValue$1,
  releaseCountryLabel: releaseCountryLabel$1,
  countryVN: countryVN$1,
  communityLinksTitle: communityLinksTitle$1,
  linkOfficialSite: linkOfficialSite$1,
  linkCommunityFB: linkCommunityFB$1,
  rollRatesDesc: rollRatesDesc$1,
  levelShort: levelShort$1,
  strategyTips: strategyTips$1,
  strategyTipsSidebar: strategyTipsSidebar$1
};
const home$1 = "Trang chủ";
const comps$3 = "Đội hình";
const library$1 = "Thư viện";
const traits$3 = "Tộc / Hệ";
const races$3 = "Tộc (Races)";
const classes$3 = "Hệ (Classes)";
const heroes$3 = "Tướng";
const items$3 = "Trang bị";
const relics$3 = "Dị vật";
const tools$3 = "Công cụ";
const toolsTeamBuilder$1 = "Tạo đội hình";
const toolsCompFinder$1 = "Tìm đội hình";
const toolsBanAdvisor$1 = "Ban tộc hệ";
const toolsHeroCompare$1 = "So sánh tướng";
const toolsCompCompare$1 = "So sánh đội hình";
const leaderboard$3 = "Vinh danh";
const news$1 = "Tin tức";
const blog$1 = "Blog";
const discussion$1 = "Thảo luận";
const community$1 = "Cộng đồng";
const menu$1 = "Menu";
const profile$3 = "Trang cá nhân";
const admin$1 = "Trang quản trị (Admin)";
const adminShort$1 = "Quản trị (Admin)";
const adminOverview$1 = "Tổng quan";
const adminUsers$1 = "Người dùng";
const adminPosts$1 = "Bài viết";
const adminComments$1 = "Bình luận";
const adminSettings$1 = "Cài đặt";
const backToHome$1 = "Về trang chủ";
const sidebarSectionLookup$1 = "Tra cứu";
const sidebarSectionTools$1 = "Công cụ";
const sidebarSectionNewsCommunity$1 = "Tin & cộng đồng";
const wikiHandbook$1 = "Cẩm Nang Auto Chess";
const wikiHandbookDesc$1 = "Truy cập nhanh bách khoa toàn thư chiến thuật";
const wikiHeroes$1 = "Cẩm nang Tướng";
const wikiHeroesDesc$1 = "Chỉ số, kỹ năng và cách lên đồ";
const wikiItems$1 = "Kho Trang bị";
const wikiItemsDesc$1 = "Công thức ghép & hiệu ứng kích hoạt";
const wikiTraits$1 = "Hệ thống Tộc / Hệ";
const wikiTraitsDesc$1 = "Synergy tộc và hệ tướng, mốc kích hoạt";
const wikiRaces$1 = "Hệ thống Tộc";
const wikiRacesDesc$1 = "Hiệu ứng cộng hưởng gia tăng tộc";
const wikiClasses$1 = "Hệ thống Hệ";
const wikiClassesDesc$1 = "Cơ chế phối hợp thuộc tính nghề";
const wikiRelics$1 = "Kho Di vật";
const wikiRelicsDesc$1 = "Sức mạnh di cổ tăng cường chỉ số";
const wikiGuide$1 = "Cẩm nang Wiki";
const libraryLink$1 = "Thư viện →";
const pickTool$1 = "Chọn công cụ";
const pickLibraryItem$1 = "Chọn mục thư viện";
const pickBlogItem$1 = "Chọn mục blog";
const openMenuAria$1 = "Mở menu";
const hubDesc$3 = { "traits": "Tra cứu synergy tộc và hệ tướng trong một nơi", "races": "Hiệu ứng kích hoạt theo số lượng quân cờ tộc", "classes": "Kỹ năng nghề và cơ chế phối hợp hệ", "heroes": "Chỉ số, kỹ năng và meta từng tướng", "items": "Công thức ghép và hiệu ứng trang bị", "relics": "Hiệu ứng đặc biệt từ dị vật", "news": "Tin tức meta, patch và cập nhật mùa giải", "discussion": "Thảo luận chiến thuật với cộng đồng" };
const viNav = {
  home: home$1,
  comps: comps$3,
  library: library$1,
  traits: traits$3,
  races: races$3,
  classes: classes$3,
  heroes: heroes$3,
  items: items$3,
  relics: relics$3,
  tools: tools$3,
  toolsTeamBuilder: toolsTeamBuilder$1,
  toolsCompFinder: toolsCompFinder$1,
  toolsBanAdvisor: toolsBanAdvisor$1,
  toolsHeroCompare: toolsHeroCompare$1,
  toolsCompCompare: toolsCompCompare$1,
  leaderboard: leaderboard$3,
  news: news$1,
  blog: blog$1,
  discussion: discussion$1,
  community: community$1,
  menu: menu$1,
  profile: profile$3,
  admin: admin$1,
  adminShort: adminShort$1,
  adminOverview: adminOverview$1,
  adminUsers: adminUsers$1,
  adminPosts: adminPosts$1,
  adminComments: adminComments$1,
  adminSettings: adminSettings$1,
  backToHome: backToHome$1,
  sidebarSectionLookup: sidebarSectionLookup$1,
  sidebarSectionTools: sidebarSectionTools$1,
  sidebarSectionNewsCommunity: sidebarSectionNewsCommunity$1,
  wikiHandbook: wikiHandbook$1,
  wikiHandbookDesc: wikiHandbookDesc$1,
  wikiHeroes: wikiHeroes$1,
  wikiHeroesDesc: wikiHeroesDesc$1,
  wikiItems: wikiItems$1,
  wikiItemsDesc: wikiItemsDesc$1,
  wikiTraits: wikiTraits$1,
  wikiTraitsDesc: wikiTraitsDesc$1,
  wikiRaces: wikiRaces$1,
  wikiRacesDesc: wikiRacesDesc$1,
  wikiClasses: wikiClasses$1,
  wikiClassesDesc: wikiClassesDesc$1,
  wikiRelics: wikiRelics$1,
  wikiRelicsDesc: wikiRelicsDesc$1,
  wikiGuide: wikiGuide$1,
  libraryLink: libraryLink$1,
  pickTool: pickTool$1,
  pickLibraryItem: pickLibraryItem$1,
  pickBlogItem: pickBlogItem$1,
  openMenuAria: openMenuAria$1,
  hubDesc: hubDesc$3
};
const member$1 = "Thành viên";
const login$1 = "Đăng nhập";
const register$1 = "Đăng ký";
const logout$1 = "Đăng xuất";
const loginTitle$1 = "Đăng nhập vào tài khoản";
const registerTitle$1 = "Tạo tài khoản mới";
const displayNameLabel$1 = "Tên hiển thị";
const displayNamePlaceholder$1 = "Nhập tên của bạn";
const emailLabel$1 = "Email";
const passwordLabel$1 = "Mật khẩu";
const createAccount$1 = "Tạo tài khoản ngay";
const noAccount$1 = "Chưa có tài khoản?";
const hasAccount$1 = "Đã có tài khoản?";
const registerNow$1 = "Đăng ký ngay";
const logoutConfirmTitle$1 = "Xác nhận đăng xuất";
const logoutConfirmDesc$1 = "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản Auto Chess Mobile VN không?";
const viAuth = {
  member: member$1,
  login: login$1,
  register: register$1,
  logout: logout$1,
  loginTitle: loginTitle$1,
  registerTitle: registerTitle$1,
  displayNameLabel: displayNameLabel$1,
  displayNamePlaceholder: displayNamePlaceholder$1,
  emailLabel: emailLabel$1,
  passwordLabel: passwordLabel$1,
  createAccount: createAccount$1,
  noAccount: noAccount$1,
  hasAccount: hasAccount$1,
  registerNow: registerNow$1,
  logoutConfirmTitle: logoutConfirmTitle$1,
  logoutConfirmDesc: logoutConfirmDesc$1
};
const taglineMobile$1 = "Cẩm nang chiến thuật Auto Chess Mobile VN cho kỳ thủ Việt Nam.";
const taglineDesktop$1 = "Cẩm nang chiến thuật Auto Chess Mobile VN — dữ liệu meta, đội hình và công cụ cho kỳ thủ Việt Nam.";
const sectionLibrary$1 = "Thư viện";
const sectionTools$1 = "Công cụ";
const sectionExplore$1 = "Khám phá";
const nonProfit$1 = "Phi lợi nhuận";
const webVersion$1 = "v1.4.2";
const disclaimer$1 = "Dự án phi lợi nhuận, không thuộc VNG";
const dataPartner$1 = "Drodo Studio là đối tác dữ liệu.";
const copyright$1 = "© {{year}} Auto Chess Mobile VN";
const copyrightMobile$1 = "© {{year}} Auto Chess Mobile VN · v1.4.2 · Phi lợi nhuận";
const ariaFacebook$1 = "Facebook cộng đồng";
const ariaOfficialSite$1 = "Trang chủ Auto Chess VNG";
const ariaGithub$1 = "GitHub";
const viFooter = {
  taglineMobile: taglineMobile$1,
  taglineDesktop: taglineDesktop$1,
  sectionLibrary: sectionLibrary$1,
  sectionTools: sectionTools$1,
  sectionExplore: sectionExplore$1,
  nonProfit: nonProfit$1,
  webVersion: webVersion$1,
  disclaimer: disclaimer$1,
  dataPartner: dataPartner$1,
  copyright: copyright$1,
  copyrightMobile: copyrightMobile$1,
  ariaFacebook: ariaFacebook$1,
  ariaOfficialSite: ariaOfficialSite$1,
  ariaGithub: ariaGithub$1
};
const metaBadge$1 = "Meta S20";
const patchNote$1 = "Bản cập nhật 20.5 — điều chỉnh tướng Warrior & Hunter";
const viewPatchNotes$1 = "Xem patch notes →";
const noBanners$1 = "Hiện tại không có thông báo nào mới.";
const slideAria$1 = "Chuyển đến slide {{n}}";
const stats$3 = { "comps": "ĐỘI HÌNH", "compsSub": "Được tạo bởi cộng đồng", "votes": "LƯỢT BÌNH CHỌN", "votesSub": "Tổng số lượt vote", "users": "NGƯỜI DÙNG", "usersSub": "Thành viên hoạt động", "posts": "BÀI VIẾT", "postsSub": "Bài viết & hướng dẫn" };
const trendingCompsTitle$1 = "Đội hình xu hướng";
const trendingCompsSubtitle$1 = "Do cộng đồng bình chọn";
const featuredHeroesTitle$1 = "Tướng nổi bật";
const featuredDiscussionsTitle$1 = "Thảo luận nổi bật";
const buildCompTitle$1 = "Tạo đội hình";
const buildCompDesc$1 = "Xây dựng đội hình meta từ danh sách tướng, tộc và hệ — lưu và chia sẻ với cộng đồng.";
const buildCompCta$1 = "Bắt đầu tạo";
const findCompTitle$1 = "Tìm đội hình phù hợp";
const findCompDesc$1 = "Chọn tướng bạn đang có trên bàn cờ — hệ thống gợi ý đội hình meta phù hợp nhất với tỷ lệ khớp.";
const findCompCta$1 = "Bắt đầu tìm kiếm";
const latestPostsTitle$1 = "Bài viết mới nhất";
const leaderboardTitle$1 = "Bảng xếp hạng";
const leaderboardTabs$1 = { "global": "Toàn server", "vn": "Việt Nam", "friends": "Bạn bè" };
const leaderboardCols$1 = { "player": "Người chơi", "score": "Điểm" };
const usefulToolsTitle$1 = "Công cụ hữu ích";
const tools$2 = { "teamBuilder": { "title": "Tạo đội hình", "desc": "Xây dựng đội hình Meta" }, "heroList": { "title": "Danh sách tướng", "desc": "Thông tin 160+ vị tướng" }, "itemList": { "title": "Danh sách trang bị", "desc": "Chỉ số và cách ghép đồ" }, "compFinder": { "title": "Tìm đội hình phù hợp", "desc": "Gợi ý theo trang bị đang có" } };
const tierSuffix$1 = "Tier";
const partnersTitle$1 = "Đối tác & Nhà tài trợ";
const partnersSubtitle$1 = "Đồng hành cùng cộng đồng Auto Chess Mobile VN";
const donateTitle$1 = "Ủng hộ dự án";
const donateSubtitle$1 = "Giúp chúng tôi duy trì và phát triển cẩm nang meta miễn phí";
const donateBankLabel$1 = "Ngân hàng";
const donateAccountLabel$1 = "Số tài khoản";
const donateHolderLabel$1 = "Chủ tài khoản";
const donateCopy$1 = "Sao chép STK";
const donateCopied$1 = "Đã sao chép!";
const donateScanHint$1 = "Quét mã QR bằng app ngân hàng để chuyển khoản nhanh";
const donateQrExpand$1 = "Phóng to mã QR để quét";
const donateQrPopupTitle$1 = "Quét mã chuyển khoản";
const donateTransparency$1 = "Mọi đóng góp được dùng để duy trì máy chủ và phát triển nội dung.";
const donateJoinCommunity$1 = "Tham gia cộng đồng";
const viHome = {
  metaBadge: metaBadge$1,
  patchNote: patchNote$1,
  viewPatchNotes: viewPatchNotes$1,
  noBanners: noBanners$1,
  slideAria: slideAria$1,
  stats: stats$3,
  trendingCompsTitle: trendingCompsTitle$1,
  trendingCompsSubtitle: trendingCompsSubtitle$1,
  featuredHeroesTitle: featuredHeroesTitle$1,
  featuredDiscussionsTitle: featuredDiscussionsTitle$1,
  buildCompTitle: buildCompTitle$1,
  buildCompDesc: buildCompDesc$1,
  buildCompCta: buildCompCta$1,
  findCompTitle: findCompTitle$1,
  findCompDesc: findCompDesc$1,
  findCompCta: findCompCta$1,
  latestPostsTitle: latestPostsTitle$1,
  leaderboardTitle: leaderboardTitle$1,
  leaderboardTabs: leaderboardTabs$1,
  leaderboardCols: leaderboardCols$1,
  usefulToolsTitle: usefulToolsTitle$1,
  tools: tools$2,
  tierSuffix: tierSuffix$1,
  partnersTitle: partnersTitle$1,
  partnersSubtitle: partnersSubtitle$1,
  donateTitle: donateTitle$1,
  donateSubtitle: donateSubtitle$1,
  donateBankLabel: donateBankLabel$1,
  donateAccountLabel: donateAccountLabel$1,
  donateHolderLabel: donateHolderLabel$1,
  donateCopy: donateCopy$1,
  donateCopied: donateCopied$1,
  donateScanHint: donateScanHint$1,
  donateQrExpand: donateQrExpand$1,
  donateQrPopupTitle: donateQrPopupTitle$1,
  donateTransparency: donateTransparency$1,
  donateJoinCommunity: donateJoinCommunity$1
};
const comps$2 = { "title": "Đội hình (Metagame)", "description": "Khám phá các đội hình dẫn đầu meta do cộng đồng xây dựng.", "createNew": "Tạo đội hình mới", "searchPlaceholder": "Tìm tên đội hình, hệ tộc hoặc tác giả...", "advancedFilter": "Lọc chi tiết", "updatedAt": "Cập nhật {{date}}", "votes": "Bình chọn", "empty": "Không tìm thấy đội hình nào phù hợp.", "clearFilters": "Xóa tất cả bộ lọc", "trending": "Trending", "tabs": { "all": "Tất cả", "hot": "Đội hình hot", "new": "Đội hình mới", "following": "Theo dõi" }, "tierFilter": { "all": "Tất cả Tiers", "s": "S Tier", "a": "A Tier", "b": "B Tier" }, "compareMode": "So sánh", "compareModeOn": "Đang chọn", "compareHint": "Chọn 2–3 đội hình để so sánh. Bấm So sánh trên thanh dưới cùng." };
const compDetail$1 = { "backToList": "Quay lại danh sách đội hình", "byAuthor": "Bởi", "updatedAt": "Cập nhật:", "votes": "Bình chọn", "overviewTitle": "Tổng quan chiến thuật", "stats": { "top1": "Tỷ lệ Top 1", "top4": "Top 4", "difficulty": "Độ khó", "style": "Phong cách" }, "difficultyModerate": "Vừa phải", "styleFast8": "Fast 8", "quickReview": "Đánh giá nhanh", "strengthsTitle": "Điểm mạnh", "weaknessesTitle": "Điểm yếu", "requiredLineup": "Đội hình yêu cầu ({{count}})", "coreBadge": "CORE", "goldCost": "{{cost}} Vàng", "positioningTitle": "Sắp xếp đội hình (Positioning)", "boardStages": { "early": "Stage 1-3", "final": "Final Board" }, "positioningHint": "* Kéo thả để thay đổi vị trí tướng trên bàn cờ", "synergiesTitle": "Hệ tộc kích hoạt", "itemSuggestions": "Gợi ý trang bị", "itemGroups": { "carry": "CHỦ LỰC SÁT THƯƠNG", "frontline": "HÀNG CHỜ PHÒNG THỦ" }, "multiAnalysis": "Phân tích đa chiều", "coreTitle": "Tướng Core", "flexTitle": "Tướng Flex / Dự bị", "mainCore": "CORE CHÍNH", "difficultyEasy": "Dễ", "difficultyMedium": "Trung bình", "difficultyHard": "Khó", "unitCount": "Số tướng", "roadmapTitle": "Lộ trình xây dựng", "roadmapEarly": "Đầu game (1–10)", "roadmapMid": "Giữa game (11–20)", "roadmapLate": "Cuối game (21+)", "countersTitle": "Đối đầu & Khắc chế", "strongAgainst": "Có lợi trước", "weakAgainst": "Bất lợi trước", "counterFix": "Cách xử lý", "tipsTitle": "Tips nâng cao", "radar": { "attack": "Tấn Công", "defense": "Phòng Thủ", "control": "Khống chế", "difficulty": "Độ Khó", "econ": "Kinh Tế", "lateGame": "Late Game", "stats": "Chỉ số" } };
const heroes$2 = { "title": "Tướng (Heroes)", "description": "Danh sách toàn bộ các tướng trong mùa giải hiện tại.", "searchPlaceholder": "Tìm kiếm tướng...", "filterByCost": "Giá", "allCosts": "Tất cả giá", "filterByRace": "Lọc theo tộc", "filterByClass": "Lọc theo hệ", "allRaces": "Tất cả tộc", "allClasses": "Tất cả hệ", "newBadge": "Mới", "filterNew": "Tướng mới", "allHeroes": "Tất cả", "onlyNew": "Chỉ tướng mới", "clearFilters": "Xóa bộ lọc", "empty": "Không tìm thấy tướng phù hợp với bộ lọc hiện tại.", "compareMode": "So sánh", "compareModeOn": "Đang chọn", "compareHint": "Chọn 2–3 tướng để so sánh chỉ số. Bấm So sánh trên thanh dưới cùng." };
const heroDetail$1 = { "notFound": "Không tìm thấy tướng này", "backToList": "Quay lại danh sách tướng", "newBadge": "Tướng mới", "breadcrumb": "Tướng", "goldCost": "{{cost}} Vàng", "skillTitle": "Kỹ năng", "statsTitle": "Chỉ số", "stats": { "hp": "Sinh lực (HP)", "atk": "Sát thương (ATK)", "armor": "Giáp", "mr": "Kháng phép", "atkSpeed": "Tốc đánh", "range": "Tầm đánh", "star": "Chỉ số {{star}} sao" }, "traitsTitle": "Tộc & Hệ", "traitUndefined": "Tộc / Hệ chưa xác định", "tacticalTitle": "Gợi ý chiến thuật", "recommendedItems": "Trang bị khuyên dùng", "noRecommendedItems": "Chưa có gợi ý trang bị cụ thể cho tướng này.", "relatedComps": "Đội hình liên quan", "quickFilter": "Lọc nhanh", "viewSameCost": "Xem tướng {{cost}} vàng", "viewSameClass": "Xem hệ {{class}}", "viewSameRace": "Xem tộc {{race}}", "selectStar": "Chọn sao", "skins": "Trang phục", "lore": "Tiểu sử", "loreExpand": "Xem thêm", "loreCollapse": "Thu gọn", "rarity": "Độ hiếm", "synergiesTitle": "Tộc & Hệ", "relatedByRace": "Cùng tộc", "relatedByClass": "Cùng hệ", "relatedByCost": "Cùng giá {{cost}} vàng", "toggleFavorite": "Lưu tướng yêu thích", "descriptionFallback": "Tra cứu chỉ số và kỹ năng của tướng trên bàn cờ." };
const items$2 = { "title": "Thư viện Trang bị", "description": "Tra cứu trang bị theo bậc, hiệu ứng và gợi ý chiến thuật cho carry.", "searchPlaceholder": "Tìm kiếm trang bị...", "filterByCategory": "Lọc theo loại", "filterByTier": "Lọc theo bậc", "allCategories": "Tất cả loại", "empty": "Không tìm thấy trang bị phù hợp." };
const itemDetail$1 = { "notFound": "Không tìm thấy trang bị", "backToLibrary": "Quay lại thư viện", "breadcrumbLibrary": "Trang bị", "category": { "defense": "Phòng thủ", "magic": "Phép thuật", "attack": "Tấn công", "utility": "Tiện ích" }, "specialEffect": "Hiệu ứng đặc biệt", "statBonusesTitle": "Chỉ số cộng thêm", "tacticalReview": "Đánh giá chiến thuật", "recommendedHeroes": "Tướng khuyên dùng", "relatedComps": "Đội hình phù hợp", "relatedItems": "Trang bị liên quan", "goldCost": "{{cost}} VÀNG", "viewAllHeroes": "XEM TẤT CẢ TƯỚNG", "metaAnalysisTitle": "Phân tích Meta", "metaAnalysisHighTier": "Trang bị tier cao, phù hợp cho carry chủ lực trong meta hiện tại.", "metaAnalysisSituational": "Trang bị situational — cân nhắc theo đội hình và đối thủ." };
const relics$2 = { "title": "Thư viện Dị vật", "description": "Khám phá các hiệu ứng đặc biệt từ dị vật.", "searchPlaceholder": "Tìm tên dị vật...", "filterByType": "Lọc theo loại dị vật", "priority": "Độ ưu tiên: {{tier}}", "empty": "Không tìm thấy dị vật phù hợp." };
const relicDetail$1 = { "notFound": "Không tìm thấy dị vật", "backToLibrary": "Quay lại thư viện dị vật", "priority": "Độ ưu tiên: {{tier}}", "specialEffect": "Hiệu ứng đặc biệt", "tacticalReview": "Đánh giá chiến thuật", "stats": { "appearance": "TỶ LỆ XUẤT HIỆN", "winRate": "WIN RATE (TOP 1)" }, "addToBuilder": "THÊM VÀO BUILDER", "relatedRelics": "Dị vật cùng loại" };
const races$2 = { "title": "Tộc (Races)", "description": "Khám phá các tộc và hiệu ứng kích hoạt mạnh mẽ.", "searchPlaceholder": "Tìm kiếm tộc...", "heroCount": "{{count}} Tướng", "descriptionPending": "Đang cập nhật mô tả cho tộc này...", "milestonesTitle": "Mốc kích hoạt" };
const traits$2 = { "title": "Tộc / Hệ", "description": "Tra cứu synergy tộc và hệ tướng — mốc kích hoạt, thành viên và đội hình gợi ý.", "searchPlaceholder": "Tìm kiếm tộc hoặc hệ...", "heroCount": "{{count}} Tướng", "descriptionPending": "Đang cập nhật mô tả...", "milestonesPreview": "Mốc", "typeRace": "Tộc", "typeClass": "Hệ", "sortLabel": "Sắp xếp", "filterByTab": "Lọc theo loại", "sortName": "Theo tên A–Z", "sortHeroCount": "Theo số tướng", "empty": "Không tìm thấy tộc hoặc hệ phù hợp.", "tabs": { "all": "Tất cả ({{count}})", "race": "Tộc ({{count}})", "class": "Hệ ({{count}})" }, "tabsShort": { "all": "Tất cả", "race": "Tộc", "class": "Hệ" } };
const traitDetail$1 = { "notFound": "Không tìm thấy tộc hoặc hệ này", "breadcrumb": "Tộc / Hệ", "breadcrumbRace": "Tộc", "breadcrumbClass": "Hệ", "badge": "Synergy", "synergiesTitle": "Hiệu ứng Synergy", "milestoneActivate": "Kích hoạt {{count}} quân cờ", "milestoneCountColumn": "Số tướng", "milestoneEffectColumn": "Hiệu ứng", "recommendedBadge": "Khuyên dùng", "membersTitle": "Danh sách tướng", "pieceCount": "{{count}} tướng", "recommendedComps": "Đội hình gợi ý", "recommendedMilestone": "Nên chạy {{count}}", "compTraitCount": "{{count}} tướng thuộc tộc/hệ", "backToList": "Quay lại danh sách Tộc / Hệ", "metaTitle": "Thông tin meta", "tierLabel": "Đánh giá tier", "tierSuffix": "Tier", "pickRate": "Độ phổ biến", "compUsage": "Xuất hiện trong {{count}} đội hình meta", "phaseTitle": "Sức mạnh theo giai đoạn", "phaseEarly": "Early game", "phaseMid": "Mid game", "phaseLate": "Late game", "interactionsTitle": "Tương tác tộc / hệ", "synergyPartners": "Hay đi cùng", "counters": "Khắc chế", "counteredBy": "Bị khắc chế bởi", "heuristicNote": "Dữ liệu meta được suy ra từ roster tướng và đội hình hiện có — mang tính gợi ý.", "noPartners": "Chưa đủ dữ liệu để gợi ý tộc/hệ đi cùng.", "noMatchups": "Chưa xác định", "availabilityCommon": "Dễ kiếm", "availabilityUncommon": "Trung bình", "availabilityRare": "Hiếm", "statTier": "Tier", "statPickRate": "Pick rate", "statHeroCount": "Số tướng", "statMilestone": "Mốc khuyên dùng", "loreTitle": "Mô tả" };
const raceDetail$1 = { "notFound": "Không tìm thấy tộc này", "breadcrumb": "Tộc", "badge": "Tộc Hệ Đặc Biệt", "synergiesTitle": "Hiệu ứng kích hoạt", "milestoneActivate": "Kích hoạt {{count}} quân cờ", "membersTitle": "Thành viên Tộc", "pieceCount": "{{count}} Quân cờ", "recommendedComps": "Đội hình khuyên dùng", "backToList": "Quay lại danh sách tộc" };
const classes$2 = { "title": "Hệ (Classes)", "description": "Tìm hiểu kỹ năng đặc thù của các hệ tướng.", "searchPlaceholder": "Tìm kiếm hệ...", "heroCount": "{{count}} Tướng", "descriptionPending": "Đang cập nhật mô tả cho hệ này...", "milestonesTitle": "Mốc kích hoạt" };
const classDetail$1 = { "notFound": "Không tìm thấy hệ này", "breadcrumb": "Hệ", "badge": "Kỹ Năng Nghề Nghiệp", "synergiesTitle": "Hiệu ứng kích hoạt", "milestoneActivate": "Kích hoạt {{count}} quân cờ", "membersTitle": "Thành viên Hệ", "pieceCount": "{{count}} Quân cờ", "recommendedComps": "Đội hình khuyên dùng", "backToList": "Quay lại danh sách hệ" };
const leaderboard$2 = { "title": "Vinh danh người đóng góp", "description": "Ghi nhận những kỳ thủ chia sẻ đội hình, bài viết và kinh nghiệm meta xuất sắc nhất.", "podiumTitle": "Top 3 vinh danh", "stats": { "contributors": "Người đóng góp", "totalComps": "Tổng đội hình", "totalPosts": "Tổng bài viết" }, "tiers": { "legend": "Huyền thoại", "master": "Cao thủ", "expert": "Chuyên gia", "member": "Thành viên" }, "tabs": { "comps": "Đội hình Meta", "contributors": "Người đóng góp", "heroes": "Tướng nổi bật", "players": "Kị thủ MMR" }, "cols": { "comps": { "rank": "Hạng", "strategy": "Chiến thuật", "tier": "Tier", "likes": "Lượt thích", "winRate": "Dự báo Thắng" }, "contributors": { "rank": "Hạng", "contributor": "Người đóng góp", "comps": "Đội hình", "posts": "Bài viết", "reputation": "Uy tín", "badge": "Huy hiệu" }, "heroes": { "hero": "Tướng", "cost": "Giá", "appearance": "Xuất hiện", "trend": "Xu hướng" }, "players": { "player": "Kị thủ", "server": "Server", "mmr": "MMR", "tier": "Hạng", "winRate": "Tỷ lệ thắng" } }, "authorRole": "Người đóng góp", "metaBadge": "meta", "ctaTitle": "Bạn muốn được vinh danh?", "ctaDesc": "Chia sẻ đội hình hoặc viết bài — mọi đóng góp đều được ghi nhận tự động.", "ctaButton": "XÂY DỰNG NGAY", "ctaComp": "Tạo đội hình", "ctaPost": "Viết bài" };
const profile$2 = { "title": "Hồ sơ cá nhân", "description": "Quản lý nội dung đã lưu, bài viết và cài đặt tài khoản.", "memberSince": "Thành viên từ {{date}}", "summary": { "heroes": "Tướng đã lưu", "comps": "Đội hình đã lưu", "posts": "Bài viết" }, "tabs": { "favorites": "Yêu thích", "activity": "Hoạt động", "settings": "Cài đặt" }, "favHeroes": "Tướng yêu thích ({{count}})", "noFavHeroes": "Bạn chưa lưu tướng yêu thích nào.", "browseHeroes": "Khám phá danh sách tướng", "savedComps": "Đội hình đã lưu ({{count}})", "noSavedComps": "Bạn chưa lưu đội hình yêu thích nào.", "browseComps": "Khám phá đội hình meta", "myPosts": "Bài viết của tôi", "postStatus": { "published": "Đã xuất bản", "pending": "Đang chờ duyệt", "draft": "Bản nháp" }, "activity": { "quickLinks": "Lối tắt", "noPosts": "Bạn chưa đăng bài viết nào.", "createPost": "Viết bài mới", "views": "{{count}} lượt xem", "linkComps": "Tra cứu đội hình", "linkTeamBuilder": "Công cụ xây đội hình", "linkCommunity": "Cộng đồng", "linkLeaderboard": "Bảng xếp hạng đóng góp" }, "settings": { "title": "Cài đặt tài khoản", "displayName": "Tên hiển thị", "avatarUrl": "URL ảnh đại diện", "email": "Email", "emailReadonly": "Email không thể thay đổi trong phiên bản hiện tại.", "save": "Lưu thay đổi", "saved": "Đã lưu thay đổi.", "uploadAvatar": "Tải ảnh đại diện", "uploadingAvatar": "Đang tải...", "invalidAvatarUrl": "Ảnh đại diện phải là URL HTTPS hoặc tải qua Cloudinary — không dùng base64." } };
const viPages = {
  comps: comps$2,
  compDetail: compDetail$1,
  heroes: heroes$2,
  heroDetail: heroDetail$1,
  items: items$2,
  itemDetail: itemDetail$1,
  relics: relics$2,
  relicDetail: relicDetail$1,
  races: races$2,
  traits: traits$2,
  traitDetail: traitDetail$1,
  raceDetail: raceDetail$1,
  classes: classes$2,
  classDetail: classDetail$1,
  leaderboard: leaderboard$2,
  profile: profile$2
};
const pageTitle$1 = "Kho Công Cụ";
const list$1 = { "teamBuilder": { "name": "Tạo đội hình", "desc": "Kéo thả tướng vào bàn cờ, tự tính tộc hệ, tổng vàng." }, "compFinder": { "name": "Tìm đội hình phù hợp", "desc": "Dựa trên tướng đang có để gợi ý đội hình." }, "banAdvisor": { "name": "Ban tộc hệ", "desc": "Gợi ý cấm tộc hệ để tăng tỷ lệ thắng cao nhất." }, "heroCompare": { "name": "So sánh tướng", "desc": "So sánh chỉ số máu, giáp, sát thương giữa 2 tướng." }, "compCompare": { "name": "So sánh đội hình", "desc": "So sánh sức mạnh, độ khó, chi phí giữa 2 đội hình." } };
const hubDesc$2 = { "teamBuilder": "Kéo thả tướng, tự tính tộc hệ và tổng vàng", "compFinder": "Gợi ý đội hình theo tướng đang có", "banAdvisor": "Gợi ý cấm tộc/hệ tối ưu", "heroCompare": "So sánh chỉ số giữa 2 tướng", "compCompare": "So sánh sức mạnh 2 đội hình" };
const teamBuilder$1 = { "exportSuccess": "Xuất ảnh thành công", "exportSuccessDesc": "Đội hình của bạn đã được đóng gói thành tệp PNG chất lượng cao.", "processing": "Đang xử lý...", "exportPng": "Xuất ảnh (PNG)", "saveComp": "Lưu đội hình", "shareMeta": "Chia sẻ Meta", "refreshBoard": "Làm mới bàn cờ", "playerLevel": "Cấp độ người chơi", "units": "Quân cờ", "totalGold": "Tổng giá trị", "emptyBoard": "Chưa có tướng trên sân", "emptyBoardHint": "Bắt đầu bằng cách chọn tướng từ thư viện bên phải.", "activeSynergies": "Hệ tộc đang kích hoạt", "heroLibrary": "Thư viện quân cờ", "searchPlaceholder": "Tìm tên hoặc hệ tộc...", "filterGold": "Lọc theo vàng", "filterRaceClass": "Lọc theo Tộc/Hệ", "allTraits": "TẤT CẢ HỆ TỘC", "filterRace": "Tộc", "filterClass": "Hệ", "noHeroes": "Không có tướng phù hợp", "great": "Tuyệt vời", "maxUnitsReached": "Đã đủ 16 tướng trên bàn cờ", "saved": "Đã lưu đội hình", "shareCopied": "Đã copy link chia sẻ", "shareCopyFailed": "Không thể copy link", "exportFailed": "Xuất ảnh thất bại", "loadedShared": "Đã tải đội hình từ link chia sẻ", "autoArrange": "Tự xếp đội hình", "autoArrangeDone": "Đã tự xếp theo tuyến trước/sau", "clearConfirm": "Xóa toàn bộ tướng trên bàn cờ?", "clearFilters": "Xóa lọc", "dragHint": "Kéo thả tướng lên bàn cờ · bấm ô để đổi sao · thả vào thùng rác để gỡ", "dropToRemove": "Kéo vào đây để gỡ tướng", "allCosts": "Tất cả giá", "allRaces": "Tất cả tộc", "allClasses": "Tất cả hệ", "searchRacePlaceholder": "Tìm tộc...", "searchClassPlaceholder": "Tìm hệ...", "noTraitMatch": "Không có tộc/hệ khớp", "filterByCost": "Lọc theo giá", "playerLevelHint": "Bằng số tướng trên bàn (tối đa 16)" };
const compFinder$1 = { "ownedHeroes": "Tướng sở hữu", "ownedHeroesHint": "Bấm để chọn tướng đang có trên bàn cờ.", "noSelection": "Chưa chọn tướng nào", "searchHeroes": "Tìm kiếm tướng...", "suggestedComps": "Đội hình Đề xuất", "suggestedCompsHint": "Top các đội phù hợp nhất với quân bài bạn nắm giữ.", "emptyAnalysisHint": "Vui lòng chọn tướng sở hữu để xem phân tích khả năng chuyển đổi sang các đội hình Meta.", "matchLabel": "Khớp", "matchPercent": "{{percent}}% khớp", "exploreDetail": "Khám phá chi tiết Đội hình", "clearSelection": "Xóa hết", "allCosts": "Tất cả giá", "allRaces": "Tất cả tộc", "allClasses": "Tất cả hệ", "filterRace": "Tộc", "filterClass": "Hệ", "filterByCost": "Lọc theo giá", "searchRacePlaceholder": "Tìm tộc...", "searchClassPlaceholder": "Tìm hệ...", "noTraitMatch": "Không có tộc/hệ khớp" };
const banAdvisor$1 = { "stepRaceClass": "Chọn Tộc & Hệ", "stepHeroes": "Chọn tướng", "stepCore": "Xác định Core", "stepPriority": "Cấp độ ưu tiên", "mainCore": "Core Chính", "subCore": "Core Phụ", "prioritySurvive": "Ưu tiên sống sót", "priorityContest": "Ưu tiên tranh bài", "priorityTop1": "Ưu tiên Top 1", "suggestedBan": "Chiến thuật BAN đề xuất", "winRateAnalysis": "Phân tích Win-rate", "contestAnalysis": "Phân tích Tranh bài", "back": "Quay lại", "startAnalysis": "Bắt đầu phân tích", "newAnalysis": "Tạo phân tích mới", "next": "Tiếp theo", "progress": { "comp": "Đội hình", "heroes": "Tướng", "core": "Core", "priority": "Ưu tiên", "results": "Kết quả" }, "raceCollection": "Tuyển tập Tộc (Race)", "classCollection": "Tuyển tập Hệ (Class)", "filterHint": "Hệ thống sẽ lọc ra các tướng phù hợp dựa trên lựa chọn của bạn.", "heroesFilteredHint": "Danh sách tướng đã được lọc theo Tộc/Hệ:", "coreHint": "Core chính là quân cờ then chốt cần được bảo vệ và Ban đối thủ khắc chế.", "priorityHint": "Hệ thống sẽ điều chỉnh thuật toán dựa trên mục tiêu cốt lõi của bạn.", "priorityDesc": { "survival": "Tập trung giảm sức mạnh các đội hình khắc chế trực tiếp core.", "contest": "Loại bỏ các đội hình đang tranh chấp core cùng với bạn.", "top1": "Nhắm vào các đội hình Meta mạnh nhất để tối ưu vị trí." }, "optimalLineup": "Đội hình tối ưu", "priorityGoal": "Mục tiêu ưu tiên", "metaForecast": "Dự báo meta", "recommendedLevel": "Mức độ đề xuất", "banTrait": "BAN TỘC / HỆ", "poolManipulation": "THAO TÚNG POOL ({{count}} quân)", "basedOnMeta": "Dựa trên cơ sở dữ liệu Meta mới nhất", "prioritySurviveShort": "SỐNG SÓT", "priorityContestShort": "TRANH BÀI", "priorityTop1Short": "TOP 1", "goldCost": "{{count}} tướng", "contestPlayers": "Bị tranh bởi {{count}} người chơi khác", "contestPoolHint": "Pool tướng <1>{{hero}}</1> đang ở mức cảnh báo. Cần BAN <1>{{trait}}</1> để loại bỏ {{poolCount}} quân khác khỏi pool.", "contestReduction": "Giảm cạnh tranh", "banDifficulty": "Độ khó Ban", "metaForecastWin": "+{{delta}}% WIN", "simulatorTitle": "Mô phỏng Meta sau Ban", "simulatorSubtitle": "Phân tích chuyên sâu thay đổi meta", "simulatorDesc": "Mô phỏng sự thay đổi của Meta sau khi thực hiện các lượt cấm. Hệ thống tính lại tỷ lệ xuất hiện tộc/hệ còn lại trong pool đội hình.", "scenarioBan": "Kịch bản: BAN {{trait}}", "metaShare": "{{percent}}% Meta", "updatingScenarios": "Đang cập nhật thêm kịch bản...", "reban": "Ban lại", "configTitle": "Cấu hình", "selectTraitsPlaceholder": "Chọn tộc / hệ...", "selectRacePlaceholder": "Chọn tộc...", "selectClassPlaceholder": "Chọn hệ...", "racesSelected": "{{count}} tộc đã chọn", "classesSelected": "{{count}} hệ đã chọn", "traitsSelected": "{{count}} tộc/hệ đã chọn", "coreDoubleClickHint": "Nhấp đúp tướng để đặt làm core chính", "setMainCore": "Đặt {{name}} làm core chính", "readyHint": "{{heroes}} tướng · Core: {{core}}", "emptyResultsHint": "Chọn tộc/hệ và core chính để xem gợi ý ban.", "searchHeroPlaceholder": "Tìm tên tướng...", "searchRacePlaceholder": "Tìm tộc...", "searchClassPlaceholder": "Tìm hệ...", "noTraitMatch": "Không tìm thấy tộc/hệ", "noHeroMatch": "Không tìm thấy tướng phù hợp", "banCostShort": "{{count}} tướng", "filterCost": "Lọc cost" };
const heroCompare$1 = { "pickHeroes": "Chọn tướng so sánh", "searchPlaceholder": "Nhập tên tướng...", "statsTitle": "Chỉ số sức mạnh", "statsSubtitle": "Dữ liệu ước lượng theo phiên bản hiện tại", "hp": "Sinh lực", "armor": "Giáp vật lý", "mr": "Kháng phép", "dps": "Sát thương/Giây", "attackSpeed": "Tốc độ đánh", "range": "Tầm đánh", "slotLabel": "Tướng {{index}}", "addHero": "Thêm tướng", "changeHero": "Đổi tướng", "removeHero": "Bỏ tướng", "needTwo": "Chọn ít nhất 2 tướng để xem bảng so sánh.", "insightsTitle": "Nhận xét nhanh", "insightHighest": "{{name}} có {{stat}} cao nhất trong nhóm.", "insightCheapest": "{{name}} rẻ nhất (${{cost}})." };
const compCompare$1 = { "pickComps": "Chọn đội hình so sánh", "searchPlaceholder": "Tìm tên đội hình...", "tacticalDesc": "Mô tả chiến thuật", "artisan": "Tác giả", "statAnalysis": "Phân tích chỉ số", "radarTitle": "Biểu đồ radar", "winrate": "Winrate", "top4": "Top 4", "difficulty": "Độ khó", "lateGame": "Late Game", "tier": "Tier", "unitCount": "Số tướng", "avgCost": "Giá TB", "slotLabel": "Đội hình {{index}}", "addComp": "Thêm đội hình", "changeComp": "Đổi đội hình", "removeComp": "Bỏ đội hình", "needTwo": "Chọn ít nhất 2 đội hình để xem bảng so sánh.", "contestedTitle": "Tướng bị tranh", "contestedEmpty": "Không có tướng trùng giữa các đội hình.", "verdictTitle": "Kết luận", "verdictWinRate": "{{name}} có winrate cao nhất ({{value}}).", "verdictEasiest": "{{name}} dễ chơi nhất trong nhóm.", "verdictLateGame": "{{name}} mạnh nhất về late game.", "insightsTitle": "Nhận xét nhanh", "insightWinRate": "{{name}} có winrate cao nhất ({{value}}).", "insightEasiest": "{{name}} dễ chơi nhất trong nhóm.", "insightLateGame": "{{name}} mạnh nhất về late game." };
const compare$1 = { "compareButton": "So sánh ({{count}}/{{max}})", "clearAll": "Xóa hết", "trayHint": "{{count}}/{{max}} đã chọn", "maxReached": "Tối đa 3 mục để so sánh" };
const viTools = {
  pageTitle: pageTitle$1,
  list: list$1,
  hubDesc: hubDesc$2,
  teamBuilder: teamBuilder$1,
  compFinder: compFinder$1,
  banAdvisor: banAdvisor$1,
  heroCompare: heroCompare$1,
  compCompare: compCompare$1,
  compare: compare$1
};
const title$3 = "Cộng Đồng";
const description$3 = "Hỏi đáp, chia sẻ giáo án và thảo luận meta cùng kỳ thủ.";
const createPost$1 = "Đăng bài viết";
const searchPlaceholder$4 = "Tìm kiếm bài viết, hashtag...";
const sort$1 = { "latest": "Mới nhất", "hot": "Đang hot", "engagement": "Nhiều tương tác" };
const commentCount$1 = "{{count}} bình luận";
const notFound$1 = "Không tìm thấy bài viết";
const backToList$4 = "Quay lại cộng đồng";
const loadingDetail$1 = "Nội dung chi tiết bài viết đang được tải...";
const commentsTitle$1 = "Bình luận";
const commentPlaceholder$1 = "Viết suy nghĩ của bạn...";
const submitComment$1 = "Gửi bình luận";
const like$1 = "Thích";
const reply$1 = "Trả lời";
const aboutAuthor$1 = "Về tác giả";
const veteranMember$1 = "Thành viên kỳ cựu";
const authorStats$1 = { "reputation": "Điểm uy tín", "posts": "Bài viết" };
const follow$1 = "Theo dõi";
const trendingTopics$1 = "Chủ đề hấp dẫn";
const engagementSummary$1 = "{{likes}} lượt thích • {{comments}} bình luận";
const noComments$1 = "Chưa có bình luận được duyệt.";
const relatedPosts$3 = "Bài viết liên quan";
const replyPlaceholder$1 = "Viết câu trả lời...";
const pendingApproval$1 = "Đang chờ duyệt";
const submitReply$1 = "Gửi trả lời";
const commentSubmitted$1 = "Bình luận đã gửi và đang chờ duyệt.";
const cancelReply$1 = "Huỷ";
const communityStats$1 = "Thống kê cộng đồng";
const totalPosts$1 = "Bài viết";
const totalComments$1 = "Bình luận";
const emptyFiltered$3 = "Không có bài viết phù hợp.";
const composer$1 = { "title": "Đăng bài thảo luận", "subtitle": "Chia sẻ kinh nghiệm, hỏi đáp meta và đính kèm ảnh minh họa.", "titleLabel": "Tiêu đề", "titlePlaceholder": "Nhập tiêu đề bài viết...", "contentLabel": "Nội dung", "contentPlaceholder": "Viết nội dung chi tiết tại đây...", "tagsLabel": "Chủ đề / thẻ", "addTag": "Thêm thẻ (Enter để thêm)", "addTagButton": "Thêm", "removeTag": "Xóa thẻ", "imagesLabel": "Ảnh đính kèm", "uploadImage": "Tải ảnh", "pasteUrl": "Dán URL ảnh...", "addUrl": "Thêm URL", "caption": "Chú thích ảnh", "captionPlaceholder": "Mô tả ngắn cho ảnh này...", "uploading": "Đang tải lên...", "uploadError": "Không thể tải ảnh. Kiểm tra cấu hình Cloudinary hoặc thử dán URL.", "invalidImageUrl": "URL ảnh không hợp lệ. Dùng HTTPS, đường dẫn tĩnh hoặc tải file qua Cloudinary — không dùng base64.", "removeImage": "Xóa ảnh", "moveUp": "Di chuyển lên", "moveDown": "Di chuyển xuống", "publish": "Đăng bài", "preview": "Xem trước", "edit": "Chỉnh sửa", "needTitleContent": "Vui lòng nhập tiêu đề và nội dung trước khi đăng.", "justNow": "Vừa xong" };
const viCommunity = {
  title: title$3,
  description: description$3,
  createPost: createPost$1,
  searchPlaceholder: searchPlaceholder$4,
  sort: sort$1,
  commentCount: commentCount$1,
  notFound: notFound$1,
  backToList: backToList$4,
  loadingDetail: loadingDetail$1,
  commentsTitle: commentsTitle$1,
  commentPlaceholder: commentPlaceholder$1,
  submitComment: submitComment$1,
  like: like$1,
  reply: reply$1,
  aboutAuthor: aboutAuthor$1,
  veteranMember: veteranMember$1,
  authorStats: authorStats$1,
  follow: follow$1,
  trendingTopics: trendingTopics$1,
  engagementSummary: engagementSummary$1,
  noComments: noComments$1,
  relatedPosts: relatedPosts$3,
  replyPlaceholder: replyPlaceholder$1,
  pendingApproval: pendingApproval$1,
  submitReply: submitReply$1,
  commentSubmitted: commentSubmitted$1,
  cancelReply: cancelReply$1,
  communityStats: communityStats$1,
  totalPosts: totalPosts$1,
  totalComments: totalComments$1,
  emptyFiltered: emptyFiltered$3,
  composer: composer$1
};
const listTitle$1 = "Tin tức & Cẩm nang";
const listDescription$1 = "Cập nhật tin tức meta, hướng dẫn leo rank và patch notes.";
const searchPlaceholder$3 = "Tìm kiếm bài viết...";
const emptyFiltered$2 = "Không có bài viết phù hợp với bộ lọc.";
const writtenBy$1 = "Viết bởi";
const notFoundTitle$1 = "Không tìm thấy bài viết";
const notFoundDesc$1 = "Bài viết có thể đã bị gỡ hoặc liên kết không còn hợp lệ.";
const backToList$3 = "Quay lại tin tức";
const unpublishedTitle$1 = "Bài viết chưa được xuất bản";
const unpublishedDesc$1 = "Nội dung này chỉ hiển thị khi được phê duyệt.";
const readingMinutes$1 = "{{n}} phút đọc";
const contentPending$1 = "Nội dung bài viết đang được cập nhật.";
const shareTitle$1 = "Chia sẻ bài viết";
const shareFacebook$1 = "Chia sẻ Facebook";
const shareTwitter$1 = "Chia sẻ Twitter";
const copyLinkAria$1 = "Sao chép liên kết";
const copied$1 = "Đã sao chép!";
const relatedSameCategory$1 = "Cùng chuyên mục";
const recentPosts$1 = "Bài viết mới";
const metaToolsTitle$1 = "Công cụ meta";
const metaToolsDesc$1 = "Áp dụng chiến thuật từ bài viết vào trận đấu của bạn.";
const metaToolsCta$1 = "Tìm đội hình phù hợp";
const featured$1 = "Bài nổi bật";
const relatedPosts$2 = "Bài viết liên quan";
const filterByCategory$1 = "Chuyên mục";
const allCategories$1 = "Tất cả chuyên mục";
const latestArticles$1 = "Bài viết mới nhất";
const popularArticles$1 = "Đọc nhiều";
const categoriesTitle$1 = "Chuyên mục";
const sidebarDiscussionDesc$1 = "Thảo luận meta, hỏi đáp và chia sẻ kinh nghiệm với cộng đồng.";
const sidebarDiscussionCta$1 = "Vào thảo luận";
const noMoreArticles$1 = "Đã hiển thị các bài mới nhất.";
const filterByAuthor$1 = "Tác giả";
const filterByTime$1 = "Thời gian";
const time7d$1 = "7 ngày";
const time30d$1 = "30 ngày";
const time90d$1 = "3 tháng";
const viNews = {
  listTitle: listTitle$1,
  listDescription: listDescription$1,
  searchPlaceholder: searchPlaceholder$3,
  emptyFiltered: emptyFiltered$2,
  writtenBy: writtenBy$1,
  notFoundTitle: notFoundTitle$1,
  notFoundDesc: notFoundDesc$1,
  backToList: backToList$3,
  unpublishedTitle: unpublishedTitle$1,
  unpublishedDesc: unpublishedDesc$1,
  readingMinutes: readingMinutes$1,
  contentPending: contentPending$1,
  shareTitle: shareTitle$1,
  shareFacebook: shareFacebook$1,
  shareTwitter: shareTwitter$1,
  copyLinkAria: copyLinkAria$1,
  copied: copied$1,
  relatedSameCategory: relatedSameCategory$1,
  recentPosts: recentPosts$1,
  metaToolsTitle: metaToolsTitle$1,
  metaToolsDesc: metaToolsDesc$1,
  metaToolsCta: metaToolsCta$1,
  featured: featured$1,
  relatedPosts: relatedPosts$2,
  filterByCategory: filterByCategory$1,
  allCategories: allCategories$1,
  latestArticles: latestArticles$1,
  popularArticles: popularArticles$1,
  categoriesTitle: categoriesTitle$1,
  sidebarDiscussionDesc: sidebarDiscussionDesc$1,
  sidebarDiscussionCta: sidebarDiscussionCta$1,
  noMoreArticles: noMoreArticles$1,
  filterByAuthor: filterByAuthor$1,
  filterByTime: filterByTime$1,
  time7d: time7d$1,
  time30d: time30d$1,
  time90d: time90d$1
};
const title$2 = "Cộng đồng Auto Chess Mobile VN";
const description$2 = "Gặp gỡ đội ngũ sáng lập, khám phá các kênh cộng đồng và tham gia xây dựng meta cùng kỳ thủ Việt.";
const visitChannel$1 = "Truy cập kênh";
const stats$2 = { "teamMembers": "Thành viên đội ngũ", "channels": "Kênh cộng đồng", "comps": "Đội hình", "posts": "Bài viết" };
const team$1 = { "title": "Đội ngũ sáng lập", "description": "Những người xây dựng và duy trì nền tảng meta cho cộng đồng Auto Chess Mobile VN.", "viewProfile": "Xem hồ sơ" };
const channels$1 = { "title": "Kênh & nền tảng cộng đồng", "description": "Theo dõi các kênh chính thức và đối tác — mỗi kênh có giá trị riêng cho từng nhu cầu học tập." };
const cta$1 = { "title": "Tham gia & đóng góp", "description": "Chia sẻ giáo án, đội hình và kinh nghiệm của bạn. Mọi đóng góp đều được ghi nhận trên bảng Vinh danh.", "writePost": "Viết bài tin tức", "joinDiscussion": "Vào thảo luận", "shareComp": "Chia sẻ đội hình" };
const rules$1 = { "title": "Nội quy cộng đồng", "items": ["Tôn trọng mọi thành viên — không toxic, không công kích cá nhân.", "Nội dung phải liên quan Auto Chess Mobile VN hoặc chiến thuật meta.", "Không spam, quảng cáo trái phép hoặc link lừa đảo.", "Ghi rõ nguồn khi chia sẻ giáo án hoặc bài viết từ người khác.", "Bình luận vi phạm sẽ bị ẩn và có thể dẫn đến khóa tài khoản."] };
const faq$1 = { "title": "Câu hỏi thường gặp", "items": [{ "q": "Làm sao để được vinh danh trên bảng Vinh danh?", "a": "Đăng đội hình qua công cụ Tạo đội hình hoặc viết bài tin tức/meta. Hệ thống tự động tính điểm uy tín từ lượt thích và số lượng đóng góp." }, { "q": "Tôi có thể đề xuất kênh YouTube/TikTok mới không?", "a": "Có — liên hệ đội ngũ qua group Facebook hoặc Discord. Kênh được duyệt sẽ xuất hiện trên trang này." }, { "q": "Thảo luận và Tin tức khác nhau thế nào?", "a": "Tin tức là bài viết biên tập (meta, patch, hướng dẫn). Thảo luận là diễn đàn hỏi đáp và chia sẻ nhanh giữa cộng đồng." }, { "q": "Làm sao trở thành cộng tác viên?", "a": "Đóng góp đều đặn nội dung chất lượng, được cộng đồng công nhận. Đội ngũ sẽ liên hệ khi có vị trí phù hợp." }] };
const viCommunityHub = {
  title: title$2,
  description: description$2,
  visitChannel: visitChannel$1,
  stats: stats$2,
  team: team$1,
  channels: channels$1,
  cta: cta$1,
  rules: rules$1,
  faq: faq$1
};
const searchPlaceholder$2 = "Search...";
const searchAria = "Search";
const searchPlaceholderExtended = "Heroes, comps, tools...";
const quickLookupPlaceholder = "Quick lookup...";
const quickLookupTitle = "Quick lookup";
const noResults = "No matching results";
const cancel = "Cancel";
const closeAria = "Close";
const share = "Share";
const details = "Details";
const edit = "Edit";
const removeFavorite = "Remove favorite";
const viewDetails = "View details";
const viewAll = "View all";
const back = "Back";
const backToList$2 = "Back to list";
const byAuthor = "By";
const today = "Today";
const tierBadge = "Tier {{tier}}";
const top1 = "Top 1";
const top4 = "Top 4";
const all = "All";
const clearFilters = "Clear filters";
const removeItem = "Remove {{name}}";
const resultsCount = "Showing {{shown}} / {{total}}";
const gotIt = "Got it";
const strategyTipsTitle = "Pro strategy tips";
const swapTip = "new tip";
const infoSupportTitle = "Info & player support";
const infoSupportShort = "Info & support";
const infoTabGeneral = "General info";
const infoTabRollRates = "Roll rates";
const infoIntro = "<1>Auto Chess Mobile VN Handbook</1> is a non-profit tactical data platform and encyclopedia built for Vietnamese players.";
const opsStatusTitle = "Operational status";
const webVersionLabel = "Web version:";
const webVersionValue = "v1.4.2 [Official]";
const dataServerLabel = "Data server:";
const statusActive = "Online";
const dataPartnerLabel = "Data partner:";
const dataPartnerValue = "Drodo Studio";
const releaseCountryLabel = "Release region:";
const countryVN = "Vietnam (VN)";
const communityLinksTitle = "Community links";
const linkOfficialSite = "Auto Chess VNG official site";
const linkCommunityFB = "Vietnamese Players Community";
const rollRatesDesc = "Percentage chance of each hero cost tier ($1–$5) based on your current player level:";
const levelShort = "Lvl";
const strategyTips = ["Save up to 50 gold quickly to earn the maximum +5 interest gold each round.", "Maintain win or loss streaks to earn bonus interest gold.", "Place tanky frontliners with AoE crowd control to start fights early.", "Reach level 8 or 9 before opponents if your comp revolves around 5-cost units.", "Pick physical damage relics for Assassin carries to maximize crit damage.", "Facing a strong Mage comp? Build Magic Resist Cloak early to counter.", "Water synergy greatly boosts team-wide skill energy regeneration.", "Always scout opponents to avoid contested carries and pivot smartly."];
const strategyTipsSidebar = ["Save 50 gold for max +5 interest per round.", "Scout opponents to avoid contested carries.", "Hit level 8–9 early for 5-cost comps."];
const enCommon = {
  searchPlaceholder: searchPlaceholder$2,
  searchAria,
  searchPlaceholderExtended,
  quickLookupPlaceholder,
  quickLookupTitle,
  noResults,
  cancel,
  closeAria,
  share,
  details,
  edit,
  removeFavorite,
  viewDetails,
  viewAll,
  back,
  backToList: backToList$2,
  byAuthor,
  today,
  tierBadge,
  top1,
  top4,
  all,
  clearFilters,
  removeItem,
  resultsCount,
  gotIt,
  strategyTipsTitle,
  swapTip,
  infoSupportTitle,
  infoSupportShort,
  infoTabGeneral,
  infoTabRollRates,
  infoIntro,
  opsStatusTitle,
  webVersionLabel,
  webVersionValue,
  dataServerLabel,
  statusActive,
  dataPartnerLabel,
  dataPartnerValue,
  releaseCountryLabel,
  countryVN,
  communityLinksTitle,
  linkOfficialSite,
  linkCommunityFB,
  rollRatesDesc,
  levelShort,
  strategyTips,
  strategyTipsSidebar
};
const home = "Home";
const comps$1 = "Comps";
const library = "Library";
const traits$1 = "Races / Classes";
const races$1 = "Races";
const classes$1 = "Classes";
const heroes$1 = "Heroes";
const items$1 = "Items";
const relics$1 = "Relics";
const tools$1 = "Tools";
const toolsTeamBuilder = "Team Builder";
const toolsCompFinder = "Comp Finder";
const toolsBanAdvisor = "Ban Traits";
const toolsHeroCompare = "Hero Compare";
const toolsCompCompare = "Comp Compare";
const leaderboard$1 = "Hall of Fame";
const news = "News";
const blog = "Blog";
const discussion = "Discussion";
const community = "Community";
const menu = "Menu";
const profile$1 = "Profile";
const admin = "Admin Panel";
const adminShort = "Admin";
const adminOverview = "Overview";
const adminUsers = "Users";
const adminPosts = "Posts";
const adminComments = "Comments";
const adminSettings = "Settings";
const backToHome = "Back to home";
const sidebarSectionLookup = "Browse";
const sidebarSectionTools = "Tools";
const sidebarSectionNewsCommunity = "News & community";
const wikiHandbook = "Auto Chess Handbook";
const wikiHandbookDesc = "Quick access to the strategy encyclopedia";
const wikiHeroes = "Hero Guide";
const wikiHeroesDesc = "Stats, skills, and item builds";
const wikiItems = "Item Database";
const wikiItemsDesc = "Combine recipes & activation effects";
const wikiTraits = "Race & Class System";
const wikiTraitsDesc = "Race and class synergies with activation thresholds";
const wikiRaces = "Race System";
const wikiRacesDesc = "Race synergy bonus effects";
const wikiClasses = "Class System";
const wikiClassesDesc = "Class trait coordination mechanics";
const wikiRelics = "Relic Vault";
const wikiRelicsDesc = "Ancient relic stat boosts";
const wikiGuide = "Wiki Guide";
const libraryLink = "Library →";
const pickTool = "Choose a tool";
const pickLibraryItem = "Choose a library item";
const pickBlogItem = "Pick a blog section";
const openMenuAria = "Open menu";
const hubDesc$1 = { "traits": "Look up race and class synergies in one place", "races": "Activation effects based on race unit count", "classes": "Class skills and synergy mechanics", "heroes": "Stats, skills, and hero meta", "items": "Combine recipes and item effects", "relics": "Special effects from relics", "news": "Meta news, patches, and season updates", "discussion": "Discuss strategy with the community" };
const enNav = {
  home,
  comps: comps$1,
  library,
  traits: traits$1,
  races: races$1,
  classes: classes$1,
  heroes: heroes$1,
  items: items$1,
  relics: relics$1,
  tools: tools$1,
  toolsTeamBuilder,
  toolsCompFinder,
  toolsBanAdvisor,
  toolsHeroCompare,
  toolsCompCompare,
  leaderboard: leaderboard$1,
  news,
  blog,
  discussion,
  community,
  menu,
  profile: profile$1,
  admin,
  adminShort,
  adminOverview,
  adminUsers,
  adminPosts,
  adminComments,
  adminSettings,
  backToHome,
  sidebarSectionLookup,
  sidebarSectionTools,
  sidebarSectionNewsCommunity,
  wikiHandbook,
  wikiHandbookDesc,
  wikiHeroes,
  wikiHeroesDesc,
  wikiItems,
  wikiItemsDesc,
  wikiTraits,
  wikiTraitsDesc,
  wikiRaces,
  wikiRacesDesc,
  wikiClasses,
  wikiClassesDesc,
  wikiRelics,
  wikiRelicsDesc,
  wikiGuide,
  libraryLink,
  pickTool,
  pickLibraryItem,
  pickBlogItem,
  openMenuAria,
  hubDesc: hubDesc$1
};
const member = "Member";
const login = "Log in";
const register = "Sign up";
const logout = "Log out";
const loginTitle = "Log in to your account";
const registerTitle = "Create a new account";
const displayNameLabel = "Display name";
const displayNamePlaceholder = "Enter your name";
const emailLabel = "Email";
const passwordLabel = "Password";
const createAccount = "Create account";
const noAccount = "Don't have an account?";
const hasAccount = "Already have an account?";
const registerNow = "Sign up now";
const logoutConfirmTitle = "Confirm log out";
const logoutConfirmDesc = "Are you sure you want to log out of your Auto Chess Mobile VN account?";
const enAuth = {
  member,
  login,
  register,
  logout,
  loginTitle,
  registerTitle,
  displayNameLabel,
  displayNamePlaceholder,
  emailLabel,
  passwordLabel,
  createAccount,
  noAccount,
  hasAccount,
  registerNow,
  logoutConfirmTitle,
  logoutConfirmDesc
};
const taglineMobile = "Auto Chess Mobile VN strategy handbook for Vietnamese players.";
const taglineDesktop = "Auto Chess Mobile VN strategy handbook — meta data, comps, and tools for Vietnamese players.";
const sectionLibrary = "Library";
const sectionTools = "Tools";
const sectionExplore = "Explore";
const nonProfit = "Non-profit";
const webVersion = "v1.4.2";
const disclaimer = "Non-profit project, not affiliated with VNG";
const dataPartner = "Drodo Studio is the data partner.";
const copyright = "© {{year}} Auto Chess Mobile VN";
const copyrightMobile = "© {{year}} Auto Chess Mobile VN · v1.4.2 · Non-profit";
const ariaFacebook = "Community Facebook";
const ariaOfficialSite = "Auto Chess VNG official site";
const ariaGithub = "GitHub";
const enFooter = {
  taglineMobile,
  taglineDesktop,
  sectionLibrary,
  sectionTools,
  sectionExplore,
  nonProfit,
  webVersion,
  disclaimer,
  dataPartner,
  copyright,
  copyrightMobile,
  ariaFacebook,
  ariaOfficialSite,
  ariaGithub
};
const metaBadge = "Meta S20";
const patchNote = "Patch 20.5 — Warrior & Hunter adjustments";
const viewPatchNotes = "View patch notes →";
const noBanners = "No new announcements at the moment.";
const slideAria = "Go to slide {{n}}";
const stats$1 = { "comps": "COMPS", "compsSub": "Created by the community", "votes": "VOTES", "votesSub": "Total votes cast", "users": "USERS", "usersSub": "Active members", "posts": "POSTS", "postsSub": "Articles & guides" };
const trendingCompsTitle = "Trending comps";
const trendingCompsSubtitle = "Community voted";
const featuredHeroesTitle = "Featured heroes";
const featuredDiscussionsTitle = "Featured discussions";
const buildCompTitle = "Build a comp";
const buildCompDesc = "Build meta comps from heroes, races, and classes — save and share with the community.";
const buildCompCta = "Start building";
const findCompTitle = "Find a comp that fits";
const findCompDesc = "Pick the units on your board — we'll suggest the best meta comps with match rates.";
const findCompCta = "Start searching";
const latestPostsTitle = "Latest articles";
const leaderboardTitle = "Leaderboard";
const leaderboardTabs = { "global": "Global", "vn": "Vietnam", "friends": "Friends" };
const leaderboardCols = { "player": "Player", "score": "Score" };
const usefulToolsTitle = "Useful tools";
const tools = { "teamBuilder": { "title": "Team Builder", "desc": "Build meta comps" }, "heroList": { "title": "Hero list", "desc": "160+ hero profiles" }, "itemList": { "title": "Item list", "desc": "Stats and combine recipes" }, "compFinder": { "title": "Comp finder", "desc": "Suggestions from your board" } };
const tierSuffix = "Tier";
const partnersTitle = "Partners & Sponsors";
const partnersSubtitle = "Supporting the Auto Chess Mobile VN community";
const donateTitle = "Support the project";
const donateSubtitle = "Help us maintain and grow this free meta guide";
const donateBankLabel = "Bank";
const donateAccountLabel = "Account number";
const donateHolderLabel = "Account holder";
const donateCopy = "Copy account no.";
const donateCopied = "Copied!";
const donateScanHint = "Scan the QR code with your banking app for a quick transfer";
const donateQrExpand = "Enlarge QR code to scan";
const donateQrPopupTitle = "Scan to transfer";
const donateTransparency = "All contributions go toward server costs and content development.";
const donateJoinCommunity = "Join the community";
const enHome = {
  metaBadge,
  patchNote,
  viewPatchNotes,
  noBanners,
  slideAria,
  stats: stats$1,
  trendingCompsTitle,
  trendingCompsSubtitle,
  featuredHeroesTitle,
  featuredDiscussionsTitle,
  buildCompTitle,
  buildCompDesc,
  buildCompCta,
  findCompTitle,
  findCompDesc,
  findCompCta,
  latestPostsTitle,
  leaderboardTitle,
  leaderboardTabs,
  leaderboardCols,
  usefulToolsTitle,
  tools,
  tierSuffix,
  partnersTitle,
  partnersSubtitle,
  donateTitle,
  donateSubtitle,
  donateBankLabel,
  donateAccountLabel,
  donateHolderLabel,
  donateCopy,
  donateCopied,
  donateScanHint,
  donateQrExpand,
  donateQrPopupTitle,
  donateTransparency,
  donateJoinCommunity
};
const comps = { "title": "Comps (Metagame)", "description": "Explore top meta comps built by the community.", "createNew": "Create new comp", "searchPlaceholder": "Search comp name, synergy, or author...", "advancedFilter": "Advanced filter", "updatedAt": "Updated {{date}}", "votes": "Votes", "empty": "No comps match your filters.", "clearFilters": "Clear all filters", "trending": "Trending", "tabs": { "all": "All", "hot": "Hot comps", "new": "New comps", "following": "Following" }, "tierFilter": { "all": "All tiers", "s": "S Tier", "a": "A Tier", "b": "B Tier" }, "compareMode": "Compare", "compareModeOn": "Selecting", "compareHint": "Pick 2–3 comps to compare. Tap Compare on the bottom bar." };
const compDetail = { "backToList": "Back to comp list", "byAuthor": "By", "updatedAt": "Updated:", "votes": "Votes", "overviewTitle": "Strategy overview", "stats": { "top1": "Top 1 rate", "top4": "Top 4", "difficulty": "Difficulty", "style": "Playstyle" }, "difficultyModerate": "Moderate", "styleFast8": "Fast 8", "quickReview": "Quick review", "strengthsTitle": "Strengths", "weaknessesTitle": "Weaknesses", "requiredLineup": "Required lineup ({{count}})", "coreBadge": "CORE", "goldCost": "{{cost}} Gold", "positioningTitle": "Positioning", "boardStages": { "early": "Stage 1-3", "final": "Final board" }, "positioningHint": "* Drag to reposition units on the board", "synergiesTitle": "Active synergies", "itemSuggestions": "Item suggestions", "itemGroups": { "carry": "DAMAGE CARRY", "frontline": "FRONTLINE TANKS" }, "multiAnalysis": "Multi-axis analysis", "coreTitle": "Core units", "flexTitle": "Flex / bench", "mainCore": "MAIN CORE", "difficultyEasy": "Easy", "difficultyMedium": "Moderate", "difficultyHard": "Hard", "unitCount": "Units", "roadmapTitle": "Build roadmap", "roadmapEarly": "Early (1–10)", "roadmapMid": "Mid (11–20)", "roadmapLate": "Late (21+)", "countersTitle": "Matchups & counters", "strongAgainst": "Strong against", "weakAgainst": "Weak against", "counterFix": "How to handle", "tipsTitle": "Advanced tips", "radar": { "attack": "Attack", "defense": "Defense", "control": "Control", "difficulty": "Difficulty", "econ": "Economy", "lateGame": "Late game", "stats": "Stats" } };
const heroes = { "title": "Heroes", "description": "Full hero list for the current season.", "searchPlaceholder": "Search heroes...", "filterByCost": "Cost", "allCosts": "All costs", "filterByRace": "Filter by race", "filterByClass": "Filter by class", "allRaces": "All races", "allClasses": "All classes", "newBadge": "New", "filterNew": "New heroes", "allHeroes": "All", "onlyNew": "New only", "clearFilters": "Clear filters", "empty": "No heroes match the current filters.", "compareMode": "Compare", "compareModeOn": "Selecting", "compareHint": "Pick 2–3 heroes to compare stats. Tap Compare on the bottom bar." };
const heroDetail = { "notFound": "Hero not found", "backToList": "Back to hero list", "newBadge": "New hero", "breadcrumb": "Heroes", "goldCost": "{{cost}} Gold", "skillTitle": "Ability", "statsTitle": "Stats", "stats": { "hp": "Health (HP)", "atk": "Attack (ATK)", "armor": "Armor", "mr": "Magic resist", "atkSpeed": "ATK SPD", "range": "Range", "star": "Stats at {{star}} star" }, "traitsTitle": "Races & Classes", "traitUndefined": "Races / Classes undefined", "tacticalTitle": "Tactical notes", "recommendedItems": "Recommended items", "noRecommendedItems": "No specific item recommendations for this hero yet.", "relatedComps": "Related comps", "quickFilter": "Quick filter", "viewSameCost": "View {{cost}}-cost heroes", "viewSameClass": "View {{class}} class", "viewSameRace": "View {{race}} race", "selectStar": "Star level", "skins": "Skins", "lore": "Background", "loreExpand": "Read more", "loreCollapse": "Show less", "rarity": "Rarity", "synergiesTitle": "Synergies", "relatedByRace": "Same race", "relatedByClass": "Same class", "relatedByCost": "Same cost (${{cost}})", "toggleFavorite": "Toggle favorite hero", "descriptionFallback": "Look up stats and abilities for this chess piece." };
const items = { "title": "Item Library", "description": "Browse items by tier, effects, and tactical recommendations for your carry.", "searchPlaceholder": "Search items...", "filterByCategory": "Filter by category", "filterByTier": "Filter by tier", "allCategories": "All categories", "empty": "No items match your filters." };
const itemDetail = { "notFound": "Item not found", "backToLibrary": "Back to library", "breadcrumbLibrary": "Items", "category": { "defense": "Defense", "magic": "Magic", "attack": "Attack", "utility": "Utility" }, "specialEffect": "Special effect", "statBonusesTitle": "Stat bonuses", "tacticalReview": "Tactical review", "recommendedHeroes": "Recommended heroes", "relatedComps": "Related comps", "relatedItems": "Related items", "goldCost": "{{cost}} GOLD", "viewAllHeroes": "VIEW ALL HEROES", "metaAnalysisTitle": "Meta analysis", "metaAnalysisHighTier": "High-tier item suited for main carries in the current meta.", "metaAnalysisSituational": "Situational item — consider comp and opponents." };
const relics = { "title": "Relic Library", "description": "Explore special effects from relics.", "searchPlaceholder": "Search relics...", "filterByType": "Filter by relic type", "priority": "Priority: {{tier}}", "empty": "No relics match your search." };
const relicDetail = { "notFound": "Relic not found", "backToLibrary": "Back to relic library", "priority": "Priority: {{tier}}", "specialEffect": "Special effect", "tacticalReview": "Tactical review", "stats": { "appearance": "APPEARANCE RATE", "winRate": "WIN RATE (TOP 1)" }, "addToBuilder": "ADD TO BUILDER", "relatedRelics": "Related relics" };
const races = { "title": "Races", "description": "Explore races and their powerful activation effects.", "searchPlaceholder": "Search races...", "heroCount": "{{count}} Heroes", "descriptionPending": "Description for this race is being updated...", "milestonesTitle": "Activation milestones" };
const traits = { "title": "Races / Classes", "description": "Look up race and class synergies — thresholds, members, and suggested comps.", "searchPlaceholder": "Search races or classes...", "heroCount": "{{count}} Heroes", "descriptionPending": "Description is being updated...", "milestonesPreview": "Thresholds", "typeRace": "Race", "typeClass": "Class", "sortLabel": "Sort by", "filterByTab": "Filter by type", "sortName": "Name A–Z", "sortHeroCount": "Hero count", "empty": "No matching race or class found.", "tabs": { "all": "All ({{count}})", "race": "Races ({{count}})", "class": "Classes ({{count}})" }, "tabsShort": { "all": "All", "race": "Race", "class": "Class" } };
const traitDetail = { "notFound": "Race or class not found", "breadcrumb": "Races / Classes", "breadcrumbRace": "Race", "breadcrumbClass": "Class", "badge": "Synergy", "synergiesTitle": "Synergy effects", "milestoneActivate": "Activate at {{count}} units", "milestoneCountColumn": "Units", "milestoneEffectColumn": "Effect", "recommendedBadge": "Recommended", "membersTitle": "Hero roster", "pieceCount": "{{count}} heroes", "recommendedComps": "Suggested lineups", "recommendedMilestone": "Run at {{count}}", "compTraitCount": "{{count}} trait heroes", "backToList": "Back to Races / Classes list", "metaTitle": "Meta overview", "tierLabel": "Tier rating", "tierSuffix": "Tier", "pickRate": "Pick rate", "compUsage": "Featured in {{count}} meta comps", "phaseTitle": "Phase strength", "phaseEarly": "Early game", "phaseMid": "Mid game", "phaseLate": "Late game", "interactionsTitle": "Trait interactions", "synergyPartners": "Often paired with", "counters": "Counters", "counteredBy": "Countered by", "heuristicNote": "Meta data is derived from hero rosters and comps — indicative only.", "noPartners": "Not enough data to suggest partners.", "noMatchups": "Undetermined", "availabilityCommon": "Easy to find", "availabilityUncommon": "Medium", "availabilityRare": "Rare", "statTier": "Tier", "statPickRate": "Pick rate", "statHeroCount": "Heroes", "statMilestone": "Recommended", "loreTitle": "Description" };
const raceDetail = { "notFound": "Race not found", "breadcrumb": "Race", "badge": "Special Race", "synergiesTitle": "Activation effects", "milestoneActivate": "Activate at {{count}} units", "membersTitle": "Race members", "pieceCount": "{{count}} Units", "recommendedComps": "Recommended comps", "backToList": "Back to race list" };
const classes = { "title": "Classes", "description": "Learn the unique traits of each class.", "searchPlaceholder": "Search classes...", "heroCount": "{{count}} Heroes", "descriptionPending": "Description for this class is being updated...", "milestonesTitle": "Activation milestones" };
const classDetail = { "notFound": "Class not found", "breadcrumb": "Class", "badge": "Class trait", "synergiesTitle": "Activation effects", "milestoneActivate": "Activate at {{count}} units", "membersTitle": "Class members", "pieceCount": "{{count}} Units", "recommendedComps": "Recommended comps", "backToList": "Back to class list" };
const leaderboard = { "title": "Hall of Fame", "description": "Recognizing players who share outstanding comps, articles, and meta insights.", "podiumTitle": "Top 3 contributors", "stats": { "contributors": "Contributors", "totalComps": "Total comps", "totalPosts": "Total articles" }, "tiers": { "legend": "Legend", "master": "Master", "expert": "Expert", "member": "Member" }, "tabs": { "comps": "Meta comps", "contributors": "Contributors", "heroes": "Featured heroes", "players": "MMR players" }, "cols": { "comps": { "rank": "Rank", "strategy": "Strategy", "tier": "Tier", "likes": "Likes", "winRate": "Win forecast" }, "contributors": { "rank": "Rank", "contributor": "Contributor", "comps": "Comps", "posts": "Posts", "reputation": "Reputation", "badge": "Badge" }, "heroes": { "hero": "Hero", "cost": "Cost", "appearance": "Appearance", "trend": "Trend" }, "players": { "player": "Player", "server": "Server", "mmr": "MMR", "tier": "Tier", "winRate": "Win rate" } }, "authorRole": "Contributor", "metaBadge": "meta", "ctaTitle": "Want to be recognized?", "ctaDesc": "Share a comp or write an article — every contribution is tracked automatically.", "ctaButton": "BUILD NOW", "ctaComp": "Create comp", "ctaPost": "Write article" };
const profile = { "title": "Profile", "description": "Manage saved content, posts, and account settings.", "memberSince": "Member since {{date}}", "summary": { "heroes": "Saved heroes", "comps": "Saved comps", "posts": "Posts" }, "tabs": { "favorites": "Favorites", "activity": "Activity", "settings": "Settings" }, "favHeroes": "Favorite heroes ({{count}})", "noFavHeroes": "You haven't saved any favorite heroes yet.", "browseHeroes": "Browse hero list", "savedComps": "Saved comps ({{count}})", "noSavedComps": "You haven't saved any favorite comps yet.", "browseComps": "Browse meta comps", "myPosts": "My posts", "postStatus": { "published": "Published", "pending": "Pending review", "draft": "Draft" }, "activity": { "quickLinks": "Quick links", "noPosts": "You haven't published any posts yet.", "createPost": "Write a new post", "views": "{{count}} views", "linkComps": "Browse comps", "linkTeamBuilder": "Team builder tool", "linkCommunity": "Community", "linkLeaderboard": "Contributor leaderboard" }, "settings": { "title": "Account settings", "displayName": "Display name", "avatarUrl": "Avatar URL", "email": "Email", "emailReadonly": "Email cannot be changed in the current version.", "save": "Save changes", "saved": "Changes saved.", "uploadAvatar": "Upload avatar", "uploadingAvatar": "Uploading...", "invalidAvatarUrl": "Avatar must be an HTTPS URL or upload via Cloudinary — not base64." } };
const enPages = {
  comps,
  compDetail,
  heroes,
  heroDetail,
  items,
  itemDetail,
  relics,
  relicDetail,
  races,
  traits,
  traitDetail,
  raceDetail,
  classes,
  classDetail,
  leaderboard,
  profile
};
const pageTitle = "Tool Hub";
const list = { "teamBuilder": { "name": "Team Builder", "desc": "Drag heroes onto the board; auto-calculates synergies and total gold." }, "compFinder": { "name": "Comp Finder", "desc": "Suggest comps based on units you already have." }, "banAdvisor": { "name": "Ban Traits", "desc": "Suggest race/class bans for the highest win rate." }, "heroCompare": { "name": "Hero Compare", "desc": "Compare HP, armor, and damage between two heroes." }, "compCompare": { "name": "Comp Compare", "desc": "Compare strength, difficulty, and cost of two comps." } };
const hubDesc = { "teamBuilder": "Drag heroes; auto synergy and gold totals", "compFinder": "Comp suggestions from owned units", "banAdvisor": "Optimal race/class ban picks", "heroCompare": "Compare stats between two heroes", "compCompare": "Compare two comps side by side" };
const teamBuilder = { "exportSuccess": "Image exported successfully", "exportSuccessDesc": "Your lineup has been saved as a high-quality PNG file.", "processing": "Processing...", "exportPng": "Export image (PNG)", "saveComp": "Save lineup", "shareMeta": "Share meta", "refreshBoard": "Reset board", "playerLevel": "Player level", "units": "Units", "totalGold": "Total gold", "emptyBoard": "No units on board", "emptyBoardHint": "Start by picking heroes from the library on the right.", "activeSynergies": "Active synergies", "heroLibrary": "Unit library", "searchPlaceholder": "Search name or trait...", "filterGold": "Filter by cost", "filterRaceClass": "Filter by race/class", "allTraits": "ALL TRAITS", "filterRace": "Race", "filterClass": "Class", "noHeroes": "No matching heroes", "great": "Great", "maxUnitsReached": "Board is full (16 units max)", "saved": "Lineup saved", "shareCopied": "Share link copied", "shareCopyFailed": "Could not copy link", "exportFailed": "Image export failed", "loadedShared": "Loaded lineup from share link", "autoArrange": "Auto arrange", "autoArrangeDone": "Units arranged by front/back line", "clearConfirm": "Clear all units from the board?", "clearFilters": "Clear filters", "dragHint": "Drag heroes onto the board · tap a cell to cycle stars · drop on trash to remove", "dropToRemove": "Drop here to remove", "allCosts": "All costs", "allRaces": "All races", "allClasses": "All classes", "searchRacePlaceholder": "Search race...", "searchClassPlaceholder": "Search class...", "noTraitMatch": "No matching trait", "filterByCost": "Filter by cost", "playerLevelHint": "Equals units on board (max 16)" };
const compFinder = { "ownedHeroes": "Owned heroes", "ownedHeroesHint": "Tap to select heroes on your board.", "noSelection": "No heroes selected", "searchHeroes": "Search heroes...", "suggestedComps": "Suggested comps", "suggestedCompsHint": "Top comps that best match your current units.", "emptyAnalysisHint": "Select owned heroes to see meta comp transition analysis.", "matchLabel": "Match", "matchPercent": "{{percent}}% match", "exploreDetail": "Explore comp details", "clearSelection": "Clear all", "allCosts": "All costs", "allRaces": "All races", "allClasses": "All classes", "filterRace": "Race", "filterClass": "Class", "filterByCost": "Filter by cost", "searchRacePlaceholder": "Search race...", "searchClassPlaceholder": "Search class...", "noTraitMatch": "No matching trait" };
const banAdvisor = { "stepRaceClass": "Pick race & class", "stepHeroes": "Pick heroes", "stepCore": "Define core", "stepPriority": "Priority level", "mainCore": "Main core", "subCore": "Sub core", "prioritySurvive": "Survival priority", "priorityContest": "Contest priority", "priorityTop1": "Top 1 priority", "suggestedBan": "Suggested BAN strategy", "winRateAnalysis": "Win rate analysis", "contestAnalysis": "Contest analysis", "back": "Back", "startAnalysis": "Start analysis", "newAnalysis": "New analysis", "next": "Next", "progress": { "comp": "Lineup", "heroes": "Heroes", "core": "Core", "priority": "Priority", "results": "Results" }, "raceCollection": "Race collection", "classCollection": "Class collection", "filterHint": "The system will filter suitable heroes based on your selection.", "heroesFilteredHint": "Hero list filtered by race/class:", "coreHint": "Main core is the key piece to protect while banning counters from opponents.", "priorityHint": "The algorithm adjusts based on your core goal.", "priorityDesc": { "survival": "Focus on weakening comps that directly counter your core.", "contest": "Remove comps contesting the same core as you.", "top1": "Target the strongest meta comps to optimize placement." }, "optimalLineup": "Optimal lineup", "priorityGoal": "Priority goal", "metaForecast": "Meta forecast", "recommendedLevel": "Recommendation level", "banTrait": "BAN RACE / CLASS", "poolManipulation": "POOL MANIPULATION ({{count}} units)", "basedOnMeta": "Based on the latest meta database", "prioritySurviveShort": "SURVIVE", "priorityContestShort": "CONTEST", "priorityTop1Short": "TOP 1", "goldCost": "{{count}} heroes", "contestPlayers": "Contested by {{count}} other players", "contestPoolHint": "Pool for <1>{{hero}}</1> is at warning level. Ban <1>{{trait}}</1> to remove {{poolCount}} other units from the pool.", "contestReduction": "Contest reduction", "banDifficulty": "Ban difficulty", "metaForecastWin": "+{{delta}}% WIN", "simulatorTitle": "Meta shift simulator", "simulatorSubtitle": "Deep meta impact analysis", "simulatorDesc": "Simulates meta changes after bans. Recalculates remaining trait/class share across comps.", "scenarioBan": "Scenario: BAN {{trait}}", "metaShare": "{{percent}}% Meta", "updatingScenarios": "More scenarios coming soon...", "reban": "Re-ban", "configTitle": "Configuration", "selectTraitsPlaceholder": "Select races / classes...", "selectRacePlaceholder": "Select race...", "selectClassPlaceholder": "Select class...", "racesSelected": "{{count}} races selected", "classesSelected": "{{count}} classes selected", "traitsSelected": "{{count}} traits selected", "coreDoubleClickHint": "Double-click a hero to set as main core", "setMainCore": "Set {{name}} as main core", "readyHint": "{{heroes}} heroes · Core: {{core}}", "emptyResultsHint": "Select traits and a main core to see ban suggestions.", "searchHeroPlaceholder": "Search hero name...", "searchRacePlaceholder": "Search race...", "searchClassPlaceholder": "Search class...", "noTraitMatch": "No matching traits", "noHeroMatch": "No matching heroes", "banCostShort": "{{count}} heroes", "filterCost": "Filter cost" };
const heroCompare = { "pickHeroes": "Pick heroes to compare", "searchPlaceholder": "Enter hero name...", "statsTitle": "Power stats", "statsSubtitle": "Estimated data for the current patch", "hp": "Health", "armor": "Physical armor", "mr": "Magic resist", "dps": "Damage/sec", "attackSpeed": "Attack speed", "range": "Attack range", "slotLabel": "Hero {{index}}", "addHero": "Add hero", "changeHero": "Change hero", "removeHero": "Remove hero", "needTwo": "Select at least 2 heroes to view the comparison.", "insightsTitle": "Quick insights", "insightHighest": "{{name}} has the highest {{stat}} in this group.", "insightCheapest": "{{name}} is the cheapest (${{cost}})." };
const compCompare = { "pickComps": "Pick comps to compare", "searchPlaceholder": "Search comp name...", "tacticalDesc": "Tactical description", "artisan": "Author", "statAnalysis": "Stat comparison", "radarTitle": "Radar chart", "winrate": "Win rate", "top4": "Top 4", "difficulty": "Difficulty", "lateGame": "Late game", "tier": "Tier", "unitCount": "Units", "avgCost": "Avg cost", "slotLabel": "Comp {{index}}", "addComp": "Add comp", "changeComp": "Change comp", "removeComp": "Remove comp", "needTwo": "Select at least 2 comps to view the comparison.", "contestedTitle": "Contested units", "contestedEmpty": "No overlapping heroes between comps.", "verdictTitle": "Verdict", "verdictWinRate": "{{name}} has the highest win rate ({{value}}).", "verdictEasiest": "{{name}} is the easiest to play in this group.", "verdictLateGame": "{{name}} is strongest in late game.", "insightsTitle": "Quick insights", "insightWinRate": "{{name}} has the highest win rate ({{value}}).", "insightEasiest": "{{name}} is the easiest to play in this group.", "insightLateGame": "{{name}} is strongest in late game." };
const compare = { "compareButton": "Compare ({{count}}/{{max}})", "clearAll": "Clear all", "trayHint": "{{count}}/{{max}} selected", "maxReached": "Maximum 3 items for comparison" };
const enTools = {
  pageTitle,
  list,
  hubDesc,
  teamBuilder,
  compFinder,
  banAdvisor,
  heroCompare,
  compCompare,
  compare
};
const title$1 = "Community";
const description$1 = "Ask questions, share guides, and discuss meta with fellow players.";
const createPost = "Create post";
const searchPlaceholder$1 = "Search posts, hashtags...";
const sort = { "latest": "Latest", "hot": "Hot", "engagement": "Most engagement" };
const commentCount = "{{count}} comments";
const notFound = "Post not found";
const backToList$1 = "Back to community";
const loadingDetail = "Loading post details...";
const commentsTitle = "Comments";
const commentPlaceholder = "Share your thoughts...";
const submitComment = "Submit comment";
const like = "Like";
const reply = "Reply";
const aboutAuthor = "About the author";
const veteranMember = "Veteran member";
const authorStats = { "reputation": "Reputation", "posts": "Posts" };
const follow = "Follow";
const trendingTopics = "Trending topics";
const engagementSummary = "{{likes}} likes • {{comments}} comments";
const noComments = "No approved comments yet.";
const relatedPosts$1 = "Related posts";
const replyPlaceholder = "Write a reply...";
const pendingApproval = "Pending approval";
const submitReply = "Submit reply";
const commentSubmitted = "Your comment was submitted and is pending approval.";
const cancelReply = "Cancel";
const communityStats = "Community stats";
const totalPosts = "Posts";
const totalComments = "Comments";
const emptyFiltered$1 = "No posts match your filters.";
const composer = { "title": "Create discussion post", "subtitle": "Share tips, ask meta questions, and attach images with captions.", "titleLabel": "Title", "titlePlaceholder": "Enter post title...", "contentLabel": "Content", "contentPlaceholder": "Write your post content here...", "tagsLabel": "Topics / tags", "addTag": "Add tag (press Enter)", "addTagButton": "Add", "removeTag": "Remove tag", "imagesLabel": "Image attachments", "uploadImage": "Upload image", "pasteUrl": "Paste image URL...", "addUrl": "Add URL", "caption": "Image caption", "captionPlaceholder": "Short description for this image...", "uploading": "Uploading...", "uploadError": "Could not upload image. Check Cloudinary config or paste a URL.", "invalidImageUrl": "Invalid image URL. Use HTTPS, a static path, or upload via Cloudinary — not base64.", "removeImage": "Remove image", "moveUp": "Move up", "moveDown": "Move down", "publish": "Publish", "preview": "Preview", "edit": "Edit", "needTitleContent": "Please enter a title and content before publishing.", "justNow": "Just now" };
const enCommunity = {
  title: title$1,
  description: description$1,
  createPost,
  searchPlaceholder: searchPlaceholder$1,
  sort,
  commentCount,
  notFound,
  backToList: backToList$1,
  loadingDetail,
  commentsTitle,
  commentPlaceholder,
  submitComment,
  like,
  reply,
  aboutAuthor,
  veteranMember,
  authorStats,
  follow,
  trendingTopics,
  engagementSummary,
  noComments,
  relatedPosts: relatedPosts$1,
  replyPlaceholder,
  pendingApproval,
  submitReply,
  commentSubmitted,
  cancelReply,
  communityStats,
  totalPosts,
  totalComments,
  emptyFiltered: emptyFiltered$1,
  composer
};
const listTitle = "News & Guides";
const listDescription = "Meta news, rank guides, and patch notes.";
const searchPlaceholder = "Search articles...";
const emptyFiltered = "No articles match your filters.";
const writtenBy = "Written by";
const notFoundTitle = "Article not found";
const notFoundDesc = "This article may have been removed or the link is invalid.";
const backToList = "Back to news";
const unpublishedTitle = "Article not published";
const unpublishedDesc = "This content is only visible after approval.";
const readingMinutes = "{{n}} min read";
const contentPending = "Article content is being updated.";
const shareTitle = "Share article";
const shareFacebook = "Share on Facebook";
const shareTwitter = "Share on Twitter";
const copyLinkAria = "Copy link";
const copied = "Copied!";
const relatedSameCategory = "Same category";
const recentPosts = "Recent posts";
const metaToolsTitle = "Meta tools";
const metaToolsDesc = "Apply strategies from this article to your games.";
const metaToolsCta = "Find a matching comp";
const featured = "Featured";
const relatedPosts = "Related articles";
const filterByCategory = "Category";
const allCategories = "All categories";
const latestArticles = "Latest articles";
const popularArticles = "Most read";
const categoriesTitle = "Categories";
const sidebarDiscussionDesc = "Discuss meta, ask questions, and share tips with the community.";
const sidebarDiscussionCta = "Join discussion";
const noMoreArticles = "You are viewing the latest articles.";
const filterByAuthor = "Author";
const filterByTime = "Time";
const time7d = "7 days";
const time30d = "30 days";
const time90d = "3 months";
const enNews = {
  listTitle,
  listDescription,
  searchPlaceholder,
  emptyFiltered,
  writtenBy,
  notFoundTitle,
  notFoundDesc,
  backToList,
  unpublishedTitle,
  unpublishedDesc,
  readingMinutes,
  contentPending,
  shareTitle,
  shareFacebook,
  shareTwitter,
  copyLinkAria,
  copied,
  relatedSameCategory,
  recentPosts,
  metaToolsTitle,
  metaToolsDesc,
  metaToolsCta,
  featured,
  relatedPosts,
  filterByCategory,
  allCategories,
  latestArticles,
  popularArticles,
  categoriesTitle,
  sidebarDiscussionDesc,
  sidebarDiscussionCta,
  noMoreArticles,
  filterByAuthor,
  filterByTime,
  time7d,
  time30d,
  time90d
};
const title = "Auto Chess Mobile VN Community";
const description = "Meet the founding team, explore community channels, and help build meta together with Vietnamese players.";
const visitChannel = "Visit channel";
const stats = { "teamMembers": "Team members", "channels": "Community channels", "comps": "Compositions", "posts": "Articles" };
const team = { "title": "Founding team", "description": "The people building and maintaining the meta platform for Auto Chess Mobile VN.", "viewProfile": "View profile" };
const channels = { "title": "Community channels & platforms", "description": "Follow official and partner channels — each offers unique value for different learning needs." };
const cta = { "title": "Join & contribute", "description": "Share comps, guides, and experience. Every contribution is recognized on the Hall of Fame.", "writePost": "Write news article", "joinDiscussion": "Join discussion", "shareComp": "Share a comp" };
const rules = { "title": "Community guidelines", "items": ["Respect all members — no toxicity or personal attacks.", "Content must relate to Auto Chess Mobile VN or meta strategy.", "No spam, unauthorized ads, or scam links.", "Credit sources when sharing others' guides or articles.", "Violating comments may be hidden and accounts may be restricted."] };
const faq = { "title": "FAQ", "items": [{ "q": "How do I get on the Hall of Fame?", "a": "Publish comps via Team Builder or write news/meta articles. The system automatically scores reputation from likes and contribution count." }, { "q": "Can I suggest a new YouTube/TikTok channel?", "a": "Yes — contact the team via Facebook group or Discord. Approved channels appear on this page." }, { "q": "What's the difference between Discussion and News?", "a": "News is editorial content (meta, patches, guides). Discussion is the community forum for Q&A and quick sharing." }, { "q": "How do I become a contributor?", "a": "Contribute quality content consistently and earn community recognition. The team will reach out when a role opens." }] };
const enCommunityHub = {
  title,
  description,
  visitChannel,
  stats,
  team,
  channels,
  cta,
  rules,
  faq
};
const resources = {
  vi: {
    common: viCommon,
    nav: viNav,
    auth: viAuth,
    footer: viFooter,
    home: viHome,
    pages: viPages,
    tools: viTools,
    community: viCommunity,
    news: viNews,
    communityHub: viCommunityHub
  },
  en: {
    common: enCommon,
    nav: enNav,
    auth: enAuth,
    footer: enFooter,
    home: enHome,
    pages: enPages,
    tools: enTools,
    community: enCommunity,
    news: enNews,
    communityHub: enCommunityHub
  }
};
const isBrowser = typeof window !== "undefined";
if (isBrowser) {
  i18n.use(LanguageDetector);
}
void i18n.use(initReactI18next).init({
  resources,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: [...SUPPORTED_LOCALES],
  lng: isBrowser ? void 0 : DEFAULT_LOCALE,
  ns: [...NAMESPACES],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  detection: isBrowser ? {
    order: ["localStorage", "navigator"],
    lookupLocalStorage: LOCALE_STORAGE_KEY,
    caches: ["localStorage"]
  } : void 0
});
function syncDocumentLang(locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = resolveHtmlLang(locale);
}
if (isBrowser) {
  syncDocumentLang(i18n.language);
  i18n.on("languageChanged", syncDocumentLang);
}
const sizeStyles = {
  sm: {
    wrapper: "p-1",
    button: "h-7 px-3 text-[9px]"
  },
  md: {
    wrapper: "p-1",
    button: "flex-1 h-8 text-[10px]"
  }
};
function LanguageSwitcher({ className, size = "sm" }) {
  const { i18n: i18nInstance } = useTranslation();
  const current = i18nInstance.language.startsWith("en") ? "en" : "vi";
  const styles = sizeStyles[size];
  const setLocale = (locale) => {
    void i18n.changeLanguage(locale);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-2 bg-brand-card rounded-lg border border-brand-border",
        styles.wrapper,
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setLocale("vi"),
            className: cn(
              "rounded-md font-bold uppercase tracking-widest leading-none transition-colors",
              styles.button,
              current === "vi" ? "bg-gold-gradient text-black" : "text-brand-text-sub hover:text-white"
            ),
            children: "VN"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setLocale("en"),
            className: cn(
              "rounded-md font-bold uppercase tracking-widest leading-none transition-colors",
              styles.button,
              current === "en" ? "bg-gold-gradient text-black" : "text-brand-text-sub hover:text-white"
            ),
            children: "EN"
          }
        )
      ]
    }
  );
}
function DrawerSubmenu({
  item,
  isChildActive,
  onNavigate
}) {
  const [isOpen, setIsOpen] = React.useState(isChildActive);
  React.useEffect(() => {
    if (isChildActive) setIsOpen(true);
  }, [isChildActive]);
  if (!item.children) return null;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: cn(
          "w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all",
          isChildActive ? "text-brand-gold" : "text-brand-text-sub hover:bg-white/5 hover:text-white"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }),
            item.name
          ] }),
          /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-4 w-4 transition-transform", isOpen && "rotate-180") })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsx(
      m.ul,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        className: "overflow-hidden pl-4 space-y-0.5",
        children: item.children.map((child) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: child.path,
            onClick: onNavigate,
            className: ({ isActive }) => cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
              isActive ? "text-brand-gold bg-brand-gold/5" : "text-brand-text-sub hover:text-white hover:bg-white/5"
            ),
            children: [
              /* @__PURE__ */ jsx(child.icon, { className: "h-3.5 w-3.5" }),
              child.name
            ]
          }
        ) }, child.path))
      }
    ) })
  ] });
}
function NavListItem({
  item,
  onClose
}) {
  var _a;
  const location = useLocation();
  const isChildActive = ((_a = item.children) == null ? void 0 : _a.some((c) => isNavChildActive(location.pathname, c.path))) ?? false;
  if (item.children) {
    return /* @__PURE__ */ jsx(DrawerSubmenu, { item, isChildActive, onNavigate: onClose });
  }
  return /* @__PURE__ */ jsxs(
    NavLink,
    {
      to: item.path,
      end: item.path === "/",
      onClick: onClose,
      className: ({ isActive }) => cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all",
        isActive ? "bg-gold-gradient text-black" : "text-brand-text-sub hover:bg-white/5 hover:text-white"
      ),
      children: [
        /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }),
        item.name
      ]
    }
  );
}
function Sidebar({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenInfo
}) {
  const { user, openLogin, openRegister } = useAuth();
  const { t } = useTranslation(["common", "nav", "auth"]);
  const navItems = useNavItems();
  const sidebarSections = useSidebarSections();
  const strategyTips2 = t("common:strategyTipsSidebar", { returnObjects: true });
  const tipIndex = React.useMemo(
    () => Math.floor(Math.random() * strategyTips2.length),
    [isOpen, strategyTips2.length]
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
      m.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-[45] xl:hidden"
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: cn(
          "fixed inset-y-0 left-0 w-[min(100vw-3rem,280px)] border-r border-brand-border bg-brand-bg flex flex-col z-50 transition-transform duration-300 xl:hidden safe-area-pt",
          isOpen ? "translate-x-0" : "-translate-x-full"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center h-14 sm:h-16 px-6 border-b border-brand-border", children: /* @__PURE__ */ jsxs(Link, { to: "/", onClick: onClose, className: "font-bold text-lg tracking-tight leading-none", children: [
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "Auto" }),
            /* @__PURE__ */ jsx("span", { className: "text-brand-gold", children: "Chess" }),
            /* @__PURE__ */ jsx("span", { className: "text-white text-[12px] ml-1", children: "Mobile" }),
            /* @__PURE__ */ jsx("span", { className: "text-brand-gold text-[12px]", children: ".vn" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "px-3 pt-3", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                onClose == null ? void 0 : onClose();
                onOpenSearch == null ? void 0 : onOpenSearch();
              },
              className: "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 bg-brand-card border border-brand-border text-brand-text-sub hover:text-white hover:border-white/10 transition-all text-left",
              children: [
                /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 shrink-0 text-brand-gold" }),
                /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium", children: t("common:quickLookupPlaceholder") })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("nav", { className: "flex-1 overflow-y-auto py-3 px-3 custom-scrollbar space-y-4", children: [
            sidebarSections.map((section) => {
              const sectionItems = navItems.filter(
                (item) => section.itemLabelKeys.includes(item.labelKey)
              );
              return /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: section.label }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: sectionItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavListItem, { item, onClose }) }, item.labelKey)) })
              ] }, section.labelKey);
            }),
            /* @__PURE__ */ jsx("div", { className: "pt-2 border-t border-brand-border", children: /* @__PURE__ */ jsxs(
              NavLink,
              {
                to: "/admin",
                onClick: onClose,
                className: ({ isActive }) => cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all",
                  isActive ? "bg-white/10 text-white" : "text-brand-text-sub hover:bg-white/5 hover:text-white"
                ),
                children: [
                  /* @__PURE__ */ jsx(ShieldAlert, { className: "h-4 w-4" }),
                  t("nav:adminShort")
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-brand-border bg-brand-card/50 p-3 space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-gold", children: t("common:strategyTipsTitle") }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/tuong",
                    onClick: onClose,
                    className: "text-[10px] font-semibold text-brand-text-sub hover:text-brand-gold transition-colors",
                    children: t("nav:libraryLink")
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub leading-relaxed", children: strategyTips2[tipIndex] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onClose == null ? void 0 : onClose();
                    onOpenInfo == null ? void 0 : onOpenInfo();
                  },
                  className: "flex items-center gap-2 text-[12px] font-semibold text-brand-text-sub hover:text-white transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Info, { className: "h-3.5 w-3.5 text-brand-gold" }),
                    t("common:infoSupportShort")
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/tuong",
                  onClick: onClose,
                  className: "flex items-center gap-2 text-[12px] font-semibold text-brand-text-sub hover:text-white transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(BookOpen, { className: "h-3.5 w-3.5 text-brand-gold" }),
                    t("nav:wikiGuide")
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-brand-border space-y-3 safe-area-pb", children: [
            /* @__PURE__ */ jsx(LanguageSwitcher, { size: "md", className: "w-full" }),
            !user && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: openLogin,
                  className: "w-full justify-center bg-brand-card-2 border-transparent text-brand-text-sub hover:text-white",
                  children: t("auth:login")
                }
              ),
              /* @__PURE__ */ jsx(Button, { variant: "default", onClick: openRegister, className: "w-full justify-center", children: t("auth:register") })
            ] })
          ] })
        ]
      }
    )
  ] });
}
const CLOSE_DELAY_MS = 150;
function NavDropdown({
  item,
  isOpen,
  onOpen,
  onScheduleClose,
  onCloseMenu
}) {
  var _a;
  const location = useLocation$1();
  const ref = React.useRef(null);
  const isChildActive = ((_a = item.children) == null ? void 0 : _a.some((c) => isNavChildActive(location.pathname, c.path))) ?? false;
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onCloseMenu();
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onCloseMenu]);
  if (!item.children) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: "relative",
      onMouseEnter: onOpen,
      onMouseLeave: onScheduleClose,
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => isOpen ? onCloseMenu() : onOpen(),
            "aria-expanded": isOpen,
            "aria-haspopup": "menu",
            className: cn(
              "flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-lg transition-all border-b-2 border-transparent",
              isChildActive || isOpen ? "text-brand-gold border-brand-gold" : "text-brand-text-sub hover:text-white hover:bg-white/5"
            ),
            children: [
              item.name,
              /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180") })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 pt-1 z-50", children: /* @__PURE__ */ jsx("div", { className: "min-w-[220px] rounded-xl border border-brand-border bg-brand-card shadow-2xl py-1 animate-in fade-in slide-in-from-top-1 duration-150", children: item.children.map((child) => /* @__PURE__ */ jsxs(
          Link$1,
          {
            to: child.path,
            prefetch: "intent",
            onClick: onCloseMenu,
            className: cn(
              "flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium transition-colors",
              isNavChildActive(location.pathname, child.path) ? "text-brand-gold bg-brand-gold/5" : "text-brand-text-sub hover:text-white hover:bg-white/5"
            ),
            children: [
              /* @__PURE__ */ jsx(child.icon, { className: "h-4 w-4 shrink-0" }),
              child.name
            ]
          },
          child.path
        )) }) })
      ]
    }
  );
}
function HeaderNav({ onDropdownOpen }) {
  const location = useLocation$1();
  const navItems = useNavItems();
  const [openMenu, setOpenMenu] = React.useState(null);
  const closeTimerRef = React.useRef(null);
  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);
  const handleCloseMenu = React.useCallback((labelKey) => {
    setOpenMenu((prev) => prev === labelKey ? null : prev);
  }, []);
  const scheduleCloseMenu = React.useCallback(
    (labelKey) => {
      clearCloseTimer();
      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null;
        handleCloseMenu(labelKey);
      }, CLOSE_DELAY_MS);
    },
    [clearCloseTimer, handleCloseMenu]
  );
  const handleCloseAll = React.useCallback(() => {
    clearCloseTimer();
    setOpenMenu(null);
  }, [clearCloseTimer]);
  React.useEffect(() => {
    clearCloseTimer();
    setOpenMenu(null);
  }, [location.pathname, clearCloseTimer]);
  React.useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);
  React.useEffect(() => {
    if (!openMenu) return;
    function handleEscape(e) {
      if (e.key === "Escape") handleCloseAll();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openMenu, handleCloseAll]);
  const handleOpen = (labelKey) => {
    clearCloseTimer();
    setOpenMenu(labelKey);
    onDropdownOpen == null ? void 0 : onDropdownOpen();
  };
  return /* @__PURE__ */ jsx("nav", { className: "hidden xl:flex items-center gap-0.5 flex-shrink-0", children: navItems.map((item) => {
    if (item.children) {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        NavDropdown,
        {
          item,
          isOpen: openMenu === item.labelKey,
          onOpen: () => handleOpen(item.labelKey),
          onScheduleClose: () => scheduleCloseMenu(item.labelKey),
          onCloseMenu: () => handleCloseMenu(item.labelKey)
        }
      ) }, item.labelKey);
    }
    const isActive = item.path === "/" ? location.pathname === "/" : location.pathname === item.path || location.pathname.startsWith(item.path + "/");
    return /* @__PURE__ */ jsx(
      NavLink$1,
      {
        to: item.path,
        prefetch: "intent",
        end: item.path === "/",
        onMouseEnter: handleCloseAll,
        className: cn(
          "px-3 py-2 text-[13px] font-medium rounded-lg transition-all border-b-2",
          isActive ? "text-brand-gold border-brand-gold" : "text-brand-text-sub border-transparent hover:text-white hover:bg-white/5"
        ),
        children: item.name
      },
      item.path
    );
  }) });
}
const WIDTH_CLASS = {
  full: "max-w-[1400px]",
  article: "max-w-3xl",
  reading: "max-w-4xl",
  narrow: "max-w-2xl"
};
function PageContainer({
  children,
  width = "full",
  className,
  as: Tag = "div"
}) {
  return /* @__PURE__ */ jsx(
    Tag,
    {
      className: cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        WIDTH_CLASS[width],
        className
      ),
      children
    }
  );
}
function Header({
  onOpenSearch,
  infoOpen = false,
  onInfoOpenChange
}) {
  const { t } = useTranslation(["common", "nav", "auth"]);
  const { user, triggerLogout, openLogin, openRegister } = useAuth();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showWikiDropdown, setShowWikiDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const wikiRef = React.useRef(null);
  const tips = t("common:strategyTips", { returnObjects: true });
  const [activeTab, setActiveTab] = React.useState("info");
  const [currentTipIndex, setCurrentTipIndex] = React.useState(0);
  const setShowInfoModal = onInfoOpenChange ?? (() => {
  });
  const showInfoModal = infoOpen;
  const getNewTip = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * tips.length);
    } while (nextIdx === currentTipIndex && tips.length > 1);
    setCurrentTipIndex(nextIdx);
  };
  const rollRates = [
    { lvl: 1, c1: "100%", c2: "0%", c3: "0%", c4: "0%", c5: "0%" },
    { lvl: 2, c1: "100%", c2: "0%", c3: "0%", c4: "0%", c5: "0%" },
    { lvl: 3, c1: "90%", c2: "10%", c3: "0%", c4: "0%", c5: "0%" },
    { lvl: 4, c1: "65%", c2: "30%", c3: "5%", c4: "0%", c5: "0%" },
    { lvl: 5, c1: "50%", c2: "35%", c3: "15%", c4: "0%", c5: "0%" },
    { lvl: 6, c1: "40%", c2: "35%", c3: "23%", c4: "2%", r5: "0%" },
    { lvl: 7, c1: "30%", c2: "30%", c3: "30%", c4: "10%", c5: "0%" },
    { lvl: 8, c1: "21%", c2: "25%", c3: "30%", c4: "20%", c5: "4%" },
    { lvl: 9, c1: "12%", c2: "20%", c3: "30%", c4: "30%", c5: "8%" },
    { lvl: 10, c1: "5%", c2: "10%", c3: "25%", c4: "40%", c5: "20%" }
  ];
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (wikiRef.current && !wikiRef.current.contains(event.target)) {
        setShowWikiDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-40 border-b border-brand-border bg-brand-bg/90 backdrop-blur-xl safe-area-pt", children: [
    /* @__PURE__ */ jsxs(PageContainer, { className: "h-14 sm:h-16 flex items-center gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex-shrink-0 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-bold text-base sm:text-lg tracking-tight leading-none", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "Auto" }),
          /* @__PURE__ */ jsx("span", { className: "text-brand-gold", children: "Chess" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden xs:block text-[9px] sm:text-[10px] text-brand-text-sub font-medium", children: "Mobile.vn" })
      ] }),
      /* @__PURE__ */ jsx(HeaderNav, { onDropdownOpen: () => setShowWikiDropdown(false) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0 hidden md:block max-w-[200px] lg:max-w-xs", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-sub group-focus-within:text-brand-gold transition-colors" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "search",
            placeholder: t("common:searchPlaceholder"),
            className: "w-full bg-brand-card border-transparent pl-9 h-9 text-[12px] focus-visible:ring-1 focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold/30 font-medium"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onOpenSearch,
            className: "md:hidden w-9 h-9 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-text-sub hover:text-white hover:border-white/10 transition-all",
            "aria-label": t("common:searchAria"),
            children: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx(LanguageSwitcher, { className: "hidden lg:flex" }),
        /* @__PURE__ */ jsx("div", { className: "hidden xl:block w-[1px] h-5 bg-white/10" }),
        /* @__PURE__ */ jsxs("div", { className: "hidden xl:flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", ref: wikiRef, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowWikiDropdown(!showWikiDropdown),
                "aria-label": t("nav:wikiHandbook"),
                "aria-expanded": showWikiDropdown,
                className: cn(
                  "w-9 h-9 rounded-lg bg-brand-card border flex items-center justify-center text-brand-text-sub hover:text-white transition-all",
                  showWikiDropdown ? "border-brand-gold/30 text-brand-gold bg-brand-gold/5" : "border-brand-border hover:border-white/10"
                ),
                children: /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" })
              }
            ),
            showWikiDropdown && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-3.5 w-72 rounded-xl border border-brand-border bg-brand-card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-3 border-b border-white/5 mb-1.5 text-left", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-[11px] font-bold text-brand-gold uppercase tracking-widest flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(BookOpen, { className: "h-3.5 w-3.5 text-brand-gold" }),
                  t("nav:wikiHandbook")
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub font-medium opacity-60 mt-1", children: t("nav:wikiHandbookDesc") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-0.5 text-left font-sans", children: [
                WIKI_DROPDOWN_LINKS.map((link) => {
                  const Icon = LIBRARY_ICONS[link.labelKey];
                  return /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: link.path,
                      onClick: () => setShowWikiDropdown(false),
                      className: "flex items-center justify-between px-2.5 py-2 rounded-lg text-brand-text-sub hover:text-white hover:bg-white/5 transition-all group",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsx("div", { className: cn("w-8 h-8 rounded-lg border flex items-center justify-center transition-all", link.accent), children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }) }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("div", { className: "text-[12px] font-bold", children: t(`nav:${link.titleKey}`) }),
                            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub/60 mt-0.5 font-normal", children: t(`nav:${link.descKey}`) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 text-brand-text-sub group-hover:text-white transition-all transform group-hover:translate-x-0.5" })
                      ]
                    },
                    link.path
                  );
                }),
                /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white/[0.02] border-t border-white/5 mt-1.5 rounded-b-xl flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold text-brand-gold uppercase tracking-widest flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: t("common:strategyTipsTitle") }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: getNewTip,
                        className: "text-[9px] lowercase border border-brand-gold/30 px-2 py-0.5 rounded text-brand-gold hover:bg-brand-gold/20 transition-all font-bold tracking-normal leading-none",
                        children: t("common:swapTip")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[11.5px] text-brand-text-sub font-normal leading-relaxed text-balance", children: [
                    '"',
                    tips[currentTipIndex],
                    '"'
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowInfoModal(true),
              "aria-label": "Thông tin website",
              className: cn(
                "w-9 h-9 rounded-lg bg-brand-card border flex items-center justify-center text-brand-text-sub hover:text-white transition-all",
                showInfoModal ? "border-brand-gold/30 text-brand-gold bg-brand-gold/5" : "border-brand-border hover:border-white/10"
              ),
              children: /* @__PURE__ */ jsx(Info, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden xl:block w-[1px] h-5 bg-white/10" }),
        user ? /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowDropdown(!showDropdown),
              "aria-label": t("nav:profile"),
              "aria-expanded": showDropdown,
              className: "flex items-center gap-3 focus:outline-none p-1 rounded-xl hover:bg-white/5 transition-all text-left",
              children: [
                /* @__PURE__ */ jsx("img", { src: user.avatar, alt: "Avatar", className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 object-cover" }),
                /* @__PURE__ */ jsxs("div", { className: "hidden md:block", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[13px] font-semibold text-white leading-none", children: user.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub opacity-50 mt-1.5 uppercase tracking-wider font-semibold", children: t("auth:member") })
                ] })
              ]
            }
          ),
          showDropdown && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-56 rounded-xl border border-brand-border bg-brand-card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-3 border-b border-white/5 mb-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[13px] font-bold text-white truncate", children: user.name }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub truncate mt-0.5", children: user.email })
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/ho-so",
                onClick: () => setShowDropdown(false),
                className: "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-text-sub hover:text-white hover:bg-white/5 transition-colors font-medium",
                children: [
                  /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
                  t("nav:profile")
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/admin",
                onClick: () => setShowDropdown(false),
                className: "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-text-sub hover:text-white hover:bg-white/5 transition-colors font-medium",
                children: [
                  /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4" }),
                  t("nav:admin")
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "my-1.5 h-[1px] bg-white/5" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setShowDropdown(false);
                  triggerLogout();
                },
                className: "flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-red hover:bg-brand-red/10 transition-colors font-semibold",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
                  t("auth:logout")
                ]
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: openLogin,
              className: "h-9 sm:h-10 px-3 sm:px-4 rounded-xl text-[11px] sm:text-[12px] font-bold capitalize tracking-normal bg-transparent border-white/10 text-brand-text-sub hover:text-white",
              children: t("auth:login")
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "default",
              onClick: openRegister,
              className: "hidden xl:inline-flex h-9 sm:h-10 px-3 sm:px-4 rounded-xl text-[11px] sm:text-[12px] font-bold capitalize tracking-normal",
              children: t("auth:register")
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: showInfoModal, onOpenChange: setShowInfoModal, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[480px] border border-brand-border bg-brand-card p-6 sm:p-8 rounded-xl shadow-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "flex flex-col items-center text-center space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-[0_0_15px_rgba(245,180,60,0.1)]", children: /* @__PURE__ */ jsx(Info, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 w-full", children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl font-bold tracking-tight text-white", children: t("common:infoSupportTitle") }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5 mt-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setActiveTab("info"),
                className: cn(
                  "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                  activeTab === "info" ? "bg-brand-gold text-black" : "text-brand-text-sub hover:text-white"
                ),
                children: t("common:infoTabGeneral")
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setActiveTab("rates"),
                className: cn(
                  "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                  activeTab === "rates" ? "bg-brand-gold text-black" : "text-brand-text-sub hover:text-white"
                ),
                children: t("common:infoTabRollRates")
              }
            )
          ] })
        ] })
      ] }),
      activeTab === "info" ? /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5 text-left animate-in fade-in duration-200", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed font-normal text-brand-text-sub", children: /* @__PURE__ */ jsx(
          Trans,
          {
            i18nKey: "common:infoIntro",
            components: { 1: /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-bold" }) }
          }
        ) }),
        /* @__PURE__ */ jsx(Separator, { className: "bg-white/5" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("common:opsStatusTitle") }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px] p-3.5 rounded-xl bg-brand-card-2 border border-brand-border", children: [
            /* @__PURE__ */ jsx("div", { className: "text-brand-text-sub font-medium", children: t("common:webVersionLabel") }),
            /* @__PURE__ */ jsx("div", { className: "text-white font-bold text-right", children: t("common:webVersionValue") }),
            /* @__PURE__ */ jsx("div", { className: "text-brand-text-sub font-medium", children: t("common:dataServerLabel") }),
            /* @__PURE__ */ jsxs("div", { className: "text-green-400 font-bold text-right flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
              t("common:statusActive")
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-brand-text-sub font-medium", children: t("common:dataPartnerLabel") }),
            /* @__PURE__ */ jsx("div", { className: "text-white font-bold text-right", children: t("common:dataPartnerValue") }),
            /* @__PURE__ */ jsx("div", { className: "text-brand-text-sub font-medium", children: t("common:releaseCountryLabel") }),
            /* @__PURE__ */ jsx("div", { className: "text-brand-gold font-bold text-right", children: t("common:countryVN") })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Separator, { className: "bg-white/5" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("common:communityLinksTitle") }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://autochessmobile.vn",
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-brand-text-sub hover:text-white transition-all text-[12.5px] font-medium",
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 font-bold", children: [
                    /* @__PURE__ */ jsx(Monitor, { className: "h-4 w-4 text-brand-gold" }),
                    t("common:linkOfficialSite")
                  ] }),
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 opacity-55" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://fb.com/groups/autochessmobilevn",
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-brand-text-sub hover:text-white transition-all text-[12.5px] font-medium",
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 font-bold", children: [
                    /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-brand-gold" }),
                    t("common:linkCommunityFB")
                  ] }),
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 opacity-55" })
                ]
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-4 text-left animate-in fade-in duration-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11.5px] text-brand-text-sub", children: t("common:rollRatesDesc") }),
        /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden border border-brand-border rounded-xl bg-brand-bg", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-[11px]", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-white/[0.02] border-b border-white/5 font-bold text-brand-text-sub text-[10px]", children: [
            /* @__PURE__ */ jsx("th", { className: "p-2 text-center", children: t("common:levelShort") }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-brand-text-sub text-center", children: "$1" }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-green-400 text-center", children: "$2" }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-blue-400 text-center", children: "$3" }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-purple-400 text-center", children: "$4" }),
            /* @__PURE__ */ jsx("th", { className: "p-2 text-brand-gold text-center", children: "$5" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-white/5 font-mono text-brand-text-sub text-center", children: rollRates.map((r, i) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/[0.015]", children: [
            /* @__PURE__ */ jsxs("td", { className: "p-2 font-bold bg-white/[0.005] font-sans text-brand-gold", children: [
              "Lvl ",
              r.lvl
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: r.c1 }),
            /* @__PURE__ */ jsx("td", { className: "p-2 text-green-500/80", children: r.c2 }),
            /* @__PURE__ */ jsx("td", { className: "p-2 text-blue-400/80", children: r.c3 }),
            /* @__PURE__ */ jsx("td", { className: "p-2 text-purple-400/80", children: r.c4 }),
            /* @__PURE__ */ jsx("td", { className: "p-2 text-brand-gold/80", children: r.c5 || r.r5 })
          ] }, i)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(DialogFooter, { className: "mt-8", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "default",
          onClick: () => setShowInfoModal(false),
          className: "w-full h-11 rounded-xl font-semibold shadow-lg shadow-brand-gold/10",
          children: t("common:gotIt")
        }
      ) })
    ] }) })
  ] });
}
function Footer() {
  const { t } = useTranslation(["footer", "nav"]);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-brand-border bg-brand-card/50 mt-auto", children: [
    /* @__PURE__ */ jsx(PageContainer, { className: "py-8 pb-20 xl:hidden", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "block", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-bold text-lg tracking-tight leading-none", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "Auto" }),
          /* @__PURE__ */ jsx("span", { className: "text-brand-gold", children: "Chess" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub font-medium mt-1", children: "Mobile.vn" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed", children: t("footer:taglineMobile") }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]", children: FOOTER_MOBILE_QUICK_LINKS.map((link, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
        i > 0 && /* @__PURE__ */ jsx("span", { className: "text-brand-border", children: "·" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: link.path,
            className: "text-brand-text-sub hover:text-brand-gold transition-colors",
            children: t(`nav:${link.labelKey}`)
          }
        )
      ] }, link.path)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://fb.com/groups/autochessmobilevn",
            target: "_blank",
            rel: "noreferrer",
            className: "w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors",
            "aria-label": t("footer:ariaFacebook"),
            children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://autochessmobile.vn",
            target: "_blank",
            rel: "noreferrer",
            className: "w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors",
            "aria-label": t("footer:ariaOfficialSite"),
            children: /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com",
            target: "_blank",
            rel: "noreferrer",
            className: "w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors",
            "aria-label": t("footer:ariaGithub"),
            children: /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub", children: t("footer:copyrightMobile", { year }) })
    ] }) }),
    /* @__PURE__ */ jsxs(PageContainer, { className: "hidden xl:block py-10 sm:py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "block", children: [
            /* @__PURE__ */ jsxs("div", { className: "font-bold text-lg tracking-tight leading-none", children: [
              /* @__PURE__ */ jsx("span", { className: "text-white", children: "Auto" }),
              /* @__PURE__ */ jsx("span", { className: "text-brand-gold", children: "Chess" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub font-medium mt-1", children: "Mobile.vn" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed max-w-xs", children: t("footer:taglineDesktop") }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://fb.com/groups/autochessmobilevn",
                target: "_blank",
                rel: "noreferrer",
                className: "w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors",
                "aria-label": t("footer:ariaFacebook"),
                children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://autochessmobile.vn",
                target: "_blank",
                rel: "noreferrer",
                className: "w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors",
                "aria-label": t("footer:ariaOfficialSite"),
                children: /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://github.com",
                target: "_blank",
                rel: "noreferrer",
                className: "w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors",
                "aria-label": t("footer:ariaGithub"),
                children: /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-4", children: t("footer:sectionLibrary") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: FOOTER_LIBRARY_LINKS.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: link.path,
              className: "text-[13px] text-brand-text-sub hover:text-white transition-colors",
              children: t(`nav:${link.labelKey}`)
            }
          ) }, link.path)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-4", children: t("footer:sectionTools") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: FOOTER_TOOL_LINKS.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: link.path,
              className: "text-[13px] text-brand-text-sub hover:text-white transition-colors",
              children: t(`nav:${link.labelKey}`)
            }
          ) }, link.path)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-4", children: t("footer:sectionExplore") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: FOOTER_EXPLORE_LINKS.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: link.path,
              className: "text-[13px] text-brand-text-sub hover:text-white transition-colors",
              children: t(`nav:${link.labelKey}`)
            }
          ) }, link.path)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Separator, { className: "my-8 bg-brand-border" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[12px] text-brand-text-sub", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          t("footer:webVersion"),
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-white font-semibold", children: "v1.4.2" }),
          /* @__PURE__ */ jsx("span", { className: "mx-2 text-brand-border", children: "·" }),
          t("footer:disclaimer")
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[11px]", children: [
          t("footer:copyright", { year }),
          " ",
          t("footer:dataPartner")
        ] })
      ] })
    ] })
  ] });
}
const ADMIN_ITEM_KEYS = [
  { labelKey: "adminOverview", path: "/admin", icon: LayoutDashboard },
  { labelKey: "heroes", path: "/admin/tuong", icon: Swords },
  { labelKey: "adminPosts", path: "/admin/bai-viet", icon: FileText },
  { labelKey: "adminComments", path: "/admin/binh-luan", icon: MessageSquare },
  { labelKey: "adminSettings", path: "/admin/cai-dat", icon: Settings },
  { labelKey: "backToHome", path: "/", icon: Home }
];
function MobileNav({
  hideAt = "xl",
  onMenuOpen,
  isMenuOpen = false,
  onHubOpen,
  openHubKey = null
}) {
  const location = useLocation();
  const { t } = useTranslation("nav");
  const mobileTabItems = useMobileTabItems();
  const isAdmin = location.pathname.startsWith("/admin");
  const hideClass = hideAt === "lg" ? "lg:hidden" : "xl:hidden";
  if (isAdmin) {
    return /* @__PURE__ */ jsx(
      "nav",
      {
        className: cn(
          "fixed bottom-0 left-0 right-0 h-14 bg-brand-bg/90 backdrop-blur-xl border-t border-brand-border z-40 flex items-center justify-around px-1 safe-area-pb",
          hideClass
        ),
        children: ADMIN_ITEM_KEYS.map((item) => /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: item.path,
            end: item.path === "/admin" || item.path === "/",
            className: ({ isActive }) => cn(
              "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full py-1 rounded-lg transition-all duration-200",
              isActive ? "text-brand-gold bg-brand-gold/10" : "text-brand-text-sub hover:text-white"
            ),
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5 stroke-[2px] shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium tracking-tight text-center line-clamp-1 px-1", children: t(item.labelKey) })
            ]
          },
          item.path
        ))
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cn(
        "fixed bottom-0 left-0 right-0 h-14 bg-brand-bg/90 backdrop-blur-xl border-t border-brand-border z-40 flex items-center justify-around px-1 safe-area-pb",
        hideClass
      ),
      children: mobileTabItems.map((item) => {
        const active = isMobileTabActive(
          item,
          location.pathname,
          isMenuOpen,
          openHubKey
        );
        if (item.action === "menu") {
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: onMenuOpen,
              className: cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full py-1 rounded-lg transition-all duration-200",
                active ? "text-brand-gold bg-brand-gold/10" : "text-brand-text-sub hover:text-white"
              ),
              "aria-label": t("openMenuAria"),
              "aria-expanded": isMenuOpen,
              children: [
                /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5 stroke-[2px] shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium tracking-tight text-center line-clamp-1 px-1", children: item.name })
              ]
            },
            "menu"
          );
        }
        if (item.action === "hub" && item.hubKey) {
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => onHubOpen == null ? void 0 : onHubOpen(item.hubKey),
              className: cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full py-1 rounded-lg transition-all duration-200",
                active ? "text-brand-gold bg-brand-gold/10" : "text-brand-text-sub hover:text-white"
              ),
              "aria-label": item.name,
              "aria-expanded": openHubKey === item.hubKey,
              children: [
                /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5 stroke-[2px] shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium tracking-tight text-center line-clamp-1 px-1", children: item.name })
              ]
            },
            item.hubKey
          );
        }
        return /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: item.path,
            end: item.exact,
            className: cn(
              "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full py-1 rounded-lg transition-all duration-200",
              active ? "text-brand-gold bg-brand-gold/10" : "text-brand-text-sub hover:text-white"
            ),
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5 stroke-[2px] shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium tracking-tight text-center line-clamp-1 px-1", children: item.name })
            ]
          },
          item.path
        );
      })
    }
  );
}
function MobileSearchSheet({ open, onOpenChange }) {
  const [query, setQuery] = React.useState("");
  const { t, i18n: i18n2 } = useTranslation(["common", "nav"]);
  const links2 = React.useMemo(
    () => getQuickSearchLinks().map((link) => ({
      ...link,
      name: t(`nav:${link.labelKey}`)
    })),
    [t, i18n2.language]
  );
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links2;
    return links2.filter(
      (link) => link.name.toLowerCase().includes(q) || link.path.toLowerCase().includes(q)
    );
  }, [links2, query]);
  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[calc(100%-2rem)] sm:max-w-md border border-brand-border bg-brand-card p-5 sm:p-6 rounded-xl gap-4", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { className: "space-y-3 text-left", children: [
      /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg font-bold tracking-tight text-white", children: t("common:quickLookupTitle") }),
      /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub group-focus-within:text-brand-gold transition-colors" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "search",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: t("common:searchPlaceholderExtended"),
            className: "w-full bg-brand-card-2 border-brand-border pl-9 h-10 text-[13px] focus-visible:ring-1 focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold/30",
            autoFocus: true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "max-h-[50vh] overflow-y-auto custom-scrollbar -mx-1 space-y-0.5", children: filtered.length === 0 ? /* @__PURE__ */ jsx("li", { className: "px-3 py-6 text-center text-[13px] text-brand-text-sub", children: t("common:noResults") }) : filtered.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: link.path,
        onClick: () => onOpenChange(false),
        className: cn(
          "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all",
          "text-brand-text-sub hover:text-white hover:bg-white/5"
        ),
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsx(link.icon, { className: "h-4 w-4 shrink-0 text-brand-gold/80" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: link.name })
          ] }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 opacity-50" })
        ]
      }
    ) }, link.path)) })
  ] }) });
}
const TOOL_PATH_KEYS = {
  "/cong-cu/tao-doi-hinh": "teamBuilder",
  "/cong-cu/tim-doi-hinh": "compFinder",
  "/cong-cu/ban-advisor": "banAdvisor",
  "/cong-cu/so-sanh-tuong": "heroCompare",
  "/cong-cu/so-sanh-doi-hinh": "compCompare"
};
const LIBRARY_PATH_KEYS = {
  "/toc-he": "traits",
  "/tuong": "heroes",
  "/trang-bi": "items",
  "/di-vat": "relics"
};
const BLOG_PATH_KEYS = {
  "/tin-tuc": "news",
  "/thao-luan": "discussion"
};
function MobileHubSheet({ hubKey, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(["nav", "tools", "common"]);
  const navItems = useNavItems();
  const open = hubKey !== null;
  const hubNavItem = hubKey ? navItems.find((item) => item.labelKey === hubKey) : void 0;
  const items2 = (hubNavItem == null ? void 0 : hubNavItem.children) ?? [];
  const getDescription = (path) => {
    if (hubKey === "tools") {
      const key2 = TOOL_PATH_KEYS[path];
      return key2 ? t(`tools:hubDesc.${key2}`) : void 0;
    }
    if (hubKey === "blog") {
      const key2 = BLOG_PATH_KEYS[path];
      return key2 ? t(`nav:hubDesc.${key2}`) : void 0;
    }
    const key = LIBRARY_PATH_KEYS[path];
    return key ? t(`nav:hubDesc.${key}`) : void 0;
  };
  const hubTitleKey = hubKey === "tools" ? "pickTool" : hubKey === "blog" ? "pickBlogItem" : "pickLibraryItem";
  const handleSelect = (path) => {
    onClose();
    if (location.pathname !== path) {
      navigate(path);
    }
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && hubKey && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      m.button,
      {
        type: "button",
        "aria-label": t("common:closeAria"),
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
        className: "fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm xl:hidden",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs(
      m.div,
      {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", damping: 28, stiffness: 320 },
        className: "fixed left-0 right-0 bottom-14 z-[50] xl:hidden max-h-[70vh] flex flex-col rounded-t-xl border border-brand-border border-b-0 bg-brand-card shadow-2xl safe-area-pb",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-brand-border shrink-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-[15px] font-bold text-white tracking-tight", children: t(`nav:${hubTitleKey}`) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "w-8 h-8 rounded-lg bg-brand-card-2 border border-brand-border flex items-center justify-center text-brand-text-sub hover:text-white transition-colors",
                "aria-label": t("common:closeAria"),
                children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "overflow-y-auto custom-scrollbar p-2 space-y-0.5", children: items2.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            const desc = getDescription(item.path);
            return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSelect(item.path),
                className: cn(
                  "w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-left transition-all",
                  isActive ? "bg-brand-gold/10 text-brand-gold" : "text-brand-text-sub hover:text-white hover:bg-white/5"
                ),
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border",
                          isActive ? "bg-brand-gold/15 border-brand-gold/25 text-brand-gold" : "bg-brand-card-2 border-brand-border text-brand-text-sub"
                        ),
                        children: /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx("span", { className: "block text-[13px] font-semibold truncate", children: item.name }),
                      desc && /* @__PURE__ */ jsx("span", { className: "block text-[11px] text-brand-text-sub mt-0.5 line-clamp-1", children: desc })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 shrink-0 opacity-40" })
                ]
              }
            ) }, item.path);
          }) })
        ]
      }
    )
  ] }) });
}
const DEFAULT_PARTNERS = [
  { name: "Auto Chess VN Community", url: "https://facebook.com/groups/autochessmobilevn" },
  { name: "Meta Data Partner", url: "https://autochessmobile.vn" },
  { name: "Esports Vietnam", url: "" },
  { name: "Content Creator Hub", url: "" }
];
const DEFAULTS = {
  siteName: SITE_NAME,
  siteDesc: SITE_DESCRIPTION,
  maintenance: false,
  patchVersion: "Patch S20.5",
  discordUrl: "https://discord.gg/autochessvn",
  facebookUrl: "https://facebook.com/groups/autochessvietnam",
  notifText: "Giải đấu Auto Chess tranh cúp S20 sẽ diễn ra vào ngày 25/06 này!",
  donateEnabled: true,
  donateBankCode: "ICB",
  donateBankName: "VietinBank",
  donateAccountNo: "109878642716",
  donateAccountName: "LE MINH CONG",
  donateMessage: "Auto Chess Mobile VN là dự án phi lợi nhuận do cộng đồng xây dựng. Mọi đóng góp giúp duy trì máy chủ, cập nhật meta và phát triển công cụ miễn phí cho kỳ thủ Việt Nam.",
  partners: DEFAULT_PARTNERS
};
function loadSiteSettings() {
  if (typeof window === "undefined") return DEFAULTS;
  const donateEnabledRaw = localStorage.getItem("setting_donate_enabled");
  return {
    siteName: localStorage.getItem("setting_site_name") || DEFAULTS.siteName,
    siteDesc: localStorage.getItem("setting_site_desc") || DEFAULTS.siteDesc,
    maintenance: localStorage.getItem("setting_maintenance") === "true",
    patchVersion: localStorage.getItem("setting_patch_version") || DEFAULTS.patchVersion,
    discordUrl: localStorage.getItem("setting_discord_url") || DEFAULTS.discordUrl,
    facebookUrl: localStorage.getItem("setting_facebook_url") || DEFAULTS.facebookUrl,
    notifText: localStorage.getItem("setting_notif_text") || DEFAULTS.notifText,
    donateEnabled: donateEnabledRaw === null ? DEFAULTS.donateEnabled : donateEnabledRaw === "true",
    donateBankCode: localStorage.getItem("setting_donate_bank_code") || DEFAULTS.donateBankCode,
    donateBankName: localStorage.getItem("setting_donate_bank_name") || DEFAULTS.donateBankName,
    donateAccountNo: localStorage.getItem("setting_donate_account_no") || DEFAULTS.donateAccountNo,
    donateAccountName: localStorage.getItem("setting_donate_account_name") || DEFAULTS.donateAccountName,
    donateMessage: localStorage.getItem("setting_donate_message") || DEFAULTS.donateMessage,
    partners: loadJson("setting_partners", DEFAULTS.partners)
  };
}
function saveSiteSettings(settings) {
  if (typeof window === "undefined") return;
  localStorage.setItem("setting_site_name", settings.siteName);
  localStorage.setItem("setting_site_desc", settings.siteDesc);
  localStorage.setItem("setting_maintenance", String(settings.maintenance));
  localStorage.setItem("setting_patch_version", settings.patchVersion);
  localStorage.setItem("setting_discord_url", settings.discordUrl);
  localStorage.setItem("setting_facebook_url", settings.facebookUrl);
  localStorage.setItem("setting_notif_text", settings.notifText);
  localStorage.setItem("setting_donate_enabled", String(settings.donateEnabled));
  localStorage.setItem("setting_donate_bank_code", settings.donateBankCode);
  localStorage.setItem("setting_donate_bank_name", settings.donateBankName);
  localStorage.setItem("setting_donate_account_no", settings.donateAccountNo);
  localStorage.setItem("setting_donate_account_name", settings.donateAccountName);
  localStorage.setItem("setting_donate_message", settings.donateMessage);
  saveJson("setting_partners", settings.partners);
  window.dispatchEvent(new Event("site-settings-changed"));
}
function useSiteSettings() {
  const [settings, setSettings] = React.useState(DEFAULTS);
  React.useEffect(() => {
    setSettings(loadSiteSettings());
    const sync = () => setSettings(loadSiteSettings());
    window.addEventListener("site-settings-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("site-settings-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return settings;
}
const DEFAULT_PAGES_META = {
  "/": { title: "Trang chủ", description: "Cẩm nang meta Auto Chess Mobile VN" },
  "/doi-hinh": { title: "Đội hình", description: "Danh sách đội hình meta tier S–C" },
  "/toc-he": { title: "Tộc / Hệ", description: "Tra cứu synergy tộc và hệ tướng, mốc kích hoạt" },
  "/tin-tuc": { title: "Tin tức", description: "Tin tức và hướng dẫn Auto Chess" }
};
function normalizePagesMeta(raw) {
  if (Array.isArray(raw)) {
    const record = { ...DEFAULT_PAGES_META };
    for (const row of raw) {
      if (!row.path) continue;
      record[row.path] = {
        title: row.title,
        description: row.desc ?? row.description ?? ""
      };
    }
    return record;
  }
  if (raw && typeof raw === "object") {
    return { ...DEFAULT_PAGES_META, ...raw };
  }
  return DEFAULT_PAGES_META;
}
function loadSeoSettings() {
  if (typeof window === "undefined") {
    return {
      gaId: "",
      robotsTxt: "User-agent: *\nAllow: /",
      jsonLd: "",
      keywords: ["auto chess", "autochess mobile", "meta"],
      pagesMeta: DEFAULT_PAGES_META
    };
  }
  const robotsLegacy = localStorage.getItem("seo_robots");
  const jsonLegacy = localStorage.getItem("seo_schema_json");
  return {
    gaId: localStorage.getItem("seo_ga_id") || "",
    robotsTxt: localStorage.getItem("seo_robots_txt") || robotsLegacy || "User-agent: *\nAllow: /",
    jsonLd: localStorage.getItem("seo_json_ld") || jsonLegacy || "",
    keywords: loadJson("seo_keywords", ["auto chess", "autochess mobile", "meta"]),
    pagesMeta: normalizePagesMeta(loadJson("seo_pages_meta", DEFAULT_PAGES_META))
  };
}
function saveSeoSettings(settings) {
  if (typeof window === "undefined") return;
  localStorage.setItem("seo_ga_id", settings.gaId);
  localStorage.setItem("seo_robots_txt", settings.robotsTxt);
  localStorage.setItem("seo_robots", settings.robotsTxt);
  localStorage.setItem("seo_json_ld", settings.jsonLd);
  localStorage.setItem("seo_schema_json", settings.jsonLd);
  localStorage.setItem("seo_keywords", JSON.stringify(settings.keywords));
  localStorage.setItem("seo_pages_meta", JSON.stringify(settings.pagesMeta));
  window.dispatchEvent(new Event("seo-settings-changed"));
}
function useSeoSettings() {
  const [settings, setSettings] = React.useState(() => ({
    gaId: "",
    robotsTxt: "User-agent: *\nAllow: /",
    jsonLd: "",
    keywords: ["auto chess", "autochess mobile", "meta"],
    pagesMeta: DEFAULT_PAGES_META
  }));
  React.useEffect(() => {
    setSettings(loadSeoSettings());
    const sync = () => setSettings(loadSeoSettings());
    window.addEventListener("seo-settings-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("seo-settings-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return settings;
}
function useIsDesktopNav() {
  const [isDesktop, setIsDesktop] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1280px)").matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}
function Layout() {
  const location = useLocation$1();
  const settings = useSiteSettings();
  const isDesktopNav = useIsDesktopNav();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [openHubKey, setOpenHubKey] = React.useState(null);
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenHubKey(null);
  }, [location.pathname]);
  const handleHubOpen = (hubKey) => {
    setIsMobileMenuOpen(false);
    setOpenHubKey((prev) => prev === hubKey ? null : hubKey);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-brand-bg text-brand-text-main flex flex-col relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none z-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500 rounded-full blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsx(
      Sidebar,
      {
        isOpen: isMobileMenuOpen,
        onClose: () => setIsMobileMenuOpen(false),
        onOpenSearch: () => setIsSearchOpen(true),
        onOpenInfo: () => setInfoOpen(true)
      }
    ),
    /* @__PURE__ */ jsx(MobileSearchSheet, { open: isSearchOpen, onOpenChange: setIsSearchOpen }),
    /* @__PURE__ */ jsx(MobileHubSheet, { hubKey: openHubKey, onClose: () => setOpenHubKey(null) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col relative z-10 min-h-screen overflow-y-auto custom-scrollbar pt-14 sm:pt-16 pb-14 xl:pb-0", children: [
      settings.notifText && !settings.maintenance && /* @__PURE__ */ jsxs("div", { className: "bg-brand-card border-b border-brand-border px-4 py-2 text-center text-[12px] text-brand-text-sub", children: [
        /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-semibold", children: settings.patchVersion }),
        /* @__PURE__ */ jsx("span", { className: "mx-2 opacity-40", children: "·" }),
        settings.notifText
      ] }),
      settings.maintenance && /* @__PURE__ */ jsx("div", { className: "bg-brand-red/10 border-b border-brand-border px-4 py-3 text-center text-[13px] text-brand-red font-semibold", children: "Website đang bảo trì — một số tính năng có thể tạm ngưng." }),
      /* @__PURE__ */ jsx(
        Header,
        {
          onOpenSearch: () => setIsSearchOpen(true),
          infoOpen,
          onInfoOpenChange: setInfoOpen
        }
      ),
      /* @__PURE__ */ jsx("main", { id: "main-content", className: "flex-1 py-4 sm:py-6 lg:py-8", children: /* @__PURE__ */ jsx(PageContainer, { children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        m.div,
        {
          initial: isDesktopNav ? { opacity: 0, y: 12 } : false,
          animate: { opacity: 1, y: 0 },
          exit: isDesktopNav ? { opacity: 0, scale: 0.98 } : void 0,
          transition: isDesktopNav ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] } : { duration: 0.15 },
          children: /* @__PURE__ */ jsx(Outlet, {})
        },
        location.pathname
      ) }) }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(
        MobileNav,
        {
          onMenuOpen: () => {
            setOpenHubKey(null);
            setIsMobileMenuOpen(true);
          },
          isMenuOpen: isMobileMenuOpen,
          onHubOpen: handleHubOpen,
          openHubKey
        }
      )
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout
}, Symbol.toStringTag, { value: "Module" }));
function resolveOgImage(image) {
  if (!(image == null ? void 0 : image.trim())) return `${SITE_URL}/icons/pwa-512x512.png`;
  const value = image.trim();
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${SITE_URL}${value}`;
  return `${SITE_URL}/icons/pwa-512x512.png`;
}
function buildPageMeta({
  path,
  title: title2,
  description: description2,
  image,
  type = "website"
}) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage = resolveOgImage(image);
  return [
    { title: title2 },
    { name: "description", content: description2 },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title2 },
    { property: "og:description", content: description2 },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:locale", content: "vi_VN" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title2 },
    { name: "twitter:description", content: description2 },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "alternate", href: url, hrefLang: "vi" },
    { tagName: "link", rel: "alternate", href: url, hrefLang: "en" },
    { tagName: "link", rel: "alternate", href: url, hrefLang: "x-default" }
  ];
}
function staticRouteMeta(path) {
  const config = STATIC_ROUTE_META[path];
  if (!config) {
    return buildPageMeta({
      path,
      title: pageTitle$2(),
      description: SITE_DESCRIPTION
    });
  }
  return buildPageMeta(config);
}
const STATIC_ROUTE_META = {
  "/": {
    path: "/",
    title: pageTitle$2(),
    description: SITE_DESCRIPTION
  },
  "/doi-hinh": {
    path: "/doi-hinh",
    title: pageTitle$2("Đội hình"),
    description: "Danh sách đội hình meta tier S–C cho Auto Chess Mobile VN."
  },
  "/toc-he": {
    path: "/toc-he",
    title: pageTitle$2("Tộc / Hệ"),
    description: "Tra cứu synergy tộc và hệ tướng, mốc kích hoạt Auto Chess Mobile VN."
  },
  "/tuong": {
    path: "/tuong",
    title: pageTitle$2("Tướng"),
    description: "Cơ sở dữ liệu tướng Auto Chess Mobile VN — chỉ số, kỹ năng và meta."
  },
  "/trang-bi": {
    path: "/trang-bi",
    title: pageTitle$2("Trang bị"),
    description: "Thư viện trang bị Auto Chess Mobile VN — hiệu ứng và gợi ý carry."
  },
  "/di-vat": {
    path: "/di-vat",
    title: pageTitle$2("Dị vật"),
    description: "Tra cứu dị vật và hiệu ứng đặc biệt trong Auto Chess Mobile VN."
  },
  "/cong-cu": {
    path: "/cong-cu",
    title: pageTitle$2("Công cụ"),
    description: "Bộ công cụ chiến thuật: tạo đội hình, so sánh tướng, ban tộc hệ."
  },
  "/cong-cu/tao-doi-hinh": {
    path: "/cong-cu/tao-doi-hinh",
    title: pageTitle$2("Tạo đội hình"),
    description: "Công cụ tạo và chia sẻ đội hình Auto Chess Mobile VN."
  },
  "/cong-cu/tim-doi-hinh": {
    path: "/cong-cu/tim-doi-hinh",
    title: pageTitle$2("Tìm đội hình"),
    description: "Gợi ý đội hình phù hợp meta hiện tại."
  },
  "/cong-cu/ban-advisor": {
    path: "/cong-cu/ban-advisor",
    title: pageTitle$2("Ban tộc hệ"),
    description: "Tư vấn ban tộc/hệ theo lobby và meta."
  },
  "/cong-cu/so-sanh-tuong": {
    path: "/cong-cu/so-sanh-tuong",
    title: pageTitle$2("So sánh tướng"),
    description: "So sánh chỉ số và kỹ năng giữa các tướng."
  },
  "/cong-cu/so-sanh-doi-hinh": {
    path: "/cong-cu/so-sanh-doi-hinh",
    title: pageTitle$2("So sánh đội hình"),
    description: "So sánh sức mạnh và synergy giữa các đội hình."
  },
  "/tin-tuc": {
    path: "/tin-tuc",
    title: pageTitle$2("Tin tức"),
    description: "Tin tức, hướng dẫn và cập nhật meta Auto Chess Mobile VN."
  },
  "/thao-luan": {
    path: "/thao-luan",
    title: pageTitle$2("Thảo luận"),
    description: "Thảo luận chiến thuật và chia sẻ kinh nghiệm với cộng đồng."
  },
  "/bang-xep-hang": {
    path: "/bang-xep-hang",
    title: pageTitle$2("Vinh danh"),
    description: "Bảng xếp hạng và vinh danh kỳ thủ Auto Chess Mobile VN."
  },
  "/cong-dong": {
    path: "/cong-dong",
    title: pageTitle$2("Cộng đồng"),
    description: "Kênh cộng đồng và liên kết chính thức Auto Chess Mobile VN."
  },
  "/dang-bai": {
    path: "/dang-bai",
    title: pageTitle$2("Đăng bài"),
    description: "Đăng bài thảo luận lên cộng đồng Auto Chess Mobile VN."
  },
  "/ho-so": {
    path: "/ho-so",
    title: pageTitle$2("Hồ sơ"),
    description: "Quản lý hồ sơ và cài đặt cá nhân."
  }
};
const HERO_COST_BAR = {
  1: "bg-cost-1",
  2: "bg-cost-2",
  3: "bg-cost-3",
  4: "bg-cost-4",
  5: "bg-cost-5"
};
function heroCostBarClass(cost) {
  if (!cost || cost < 1 || cost > 5) return "bg-brand-text-sub";
  return HERO_COST_BAR[cost];
}
function heroCostBadgeClass(cost) {
  return cn(
    "border",
    cost === 5 && "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
    cost === 4 && "bg-cost-4/15 text-cost-4 border-cost-4/30",
    cost === 3 && "bg-cost-3/15 text-cost-3 border-cost-3/30",
    cost === 2 && "bg-cost-2/15 text-cost-2 border-cost-2/30",
    (cost === 1 || !cost) && "bg-cost-1/15 text-cost-1 border-cost-1/30"
  );
}
function heroCostBadgeOverlayClass(cost) {
  return cn(
    "border bg-brand-bg/95 backdrop-blur-sm shadow-sm rounded-md",
    cost === 5 && "text-brand-gold border-brand-gold/40",
    cost === 4 && "text-cost-4 border-cost-4/40",
    cost === 3 && "text-cost-3 border-cost-3/40",
    cost === 2 && "text-cost-2 border-cost-2/40",
    (cost === 1 || !cost) && "text-cost-1 border-cost-1/40"
  );
}
const SIZE_CLASSES = {
  xs: {
    box: "w-[30px] h-[30px] rounded-lg",
    text: "text-[9px]",
    bar: "h-0.5",
    star: "w-[6px] h-[6px]"
  },
  sm: {
    box: "w-[36px] h-[36px] rounded-lg",
    text: "text-[9px]",
    bar: "h-1",
    star: "w-[7px] h-[7px]"
  },
  md: {
    box: "w-full aspect-square rounded-xl",
    text: "text-lg",
    bar: "h-1.5",
    star: "w-[8px] h-[8px]"
  }
};
function HeroChipAvatar({
  hero,
  size,
  initials
}) {
  const [failed, setFailed] = React.useState(false);
  const src = hero ? getHeroIconUrl(hero) : void 0;
  React.useEffect(() => {
    setFailed(false);
  }, [src, hero == null ? void 0 : hero.id]);
  if (src && !failed) {
    return /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt: (hero == null ? void 0 : hero.name) ?? "",
        className: "w-full h-full object-cover",
        onError: () => setFailed(true)
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        SIZE_CLASSES[size].text,
        "font-bold text-brand-text-sub uppercase select-none",
        size !== "md" && "opacity-80"
      ),
      children: initials
    }
  );
}
function CompHeroChip({
  hero,
  size = "sm",
  isCore = false,
  isMainCore = false,
  showStars = false,
  showName = false,
  coreLabel = "CORE",
  mainCoreLabel = "MAIN",
  costLabel,
  className,
  linkable = true
}) {
  const s = SIZE_CLASSES[size];
  const initials = (hero == null ? void 0 : hero.name.substring(0, size === "md" ? 2 : size === "xs" ? 1 : 2)) ?? "?";
  const chip = /* @__PURE__ */ jsxs("div", { className: cn("relative flex-shrink-0", showName && "w-full", className), children: [
    isMainCore && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -left-1 z-20 bg-brand-gold text-black text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase leading-none shadow-[0_0_5px_rgba(245,180,60,0.5)]", children: mainCoreLabel }),
    !isMainCore && isCore && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -left-1 z-20 bg-brand-card-2 text-brand-gold border border-brand-gold/40 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase leading-none", children: coreLabel }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        title: hero == null ? void 0 : hero.name,
        className: cn(
          s.box,
          "bg-brand-bg border overflow-hidden flex items-center justify-center relative shadow-inner",
          isMainCore || isCore ? "border-brand-gold/30" : "border-brand-border",
          size === "md" && "border-2 group-hover:border-brand-gold/50 transition-all"
        ),
        children: [
          /* @__PURE__ */ jsx(HeroChipAvatar, { hero, size, initials }),
          hero && /* @__PURE__ */ jsx("div", { className: cn("absolute bottom-0 left-0 right-0", s.bar, heroCostBarClass(hero.cost)) }),
          showStars && /* @__PURE__ */ jsxs("div", { className: "absolute top-1 right-1 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsx(Star, { className: cn(s.star, "text-brand-gold fill-brand-gold") }),
            /* @__PURE__ */ jsx(Star, { className: cn(s.star, "text-brand-gold fill-brand-gold") })
          ] })
        ]
      }
    ),
    showName && hero && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-white truncate w-full uppercase leading-tight tracking-tighter mt-2", children: hero.name }),
      /* @__PURE__ */ jsx("div", { className: "text-[9px] font-bold text-brand-text-sub uppercase", children: costLabel ?? `${hero.cost} Vàng` })
    ] })
  ] });
  if (linkable && (hero == null ? void 0 : hero.id)) {
    return /* @__PURE__ */ jsx(Link, { to: `/tuong/${hero.id}`, className: "block", title: hero.name, children: chip });
  }
  return chip;
}
function CompSynergyPills({
  synergies,
  max = 2,
  className,
  size = "md"
}) {
  const active = synergies.filter((s) => s.active).slice(0, max);
  if (active.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-wrap gap-1.5", className), children: active.map((syn) => /* @__PURE__ */ jsx(
    Badge,
    {
      className: cn(
        "bg-brand-gold/10 text-brand-gold border-brand-gold/20 font-bold truncate max-w-[140px]",
        size === "sm" ? "text-[8px] px-1.5 py-0" : "text-[9px] px-2 py-0.5"
      ),
      children: syn.name
    },
    syn.name
  )) });
}
const TIER_BADGE_VARIANT = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c"
};
const TIER_RANK = {
  S: 4,
  A: 3,
  B: 2,
  C: 1
};
function getTierBadgeVariant(tier) {
  return TIER_BADGE_VARIANT[tier] ?? "tier-c";
}
function getTierRank(tier) {
  return TIER_RANK[tier] ?? 0;
}
const MAX_VISIBLE_HEROES = 8;
function CompTrendingCard({
  comp,
  heroes: heroes2,
  isFavorite,
  onToggleFavorite
}) {
  const { t } = useTranslation(["pages", "common"]);
  const tierVariant = getTierBadgeVariant(comp.tier);
  const orderedHeroIds = getOrderedCompHeroes(comp, heroes2);
  const visibleHeroIds = orderedHeroIds.slice(0, MAX_VISIBLE_HEROES);
  const overflowCount = orderedHeroIds.length - visibleHeroIds.length;
  const heroMap = new Map(heroes2.map((h) => [h.id, h]));
  return /* @__PURE__ */ jsx(Link, { to: `/doi-hinh/${comp.id}`, className: "block h-full", children: /* @__PURE__ */ jsxs(
    Card,
    {
      className: cn(
        "h-full flex flex-col p-4 gap-3",
        "hover:border-brand-gold/30 transition-all group overflow-hidden",
        "shadow-lg hover:shadow-brand-gold/5"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-brand-text-main group-hover:text-brand-gold transition-colors leading-tight tracking-tight truncate", children: comp.name }),
            /* @__PURE__ */ jsxs(Badge, { variant: tierVariant, className: "px-1.5 py-0 rounded-md text-[9px] font-bold shrink-0", children: [
              comp.tier,
              " Tier"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite();
              },
              className: "w-7 h-7 flex items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95 group/fav shrink-0",
              "aria-label": isFavorite ? "Bỏ theo dõi" : "Theo dõi",
              children: /* @__PURE__ */ jsx(
                Star,
                {
                  className: cn(
                    "w-3.5 h-3.5 transition-all",
                    isFavorite ? "text-brand-gold fill-brand-gold drop-shadow-[0_0_5px_rgba(245,180,60,0.5)]" : "text-brand-border group-hover/fav:text-brand-text-main"
                  )
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx(CompSynergyPills, { synergies: comp.synergies, max: 2, size: "sm" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 min-h-[30px]", children: [
          visibleHeroIds.map((heroId) => {
            const hero = heroMap.get(heroId);
            return /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
              CompHeroChip,
              {
                hero,
                size: "xs",
                isMainCore: comp.mainCoreId === heroId,
                linkable: false
              }
            ) }, heroId);
          }),
          overflowCount > 0 && /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-[30px] h-[30px] rounded-lg bg-brand-card-2 border border-brand-border flex items-center justify-center shrink-0",
              title: `+${overflowCount}`,
              children: /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-brand-text-sub", children: [
                "+",
                overflowCount
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto pt-3 border-t border-brand-border", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(ThumbsUp, { className: "w-3.5 h-3.5 fill-brand-gold text-brand-gold shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-bold text-[13px] leading-none", children: comp.likes }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub font-normal", children: t("pages:comps.votes") })
        ] }) })
      ]
    }
  ) });
}
const localeMap = { vi: "vi-VN", en: "en-US" };
function resolveIntlLocale(locale) {
  const lang = i18n.language;
  if (lang.startsWith("en")) return localeMap.en;
  return localeMap.vi;
}
function formatDate(date, locale) {
  return new Date(date).toLocaleDateString(resolveIntlLocale());
}
function NewsPostListItem({ post, onClick }) {
  const { t } = useTranslation(["news", "common"]);
  const readingMin = estimateReadingMinutes(post.content ?? post.excerpt ?? post.title);
  return /* @__PURE__ */ jsx(
    Card,
    {
      className: "bg-brand-card border-brand-border p-0 overflow-hidden cursor-pointer group rounded-xl hover:border-brand-gold/20 transition-colors",
      onClick,
      children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "shrink-0 w-[88px] h-[66px] sm:w-[112px] sm:h-[84px] rounded-lg overflow-hidden border border-brand-border bg-brand-card-2", children: post.coverImageUrl ? /* @__PURE__ */ jsx(
          "img",
          {
            src: post.coverImageUrl,
            alt: "",
            className: "w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300",
            loading: "lazy"
          }
        ) : /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "w-full h-full flex items-center justify-center text-[9px] font-bold text-brand-text-sub/50 px-1 text-center",
              post.image && !isPostImageUrl(post.image) ? post.image : "bg-brand-card-2"
            ),
            children: post.category
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "bg-brand-card-2 border-brand-border font-semibold text-[10px]",
              children: post.category
            }
          ) }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[15px] sm:text-[16px] leading-snug text-brand-text-main group-hover:text-brand-gold transition-colors line-clamp-2", children: post.title }),
          post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub line-clamp-2 leading-relaxed hidden sm:block", children: post.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-brand-text-sub", children: [
            /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-medium", children: post.author }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3", "aria-hidden": true }),
              post.views
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3", "aria-hidden": true }),
              t("news:readingMinutes", { n: readingMin })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3", "aria-hidden": true }),
              post.date ? formatDate(post.date) : t("common:today")
            ] })
          ] })
        ] })
      ] })
    }
  );
}
const favoritesKey = (type) => `auto_chess_favorites_${type}`;
function useFavorites(type) {
  const [favorites, setFavorites] = React.useState(
    () => loadJson(favoritesKey(type), [])
  );
  React.useEffect(() => {
    saveJson(favoritesKey(type), favorites);
  }, [favorites, type]);
  const toggleFavorite = (id) => {
    setFavorites(
      (prev) => prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };
  const isFavorite = (id) => favorites.includes(id);
  return { favorites, toggleFavorite, isFavorite };
}
function CommunityPostCard({
  post,
  onNavigate,
  onUpvote,
  upvoted,
  className
}) {
  var _a, _b;
  const { t } = useTranslation(["community"]);
  const coverImage = (_b = (_a = post.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.url;
  const visibleTags = post.tags.slice(0, 2);
  return /* @__PURE__ */ jsx(
    Card,
    {
      onClick: onNavigate,
      className: cn(
        "bg-brand-card border-brand-border p-3 sm:p-3.5 hover:border-brand-gold/20 transition-colors cursor-pointer group rounded-xl",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-0.5 shrink-0 w-9 pt-0.5", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                onUpvote == null ? void 0 : onUpvote(e);
              },
              className: cn(
                "text-brand-text-sub hover:text-brand-gold transition-colors p-0.5",
                upvoted && "text-brand-gold"
              ),
              "aria-label": t("community:like"),
              children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[12px] text-brand-text-main leading-none", children: post.likes })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-start", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-brand-text-sub min-w-0", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "w-4 h-4 rounded-full text-black font-bold flex items-center justify-center text-[9px] shrink-0",
                      post.avatar
                    ),
                    children: post.author.charAt(0)
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-brand-text-main truncate", children: post.author }),
                /* @__PURE__ */ jsxs("span", { className: "shrink-0", children: [
                  "• ",
                  post.time
                ] })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-[15px] font-semibold text-brand-text-main leading-snug line-clamp-1 group-hover:text-brand-gold transition-colors", children: post.title }),
              /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub line-clamp-1 leading-snug", children: post.content })
            ] }),
            coverImage && /* @__PURE__ */ jsx("div", { className: "shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-brand-border bg-brand-card-2", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: coverImage,
                alt: "",
                className: "w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300",
                loading: "lazy"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mt-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 min-w-0", children: [
              visibleTags.map((tag) => /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "bg-brand-card-2 text-brand-text-sub text-[10px] px-1.5 py-0 h-5",
                  children: tag
                },
                tag
              )),
              post.tags.length > 2 && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-brand-text-sub self-center", children: [
                "+",
                post.tags.length - 2
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-brand-text-sub text-[11px] font-medium shrink-0", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
              post.comments
            ] })
          ] })
        ] })
      ] })
    }
  );
}
const BANK_CODE_TO_BIN = {
  "ICB": "970415",
  "VCB": "970436",
  "BIDV": "970418",
  "VBA": "970405",
  "OCB": "970448",
  "MB": "970422",
  "TCB": "970407",
  "ACB": "970416",
  "VPB": "970432",
  "TPB": "970423",
  "STB": "970403",
  "HDB": "970437",
  "VCCB": "970454",
  "SCB": "970429",
  "VIB": "970441",
  "SHB": "970443",
  "EIB": "970431",
  "MSB": "970426",
  "CAKE": "546034",
  "Ubank": "546035",
  "VTLMONEY": "971005",
  "TIMO": "963388",
  "VNPTMONEY": "971011",
  "SGICB": "970400",
  "BAB": "970409",
  "momo": "971025",
  "PVDB": "971133",
  "PVCB": "970412",
  "MBV": "970414",
  "NCB": "970419",
  "SHBVN": "970424",
  "ABB": "970425",
  "VAB": "970427",
  "NAB": "970428",
  "PGB": "970430",
  "VIETBANK": "970433",
  "BVB": "970438",
  "SEAB": "970440",
  "COOPBANK": "970446",
  "LPB": "970449",
  "KLB": "970452",
  "KBank": "668888",
  "MAFC": "977777",
  "HLBVN": "970442",
  "KEBHANAHN": "970467",
  "KEBHANAHCM": "970466",
  "CITIBANK": "533948",
  "CBB": "970444",
  "CIMB": "422589",
  "DBS": "796500",
  "Vikki": "970406",
  "VBSP": "999888",
  "GPB": "970408",
  "KBHCM": "970463",
  "KBHN": "970462",
  "WVN": "970457",
  "VRB": "970421",
  "HSBC": "458761",
  "IBK - HN": "970455",
  "IBK - HCM": "970456",
  "IVB": "970434",
  "UOB": "970458",
  "NHB HN": "801011",
  "SCVN": "970410",
  "PBVN": "970439"
};
const NAPAS_GUID = "A000000727";
const SERVICE_CODE = "QRIBFTTA";
const CURRENCY_VND = "704";
const COUNTRY_VN = "VN";
function tlv(id, value) {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}
function crc16CcittFalse(payload) {
  let crc = 65535;
  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      if (crc & 32768) {
        crc = (crc << 1 ^ 4129) & 65535;
      } else {
        crc = crc << 1 & 65535;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}
function resolveBankBin(bankCode) {
  const trimmed = bankCode.trim();
  if (!trimmed) return null;
  if (/^\d{6}$/.test(trimmed)) return trimmed;
  if (BANK_CODE_TO_BIN[trimmed]) return BANK_CODE_TO_BIN[trimmed];
  const upper = trimmed.toUpperCase();
  const caseInsensitive = Object.entries(BANK_CODE_TO_BIN).find(
    ([key]) => key.toUpperCase() === upper
  );
  return (caseInsensitive == null ? void 0 : caseInsensitive[1]) ?? null;
}
function resolveVietQrBankId(bankCode) {
  const trimmed = bankCode.trim();
  if (!trimmed) return null;
  if (/^\d{6}$/.test(trimmed)) return trimmed;
  if (BANK_CODE_TO_BIN[trimmed]) return trimmed;
  const upper = trimmed.toUpperCase();
  const matched = Object.entries(BANK_CODE_TO_BIN).find(([key]) => key.toUpperCase() === upper);
  return (matched == null ? void 0 : matched[0]) ?? null;
}
function buildVietQrImageUrl(input, template = "compact") {
  const bankId = resolveVietQrBankId(input.donateBankCode);
  const accountNo = input.donateAccountNo.replace(/\s/g, "").trim();
  const accountName = encodeURIComponent(input.donateAccountName.trim());
  if (!bankId || !accountNo) return "";
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?accountName=${accountName}`;
}
function buildDonateQrPayload(input) {
  const bankBin = resolveBankBin(input.donateBankCode);
  const accountNumber = input.donateAccountNo.replace(/\s/g, "").trim();
  if (!bankBin || !/^\d{6}$/.test(bankBin) || !accountNumber || !/^\d+$/.test(accountNumber)) {
    return null;
  }
  const accountDetails = tlv("00", bankBin) + tlv("01", accountNumber);
  const merchantAccountInfo = tlv("00", NAPAS_GUID) + tlv("01", accountDetails) + tlv("02", SERVICE_CODE);
  const payloadWithoutCrc = tlv("00", "01") + tlv("01", "11") + tlv("38", merchantAccountInfo) + tlv("53", CURRENCY_VND) + tlv("58", COUNTRY_VN);
  const crc = crc16CcittFalse(payloadWithoutCrc + "6304");
  return payloadWithoutCrc + tlv("63", crc);
}
const OFFICIAL_TEMPLATES = ["compact", "qr_only"];
const MIN_OFFICIAL_PNG_BYTES = 2e3;
async function fetchOfficialVietQrBlob(settings, template) {
  const url = buildVietQrImageUrl(
    {
      donateBankCode: settings.bankCode,
      donateAccountNo: settings.accountNo,
      donateAccountName: settings.accountName
    },
    template
  );
  if (!url) return null;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    if (!blob.type.startsWith("image/") || blob.size < MIN_OFFICIAL_PNG_BYTES) {
      return null;
    }
    return blob;
  } catch {
    return null;
  }
}
function useOfficialVietQrImage(settings) {
  const [objectUrl, setObjectUrl] = React.useState(null);
  const [status, setStatus] = React.useState("loading");
  React.useEffect(() => {
    let cancelled = false;
    setObjectUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return null;
    });
    setStatus("loading");
    void (async () => {
      for (const template of OFFICIAL_TEMPLATES) {
        const blob = await fetchOfficialVietQrBlob(settings, template);
        if (cancelled) return;
        if (!blob) continue;
        const nextUrl = URL.createObjectURL(blob);
        setObjectUrl((previous) => {
          if (previous) URL.revokeObjectURL(previous);
          return nextUrl;
        });
        setStatus("ready");
        return;
      }
      if (!cancelled) setStatus("failed");
    })();
    return () => {
      cancelled = true;
      setObjectUrl((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return null;
      });
    };
  }, [settings.bankCode, settings.accountNo, settings.accountName]);
  return { objectUrl, status };
}
function LocalVietQr({
  payload,
  size,
  className,
  title: title2
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("inline-flex flex-col items-center bg-white", className),
      style: { width: size },
      title: title2,
      children: [
        /* @__PURE__ */ jsx(QRCodeSVG, { value: payload, size, level: "M", bgColor: "#ffffff", fgColor: "#000000" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[8px] font-semibold uppercase tracking-wide text-brand-red leading-none", children: "VietQR" })
      ]
    }
  );
}
function DonateQrImage({ settings, size, className, alt = "", title: title2 }) {
  const { objectUrl, status } = useOfficialVietQrImage(settings);
  const payload = React.useMemo(
    () => buildDonateQrPayload({
      donateBankCode: settings.bankCode,
      donateAccountNo: settings.accountNo
    }),
    [settings.bankCode, settings.accountNo]
  );
  if (!payload) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          className,
          "flex items-center justify-center rounded-xl bg-brand-card-2 text-brand-text-sub text-[11px] text-center px-2"
        ),
        style: { width: size, height: size },
        title: title2,
        children: "Cấu hình QR chưa hợp lệ"
      }
    );
  }
  if (objectUrl && status === "ready") {
    return /* @__PURE__ */ jsx(
      "img",
      {
        src: objectUrl,
        alt,
        title: title2,
        width: size,
        height: size,
        className: cn("object-contain bg-white", className)
      }
    );
  }
  return /* @__PURE__ */ jsx(LocalVietQr, { payload, size, className, title: title2 });
}
const HERO_CLASS_ALL = "all";
const BANNER_BUTTON_MOBILE_LABELS = {
  "KHÁM PHÁ ĐỘI HÌNH": "Khám phá",
  "ĐĂNG KÝ NGAY": "Đăng ký"
};
function bannerPrimaryButtonLabel(text, compact) {
  const normalized = text.trim();
  return BANNER_BUTTON_MOBILE_LABELS[normalized] ?? normalized;
}
function TitleWithAccent({ title: title2 }) {
  const parts = title2.trim().split(/\s+/);
  if (parts.length <= 1) {
    return /* @__PURE__ */ jsx("span", { className: "text-white", children: title2 });
  }
  const accent = parts.pop();
  const rest = parts.join(" ");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("span", { className: "text-white", children: [
      rest,
      " "
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-brand-gold", children: accent })
  ] });
}
function HeroSpotlightTile({ hero }) {
  const [failed, setFailed] = React.useState(false);
  const src = getHeroIconUrl(hero);
  React.useEffect(() => {
    setFailed(false);
  }, [src, hero.id]);
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: `/tuong/${hero.id}`,
      className: "group flex flex-col items-center gap-2 p-2 rounded-xl border border-brand-border bg-brand-card hover:border-brand-gold/30 transition-colors",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-square rounded-lg bg-brand-card-2 border border-brand-border overflow-hidden flex items-center justify-center", children: [
          src && !failed ? /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: hero.name,
              loading: "lazy",
              className: "w-full h-full object-cover",
              onError: () => setFailed(true)
            }
          ) : /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-brand-text-sub group-hover:text-white transition-colors", children: hero.name.charAt(0) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute bottom-0 left-0 right-0 h-1",
                heroCostBarClass(hero.cost)
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-brand-gold", children: [
            "$",
            hero.cost
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-white truncate w-full text-center group-hover:text-brand-gold transition-colors", children: hero.name })
      ]
    }
  );
}
function ToolCtaCard({
  title: title2,
  description: description2,
  ctaLabel,
  icon: Icon,
  onClick
}) {
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 sm:p-8 border-brand-border bg-brand-card overflow-hidden relative shadow-none h-full", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col justify-between gap-6 h-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[20px] sm:text-[22px] font-bold text-white tracking-tight", children: title2 }),
        /* @__PURE__ */ jsx("p", { className: "text-[14px] text-brand-text-sub leading-relaxed", children: description2 })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick,
          size: "lg",
          className: "shrink-0 w-full sm:w-auto px-8 h-12 font-semibold text-[13px] uppercase tracking-wide",
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 mr-2" }),
            ctaLabel
          ]
        }
      )
    ] })
  ] });
}
function PartnerMarqueeItem({ partner }) {
  const initial = partner.name.trim().charAt(0).toUpperCase() || "?";
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg border border-brand-border bg-brand-card-2 flex items-center justify-center overflow-hidden shrink-0", children: partner.logoUrl ? /* @__PURE__ */ jsx(
      "img",
      {
        src: partner.logoUrl,
        alt: "",
        loading: "lazy",
        className: "w-full h-full object-contain p-1.5"
      }
    ) : /* @__PURE__ */ jsx("span", { className: "text-[14px] font-bold text-brand-gold", children: initial }) }),
    /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold text-brand-text-sub group-hover:text-white transition-colors whitespace-nowrap", children: partner.name })
  ] });
  const className = "group inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-brand-border bg-brand-card hover:border-brand-gold/30 transition-colors shrink-0";
  if (partner.url) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href: partner.url,
        target: "_blank",
        rel: "noreferrer",
        className,
        "aria-label": partner.name,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className, children: content });
}
function PartnersMarquee({ partners }) {
  const { t } = useTranslation(["home"]);
  const visible = partners.filter((p) => p.name.trim());
  if (visible.length === 0) return null;
  const loop = [...visible, ...visible];
  return /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        title: t("home:partnersTitle"),
        subtitle: t("home:partnersSubtitle")
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "partners-marquee-viewport hide-scrollbar", children: /* @__PURE__ */ jsx("div", { className: "partners-marquee-track", children: loop.map((partner, index) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(PartnerMarqueeItem, { partner }) }, `${partner.name}-${index}`)) }) })
  ] });
}
function DonateSection() {
  const { t } = useTranslation(["home"]);
  const settings = useSiteSettings();
  const [copied2, setCopied] = React.useState(false);
  const [qrOpen, setQrOpen] = React.useState(false);
  if (!settings.donateEnabled) return null;
  const qrSettings = {
    bankCode: settings.donateBankCode,
    bankName: settings.donateBankName,
    accountNo: settings.donateAccountNo,
    accountName: settings.donateAccountName
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(settings.donateAccountNo);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-[14px] font-semibold text-brand-text-sub tracking-tight", children: t("home:donateTitle") }),
    /* @__PURE__ */ jsx(Card, { className: "p-4 border-brand-border bg-brand-card shadow-none", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setQrOpen(true),
          className: "rounded-lg bg-white p-1.5 border border-brand-border shrink-0 self-start cursor-pointer transition-colors hover:border-brand-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50",
          "aria-label": t("home:donateQrExpand"),
          children: /* @__PURE__ */ jsx(
            DonateQrImage,
            {
              settings: qrSettings,
              size: 72,
              className: "w-[72px] h-[72px] pointer-events-none"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(Dialog, { open: qrOpen, onOpenChange: setQrOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-sm sm:max-w-md p-6", children: [
        /* @__PURE__ */ jsxs(DialogHeader, { className: "text-center sm:text-center", children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: t("home:donateQrPopupTitle") }),
          /* @__PURE__ */ jsx(DialogDescription, { children: t("home:donateScanHint") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 py-2", children: [
          /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-white p-4 border border-brand-border", children: /* @__PURE__ */ jsx(
            DonateQrImage,
            {
              settings: qrSettings,
              size: 240,
              className: "w-[min(240px,70vw)] h-[min(240px,70vw)]",
              alt: `${settings.donateBankName} ${settings.donateAccountNo}`,
              title: `${settings.donateBankName} ${settings.donateAccountNo}`
            }
          ) }),
          /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-brand-text-sub text-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: settings.donateBankName }),
            /* @__PURE__ */ jsx("span", { className: "mx-1.5 text-brand-border", children: "·" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-gold", children: settings.donateAccountNo }),
            /* @__PURE__ */ jsx("span", { className: "mx-1.5 text-brand-border", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: settings.donateAccountName })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: handleCopy,
              className: "gap-1.5 h-9 border-brand-border hover:border-brand-gold/40",
              children: copied2 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-brand-green" }),
                t("home:donateCopied")
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
                t("home:donateCopy")
              ] })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-main leading-snug line-clamp-2", children: settings.donateMessage }),
        /* @__PURE__ */ jsxs("p", { className: "text-[12px] text-brand-text-sub", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: settings.donateBankName }),
          /* @__PURE__ */ jsx("span", { className: "mx-1.5 text-brand-border", children: "·" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-gold", children: settings.donateAccountNo }),
          /* @__PURE__ */ jsx("span", { className: "mx-1.5 text-brand-border", children: "·" }),
          /* @__PURE__ */ jsx("span", { children: settings.donateAccountName })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: handleCopy,
          className: "shrink-0 gap-1.5 h-9 border-brand-border hover:border-brand-gold/40 self-start sm:self-center",
          children: copied2 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-brand-green" }),
            t("home:donateCopied")
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
            t("home:donateCopy")
          ] })
        }
      )
    ] }) })
  ] });
}
function HomePage() {
  const { t } = useTranslation(["home", "common"]);
  const { comps: comps2, posts, banners, heroes: heroes2, communityPosts } = useAppStore();
  const siteSettings = useSiteSettings();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites("comps");
  const activeBanners = banners.filter((b) => b.status === "Hiện");
  const [currentBannerIndex, setCurrentBannerIndex] = React.useState(0);
  const [heroClassTab, setHeroClassTab] = React.useState(HERO_CLASS_ALL);
  const heroClassTabs = React.useMemo(() => {
    const classOrder = CLASSES.map((c) => c.name);
    const presentInRoster = new Set(heroes2.flatMap((h) => h.class));
    return [HERO_CLASS_ALL, ...classOrder.filter((name) => presentInRoster.has(name))];
  }, [heroes2]);
  React.useEffect(() => {
    setCurrentBannerIndex((prev) => {
      if (activeBanners.length === 0) return 0;
      return prev >= activeBanners.length ? 0 : prev;
    });
  }, [activeBanners.length]);
  React.useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5e3);
    return () => clearInterval(interval);
  }, [activeBanners.length]);
  const trendingComps = [...comps2].sort((a, b) => b.tier === "S" && a.tier !== "S" ? 1 : -1).slice(0, 5);
  const latestPosts = posts.filter((p) => p.status === "Xuất bản").slice(0, 4);
  const featuredDiscussions = React.useMemo(
    () => [...communityPosts].sort((a, b) => b.likes - a.likes).slice(0, 4),
    [communityPosts]
  );
  const filteredSpotlightHeroes = heroes2.filter((h) => {
    if (heroClassTab === HERO_CLASS_ALL) return true;
    return h.class.some((c) => c === heroClassTab);
  }).slice(0, 10);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10 pb-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl border border-brand-border bg-brand-card/80", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-gold shrink-0", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" }),
          t("home:metaBadge")
        ] }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-[13px] text-brand-text-sub truncate", children: t("home:patchNote") })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/tin-tuc",
          className: "text-[12px] font-semibold text-brand-gold hover:text-brand-gold-deep transition-colors shrink-0",
          children: t("home:viewPatchNotes")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-xl bg-brand-bg border border-brand-border group min-h-[240px] xs:min-h-[280px] sm:min-h-[380px] md:min-h-[520px] flex items-center", children: [
      activeBanners.length > 0 ? activeBanners.map((banner, index) => /* @__PURE__ */ jsxs(
        m.div,
        {
          initial: false,
          animate: { opacity: currentBannerIndex === index ? 1 : 0 },
          transition: { duration: 0.8, ease: "easeInOut" },
          className: cn(
            "absolute inset-0 w-full h-full flex items-center",
            currentBannerIndex === index ? "z-10 pointer-events-auto" : "z-0 pointer-events-none"
          ),
          "aria-hidden": currentBannerIndex !== index,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 w-full h-full overflow-hidden z-0", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: banner.image,
                  alt: banner.title,
                  className: "w-full h-full object-cover object-center md:object-center grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.01] group-hover:scale-[1.04]"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/25 z-10 md:bg-black/55" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/75 to-transparent z-10 w-[78%] md:hidden" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 hidden md:block bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent z-10" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 hidden md:block bg-gradient-to-r from-brand-bg via-brand-bg/90 to-transparent z-10 w-[85%]" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "relative z-20 w-full p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start text-left h-full max-w-3xl", children: /* @__PURE__ */ jsxs(
              m.div,
              {
                initial: false,
                animate: {
                  opacity: currentBannerIndex === index ? 1 : 0,
                  y: currentBannerIndex === index ? 0 : 20
                },
                transition: { duration: 0.6, ease: "easeOut" },
                className: "space-y-2.5 md:space-y-6 flex flex-col items-start w-full max-w-[min(100%,18rem)] sm:max-w-xs md:max-w-2xl",
                children: [
                  banner.subtitle && /* @__PURE__ */ jsxs("span", { className: "hidden md:inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded-md leading-none w-fit", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" }),
                    banner.subtitle
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-3.5 w-full md:contents", children: [
                    /* @__PURE__ */ jsx("h1", { className: "w-full min-w-0 text-[18px] xs:text-[20px] sm:text-[26px] md:text-[44px] lg:text-[52px] leading-tight font-bold tracking-tight line-clamp-1 md:line-clamp-none md:uppercase max-w-2xl", children: /* @__PURE__ */ jsx(TitleWithAccent, { title: banner.title }) }),
                    banner.primaryButtonText && /* @__PURE__ */ jsx(
                      Button,
                      {
                        size: "sm",
                        onClick: () => navigate(banner.primaryButtonLink),
                        className: "self-start h-9 px-3.5 w-auto md:hidden font-semibold text-[11px] normal-case tracking-normal shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/30",
                        children: bannerPrimaryButtonLabel(banner.primaryButtonText)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "hidden md:block text-brand-text-sub text-[14px] md:text-[15px] max-w-lg font-normal leading-relaxed opacity-90 text-balance", children: banner.description }),
                  /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-wrap items-center justify-start gap-3 sm:gap-4 pt-1 w-full sm:w-auto", children: [
                    banner.primaryButtonText && /* @__PURE__ */ jsx(
                      Button,
                      {
                        onClick: () => navigate(banner.primaryButtonLink),
                        className: "h-11 sm:min-w-[140px] md:h-12 md:px-8 md:min-w-[140px] font-semibold text-[12px] md:text-[13px] uppercase tracking-wide shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/30",
                        children: banner.primaryButtonText
                      }
                    ),
                    banner.secondaryButtonText && /* @__PURE__ */ jsx(
                      Button,
                      {
                        onClick: () => navigate(banner.secondaryButtonLink),
                        variant: "outline",
                        className: "min-w-[140px] px-8 h-12 font-semibold text-[13px] uppercase tracking-wide bg-white/10 border-white/25 text-white hover:bg-white/15 hover:border-white/40",
                        children: banner.secondaryButtonText
                      }
                    )
                  ] })
                ]
              }
            ) })
          ]
        },
        banner.id
      )) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center p-12 text-center text-brand-text-sub", children: /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub font-semibold uppercase tracking-widest text-xs", children: t("home:noBanners") }) }),
      activeBanners.length > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-10 md:left-16 md:translate-x-0 flex items-center gap-3 z-50", children: activeBanners.map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentBannerIndex(index),
          className: "group py-2 md:py-4 px-1 outline-none",
          "aria-label": t("home:slideAria", { n: index + 1 }),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "h-1.5 rounded-full transition-all duration-500",
                currentBannerIndex === index ? "bg-brand-gold w-12 shadow-[0_0_15px_rgba(245,180,60,0.6)]" : "bg-white/15 w-3 group-hover:bg-white/40"
              )
            }
          )
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      { label: t("home:stats.comps"), value: comps2.length.toString(), sub: t("home:stats.compsSub"), trend: "+12%" },
      { label: t("home:stats.votes"), value: "245.6K", sub: t("home:stats.votesSub"), trend: "+8.4%" },
      { label: t("home:stats.users"), value: "85.3K", sub: t("home:stats.usersSub"), trend: "+5.1%" },
      { label: t("home:stats.posts"), value: posts.length.toString(), sub: t("home:stats.postsSub"), trend: "+3.2%" }
    ].map((stat, i) => /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border py-5 px-4 shadow-none hover:border-brand-gold/20 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx("div", { className: "text-brand-gold text-[11px] font-semibold uppercase tracking-wide", children: stat.label }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-0.5 text-[10px] font-bold text-brand-green", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3" }),
          stat.trend
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-[26px] font-bold text-white mb-1", children: stat.value }),
      /* @__PURE__ */ jsx("div", { className: "text-[12px] text-brand-text-sub font-normal", children: stat.sub })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        SectionHeader,
        {
          title: t("home:trendingCompsTitle"),
          subtitle: t("home:trendingCompsSubtitle"),
          onAction: () => navigate("/doi-hinh")
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4", children: trendingComps.map((comp, idx) => /* @__PURE__ */ jsx(
        m.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.1 },
          className: "h-full",
          children: /* @__PURE__ */ jsx(
            CompTrendingCard,
            {
              comp,
              heroes: heroes2,
              isFavorite: isFavorite(comp.id),
              onToggleFavorite: () => toggleFavorite(comp.id)
            }
          )
        },
        comp.id
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(SectionHeader, { title: t("home:featuredHeroesTitle"), actionHref: "/tuong" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto hide-scrollbar pb-1", children: heroClassTabs.map((tab) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setHeroClassTab(tab),
          className: cn(
            "px-4 py-2 rounded-xl text-[12px] font-semibold transition-all border shrink-0",
            heroClassTab === tab ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card border-brand-border text-brand-text-sub hover:text-white hover:border-brand-gold/30"
          ),
          children: tab === HERO_CLASS_ALL ? t("common:all") : tab
        },
        tab
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-3", children: filteredSpotlightHeroes.map((hero) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(HeroSpotlightTile, { hero }) }, hero.id)) })
    ] }),
    featuredDiscussions.length > 0 && /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        SectionHeader,
        {
          title: t("home:featuredDiscussionsTitle"),
          actionHref: "/thao-luan"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: featuredDiscussions.map((post) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
        CommunityPostCard,
        {
          post,
          onNavigate: () => navigate(`/thao-luan/${post.id}`)
        }
      ) }, post.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(SectionHeader, { title: t("home:latestPostsTitle"), actionHref: "/tin-tuc" }),
      /* @__PURE__ */ jsx(Card, { className: "divide-y divide-brand-border shadow-none border-brand-border", children: latestPosts.map((article, i) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
        NewsPostListItem,
        {
          post: article,
          onClick: () => navigate(`/tin-tuc/${article.id}`)
        }
      ) }, article.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(
        ToolCtaCard,
        {
          title: t("home:buildCompTitle"),
          description: t("home:buildCompDesc"),
          ctaLabel: t("home:buildCompCta"),
          icon: LayoutGrid,
          onClick: () => navigate("/cong-cu/tao-doi-hinh")
        }
      ),
      /* @__PURE__ */ jsx(
        ToolCtaCard,
        {
          title: t("home:findCompTitle"),
          description: t("home:findCompDesc"),
          ctaLabel: t("home:findCompCta"),
          icon: Search,
          onClick: () => navigate("/cong-cu/tim-doi-hinh")
        }
      )
    ] }),
    /* @__PURE__ */ jsx(PartnersMarquee, { partners: siteSettings.partners }),
    /* @__PURE__ */ jsx(DonateSection, {})
  ] });
}
function meta$I() {
  return staticRouteMeta("/");
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage,
  meta: meta$I
}, Symbol.toStringTag, { value: "Module" }));
function PageHeader({
  title: title2,
  description: description2,
  icon: Icon,
  children,
  className,
  showAccent = true
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold tracking-tight mb-2 text-white flex items-center gap-3", children: [
            Icon ? /* @__PURE__ */ jsx("span", { className: "w-10 h-10 rounded-xl border border-brand-border bg-brand-card flex items-center justify-center shrink-0 text-brand-gold", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5", "aria-hidden": true }) }) : showAccent ? /* @__PURE__ */ jsx("div", { className: "w-2 h-8 bg-gold-gradient rounded-sm shrink-0", "aria-hidden": true }) : null,
            title2
          ] }),
          description2 && /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub font-normal max-w-2xl", children: description2 })
        ] }),
        children && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-3 shrink-0", children })
      ]
    }
  );
}
const SIZE_CLASS = {
  sm: "w-10 h-10 text-[10px]",
  md: "w-16 h-16 text-sm",
  lg: "w-[72px] h-[72px] text-base"
};
function HeroIcon({ hero, size = "md", className }) {
  const [failed, setFailed] = React.useState(false);
  const src = getHeroIconUrl(hero);
  React.useEffect(() => {
    setFailed(false);
  }, [src, hero.id]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "rounded-xl overflow-hidden bg-brand-card-2 border border-brand-border shrink-0 flex items-center justify-center",
        SIZE_CLASS[size],
        className
      ),
      children: src && !failed ? /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: hero.name,
          className: "w-full h-full object-cover",
          onError: () => setFailed(true)
        }
      ) : /* @__PURE__ */ jsx("span", { className: "font-bold text-brand-text-sub", children: hero.name.charAt(0) })
    }
  );
}
const MAX_COMPARE_ITEMS = 3;
function CompareTray({
  type,
  selectedIds,
  items: items2,
  comparePath,
  onRemove,
  onClear
}) {
  const { t } = useTranslation(["common", "tools"]);
  const navigate = useNavigate();
  if (selectedIds.length === 0) return null;
  const canCompare = selectedIds.length >= 2;
  const handleCompare = () => {
    if (!canCompare) return;
    navigate(`${comparePath}?ids=${selectedIds.join(",")}`);
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
    m.div,
    {
      initial: { y: 80, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 80, opacity: 0 },
      transition: { type: "spring", stiffness: 380, damping: 32 },
      className: cn(
        "fixed left-0 right-0 z-50 border-t border-brand-border bg-brand-card/95 backdrop-blur-xl shadow-2xl",
        "bottom-14 xl:bottom-0 safe-area-pb"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1 overflow-x-auto hide-scrollbar", children: [
          items2.map((item) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative shrink-0 flex items-center gap-2 bg-brand-card-2 border border-brand-border rounded-xl pl-1 pr-2 py-1",
              children: [
                type === "hero" && item.hero ? /* @__PURE__ */ jsx(HeroIcon, { hero: item.hero, size: "sm" }) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center shrink-0", children: item.tier && /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: getTierBadgeVariant(item.tier),
                    className: "text-[9px] px-1 py-0",
                    children: item.tier
                  }
                ) }),
                /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-brand-text-main max-w-[88px] truncate", children: item.name }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onRemove(item.id),
                    className: "w-5 h-5 flex items-center justify-center rounded-md text-brand-text-sub hover:text-white hover:bg-brand-card transition-colors",
                    "aria-label": t("common:removeItem", { name: item.name }),
                    children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ]
            },
            item.id
          )),
          selectedIds.length < MAX_COMPARE_ITEMS && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub shrink-0 px-1", children: t("tools:compare.trayHint", { count: selectedIds.length, max: MAX_COMPARE_ITEMS }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onClear,
              className: "text-brand-text-sub hover:text-white text-[12px] font-semibold hidden sm:inline-flex",
              children: t("tools:compare.clearAll")
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: handleCompare,
              disabled: !canCompare,
              className: "h-10 px-4 rounded-xl font-semibold text-sm gap-2 bg-gold-gradient text-black disabled:opacity-40",
              children: [
                /* @__PURE__ */ jsx(Scale, { className: "w-4 h-4" }),
                t("tools:compare.compareButton", {
                  count: selectedIds.length,
                  max: MAX_COMPARE_ITEMS
                })
              ]
            }
          )
        ] })
      ] })
    }
  ) });
}
function useCompareSelection(options = {}) {
  const [compareMode, setCompareMode] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const toggleCompareMode = React.useCallback(() => {
    setCompareMode((prev) => {
      if (prev) setSelectedIds([]);
      return !prev;
    });
  }, []);
  const toggleSelect = React.useCallback(
    (id) => {
      setSelectedIds((prev) => {
        var _a;
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= MAX_COMPARE_ITEMS) {
          (_a = options.onMaxReached) == null ? void 0 : _a.call(options);
          return prev;
        }
        return [...prev, id];
      });
    },
    [options]
  );
  const removeItem2 = React.useCallback((id) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }, []);
  const clearSelection = React.useCallback(() => {
    setSelectedIds([]);
  }, []);
  return {
    compareMode,
    selectedIds,
    toggleCompareMode,
    toggleSelect,
    removeItem: removeItem2,
    clearSelection,
    hasSelection: selectedIds.length > 0
  };
}
function FilterSearchInput({
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("relative w-full sm:flex-1 sm:min-w-[140px] sm:max-w-[240px] group", className), children: [
    /* @__PURE__ */ jsx(
      Search,
      {
        className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub group-focus-within:text-brand-gold transition-colors",
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "search",
        placeholder,
        "aria-label": ariaLabel ?? placeholder,
        value,
        onChange: (e) => onChange(e.target.value),
        className: "pl-9 h-9 rounded-xl bg-brand-bg border-brand-border text-sm focus:ring-1 focus:ring-brand-gold/30"
      }
    )
  ] });
}
function FilterSelect({
  value,
  onValueChange,
  options,
  placeholder,
  "aria-label": ariaLabel,
  className,
  size = "sm"
}) {
  return /* @__PURE__ */ jsxs(Select, { value, onValueChange, children: [
    /* @__PURE__ */ jsx(
      SelectTrigger,
      {
        size,
        className: cn("h-9 min-w-[108px] max-w-[148px] shrink-0 rounded-xl", className),
        "aria-label": ariaLabel,
        children: /* @__PURE__ */ jsx(SelectValue, { placeholder })
      }
    ),
    /* @__PURE__ */ jsx(SelectContent, { children: options.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
  ] });
}
function FilterChipGroup({
  options,
  selected,
  onSelect,
  label,
  "aria-label": ariaLabel,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("flex flex-wrap items-center gap-1.5 shrink-0", className),
      role: "group",
      "aria-label": ariaLabel ?? label,
      children: [
        label && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub font-medium shrink-0", children: label }),
        options.map((option) => {
          const isActive = selected === option.value;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-pressed": isActive,
              onClick: () => onSelect(isActive ? null : option.value),
              className: cn(
                "h-8 min-w-[2rem] px-2 rounded-lg border flex items-center justify-center font-bold text-xs transition-colors shrink-0",
                isActive ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:text-brand-text-main"
              ),
              children: option.label
            },
            option.value
          );
        })
      ]
    }
  );
}
function FilterClearButton({ visible, onClick, className }) {
  const { t } = useTranslation("common");
  if (!visible) return null;
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      variant: "outline",
      onClick,
      className: cn(
        "h-9 px-3 rounded-xl border-brand-border text-xs font-semibold shrink-0 hover:bg-brand-card-2",
        className
      ),
      children: t("clearFilters")
    }
  );
}
function FilterToolbarRow({ children, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex flex-wrap items-center gap-2 w-full",
        className
      ),
      children
    }
  );
}
function FilterResultMeta({ shown, total, className }) {
  const { t } = useTranslation("common");
  return /* @__PURE__ */ jsx("p", { className: cn("text-[12px] text-brand-text-sub font-medium", className), children: t("resultsCount", { shown, total }) });
}
function FilterToolbar({ children, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "bg-brand-card p-3 rounded-xl border border-brand-border",
        className
      ),
      children
    }
  );
}
function normalizeTab(tab) {
  return typeof tab === "string" ? { id: tab, label: tab } : tab;
}
function UnderlineTabs({
  tabs,
  activeTab,
  onTabChange,
  layoutId = "activeTab",
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("border-b border-brand-border pt-2 flex overflow-x-auto hide-scrollbar", className), children: /* @__PURE__ */ jsx("div", { className: "flex gap-8 -mb-px px-2", children: tabs.map((tab) => {
    const { id, label } = normalizeTab(tab);
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onTabChange(id),
        className: cn(
          "py-4 text-[13px] font-semibold tracking-wide border-b-2 transition-all relative whitespace-nowrap",
          activeTab === id ? "border-brand-gold text-brand-gold" : "border-transparent text-brand-text-sub hover:text-white"
        ),
        children: [
          label,
          activeTab === id && /* @__PURE__ */ jsx(
            m.div,
            {
              layoutId,
              className: "absolute bottom-[-2px] left-0 right-0 h-0.5 bg-brand-gold"
            }
          )
        ]
      },
      id
    );
  }) }) });
}
function CompHeroStrip({ heroIds, heroes: heroes2, coreIds = [], className }) {
  const heroMap = new Map(heroes2.map((h) => [h.id, h]));
  const coreSet = new Set(coreIds);
  return /* @__PURE__ */ jsx("div", { className: cn("flex items-center gap-1 overflow-x-auto hide-scrollbar min-w-0", className), children: heroIds.map((heroId) => {
    const hero = heroMap.get(heroId);
    return /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
      CompHeroChip,
      {
        hero,
        size: "xs",
        isCore: coreSet.has(heroId)
      }
    ) }, heroId);
  }) });
}
function CompStatsInline({
  likes,
  winRate,
  top4Rate = "62.7%",
  votesLabel = "Bình chọn",
  top1Label = "Top 1",
  top4Label = "Top 4",
  tier,
  tierLabel,
  layout = "stacked",
  className
}) {
  if (layout === "grid") {
    return /* @__PURE__ */ jsxs("div", { className: cn("grid grid-cols-3 gap-2 pt-4 border-t border-brand-border", className), children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 text-left flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-brand-gold font-semibold text-[13px] mb-1", children: [
          /* @__PURE__ */ jsx(ThumbsUp, { className: "w-3.5 h-3.5 mr-1.5" }),
          " ",
          likes
        ] }),
        tier ? /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: tier === "S" ? "tier-s" : tier === "A" ? "tier-a" : tier === "B" ? "tier-b" : "tier-c",
            className: "w-fit font-bold",
            children: [
              tier,
              " ",
              tierLabel
            ]
          }
        ) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-brand-text-sub font-normal", children: votesLabel })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 text-center border-l flex flex-col justify-center border-brand-border", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-[15px] font-bold text-white leading-none mb-1", children: winRate }),
        /* @__PURE__ */ jsx("span", { className: "block text-[11px] text-brand-text-sub font-normal", children: top1Label })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 text-center border-l flex flex-col justify-center border-brand-border", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-[15px] font-bold text-white leading-none mb-1", children: top4Rate }),
        /* @__PURE__ */ jsx("span", { className: "block text-[11px] text-brand-text-sub font-normal", children: top4Label })
      ] })
    ] });
  }
  if (layout === "inline") {
    return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2 shrink-0", className), children: [
      /* @__PURE__ */ jsxs(
        "span",
        {
          title: votesLabel,
          className: "flex items-center gap-1 text-brand-gold font-bold text-[12px] leading-none",
          children: [
            /* @__PURE__ */ jsx(ThumbsUp, { className: "w-3 h-3 fill-brand-gold shrink-0" }),
            likes
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-brand-border text-[12px] leading-none", children: "·" }),
      /* @__PURE__ */ jsx("span", { title: top1Label, className: "text-brand-text-main font-bold text-[12px] leading-none", children: winRate })
    ] });
  }
  if (layout === "sidebar") {
    return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col items-center justify-center gap-2.5 w-full", className), children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 text-brand-gold font-bold text-[13px] leading-none mb-0.5", children: [
          /* @__PURE__ */ jsx(ThumbsUp, { className: "w-3.5 h-3.5 fill-brand-gold shrink-0" }),
          likes
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-[9px] text-brand-text-sub uppercase font-bold tracking-wider", children: votesLabel })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[13px] font-bold text-white leading-none mb-0.5", children: winRate }),
        /* @__PURE__ */ jsx("div", { className: "text-[9px] text-brand-text-sub uppercase font-bold tracking-wider", children: top1Label })
      ] })
    ] });
  }
  if (layout === "row") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "flex items-center justify-between gap-6 md:flex-col md:justify-center md:gap-4",
          className
        ),
        children: [
          /* @__PURE__ */ jsx(StatBlock, { value: likes, label: votesLabel, icon: true }),
          /* @__PURE__ */ jsx(StatBlock, { value: winRate, label: top1Label }),
          /* @__PURE__ */ jsx(StatBlock, { value: top4Rate, label: top4Label })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center gap-4 md:pl-6 md:border-l border-brand-border",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(StatBlock, { value: likes, label: votesLabel, icon: true, centered: true }),
        /* @__PURE__ */ jsx(StatBlock, { value: winRate, label: top1Label, centered: true })
      ]
    }
  );
}
function StatBlock({
  value,
  label,
  icon,
  centered
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("text-center", centered && "w-full"), children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "mb-1 font-bold leading-none",
          icon ? "flex justify-center items-center gap-2 text-brand-gold text-lg" : "text-xl text-white"
        ),
        children: [
          icon && /* @__PURE__ */ jsx(ThumbsUp, { className: "w-4 h-4 fill-brand-gold" }),
          value
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub uppercase font-bold tracking-widest", children: label })
  ] });
}
function CompListCard({
  comp,
  rank,
  heroes: heroes2,
  isFavorite,
  onToggleFavorite,
  selectable = false,
  selected = false,
  onSelect
}) {
  const { t } = useTranslation(["pages", "common"]);
  const tierVariant = getTierBadgeVariant(comp.tier);
  const orderedHeroIds = getOrderedCompHeroes(comp, heroes2);
  const showTrending = parseInt(comp.likes) > 200;
  const diffKey = comp.difficulty != null ? difficultyLabelKey(comp.difficulty) : null;
  const cardBody = /* @__PURE__ */ jsx(
    Card,
    {
      className: cn(
        "p-0 hover:border-brand-gold/30 transition-all group overflow-hidden shadow-lg hover:shadow-brand-gold/5",
        selectable && "cursor-pointer",
        selectable && selected && "border-brand-gold ring-1 ring-brand-gold/40"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-stretch", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "w-10 shrink-0 flex items-center justify-center font-bold text-base border-r relative",
              rank <= 3 ? "bg-tier-s/10 text-tier-s border-tier-s/20" : "bg-brand-card-2 text-brand-text-sub border-brand-border"
            ),
            children: selectable ? /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "w-5 h-5 flex items-center justify-center rounded-md border transition-all",
                  selected ? "bg-brand-gold border-brand-gold text-black" : "bg-brand-card border-brand-border text-transparent"
                ),
                children: /* @__PURE__ */ jsx(Check, { className: "w-3 h-3" })
              }
            ) : rank
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 py-2.5 pl-4 pr-3 flex flex-col justify-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-0.5 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-brand-text-main group-hover:text-brand-gold transition-colors leading-none tracking-tight truncate max-w-[120px] sm:max-w-none", children: comp.name }),
              /* @__PURE__ */ jsxs(Badge, { variant: tierVariant, className: "px-1.5 py-0 rounded-md text-[9px] font-bold shrink-0", children: [
                comp.tier,
                " Tier"
              ] }),
              diffKey && /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-[9px] px-1.5 py-0 rounded-md font-semibold text-brand-text-sub shrink-0",
                  children: t(`pages:compDetail.${diffKey}`)
                }
              ),
              showTrending && /* @__PURE__ */ jsx(Badge, { className: "bg-brand-gold/10 text-brand-gold border-brand-gold/20 text-[9px] font-bold tracking-wider px-1.5 shrink-0", children: t("pages:comps.trending") }),
              /* @__PURE__ */ jsx(CompSynergyPills, { synergies: comp.synergies, max: 2, size: "sm", className: "shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-brand-border", children: "·" }),
              /* @__PURE__ */ jsxs("span", { className: "hidden md:inline text-[11px] text-brand-text-sub truncate", children: [
                t("common:byAuthor"),
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-medium", children: comp.author }),
                /* @__PURE__ */ jsx("span", { className: "text-brand-border mx-1.5", children: "·" }),
                t("pages:comps.updatedAt", { date: formatDate(comp.date) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 shrink-0 pl-2", children: [
              /* @__PURE__ */ jsx(
                CompStatsInline,
                {
                  layout: "inline",
                  likes: comp.likes,
                  winRate: comp.winRate,
                  votesLabel: t("pages:comps.votes"),
                  top1Label: "Top 1"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite();
                  },
                  className: "w-7 h-7 flex items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95 group/fav shrink-0",
                  "aria-label": isFavorite ? "Bỏ theo dõi" : "Theo dõi",
                  children: /* @__PURE__ */ jsx(
                    Star,
                    {
                      className: cn(
                        "w-3.5 h-3.5 transition-all",
                        isFavorite ? "text-brand-gold fill-brand-gold drop-shadow-[0_0_5px_rgba(245,180,60,0.5)]" : "text-brand-border group-hover/fav:text-brand-text-main"
                      )
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(CompHeroStrip, { heroIds: orderedHeroIds, heroes: heroes2 })
        ] })
      ] })
    }
  );
  if (selectable) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: onSelect,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect == null ? void 0 : onSelect();
          }
        },
        children: cardBody
      }
    );
  }
  return /* @__PURE__ */ jsx(Link, { to: `/doi-hinh/${comp.id}`, children: cardBody });
}
const COMPS_TAB_KEYS = ["all", "hot", "new", "following"];
const TIER_FILTER_KEYS = ["all", "s", "a", "b"];
function CompsListPage() {
  const { t } = useTranslation(["pages", "common", "tools"]);
  const { comps: comps2, heroes: heroes2 } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [selectedTier, setSelectedTier] = React.useState("all");
  const { isFavorite, toggleFavorite } = useFavorites("comps");
  const [toast, setToast] = React.useState(null);
  const {
    compareMode,
    selectedIds,
    toggleCompareMode,
    toggleSelect,
    removeItem: removeItem2,
    clearSelection,
    hasSelection
  } = useCompareSelection({
    onMaxReached: () => setToast(t("tools:compare.maxReached"))
  });
  React.useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);
  const filteredComps = React.useMemo(() => {
    let result = [...comps2];
    if (activeTab === "hot") {
      result = result.sort((a, b) => parseInt(b.likes) - parseInt(a.likes)).slice(0, 10);
    } else if (activeTab === "new") {
      result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (activeTab === "following") {
      result = result.filter((c) => isFavorite(c.id));
    }
    if (selectedTier !== "all") {
      result = result.filter((c) => c.tier === selectedTier.toUpperCase());
    }
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(lowerSearch) || c.author.toLowerCase().includes(lowerSearch) || c.synergies.some((s) => s.name.toLowerCase().includes(lowerSearch))
      );
    }
    return result;
  }, [comps2, activeTab, selectedTier, searchTerm, isFavorite]);
  const selectedCompItems = React.useMemo(
    () => selectedIds.map((id) => comps2.find((c) => c.id === id)).filter((c) => Boolean(c)).map((comp) => ({ id: comp.id, name: comp.name, tier: comp.tier })),
    [selectedIds, comps2]
  );
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-6", hasSelection && "pb-28 xl:pb-24"), children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("pages:comps.title"),
        description: t("pages:comps.description"),
        icon: getPageIcon("comps"),
        children: /* @__PURE__ */ jsx(Button, { className: "font-semibold h-11 px-6 rounded-xl transition-all", children: t("pages:comps.createNew") })
      }
    ),
    /* @__PURE__ */ jsxs(FilterToolbar, { children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: t("pages:comps.searchPlaceholder"),
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "pl-9 h-11 text-sm rounded-xl focus:ring-1 focus:ring-brand-gold/30"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center overflow-x-auto pb-1 lg:pb-0 hide-scrollbar", children: [
        /* @__PURE__ */ jsxs(Select, { value: selectedTier, onValueChange: (v) => setSelectedTier(v), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[140px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: TIER_FILTER_KEYS.map((key) => /* @__PURE__ */ jsx(SelectItem, { value: key, children: t(`pages:comps.tierFilter.${key}`) }, key)) })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "h-11 px-4 gap-2 shrink-0 border-brand-border rounded-xl font-semibold text-sm text-brand-text-sub hover:text-white transition-colors", children: [
          /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" }),
          " ",
          t("pages:comps.advancedFilter")
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: compareMode ? "default" : "outline",
            onClick: toggleCompareMode,
            className: cn(
              "h-11 px-4 gap-2 shrink-0 rounded-xl font-semibold text-sm",
              compareMode ? "bg-gold-gradient text-black border-0" : "border-brand-border text-brand-text-sub hover:text-white"
            ),
            children: [
              /* @__PURE__ */ jsx(Scale, { className: "w-4 h-4" }),
              compareMode ? t("pages:comps.compareModeOn") : t("pages:comps.compareMode")
            ]
          }
        )
      ] })
    ] }),
    compareMode && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub px-1", children: t("pages:comps.compareHint") }),
    /* @__PURE__ */ jsx(
      UnderlineTabs,
      {
        tabs: COMPS_TAB_KEYS.map((key) => ({
          id: key,
          label: t(`pages:comps.tabs.${key}`)
        })),
        activeTab,
        onTabChange: (tab) => setActiveTab(tab),
        layoutId: "activeTabPost"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 pb-10", children: filteredComps.length > 0 ? filteredComps.map((comp, idx) => /* @__PURE__ */ jsx(
      m.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: idx * 0.05 },
        children: /* @__PURE__ */ jsx(
          CompListCard,
          {
            comp,
            rank: idx + 1,
            heroes: heroes2,
            isFavorite: isFavorite(comp.id),
            onToggleFavorite: () => toggleFavorite(comp.id),
            selectable: compareMode,
            selected: selectedIds.includes(comp.id),
            onSelect: () => toggleSelect(comp.id)
          }
        )
      },
      comp.id
    )) : /* @__PURE__ */ jsxs("div", { className: "text-center py-20 border-2 border-dashed border-brand-border rounded-xl bg-brand-card/50 font-normal", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-card-2 text-brand-text-sub", children: /* @__PURE__ */ jsx(Filter, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub font-semibold text-sm", children: t("pages:comps.empty") }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          onClick: () => {
            setSearchTerm("");
            setActiveTab("all");
            setSelectedTier("all");
          },
          className: "mt-4 text-brand-gold hover:bg-brand-gold/10 font-semibold text-[13px]",
          children: t("pages:comps.clearFilters")
        }
      )
    ] }) }),
    toast && /* @__PURE__ */ jsx("div", { className: "fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl bg-brand-card border border-brand-gold/30 text-brand-gold text-sm font-semibold shadow-xl", children: toast }),
    /* @__PURE__ */ jsx(
      CompareTray,
      {
        type: "comp",
        selectedIds,
        items: selectedCompItems,
        comparePath: "/cong-cu/so-sanh-doi-hinh",
        onRemove: removeItem2,
        onClear: clearSelection
      }
    )
  ] });
}
function meta$H() {
  return staticRouteMeta("/doi-hinh");
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CompsListPage,
  meta: meta$H
}, Symbol.toStringTag, { value: "Module" }));
function heroDetailLoader({ params }) {
  const hero = HEROES.find((h) => h.id === params.id);
  if (!hero) throw data("Not Found", { status: 404 });
  return { hero };
}
function heroDetailMeta({ data: loaderData }) {
  var _a;
  const hero = loaderData == null ? void 0 : loaderData.hero;
  if (!hero) return [{ title: pageTitle$2("Tướng") }];
  const description2 = ((_a = hero.description) == null ? void 0 : _a.trim()) || `${hero.name} — chỉ số, kỹ năng và meta Auto Chess Mobile VN.`;
  return [
    ...buildPageMeta({
      path: `/tuong/${hero.id}`,
      title: pageTitle$2(hero.name),
      description: description2,
      image: hero.image ?? hero.imageUrl ?? hero.portraitUrl ?? hero.iconUrl
    }),
    {
      "script:ld+json": buildEntityJsonLd({
        name: hero.name,
        description: description2,
        url: `${SITE_URL}/tuong/${hero.id}`,
        image: resolveOgImage(hero.image ?? hero.imageUrl ?? hero.portraitUrl ?? hero.iconUrl),
        type: "VideoGameCharacter"
      })
    }
  ];
}
function compDetailLoader({ params }) {
  const comp = COMPS.find((c) => c.id === params.id);
  if (!comp) throw data("Not Found", { status: 404 });
  return { comp };
}
function compDetailMeta({ data: loaderData }) {
  var _a;
  const comp = loaderData == null ? void 0 : loaderData.comp;
  if (!comp) return [{ title: pageTitle$2("Đội hình") }];
  const description2 = ((_a = comp.desc) == null ? void 0 : _a.trim()) || `Đội hình ${comp.name} tier ${comp.tier} — meta Auto Chess Mobile VN.`;
  return buildPageMeta({
    path: `/doi-hinh/${comp.id}`,
    title: pageTitle$2(comp.name),
    description: description2
  });
}
function itemDetailLoader({ params }) {
  const item = ITEMS.find((i) => i.id === params.id);
  if (!item) throw data("Not Found", { status: 404 });
  return { item };
}
function itemDetailMeta({ data: loaderData }) {
  var _a;
  const item = loaderData == null ? void 0 : loaderData.item;
  if (!item) return [{ title: pageTitle$2("Trang bị") }];
  const description2 = ((_a = item.description) == null ? void 0 : _a.trim()) || `${item.name} — hiệu ứng trang bị Auto Chess Mobile VN.`;
  return buildPageMeta({
    path: `/trang-bi/${item.id}`,
    title: pageTitle$2(item.name),
    description: description2,
    image: "imageUrl" in item && typeof item.imageUrl === "string" ? item.imageUrl : void 0
  });
}
function relicDetailLoader({ params }) {
  const relic = DEFAULT_RELICS.find((r) => r.id === params.id);
  if (!relic) throw data("Not Found", { status: 404 });
  return { relic };
}
function relicDetailMeta({
  data: loaderData
}) {
  var _a;
  const relic = loaderData == null ? void 0 : loaderData.relic;
  if (!relic) return [{ title: pageTitle$2("Dị vật") }];
  const description2 = ((_a = relic.effect) == null ? void 0 : _a.trim()) || `${relic.name} — dị vật Auto Chess Mobile VN.`;
  return buildPageMeta({
    path: `/di-vat/${relic.id}`,
    title: pageTitle$2(relic.name),
    description: description2
  });
}
function traitDetailLoader({ params }) {
  const kind = params.kind;
  const id = params.id;
  if (kind === "toc") {
    const race = RACES.find((r) => r.id === id);
    if (!race) throw data("Not Found", { status: 404 });
    return { trait: race, kind: "toc" };
  }
  if (kind === "he") {
    const cls = CLASSES.find((c) => c.id === id);
    if (!cls) throw data("Not Found", { status: 404 });
    return { trait: cls, kind: "he" };
  }
  throw data("Not Found", { status: 404 });
}
function traitDetailMeta({
  data: loaderData
}) {
  var _a;
  const trait = loaderData == null ? void 0 : loaderData.trait;
  const kind = loaderData == null ? void 0 : loaderData.kind;
  if (!trait || !kind) return [{ title: pageTitle$2("Tộc / Hệ") }];
  const description2 = ((_a = trait.description) == null ? void 0 : _a.trim()) || `${trait.name} — synergy ${kind === "toc" ? "tộc" : "hệ"} Auto Chess Mobile VN.`;
  return buildPageMeta({
    path: `/toc-he/${kind}/${trait.id}`,
    title: pageTitle$2(trait.name),
    description: description2,
    image: trait.icon
  });
}
function newsDetailLoader({ params }) {
  const post = DEFAULT_POSTS.find((p) => p.id === params.id && p.status === "Xuất bản");
  if (!post) throw data("Not Found", { status: 404 });
  return { post };
}
function newsDetailMeta({ data: loaderData }) {
  var _a;
  const post = loaderData == null ? void 0 : loaderData.post;
  if (!post) return [{ title: pageTitle$2("Tin tức") }];
  const description2 = ((_a = post.excerpt) == null ? void 0 : _a.trim()) || post.title;
  const image = isPostImageUrl(post.image) ? post.image : void 0;
  return [
    ...buildPageMeta({
      path: `/tin-tuc/${post.id}`,
      title: pageTitle$2(post.title),
      description: description2,
      image,
      type: "article"
    }),
    {
      "script:ld+json": buildArticleJsonLd({
        title: post.title,
        description: description2,
        url: `${SITE_URL}/tin-tuc/${post.id}`,
        image: resolveOgImage(image),
        datePublished: post.date
      })
    }
  ];
}
function adminStaticMeta(path, label) {
  return {
    path,
    title: `${label} | Admin — ${SITE_NAME}`,
    description: `Quản trị ${label} — ${SITE_NAME}.`
  };
}
function communityDetailLoader({ params }) {
  const post = DEFAULT_COMMUNITY_POSTS.find((p) => p.id === params.id);
  if (!post) throw data("Not Found", { status: 404 });
  return { post };
}
function communityDetailMeta({
  data: loaderData
}) {
  var _a;
  const post = loaderData == null ? void 0 : loaderData.post;
  if (!post) return [{ title: pageTitle$2("Thảo luận") }];
  const description2 = ((_a = post.content) == null ? void 0 : _a.trim().slice(0, 160)) || `${post.title} — thảo luận cộng đồng Auto Chess Mobile VN.`;
  return buildPageMeta({
    path: `/thao-luan/${post.id}`,
    title: pageTitle$2(post.title),
    description: description2,
    type: "article"
  });
}
function BackButton({ to, label, className }) {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const text = label ?? t("back");
  const classNames = cn(
    "inline-flex items-center gap-2 text-brand-text-sub hover:text-brand-text-main font-bold text-[10px] uppercase tracking-widest transition-colors",
    className
  );
  if (to) {
    return /* @__PURE__ */ jsxs(Link, { to, className: classNames, children: [
      /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4", "aria-hidden": true }),
      text
    ] });
  }
  return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => navigate(-1), className: classNames, children: [
    /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4", "aria-hidden": true }),
    text
  ] });
}
function DetailBreadcrumb({ items: items2, className }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cn(
        "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-text-sub",
        className
      ),
      children: items2.map((item, index) => {
        const isLast = index === items2.length - 1;
        return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          index > 0 && /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-brand-border rounded-full", "aria-hidden": true }),
          item.href && !isLast ? /* @__PURE__ */ jsx(Link, { to: item.href, className: "hover:text-brand-gold transition-colors", children: item.label }) : /* @__PURE__ */ jsx("span", { className: isLast ? "text-brand-gold" : void 0, children: item.label })
        ] }, `${item.label}-${index}`);
      })
    }
  );
}
const CELL_SIZE = {
  compact: "w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]",
  full: "w-full aspect-square min-w-[28px]"
};
function BoardCellHero({
  hero,
  compact
}) {
  const [failed, setFailed] = React.useState(false);
  const src = getHeroIconUrl(hero);
  React.useEffect(() => {
    setFailed(false);
  }, [src, hero.id]);
  if (compact) {
    return /* @__PURE__ */ jsxs("div", { className: "absolute inset-px sm:inset-0.5 rounded bg-brand-bg border border-brand-border overflow-hidden flex items-center justify-center", children: [
      src && !failed ? /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: hero.name,
          className: "w-full h-full object-cover",
          onError: () => setFailed(true)
        }
      ) : /* @__PURE__ */ jsx("span", { className: "text-[7px] sm:text-[8px] font-bold text-brand-text-sub uppercase leading-none", children: hero.name.substring(0, 2) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "absolute bottom-0 left-0 right-0 h-0.5",
            heroCostBarClass(hero.cost)
          )
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-1 flex items-center justify-center", children: /* @__PURE__ */ jsx(CompHeroChip, { hero, size: "sm", className: "w-full h-full", linkable: false }) });
}
function CompBoardMini({
  board,
  heroes: heroes2,
  size = "compact",
  showRowLabels = false,
  className
}) {
  const heroMap = new Map(heroes2.map((h) => [h.id, h]));
  const gap = size === "compact" ? "gap-0.5 sm:gap-1" : "gap-1 md:gap-2";
  const labelWidth = showRowLabels ? "w-16 sm:w-20 shrink-0" : "";
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col", gap, className), children: Array.from({ length: BOARD_ROWS }).map((_, row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    showRowLabels && /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          labelWidth,
          "text-[9px] sm:text-[10px] font-semibold text-brand-text-sub leading-tight"
        ),
        children: BOARD_ROW_LABELS[row]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: cn("grid grid-cols-8 flex-1", gap), children: Array.from({ length: BOARD_COLS }).map((_2, col) => {
      const index = row * BOARD_COLS + col;
      const heroId = board[index];
      const hero = heroId ? heroMap.get(heroId) : void 0;
      const isLight = (row + col) % 2 === 0;
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            CELL_SIZE[size],
            "rounded-md relative flex items-center justify-center border border-transparent",
            isLight ? "bg-brand-card-2" : "bg-brand-card",
            size === "full" && "rounded-lg hover:border-white/10",
            !hero && size === "compact" && "opacity-60"
          ),
          children: hero ? /* @__PURE__ */ jsx(BoardCellHero, { hero, compact: size === "compact" }) : null
        },
        index
      );
    }) })
  ] }, row)) });
}
const CompRadarAnalysis = React.lazy(
  () => import("./CompRadarAnalysis-CxxRjcKx.js").then((module) => ({
    default: module.CompRadarAnalysis
  }))
);
function HeroLineupGrid({
  heroIds,
  heroes: heroes2,
  mainCoreId,
  coreHeroIds,
  t
}) {
  const coreSet = new Set(coreHeroIds ?? []);
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3", children: /* @__PURE__ */ jsx(AnimatePresence, { children: heroIds.map((heroId, i) => {
    const hero = heroes2.find((h) => h.id === heroId);
    const isMainCore = mainCoreId === heroId;
    const isCore = coreSet.has(heroId);
    return /* @__PURE__ */ jsx(
      m.div,
      {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: i * 0.05 },
        className: "text-center group relative",
        children: /* @__PURE__ */ jsx(
          CompHeroChip,
          {
            hero,
            size: "md",
            isCore: isCore && !isMainCore,
            isMainCore,
            showStars: true,
            showName: true,
            coreLabel: t("compDetail.coreBadge"),
            mainCoreLabel: t("compDetail.mainCore"),
            costLabel: hero ? t("compDetail.goldCost", { cost: hero.cost }) : void 0
          }
        )
      },
      heroId
    );
  }) }) });
}
function CompDetailPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { t } = useTranslation(["pages", "nav", "common"]);
  const { id } = useParams();
  const { heroes: heroes2, comps: comps2, items: items2 } = useAppStore();
  const { isFavorite, toggleFavorite } = useFavorites("comps");
  const comp = comps2.find((c) => c.id === id) || comps2[0];
  const favorite = isFavorite(comp.id);
  const board = React.useMemo(() => resolveCompBoard(comp, heroes2), [comp, heroes2]);
  const tierVariant = getTierBadgeVariant(comp.tier);
  const top42 = getCompTop4(comp);
  const diffKey = difficultyLabelKey(comp.difficulty);
  const { hasCoreSplit, coreIds, flexIds } = splitCoreFlexHeroIds(comp);
  const strengths = ((_a = comp.strengths) == null ? void 0 : _a.filter(Boolean)) ?? [];
  const weaknesses = ((_b = comp.weaknesses) == null ? void 0 : _b.filter(Boolean)) ?? [];
  const tips = ((_c = comp.tips) == null ? void 0 : _c.filter(Boolean)) ?? [];
  const showQuickReview = strengths.length > 0 || weaknesses.length > 0;
  const coreHeroes = coreIds.map((hid) => heroes2.find((h) => h.id === hid)).filter((h) => Boolean(h));
  const coreItemGroups = coreHeroes.map((hero) => ({
    hero,
    items: getRecommendedItems(hero, items2, 4)
  }));
  const hasItemSuggestions = coreItemGroups.some((g) => g.items.length > 0);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(BackButton, { to: "/doi-hinh", label: t("compDetail.backToList") }),
    /* @__PURE__ */ jsx(
      DetailBreadcrumb,
      {
        items: [
          { label: t("nav:comps"), href: "/doi-hinh" },
          { label: comp.name }
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      m.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-col md:flex-row md:items-end justify-between gap-6",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxs(Badge, { variant: tierVariant, className: "px-3 py-1 text-sm font-bold rounded-md", children: [
                comp.tier,
                " Tier"
              ] }),
              /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text-main leading-none", children: comp.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-[12px] font-semibold text-brand-text-sub", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-brand-card-2 border border-brand-border flex items-center justify-center text-[10px] text-brand-gold font-bold", children: comp.author.charAt(0) }),
                /* @__PURE__ */ jsxs("span", { children: [
                  t("compDetail.byAuthor"),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-brand-text-main", children: comp.author })
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-brand-border", children: "|" }),
              /* @__PURE__ */ jsxs("span", { children: [
                t("compDetail.updatedAt"),
                " ",
                comp.date
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                className: "bg-brand-card border-brand-border hover:bg-brand-card-2 hover:border-brand-gold/30 h-12 px-6 gap-3 rounded-xl transition-all",
                children: [
                  /* @__PURE__ */ jsx(ThumbsUp, { className: "w-5 h-5 text-brand-gold fill-brand-gold/20" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start leading-none", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-brand-text-main", children: comp.likes }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-brand-text-sub", children: t("compDetail.votes") })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: favorite ? "default" : "outline",
                className: cn(
                  "h-12 w-12 rounded-xl transition-all",
                  favorite ? "bg-brand-gold text-black hover:opacity-90 shadow-[0_0_15px_rgba(245,180,60,0.3)]" : "bg-brand-card border-brand-border text-brand-text-sub hover:text-white"
                ),
                onClick: () => toggleFavorite(comp.id),
                children: /* @__PURE__ */ jsx(Bookmark, { className: "w-5 h-5", fill: favorite ? "currentColor" : "none" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 bg-brand-card border-brand-border p-6 md:p-8 space-y-6 rounded-xl", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-widest text-brand-gold", children: t("compDetail.overviewTitle") }),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] text-brand-text-sub leading-relaxed font-medium", children: comp.desc }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2", children: [
          { label: t("compDetail.stats.top1"), value: comp.winRate, color: "text-brand-gold" },
          { label: t("compDetail.stats.top4"), value: `${top42}%`, color: "text-brand-green" },
          {
            label: t("compDetail.stats.difficulty"),
            value: t(`compDetail.${diffKey}`),
            color: "text-tier-b"
          },
          {
            label: t("compDetail.unitCount"),
            value: String(comp.heroes.length),
            color: "text-brand-text-main"
          }
        ].map((stat) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-brand-bg p-4 rounded-xl border border-brand-border text-center",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase mb-1 tracking-widest", children: stat.label }),
              /* @__PURE__ */ jsx("div", { className: cn("text-lg font-bold", stat.color), children: stat.value })
            ]
          },
          stat.label
        )) })
      ] }),
      showQuickReview && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 md:p-8 space-y-6 h-full rounded-xl", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-widest text-brand-gold", children: t("compDetail.quickReview") }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          strengths.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-brand-green tracking-wider", children: t("compDetail.strengthsTitle") }),
            /* @__PURE__ */ jsx("ul", { className: "text-sm text-brand-text-sub space-y-2", children: strengths.map((line) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-brand-green font-bold shrink-0", children: "+" }),
              /* @__PURE__ */ jsx("span", { children: line })
            ] }, line)) })
          ] }),
          weaknesses.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-brand-red tracking-wider", children: t("compDetail.weaknessesTitle") }),
            /* @__PURE__ */ jsx("ul", { className: "text-sm text-brand-text-sub space-y-2", children: weaknesses.map((line) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-brand-red font-bold shrink-0", children: "-" }),
              /* @__PURE__ */ jsx("span", { children: line })
            ] }, line)) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-10", children: [
        hasCoreSplit ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-brand-border pb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main", children: t("compDetail.coreTitle") }),
              /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-[10px] border-brand-border font-semibold", children: [
                coreIds.length,
                " ",
                t("compDetail.unitCount").toLowerCase()
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              HeroLineupGrid,
              {
                heroIds: coreIds,
                heroes: heroes2,
                mainCoreId: comp.mainCoreId,
                coreHeroIds: comp.coreHeroIds,
                t
              }
            )
          ] }),
          flexIds.length > 0 && /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between border-b border-brand-border pb-4", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main", children: t("compDetail.flexTitle") }) }),
            /* @__PURE__ */ jsx(
              HeroLineupGrid,
              {
                heroIds: flexIds,
                heroes: heroes2,
                coreHeroIds: comp.coreHeroIds,
                t
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between border-b border-brand-border pb-4", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main", children: t("compDetail.requiredLineup", { count: comp.heroes.length }) }) }),
          /* @__PURE__ */ jsx(HeroLineupGrid, { heroIds: comp.heroes, heroes: heroes2, t })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between border-b border-brand-border pb-4", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main", children: t("compDetail.positioningTitle") }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-brand-bg border border-brand-border p-3 md:p-6 rounded-xl relative overflow-hidden", children: /* @__PURE__ */ jsx(
            CompBoardMini,
            {
              board,
              heroes: heroes2,
              size: "full",
              showRowLabels: true,
              className: "relative z-10"
            }
          ) })
        ] }),
        roadmapHasContent(comp.roadmap) && /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main border-b border-brand-border pb-4", children: t("compDetail.roadmapTitle") }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            { key: "early", label: t("compDetail.roadmapEarly"), value: (_d = comp.roadmap) == null ? void 0 : _d.early },
            { key: "mid", label: t("compDetail.roadmapMid"), value: (_e = comp.roadmap) == null ? void 0 : _e.mid },
            { key: "late", label: t("compDetail.roadmapLate"), value: (_f = comp.roadmap) == null ? void 0 : _f.late }
          ].filter((phase) => {
            var _a2;
            return (_a2 = phase.value) == null ? void 0 : _a2.trim();
          }).map((phase) => /* @__PURE__ */ jsxs(
            Card,
            {
              className: "bg-brand-card border-brand-border p-4 rounded-xl space-y-2",
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-gold", children: phase.label }),
                /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed", children: phase.value })
              ]
            },
            phase.key
          )) })
        ] }),
        ((_g = comp.strongAgainst) == null ? void 0 : _g.length) || ((_h = comp.weakAgainst) == null ? void 0 : _h.length) ? /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main border-b border-brand-border pb-4", children: t("compDetail.countersTitle") }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            comp.strongAgainst && comp.strongAgainst.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl space-y-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-green", children: t("compDetail.strongAgainst") }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: comp.strongAgainst.map((entry2) => /* @__PURE__ */ jsxs("li", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-brand-text-main", children: entry2.name }),
                /* @__PURE__ */ jsx("div", { className: "text-[12px] text-brand-text-sub", children: entry2.reason })
              ] }, `${entry2.name}-${entry2.reason}`)) })
            ] }),
            comp.weakAgainst && comp.weakAgainst.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl space-y-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-red", children: t("compDetail.weakAgainst") }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: comp.weakAgainst.map((entry2) => /* @__PURE__ */ jsxs("li", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-brand-text-main", children: entry2.name }),
                /* @__PURE__ */ jsx("div", { className: "text-[12px] text-brand-text-sub", children: entry2.reason }),
                entry2.tip && /* @__PURE__ */ jsxs("div", { className: "text-[12px] text-brand-gold/90", children: [
                  t("compDetail.counterFix"),
                  ": ",
                  entry2.tip
                ] })
              ] }, `${entry2.name}-${entry2.reason}`)) })
            ] })
          ] })
        ] }) : null,
        tips.length > 0 && /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main border-b border-brand-border pb-4", children: t("compDetail.tipsTitle") }),
          /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl", children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-[13px] text-brand-text-sub", children: tips.map((tip) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-brand-gold shrink-0", children: "•" }),
            /* @__PURE__ */ jsx("span", { children: tip })
          ] }, tip)) }) })
        ] }),
        /* @__PURE__ */ jsx(
          React.Suspense,
          {
            fallback: /* @__PURE__ */ jsx("div", { className: "h-64 rounded-xl bg-brand-card border border-brand-border animate-pulse" }),
            children: /* @__PURE__ */ jsx(CompRadarAnalysis, { comp, heroes: heroes2 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-widest text-brand-text-main", children: t("compDetail.synergiesTitle") }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: comp.synergies.map((syn, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-3 bg-brand-card border border-brand-border p-3 rounded-xl hover:border-brand-gold/20 transition-all group",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all",
                      syn.active ? "bg-brand-gold text-black" : "bg-brand-card-2 text-brand-text-sub"
                    ),
                    children: syn.name.split(" ")[0]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "text-xs font-bold tracking-wide",
                        syn.active ? "text-brand-text-main" : "text-brand-text-sub"
                      ),
                      children: syn.name
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium text-brand-text-sub leading-tight line-clamp-2", children: syn.desc })
                ] })
              ]
            },
            i
          )) })
        ] }),
        hasItemSuggestions && /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-widest text-brand-text-main", children: t("compDetail.itemSuggestions") }),
          /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-6 space-y-6 rounded-xl", children: coreItemGroups.filter((g) => g.items.length > 0).map(({ hero, items: heroItems }) => /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-brand-gold tracking-widest border-l-2 border-brand-gold pl-2", children: hero.name }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: heroItems.map((item) => /* @__PURE__ */ jsx(
              Link,
              {
                to: `/trang-bi/${item.id}`,
                className: "w-[48px] h-[48px] rounded-lg border border-brand-border bg-brand-bg p-1 hover:border-brand-gold transition-all overflow-hidden",
                title: item.name,
                children: item.imageUrl ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: item.imageUrl,
                    alt: item.name,
                    className: "w-full h-full object-cover rounded"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full rounded bg-brand-card-2 flex items-center justify-center text-[9px] font-bold text-brand-text-sub", children: item.name.charAt(0) })
              },
              item.id
            )) })
          ] }, hero.id)) })
        ] })
      ] })
    ] })
  ] });
}
const loader$6 = compDetailLoader;
const meta$G = compDetailMeta;
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CompDetailPage,
  loader: loader$6,
  meta: meta$G
}, Symbol.toStringTag, { value: "Module" }));
function useFilterParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getParam = useCallback(
    (key) => {
      const value = searchParams.get(key);
      return value === null ? "" : value;
    },
    [searchParams]
  );
  const setParams = useCallback(
    (patch) => {
      const next = new URLSearchParams(searchParams);
      for (const [key, value] of Object.entries(patch)) {
        if (value == null || value === "") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );
  const clearParams = useCallback(
    (keys) => {
      if (!keys || keys.length === 0) {
        setSearchParams({}, { replace: true });
        return;
      }
      const next = new URLSearchParams(searchParams);
      for (const key of keys) {
        next.delete(key);
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );
  const hasActiveFilters = useCallback(
    (keys) => keys.some((key) => {
      const value = searchParams.get(key);
      return value != null && value !== "";
    }),
    [searchParams]
  );
  const filterKeys = useMemo(() => Array.from(searchParams.keys()), [searchParams]);
  return { getParam, setParams, clearParams, hasActiveFilters, searchParams, filterKeys };
}
function TraitTypeBadge({ kind, className }) {
  const { t } = useTranslation("pages");
  const isRace = kind === "race";
  return /* @__PURE__ */ jsx(
    Badge,
    {
      variant: "outline",
      className: cn(
        "font-bold text-[10px] uppercase tracking-widest",
        isRace ? "border-brand-gold/20 text-brand-gold bg-brand-gold/5" : "border-tier-b/30 text-tier-b bg-tier-b/10",
        className
      ),
      children: isRace ? t("traits.typeRace") : t("traits.typeClass")
    }
  );
}
function TraitCard({ trait, heroes: heroes2, index = 0 }) {
  var _a;
  const { t } = useTranslation("pages");
  const traitHeroes = getTraitHeroes(trait, heroes2);
  const milestoneCounts = ((_a = trait.milestones) == null ? void 0 : _a.map((m2) => m2.count)) ?? [];
  const detailPath = getTraitDetailPath(trait.kind, trait.id);
  return /* @__PURE__ */ jsx(
    m.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.98 },
      transition: { duration: 0.25, delay: index * 0.03 },
      children: /* @__PURE__ */ jsx(Link, { to: detailPath, className: "block h-full", children: /* @__PURE__ */ jsxs(Card, { className: "p-4 bg-brand-card border-brand-border hover:border-brand-gold/30 transition-all group overflow-hidden relative h-full flex flex-col cursor-pointer", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-100 pointer-events-none", children: /* @__PURE__ */ jsx(
          TraitIcon,
          {
            id: trait.id,
            iconUrl: trait.iconUrl,
            icon: trait.icon,
            name: trait.name,
            size: "watermark"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 mb-3 relative z-10", children: [
          /* @__PURE__ */ jsx(
            TraitIcon,
            {
              id: trait.id,
              iconUrl: trait.iconUrl,
              icon: trait.icon,
              name: trait.name,
              size: "md"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-bold tracking-tight text-brand-text-main group-hover:text-brand-gold transition-colors truncate", children: trait.name }),
              /* @__PURE__ */ jsx(TraitTypeBadge, { kind: trait.kind })
            ] }),
            /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "outline",
                className: "border-brand-gold/20 text-brand-gold bg-brand-gold/5 font-bold text-[10px] uppercase tracking-widest",
                children: t("traits.heroCount", { count: traitHeroes.length })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub line-clamp-1 mb-3 leading-relaxed relative z-10", children: trait.description || t("traits.descriptionPending") }),
        milestoneCounts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1 mb-3 relative z-10", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mr-0.5", children: t("traits.milestonesPreview") }),
          milestoneCounts.map((count, i) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "inline-flex items-center text-[10px] font-bold text-brand-gold",
              children: [
                i > 0 && /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub mx-0.5", children: "·" }),
                count
              ]
            },
            count
          ))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-3 border-t border-brand-border flex items-center justify-between relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex -space-x-2", children: [
            traitHeroes.slice(0, 5).map((h) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-6 h-6 rounded-lg border-2 border-brand-card bg-brand-card-2 overflow-hidden flex items-center justify-center text-[8px] uppercase font-bold text-brand-text-sub",
                children: h.name.charAt(0)
              },
              h.id
            )),
            traitHeroes.length > 5 && /* @__PURE__ */ jsxs("div", { className: "w-6 h-6 rounded-lg border-2 border-brand-card bg-brand-gold/10 flex items-center justify-center text-[8px] font-bold text-brand-gold", children: [
              "+",
              traitHeroes.length - 5
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            ChevronRight,
            {
              className: "w-4 h-4 text-brand-text-sub group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0",
              "aria-hidden": true
            }
          )
        ] })
      ] }) })
    }
  );
}
const FILTER_KEYS$5 = ["q", "sort", "tab"];
function parseTab(value) {
  if (value === "race" || value === "class") return value;
  return "all";
}
function parseSort(value) {
  return value === "heroCount" ? "heroCount" : "name";
}
function TraitsPage() {
  const { t } = useTranslation("pages");
  const { races: races2, classes: classes2, heroes: heroes2 } = useAppStore();
  const { getParam, setParams, clearParams, hasActiveFilters, searchParams } = useFilterParams();
  const activeTab = parseTab(searchParams.get("tab"));
  const search = getParam("q");
  const sort2 = parseSort(getParam("sort") || "name");
  const allTraits = React.useMemo(() => buildTraitItems(races2, classes2), [races2, classes2]);
  const filteredTraits = filterTraits(allTraits, {
    search,
    tab: activeTab,
    sort: sort2,
    heroes: heroes2
  });
  const activeFilters = hasActiveFilters([...FILTER_KEYS$5]);
  const tabOptions = React.useMemo(
    () => [
      { value: "all", label: t("traits.tabsShort.all") },
      { value: "race", label: t("traits.tabsShort.race") },
      { value: "class", label: t("traits.tabsShort.class") }
    ],
    [t]
  );
  const sortOptions = React.useMemo(
    () => [
      { value: "name", label: t("traits.sortName") },
      { value: "heroCount", label: t("traits.sortHeroCount") }
    ],
    [t]
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("traits.title"),
        description: t("traits.description"),
        icon: getPageIcon("traits")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(FilterToolbar, { children: /* @__PURE__ */ jsxs(FilterToolbarRow, { children: [
        /* @__PURE__ */ jsx(
          FilterSearchInput,
          {
            value: search,
            onChange: (value) => setParams({ q: value || null }),
            placeholder: t("traits.searchPlaceholder"),
            "aria-label": t("traits.searchPlaceholder")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: activeTab,
            onValueChange: (v) => setParams({ tab: v === "all" ? null : v }),
            options: tabOptions,
            "aria-label": t("traits.filterByTab")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: sort2,
            onValueChange: (v) => setParams({ sort: v === "name" ? null : v }),
            options: sortOptions,
            "aria-label": t("traits.sortLabel")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterClearButton,
          {
            visible: activeFilters,
            onClick: () => clearParams([...FILTER_KEYS$5])
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(FilterResultMeta, { shown: filteredTraits.length, total: allTraits.length, className: "px-1" })
    ] }),
    filteredTraits.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub", children: t("traits.empty") }),
      activeFilters && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: () => clearParams([...FILTER_KEYS$5]),
          className: "rounded-xl border-brand-border",
          children: t("common:clearFilters")
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredTraits.map((trait, index) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(TraitCard, { trait, heroes: heroes2, index }) }, `${trait.kind}-${trait.id}`)) }) })
  ] });
}
function meta$F() {
  return staticRouteMeta("/toc-he");
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TraitsPage,
  meta: meta$F
}, Symbol.toStringTag, { value: "Module" }));
function TraitMilestoneTable({
  milestones,
  recommendedCount
}) {
  const { t } = useTranslation("pages");
  if (milestones.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-brand-gold shrink-0" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main", children: t("traitDetail.synergiesTitle") })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-brand-border bg-brand-card-2/50", children: [
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-text-sub w-28", children: t("traitDetail.milestoneCountColumn") }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("traitDetail.milestoneEffectColumn") })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: milestones.map((m2, i) => {
        const isRecommended = recommendedCount === m2.count;
        return /* @__PURE__ */ jsxs(
          "tr",
          {
            className: cn(
              "border-b border-brand-border last:border-0 transition-colors",
              isRecommended && "bg-brand-gold/5"
            ),
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-4 align-top", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn(
                      "inline-flex items-center justify-center min-w-9 h-9 px-2 rounded-lg text-sm font-bold border",
                      isRecommended ? "bg-brand-gold/15 text-brand-gold border-brand-gold/30" : "bg-brand-card-2 text-brand-gold border-brand-gold/20"
                    ),
                    children: m2.count
                  }
                ),
                isRecommended && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-brand-gold", children: t("traitDetail.recommendedBadge") })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-brand-text-sub leading-relaxed align-top", children: m2.effect })
            ]
          },
          `${m2.count}-${i}`
        );
      }) })
    ] }) }) })
  ] });
}
const TIER_WEIGHT = {
  S: 3,
  A: 2,
  B: 1,
  C: 0.5
};
const COUNTER_MATRIX = {
  armorTank: ["trueDmg", "magicDPS", "armorShred"],
  physicalDPS: ["armorTank", "control"],
  magicDPS: ["magicResist", "control"],
  magicResist: ["armorShred", "physicalDPS"],
  healing: ["antiHeal", "trueDmg"],
  antiHeal: ["healing"],
  trueDmg: ["armorTank", "healing"],
  control: ["physicalDPS", "magicDPS"],
  armorShred: ["armorTank", "magicResist"]
};
const ARCHETYPE_KEYWORDS = {
  armorTank: ["armor", "giáp", "shield", "max hp", "hp", "máu", "resistance", "kháng"],
  physicalDPS: ["attack damage", "physical", "sát thương vật lý", "atk", "damage"],
  magicDPS: ["magical", "magic", "mage", "phép", "spell", "resistence"],
  magicResist: ["magic resistance", "magical resistence", "kháng phép", "mr"],
  healing: ["heal", "lifesteal", "hồi máu", "hút máu"],
  antiHeal: ["healing", "reduce healing", "giảm hồi"],
  trueDmg: ["pure damage", "sát thương chuẩn", "true"],
  control: ["stun", "stone", "hex", "silence", "petrified", "penguin", "control", "câm lặng", "hóa đá"],
  armorShred: ["pierce", "armor shred", "reduce", "giảm giáp", "xuyên", "resistence"]
};
function compTierWeight(tier) {
  return TIER_WEIGHT[tier] ?? 0.5;
}
function clamp(n, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Math.round(n)));
}
function getHeroAvailability(hero) {
  if (hero.cost <= 2) return "common";
  if (hero.cost === 3) return "uncommon";
  return "rare";
}
function getTraitPopularity(trait, heroes2, comps2, allTraits) {
  const traitHeroIds = new Set(getTraitHeroes(trait, heroes2).map((h) => h.id));
  let score = 0;
  let compCount = 0;
  for (const comp of comps2) {
    const hasTraitHero = comp.heroes.some((id) => traitHeroIds.has(id));
    if (!hasTraitHero) continue;
    compCount += 1;
    score += compTierWeight(comp.tier);
  }
  allTraits ?? buildTraitItems([], []);
  let maxScore = score;
  if (allTraits && allTraits.length > 0) {
    maxScore = Math.max(
      ...allTraits.map((t) => {
        const ids = new Set(getTraitHeroes(t, heroes2).map((h) => h.id));
        return comps2.reduce((acc, c) => {
          if (!c.heroes.some((id) => ids.has(id))) return acc;
          return acc + compTierWeight(c.tier);
        }, 0);
      }),
      1
    );
  } else {
    maxScore = Math.max(score, 1);
  }
  const pickRatePct = clamp(score / maxScore * 100);
  return { score, pickRatePct, compCount };
}
function getTraitTier(trait, heroes2, comps2, allTraits) {
  const { score, compCount } = getTraitPopularity(trait, heroes2, comps2, allTraits);
  const related = getTraitRelatedComps(trait, heroes2, comps2, 50);
  const hasSTier = related.some((c) => c.tier === "S");
  const hasATier = related.some((c) => c.tier === "A");
  if (hasSTier && score >= 2) return "S";
  if (hasSTier || hasATier && compCount >= 2) return "A";
  if (compCount >= 1 || score >= 1) return "B";
  return "C";
}
function getTraitPhase(trait, heroes2) {
  const traitHeroes = getTraitHeroes(trait, heroes2);
  if (traitHeroes.length === 0) {
    return { early: 33, mid: 34, late: 33 };
  }
  const avgCost = traitHeroes.reduce((sum, h) => sum + h.cost, 0) / traitHeroes.length;
  const milestones = trait.milestones.map((m2) => m2.count);
  const firstMilestone = milestones[0] ?? 2;
  const maxMilestone = milestones[milestones.length - 1] ?? firstMilestone;
  const earlyBase = clamp(100 - (avgCost - 1) * 22 - (firstMilestone - 1) * 8);
  const lateBase = clamp((avgCost - 2) * 18 + (maxMilestone >= 6 ? 25 : 0) + (maxMilestone >= 9 ? 15 : 0));
  const midBase = clamp(100 - Math.abs(earlyBase - lateBase) * 0.35);
  const total = earlyBase + midBase + lateBase || 1;
  return {
    early: clamp(earlyBase / total * 100),
    mid: clamp(midBase / total * 100),
    late: clamp(lateBase / total * 100)
  };
}
function traitKey(kind, name) {
  return `${kind}:${name}`;
}
function getTraitPartners(trait, heroes2, comps2, allTraits, limit = 6) {
  const traitHeroes = getTraitHeroes(trait, heroes2);
  const traitHeroIds = new Set(traitHeroes.map((h) => h.id));
  const scores = /* @__PURE__ */ new Map();
  const addScore = (kind, name, weight) => {
    if (kind === trait.kind && name === trait.name) return;
    const key = traitKey(kind, name);
    scores.set(key, (scores.get(key) ?? 0) + weight);
  };
  for (const hero of traitHeroes) {
    const otherTraits = trait.kind === "race" ? hero.class.map((n) => ({ kind: "class", name: n })) : hero.race.map((n) => ({ kind: "race", name: n }));
    for (const other of otherTraits) {
      addScore(other.kind, other.name, 1);
    }
  }
  for (const comp of comps2) {
    const overlap = comp.heroes.filter((id) => traitHeroIds.has(id)).length;
    if (overlap === 0) continue;
    const compWeight = compTierWeight(comp.tier) * overlap;
    for (const heroId of comp.heroes) {
      const hero = heroes2.find((h) => h.id === heroId);
      if (!hero) continue;
      const list2 = trait.kind === "race" ? hero.class.map((n) => ({ kind: "class", name: n })) : hero.race.map((n) => ({ kind: "race", name: n }));
      for (const other of list2) {
        addScore(other.kind, other.name, compWeight);
      }
    }
  }
  const partners = [];
  for (const [key, score] of scores) {
    const [kind, name] = key.split(":");
    const match = allTraits.find((t) => t.kind === kind && t.name === name);
    if (!match) continue;
    partners.push({ id: match.id, name: match.name, kind: match.kind, score });
  }
  return partners.sort((a, b) => b.score - a.score).slice(0, limit);
}
function detectArchetypes(trait) {
  const text = [
    trait.description,
    ...trait.milestones.map((m2) => m2.effect)
  ].join(" ").toLowerCase();
  const found = /* @__PURE__ */ new Set();
  for (const [archetype, keywords] of Object.entries(ARCHETYPE_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      found.add(archetype);
    }
  }
  if (found.size === 0) {
    if (trait.kind === "class") found.add("physicalDPS");
    else found.add("armorTank");
  }
  return found;
}
function getTraitMatchups(trait, allTraits, limit = 3) {
  const myArchetypes = detectArchetypes(trait);
  const counterArchetypes = /* @__PURE__ */ new Set();
  const counteredByArchetypes = /* @__PURE__ */ new Set();
  for (const arch of myArchetypes) {
    for (const target of COUNTER_MATRIX[arch] ?? []) {
      counterArchetypes.add(target);
    }
  }
  for (const other of Object.keys(COUNTER_MATRIX)) {
    if ((COUNTER_MATRIX[other] ?? []).some((t) => myArchetypes.has(t))) {
      counteredByArchetypes.add(other);
    }
  }
  const toEntries = (archetypes, excludeId) => {
    const entries = [];
    for (const t of allTraits) {
      if (t.id === excludeId && t.kind === trait.kind) continue;
      const theirs = detectArchetypes(t);
      const overlap = [...archetypes].filter((a) => theirs.has(a)).length;
      if (overlap === 0) continue;
      entries.push({
        entry: { id: t.id, name: t.name, kind: t.kind },
        weight: overlap
      });
    }
    return entries.sort((a, b) => b.weight - a.weight).slice(0, limit).map((e) => e.entry);
  };
  return {
    counters: toEntries(counterArchetypes, trait.id),
    counteredBy: toEntries(counteredByArchetypes, trait.id)
  };
}
function getRecommendedMilestone(trait, heroes2, comps2) {
  const milestones = trait.milestones.map((m2) => m2.count).sort((a, b) => a - b);
  if (milestones.length === 0) return null;
  const traitHeroIds = new Set(getTraitHeroes(trait, heroes2).map((h) => h.id));
  const counts = [];
  for (const comp of comps2) {
    const n = comp.heroes.filter((id) => traitHeroIds.has(id)).length;
    if (n > 0) counts.push(n);
  }
  if (counts.length === 0) {
    return milestones.find((m2) => m2 >= 4) ?? milestones[milestones.length - 1];
  }
  const freq = /* @__PURE__ */ new Map();
  for (const c of counts) {
    const matched = milestones.filter((m2) => m2 <= c).sort((a, b) => b - a)[0] ?? milestones[0];
    freq.set(matched, (freq.get(matched) ?? 0) + 1);
  }
  let best = milestones[0];
  let bestCount = 0;
  for (const [m2, n] of freq) {
    if (n > bestCount) {
      best = m2;
      bestCount = n;
    }
  }
  return best;
}
function getTraitMetaBundle(trait, heroes2, comps2, allTraits) {
  const popularity = getTraitPopularity(trait, heroes2, comps2, allTraits);
  const tier = getTraitTier(trait, heroes2, comps2, allTraits);
  const phase = getTraitPhase(trait, heroes2);
  const partners = getTraitPartners(trait, heroes2, comps2, allTraits);
  const matchups = getTraitMatchups(trait, allTraits);
  const recommendedMilestone = getRecommendedMilestone(trait, heroes2, comps2);
  return {
    popularity,
    tier,
    phase,
    partners,
    matchups,
    recommendedMilestone
  };
}
function availabilityLabelKey(availability) {
  if (availability === "common") return "traitDetail.availabilityCommon";
  if (availability === "uncommon") return "traitDetail.availabilityUncommon";
  return "traitDetail.availabilityRare";
}
function availabilityVariant(availability) {
  if (availability === "common") return "success";
  if (availability === "uncommon") return "warning";
  return "secondary";
}
function TraitMembersGrid({ heroes: heroes2 }) {
  const { t } = useTranslation("pages");
  const sorted = [...heroes2].sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-brand-gold shrink-0" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main", children: t("traitDetail.membersTitle") })
      ] }),
      /* @__PURE__ */ jsx(Badge, { className: "bg-brand-card-2 text-brand-text-sub border-brand-border", children: t("traitDetail.pieceCount", { count: sorted.length }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: sorted.map((hero) => {
      const iconUrl = getHeroIconUrl(hero);
      const availability = getHeroAvailability(hero);
      return /* @__PURE__ */ jsx(Link, { to: `/tuong/${hero.id}`, children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-4 rounded-xl hover:border-brand-gold/30 transition-all text-center group h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-14 h-14 mx-auto mb-3", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "w-full h-full rounded-xl overflow-hidden border-2 bg-brand-card-2 flex items-center justify-center",
                hero.cost === 5 ? "border-brand-gold" : "border-brand-border"
              ),
              children: iconUrl ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: iconUrl,
                  alt: "",
                  className: "w-full h-full object-cover",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsx("span", { className: "text-lg font-bold uppercase text-brand-text-sub", children: hero.name.substring(0, 2) })
            }
          ),
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: cn(
                "absolute -bottom-1 -right-1 text-[9px] font-bold px-1.5 py-0.5",
                heroCostBadgeOverlayClass(hero.cost)
              ),
              children: [
                "$",
                hero.cost
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("h4", { className: "text-[12px] font-bold text-brand-text-main truncate mb-2 group-hover:text-brand-gold transition-colors", children: hero.name }),
        /* @__PURE__ */ jsx(
          Badge,
          {
            variant: availabilityVariant(availability),
            className: "text-[9px] font-bold uppercase tracking-widest",
            children: t(availabilityLabelKey(availability))
          }
        )
      ] }) }, hero.id);
    }) })
  ] });
}
const TIER_VARIANT$2 = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c"
};
function TraitRecommendedComps({
  comps: comps2,
  heroes: heroes2,
  trait,
  recommendedMilestone
}) {
  const { t } = useTranslation("pages");
  if (comps2.length === 0) return null;
  const traitHeroIds = new Set(getTraitHeroes(trait, heroes2).map((h) => h.id));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-brand-gold shrink-0" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-brand-text-main", children: t("traitDetail.recommendedComps") })
      ] }),
      recommendedMilestone != null && /* @__PURE__ */ jsx(Badge, { className: "bg-brand-gold/10 text-brand-gold border-brand-gold/20 text-[10px] font-bold", children: t("traitDetail.recommendedMilestone", { count: recommendedMilestone }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: comps2.map((comp) => {
      const traitCount = comp.heroes.filter((id) => traitHeroIds.has(id)).length;
      const tierVariant = TIER_VARIANT$2[comp.tier] ?? "tier-c";
      return /* @__PURE__ */ jsx(Link, { to: `/doi-hinh/${comp.id}`, children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl group hover:border-brand-gold/30 transition-all h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-brand-text-main tracking-tight group-hover:text-brand-gold transition-colors line-clamp-2", children: comp.name }),
          /* @__PURE__ */ jsx(Badge, { variant: tierVariant, className: "text-[9px] shrink-0", children: comp.tier })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
          comp.winRate && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-[10px] border-brand-border", children: [
            "WR ",
            comp.winRate
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[10px]", children: t("traitDetail.compTraitCount", { count: traitCount }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
          comp.heroes.slice(0, 6).map((hId) => {
            const hero = heroes2.find((h) => h.id === hId);
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-8 h-8 rounded-lg bg-brand-card-2 border border-brand-border flex items-center justify-center text-[10px] font-bold uppercase text-brand-text-sub",
                title: hero == null ? void 0 : hero.name,
                children: (hero == null ? void 0 : hero.name.charAt(0)) ?? "?"
              },
              hId
            );
          }),
          comp.heroes.length > 6 && /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-brand-text-sub", children: [
            "+",
            comp.heroes.length - 6
          ] })
        ] })
      ] }) }, comp.id);
    }) })
  ] });
}
const TIER_VARIANT$1 = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c"
};
function PhaseBar({
  label,
  value,
  colorClass
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px]", children: [
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-brand-text-sub", children: label }),
      /* @__PURE__ */ jsxs("span", { className: "font-bold text-brand-text-main", children: [
        value,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-2 rounded-md bg-brand-card-2 overflow-hidden border border-brand-border", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: cn("h-full rounded-md transition-all", colorClass),
        style: { width: `${value}%` }
      }
    ) })
  ] });
}
function TraitMetaPanel({ tier, popularity, phase }) {
  const { t } = useTranslation("pages");
  return /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-5 space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(BarChart3, { className: "w-5 h-5 text-brand-gold shrink-0" }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold tracking-tight text-brand-text-main", children: t("traitDetail.metaTitle") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("traitDetail.tierLabel") }),
      /* @__PURE__ */ jsxs(Badge, { variant: TIER_VARIANT$1[tier], className: "text-[10px] font-bold", children: [
        tier,
        " ",
        t("traitDetail.tierSuffix")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px]", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-brand-text-sub", children: t("traitDetail.pickRate") }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-brand-gold", children: [
          popularity.pickRatePct,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-2.5 rounded-md bg-brand-card-2 overflow-hidden border border-brand-border", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full rounded-md bg-gold-gradient",
          style: { width: `${popularity.pickRatePct}%` }
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub", children: t("traitDetail.compUsage", { count: popularity.compCount }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-1 border-t border-brand-border", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("traitDetail.phaseTitle") }),
      /* @__PURE__ */ jsx(
        PhaseBar,
        {
          label: t("traitDetail.phaseEarly"),
          value: phase.early,
          colorClass: "bg-brand-green"
        }
      ),
      /* @__PURE__ */ jsx(
        PhaseBar,
        {
          label: t("traitDetail.phaseMid"),
          value: phase.mid,
          colorClass: "bg-tier-b"
        }
      ),
      /* @__PURE__ */ jsx(
        PhaseBar,
        {
          label: t("traitDetail.phaseLate"),
          value: phase.late,
          colorClass: "bg-brand-gold"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub leading-relaxed border-t border-brand-border pt-3", children: t("traitDetail.heuristicNote") })
  ] });
}
function TraitLinkBadge({
  id,
  name,
  kind
}) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: getTraitDetailPath(kind, id),
      className: "inline-flex items-center gap-2 rounded-xl border border-brand-border bg-brand-card-2 px-2 py-1.5 hover:border-brand-gold/30 transition-colors group",
      children: [
        /* @__PURE__ */ jsx(TraitIcon, { id, icon: "❓", name, size: "xs" }),
        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors", children: name }),
        /* @__PURE__ */ jsx(TraitTypeBadge, { kind, className: "scale-90 origin-left" })
      ]
    }
  );
}
function TraitInteractions({ partners, matchups }) {
  const { t } = useTranslation("pages");
  return /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-5 space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(GitBranch, { className: "w-5 h-5 text-brand-gold shrink-0" }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold tracking-tight text-brand-text-main", children: t("traitDetail.interactionsTitle") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("traitDetail.synergyPartners") }),
      partners.length > 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: partners.map((p) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(TraitLinkBadge, { id: p.id, name: p.name, kind: p.kind }) }, `${p.kind}-${p.id}`)) }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-brand-text-sub", children: t("traitDetail.noPartners") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 pt-1 border-t border-brand-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Swords, { className: "w-4 h-4 text-brand-green" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("traitDetail.counters") })
        ] }),
        matchups.counters.length > 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: matchups.counters.map((m2) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(TraitLinkBadge, { id: m2.id, name: m2.name, kind: m2.kind }) }, `c-${m2.kind}-${m2.id}`)) }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[10px]", children: t("traitDetail.noMatchups") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ShieldAlert, { className: "w-4 h-4 text-brand-red" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("traitDetail.counteredBy") })
        ] }),
        matchups.counteredBy.length > 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: matchups.counteredBy.map((m2) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(TraitLinkBadge, { id: m2.id, name: m2.name, kind: m2.kind }) }, `cb-${m2.kind}-${m2.id}`)) }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[10px]", children: t("traitDetail.noMatchups") })
      ] })
    ] })
  ] });
}
const TIER_VARIANT = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c"
};
function TraitDetailPage() {
  const { t } = useTranslation("pages");
  const { kind: routeKind, id } = useParams();
  const { races: races2, classes: classes2, heroes: heroes2, comps: comps2 } = useAppStore();
  const traitKind = routeKind ? routeKindToTraitKind(routeKind) : null;
  const allTraits = React.useMemo(
    () => buildTraitItems(races2, classes2),
    [races2, classes2]
  );
  const trait = React.useMemo(() => {
    if (!traitKind || !id) return null;
    if (traitKind === "race") {
      const race = races2.find((r) => r.id === id);
      return race ? raceToTraitItem(race) : null;
    }
    const cls = classes2.find((c) => c.id === id);
    return cls ? classToTraitItem(cls) : null;
  }, [traitKind, id, races2, classes2]);
  const meta2 = React.useMemo(() => {
    if (!trait) return null;
    return getTraitMetaBundle(trait, heroes2, comps2, allTraits);
  }, [trait, heroes2, comps2, allTraits]);
  if (!trait || !meta2) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-brand-text-main mb-4", children: t("traitDetail.notFound") }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/toc-he", children: t("common:backToList") }) })
    ] });
  }
  const traitHeroes = getTraitHeroes(trait, heroes2);
  const relatedComps = getTraitRelatedComps(trait, heroes2, comps2, 6);
  const listPath = getTraitsListPath(trait.kind);
  const kindLabel = trait.kind === "race" ? t("traitDetail.breadcrumbRace") : t("traitDetail.breadcrumbClass");
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(BackButton, { to: listPath, label: t("traitDetail.backToList") }),
    /* @__PURE__ */ jsx(
      DetailBreadcrumb,
      {
        items: [
          { label: t("traitDetail.breadcrumb"), href: "/toc-he" },
          { label: kindLabel, href: listPath },
          { label: trait.name }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden rounded-xl bg-brand-card border border-brand-border p-6 md:p-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8 md:p-12 pointer-events-none select-none", children: /* @__PURE__ */ jsx(
        TraitIcon,
        {
          id: trait.id,
          iconUrl: trait.iconUrl,
          icon: trait.icon,
          name: trait.name,
          size: "watermark"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8", children: [
        /* @__PURE__ */ jsx(
          TraitIcon,
          {
            id: trait.id,
            iconUrl: trait.iconUrl,
            icon: trait.icon,
            name: trait.name,
            size: "xl"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left space-y-4 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center md:justify-start gap-2", children: [
            /* @__PURE__ */ jsx(TraitTypeBadge, { kind: trait.kind }),
            /* @__PURE__ */ jsxs(Badge, { variant: TIER_VARIANT[meta2.tier], className: "text-[10px] font-bold", children: [
              meta2.tier,
              " ",
              t("traitDetail.tierSuffix")
            ] })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text-main tracking-tight leading-none", children: trait.name }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-2", children: t("traitDetail.loreTitle") }),
            /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-base font-medium leading-relaxed max-w-2xl", children: trait.description })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-brand-border bg-brand-card px-4 py-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-1", children: t("traitDetail.statTier") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-brand-gold", children: meta2.tier })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-brand-border bg-brand-card px-4 py-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-1", children: t("traitDetail.statPickRate") }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-brand-text-main", children: [
          meta2.popularity.pickRatePct,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-brand-border bg-brand-card px-4 py-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-1", children: t("traitDetail.statHeroCount") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-brand-text-main", children: traitHeroes.length })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-brand-border bg-brand-card px-4 py-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-1", children: t("traitDetail.statMilestone") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-brand-gold", children: meta2.recommendedMilestone ?? "—" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-6 lg:sticky lg:top-6", children: [
        /* @__PURE__ */ jsx(
          TraitMetaPanel,
          {
            tier: meta2.tier,
            popularity: meta2.popularity,
            phase: meta2.phase
          }
        ),
        /* @__PURE__ */ jsx(TraitInteractions, { partners: meta2.partners, matchups: meta2.matchups })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-10 min-w-0", children: [
        /* @__PURE__ */ jsx(
          TraitMilestoneTable,
          {
            milestones: trait.milestones,
            recommendedCount: meta2.recommendedMilestone
          }
        ),
        /* @__PURE__ */ jsx(TraitMembersGrid, { heroes: traitHeroes }),
        /* @__PURE__ */ jsx(
          TraitRecommendedComps,
          {
            comps: relatedComps,
            heroes: heroes2,
            trait,
            recommendedMilestone: meta2.recommendedMilestone
          }
        )
      ] })
    ] })
  ] });
}
const loader$5 = traitDetailLoader;
const meta$E = traitDetailMeta;
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TraitDetailPage,
  loader: loader$5,
  meta: meta$E
}, Symbol.toStringTag, { value: "Module" }));
const legacyTocList = UNSAFE_withComponentProps(function LegacyTocListRedirect() {
  return /* @__PURE__ */ jsx(Navigate, {
    to: "/toc-he",
    replace: true
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: legacyTocList
}, Symbol.toStringTag, { value: "Module" }));
const legacyTocDetail = UNSAFE_withComponentProps(function LegacyTocDetailRedirect() {
  const {
    id
  } = useParams$1();
  if (!id) return /* @__PURE__ */ jsx(Navigate, {
    to: "/toc-he",
    replace: true
  });
  return /* @__PURE__ */ jsx(Navigate, {
    to: `/toc-he/toc/${id}`,
    replace: true
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: legacyTocDetail
}, Symbol.toStringTag, { value: "Module" }));
const legacyHeList = UNSAFE_withComponentProps(function LegacyHeListRedirect() {
  return /* @__PURE__ */ jsx(Navigate, {
    to: "/toc-he?tab=class",
    replace: true
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: legacyHeList
}, Symbol.toStringTag, { value: "Module" }));
const legacyHeDetail = UNSAFE_withComponentProps(function LegacyHeDetailRedirect() {
  const {
    id
  } = useParams$1();
  if (!id) return /* @__PURE__ */ jsx(Navigate, {
    to: "/toc-he",
    replace: true
  });
  return /* @__PURE__ */ jsx(Navigate, {
    to: `/toc-he/he/${id}`,
    replace: true
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: legacyHeDetail
}, Symbol.toStringTag, { value: "Module" }));
function HeroNewBadge({ size = "md", className }) {
  const { t } = useTranslation("pages");
  const compact = size === "sm";
  return /* @__PURE__ */ jsx(
    Badge,
    {
      variant: "success",
      className: cn(
        "font-bold uppercase tracking-wider rounded-md border-brand-green/20",
        compact ? "text-[9px] px-1.5 py-0 leading-tight" : "text-[10px] px-2 py-0.5",
        className
      ),
      children: t("heroes.newBadge")
    }
  );
}
const FILTER_KEYS$4 = ["cost", "race", "class", "q", "new"];
function parseCost(value) {
  if (!value) return null;
  const n = Number(value);
  return n >= 1 && n <= 5 ? n : null;
}
function HeroesPage() {
  const { t } = useTranslation(["pages", "tools"]);
  const { heroes: heroes2, races: races2, classes: classes2 } = useAppStore();
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams();
  const { isFavorite, toggleFavorite } = useFavorites("heroes");
  const [toast, setToast] = React.useState(null);
  const {
    compareMode,
    selectedIds,
    toggleCompareMode,
    toggleSelect,
    removeItem: removeItem2,
    clearSelection,
    hasSelection
  } = useCompareSelection({
    onMaxReached: () => setToast(t("tools:compare.maxReached"))
  });
  React.useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);
  const selectedCost = parseCost(getParam("cost"));
  const selectedRace = getParam("race") || null;
  const selectedClass = getParam("class") || null;
  const searchTerm = getParam("q");
  const newFilter = getParam("new") === "new";
  const filteredHeroes = filterHeroes(heroes2, {
    cost: selectedCost,
    race: selectedRace,
    class: selectedClass,
    q: searchTerm,
    isNew: newFilter ? true : null
  });
  const activeFilters = hasActiveFilters([...FILTER_KEYS$4]);
  const raceSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("heroes.allRaces") },
      ...races2.map((race) => ({ value: race.name, label: race.name }))
    ],
    [races2, t]
  );
  const classSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("heroes.allClasses") },
      ...classes2.map((cls) => ({ value: cls.name, label: cls.name }))
    ],
    [classes2, t]
  );
  const costSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("heroes.allCosts") },
      ...[1, 2, 3, 4, 5].map((cost) => ({
        value: String(cost),
        label: `$${cost}`
      }))
    ],
    [t]
  );
  const newSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("heroes.allHeroes") },
      { value: "new", label: t("heroes.onlyNew") }
    ],
    [t]
  );
  const selectedHeroItems = React.useMemo(
    () => selectedIds.map((id) => heroes2.find((h) => h.id === id)).filter((h) => Boolean(h)).map((hero) => ({ id: hero.id, name: hero.name, hero })),
    [selectedIds, heroes2]
  );
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-6", hasSelection && "pb-28 xl:pb-24"), children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("heroes.title"),
        description: t("heroes.description"),
        icon: getPageIcon("heroes")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(FilterToolbar, { children: /* @__PURE__ */ jsxs(FilterToolbarRow, { children: [
        /* @__PURE__ */ jsx(
          FilterSearchInput,
          {
            value: searchTerm,
            onChange: (value) => setParams({ q: value || null }),
            placeholder: t("heroes.searchPlaceholder"),
            "aria-label": t("heroes.searchPlaceholder")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: selectedCost != null ? String(selectedCost) : "all",
            onValueChange: (v) => setParams({ cost: v === "all" ? null : v }),
            options: costSelectOptions,
            "aria-label": t("heroes.filterByCost")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: selectedRace ?? "all",
            onValueChange: (v) => setParams({ race: v === "all" ? null : v }),
            options: raceSelectOptions,
            "aria-label": t("heroes.filterByRace")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: selectedClass ?? "all",
            onValueChange: (v) => setParams({ class: v === "all" ? null : v }),
            options: classSelectOptions,
            "aria-label": t("heroes.filterByClass")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: newFilter ? "new" : "all",
            onValueChange: (v) => setParams({ new: v === "all" ? null : v }),
            options: newSelectOptions,
            "aria-label": t("heroes.filterNew")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterClearButton,
          {
            visible: activeFilters,
            onClick: () => clearParams([...FILTER_KEYS$4])
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: compareMode ? "default" : "outline",
            onClick: toggleCompareMode,
            className: cn(
              "h-11 px-4 gap-2 shrink-0 rounded-xl font-semibold text-sm",
              compareMode ? "bg-gold-gradient text-black border-0" : "border-brand-border text-brand-text-sub hover:text-white"
            ),
            children: [
              /* @__PURE__ */ jsx(Scale, { className: "w-4 h-4" }),
              compareMode ? t("pages:heroes.compareModeOn") : t("pages:heroes.compareMode")
            ]
          }
        )
      ] }) }),
      compareMode && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub px-1", children: t("pages:heroes.compareHint") }),
      /* @__PURE__ */ jsx(FilterResultMeta, { shown: filteredHeroes.length, total: heroes2.length, className: "px-1" })
    ] }),
    filteredHeroes.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub font-medium", children: t("heroes.empty") }),
      activeFilters && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: () => clearParams([...FILTER_KEYS$4]),
          className: "rounded-xl border-brand-border",
          children: t("common:clearFilters")
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: filteredHeroes.map((hero) => {
      const isFav = isFavorite(hero.id);
      const iconUrl = getHeroIconUrl(hero);
      const isSelected = selectedIds.includes(hero.id);
      const cardContent = /* @__PURE__ */ jsxs(
        Card,
        {
          className: cn(
            "p-3 bg-brand-card hover:border-brand-gold/30 transition-all flex flex-col relative h-full cursor-pointer",
            compareMode && isSelected && "border-brand-gold ring-1 ring-brand-gold/40"
          ),
          children: [
            compareMode && /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-3 right-3 z-20 w-6 h-6 flex items-center justify-center rounded-md border transition-all",
                  isSelected ? "bg-brand-gold border-brand-gold text-black" : "bg-black/60 border-brand-border text-transparent"
                ),
                children: /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" })
              }
            ),
            !compareMode && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(hero.id);
                },
                className: cn(
                  "absolute top-4 left-4 z-10 w-6 h-6 flex items-center justify-center rounded-full border transition-all hover:scale-110",
                  isFav ? "bg-brand-gold/20 border-brand-gold opacity-100" : "bg-black/60 border-brand-border opacity-0 group-hover:opacity-100"
                ),
                children: /* @__PURE__ */ jsx(Star, { className: cn("w-3.5 h-3.5", isFav ? "text-brand-gold fill-brand-gold" : "text-white") })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "aspect-square rounded-lg bg-brand-card-2 mb-3 border border-brand-border flex items-center justify-center relative overflow-hidden", children: [
              iconUrl ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: iconUrl,
                  alt: hero.name,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-brand-text-sub group-hover:scale-110 transition-transform", children: hero.name.charAt(0) }),
              /* @__PURE__ */ jsx("div", { className: cn("absolute bottom-0 left-0 right-0 h-1", heroCostBarClass(hero.cost)) }),
              isHeroNew(hero) && /* @__PURE__ */ jsx("div", { className: "absolute top-1 left-1 z-10", children: /* @__PURE__ */ jsx(HeroNewBadge, { size: "sm" }) }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: cn(
                    "absolute top-1 right-1 px-1.5 py-0.5 text-[10px] font-bold flex items-center z-10",
                    heroCostBadgeOverlayClass(hero.cost),
                    compareMode && "top-10"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "mr-0.5", children: "$" }),
                    hero.cost
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-[16px] font-semibold text-white mb-2 leading-tight truncate group-hover:text-brand-gold transition-colors", children: hero.name }),
            /* @__PURE__ */ jsxs("div", { className: "mt-auto space-y-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: hero.race.map((r) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[10px] bg-brand-card-2 text-brand-text-sub", children: r }, r)) }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: hero.class.map((c) => /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-[10px] bg-brand-gold/10 text-brand-gold/80 border-brand-gold/20 border",
                  children: c
                },
                c
              )) })
            ] })
          ]
        }
      );
      if (compareMode) {
        return /* @__PURE__ */ jsx(
          "div",
          {
            role: "button",
            tabIndex: 0,
            className: "block group",
            onClick: () => toggleSelect(hero.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSelect(hero.id);
              }
            },
            children: cardContent
          },
          hero.id
        );
      }
      return /* @__PURE__ */ jsx(Link, { to: `/tuong/${hero.id}`, className: "block group", children: cardContent }, hero.id);
    }) }),
    toast && /* @__PURE__ */ jsx("div", { className: "fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl bg-brand-card border border-brand-gold/30 text-brand-gold text-sm font-semibold shadow-xl", children: toast }),
    /* @__PURE__ */ jsx(
      CompareTray,
      {
        type: "hero",
        selectedIds,
        items: selectedHeroItems,
        comparePath: "/cong-cu/so-sanh-tuong",
        onRemove: removeItem2,
        onClear: clearSelection
      }
    )
  ] });
}
function meta$D() {
  return staticRouteMeta("/tuong");
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeroesPage,
  meta: meta$D
}, Symbol.toStringTag, { value: "Module" }));
function HeroPortraitPanel({ hero, selectedSkinId, onSkinChange }) {
  const { t } = useTranslation("pages");
  const skins = getHeroSkins(hero);
  const activeSkin = skins.find((s) => s.id === selectedSkinId) ?? skins[0];
  const imageSrc = (activeSkin == null ? void 0 : activeSkin.imageUrl) ?? hero.portraitUrl ?? hero.imageUrl ?? hero.image;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "relative mx-auto w-full max-w-[360px] aspect-[3/4] rounded-xl border overflow-hidden bg-brand-card-2",
          hero.cost === 5 ? "border-brand-gold/40" : "border-brand-border"
        ),
        children: [
          imageSrc ? /* @__PURE__ */ jsx("img", { src: imageSrc, alt: hero.name, className: "w-full h-full object-cover object-top" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center text-5xl font-bold text-brand-text-sub uppercase", children: hero.name.substring(0, 2) }),
          /* @__PURE__ */ jsx("div", { className: cn("absolute bottom-0 left-0 right-0 h-1.5", heroCostBarClass(hero.cost)) })
        ]
      }
    ),
    skins.length > 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("heroDetail.skins") }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2", children: skins.map((skin) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
        SkinThumb,
        {
          skin,
          active: skin.id === ((activeSkin == null ? void 0 : activeSkin.id) ?? "default"),
          onSelect: () => onSkinChange(skin.id)
        }
      ) }, skin.id)) })
    ] })
  ] });
}
function SkinThumb({
  skin,
  active,
  onSelect
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: onSelect,
      className: cn(
        "w-14 h-14 rounded-lg border overflow-hidden transition-all shrink-0",
        active ? "border-brand-gold ring-1 ring-brand-gold/50" : "border-brand-border hover:border-brand-gold/30"
      ),
      title: skin.name,
      children: /* @__PURE__ */ jsx("img", { src: skin.imageUrl, alt: skin.name, className: "w-full h-full object-cover" })
    }
  );
}
const RARITY_VARIANT = {
  Common: "bg-brand-card-2 text-brand-text-sub border-brand-border",
  Rare: "bg-tier-b/15 text-tier-b border-tier-b/30",
  Epic: "bg-tier-a/15 text-tier-a border-tier-a/30",
  Legendary: "bg-brand-gold/15 text-brand-gold border-brand-gold/30"
};
function HeroDetailHeader({ hero, description: description2 }) {
  const { t } = useTranslation("pages");
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-center lg:text-left", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center lg:justify-start gap-2", children: [
      /* @__PURE__ */ jsx(
        Badge,
        {
          className: cn(
            "px-3 py-1 text-xs font-bold rounded-md border-none",
            heroCostBadgeClass(hero.cost)
          ),
          children: t("heroDetail.goldCost", { cost: hero.cost })
        }
      ),
      isHeroNew(hero) && /* @__PURE__ */ jsx(HeroNewBadge, {}),
      hero.rarity && /* @__PURE__ */ jsxs(
        Badge,
        {
          variant: "outline",
          className: cn(
            "px-3 py-1 text-[10px] font-bold uppercase rounded-md",
            RARITY_VARIANT[hero.rarity] ?? RARITY_VARIANT.Common
          ),
          children: [
            t("heroDetail.rarity"),
            ": ",
            hero.rarity
          ]
        }
      ),
      hero.class.map((className) => /* @__PURE__ */ jsx(
        Badge,
        {
          className: "bg-brand-gold/10 text-brand-gold border-brand-gold/20 border px-3 font-bold rounded-md text-[10px]",
          children: className
        },
        className
      ))
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-brand-text-main tracking-tight leading-none", children: hero.name }),
      hero.chessTitle && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-brand-gold font-semibold", children: hero.chessTitle })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub font-medium leading-relaxed max-w-xl mx-auto lg:mx-0", children: description2 })
  ] });
}
const STARS = [1, 2, 3];
function HeroStarSelector({ star, onChange }) {
  const { t } = useTranslation("pages");
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3", children: [
    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("heroDetail.selectStar") }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: STARS.map((s) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(s),
        className: cn(
          "flex items-center gap-1.5 px-4 h-9 rounded-xl border text-sm font-semibold transition-all",
          star === s ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:text-brand-text-main"
        ),
        children: Array.from({ length: s }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: cn("w-3.5 h-3.5", star === s ? "fill-black" : "fill-brand-gold text-brand-gold") }, i))
      },
      s
    )) })
  ] });
}
function HeroSynergyCards({ hero, races: races2, classes: classes2, variant = "default" }) {
  const { t } = useTranslation("pages");
  const raceCards = hero.race.map((raceName) => {
    const race = races2.find((r) => r.name === raceName);
    const path = getRaceTraitPath(raceName, races2);
    return { type: "race", name: raceName, race, path };
  });
  const classCards = hero.class.map((className) => {
    const cls = classes2.find((c) => c.name === className);
    const path = getClassTraitPath(className, classes2);
    return { type: "class", name: className, cls, path };
  });
  const cards = [...raceCards, ...classCards];
  if (cards.length === 0) return null;
  if (variant === "compact") {
    return /* @__PURE__ */ jsxs("section", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("heroDetail.synergiesTitle") }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: cards.map((card) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const milestones = card.type === "race" ? (_a = card.race) == null ? void 0 : _a.milestones : (_b = card.cls) == null ? void 0 : _b.milestones;
        const preview = (milestones == null ? void 0 : milestones.slice(0, 2)) ?? [];
        const inner = /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-brand-border bg-brand-bg px-3 py-2 space-y-1 hover:border-brand-gold/30 transition-colors", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              TraitIcon,
              {
                id: card.type === "race" ? (_c = card.race) == null ? void 0 : _c.id : (_d = card.cls) == null ? void 0 : _d.id,
                iconUrl: card.type === "race" ? (_e = card.race) == null ? void 0 : _e.iconUrl : (_f = card.cls) == null ? void 0 : _f.iconUrl,
                icon: card.type === "race" ? ((_g = card.race) == null ? void 0 : _g.icon) ?? "❓" : ((_h = card.cls) == null ? void 0 : _h.icon) ?? "❓",
                name: card.name,
                size: "xs"
              }
            ),
            /* @__PURE__ */ jsx(
              Badge,
              {
                variant: card.type === "race" ? "secondary" : "outline",
                className: card.type === "race" ? "bg-brand-card-2 text-brand-text-sub border-brand-border rounded-md text-[10px] font-bold" : "border-brand-gold/30 text-brand-gold rounded-md text-[10px] font-bold",
                children: card.name
              }
            )
          ] }),
          preview.map((m2) => /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-brand-text-sub leading-snug", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-brand-gold font-semibold", children: [
              "(",
              m2.count,
              ")"
            ] }),
            " ",
            m2.effect
          ] }, m2.count))
        ] });
        return card.path ? /* @__PURE__ */ jsx(Link, { to: card.path, children: inner }, `${card.type}-${card.name}`) : /* @__PURE__ */ jsx("div", { children: inner }, `${card.type}-${card.name}`);
      }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("heroDetail.synergiesTitle") }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: cards.map((card) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const milestones = card.type === "race" ? (_a = card.race) == null ? void 0 : _a.milestones : (_b = card.cls) == null ? void 0 : _b.milestones;
      const preview = (milestones == null ? void 0 : milestones.slice(0, 2)) ?? [];
      const inner = /* @__PURE__ */ jsxs("div", { className: "bg-brand-bg p-4 rounded-xl border border-brand-border space-y-2 h-full hover:border-brand-gold/30 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            TraitIcon,
            {
              id: card.type === "race" ? (_c = card.race) == null ? void 0 : _c.id : (_d = card.cls) == null ? void 0 : _d.id,
              iconUrl: card.type === "race" ? (_e = card.race) == null ? void 0 : _e.iconUrl : (_f = card.cls) == null ? void 0 : _f.iconUrl,
              icon: card.type === "race" ? ((_g = card.race) == null ? void 0 : _g.icon) ?? "❓" : ((_h = card.cls) == null ? void 0 : _h.icon) ?? "❓",
              name: card.name,
              size: "sm"
            }
          ),
          /* @__PURE__ */ jsx(
            Badge,
            {
              variant: card.type === "race" ? "secondary" : "outline",
              className: card.type === "race" ? "bg-brand-card-2 text-brand-text-sub border-brand-border rounded-md text-[10px] font-bold uppercase" : "border-brand-gold/30 text-brand-gold rounded-md text-[10px] font-bold uppercase",
              children: card.name
            }
          )
        ] }),
        preview.map((m2) => /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-brand-text-sub leading-relaxed line-clamp-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-brand-gold font-semibold", children: [
            "(",
            m2.count,
            ")"
          ] }),
          " ",
          m2.effect
        ] }, m2.count))
      ] });
      return card.path ? /* @__PURE__ */ jsx(Link, { to: card.path, children: inner }, `${card.type}-${card.name}`) : /* @__PURE__ */ jsx("div", { children: inner }, `${card.type}-${card.name}`);
    }) })
  ] });
}
function HeroStatGrid({ stats: stats2, star, variant = "default" }) {
  const { t } = useTranslation("pages");
  const compact = variant === "compact";
  const cells = [
    { label: t("heroDetail.stats.hp"), value: stats2.hp, key: "hp" },
    { label: t("heroDetail.stats.atk"), value: stats2.atk, key: "atk" },
    { label: t("heroDetail.stats.armor"), value: stats2.armor, key: "armor" },
    { label: t("heroDetail.stats.mr"), value: `${stats2.mr}%`, key: "mr" },
    { label: t("heroDetail.stats.atkSpeed"), value: stats2.atkSpeed.toFixed(1), key: "atkSpeed" },
    { label: t("heroDetail.stats.range"), value: stats2.range, key: "range" }
  ];
  return /* @__PURE__ */ jsxs("section", { className: cn("space-y-4", compact && "space-y-2"), children: [
    /* @__PURE__ */ jsx(
      "h3",
      {
        className: cn(
          "font-bold uppercase tracking-[0.2em] text-brand-gold",
          compact ? "text-[10px]" : "text-[12px]"
        ),
        children: t("heroDetail.statsTitle")
      }
    ),
    /* @__PURE__ */ jsx("div", { className: cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 gap-3"), children: cells.map((cell) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-brand-bg rounded-xl border border-brand-border text-center space-y-0.5",
          compact ? "p-2" : "p-4 space-y-1"
        ),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "font-bold text-brand-text-sub uppercase tracking-widest",
                compact ? "text-[9px]" : "text-[10px]"
              ),
              children: cell.label
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "font-bold text-brand-text-main",
                compact ? "text-sm" : "text-xl",
                (cell.key === "hp" || cell.key === "atk") && "text-brand-gold"
              ),
              children: cell.value
            },
            `${cell.key}-${star}`
          )
        ]
      },
      cell.label
    )) }),
    /* @__PURE__ */ jsx("p", { className: cn("text-brand-text-sub", compact ? "text-[10px]" : "text-[11px]"), children: t("heroDetail.stats.star", { star }) })
  ] });
}
const ATTACK_CLASSES = ["Assassin", "Hunter"];
const DEFENSE_CLASSES = ["Warrior", "Knight"];
const MAGIC_CLASSES = ["Mage", "Warlock", "Shaman", "Witcher", "Priest"];
const STAT_LABEL_MAP = {
  "sát thương vật lý": "Sát thương",
  "sát thương": "Sát thương",
  "tốc độ đánh": "Tỷ lệ tốc độ đánh",
  "tốc đánh": "Tỷ lệ tốc độ đánh",
  "chí mạng": "Tỷ lệ chí mạng",
  "hút máu": "Hút máu",
  "giáp": "Giáp",
  "máu": "Máu",
  "hồi máu": "Hồi máu",
  "năng lượng": "Năng lượng",
  "kháng phép": "Kháng phép"
};
function toneForLabel(label) {
  const l = label.toLowerCase();
  if (l.includes("sát thương") || l.includes("chí mạng")) return "red";
  if (l.includes("tốc") || l.includes("hút máu")) return "gold";
  if (l.includes("giáp") || l.includes("máu") || l.includes("hồi") || l.includes("kháng")) return "green";
  return "default";
}
function inferItemCategory(stats2) {
  const s = stats2.toLowerCase();
  if (/giáp|máu|hồi máu|kháng|armor|hp|heal|resist/.test(s)) return "defense";
  if (/năng lượng|sấm|phép|energy|magic|spell/.test(s)) return "magic";
  if (/hồi sinh|utility|orb/.test(s)) return "utility";
  return "attack";
}
function parseStatBonuses(stats2) {
  const results = [];
  const segments = stats2.split(/[,;.]/).map((s) => s.trim()).filter(Boolean);
  for (const segment of segments) {
    const match = segment.match(/^([+−-]?\d+(?:\.\d+)?%?)\s*(.+)$/i);
    if (!match) continue;
    const rawLabel = match[2].trim().toLowerCase();
    let label = match[2].trim();
    for (const [key, mapped] of Object.entries(STAT_LABEL_MAP)) {
      if (rawLabel.includes(key)) {
        label = mapped;
        break;
      }
    }
    results.push({
      label,
      value: match[1],
      tone: toneForLabel(label)
    });
  }
  return results;
}
function getRelatedItems(item, items2, limit = 4) {
  const category = item.category ?? inferItemCategory(item.stats);
  return items2.filter(
    (i) => i.id !== item.id && (i.category ?? inferItemCategory(i.stats)) === category && Math.abs(i.tier - item.tier) <= 1
  ).sort((a, b) => Math.abs(a.tier - item.tier) - Math.abs(b.tier - item.tier)).slice(0, limit);
}
function getRecommendedHeroes(item, heroes2, limit = 5) {
  var _a;
  if ((_a = item.recommendedHeroIds) == null ? void 0 : _a.length) {
    const mapped = item.recommendedHeroIds.map((id) => heroes2.find((h) => h.id === id)).filter((h) => Boolean(h));
    if (mapped.length > 0) return mapped.slice(0, limit);
  }
  const category = item.category ?? inferItemCategory(item.stats);
  return heroes2.filter((h) => {
    const primaryClass = h.class[0];
    if (category === "attack") return ATTACK_CLASSES.includes(primaryClass);
    if (category === "defense") return DEFENSE_CLASSES.includes(primaryClass);
    if (category === "magic" || category === "utility") return MAGIC_CLASSES.includes(primaryClass);
    return h.cost >= 4;
  }).slice(0, limit);
}
function getCompsForItem(item, comps2, heroes2, limit = 3) {
  const heroIds = item.recommendedHeroIds ?? getRecommendedHeroes(item, heroes2).map((h) => h.id);
  if (heroIds.length === 0) return [];
  return comps2.filter((comp) => {
    const overlap = comp.heroes.filter((id) => heroIds.includes(id)).length;
    return overlap >= 2;
  }).slice(0, limit);
}
function itemTierBorderClass(tier) {
  if (tier >= 4) return "border-brand-red bg-brand-red/10";
  if (tier === 3) return "border-tier-a bg-tier-a/10";
  if (tier === 2) return "border-tier-b bg-tier-b/10";
  return "border-brand-border bg-brand-card-2";
}
function itemTierGradientClass(tier) {
  if (tier >= 4) return "from-brand-red to-brand-gold-deep shadow-[0_0_10px_rgba(242,92,84,0.4)]";
  if (tier === 3) return "from-tier-a to-orange-600 shadow-[0_0_10px_rgba(245,166,35,0.4)]";
  if (tier === 2) return "from-tier-b to-blue-600 shadow-[0_0_10px_rgba(77,150,240,0.4)]";
  return "from-brand-card-2 to-brand-bg";
}
function HeroRecommendedItems({ items: items2, variant = "default" }) {
  const { t } = useTranslation("pages");
  const compact = variant === "compact";
  return /* @__PURE__ */ jsxs("section", { className: cn("space-y-3", compact && "space-y-2"), children: [
    /* @__PURE__ */ jsx(
      "h3",
      {
        className: cn(
          "font-bold uppercase tracking-[0.2em] text-brand-gold",
          compact ? "text-[10px]" : "text-[12px]"
        ),
        children: t("heroDetail.recommendedItems")
      }
    ),
    items2.length > 0 ? /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "flex gap-2",
          compact ? "overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory" : "flex-col space-y-3"
        ),
        children: items2.map((item) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/trang-bi/${item.id}`,
            className: cn(
              "flex items-center gap-2 rounded-xl border border-brand-border bg-brand-bg hover:border-brand-gold/30 transition-all group shrink-0",
              compact ? "p-2 min-w-[140px] snap-start" : "p-3 gap-3"
            ),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "rounded-lg bg-gradient-to-br shrink-0",
                    itemTierGradientClass(item.tier),
                    compact ? "w-8 h-8" : "w-10 h-10"
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "font-bold text-brand-text-main group-hover:text-brand-gold truncate",
                      compact ? "text-[11px]" : "text-[12px]"
                    ),
                    children: item.name
                  }
                ),
                !compact && /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub truncate", children: item.stats })
              ] })
            ]
          },
          item.id
        ))
      }
    ) : /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub leading-relaxed", children: t("heroDetail.noRecommendedItems") })
  ] });
}
function HeroOverviewPanel({
  hero,
  description: description2,
  star,
  onStarChange,
  stats: stats2,
  races: races2,
  classes: classes2,
  recommendedItems
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 min-w-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
      /* @__PURE__ */ jsx(HeroIcon, { hero, size: "lg", className: "hidden sm:flex" }),
      /* @__PURE__ */ jsx(HeroIcon, { hero, size: "md", className: "sm:hidden" }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsx(HeroDetailHeader, { hero, description: description2 }) })
    ] }),
    /* @__PURE__ */ jsx(HeroStarSelector, { star, onChange: onStarChange }),
    /* @__PURE__ */ jsx(HeroSynergyCards, { hero, races: races2, classes: classes2, variant: "compact" }),
    /* @__PURE__ */ jsx(HeroStatGrid, { stats: stats2, star, variant: "compact" }),
    /* @__PURE__ */ jsx(HeroRecommendedItems, { items: recommendedItems, variant: "compact" })
  ] });
}
function HeroSkillBlock({ skill }) {
  const { t } = useTranslation("pages");
  return /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 fill-brand-gold" }),
      t("heroDetail.skillTitle")
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-brand-bg p-6 rounded-xl border border-brand-border", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      skill.iconUrl && /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl border border-brand-border overflow-hidden shrink-0 bg-brand-card-2", children: /* @__PURE__ */ jsx("img", { src: skill.iconUrl, alt: "", className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-brand-text-main", children: skill.name }),
          skill.type && /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "outline",
              className: "border-brand-gold/30 text-brand-gold text-[10px] font-bold uppercase rounded-md",
              children: skill.type
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm leading-relaxed font-medium", children: skill.desc })
      ] })
    ] }) })
  ] });
}
function HeroLoreSection({ lore }) {
  const { t } = useTranslation("pages");
  const [expanded, setExpanded] = React.useState(false);
  const isLong = lore.length > 280;
  if (!lore.trim() || lore === "Stay Tuned.") return null;
  return /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("heroDetail.lore") }),
    /* @__PURE__ */ jsxs("div", { className: "bg-brand-bg p-5 rounded-xl border border-brand-border", children: [
      /* @__PURE__ */ jsx(
        "p",
        {
          className: cn(
            "text-sm text-brand-text-sub leading-relaxed",
            !expanded && isLong && "line-clamp-4"
          ),
          children: lore
        }
      ),
      isLong && /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setExpanded((v) => !v),
          className: "mt-3 flex items-center gap-1 text-xs font-bold text-brand-gold hover:underline",
          children: [
            expanded ? t("heroDetail.loreCollapse") : t("heroDetail.loreExpand"),
            /* @__PURE__ */ jsx(ChevronDown, { className: cn("w-4 h-4 transition-transform", expanded && "rotate-180") })
          ]
        }
      )
    ] })
  ] });
}
function HeroTacticalSection({ notes }) {
  const { t } = useTranslation("pages");
  if (notes.length === 0) return null;
  return /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4" }),
      t("heroDetail.tacticalTitle")
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-brand-text-sub text-sm leading-relaxed font-medium", children: notes.map((note) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-bold shrink-0", children: "»" }),
      /* @__PURE__ */ jsx("span", { children: note })
    ] }, note)) })
  ] });
}
function HeroRelatedHeroes({ title: title2, heroes: heroes2, filterHref }) {
  const { t } = useTranslation("pages");
  if (heroes2.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: title2 }),
      /* @__PURE__ */ jsx(Link, { to: filterHref, className: "text-[10px] font-bold text-brand-gold hover:underline", children: t("common:viewAll") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: heroes2.map((hero) => /* @__PURE__ */ jsx(Link, { to: `/tuong/${hero.id}`, children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-bg border-brand-border p-2 rounded-xl hover:border-brand-gold/30 transition-all text-center group", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mb-1.5 w-10", children: [
        /* @__PURE__ */ jsx(HeroIcon, { hero, size: "sm", className: "mx-auto" }),
        isHeroNew(hero) && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 z-10", children: /* @__PURE__ */ jsx(HeroNewBadge, { size: "sm" }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-brand-text-main truncate group-hover:text-brand-gold", children: hero.name }),
      /* @__PURE__ */ jsxs("p", { className: cn("text-[9px] font-bold", heroCostBadgeClass(hero.cost)), children: [
        "$",
        hero.cost
      ] })
    ] }) }, hero.id)) })
  ] });
}
const COMP_TIER_VARIANT$1 = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c"
};
function HeroRelatedSidebar({ hero, relatedComps }) {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  const { heroes: heroes2 } = useAppStore();
  const relatedByRace = hero.race.flatMap(
    (race) => getRelatedHeroes(hero, heroes2, { by: "race", value: race, limit: 6 })
  );
  const uniqueByRace = [...new Map(relatedByRace.map((h) => [h.id, h])).values()].slice(0, 6);
  const relatedByClass = hero.class.flatMap(
    (cls) => getRelatedHeroes(hero, heroes2, { by: "class", value: cls, limit: 6 })
  );
  const uniqueByClass = [...new Map(relatedByClass.map((h) => [h.id, h])).values()].slice(0, 6);
  const relatedByCost = getRelatedHeroes(hero, heroes2, { by: "cost", limit: 6 });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    relatedComps.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("heroDetail.relatedComps") }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: relatedComps.map((comp) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/doi-hinh/${comp.id}`,
          className: "block p-3 rounded-xl border border-brand-border hover:border-brand-gold/30 bg-brand-bg transition-all group",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-brand-text-main group-hover:text-brand-gold truncate", children: comp.name }),
              /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: COMP_TIER_VARIANT$1[comp.tier] ?? "tier-c",
                  className: "shrink-0 rounded-md",
                  children: comp.tier
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-brand-text-sub", children: [
              comp.winRate,
              " win rate"
            ] })
          ]
        },
        comp.id
      )) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 space-y-5", children: [
      hero.race[0] && /* @__PURE__ */ jsx(
        HeroRelatedHeroes,
        {
          title: t("heroDetail.relatedByRace"),
          heroes: uniqueByRace,
          filterHref: `/tuong?race=${encodeURIComponent(RACE_NAME_ALIASES[hero.race[0]] ?? hero.race[0])}`
        }
      ),
      hero.class[0] && /* @__PURE__ */ jsx(
        HeroRelatedHeroes,
        {
          title: t("heroDetail.relatedByClass"),
          heroes: uniqueByClass,
          filterHref: `/tuong?class=${encodeURIComponent(hero.class[0])}`
        }
      ),
      /* @__PURE__ */ jsx(
        HeroRelatedHeroes,
        {
          title: t("heroDetail.relatedByCost", { cost: hero.cost }),
          heroes: relatedByCost,
          filterHref: `/tuong?cost=${hero.cost}`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 space-y-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("heroDetail.quickFilter") }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          className: "w-full border-brand-border h-11 rounded-xl text-xs font-bold",
          onClick: () => navigate(`/tuong?cost=${hero.cost}`),
          children: t("heroDetail.viewSameCost", { cost: hero.cost })
        }
      ),
      hero.race.map((race) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          className: "w-full border-brand-border h-11 rounded-xl text-xs font-bold",
          onClick: () => navigate(`/tuong?race=${encodeURIComponent(RACE_NAME_ALIASES[race] ?? race)}`),
          children: t("heroDetail.viewSameRace", { race })
        },
        race
      )),
      hero.class[0] && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          className: "w-full border-brand-border h-11 rounded-xl text-xs font-bold",
          onClick: () => navigate(`/tuong?class=${encodeURIComponent(hero.class[0])}`),
          children: t("heroDetail.viewSameClass", { class: hero.class[0] })
        }
      )
    ] })
  ] });
}
function parseStar(value) {
  const n = Number(value);
  if (n === 2 || n === 3) return n;
  return 1;
}
function HeroDetailPage() {
  const { t } = useTranslation("pages");
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { heroes: heroes2, items: items2, comps: comps2, races: races2, classes: classes2 } = useAppStore();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites("heroes");
  const hero = heroes2.find((h) => h.id === id);
  const star = parseStar(searchParams.get("star"));
  const skins = hero ? getHeroSkins(hero) : [];
  const [selectedSkinId, setSelectedSkinId] = React.useState("default");
  React.useEffect(() => {
    var _a;
    if (skins.length > 0) {
      setSelectedSkinId(((_a = skins.find((s) => s.isDefault)) == null ? void 0 : _a.id) ?? skins[0].id);
    }
  }, [hero == null ? void 0 : hero.id, skins.length]);
  const skill = hero ? resolveHeroSkill(hero, star) : null;
  const stats2 = hero ? resolveHeroStats(hero, star) : null;
  const description2 = (hero == null ? void 0 : hero.description) ?? (skill == null ? void 0 : skill.desc) ?? t("heroDetail.descriptionFallback");
  const setStar = (next) => {
    const params = new URLSearchParams(searchParams);
    if (next === 1) params.delete("star");
    else params.set("star", String(next));
    setSearchParams(params, { replace: true });
  };
  if (!hero || !skill || !stats2) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: t("heroDetail.notFound") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/tuong"), children: t("common:backToList") })
    ] });
  }
  const tacticalNotes = hero.tacticalNotes ?? [];
  const recommendedItems = getRecommendedItems(hero, items2);
  const relatedComps = getCompsForHero(hero, comps2);
  const fav = isFavorite(hero.id);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/tuong",
        className: "inline-flex items-center gap-2 text-brand-text-sub hover:text-brand-text-main font-bold text-[10px] uppercase tracking-widest transition-colors",
        children: [
          /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }),
          t("heroDetail.backToList")
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DetailBreadcrumb,
      {
        items: [
          { label: t("heroDetail.breadcrumb"), href: "/tuong" },
          { label: hero.name }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-8", children: /* @__PURE__ */ jsx(m.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 md:p-8 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => toggleFavorite(hero.id),
            className: cn(
              "absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-xl border transition-all",
              fav ? "bg-brand-gold/20 border-brand-gold text-brand-gold" : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:text-white"
            ),
            "aria-label": t("heroDetail.toggleFavorite"),
            children: /* @__PURE__ */ jsx(Star, { className: cn("w-5 h-5", fav && "fill-brand-gold") })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-6 lg:gap-8 items-start", children: [
          /* @__PURE__ */ jsx(
            HeroPortraitPanel,
            {
              hero,
              selectedSkinId,
              onSkinChange: setSelectedSkinId
            }
          ),
          /* @__PURE__ */ jsx(
            HeroOverviewPanel,
            {
              hero,
              description: description2,
              star,
              onStarChange: setStar,
              stats: stats2,
              races: races2,
              classes: classes2,
              recommendedItems
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-8 border-t border-brand-border space-y-8", children: [
          /* @__PURE__ */ jsx(HeroSkillBlock, { skill }),
          hero.lore && /* @__PURE__ */ jsx(HeroLoreSection, { lore: hero.lore }),
          /* @__PURE__ */ jsx(HeroTacticalSection, { notes: tacticalNotes })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(HeroRelatedSidebar, { hero, relatedComps })
    ] })
  ] });
}
const loader$4 = heroDetailLoader;
const meta$C = heroDetailMeta;
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeroDetailPage,
  loader: loader$4,
  meta: meta$C
}, Symbol.toStringTag, { value: "Module" }));
const FILTER_KEYS$3 = ["q", "tier", "category"];
const CATEGORIES$1 = ["attack", "defense", "magic", "utility"];
const TIERS = [1, 2, 3, 4, 5, 6];
function parseTier(value) {
  if (!value) return null;
  const n = Number(value);
  return n >= 1 && n <= 6 ? n : null;
}
function ItemsPage() {
  const { t } = useTranslation("pages");
  const { items: items2 } = useAppStore();
  const navigate = useNavigate();
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams();
  const searchTerm = getParam("q");
  const selectedTier = parseTier(getParam("tier"));
  const selectedCategory = getParam("category");
  const filteredItems = items2.filter((item) => {
    const category = item.category ?? inferItemCategory(item.stats);
    if (selectedTier && item.tier !== selectedTier) return false;
    if (selectedCategory && category !== selectedCategory) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  const activeFilters = hasActiveFilters([...FILTER_KEYS$3]);
  const categoryOptions = React.useMemo(
    () => [
      { value: "all", label: t("items.allCategories") },
      ...CATEGORIES$1.map((cat) => ({
        value: cat,
        label: t(`itemDetail.category.${cat}`)
      }))
    ],
    [t]
  );
  const tierSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("common:all") },
      ...TIERS.map((tier) => ({ value: String(tier), label: `B${tier}` }))
    ],
    [t]
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("items.title"),
        description: t("items.description"),
        icon: getPageIcon("items")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(FilterToolbar, { children: /* @__PURE__ */ jsxs(FilterToolbarRow, { children: [
        /* @__PURE__ */ jsx(
          FilterSearchInput,
          {
            value: searchTerm,
            onChange: (value) => setParams({ q: value || null }),
            placeholder: t("items.searchPlaceholder"),
            "aria-label": t("items.searchPlaceholder")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: selectedCategory || "all",
            onValueChange: (v) => setParams({ category: v === "all" ? null : v }),
            options: categoryOptions,
            "aria-label": t("items.filterByCategory")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: selectedTier != null ? String(selectedTier) : "all",
            onValueChange: (v) => setParams({ tier: v === "all" ? null : v }),
            options: tierSelectOptions,
            "aria-label": t("items.filterByTier")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterClearButton,
          {
            visible: activeFilters,
            onClick: () => clearParams([...FILTER_KEYS$3])
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(FilterResultMeta, { shown: filteredItems.length, total: items2.length, className: "px-1" })
    ] }),
    filteredItems.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-brand-border rounded-xl bg-brand-card/50", children: [
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub font-medium", children: t("items.empty") }),
      activeFilters && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: () => clearParams([...FILTER_KEYS$3]),
          className: "rounded-xl border-brand-border",
          children: t("common:clearFilters")
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredItems.map((item, idx) => /* @__PURE__ */ jsx(
      m.div,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.2, delay: idx * 0.02 },
        children: /* @__PURE__ */ jsxs(
          Card,
          {
            onClick: () => navigate(`/trang-bi/${item.id}`),
            className: "p-5 bg-brand-card border-brand-border hover:border-brand-gold/30 transition-all flex items-center gap-5 group cursor-pointer relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -right-4 -bottom-4 w-16 h-16 bg-white/[0.02] rounded-full group-hover:bg-brand-gold/5 transition-all" }),
              /* @__PURE__ */ jsxs("div", { className: "w-16 h-16 rounded-xl bg-brand-bg border border-brand-border flex-shrink-0 flex items-center justify-center overflow-hidden relative shadow-inner", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `w-10 h-10 rounded-sm bg-gradient-to-br ${item.tier >= 5 ? "from-tier-s to-brand-red shadow-[0_0_10px_rgba(242,92,84,0.35)]" : item.tier >= 4 ? "from-tier-a to-brand-gold-deep shadow-[0_0_10px_rgba(245,166,35,0.35)]" : item.tier === 3 ? "from-tier-b to-brand-green shadow-[0_0_10px_rgba(77,150,240,0.35)]" : "from-brand-card-2 to-brand-bg"}`
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[16px] font-semibold text-white leading-tight group-hover:text-brand-gold transition-colors uppercase truncate tracking-tight", children: item.name }),
                  /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-[12px] border-brand-border text-brand-text-sub font-bold px-1.5 h-4", children: [
                    "B",
                    item.tier
                  ] }),
                  /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[10px] border-none font-bold uppercase px-1.5 h-4 hidden sm:inline-flex", children: t(`itemDetail.category.${item.category ?? inferItemCategory(item.stats)}`) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-[12px] text-brand-text-sub leading-snug font-medium line-clamp-1 group-hover:line-clamp-none transition-all", children: item.stats })
              ] })
            ]
          }
        )
      },
      item.id
    )) }) })
  ] });
}
function meta$B() {
  return staticRouteMeta("/trang-bi");
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ItemsPage,
  meta: meta$B
}, Symbol.toStringTag, { value: "Module" }));
function ItemHeroHeader({ item }) {
  var _a;
  const { t } = useTranslation("pages");
  const category = item.category ?? inferItemCategory(item.stats);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "w-32 h-32 rounded-xl border-4 flex items-center justify-center p-6 shadow-2xl relative overflow-hidden shrink-0",
          itemTierBorderClass(item.tier)
        ),
        children: [
          item.imageUrl ? /* @__PURE__ */ jsx("img", { src: item.imageUrl, alt: item.name, className: "w-full h-full object-contain" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "w-16 h-16 rounded-lg bg-gradient-to-br",
                  itemTierGradientClass(item.tier)
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-inherit" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-inherit" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center md:justify-start gap-2", children: [
        /* @__PURE__ */ jsx(
          Badge,
          {
            variant: item.tier >= 4 ? "danger-solid" : "warning-solid",
            className: "px-3 py-1 text-xs font-bold rounded-md",
            children: t("common:tierBadge", { tier: item.tier })
          }
        ),
        /* @__PURE__ */ jsx(
          Badge,
          {
            variant: "secondary",
            className: "bg-brand-card-2 text-brand-text-sub border-none px-3 font-bold uppercase rounded-md",
            children: t(`itemDetail.category.${category}`)
          }
        ),
        (_a = item.tags) == null ? void 0 : _a.map((tag) => /* @__PURE__ */ jsx(
          Badge,
          {
            variant: "outline",
            className: "border-brand-border text-brand-gold text-[10px] font-bold uppercase rounded-md",
            children: tag
          },
          tag
        ))
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text-main tracking-tight leading-none", children: item.name }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-brand-text-sub font-medium leading-relaxed max-w-xl", children: item.description ?? item.stats })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none hidden md:block", children: /* @__PURE__ */ jsx(Swords, { className: "w-64 h-64 rotate-12" }) })
  ] });
}
function ItemEffectBlock({ effect }) {
  const { t } = useTranslation("pages");
  return /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 fill-brand-gold" }),
      t("itemDetail.specialEffect")
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-brand-bg p-6 rounded-xl border border-brand-border relative group", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-2 -top-2 w-12 h-12 bg-brand-gold/5 rounded-full blur-xl group-hover:bg-brand-gold/10 transition-all" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-brand-text-main font-semibold leading-relaxed relative z-10", children: effect })
    ] })
  ] });
}
const toneClass = {
  gold: "text-brand-gold",
  red: "text-brand-red",
  green: "text-brand-green",
  default: "text-brand-text-main"
};
function ItemStatGrid({ stats: stats2 }) {
  const { t } = useTranslation("pages");
  if (stats2.length === 0) return null;
  return /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("itemDetail.statBonusesTitle") }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: stats2.map((stat) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-brand-bg p-5 rounded-xl border border-brand-border text-center space-y-1",
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase tracking-widest", children: stat.label }),
          /* @__PURE__ */ jsx("div", { className: cn("text-2xl font-bold", toneClass[stat.tone ?? "default"]), children: stat.value })
        ]
      },
      `${stat.label}-${stat.value}`
    )) })
  ] });
}
function ItemTacticalSection({ notes }) {
  const { t } = useTranslation("pages");
  if (notes.length === 0) return null;
  return /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4" }),
      t("itemDetail.tacticalReview")
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-brand-text-sub text-sm leading-relaxed font-medium", children: notes.map((note) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-bold shrink-0", children: "»" }),
      /* @__PURE__ */ jsx("span", { children: note })
    ] }, note)) })
  ] });
}
const COMP_TIER_VARIANT = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c"
};
function ItemRelatedSidebar({
  item,
  recommendedHeroes,
  relatedComps,
  relatedItems
}) {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 space-y-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("itemDetail.recommendedHeroes") }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: recommendedHeroes.map((h) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/tuong/${h.id}`,
          className: "flex items-center gap-4 p-3 rounded-xl hover:bg-brand-card-2 border border-transparent hover:border-brand-border transition-all group",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "w-12 h-12 rounded-lg bg-brand-bg border flex items-center justify-center text-xs font-bold transition-all group-hover:shadow-[0_0_10px_rgba(245,180,60,0.2)]",
                  heroCostBadgeClass(h.cost)
                ),
                children: h.name.substring(0, 2)
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-brand-text-main group-hover:text-brand-gold transition-colors truncate", children: h.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase tracking-wider", children: [
                h.class.length > 0 ? h.class.join(" · ") : t("heroDetail.traitUndefined"),
                " •",
                " ",
                t("itemDetail.goldCost", { cost: h.cost })
              ] })
            ] })
          ]
        },
        h.id
      )) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          className: "w-full border-brand-border h-12 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black",
          onClick: () => navigate("/tuong"),
          children: t("itemDetail.viewAllHeroes")
        }
      )
    ] }),
    relatedComps.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("itemDetail.relatedComps") }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: relatedComps.map((comp) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/doi-hinh/${comp.id}`,
          className: "block p-3 rounded-xl border border-brand-border hover:border-brand-gold/30 bg-brand-bg transition-all group",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-brand-text-main group-hover:text-brand-gold truncate", children: comp.name }),
              /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: COMP_TIER_VARIANT[comp.tier] ?? "tier-c",
                  className: "shrink-0 rounded-md",
                  children: comp.tier
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-brand-text-sub", children: [
              comp.winRate,
              " win rate"
            ] })
          ]
        },
        comp.id
      )) })
    ] }),
    relatedItems.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold", children: t("itemDetail.relatedItems") }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: relatedItems.map((related) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/trang-bi/${related.id}`,
          className: "flex items-center gap-3 p-3 rounded-xl border border-brand-border bg-brand-bg hover:border-brand-gold/30 transition-all group",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "w-10 h-10 rounded-lg bg-gradient-to-br shrink-0",
                  itemTierGradientClass(related.tier)
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[12px] font-bold text-brand-text-main group-hover:text-brand-gold truncate", children: related.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-brand-text-sub", children: [
                "B",
                related.tier
              ] })
            ] })
          ]
        },
        related.id
      )) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 space-y-4 relative overflow-hidden group", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity", children: /* @__PURE__ */ jsx(Info, { className: "w-24 h-24 text-brand-text-main" }) }),
      /* @__PURE__ */ jsxs("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 fill-brand-gold" }),
        t("itemDetail.metaAnalysisTitle")
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed font-medium", children: item.tier >= 4 ? t("itemDetail.metaAnalysisHighTier") : t("itemDetail.metaAnalysisSituational") }),
      item.tags && item.tags.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Separator, { className: "bg-brand-card-2" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: item.tags.map((tag) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-brand-border text-brand-text-sub text-[10px] rounded-md", children: tag }, tag)) })
      ] })
    ] })
  ] });
}
function ItemDetailPage() {
  const { t } = useTranslation("pages");
  const { id } = useParams();
  const { items: items2, heroes: heroes2, comps: comps2 } = useAppStore();
  const navigate = useNavigate();
  const item = items2.find((i) => i.id === id);
  if (!item) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: t("itemDetail.notFound") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/trang-bi"), children: t("common:backToList") })
    ] });
  }
  const statBonuses = parseStatBonuses(item.stats);
  const effectText = item.effect ?? item.stats;
  const tacticalNotes = item.tacticalNotes ?? [];
  const recommendedHeroes = getRecommendedHeroes(item, heroes2);
  const relatedComps = getCompsForItem(item, comps2, heroes2);
  const relatedItems = getRelatedItems(item, items2);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(BackButton, { to: "/trang-bi", label: t("common:backToList") }),
    /* @__PURE__ */ jsx(
      DetailBreadcrumb,
      {
        items: [
          { label: t("itemDetail.breadcrumbLibrary", { defaultValue: "Trang bị" }), href: "/trang-bi" },
          { label: item.name }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-8", children: /* @__PURE__ */ jsx(m.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-8 md:p-10 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx(ItemHeroHeader, { item }),
        /* @__PURE__ */ jsx(Separator, { className: "my-10 bg-brand-card-2" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsx(ItemEffectBlock, { effect: effectText }),
          /* @__PURE__ */ jsx(ItemStatGrid, { stats: statBonuses }),
          /* @__PURE__ */ jsx(ItemTacticalSection, { notes: tacticalNotes })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(
        ItemRelatedSidebar,
        {
          item,
          recommendedHeroes,
          relatedComps,
          relatedItems
        }
      )
    ] })
  ] });
}
const loader$3 = itemDetailLoader;
const meta$A = itemDetailMeta;
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ItemDetailPage,
  loader: loader$3,
  meta: meta$A
}, Symbol.toStringTag, { value: "Module" }));
const FILTER_KEYS$2 = ["q", "type"];
function RelicsPage() {
  const { t } = useTranslation("pages");
  const { relics: relics2 } = useAppStore();
  const navigate = useNavigate();
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams();
  const searchTerm = getParam("q");
  const selectedType = getParam("type");
  const activeRelics = React.useMemo(
    () => relics2.filter((relic) => relic.status === "Hiện"),
    [relics2]
  );
  const typeOptions = React.useMemo(() => {
    const types = Array.from(new Set(activeRelics.map((r) => r.type)));
    return [
      { value: "all", label: t("common:all") },
      ...types.map((type) => ({ value: type, label: type }))
    ];
  }, [activeRelics, t]);
  const filteredRelics = activeRelics.filter((relic) => {
    if (searchTerm && !relic.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedType && relic.type !== selectedType) return false;
    return true;
  });
  const activeFilters = hasActiveFilters([...FILTER_KEYS$2]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("relics.title"),
        description: t("relics.description"),
        icon: getPageIcon("relics")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(FilterToolbar, { children: /* @__PURE__ */ jsxs(FilterToolbarRow, { children: [
        /* @__PURE__ */ jsx(
          FilterSearchInput,
          {
            value: searchTerm,
            onChange: (value) => setParams({ q: value || null }),
            placeholder: t("relics.searchPlaceholder"),
            "aria-label": t("relics.searchPlaceholder")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            value: selectedType || "all",
            onValueChange: (v) => setParams({ type: v === "all" ? null : v }),
            options: typeOptions,
            "aria-label": t("relics.filterByType")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterClearButton,
          {
            visible: activeFilters,
            onClick: () => clearParams([...FILTER_KEYS$2])
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(FilterResultMeta, { shown: filteredRelics.length, total: activeRelics.length, className: "px-1" })
    ] }),
    filteredRelics.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-brand-border rounded-xl bg-brand-card/50", children: [
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub font-medium", children: t("relics.empty") }),
      activeFilters && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: () => clearParams([...FILTER_KEYS$2]),
          className: "rounded-xl border-brand-border",
          children: t("common:clearFilters")
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredRelics.map((relic, idx) => /* @__PURE__ */ jsx(
      m.div,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.2, delay: idx * 0.05 },
        children: /* @__PURE__ */ jsxs(
          Card,
          {
            onClick: () => navigate(`/di-vat/${relic.id}`),
            className: "bg-brand-card border-brand-border hover:border-brand-gold/30 transition-all group relative overflow-hidden h-full flex flex-col p-5 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity", children: /* @__PURE__ */ jsx(Info, { className: "w-16 h-16 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4 relative z-10", children: [
                /* @__PURE__ */ jsxs(
                  Badge,
                  {
                    variant: relic.rating === "S" ? "danger-solid" : "warning-solid",
                    className: "rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-lg uppercase tracking-widest",
                    children: [
                      "Tier ",
                      relic.rating
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub bg-brand-card-2 px-2 py-1 rounded", children: relic.type })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3 group-hover:text-brand-gold transition-colors relative z-10 uppercase tracking-tight", children: relic.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 text-[13px] text-brand-text-sub leading-relaxed relative z-10 bg-brand-bg p-3 rounded-xl border border-brand-border font-medium", children: [
                "“",
                relic.effect,
                "”"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-brand-border flex items-center justify-between relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase tracking-widest", children: t("relics.priority", { tier: relic.tier }) }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "h-8 group-hover:bg-brand-gold group-hover:text-black transition-all rounded-lg text-[10px] font-bold uppercase tracking-widest",
                    children: [
                      t("common:details").toUpperCase(),
                      " ",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 ml-1" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `absolute -bottom-10 -right-10 w-24 h-24 blur-[50px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${relic.rating === "S" ? "bg-brand-red/20" : "bg-brand-gold/20"}`
                }
              )
            ]
          }
        )
      },
      relic.id
    )) }) })
  ] });
}
function meta$z() {
  return staticRouteMeta("/di-vat");
}
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RelicsPage,
  meta: meta$z
}, Symbol.toStringTag, { value: "Module" }));
function RelicDetailPage() {
  const { t } = useTranslation("pages");
  const { id } = useParams();
  const { relics: relics2 } = useAppStore();
  const navigate = useNavigate();
  const relic = relics2.find((r) => r.id === id);
  if (!relic) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: t("relicDetail.notFound") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/di-vat"), children: t("common:backToList") })
    ] });
  }
  const relatedRelics = relics2.filter((r) => r.id !== id && r.type === relic.type).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(BackButton, { to: "/di-vat", label: t("common:backToList") }),
    /* @__PURE__ */ jsx(
      DetailBreadcrumb,
      {
        items: [
          { label: t("relicDetail.breadcrumbLibrary", { defaultValue: "Dị vật" }), href: "/di-vat" },
          { label: relic.name }
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      m.div,
      {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-0 overflow-hidden relative shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "h-48 w-full bg-gradient-to-br from-brand-card via-brand-bg to-brand-card relative flex items-center justify-center overflow-hidden border-b border-brand-border", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/20 via-transparent to-transparent" }) }),
            /* @__PURE__ */ jsx(Globe, { className: "w-24 h-24 text-brand-gold/10 animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2", children: /* @__PURE__ */ jsxs(Badge, { variant: relic.rating === "S" ? "danger-solid" : "warning-solid", className: "px-4 py-1 text-sm font-bold rounded-xl shadow-lg ring-4 ring-black/50", children: [
              "TIER ",
              relic.rating
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-12 space-y-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-none", children: relic.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 text-[12px] font-bold text-brand-text-sub uppercase tracking-widest", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-brand-card-2 px-3 py-1 rounded-lg text-brand-gold", children: relic.type }),
                /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub", children: "|" }),
                /* @__PURE__ */ jsx("span", { children: t("relicDetail.priority", { tier: relic.tier }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, { className: "bg-brand-card-2" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 fill-brand-gold" }),
                    " ",
                    t("relicDetail.specialEffect")
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-brand-bg p-6 rounded-xl border border-brand-border relative group", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute -right-2 -top-2 w-12 h-12 bg-brand-gold/5 rounded-full blur-xl group-hover:bg-brand-gold/10 transition-all" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xl text-white font-bold leading-relaxed", children: [
                      '"',
                      relic.effect,
                      '"'
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4" }),
                    " ",
                    t("relicDetail.tacticalReview")
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none text-brand-text-sub text-sm leading-relaxed space-y-4 font-medium", children: [
                    /* @__PURE__ */ jsxs("p", { children: [
                      "Dị vật ",
                      /* @__PURE__ */ jsx("strong", { children: relic.name }),
                      " là một trong những lựa chọn mạnh mẽ nhất trong giai đoạn hiện tại. Với khả năng ",
                      relic.effect.toLowerCase(),
                      ", nó giúp xoay chuyển cục diện trận đấu cực kỳ nhanh chóng."
                    ] }),
                    /* @__PURE__ */ jsxs("ul", { className: "space-y-2 list-none p-0", children: [
                      /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-bold", children: "»" }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          "Ưu tiên lấy khi bạn có ít nhất 2 tướng nòng cốt thuộc hệ ",
                          relic.type,
                          "."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-bold", children: "»" }),
                        /* @__PURE__ */ jsx("span", { children: "Phát huy tối đa sức mạnh khi kết hợp với các đội hình có khả năng khống chế." })
                      ] })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-brand-bg p-6 rounded-xl border border-brand-border text-center space-y-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase tracking-widest", children: t("relicDetail.stats.appearance") }),
                  /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-brand-gold", children: "12%" }),
                  /* @__PURE__ */ jsx(Separator, { className: "bg-brand-card-2" }),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase tracking-widest", children: t("relicDetail.stats.winRate") }),
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-brand-green", children: "24.5%" })
                ] }),
                /* @__PURE__ */ jsx(Button, { className: "w-full bg-gold-gradient text-black h-14 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-brand-gold/5", children: t("relicDetail.addToBuilder") })
              ] })
            ] }),
            relatedRelics.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-10 border-t border-brand-border space-y-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[12px] font-bold uppercase tracking-[0.2em] text-brand-text-sub", children: t("relicDetail.relatedRelics") }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: relatedRelics.map((r) => /* @__PURE__ */ jsxs(
                "div",
                {
                  onClick: () => navigate(`/di-vat/${r.id}`),
                  className: "bg-brand-bg border border-brand-border p-4 rounded-xl hover:border-brand-gold/30 transition-all cursor-pointer group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-white uppercase group-hover:text-brand-gold transition-colors mb-1", children: r.name }),
                    /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase", children: [
                      "TIER ",
                      r.rating
                    ] })
                  ]
                },
                r.id
              )) })
            ] })
          ] })
        ] })
      }
    )
  ] });
}
const loader$2 = relicDetailLoader;
const meta$y = relicDetailMeta;
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RelicDetailPage,
  loader: loader$2,
  meta: meta$y
}, Symbol.toStringTag, { value: "Module" }));
const TeamBuilderTool = React.lazy(
  () => import("./TeamBuilderTool-Bml5Tr0a.js").then((m2) => ({ default: m2.TeamBuilderTool }))
);
const CompRecommenderTool = React.lazy(
  () => import("./CompRecommenderTool-D6QkMCf_.js").then((m2) => ({ default: m2.CompRecommenderTool }))
);
const CompComparisonTool = React.lazy(
  () => import("./CompComparisonTool-Djyh7q50.js").then((m2) => ({ default: m2.CompComparisonTool }))
);
const HeroComparisonTool = React.lazy(
  () => import("./HeroComparisonTool-Cc54TNMn.js").then((m2) => ({ default: m2.HeroComparisonTool }))
);
const BanAdvisorTool = React.lazy(
  () => import("./BanAdvisorTool-4dlKL5cD.js").then((m2) => ({ default: m2.BanAdvisorTool }))
);
function ToolRouteFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-16 text-center text-brand-text-sub text-[13px]", children: "Đang tải công cụ..." });
}
function LazyTool({ children }) {
  return /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(ToolRouteFallback, {}), children });
}
function ToolsPage() {
  var _a;
  const { t } = useTranslation("tools");
  const location = useLocation();
  const navigate = useNavigate();
  const tools2 = React.useMemo(
    () => getToolNavChildren().map((child) => {
      const id = child.path.replace("/cong-cu/", "");
      const labelKey = TOOL_SLUG_TO_I18N[id] ?? id;
      return {
        id,
        icon: child.icon,
        name: t(`list.${labelKey}.name`),
        desc: t(`list.${labelKey}.desc`)
      };
    }),
    [t]
  );
  const currentPath = location.pathname.split("/").pop();
  const currentToolId = ((_a = tools2.find((tool) => tool.id === currentPath)) == null ? void 0 : _a.id) || "tao-doi-hinh";
  React.useEffect(() => {
    if (location.pathname === "/cong-cu" || location.pathname === "/cong-cu/") {
      navigate("/cong-cu/tao-doi-hinh", { replace: true });
    }
  }, [location.pathname, navigate]);
  const currentTool = tools2.find((tool) => tool.id === currentToolId);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: (currentTool == null ? void 0 : currentTool.name) ?? t("pageTitle"),
        description: currentTool == null ? void 0 : currentTool.desc,
        icon: currentTool == null ? void 0 : currentTool.icon
      }
    ),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "tao-doi-hinh",
          element: /* @__PURE__ */ jsx(LazyTool, { children: /* @__PURE__ */ jsx(TeamBuilderTool, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "tim-doi-hinh",
          element: /* @__PURE__ */ jsx(LazyTool, { children: /* @__PURE__ */ jsx(CompRecommenderTool, {}) })
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "kich-hoat-toc-he", element: /* @__PURE__ */ jsx(Navigate$1, { to: "/cong-cu/tao-doi-hinh", replace: true }) }),
      /* @__PURE__ */ jsx(Route, { path: "danh-gia-suc-manh", element: /* @__PURE__ */ jsx(Navigate$1, { to: "/doi-hinh", replace: true }) }),
      /* @__PURE__ */ jsx(Route, { path: "de-xuat-trang-bi", element: /* @__PURE__ */ jsx(Navigate$1, { to: "/tuong", replace: true }) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "ban-advisor",
          element: /* @__PURE__ */ jsx(LazyTool, { children: /* @__PURE__ */ jsx(BanAdvisorTool, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "so-sanh-tuong",
          element: /* @__PURE__ */ jsx(LazyTool, { children: /* @__PURE__ */ jsx(HeroComparisonTool, {}) })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "so-sanh-doi-hinh",
          element: /* @__PURE__ */ jsx(LazyTool, { children: /* @__PURE__ */ jsx(CompComparisonTool, {}) })
        }
      )
    ] })
  ] });
}
function meta$x() {
  return staticRouteMeta("/cong-cu");
}
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ToolsPage,
  meta: meta$x
}, Symbol.toStringTag, { value: "Module" }));
function NewsFeaturedHero({ post, onClick }) {
  const { t } = useTranslation(["news", "common"]);
  const readingMin = estimateReadingMinutes(post.content ?? post.excerpt ?? post.title);
  const hasCover = Boolean(post.coverImageUrl);
  return /* @__PURE__ */ jsx(
    Card,
    {
      className: "bg-brand-card border-brand-border p-0 overflow-hidden cursor-pointer group rounded-xl hover:border-brand-gold/20 transition-colors",
      onClick,
      children: /* @__PURE__ */ jsxs("div", { className: "relative min-h-[280px] sm:min-h-[360px]", children: [
        hasCover ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: post.coverImageUrl,
              alt: "",
              className: "absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-brand-bg/20" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute inset-0",
                post.image && !isPostImageUrl(post.image) ? post.image : "bg-brand-card-2"
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col justify-end min-h-[280px] sm:min-h-[360px] p-6 sm:p-8 gap-4", children: [
          /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "w-fit bg-brand-gold/10 text-brand-gold border-none font-semibold text-[10px]",
              children: t("news:featured")
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-brand-text-main group-hover:text-brand-gold transition-colors leading-tight max-w-3xl", children: post.title }),
          post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-[14px] text-brand-text-sub line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl", children: post.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-brand-text-sub", children: [
            /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-medium", children: post.author }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5", "aria-hidden": true }),
              post.views
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5", "aria-hidden": true }),
              t("news:readingMinutes", { n: readingMin })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5", "aria-hidden": true }),
              post.date ? formatDate(post.date) : t("common:today")
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function PostCardThumb({
  coverImageUrl,
  imageToken,
  category,
  className
}) {
  if (coverImageUrl) {
    return /* @__PURE__ */ jsx("div", { className: cn("h-40 w-full overflow-hidden bg-brand-card-2", className), children: /* @__PURE__ */ jsx(
      "img",
      {
        src: coverImageUrl,
        alt: "",
        className: "w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300",
        loading: "lazy"
      }
    ) });
  }
  const tokenClass = imageToken && !isPostImageUrl(imageToken) ? imageToken : "bg-brand-card-2";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "h-40 w-full flex items-center justify-center relative overflow-hidden",
        tokenClass,
        className
      ),
      children: /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub/30 font-bold text-lg tracking-tight", children: category })
    }
  );
}
function NewsSecondaryCard({ post, onClick }) {
  const { t } = useTranslation(["news", "common"]);
  const readingMin = estimateReadingMinutes(post.content ?? post.excerpt ?? post.title);
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: "bg-brand-card border-brand-border p-0 overflow-hidden flex flex-col sm:flex-row group cursor-pointer h-full rounded-xl hover:border-brand-gold/20 transition-colors",
      onClick,
      children: [
        /* @__PURE__ */ jsx(
          PostCardThumb,
          {
            coverImageUrl: post.coverImageUrl,
            imageToken: post.image,
            category: post.category,
            className: "h-40 sm:h-auto sm:w-[42%] sm:min-h-[180px] shrink-0"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col gap-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "w-fit bg-brand-card-2 border-brand-border font-semibold text-[10px]",
              children: post.category
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[16px] leading-snug text-brand-text-main group-hover:text-brand-gold transition-colors line-clamp-2", children: post.title }),
          post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub line-clamp-2 leading-relaxed hidden sm:block", children: post.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-brand-text-sub pt-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-medium", children: post.author }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3", "aria-hidden": true }),
              post.views
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3", "aria-hidden": true }),
              t("news:readingMinutes", { n: readingMin })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3", "aria-hidden": true }),
              post.date ? formatDate(post.date) : t("common:today")
            ] })
          ] })
        ] })
      ]
    }
  );
}
function NewsPostCard({ post, onClick }) {
  const { t } = useTranslation(["news", "common"]);
  const readingMin = estimateReadingMinutes(post.content ?? post.excerpt ?? post.title);
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: "bg-brand-card border-brand-border p-0 overflow-hidden flex flex-col group cursor-pointer h-full rounded-xl hover:border-brand-gold/20 transition-colors",
      onClick,
      children: [
        /* @__PURE__ */ jsx(
          PostCardThumb,
          {
            coverImageUrl: post.coverImageUrl,
            imageToken: post.image,
            category: post.category
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "p-5 flex-1 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "w-fit bg-brand-card-2 border-brand-border font-semibold text-[10px]",
              children: post.category
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[17px] leading-snug text-brand-text-main group-hover:text-brand-gold transition-colors", children: post.title }),
          post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub line-clamp-2 leading-relaxed", children: post.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between text-[12px] text-brand-text-sub pt-2 gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsxs("span", { className: "text-brand-text-sub", children: [
                t("news:writtenBy"),
                " "
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-medium", children: post.author })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 font-mono", children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5", "aria-hidden": true }),
                post.views
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5", "aria-hidden": true }),
                t("news:readingMinutes", { n: readingMin })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5", "aria-hidden": true }),
                post.date ? formatDate(post.date) : t("common:today")
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function NewsSidebar({
  categories,
  popularPosts,
  selectedCategory,
  onCategorySelect,
  onPostClick
}) {
  const { t } = useTranslation(["news", "nav"]);
  return /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-brand-text-main tracking-tight", children: t("news:categoriesTitle") }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onCategorySelect(null),
            className: cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors",
              !selectedCategory ? "bg-gold-gradient text-black font-semibold" : "text-brand-text-sub hover:text-brand-text-main hover:bg-brand-card-2"
            ),
            children: /* @__PURE__ */ jsx("span", { children: t("news:allCategories") })
          }
        ) }),
        categories.map(({ name, count }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => onCategorySelect(name),
            className: cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors",
              selectedCategory === name ? "bg-gold-gradient text-black font-semibold" : "text-brand-text-sub hover:text-brand-text-main hover:bg-brand-card-2"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "truncate pr-2", children: name }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "text-[11px] font-mono shrink-0",
                    selectedCategory === name ? "text-black/70" : "text-brand-text-sub"
                  ),
                  children: count
                }
              )
            ]
          }
        ) }, name))
      ] })
    ] }),
    popularPosts.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-brand-text-main tracking-tight", children: t("news:popularArticles") }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: popularPosts.map((post, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onPostClick(post.id),
          className: "w-full text-left group flex gap-3 items-start",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-brand-gold w-5 shrink-0 pt-0.5", children: String(index + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug", children: post.title }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] text-brand-text-sub", children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3", "aria-hidden": true }),
                post.views
              ] })
            ] })
          ]
        }
      ) }, post.id)) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-5 space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-brand-gold", children: [
        /* @__PURE__ */ jsx(MessagesSquare, { className: "w-4 h-4", "aria-hidden": true }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-brand-text-main tracking-tight", children: t("nav:discussion") })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed", children: t("news:sidebarDiscussionDesc") }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "w-full rounded-xl border-brand-border", children: /* @__PURE__ */ jsx(Link, { to: "/thao-luan", children: t("news:sidebarDiscussionCta") }) })
    ] })
  ] });
}
const FILTER_KEYS$1 = ["q", "category", "author", "time"];
function NewsPage() {
  const { t } = useTranslation(["news", "common"]);
  const { posts } = useAppStore();
  const navigate = useNavigate();
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams();
  const searchTerm = getParam("q");
  const selectedCategory = getParam("category") || null;
  const selectedAuthor = getParam("author") || null;
  const selectedTime = parseTimeRange(getParam("time") || null);
  const activeFilters = hasActiveFilters([...FILTER_KEYS$1]);
  const publishedPosts = React.useMemo(() => getPublishedPosts(posts), [posts]);
  const filteredPosts = React.useMemo(
    () => filterNewsPosts(posts, {
      q: searchTerm,
      category: selectedCategory,
      author: selectedAuthor,
      time: selectedTime
    }),
    [posts, searchTerm, selectedCategory, selectedAuthor, selectedTime]
  );
  const categoryCounts = React.useMemo(() => getCategoryCounts(publishedPosts), [publishedPosts]);
  const popularPosts = React.useMemo(() => getPopularPosts(publishedPosts, 5), [publishedPosts]);
  const allAuthors = React.useMemo(() => getPostAuthors(publishedPosts), [publishedPosts]);
  const authorChipOptions = React.useMemo(
    () => allAuthors.map((author) => ({ value: author, label: author })),
    [allAuthors]
  );
  const timeChipOptions = React.useMemo(
    () => NEWS_TIME_RANGES.map((range) => ({
      value: range,
      label: t(
        range === "7d" ? "news:time7d" : range === "30d" ? "news:time30d" : "news:time90d"
      )
    })),
    [t]
  );
  const showEditorial = !activeFilters;
  const { featured: featured2, secondary, rest } = React.useMemo(
    () => splitFeaturedPosts(publishedPosts),
    [publishedPosts]
  );
  const openPost = (postId) => navigate(`/tin-tuc/${postId}`);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("news:listTitle"),
        description: t("news:listDescription"),
        icon: getPageIcon("news")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(FilterToolbar, { children: /* @__PURE__ */ jsxs(FilterToolbarRow, { children: [
        /* @__PURE__ */ jsx(
          FilterSearchInput,
          {
            value: searchTerm,
            onChange: (value) => setParams({ q: value || null }),
            placeholder: t("news:searchPlaceholder"),
            "aria-label": t("news:searchPlaceholder")
          }
        ),
        authorChipOptions.length > 0 && /* @__PURE__ */ jsx(
          FilterChipGroup,
          {
            options: authorChipOptions,
            selected: selectedAuthor,
            onSelect: (value) => setParams({ author: value }),
            label: t("news:filterByAuthor")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterChipGroup,
          {
            options: timeChipOptions,
            selected: selectedTime,
            onSelect: (value) => setParams({ time: value }),
            label: t("news:filterByTime")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterClearButton,
          {
            visible: activeFilters,
            onClick: () => clearParams([...FILTER_KEYS$1])
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(
        FilterResultMeta,
        {
          shown: filteredPosts.length,
          total: publishedPosts.length,
          className: "px-1"
        }
      )
    ] }),
    filteredPosts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-brand-border rounded-xl bg-brand-card/50", children: [
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub font-medium", children: t("news:emptyFiltered") }),
      activeFilters && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: () => clearParams([...FILTER_KEYS$1]),
          className: "rounded-xl border-brand-border",
          children: t("common:clearFilters")
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 min-w-0", children: [
        showEditorial && /* @__PURE__ */ jsxs(Fragment, { children: [
          featured2 && /* @__PURE__ */ jsx(NewsFeaturedHero, { post: featured2, onClick: () => openPost(featured2.id) }),
          secondary.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: secondary.map((post, idx) => /* @__PURE__ */ jsx(
            m.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: Math.min(idx * 0.05, 0.2) },
              children: /* @__PURE__ */ jsx(NewsSecondaryCard, { post, onClick: () => openPost(post.id) })
            },
            post.id
          )) })
        ] }),
        showEditorial ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(SectionHeader, { title: t("news:latestArticles") }),
          rest.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: rest.map((post, idx) => /* @__PURE__ */ jsx(
            m.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: Math.min(idx * 0.04, 0.25) },
              children: /* @__PURE__ */ jsx(NewsPostListItem, { post, onClick: () => openPost(post.id) })
            },
            post.id
          )) }) : /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-8 text-center rounded-xl", children: /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm", children: t("news:noMoreArticles") }) })
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filteredPosts.map((post, idx) => /* @__PURE__ */ jsx(
          m.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: Math.min(idx * 0.04, 0.25) },
            children: /* @__PURE__ */ jsx(NewsPostCard, { post, onClick: () => openPost(post.id) })
          },
          post.id
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-24 self-start", children: /* @__PURE__ */ jsx(
        NewsSidebar,
        {
          categories: categoryCounts,
          popularPosts,
          selectedCategory,
          onCategorySelect: (category) => setParams({ category }),
          onPostClick: openPost
        }
      ) })
    ] })
  ] });
}
function meta$w() {
  return staticRouteMeta("/tin-tuc");
}
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsPage,
  meta: meta$w
}, Symbol.toStringTag, { value: "Module" }));
function ArticleProse$1({ content, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("article-prose", className), children: /* @__PURE__ */ jsx(Markdown, { remarkPlugins: [remarkGfm], children: content }) });
}
const ArticleProse$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArticleProse: ArticleProse$1
}, Symbol.toStringTag, { value: "Module" }));
function PostHero({ category, coverImageUrl, imageToken }) {
  if (coverImageUrl) {
    return /* @__PURE__ */ jsxs("div", { className: "h-[220px] sm:h-[280px] w-full relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: coverImageUrl, alt: "", className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent" })
    ] });
  }
  const tokenClass = imageToken && !isPostImageUrl(imageToken) ? imageToken : "bg-brand-card-2";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "h-[220px] sm:h-[280px] w-full relative flex items-center justify-center",
        tokenClass
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-80" }),
        /* @__PURE__ */ jsx("span", { className: "relative z-10 text-brand-text-sub/40 font-bold text-2xl sm:text-3xl tracking-tight select-none", children: category })
      ]
    }
  );
}
function NewsDetailPage() {
  const { t } = useTranslation(["news", "nav"]);
  const { id } = useParams();
  const { posts } = useAppStore();
  const navigate = useNavigate();
  const [copied2, setCopied] = React.useState(false);
  const post = posts.find((p) => p.id === id);
  const relatedPosts2 = React.useMemo(() => {
    if (!post || post.status !== "Xuất bản") return [];
    const published = posts.filter((p) => p.id !== post.id && p.status === "Xuất bản");
    const sameCategory = published.filter((p) => p.category === post.category);
    const others = published.filter((p) => p.category !== post.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [posts, post]);
  const related = React.useMemo(() => {
    if (!post || post.status !== "Xuất bản") return [];
    return posts.filter((p) => p.id !== post.id && p.status === "Xuất bản" && p.category === post.category).slice(0, 3);
  }, [posts, post]);
  const recent = React.useMemo(() => {
    if (!post || post.status !== "Xuất bản") return [];
    return posts.filter((p) => p.id !== post.id && p.status === "Xuất bản").slice(0, 4);
  }, [posts, post]);
  if (!post) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2 text-white", children: t("notFoundTitle") }),
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm mb-6", children: t("notFoundDesc") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/tin-tuc"), children: t("backToList") })
    ] });
  }
  if (post.status !== "Xuất bản") {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mb-4", children: post.status }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2 text-white", children: t("unpublishedTitle") }),
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm mb-6", children: t("unpublishedDesc") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/tin-tuc"), children: t("backToList") })
    ] });
  }
  const bodyText = post.content || post.excerpt || "";
  const readingMin = estimateReadingMinutes(bodyText);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-16", children: [
    /* @__PURE__ */ jsx(BackButton, { to: "/tin-tuc", label: t("backToList") }),
    /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap items-center gap-1.5 text-[12px] text-brand-text-sub", children: [
      /* @__PURE__ */ jsx(Link, { to: "/tin-tuc", className: "hover:text-brand-gold transition-colors", children: t("nav:news") }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 opacity-50" }),
      /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub", children: post.category }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 opacity-50" }),
      /* @__PURE__ */ jsx("span", { className: "text-white line-clamp-1 max-w-[200px] sm:max-w-md", children: post.title })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start", children: [
      /* @__PURE__ */ jsx(m.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl", children: [
        /* @__PURE__ */ jsx(
          PostHero,
          {
            category: post.category,
            coverImageUrl: post.coverImageUrl,
            imageToken: post.image
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "secondary",
                className: "bg-brand-gold/10 text-brand-gold border-none px-3 py-1 font-semibold text-[11px]",
                children: post.category
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-bold leading-tight text-white tracking-tight", children: post.title }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-4 text-[12px] text-brand-text-sub", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-brand-card-2 flex items-center justify-center text-brand-gold font-bold border border-brand-border text-sm", children: post.author.charAt(0) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-white", children: post.author }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-0.5", children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5" }),
                    " ",
                    post.date
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5" }),
                    " ",
                    post.views
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
                    " ",
                    t("readingMinutes", { n: readingMin })
                  ] })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "bg-brand-border" }),
          post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-[16px] text-brand-text-main font-medium border-l-4 border-brand-gold pl-4 py-2 bg-brand-card-2/50 rounded-r-xl leading-relaxed", children: post.excerpt }),
          post.content ? /* @__PURE__ */ jsx(ArticleProse$1, { content: post.content }) : /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub leading-relaxed", children: post.excerpt || t("contentPending") }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-brand-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-brand-text-sub font-semibold", children: [
              /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 text-brand-gold" }),
              t("shareTitle")
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-9 w-9 rounded-xl bg-brand-card-2 hover:bg-brand-gold/10 hover:text-brand-gold border border-brand-border",
                  onClick: () => window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    "_blank",
                    "noopener,noreferrer"
                  ),
                  "aria-label": t("shareFacebook"),
                  children: /* @__PURE__ */ jsx(Facebook, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-9 w-9 rounded-xl bg-brand-card-2 hover:bg-brand-gold/10 hover:text-brand-gold border border-brand-border",
                  onClick: () => window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
                    "_blank",
                    "noopener,noreferrer"
                  ),
                  "aria-label": t("shareTwitter"),
                  children: /* @__PURE__ */ jsx(Twitter, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-9 w-9 rounded-xl bg-brand-card-2 hover:bg-brand-gold/10 hover:text-brand-gold border border-brand-border",
                  onClick: copyLink,
                  "aria-label": t("copyLinkAria"),
                  children: /* @__PURE__ */ jsx(Link$2, { className: "w-4 h-4" })
                }
              ),
              copied2 && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-green font-semibold", children: t("copied") })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-6 lg:sticky lg:top-24", children: [
        related.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[13px] font-bold text-white tracking-tight", children: t("relatedSameCategory") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: related.map((r) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: `/tin-tuc/${r.id}`,
              className: "text-[13px] text-brand-text-sub hover:text-brand-gold transition-colors line-clamp-2 leading-snug block",
              children: r.title
            }
          ) }, r.id)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[13px] font-bold text-white tracking-tight", children: t("recentPosts") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: recent.map((r) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono text-brand-text-sub shrink-0", children: r.date }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `/tin-tuc/${r.id}`,
                className: "text-[13px] text-brand-text-sub hover:text-brand-gold transition-colors line-clamp-2 leading-snug",
                children: r.title
              }
            )
          ] }, r.id)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-brand-gold", children: [
            /* @__PURE__ */ jsx(Wrench, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("h3", { className: "text-[13px] font-bold text-white tracking-tight", children: t("metaToolsTitle") })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub leading-relaxed", children: t("metaToolsDesc") }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/cong-cu/tim-doi-hinh",
              className: "inline-flex w-full items-center justify-center h-10 px-4 rounded-xl border border-brand-border bg-transparent text-[12px] font-semibold text-brand-text-main hover:bg-brand-card-2 transition-colors",
              children: t("metaToolsCta")
            }
          )
        ] })
      ] })
    ] }),
    relatedPosts2.length > 0 && /* @__PURE__ */ jsxs("section", { className: "space-y-4 pt-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white tracking-tight", children: t("relatedPosts") }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: relatedPosts2.map((r) => /* @__PURE__ */ jsx(Link, { to: `/tin-tuc/${r.id}`, className: "group", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl hover:border-brand-gold/20 transition-colors h-full", children: [
        /* @__PURE__ */ jsx(
          PostCardThumb,
          {
            coverImageUrl: r.coverImageUrl,
            imageToken: r.image,
            category: r.category
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "bg-brand-card-2 border-brand-border font-semibold text-[10px]",
              children: r.category
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "text-[15px] font-semibold text-white group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug", children: r.title })
        ] })
      ] }) }, r.id)) })
    ] })
  ] });
}
const loader$1 = newsDetailLoader;
const meta$v = newsDetailMeta;
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsDetailPage,
  loader: loader$1,
  meta: meta$v
}, Symbol.toStringTag, { value: "Module" }));
const parseLikes = (likes) => {
  if (likes.endsWith("K")) return parseFloat(likes.replace("K", "")) * 1e3;
  return parseInt(likes) || 0;
};
function getContributorTier(totalLikes, t) {
  if (totalLikes >= 5e3) return { label: t("pages:leaderboard.tiers.legend"), variant: "tier-s" };
  if (totalLikes >= 2e3) return { label: t("pages:leaderboard.tiers.master"), variant: "tier-a" };
  if (totalLikes >= 500) return { label: t("pages:leaderboard.tiers.expert"), variant: "tier-b" };
  return { label: t("pages:leaderboard.tiers.member"), variant: "tier-c" };
}
function PodiumCard({
  contributor,
  rank,
  t
}) {
  const tier = getContributorTier(contributor.totalLikes, t);
  const heights = { 1: "h-32", 2: "h-24", 3: "h-20" };
  const medals = {
    1: "text-brand-gold",
    2: "text-brand-text-sub",
    3: "text-tier-a"
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
    /* @__PURE__ */ jsx(Medal, { className: cn("w-8 h-8 mb-2", medals[rank]) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "w-full rounded-t-xl bg-brand-card border border-brand-border border-b-0 flex flex-col items-center justify-end p-4",
          heights[rank],
          rank === 1 && "border-brand-gold/30 bg-brand-gold/5"
        ),
        children: /* @__PURE__ */ jsx("span", { className: "font-bold text-white text-sm truncate max-w-full", children: contributor.name })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-full bg-brand-card-2 border border-brand-border rounded-b-xl p-4 space-y-2", children: [
      /* @__PURE__ */ jsx(Badge, { variant: tier.variant, className: "rounded-md text-[10px] font-semibold", children: tier.label }),
      /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-brand-text-sub space-y-0.5", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          t("pages:leaderboard.cols.contributors.comps"),
          ": ",
          contributor.comps
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          t("pages:leaderboard.cols.contributors.posts"),
          ": ",
          contributor.posts
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-brand-gold font-semibold", children: [
          (contributor.totalLikes / 1e3).toFixed(1),
          "K ",
          t("pages:leaderboard.cols.contributors.reputation")
        ] })
      ] })
    ] })
  ] });
}
function LeaderboardPage() {
  const { t } = useTranslation(["pages", "nav"]);
  const { comps: comps2, posts } = useAppStore();
  const contributors = React.useMemo(() => {
    const stats2 = {};
    comps2.forEach((c) => {
      if (!stats2[c.author]) {
        stats2[c.author] = { name: c.author, comps: 0, posts: 0, totalLikes: 0, score: 0 };
      }
      stats2[c.author].comps += 1;
      stats2[c.author].totalLikes += parseLikes(c.likes);
    });
    posts.filter((p) => p.status === "Xuất bản").forEach((p) => {
      if (!stats2[p.author]) {
        stats2[p.author] = { name: p.author, comps: 0, posts: 0, totalLikes: 0, score: 0 };
      }
      stats2[p.author].posts += 1;
    });
    return Object.values(stats2).map((s) => ({ ...s, score: s.totalLikes + s.comps * 100 + s.posts * 50 })).sort((a, b) => b.score - a.score);
  }, [comps2, posts]);
  const top3 = contributors.slice(0, 3);
  const rest = contributors.slice(3);
  const totalComps = comps2.length;
  const totalPosts2 = posts.filter((p) => p.status === "Xuất bản").length;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10 pb-20", children: [
    /* @__PURE__ */ jsxs("section", { className: "text-center space-y-3 pt-6", children: [
      (() => {
        const Icon = getPageIcon("leaderboard") ?? Medal;
        return /* @__PURE__ */ jsx(Icon, { className: "w-12 h-12 text-brand-gold mx-auto mb-4" });
      })(),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white tracking-tight", children: t("pages:leaderboard.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm max-w-2xl mx-auto", children: t("pages:leaderboard.description") })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-brand-gold", children: contributors.length }),
        /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub uppercase tracking-widest mt-1", children: t("pages:leaderboard.stats.contributors") })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-white", children: totalComps }),
        /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub uppercase tracking-widest mt-1", children: t("pages:leaderboard.stats.totalComps") })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-white", children: totalPosts2 }),
        /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub uppercase tracking-widest mt-1", children: t("pages:leaderboard.stats.totalPosts") })
      ] })
    ] }),
    top3.length >= 3 && /* @__PURE__ */ jsxs("section", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold uppercase tracking-widest text-brand-gold text-center mb-6", children: t("pages:leaderboard.podiumTitle") }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 items-end", children: [
        /* @__PURE__ */ jsx(PodiumCard, { contributor: top3[1], rank: 2, t }),
        /* @__PURE__ */ jsx(PodiumCard, { contributor: top3[0], rank: 1, t }),
        /* @__PURE__ */ jsx(PodiumCard, { contributor: top3[2], rank: 3, t })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "bg-brand-card-2 border-brand-border overflow-hidden rounded-xl", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-[13px]", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-brand-card text-brand-text-sub text-[10px] uppercase font-semibold tracking-widest border-b border-brand-border", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 w-20 text-center", children: t("pages:leaderboard.cols.contributors.rank") }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: t("pages:leaderboard.cols.contributors.contributor") }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: t("pages:leaderboard.cols.contributors.comps") }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: t("pages:leaderboard.cols.contributors.posts") }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: t("pages:leaderboard.cols.contributors.badge") }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right", children: t("pages:leaderboard.cols.contributors.reputation") })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-brand-border", children: (top3.length < 3 ? contributors : rest).map((user, idx) => {
        const rank = top3.length < 3 ? idx : idx + 3;
        const tier = getContributorTier(user.totalLikes, t);
        return /* @__PURE__ */ jsxs(
          m.tr,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: idx * 0.03 },
            className: "hover:bg-brand-card transition-colors",
            children: [
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-5 text-center font-bold text-brand-text-sub", children: [
                "#",
                rank + 1
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-5", children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold text-white", children: user.name }),
                /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub mt-0.5", children: t("pages:leaderboard.authorRole") })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center font-semibold text-white", children: user.comps }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center font-semibold text-white", children: user.posts }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsx(Badge, { variant: tier.variant, className: "rounded-md text-[10px] font-semibold", children: tier.label }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-5 text-right font-semibold text-brand-gold", children: [
                (user.totalLikes / 1e3).toFixed(1),
                "K"
              ] })
            ]
          },
          user.name
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-gold/5 border border-brand-gold/20 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white", children: t("pages:leaderboard.ctaTitle") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub", children: t("pages:leaderboard.ctaDesc") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 shrink-0", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "h-11 px-6 rounded-xl font-semibold", children: /* @__PURE__ */ jsxs(Link, { to: "/cong-cu/tao-doi-hinh", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(LayoutGrid, { className: "w-4 h-4" }),
          " ",
          t("pages:leaderboard.ctaComp")
        ] }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "h-11 px-6 rounded-xl border-brand-border font-semibold", children: /* @__PURE__ */ jsxs(Link, { to: "/dang-bai", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(PenLine, { className: "w-4 h-4" }),
          " ",
          t("pages:leaderboard.ctaPost"),
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
        ] }) })
      ] })
    ] }) })
  ] });
}
function meta$u() {
  return staticRouteMeta("/bang-xep-hang");
}
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LeaderboardPage,
  meta: meta$u
}, Symbol.toStringTag, { value: "Module" }));
const PLATFORM_LABELS = {
  youtube: "YouTube",
  tiktok: "TikTok",
  facebook: "Facebook",
  discord: "Discord",
  other: "Khác"
};
function platformAccent(platform) {
  switch (platform) {
    case "youtube":
      return "text-brand-red";
    case "tiktok":
      return "text-brand-text-main";
    case "facebook":
      return "text-tier-b";
    case "discord":
      return "text-tier-b";
    default:
      return "text-brand-gold";
  }
}
function ChannelCard({ channel }) {
  const { t } = useTranslation("communityHub");
  return /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl hover:border-brand-gold/20 transition-colors h-full flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-brand-card-2 border border-brand-border flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Share2, { className: cn("w-4 h-4", platformAccent(channel.platform)) }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white text-[15px] truncate", children: channel.name }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub", children: PLATFORM_LABELS[channel.platform] })
        ] })
      ] }),
      channel.highlight && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-brand-gold/10 text-brand-gold shrink-0 text-[10px]", children: channel.highlight })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed flex-1 mb-4", children: channel.description }),
    /* @__PURE__ */ jsx(
      Button,
      {
        asChild: true,
        variant: "outline",
        className: "w-full h-10 rounded-xl border-brand-border text-[12px] font-semibold",
        children: /* @__PURE__ */ jsxs("a", { href: channel.url, target: "_blank", rel: "noopener noreferrer", children: [
          t("visitChannel"),
          " ",
          /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5 ml-1.5" })
        ] })
      }
    )
  ] });
}
function CommunityHubPage() {
  const { t } = useTranslation(["communityHub", "nav"]);
  const { teamMembers, communityChannels, comps: comps2, posts, communityPosts } = useAppStore();
  const [openFaq, setOpenFaq] = React.useState(0);
  const activeTeam = React.useMemo(
    () => teamMembers.filter((m2) => m2.status === "Hiện").sort((a, b) => a.order - b.order),
    [teamMembers]
  );
  const activeChannels = React.useMemo(
    () => communityChannels.filter((c) => c.status === "Hiện").sort((a, b) => a.order - b.order),
    [communityChannels]
  );
  const channelsByPlatform = React.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const ch of activeChannels) {
      const list2 = map.get(ch.platform) ?? [];
      list2.push(ch);
      map.set(ch.platform, list2);
    }
    return map;
  }, [activeChannels]);
  const publishedPosts = posts.filter((p) => p.status === "Xuất bản").length;
  const faqItems = t("faq.items", { returnObjects: true });
  const rules2 = t("rules.items", { returnObjects: true });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10 pb-16", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("communityHub:title"),
        description: t("communityHub:description"),
        icon: getPageIcon("community")
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      { label: t("stats.teamMembers"), value: activeTeam.length, icon: Users },
      { label: t("stats.channels"), value: activeChannels.length, icon: Share2 },
      { label: t("stats.comps"), value: comps2.length, icon: LayoutGrid },
      { label: t("stats.posts"), value: publishedPosts + communityPosts.length, icon: Newspaper }
    ].map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "bg-brand-card border-brand-border p-5 rounded-xl text-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-brand-card-2 border border-brand-border flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-brand-gold" }) }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-brand-gold", children: value }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub uppercase tracking-widest mt-1", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white tracking-tight", children: t("team.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub mt-1", children: t("team.description") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: activeTeam.map((member2, idx) => /* @__PURE__ */ jsx(
        m.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.05 },
          children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 rounded-xl h-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-lg border border-brand-border",
                    member2.avatar
                  ),
                  children: member2.name.charAt(0)
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: member2.name }),
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mt-1 bg-brand-gold/10 text-brand-gold text-[10px]", children: member2.role })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed", children: member2.bio }),
            member2.socialUrl && /* @__PURE__ */ jsxs(
              "a",
              {
                href: member2.socialUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-gold mt-4 hover:underline",
                children: [
                  t("team.viewProfile"),
                  " ",
                  /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
                ]
              }
            )
          ] })
        },
        member2.id
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white tracking-tight", children: t("channels.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub mt-1", children: t("channels.description") })
      ] }),
      Array.from(channelsByPlatform.entries()).map(([platform, channels2]) => /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: cn("text-sm font-bold uppercase tracking-widest", platformAccent(platform)), children: PLATFORM_LABELS[platform] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: channels2.map((ch) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(ChannelCard, { channel: ch }) }, ch.id)) })
      ] }, platform))
    ] }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-gold/5 border border-brand-gold/20 p-8 rounded-xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white mb-2", children: t("cta.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub mb-6 max-w-2xl", children: t("cta.description") }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "h-11 px-6 rounded-xl font-semibold", children: /* @__PURE__ */ jsxs(Link, { to: "/dang-bai", children: [
          /* @__PURE__ */ jsx(PenLine, { className: "w-4 h-4 mr-2" }),
          " ",
          t("cta.writePost")
        ] }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "h-11 px-6 rounded-xl border-brand-border font-semibold", children: /* @__PURE__ */ jsxs(Link, { to: "/thao-luan", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 mr-2" }),
          " ",
          t("cta.joinDiscussion")
        ] }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "h-11 px-6 rounded-xl border-brand-border font-semibold", children: /* @__PURE__ */ jsxs(Link, { to: "/cong-cu/tao-doi-hinh", children: [
          /* @__PURE__ */ jsx(LayoutGrid, { className: "w-4 h-4 mr-2" }),
          " ",
          t("cta.shareComp")
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 rounded-xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white mb-4", children: t("rules.title") }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: rules2.map((rule, idx) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[13px] text-brand-text-sub leading-relaxed", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-brand-gold font-bold shrink-0", children: [
            idx + 1,
            "."
          ] }),
          rule
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 rounded-xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white mb-4", children: t("faq.title") }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: faqItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "border border-brand-border rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOpenFaq(openFaq === idx ? null : idx),
              className: "w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-brand-card-2 transition-colors",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold text-white", children: item.q }),
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: cn(
                      "w-4 h-4 text-brand-text-sub shrink-0 transition-transform",
                      openFaq === idx && "rotate-180"
                    )
                  }
                )
              ]
            }
          ),
          openFaq === idx && /* @__PURE__ */ jsx("div", { className: "px-4 pb-4 text-[13px] text-brand-text-sub leading-relaxed border-t border-brand-border pt-3", children: item.a })
        ] }, idx)) })
      ] })
    ] })
  ] });
}
function meta$t() {
  return staticRouteMeta("/cong-dong");
}
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CommunityHubPage,
  meta: meta$t
}, Symbol.toStringTag, { value: "Module" }));
const legacyCommunityDetail = UNSAFE_withComponentProps(function LegacyCommunityDetailRedirect() {
  const {
    id
  } = useParams$1();
  if (!id) return /* @__PURE__ */ jsx(Navigate, {
    to: "/thao-luan",
    replace: true
  });
  return /* @__PURE__ */ jsx(Navigate, {
    to: `/thao-luan/${id}`,
    replace: true
  });
});
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: legacyCommunityDetail
}, Symbol.toStringTag, { value: "Module" }));
const COMMUNITY_SORT_KEYS = ["latest", "hot", "engagement"];
function parseCommunitySort(value) {
  if (value === "hot" || value === "engagement") return value;
  return "latest";
}
function sortCommunityPosts(posts, sortKey) {
  const sorted = [...posts];
  switch (sortKey) {
    case "hot":
      return sorted.sort((a, b) => b.likes - a.likes);
    case "engagement":
      return sorted.sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
    case "latest":
    default:
      return sorted;
  }
}
function filterCommunityPosts(posts, searchTerm) {
  if (!searchTerm.trim()) return posts;
  const q = searchTerm.toLowerCase();
  return posts.filter(
    (p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
function getRelatedCommunityPosts(posts, currentId, limit = 3) {
  const current = posts.find((p) => p.id === currentId);
  if (!current) return posts.filter((p) => p.id !== currentId).slice(0, limit);
  const scored = posts.filter((p) => p.id !== currentId).map((p) => {
    const sharedTags = p.tags.filter((tag) => current.tags.includes(tag)).length;
    return { post: p, score: sharedTags * 10 + p.likes };
  }).sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
function buildCommentTree(comments) {
  const roots = comments.filter((c) => !c.parentId);
  const repliesByParent = /* @__PURE__ */ new Map();
  for (const c of comments) {
    if (!c.parentId) continue;
    const list2 = repliesByParent.get(c.parentId) ?? [];
    list2.push(c);
    repliesByParent.set(c.parentId, list2);
  }
  return roots.map((root2) => ({
    ...root2,
    replies: repliesByParent.get(root2.id) ?? []
  }));
}
const TRENDING_TOPICS = ["#9Warrior", "#MarineMeta", "#LateGame", "#Positioning"];
const FILTER_KEYS = ["q", "sort"];
function CommunityPage() {
  const { t } = useTranslation(["community", "common", "nav"]);
  const navigate = useNavigate();
  const { communityPosts, comments } = useAppStore();
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams();
  const [upvotedIds, setUpvotedIds] = React.useState(/* @__PURE__ */ new Set());
  const searchTerm = getParam("q");
  const sortKey = parseCommunitySort(getParam("sort") || null);
  const activeFilters = hasActiveFilters([...FILTER_KEYS]);
  const filteredPosts = React.useMemo(() => {
    const filtered = filterCommunityPosts(communityPosts, searchTerm);
    return sortCommunityPosts(filtered, sortKey);
  }, [communityPosts, searchTerm, sortKey]);
  const toggleUpvote = (postId) => {
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("nav:discussion"),
        description: t("community:description"),
        icon: getPageIcon("community"),
        children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => navigate("/dang-bai"),
            className: "font-semibold h-11 px-6 rounded-xl shrink-0",
            children: t("community:createPost")
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(FilterToolbar, { children: /* @__PURE__ */ jsxs(FilterToolbarRow, { children: [
        /* @__PURE__ */ jsx(
          FilterSearchInput,
          {
            value: searchTerm,
            onChange: (value) => setParams({ q: value || null }),
            placeholder: t("community:searchPlaceholder"),
            "aria-label": t("community:searchPlaceholder")
          }
        ),
        /* @__PURE__ */ jsx(
          FilterClearButton,
          {
            visible: activeFilters,
            onClick: () => clearParams([...FILTER_KEYS])
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(
        FilterResultMeta,
        {
          shown: filteredPosts.length,
          total: communityPosts.length,
          className: "px-1"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      UnderlineTabs,
      {
        tabs: COMMUNITY_SORT_KEYS.map((key) => ({
          id: key,
          label: t(`community:sort.${key}`)
        })),
        activeTab: sortKey,
        onTabChange: (tab) => setParams({ sort: tab === "latest" ? null : tab }),
        layoutId: "activeTabCommunity"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filteredPosts.length === 0 ? /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-12 text-center rounded-xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm", children: t("community:emptyFiltered") }),
        activeFilters && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            onClick: () => clearParams([...FILTER_KEYS]),
            className: "rounded-xl border-brand-border mt-4",
            children: t("common:clearFilters")
          }
        )
      ] }) : filteredPosts.map((post, idx) => /* @__PURE__ */ jsx(
        m.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: Math.min(idx * 0.05, 0.3) },
          children: /* @__PURE__ */ jsx(
            CommunityPostCard,
            {
              post: {
                ...post,
                likes: post.likes + (upvotedIds.has(post.id) ? 1 : 0)
              },
              upvoted: upvotedIds.has(post.id),
              onUpvote: () => toggleUpvote(post.id),
              onNavigate: () => navigate(`/thao-luan/${post.id}`)
            }
          )
        },
        post.id
      )) }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4 lg:sticky lg:top-24 self-start", children: [
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 space-y-4 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-gold", children: t("community:communityStats") }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-brand-card-2 rounded-xl p-3 border border-brand-border", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-brand-gold", children: communityPosts.length }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub uppercase tracking-widest", children: t("community:totalPosts") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-brand-card-2 rounded-xl p-3 border border-brand-border", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-brand-text-main", children: comments.length }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub uppercase tracking-widest", children: t("community:totalComments") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 space-y-3 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-gold", children: t("community:trendingTopics") }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: TRENDING_TOPICS.map((topic) => /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "bg-brand-card-2 text-brand-text-sub cursor-pointer hover:border-brand-gold/30",
              onClick: () => setParams({ q: topic.replace(/^#/, "") }),
              children: topic
            },
            topic
          )) })
        ] })
      ] })
    ] })
  ] });
}
function meta$s() {
  return staticRouteMeta("/thao-luan");
}
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CommunityPage,
  meta: meta$s
}, Symbol.toStringTag, { value: "Module" }));
const GUEST_AUTHOR = "Khách";
const GUEST_AVATAR = "K";
function formatCommentDate() {
  const now = /* @__PURE__ */ new Date();
  return `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
}
function nextCommentId() {
  return `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function CommentItem({
  comment,
  depth = 0,
  onReply,
  replyingToId,
  replyText,
  onReplyTextChange,
  onSubmitReply,
  onCancelReply
}) {
  const { t } = useTranslation(["community"]);
  const isPending = comment.status === "Chờ duyệt";
  return /* @__PURE__ */ jsxs("div", { className: cn(depth > 0 && "ml-6 pl-4 border-l border-brand-border"), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-brand-card-2 border border-brand-border shrink-0 flex items-center justify-center text-brand-gold font-bold text-xs", children: comment.avatar || comment.author.charAt(0) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-brand-text-main text-sm", children: comment.author }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub", children: comment.date }),
          isPending && /* @__PURE__ */ jsx(Badge, { variant: "tier-a", className: "rounded-md text-[10px] font-semibold", children: t("community:pendingApproval") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub leading-relaxed mb-2", children: comment.content }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-[11px] font-semibold text-brand-text-sub", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "hover:text-brand-gold transition-colors", children: t("community:like") }),
          depth === 0 && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "hover:text-brand-gold transition-colors",
              onClick: () => onReply(comment.id),
              children: t("community:reply")
            }
          )
        ] }),
        replyingToId === comment.id && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-3", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: t("community:replyPlaceholder"),
              value: replyText,
              onChange: (e) => onReplyTextChange(e.target.value),
              className: "h-10 rounded-xl bg-brand-bg border-brand-border text-sm",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "h-10 px-4 rounded-xl shrink-0",
              onClick: () => onSubmitReply(comment.id),
              disabled: !replyText.trim(),
              children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              className: "h-10 px-3 rounded-xl shrink-0 text-brand-text-sub",
              onClick: onCancelReply,
              children: t("community:cancelReply")
            }
          )
        ] })
      ] })
    ] }),
    comment.replies.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-4", children: comment.replies.map((reply2) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
      CommentItem,
      {
        comment: { ...reply2, replies: [] },
        depth: depth + 1,
        onReply,
        replyingToId,
        replyText,
        onReplyTextChange,
        onSubmitReply,
        onCancelReply
      }
    ) }, reply2.id)) })
  ] });
}
function CommunityCommentSection({ post }) {
  const { t } = useTranslation(["community"]);
  const { comments, addComment } = useAppStore();
  const [comment, setComment] = React.useState("");
  const [replyingToId, setReplyingToId] = React.useState(null);
  const [replyText, setReplyText] = React.useState("");
  const [submittedMsg, setSubmittedMsg] = React.useState(false);
  const threadComments = React.useMemo(() => {
    return comments.filter((c) => c.threadId === post.id);
  }, [comments, post.id]);
  const visibleComments = React.useMemo(() => {
    return threadComments.filter(
      (c) => c.status === "Đã duyệt" || c.status === "Chờ duyệt"
    );
  }, [threadComments]);
  const commentTree = React.useMemo(
    () => buildCommentTree(visibleComments),
    [visibleComments]
  );
  const submitComment2 = (content, parentId) => {
    if (!content.trim()) return;
    const newComment = {
      id: nextCommentId(),
      threadId: post.id,
      parentId,
      author: GUEST_AUTHOR,
      avatar: GUEST_AVATAR,
      target: post.title,
      content: content.trim(),
      date: formatCommentDate(),
      status: "Chờ duyệt"
    };
    addComment(newComment);
    setSubmittedMsg(true);
    setTimeout(() => setSubmittedMsg(false), 3e3);
  };
  const handleSubmitComment = () => {
    submitComment2(comment);
    setComment("");
  };
  const handleSubmitReply = (parentId) => {
    submitComment2(replyText, parentId);
    setReplyText("");
    setReplyingToId(null);
  };
  return /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 space-y-6 rounded-xl", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-brand-text-main tracking-tight", children: t("community:commentsTitle") }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: t("community:commentPlaceholder"),
          value: comment,
          onChange: (e) => setComment(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmitComment();
            }
          },
          className: "h-11 rounded-xl bg-brand-bg border-brand-border"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "h-11 px-4 rounded-xl shrink-0",
          onClick: handleSubmitComment,
          disabled: !comment.trim(),
          "aria-label": t("community:submitComment"),
          children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
        }
      )
    ] }),
    submittedMsg && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-green font-semibold", children: t("community:commentSubmitted") }),
    /* @__PURE__ */ jsx(Separator, { className: "bg-brand-border" }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: commentTree.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub py-4", children: t("community:noComments") }) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: commentTree.map((c, idx) => /* @__PURE__ */ jsx(
      m.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: idx * 0.05 },
        children: /* @__PURE__ */ jsx(
          CommentItem,
          {
            comment: c,
            onReply: setReplyingToId,
            replyingToId,
            replyText,
            onReplyTextChange: setReplyText,
            onSubmitReply: handleSubmitReply,
            onCancelReply: () => {
              setReplyingToId(null);
              setReplyText("");
            }
          }
        )
      },
      c.id
    )) }) })
  ] });
}
function ImageAttachmentManager({ images, onChange }) {
  const { t } = useTranslation("community");
  const [urlInput, setUrlInput] = React.useState("");
  const [error, setError] = React.useState(null);
  const addImage = (url) => {
    const trimmed = url.trim();
    if (!trimmed) return;
    if (!isPersistableImageUrl(trimmed)) {
      setError(t("composer.invalidImageUrl"));
      return;
    }
    onChange([...images, { url: trimmed, caption: "" }]);
    setUrlInput("");
    setError(null);
  };
  const updateCaption = (index, caption) => {
    onChange(images.map((img, i) => i === index ? { ...img, caption } : img));
  };
  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };
  const moveImage = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;
    const next = [...images];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    onChange(next);
  };
  const handleUploaded = (urls) => {
    onChange([
      ...images,
      ...urls.map((url) => ({ url, caption: "" }))
    ]);
    setError(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsx(
        CloudinaryFileUpload$1,
        {
          multiple: true,
          onUploaded: handleUploaded,
          onError: (message) => setError(message || t("composer.uploadError")),
          label: t("composer.uploadImage"),
          uploadingLabel: t("composer.uploading")
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 gap-2 min-w-0", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            value: urlInput,
            onChange: (e) => setUrlInput(e.target.value),
            placeholder: t("composer.pasteUrl"),
            className: "h-11 rounded-xl bg-brand-card-2 border-brand-border flex-1",
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImage(urlInput);
              }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => addImage(urlInput),
            disabled: !urlInput.trim(),
            className: "h-11 rounded-xl border-brand-border shrink-0",
            children: t("composer.addUrl")
          }
        )
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-red font-medium", children: error }),
    images.length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: images.map((image, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-brand-border bg-brand-card-2",
        children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 w-full sm:w-40 h-28 rounded-lg overflow-hidden border border-brand-border bg-brand-card", children: /* @__PURE__ */ jsx("img", { src: image.url, alt: "", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2 min-w-0", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("composer.caption") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: image.caption ?? "",
                onChange: (e) => updateCaption(index, e.target.value),
                placeholder: t("composer.captionPlaceholder"),
                className: "h-10 rounded-xl bg-brand-bg border-brand-border"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-brand-text-sub",
                  onClick: () => moveImage(index, -1),
                  disabled: index === 0,
                  "aria-label": t("composer.moveUp"),
                  children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-brand-text-sub",
                  onClick: () => moveImage(index, 1),
                  disabled: index === images.length - 1,
                  "aria-label": t("composer.moveDown"),
                  children: /* @__PURE__ */ jsx(ArrowDown, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-brand-red hover:text-brand-red",
                  onClick: () => removeImage(index),
                  "aria-label": t("composer.removeImage"),
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ]
      },
      `${image.url}-${index}`
    )) })
  ] });
}
function CommunityPostImageGallery({
  images,
  className
}) {
  if (!images.length) return null;
  return /* @__PURE__ */ jsx("div", { className: cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className), children: images.map((image, index) => {
    var _a;
    return /* @__PURE__ */ jsxs("figure", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-xl overflow-hidden border border-brand-border bg-brand-card-2", children: /* @__PURE__ */ jsx("img", { src: image.url, alt: image.caption ?? "", className: "w-full object-cover max-h-80" }) }),
      ((_a = image.caption) == null ? void 0 : _a.trim()) && /* @__PURE__ */ jsx("figcaption", { className: "text-[12px] text-brand-text-sub text-center leading-relaxed px-2", children: image.caption })
    ] }, `${image.url}-${index}`);
  }) });
}
function CommunityDetailPage() {
  const { t } = useTranslation(["community", "common", "nav"]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { communityPosts } = useAppStore();
  const [upvoted, setUpvoted] = React.useState(false);
  const post = communityPosts.find((p) => p.id === id);
  const relatedPosts2 = React.useMemo(() => {
    if (!post) return [];
    return getRelatedCommunityPosts(communityPosts, post.id, 3);
  }, [communityPosts, post]);
  if (!post) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub mb-6", children: t("community:notFound") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/thao-luan"), children: t("community:backToList") })
    ] });
  }
  const displayLikes = post.likes + (upvoted ? 1 : 0);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => navigate("/thao-luan"),
        className: "text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 p-0 h-auto font-medium w-fit",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
          t("community:backToList")
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DetailBreadcrumb,
      {
        items: [
          { label: t("nav:discussion"), href: "/thao-luan" },
          { label: post.title }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-6 rounded-xl hover:border-brand-gold/20 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setUpvoted((v) => !v),
                className: cn(
                  "text-brand-text-sub hover:text-brand-gold transition-colors p-1",
                  upvoted && "text-brand-gold"
                ),
                "aria-label": t("community:like"),
                children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-8 h-8" })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-lg", children: displayLikes })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm border border-brand-border",
                      post.avatar
                    ),
                    children: post.author.charAt(0)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-brand-text-main text-sm", children: post.author }),
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub", children: post.time })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-brand-text-sub", children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.map((tag) => /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "secondary",
                className: "bg-brand-card-2 text-brand-text-sub text-[11px]",
                children: tag
              },
              tag
            )) }),
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-brand-text-main tracking-tight", children: post.title }),
            /* @__PURE__ */ jsx("p", { className: "text-[15px] text-brand-text-sub leading-relaxed", children: post.content }),
            post.images && post.images.length > 0 && /* @__PURE__ */ jsx(CommunityPostImageGallery, { images: post.images, className: "pt-2" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-brand-text-sub text-[12px] font-semibold pt-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 hover:text-brand-gold transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsx(Heart, { className: "w-4 h-4" }),
                " ",
                t("community:like")
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 hover:text-brand-gold transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4" }),
                " ",
                t("community:commentCount", { count: post.comments })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 hover:text-brand-text-main transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }),
                " ",
                t("common:share")
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(CommunityCommentSection, { post })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4 lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 space-y-4 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-gold", children: t("community:aboutAuthor") }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-black font-bold",
                  post.avatar
                ),
                children: post.author.charAt(0)
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-brand-text-main text-sm", children: post.author }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub", children: t("community:veteranMember") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-brand-card-2 rounded-xl p-3 border border-brand-border", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-brand-gold", children: "2.4K" }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub uppercase tracking-widest", children: t("community:authorStats.reputation") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-brand-card-2 rounded-xl p-3 border border-brand-border", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-brand-text-main", children: communityPosts.filter((p) => p.author === post.author).length }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-text-sub uppercase tracking-widest", children: t("community:authorStats.posts") })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full h-11 rounded-xl border-brand-border", children: t("community:follow") })
        ] }),
        relatedPosts2.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 space-y-4 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-gold", children: t("community:relatedPosts") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: relatedPosts2.map((r) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/thao-luan/${r.id}`,
              className: "block space-y-1 group",
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug", children: r.title }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub line-clamp-1", children: r.content }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-1 flex-wrap", children: r.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-brand-card-2 text-brand-text-sub text-[10px]",
                    children: tag
                  },
                  tag
                )) })
              ]
            }
          ) }, r.id)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 space-y-3 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-gold", children: t("community:trendingTopics") }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: TRENDING_TOPICS.map((topic) => /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "bg-brand-card-2 text-brand-text-sub cursor-pointer hover:border-brand-gold/30",
              children: topic
            },
            topic
          )) })
        ] })
      ] })
    ] })
  ] });
}
const loader = communityDetailLoader;
const meta$r = communityDetailMeta;
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CommunityDetailPage,
  loader,
  meta: meta$r
}, Symbol.toStringTag, { value: "Module" }));
const AVATAR_CLASSES = ["bg-brand-gold", "bg-brand-green", "bg-tier-b", "bg-brand-red"];
function resolveAvatar(userAvatar) {
  if (userAvatar == null ? void 0 : userAvatar.startsWith("bg-")) return userAvatar;
  return AVATAR_CLASSES[Math.floor(Math.random() * AVATAR_CLASSES.length)];
}
function nextPostId(posts) {
  const maxId = posts.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);
  return String(maxId + 1);
}
function CommunityComposerPage() {
  const { t } = useTranslation(["community", "nav"]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { communityPosts, addCommunityPost } = useAppStore();
  const [title2, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [showPreview, setShowPreview] = React.useState(false);
  const [validationError, setValidationError] = React.useState(null);
  const avatarClass = React.useMemo(() => resolveAvatar(user == null ? void 0 : user.avatar), [user == null ? void 0 : user.avatar]);
  const addTag = (raw) => {
    const tag = raw.trim().replace(/^#/, "");
    if (!tag || tags.includes(tag)) return;
    setTags((prev) => [...prev, tag]);
    setTagInput("");
  };
  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t2) => t2 !== tag));
  };
  const buildPost = () => {
    if (!title2.trim() || !content.trim()) {
      setValidationError(t("community:composer.needTitleContent"));
      return null;
    }
    setValidationError(null);
    return {
      id: nextPostId(communityPosts),
      author: (user == null ? void 0 : user.name) ?? "Khách",
      avatar: avatarClass,
      title: title2.trim(),
      content: content.trim(),
      time: t("community:composer.justNow"),
      likes: 0,
      comments: 0,
      tags,
      images: (images == null ? void 0 : images.length) ? images : void 0
    };
  };
  const handlePublish = () => {
    const post = buildPost();
    if (!post) return;
    addCommunityPost(post);
    navigate(`/thao-luan/${post.id}`);
  };
  const previewPost = showPreview ? {
    id: "preview",
    author: (user == null ? void 0 : user.name) ?? "Khách",
    avatar: avatarClass,
    title: title2.trim() || t("community:composer.titlePlaceholder"),
    content: content.trim() || t("community:composer.contentPlaceholder"),
    time: t("community:composer.justNow"),
    likes: 0,
    comments: 0,
    tags,
    images
  } : null;
  return /* @__PURE__ */ jsxs(PageContainer, { width: "reading", className: "space-y-6 pb-32 pt-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          onClick: () => navigate(-1),
          className: "text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 p-0 h-auto font-medium w-fit",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            t("community:backToList")
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setShowPreview((v) => !v),
            className: "h-11 rounded-xl border-brand-border",
            children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-2" }),
              showPreview ? t("community:composer.edit") : t("community:composer.preview")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            onClick: handlePublish,
            className: "bg-gold-gradient hover-gold-gradient text-black font-bold h-11 px-8 rounded-xl",
            children: [
              /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 mr-2" }),
              t("community:composer.publish")
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(m.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, children: showPreview && previewPost ? /* @__PURE__ */ jsx(
      CommunityPostCard,
      {
        post: previewPost,
        onNavigate: () => {
        },
        className: "pointer-events-none"
      }
    ) : /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-10 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-7 w-7 text-black stroke-[2.5px]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-[24px] font-bold text-brand-text-main tracking-tight leading-none", children: t("community:composer.title") }),
          /* @__PURE__ */ jsx("p", { className: "text-[14px] text-brand-text-sub font-normal", children: t("community:composer.subtitle") })
        ] })
      ] }),
      validationError && /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-red font-semibold", children: validationError }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("community:composer.titleLabel") }),
        /* @__PURE__ */ jsx(
          Input,
          {
            value: title2,
            onChange: (e) => setTitle(e.target.value),
            placeholder: t("community:composer.titlePlaceholder"),
            className: "bg-brand-card-2 border-brand-border h-14 text-xl font-bold rounded-xl focus-visible:ring-brand-gold/20"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("community:composer.contentLabel") }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: content,
            onChange: (e) => setContent(e.target.value),
            placeholder: t("community:composer.contentPlaceholder"),
            className: "w-full bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[15px] text-brand-text-main resize-none h-48 focus:outline-none focus:border-brand-gold/30 leading-relaxed"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("community:composer.tagsLabel") }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: tags.map((tag) => /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "secondary",
            className: "bg-brand-card-2 border-brand-border text-brand-text-main text-[11px] pr-1 gap-1",
            children: [
              tag,
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeTag(tag),
                  className: "p-0.5 rounded hover:text-brand-red",
                  "aria-label": t("community:composer.removeTag"),
                  children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
                }
              )
            ]
          },
          tag
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              value: tagInput,
              onChange: (e) => setTagInput(e.target.value),
              placeholder: t("community:composer.addTag"),
              className: "h-11 rounded-xl bg-brand-card-2 border-brand-border flex-1",
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => addTag(tagInput),
              disabled: !tagInput.trim(),
              className: "h-11 rounded-xl border-brand-border shrink-0",
              children: t("community:composer.addTagButton")
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: TRENDING_TOPICS.map((topic) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => addTag(topic.replace(/^#/, "")),
            className: cn(
              "px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors",
              tags.includes(topic.replace(/^#/, "")) ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:text-brand-text-main"
            ),
            children: topic
          },
          topic
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: t("community:composer.imagesLabel") }),
        /* @__PURE__ */ jsx(ImageAttachmentManager, { images: images ?? [], onChange: setImages })
      ] })
    ] }) }) })
  ] });
}
function meta$q() {
  return staticRouteMeta("/dang-bai");
}
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CommunityComposerPage,
  meta: meta$q
}, Symbol.toStringTag, { value: "Module" }));
function SummaryStat({ label, value, onClick }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "bg-brand-card-2 border border-brand-border rounded-xl p-4 text-left hover:border-brand-gold/30 transition-colors",
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-[12px] text-brand-text-sub font-semibold mb-1", children: label }),
        /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-brand-text-main", children: value })
      ]
    }
  );
}
function ProfileIdentityCard({
  user,
  heroCount,
  compCount,
  postCount,
  onTabChange
}) {
  const { t, i18n: i18n2 } = useTranslation(["pages"]);
  const memberDate = user.joinedAt ? new Intl.DateTimeFormat(i18n2.language === "vi" ? "vi-VN" : "en-US", {
    month: "long",
    year: "numeric"
  }).format(new Date(user.joinedAt)) : null;
  return /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: user.avatar,
          alt: user.name,
          className: "w-20 h-20 rounded-full border-4 border-brand-border shrink-0 mx-auto sm:mx-0"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left min-w-0", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-brand-text-main mb-1", children: user.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub truncate", children: user.email }),
        memberDate && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub mt-1", children: t("pages:profile.memberSince", { date: memberDate }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: cn("grid grid-cols-3 gap-3"), children: [
      /* @__PURE__ */ jsx(
        SummaryStat,
        {
          label: t("pages:profile.summary.heroes"),
          value: heroCount,
          onClick: () => onTabChange("favorites")
        }
      ),
      /* @__PURE__ */ jsx(
        SummaryStat,
        {
          label: t("pages:profile.summary.comps"),
          value: compCount,
          onClick: () => onTabChange("favorites")
        }
      ),
      /* @__PURE__ */ jsx(
        SummaryStat,
        {
          label: t("pages:profile.summary.posts"),
          value: postCount,
          onClick: () => onTabChange("activity")
        }
      )
    ] })
  ] });
}
function ProfileFavoritesTab({
  favHeroes,
  favComps,
  allHeroes,
  isCompFavorite,
  onToggleHeroFavorite,
  onToggleCompFavorite
}) {
  const { t } = useTranslation(["pages", "common"]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold tracking-wider mb-4 flex items-center gap-2 uppercase", children: [
        /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-brand-gold" }),
        t("pages:profile.favHeroes", { count: favHeroes.length })
      ] }),
      favHeroes.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: favHeroes.map((hero, idx) => /* @__PURE__ */ jsxs(
        m.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: idx * 0.05 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/tuong/${hero.id}`,
                className: "bg-brand-card-2 border border-brand-border rounded-lg p-3 flex flex-col items-center hover:border-brand-gold/30 transition-colors",
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "w-10 h-10 rounded mb-2 flex items-center justify-center font-bold text-sm bg-brand-bg",
                        heroCostBadgeClass(hero.cost)
                      ),
                      children: hero.name.substring(0, 2).toUpperCase()
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-[12px] font-bold text-center block truncate w-full", children: hero.name })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => onToggleHeroFavorite(hero.id),
                className: "absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-xl bg-brand-card border border-brand-border hover:border-brand-gold/30 transition-colors",
                "aria-label": t("common:removeFavorite"),
                children: /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 text-brand-gold fill-brand-gold" })
              }
            )
          ]
        },
        hero.id
      )) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-6 bg-brand-card-2 rounded-lg border border-dashed border-brand-border", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub mb-4", children: t("pages:profile.noFavHeroes") }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gold-gradient font-semibold h-10 rounded-xl", children: /* @__PURE__ */ jsx(Link, { to: "/tuong", children: t("pages:profile.browseHeroes") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold tracking-wider mb-4 flex items-center gap-2 uppercase", children: [
        /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-brand-gold" }),
        t("pages:profile.savedComps", { count: favComps.length })
      ] }),
      favComps.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: favComps.map((comp, idx) => /* @__PURE__ */ jsx(
        m.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.05 },
          children: /* @__PURE__ */ jsx(
            CompListCard,
            {
              comp,
              rank: idx + 1,
              heroes: allHeroes,
              isFavorite: isCompFavorite(comp.id),
              onToggleFavorite: () => onToggleCompFavorite(comp.id)
            }
          )
        },
        comp.id
      )) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-6 bg-brand-card-2 rounded-lg border border-dashed border-brand-border", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub mb-4", children: t("pages:profile.noSavedComps") }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gold-gradient font-semibold h-10 rounded-xl", children: /* @__PURE__ */ jsx(Link, { to: "/doi-hinh", children: t("pages:profile.browseComps") }) })
      ] })
    ] })
  ] });
}
function postStatusLabel(status, t) {
  switch (status) {
    case "Xuất bản":
      return t("pages:profile.postStatus.published");
    case "Chờ duyệt":
      return t("pages:profile.postStatus.pending");
    case "Bản nháp":
      return t("pages:profile.postStatus.draft");
    default:
      return status;
  }
}
function postStatusVariant(status) {
  switch (status) {
    case "Xuất bản":
      return "default";
    case "Chờ duyệt":
      return "tier-a";
    default:
      return "tier-c";
  }
}
const QUICK_LINKS = [
  { key: "linkComps", path: "/doi-hinh", icon: LayoutGrid },
  { key: "linkTeamBuilder", path: "/cong-cu/tao-doi-hinh", icon: Hammer },
  { key: "linkCommunity", path: "/cong-dong", icon: Users },
  { key: "linkLeaderboard", path: "/bang-xep-hang", icon: Trophy }
];
function ProfileActivityTab({ userPosts }) {
  const { t } = useTranslation(["pages", "common"]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold tracking-wider mb-4 flex items-center gap-2 uppercase", children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 text-brand-gold" }),
        t("pages:profile.myPosts")
      ] }),
      userPosts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: userPosts.map((post, idx) => /* @__PURE__ */ jsxs(
        m.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.05 },
          className: "bg-brand-card-2 p-4 rounded-xl border border-brand-border flex flex-col sm:flex-row sm:items-center gap-3 justify-between",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[14px] font-bold text-brand-text-main mb-2 truncate", children: post.title }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { variant: postStatusVariant(post.status), className: "rounded-md text-[10px] font-bold", children: postStatusLabel(post.status, t) }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub", children: post.date }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub", children: t("pages:profile.activity.views", { count: post.views }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              post.status === "Xuất bản" && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "h-8 rounded-xl", children: /* @__PURE__ */ jsxs(Link, { to: `/tin-tuc/${post.id}`, children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5 mr-1.5" }),
                t("common:details")
              ] }) }),
              /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "h-8 rounded-xl", children: /* @__PURE__ */ jsxs(Link, { to: `/bai-viet/${post.id}/sua`, children: [
                /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5 mr-1.5" }),
                t("common:edit")
              ] }) })
            ] })
          ]
        },
        post.id
      )) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-6 bg-brand-card-2 rounded-lg border border-dashed border-brand-border", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub mb-4", children: t("pages:profile.activity.noPosts") }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gold-gradient font-semibold h-10 rounded-xl", children: /* @__PURE__ */ jsx(Link, { to: "/dang-bai", children: t("pages:profile.activity.createPost") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold tracking-wider mb-4 uppercase", children: t("pages:profile.activity.quickLinks") }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: QUICK_LINKS.map(({ key, path, icon: Icon }) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: path,
          className: "bg-brand-card-2 border border-brand-border rounded-xl p-4 flex items-center gap-3 hover:border-brand-gold/30 transition-colors",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-brand-gold" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-[14px] font-semibold text-brand-text-main", children: t(`pages:profile.activity.${key}`) })
          ]
        },
        key
      )) })
    ] })
  ] });
}
function ProfileSettingsTab({ user, onSave, onLogout }) {
  const { t } = useTranslation(["pages", "auth"]);
  const [name, setName] = React.useState(user.name);
  const [avatar, setAvatar] = React.useState(user.avatar);
  const [savedMessage, setSavedMessage] = React.useState(false);
  const [avatarError, setAvatarError] = React.useState(null);
  React.useEffect(() => {
    setName(user.name);
    setAvatar(user.avatar);
  }, [user.name, user.avatar]);
  const handleSave = (e) => {
    e.preventDefault();
    const nextAvatar = avatar.trim() || user.avatar;
    if (!isPersistableAvatarValue(nextAvatar)) {
      setAvatarError(t("pages:profile.settings.invalidAvatarUrl"));
      return;
    }
    setAvatarError(null);
    onSave({ name: name.trim() || user.name, avatar: nextAvatar });
    setSavedMessage(true);
    window.setTimeout(() => setSavedMessage(false), 2500);
  };
  return /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold tracking-wider mb-6 uppercase", children: t("pages:profile.settings.title") }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, className: "space-y-5 max-w-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pb-2", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: avatar || user.avatar,
            alt: name,
            className: "w-16 h-16 rounded-full border-4 border-brand-border shrink-0 object-cover",
            onError: (e) => {
              e.currentTarget.src = user.avatar;
            }
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-brand-text-sub", children: t("pages:profile.settings.avatarUrl") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "profile-name", className: "text-[13px] font-semibold text-brand-text-sub", children: t("pages:profile.settings.displayName") }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "profile-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "h-11 rounded-xl"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "profile-avatar", className: "text-[13px] font-semibold text-brand-text-sub", children: t("pages:profile.settings.avatarUrl") }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "profile-avatar",
              value: avatar,
              onChange: (e) => {
                const next = e.target.value;
                const lower = next.trim().toLowerCase();
                if (lower.startsWith("data:") || lower.startsWith("blob:")) {
                  setAvatarError(t("pages:profile.settings.invalidAvatarUrl"));
                  return;
                }
                setAvatarError(null);
                setAvatar(next);
              },
              placeholder: "https://",
              className: "h-11 rounded-xl flex-1 min-w-[200px]"
            }
          ),
          /* @__PURE__ */ jsx(
            CloudinaryFileUpload$1,
            {
              onUploaded: (urls) => {
                if (urls[0]) {
                  setAvatar(urls[0]);
                  setAvatarError(null);
                }
              },
              onError: (message) => setAvatarError(message),
              label: t("pages:profile.settings.uploadAvatar"),
              uploadingLabel: t("pages:profile.settings.uploadingAvatar")
            }
          )
        ] }),
        avatarError && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-red font-medium", children: avatarError })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "profile-email", className: "text-[13px] font-semibold text-brand-text-sub", children: t("pages:profile.settings.email") }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "profile-email",
            value: user.email,
            readOnly: true,
            disabled: true,
            className: "h-11 rounded-xl opacity-70"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub", children: t("pages:profile.settings.emailReadonly") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 pt-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "bg-gold-gradient font-semibold h-11 rounded-xl", children: t("pages:profile.settings.save") }),
        savedMessage && /* @__PURE__ */ jsx("span", { className: "text-[13px] text-brand-green font-semibold", children: t("pages:profile.settings.saved") })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-brand-border", children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        onClick: onLogout,
        className: "h-11 rounded-xl border-brand-border hover:bg-brand-red/10 hover:text-brand-red hover:border-brand-red/50",
        children: [
          /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2" }),
          t("auth:logout")
        ]
      }
    ) })
  ] });
}
function ProfilePage() {
  const { t } = useTranslation(["pages", "auth"]);
  const { user, logout: logout2, updateUser } = useAuth();
  const { favorites: favoriteHeroes, toggleFavorite: toggleHeroFavorite } = useFavorites("heroes");
  const { favorites: favoriteComps, toggleFavorite: toggleCompFavorite, isFavorite: isCompFavorite } = useFavorites("comps");
  const { heroes: heroes2, comps: comps2, posts } = useAppStore();
  const [activeTab, setActiveTab] = React.useState("favorites");
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate$1, { to: "/", replace: true });
  }
  const favHeroesData = heroes2.filter((h) => favoriteHeroes.includes(h.id));
  const favCompsData = comps2.filter((c) => favoriteComps.includes(c.id));
  const userPosts = posts.filter((p) => p.author === user.name);
  const tabs = [
    { id: "favorites", label: t("pages:profile.tabs.favorites") },
    { id: "activity", label: t("pages:profile.tabs.activity") },
    { id: "settings", label: t("pages:profile.tabs.settings") }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-10", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: t("pages:profile.title"),
        description: t("pages:profile.description")
      }
    ),
    /* @__PURE__ */ jsx(
      ProfileIdentityCard,
      {
        user,
        heroCount: favHeroesData.length,
        compCount: favCompsData.length,
        postCount: userPosts.length,
        onTabChange: setActiveTab
      }
    ),
    /* @__PURE__ */ jsx(
      UnderlineTabs,
      {
        tabs,
        activeTab,
        onTabChange: (tab) => setActiveTab(tab),
        layoutId: "profileActiveTab"
      }
    ),
    activeTab === "favorites" && /* @__PURE__ */ jsx(
      ProfileFavoritesTab,
      {
        favHeroes: favHeroesData,
        favComps: favCompsData,
        allHeroes: heroes2,
        isCompFavorite,
        onToggleHeroFavorite: toggleHeroFavorite,
        onToggleCompFavorite: toggleCompFavorite
      }
    ),
    activeTab === "activity" && /* @__PURE__ */ jsx(ProfileActivityTab, { userPosts }),
    activeTab === "settings" && /* @__PURE__ */ jsx(ProfileSettingsTab, { user, onSave: updateUser, onLogout: logout2 })
  ] });
}
function meta$p() {
  return staticRouteMeta("/ho-so");
}
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProfilePage,
  meta: meta$p
}, Symbol.toStringTag, { value: "Module" }));
const ADMIN_NAV = [
  { group: "Hệ thống", items: [
    { name: "Tổng quan", path: "/admin", icon: BarChart },
    { name: "Người dùng", path: "/admin/nguoi-dung", icon: Users },
    { name: "Vai trò & Phân quyền", path: "/admin/vai-tro", icon: ShieldAlert }
  ] },
  { group: "Game Data", items: [
    { name: "Tướng", path: "/admin/tuong", icon: Accessibility },
    { name: "Tộc / Hệ", path: "/admin/toc-he", icon: Activity },
    { name: "Trang bị", path: "/admin/trang-bi", icon: Package },
    { name: "Dị vật", path: "/admin/di-vat", icon: Gem },
    { name: "Đội hình", path: "/admin/doi-hinh", icon: Shield }
  ] },
  { group: "Nội dung", items: [
    { name: "Banners", path: "/admin/banners", icon: Image },
    { name: "Bài viết", path: "/admin/bai-viet", icon: Newspaper },
    { name: "Bình luận", path: "/admin/binh-luan", icon: MessageSquare },
    { name: "Đội ngũ", path: "/admin/doi-ngu", icon: Users },
    { name: "Kênh cộng đồng", path: "/admin/kenh-cong-dong", icon: Share2 },
    { name: "Bảng xếp hạng", path: "/admin/bang-xep-hang", icon: Trophy },
    { name: "Sự kiện", path: "/admin/su-kien", icon: Bell }
  ] },
  { group: "Công cụ", items: [
    { name: "Media", path: "/admin/media", icon: Image },
    { name: "Báo cáo", path: "/admin/bao-cao", icon: BarChart2 },
    { name: "SEO", path: "/admin/seo", icon: Globe },
    { name: "Cài đặt", path: "/admin/cai-dat", icon: Settings }
  ] }
];
function AdminSidebar({ isOpen, onClose }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
      m.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] lg:hidden"
      }
    ) }),
    /* @__PURE__ */ jsxs("aside", { className: cn(
      "fixed inset-y-0 left-0 w-64 border-r border-brand-border bg-brand-bg flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    ), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center h-20 px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center font-sans font-bold text-xl tracking-tight leading-none", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "Auto" }),
          /* @__PURE__ */ jsx("span", { className: "text-brand-gold ml-1", children: "Chess" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-white font-bold tracking-tight", children: "Mobile" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-brand-gold font-bold tracking-tight", children: ".vn" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[9px] text-brand-text-sub font-semibold tracking-wider uppercase mt-2 opacity-40", children: "ADMIN CONTROL PANEL" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto py-6 custom-scrollbar", children: ADMIN_NAV.map((group, i) => /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsx("div", { className: "px-8 mb-1.5", children: /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-brand-text-sub opacity-50", children: group.group }) }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-[2px] px-4", children: group.items.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          NavLink,
          {
            to: item.path,
            end: item.path === "/admin",
            className: ({ isActive }) => cn(
              "group flex items-center gap-3 rounded-xl px-4 py-2 text-[13px] font-medium transition-all relative overflow-hidden",
              isActive ? "bg-gold-gradient text-black shadow-[0_4px_12px_rgba(245,180,60,0.15)]" : "text-brand-text-sub hover:bg-white/5 hover:text-white"
            ),
            children: ({ isActive }) => /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(item.icon, { className: cn("h-4 w-4 stroke-[2px]", isActive ? "text-black" : "text-brand-text-sub group-hover:text-white") }),
              item.name
            ] })
          }
        ) }, item.path)) })
      ] }, i)) })
    ] })
  ] });
}
function AdminHeader({ onMenuClick }) {
  const { user, triggerLogout } = useAuth();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const displayUser = user || {
    name: "Admin",
    email: "admin@autochessmobile.vn",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  };
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 right-0 left-0 lg:left-64 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-brand-bg/80 backdrop-blur-xl px-4 sm:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-3 sm:gap-6", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onMenuClick,
          className: "lg:hidden w-9 h-9 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-text-sub hover:text-white transition-all flex-shrink-0",
          children: /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-sm group", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-sub group-focus-within:text-brand-gold transition-colors" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "search",
            placeholder: "Tìm kiếm nhanh...",
            className: "w-full bg-brand-card rounded-xl border-transparent pl-10 h-10 text-[12px] focus-visible:ring-1 focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold/30 transition-all font-medium"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4 text-brand-text-sub", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block", children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          className: "h-10 px-3.5 text-[12px] font-semibold tracking-tight bg-brand-card border-brand-border text-brand-text-sub hover:text-white hover:bg-white/5 hover:border-white/20 transition-all rounded-xl flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsx(Home, { className: "h-4 w-4 text-brand-gold" }),
            /* @__PURE__ */ jsx("span", { className: "hidden xs:inline", children: "Về trang chủ" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("button", { className: "relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center hover:text-white transition-all hover:border-brand-gold/30", children: [
        /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-2.5 right-2.5 w-2 h-2 bg-brand-red rounded-full ring-2 ring-brand-card" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-6 w-[1px] bg-white/10" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowDropdown(!showDropdown),
            className: "flex items-center gap-3 cursor-pointer group focus:outline-none p-1 rounded-xl hover:bg-white/5 transition-all text-left",
            children: [
              displayUser.avatar ? /* @__PURE__ */ jsx("img", { src: displayUser.avatar, alt: "Avatar", className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 object-cover transition-transform group-hover:scale-105" }) : /* @__PURE__ */ jsx("div", { className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-black text-[12px] font-bold shadow-inner transition-transform group-hover:scale-105", children: "AD" }),
              /* @__PURE__ */ jsxs("div", { className: "hidden sm:block", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[13px] font-semibold text-white leading-none", children: displayUser.name }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] font-semibold text-brand-text-sub uppercase tracking-wider opacity-50 mt-1.5", children: "Quản trị viên" })
              ] })
            ]
          }
        ),
        showDropdown && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-56 rounded-xl border border-brand-border bg-brand-card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3 border-b border-white/5 mb-1.5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[13px] font-bold text-white truncate", children: displayUser.name }),
            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub truncate mt-0.5", children: displayUser.email })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/",
              onClick: () => setShowDropdown(false),
              className: "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-text-sub hover:text-white hover:bg-white/5 transition-colors font-medium",
              children: [
                /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" }),
                "Về trang chủ"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/ho-so",
              onClick: () => setShowDropdown(false),
              className: "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-text-sub hover:text-white hover:bg-white/5 transition-colors font-medium",
              children: [
                /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
                "Trang cá nhân"
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "my-1.5 h-[1px] bg-white/5 animate-none" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setShowDropdown(false);
                triggerLogout();
              },
              className: "flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-red hover:bg-brand-red/10 transition-colors font-semibold",
              children: [
                /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
                "Đăng xuất"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function AdminLayout() {
  const location = useLocation$1();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-brand-bg text-brand-text-main flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx(AdminSidebar, { isOpen: isMobileMenuOpen, onClose: () => setIsMobileMenuOpen(false) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden pt-16 pb-16 lg:pb-0", children: [
      /* @__PURE__ */ jsx(AdminHeader, { onMenuClick: () => setIsMobileMenuOpen(true) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 flex flex-col min-h-0 py-4 sm:py-6 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0 w-full", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        m.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.2 },
          className: "flex-1 flex flex-col min-h-0",
          children: /* @__PURE__ */ jsx(Outlet, {})
        },
        location.pathname
      ) }) }) }),
      /* @__PURE__ */ jsx(MobileNav, { hideAt: "lg" })
    ] })
  ] });
}
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminLayout
}, Symbol.toStringTag, { value: "Module" }));
const AdminDashboardCharts = React.lazy(
  () => import("./admin-charts-BzgLe8t5.js").then((module) => ({
    default: module.AdminDashboardCharts
  }))
);
function AdminPage() {
  const [trafficPeriod, setTrafficPeriod] = React.useState("30");
  const { heroes: heroes2, posts, comps: comps2, comments } = useAppStore();
  const settings = useSiteSettings();
  const pendingComments = comments.filter((c) => c.status === "Chờ duyệt").length;
  const reportComments = comments.filter((c) => c.status === "Báo cáo").length;
  const statCards = [
    { label: "Tướng", value: heroes2.length.toLocaleString("vi-VN"), change: "+15.3%", positive: true },
    { label: "Bài viết", value: posts.length.toLocaleString("vi-VN"), change: "+12.7%", positive: true },
    { label: "Đội hình", value: comps2.length.toLocaleString("vi-VN"), change: "+8.1%", positive: true },
    {
      label: "Bình luận chờ / báo cáo",
      value: `${pendingComments} / ${reportComments}`,
      change: pendingComments > 0 ? `+${pendingComments}` : "0",
      positive: reportComments === 0
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        title: "Tổng quan hệ thống",
        description: `Dữ liệu thời gian thực — ${settings.patchVersion}. Cập nhật liên tục từ kho dữ liệu.`
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: statCards.map((stat) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "p-6 flex flex-col shadow-none rounded-xl bg-brand-card border-brand-border group hover:border-brand-gold/20 transition-all",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-brand-text-sub font-semibold uppercase tracking-wider", children: stat.label }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "w-2 h-2 rounded-full",
                  stat.positive ? "bg-brand-green shadow-[0_0_8px_rgba(63,185,80,0.5)]" : "bg-brand-red shadow-[0_0_8px_rgba(242,92,84,0.5)]"
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "admin-stat-value leading-none group-hover:text-brand-gold transition-colors", children: stat.value }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "text-[11px] font-semibold flex items-center px-2 py-0.5 rounded border",
                  stat.positive ? "text-brand-green bg-brand-green/5 border-brand-green/10" : "text-brand-red bg-brand-red/5 border-brand-red/10"
                ),
                children: stat.change
              }
            )
          ] })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsx(
      React.Suspense,
      {
        fallback: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: /* @__PURE__ */ jsx(Card, { className: "lg:col-span-2 p-8 rounded-xl bg-brand-card border-brand-border min-h-[250px] flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub", children: "Đang tải biểu đồ..." }) }) }),
        children: /* @__PURE__ */ jsx(AdminDashboardCharts, { trafficPeriod, onTrafficPeriodChange: setTrafficPeriod })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-6 shadow-none rounded-xl bg-brand-card border-brand-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "admin-card-title", children: "Cập nhật tin tức" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "text-[12px] font-semibold text-brand-gold hover:underline", children: "Tạo mới" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: posts.slice(0, 4).map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-4 group cursor-pointer border-b border-brand-border last:border-0 pb-3 last:pb-0",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-10 rounded bg-brand-card-2 flex-shrink-0 group-hover:ring-1 group-hover:ring-brand-gold/30 transition-all overflow-hidden flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold opacity-25", children: "IMG" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[14px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors truncate leading-tight mb-1", children: item.title }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub font-medium", children: item.date }),
                  item.status === "Xuất bản" && /* @__PURE__ */ jsx(Badge, { className: "bg-brand-red border-transparent text-white h-4 px-1.5 text-[8px] font-bold", children: "HOT" })
                ] })
              ] })
            ]
          },
          item.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-6 shadow-none rounded-xl bg-brand-card border-brand-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "admin-card-title", children: "Nhật ký hoạt động" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-[12px] font-semibold text-brand-text-sub hover:text-brand-text-main transition-colors",
              children: "Xóa lọc"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-5", children: [
          { user: "Admin", action: "đăng bài mới", time: "5p", icon: "AD", color: "bg-brand-red" },
          { user: "User34", action: "đăng đội hình", time: "12p", icon: "U1" },
          { user: "Player", action: "bình luận", time: "1h", icon: "P" },
          { user: "JustWin", action: "theo dõi", time: "2h", icon: "J" }
        ].map((item, i, arr) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-[14px] relative", children: [
          i !== arr.length - 1 && /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-8 bottom-[-20px] w-[1px] bg-brand-border" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] text-brand-text-main flex-shrink-0 z-10 border border-brand-border",
                item.color || "bg-brand-card-2"
              ),
              children: item.icon
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "pt-0.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "leading-tight text-[14px]", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-brand-text-main", children: item.user }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub", children: item.action })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-brand-text-sub font-normal mt-1", children: [
              item.time,
              " trước"
            ] })
          ] })
        ] }, item.user)) })
      ] })
    ] })
  ] });
}
function meta$o() {
  return buildPageMeta(adminStaticMeta("/admin", "Tổng quan"));
}
const route30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminPage,
  meta: meta$o
}, Symbol.toStringTag, { value: "Module" }));
const AdminUserForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bK).then((m2) => ({ default: m2.AdminUserForm }))
);
function UserFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-8 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu người dùng..." });
}
function AdminUsersPage() {
  const [users, setUsers] = useAdminUsersState();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("Mọi vai trò");
  const [selectedStatus, setSelectedStatus] = React.useState("Mọi trạng thái");
  const [newForm, setNewForm] = React.useState(EMPTY_USER_FORM);
  const [editForm, setEditForm] = React.useState(EMPTY_USER_FORM);
  const matchUser = React.useCallback(
    (user, q) => {
      const query = q.toLowerCase();
      const matchesSearch = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
      const matchesRole = selectedRole === "Mọi vai trò" || user.role === selectedRole;
      const matchesStatus = selectedStatus === "Mọi trạng thái" || user.status === selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    },
    [selectedRole, selectedStatus]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize
  } = useAdminListPage({
    items: users,
    searchTerm,
    match: matchUser,
    resetDeps: [selectedRole, selectedStatus]
  });
  React.useEffect(() => {
    const onSync = () => {
      setUsers(loadJson(STORAGE_KEYS.adminUsers, DEFAULT_ADMIN_USERS));
    };
    window.addEventListener(ADMIN_USERS_SYNC_EVENT, onSync);
    return () => window.removeEventListener(ADMIN_USERS_SYNC_EVENT, onSync);
  }, [setUsers]);
  const handleCreateUser = () => {
    if (!newForm.name.trim() || !newForm.email.trim()) return;
    const created = {
      id: nextNumericIdNumber(users),
      name: newForm.name.trim(),
      email: newForm.email.trim(),
      role: newForm.role,
      status: "Hoạt động",
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN")
    };
    setUsers([created, ...users]);
    setNewForm(EMPTY_USER_FORM);
    dialogs.closeAdd();
    showSuccess(`Đã tạo tài khoản ${created.name}.`);
  };
  const handleUpdateUser = () => {
    if (!dialogs.editingItem || !editForm.name.trim() || !editForm.email.trim()) return;
    setUsers(
      (prev) => prev.map(
        (u) => u.id === dialogs.editingItem.id ? {
          ...u,
          name: editForm.name.trim(),
          email: editForm.email.trim(),
          role: editForm.role,
          status: editForm.status
        } : u
      )
    );
    dialogs.closeEdit();
    showSuccess(`Đã cập nhật ${editForm.name.trim()}.`);
  };
  const handleDeleteUser = () => {
    if (!dialogs.deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== dialogs.deleteTarget.id));
    dialogs.closeDelete();
    showSuccess(`Đã xóa ${dialogs.deleteTarget.name}.`);
  };
  const toggleUserStatus = (id) => {
    setUsers(
      (prev) => prev.map(
        (u) => u.id === id ? { ...u, status: u.status === "Hoạt động" ? "Bị khóa" : "Hoạt động" } : u
      )
    );
  };
  const openEdit = (user) => {
    setEditForm(userFormFromRecord(user));
    dialogs.openEdit(user);
  };
  return /* @__PURE__ */ jsxs(
    AdminListShell,
    {
      header: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          AdminPageHeader,
          {
            icon: User,
            title: "Quản lý người dùng",
            description: "Quản lý danh sách thành viên, phân quyền truy cập và kiểm soát cộng đồng.",
            children: /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => {
                  setNewForm(EMPTY_USER_FORM);
                  dialogs.openAdd();
                },
                className: "gap-2 bg-gold-gradient text-black font-semibold text-[14px] h-11 px-6 rounded-xl transition-all",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5 stroke-[2px]" }),
                  " Thêm người dùng"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            isEmpty: filteredItems.length === 0,
            emptyTitle: "Không tìm thấy thành viên nào trùng khớp.",
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredItems.length > 0 ? startIndex + 1 : 0,
                end: Math.min(startIndex + pageSize, filteredItems.length),
                total: filteredItems.length,
                label: "thành viên"
              }
            ),
            toolbar: /* @__PURE__ */ jsxs(
              AdminToolbar,
              {
                searchValue: searchTerm,
                onSearchChange: setSearchTerm,
                searchPlaceholder: "Tìm kiếm theo tên hoặc email...",
                children: [
                  /* @__PURE__ */ jsxs(Select, { value: selectedRole, onValueChange: setSelectedRole, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[140px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "Mọi vai trò", children: "Mọi vai trò" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Admin", children: "Admin" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Moderator", children: "Moderator" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Thành viên", children: "Thành viên" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(Select, { value: selectedStatus, onValueChange: setSelectedStatus, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[140px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "Mọi trạng thái", children: "Mọi trạng thái" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Hoạt động", children: "Hoạt động" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Bị khóa", children: "Bị khóa" })
                    ] })
                  ] })
                ]
              }
            ),
            children: /* @__PURE__ */ jsxs(AdminTable, { minWidth: "900px", children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { className: "hover:bg-transparent border-0", children: [
                /* @__PURE__ */ jsx(AdminTh, { className: "w-16", children: "#" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Định danh người dùng" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Email liên hệ" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-32", children: "Vai trò" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-32", children: "Trạng thái" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Gia nhập" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-36", children: "Hành động" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedItems.map((row) => /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
                /* @__PURE__ */ jsx(AdminTd, { className: "text-brand-text-sub font-mono text-[12px]", children: row.id }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-brand-border group-hover:scale-105 transition-transform relative",
                        row.role === "Admin" ? "bg-brand-gold/10 border-brand-gold/20" : "bg-brand-card-2"
                      ),
                      children: row.role === "Admin" ? /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-brand-gold" }) : /* @__PURE__ */ jsx(User, { className: "h-5 w-5 text-brand-text-sub" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-brand-text-main text-[15px] group-hover:text-brand-gold transition-colors", children: row.name }),
                    /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-brand-text-sub font-mono font-medium opacity-60 mt-0.5", children: [
                      "USER_ID: ",
                      1e3 + row.id
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-brand-text-sub text-[13px] font-medium font-sans", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5 opacity-40" }),
                  row.email
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: cn(
                      "font-bold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wide",
                      row.role === "Admin" ? "bg-brand-gold text-black border-transparent" : row.role === "Moderator" ? "bg-blue-600/20 text-blue-400 border-blue-500/20" : "bg-brand-card-2 text-brand-text-sub border-transparent"
                    ),
                    children: row.role
                  }
                ) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: row.status === "Hoạt động" ? /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => toggleUserStatus(row.id),
                    title: "Click để khoá tài khoản",
                    className: "flex items-center gap-1.5 text-brand-green text-[11px] font-bold uppercase bg-brand-green/10 px-2.5 py-1 rounded border border-brand-green/20 hover:bg-brand-green/20 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-brand-green" }),
                      "Hoạt động"
                    ]
                  }
                ) : /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => toggleUserStatus(row.id),
                    title: "Click để mở khoá tài khoản",
                    className: "flex items-center gap-1.5 text-brand-red text-[11px] font-bold uppercase bg-brand-red/10 px-2.5 py-1 rounded border border-brand-red/20 hover:bg-brand-red/20 transition-all",
                    children: [
                      /* @__PURE__ */ jsx(Ban, { className: "h-3 w-3" }),
                      "Bị Khóa"
                    ]
                  }
                ) }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center text-brand-text-sub text-[13px] font-semibold font-mono", children: row.date }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                  /* @__PURE__ */ jsx(
                    AdminTableActionButton,
                    {
                      variant: "edit",
                      onClick: () => openEdit(row),
                      label: "Sửa thành viên"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    AdminTableActionButton,
                    {
                      variant: "delete",
                      onClick: () => dialogs.openDelete(row),
                      label: "Xóa thành viên"
                    }
                  )
                ] }) })
              ] }, row.id)) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminFormDialog,
          {
            open: dialogs.isAddOpen,
            onOpenChange: dialogs.setIsAddOpen,
            title: "Tạo tài khoản mới",
            description: "Cấp quyền truy cập hệ thống cho game thủ hoặc quản trị viên mới.",
            size: "sm",
            onSubmit: handleCreateUser,
            submitLabel: "Tạo tài khoản",
            cancelLabel: "Hủy bỏ",
            children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(UserFormFallback, {}), children: /* @__PURE__ */ jsx(AdminUserForm, { value: newForm, onChange: setNewForm }) })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminFormDialog,
          {
            open: dialogs.isEditOpen,
            onOpenChange: (open) => {
              dialogs.setIsEditOpen(open);
              if (!open) dialogs.closeEdit();
            },
            title: "Cập nhật tài khoản",
            description: "Sửa đổi thông tin và phân quyền của thành viên.",
            size: "sm",
            onSubmit: handleUpdateUser,
            submitLabel: "Cập nhật",
            cancelLabel: "Hủy bỏ",
            children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(UserFormFallback, {}), children: /* @__PURE__ */ jsx(AdminUserForm, { value: editForm, onChange: setEditForm, showStatus: true }) })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminDeleteDialog,
          {
            open: dialogs.isDeleteOpen,
            onOpenChange: (open) => {
              dialogs.setIsDeleteOpen(open);
              if (!open) dialogs.closeDelete();
            },
            title: "Xóa người dùng",
            description: dialogs.deleteTarget ? `Bạn có chắc chắn muốn xóa "${dialogs.deleteTarget.name}"? Thao tác này không thể hoàn tác.` : "",
            onConfirm: handleDeleteUser
          }
        )
      ]
    }
  );
}
function meta$n() {
  return buildPageMeta(adminStaticMeta("/admin/nguoi-dung", "Người dùng"));
}
const route31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminUsersPage,
  meta: meta$n
}, Symbol.toStringTag, { value: "Module" }));
const AdminItemForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bL).then((m2) => ({ default: m2.AdminItemForm }))
);
function ItemFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-12 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu trang bị..." });
}
function AdminItemsPage() {
  const { items: items2, heroes: heroes2, addItem, updateItem, deleteItem } = useAppStore();
  const [search, setSearch] = React.useState("");
  const [selectedTier, setSelectedTier] = React.useState("Tất cả Bậc");
  const [newItem, setNewItem] = React.useState(EMPTY_ITEM_FORM);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [detailItem, setDetailItem] = React.useState(null);
  const matchItem = React.useCallback(
    (item, q) => {
      const query = q.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(query) || item.stats.toLowerCase().includes(query);
      const matchesTier = selectedTier === "Tất cả Bậc" || item.tier === Number(selectedTier);
      return matchesSearch && matchesTier;
    },
    [selectedTier]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize
  } = useAdminListPage({
    items: items2,
    searchTerm: search,
    match: matchItem,
    resetDeps: [selectedTier]
  });
  const handleCreateItem = () => {
    if (!newItem.name.trim()) return;
    const id = slugifyItemId(
      newItem.name,
      items2.map((i) => i.id)
    );
    addItem(itemFromFormValue(newItem, id));
    setNewItem(EMPTY_ITEM_FORM);
    showSuccess(`Đã thêm trang bị "${newItem.name.trim()}".`);
    dialogs.closeAdd();
  };
  const handleUpdateItem = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return;
    updateItem(dialogs.editingItem.id, dialogs.editingItem);
    showSuccess(`Đã cập nhật trang bị "${dialogs.editingItem.name}".`);
    dialogs.closeEdit();
  };
  const confirmDeleteItem = () => {
    if (dialogs.deleteTarget) {
      deleteItem(dialogs.deleteTarget.id);
      showSuccess(`Đã xóa trang bị "${dialogs.deleteTarget.name}".`);
      dialogs.closeDelete();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AdminListShell,
      {
        header: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            AdminPageHeader,
            {
              icon: Package,
              title: "Quản lý trang bị",
              description: "Cập nhật kho tàng vật phẩm tranh đoạt chiến thuật, chỉ số cộng thêm và thuộc tính trang bị nâng cấp.",
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "default",
                  onClick: dialogs.openAdd,
                  className: "gap-2 bg-gold-gradient text-black font-bold admin-meta uppercase tracking-wider h-11 px-6 rounded-xl transition-all hover:scale-[1.02]",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "h-4.5 w-4.5 stroke-[3px]" }),
                    " Thêm trang bị mới"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
        ] }),
        children: /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            toolbar: /* @__PURE__ */ jsx(
              AdminToolbar,
              {
                searchValue: search,
                onSearchChange: setSearch,
                searchPlaceholder: "Tìm kiếm vật phẩm dũng sĩ...",
                children: /* @__PURE__ */ jsxs(Select, { value: selectedTier, onValueChange: setSelectedTier, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[170px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả Bậc", children: "Tất cả Bậc đồ" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "Bậc 1 (Sơ cấp)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "2", children: "Bậc 2 (Trung cấp)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "3", children: "Bậc 3 (Cao cấp)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "4", children: "Bậc 4 (Siêu phẩm)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "5", children: "Bậc 5 (Huyền thoại)" })
                  ] })
                ] })
              }
            ),
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredItems.length > 0 ? startIndex + 1 : 0,
                end: Math.min(startIndex + pageSize, filteredItems.length),
                total: filteredItems.length,
                label: "đại trang bị"
              }
            ),
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            isEmpty: paginatedItems.length === 0,
            emptyTitle: "Không tìm thấy vật phẩm nào trùng khớp chỉ số.",
            emptyDescription: "Hãy thử gõ từ khóa tìm kiếm chính xác hơn.",
            children: /* @__PURE__ */ jsxs(AdminTable, { children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { children: [
                /* @__PURE__ */ jsx(AdminTh, { className: "w-16 text-center", children: "STT" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tên vật phẩm" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-36", children: "Cấp bậc (Tier)" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Thuộc tính cộng thêm" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-36", children: "Đồng bộ đám mây" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-44", children: "Thao tác dữ liệu" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedItems.map((row, idx) => {
                const actualIndex = startIndex + idx + 1;
                return /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center text-brand-text-sub font-mono admin-meta", children: actualIndex }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "w-10 h-10 rounded-xl bg-brand-card-2 border border-brand-border flex items-center justify-center overflow-hidden group-hover:scale-[1.05] transition-transform relative", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: cn(
                            "absolute inset-0 opacity-20 bg-gradient-to-br",
                            row.tier >= 4 ? "from-brand-red to-orange-600" : row.tier === 3 ? "from-purple-500 to-indigo-600" : "from-blue-400 to-blue-600"
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx(Package, { className: "h-5 w-5 text-brand-text-sub/60 z-10" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => {
                            setDetailItem(row);
                            setIsDetailOpen(true);
                          },
                          className: "text-left font-bold text-brand-text-main admin-body hover:text-brand-gold transition-colors leading-snug tracking-tight",
                          children: row.name
                        }
                      ),
                      /* @__PURE__ */ jsxs("span", { className: "admin-meta text-brand-text-sub font-mono tracking-wider opacity-90 mt-0.5", children: [
                        "ID: ",
                        row.id.toUpperCase()
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: cn(
                        "inline-flex items-center gap-1 px-3 py-1 admin-meta font-bold uppercase rounded-lg border leading-none tracking-wider font-mono",
                        row.tier >= 4 ? "text-brand-red border-brand-red/30 bg-brand-red/5" : row.tier === 3 ? "text-purple-400 border-purple-500/30 bg-purple-500/5" : "text-blue-400 border-blue-500/30 bg-blue-500/5"
                      ),
                      children: [
                        "Bậc ",
                        row.tier
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsx("div", { className: "text-brand-text-sub admin-body font-normal leading-relaxed line-clamp-1 max-w-[320px]", children: row.stats }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-brand-green admin-meta font-bold uppercase tracking-widest bg-brand-green/5 border border-brand-green/10 px-2.5 py-1 rounded-md leading-none", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" }),
                    "Đã Đồng Bộ"
                  ] }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
                    AdminRowActions,
                    {
                      onView: () => {
                        setDetailItem(row);
                        setIsDetailOpen(true);
                      },
                      onEdit: () => dialogs.openEdit({ ...row }),
                      onDelete: () => dialogs.openDelete(row)
                    }
                  ) })
                ] }, row.id);
              }) })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isAddOpen,
        onOpenChange: dialogs.setIsAddOpen,
        title: "Thêm trang bị mới",
        description: "Nhập thông số, hiệu ứng và gợi ý chiến thuật cho trang bị mới.",
        size: "lg",
        onSubmit: handleCreateItem,
        submitLabel: "Lưu trang bị",
        cancelLabel: "Hủy bỏ",
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(ItemFormFallback, {}), children: /* @__PURE__ */ jsx(AdminItemForm, { value: newItem, onChange: setNewItem, heroes: heroes2 }) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.setEditingItem(null);
        },
        title: "Chỉnh sửa trang bị",
        description: "Cập nhật thông số, hiệu ứng và gợi ý chiến thuật của trang bị.",
        size: "lg",
        onSubmit: handleUpdateItem,
        submitLabel: "Cập nhật dữ liệu",
        cancelLabel: "Hủy bỏ",
        children: dialogs.editingItem && /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(ItemFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminItemForm,
          {
            value: itemFormFromItem(dialogs.editingItem),
            onChange: (value) => dialogs.setEditingItem(itemFromFormValue(value, dialogs.editingItem.id)),
            heroes: heroes2
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(AdminItemDetailDialog, { item: detailItem, open: isDetailOpen, onOpenChange: setIsDetailOpen }),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.setDeleteTarget(null);
        },
        title: "Xác nhận xóa trang bị",
        description: dialogs.deleteTarget ? `Bạn có chắc muốn xóa vĩnh viễn trang bị "${dialogs.deleteTarget.name}" khỏi cẩm nang trò chơi?` : "",
        onConfirm: confirmDeleteItem,
        confirmLabel: "Xóa trang bị"
      }
    )
  ] });
}
function meta$m() {
  return buildPageMeta(adminStaticMeta("/admin/trang-bi", "Trang bị"));
}
const route32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminItemsPage,
  meta: meta$m
}, Symbol.toStringTag, { value: "Module" }));
const AdminHeroForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bV).then((m2) => ({ default: m2.AdminHeroForm }))
);
function HeroFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-12 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu tướng..." });
}
function getSeedHero(id) {
  return HEROES.find((h) => h.id === id);
}
function AdminHeroEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isCreate = location.pathname.endsWith("/them");
  const {
    heroes: heroes2,
    races: races2,
    classes: classes2,
    items: items2,
    media,
    addHero,
    replaceHero,
    resetHeroFields
  } = useAppStore();
  const existing = !isCreate && id ? heroes2.find((h) => h.id === id) : void 0;
  const [draft, setDraft] = React.useState(
    () => existing ? { ...existing } : createDefaultHeroDraft()
  );
  React.useEffect(() => {
    if (isCreate) {
      setDraft(createDefaultHeroDraft());
    } else if (existing) {
      setDraft({ ...existing });
    }
  }, [isCreate, existing]);
  if (!isCreate && id && !existing) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-8", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          onClick: () => navigate("/admin/tuong"),
          className: "text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 h-11 px-4 rounded-xl font-medium",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            "Quay lại"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-brand-text-sub admin-body", children: [
        'Không tìm thấy tướng với ID "',
        id,
        '".'
      ] })
    ] });
  }
  const handleResetSection = (section) => {
    if (!existing) return;
    resetHeroFields(existing.id, section);
    const seed = getSeedHero(existing.id);
    setDraft(resetHeroFieldsFromSeed(draft, seed, section));
  };
  const handleSave = () => {
    if (!draft.name.trim()) return;
    if (isCreate) {
      const newId = slugifyHeroId(draft.name, heroes2.map((h) => h.id));
      addHero(normalizeHeroDraft({ ...draft, id: newId }));
    } else if (existing) {
      replaceHero(normalizeHeroDraft(draft));
    }
    navigate("/admin/tuong");
  };
  const breadcrumb = isCreate ? "Tướng / Thêm mới" : "Tướng / Sửa";
  const heroIdForLink = isCreate ? slugifyHeroId(draft.name, heroes2.map((h) => h.id)) : draft.id;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          onClick: () => navigate("/admin/tuong"),
          className: "text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 h-11 px-4 rounded-xl font-medium",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            "Quay lại"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto sm:justify-end", children: [
        !isCreate && draft.id && /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "h-11 rounded-xl border-brand-border admin-meta flex-1 sm:flex-none",
            children: /* @__PURE__ */ jsxs(Link, { to: `/tuong/${draft.id}`, target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
              "Xem trên web"
            ] })
          }
        ),
        isCreate && draft.name.trim() && /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "h-11 rounded-xl border-brand-border admin-meta flex-1 sm:flex-none",
            children: /* @__PURE__ */ jsxs(Link, { to: `/tuong/${heroIdForLink}`, target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
              "Xem trên web"
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleSave,
            disabled: !draft.name.trim(),
            className: "bg-gold-gradient hover-gold-gradient text-black text-[14px] font-bold h-11 px-8 rounded-xl flex-1 sm:flex-none",
            children: [
              /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-2" }),
              isCreate ? "Thêm tướng" : "Lưu thay đổi"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        title: isCreate ? "Thêm tướng mới" : `Sửa: ${(existing == null ? void 0 : existing.name) ?? draft.name}`,
        description: "Cấu hình đầy đủ thông tin hiển thị trên trang /tuong — chỉ số, kỹ năng, ảnh, lore và trang bị gợi ý.",
        breadcrumb
      }
    ),
    /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl", children: /* @__PURE__ */ jsx("div", { className: "p-6 md:p-8", children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(HeroFormFallback, {}), children: /* @__PURE__ */ jsx(
      AdminHeroForm,
      {
        mode: isCreate ? "create" : "edit",
        value: draft,
        onChange: setDraft,
        races: races2,
        classes: classes2,
        items: items2,
        media,
        seedHero: !isCreate && existing ? getSeedHero(existing.id) ?? null : null,
        onResetSection: !isCreate ? handleResetSection : void 0
      }
    ) }) }) })
  ] });
}
function meta$l() {
  return buildPageMeta(adminStaticMeta("/admin/tuong/them", "Thêm tướng"));
}
const route33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminHeroEditorPage,
  meta: meta$l
}, Symbol.toStringTag, { value: "Module" }));
function meta$k() {
  return buildPageMeta(adminStaticMeta("/admin/tuong/sua", "Sửa tướng"));
}
const route34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminHeroEditorPage,
  meta: meta$k
}, Symbol.toStringTag, { value: "Module" }));
const ALL_RACES = "all-races";
const ALL_CLASSES = "all-classes";
const ALL_COSTS = "all-costs";
function AdminHeroesPage() {
  const navigate = useNavigate();
  const { heroes: heroes2, races: races2, classes: classes2, deleteHero } = useAppStore();
  const [search, setSearch] = React.useState("");
  const [selectedCost, setSelectedCost] = React.useState(ALL_COSTS);
  const [selectedRace, setSelectedRace] = React.useState(ALL_RACES);
  const [selectedClass, setSelectedClass] = React.useState(ALL_CLASSES);
  const matchHero = React.useCallback(
    (hero, q) => {
      const query = q.toLowerCase();
      const matchesSearch = hero.name.toLowerCase().includes(query) || hero.race.some((r) => r.toLowerCase().includes(query)) || hero.class.some((c) => c.toLowerCase().includes(query));
      const matchesCost = selectedCost === ALL_COSTS || hero.cost === Number(selectedCost);
      const matchesRace = selectedRace === ALL_RACES || hero.race.includes(selectedRace);
      const matchesClass = selectedClass === ALL_CLASSES || hero.class.includes(selectedClass);
      return matchesSearch && matchesCost && matchesRace && matchesClass;
    },
    [selectedCost, selectedRace, selectedClass]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredHeroes,
    paginatedItems: paginatedHeroes,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex
  } = useAdminListPage({
    items: heroes2,
    searchTerm: search,
    match: matchHero,
    resetDeps: [selectedCost, selectedRace, selectedClass]
  });
  const goToEditor = (heroId) => navigate(`/admin/tuong/${heroId}/sua`);
  const confirmDeleteHero = () => {
    if (dialogs.deleteTarget) {
      deleteHero(dialogs.deleteTarget.id);
      showSuccess(`Đã xóa tướng "${dialogs.deleteTarget.name}".`);
      dialogs.closeDelete();
    }
  };
  const getCostColorHex = (cost) => {
    switch (cost) {
      case 5:
        return "text-brand-gold border-brand-gold/30 bg-brand-gold/5";
      case 4:
        return "text-tier-b border-tier-b/30 bg-tier-b/5";
      case 3:
        return "text-brand-green border-brand-green/30 bg-brand-green/5";
      case 2:
        return "text-brand-green border-brand-green/30 bg-brand-green/5";
      default:
        return "text-brand-text-sub border-brand-border bg-brand-card-2";
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AdminListShell,
      {
        header: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            AdminPageHeader,
            {
              icon: Swords,
              title: "Quản lý tướng",
              description: "Cấu hình đầy đủ thông tin hiển thị trên trang /tuong — chỉ số, kỹ năng, ảnh, lore và trang bị gợi ý.",
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "default",
                  onClick: () => navigate("/admin/tuong/them"),
                  className: "gap-2 bg-gold-gradient text-black font-bold admin-meta h-11 px-6 rounded-xl transition-all hover:scale-[1.02]",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "h-4.5 w-4.5 stroke-[3px]" }),
                    " Thêm tướng mới"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
        ] }),
        children: /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            toolbar: /* @__PURE__ */ jsxs(
              AdminToolbar,
              {
                inline: true,
                searchValue: search,
                onSearchChange: setSearch,
                searchPlaceholder: "Tìm tên, tộc, hệ...",
                children: [
                  /* @__PURE__ */ jsxs(AdminInlineFilter, { label: "Tộc", value: selectedRace, onValueChange: setSelectedRace, children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: ALL_RACES, children: "Tất cả tộc" }),
                    races2.map((race) => /* @__PURE__ */ jsx(SelectItem, { value: race.name, children: race.name }, race.id))
                  ] }),
                  /* @__PURE__ */ jsxs(AdminInlineFilter, { label: "Hệ", value: selectedClass, onValueChange: setSelectedClass, children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: ALL_CLASSES, children: "Tất cả hệ" }),
                    classes2.map((cls) => /* @__PURE__ */ jsx(SelectItem, { value: cls.name, children: cls.name }, cls.id))
                  ] }),
                  /* @__PURE__ */ jsxs(AdminInlineFilter, { label: "Giá vàng", value: selectedCost, onValueChange: setSelectedCost, children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: ALL_COSTS, children: "Tất cả mức giá" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "1", children: "$1 vàng" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "2", children: "$2 vàng" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "3", children: "$3 vàng" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "4", children: "$4 vàng" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "5", children: "$5 vàng" })
                  ] })
                ]
              }
            ),
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredHeroes.length > 0 ? startIndex + 1 : 0,
                end: Math.min(startIndex + 10, filteredHeroes.length),
                total: filteredHeroes.length,
                label: "đại hiệp"
              }
            ),
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            isEmpty: paginatedHeroes.length === 0,
            emptyTitle: "Không tìm thấy anh hùng nào trùng khớp chỉ số.",
            emptyDescription: "Hãy thử gõ từ khóa tìm kiếm chính xác hơn.",
            children: /* @__PURE__ */ jsxs(AdminTable, { children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { children: [
                /* @__PURE__ */ jsx(AdminTh, { className: "w-16 text-center", children: "STT" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tên nhân vật" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-28", children: "Giá vàng" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tộc & Hệ cộng kích" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-36", children: "Cơ sở dữ liệu" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-44", children: "Thao tác dữ liệu" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedHeroes.map((row, idx) => {
                const actualIndex = startIndex + idx + 1;
                const iconUrl = getHeroIconUrl(row);
                return /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center text-brand-text-sub font-mono admin-meta", children: actualIndex }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-brand-card-2 flex items-center justify-center border border-brand-border overflow-hidden group-hover:scale-[1.05] transition-transform shadow-inner", children: iconUrl ? /* @__PURE__ */ jsx("img", { src: iconUrl, alt: "", className: "w-full h-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsx("span", { className: "admin-body font-bold text-brand-gold uppercase tracking-tight", children: row.name.substring(0, 2) }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => goToEditor(row.id),
                          className: "text-left font-bold text-brand-text-main admin-body hover:text-brand-gold transition-colors leading-snug tracking-tight",
                          children: row.name
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-0.5 flex-wrap", children: [
                        /* @__PURE__ */ jsxs("span", { className: "admin-meta text-brand-text-sub font-mono tracking-wider opacity-90", children: [
                          "UID: ",
                          row.id.toUpperCase()
                        ] }),
                        row.isNew && /* @__PURE__ */ jsx(Badge, { variant: "success", className: "admin-meta px-1.5 py-0 font-bold uppercase", children: "Mới" })
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: cn(
                        "inline-flex items-center gap-1 px-3 py-1 admin-meta font-bold uppercase rounded-lg border leading-none tracking-wider font-mono",
                        getCostColorHex(row.cost)
                      ),
                      children: [
                        "$ ",
                        row.cost
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: row.race.length === 0 && row.class.length === 0 ? /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "bg-brand-card-2 border-brand-border text-brand-text-sub admin-meta px-2 py-0.5 font-bold rounded opacity-60",
                      children: "Chưa xác định"
                    }
                  ) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    row.race.map((r) => /* @__PURE__ */ jsx(
                      Badge,
                      {
                        variant: "default",
                        className: "bg-brand-card-2 border-brand-border text-brand-text-sub admin-meta px-2 py-0.5 font-bold uppercase tracking-wider rounded",
                        children: r
                      },
                      r
                    )),
                    row.class.map((c) => /* @__PURE__ */ jsx(
                      Badge,
                      {
                        variant: "warning",
                        className: "bg-brand-gold/5 border-brand-gold/10 text-brand-gold admin-meta px-2 py-0.5 font-bold uppercase tracking-widest rounded",
                        children: c
                      },
                      c
                    ))
                  ] }) }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-brand-green admin-meta font-bold uppercase tracking-widest bg-brand-green/5 border border-brand-green/10 px-2.5 py-1 rounded-md leading-none", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" }),
                    "Đã Đồng Bộ"
                  ] }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
                    AdminRowActions,
                    {
                      onView: () => goToEditor(row.id),
                      onEdit: () => goToEditor(row.id),
                      onDelete: () => dialogs.openDelete(row),
                      viewLabel: "Xem chi tiết",
                      editLabel: "Sửa tướng",
                      deleteLabel: "Xóa tướng"
                    }
                  ) })
                ] }, row.id);
              }) })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.setDeleteTarget(null);
        },
        title: "Xác nhận xóa anh hùng",
        description: dialogs.deleteTarget ? `Bạn có chắc muốn xóa vĩnh viễn tướng "${dialogs.deleteTarget.name}" khỏi cẩm nang trò chơi?` : "",
        onConfirm: confirmDeleteHero,
        confirmLabel: "Xóa tướng"
      }
    )
  ] });
}
function meta$j() {
  return buildPageMeta(adminStaticMeta("/admin/tuong", "Tướng"));
}
const route35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminHeroesPage,
  meta: meta$j
}, Symbol.toStringTag, { value: "Module" }));
const AdminCompForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bM).then((m2) => ({ default: m2.AdminCompForm }))
);
function CompFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-12 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu đội hình..." });
}
function AdminCompsPage() {
  const { comps: comps2, heroes: heroes2, addComp, updateComp, deleteComp } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTier, setSelectedTier] = React.useState("Tất cả tier");
  const [newComp, setNewComp] = React.useState(EMPTY_COMP_FORM);
  const [editForm, setEditForm] = React.useState(EMPTY_COMP_FORM);
  const [editingId, setEditingId] = React.useState(null);
  const matchComp = React.useCallback(
    (comp, q) => {
      if (q && !comp.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (selectedTier !== "Tất cả tier" && comp.tier !== selectedTier.split(" ")[0]) return false;
      return true;
    },
    [selectedTier]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredComps,
    paginatedItems: paginatedComps,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize
  } = useAdminListPage({
    items: comps2,
    searchTerm,
    match: matchComp,
    resetDeps: [selectedTier]
  });
  const handleCreateComp = () => {
    if (!newComp.name.trim()) return;
    const id = nextNumericId(comps2);
    addComp(compFromFormValue(newComp, id, heroes2));
    setNewComp(EMPTY_COMP_FORM);
    showSuccess(`Đã thêm đội hình "${newComp.name.trim()}".`);
    dialogs.closeAdd();
  };
  const handleUpdateComp = () => {
    if (!editingId || !editForm.name.trim()) return;
    const existing = comps2.find((c) => c.id === editingId);
    if (!existing) return;
    const updated = compFromFormValue(editForm, editingId, heroes2, existing);
    updateComp(editingId, {
      ...updated,
      board: recordFromBoardSlots(editForm.boardSlots),
      synergies: calcSynergiesFromHeroes(editForm.heroes, heroes2),
      radarStats: editForm.radarStats
    });
    setEditingId(null);
    showSuccess(`Đã cập nhật đội hình "${editForm.name.trim()}".`);
    dialogs.closeEdit();
  };
  const openEdit = (row) => {
    setEditingId(row.id);
    setEditForm(compFormFromComp(row));
    dialogs.openEdit(row);
  };
  const confirmDelete = () => {
    if (dialogs.deleteTarget) {
      deleteComp(dialogs.deleteTarget.id);
      showSuccess(`Đã xóa đội hình "${dialogs.deleteTarget.name}".`);
      dialogs.closeDelete();
    }
  };
  return /* @__PURE__ */ jsxs(
    AdminListShell,
    {
      header: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          AdminPageHeader,
          {
            title: "Quản lý đội hình",
            description: `Duyệt và điều chỉnh ${comps2.length} đội hình gợi ý cho Meta hiện tại.`,
            children: /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: dialogs.openAdd,
                className: "gap-2 bg-gold-gradient text-black font-semibold text-[14px] h-11 px-6 rounded-xl transition-all",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5 stroke-[2px]" }),
                  " Thêm đội hình mới"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            isEmpty: filteredComps.length === 0,
            emptyTitle: "Không tìm thấy đội hình nào trùng khớp.",
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredComps.length > 0 ? startIndex + 1 : 0,
                end: Math.min(startIndex + pageSize, filteredComps.length),
                total: filteredComps.length,
                label: "đội hình"
              }
            ),
            toolbar: /* @__PURE__ */ jsx(
              AdminToolbar,
              {
                searchValue: searchTerm,
                onSearchChange: setSearchTerm,
                searchPlaceholder: "Tìm kiếm đội hình...",
                children: /* @__PURE__ */ jsxs(Select, { value: selectedTier, onValueChange: setSelectedTier, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[160px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả tier", children: "Tất cả Tier" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "S Tier", children: "S Tier (Cực mạnh)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "A Tier", children: "A Tier (Mạnh)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "B Tier", children: "B Tier (Ổn định)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "C Tier", children: "C Tier (Tình huống)" })
                  ] })
                ] })
              }
            ),
            children: /* @__PURE__ */ jsxs(AdminTable, { minWidth: "900px", children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { className: "hover:bg-transparent border-0", children: [
                /* @__PURE__ */ jsx(AdminTh, { className: "w-16", children: "#" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tên đội hình Meta" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tác giả" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-24", children: "Tier" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-32", children: "Thống kê" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-24", children: "Trạng thái" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-36", children: "Hành động" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedComps.map((row, idx) => {
                var _a;
                return /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-brand-text-sub font-mono text-[12px]", children: startIndex + idx + 1 }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center border border-brand-border group-hover:scale-105 transition-transform",
                          row.tier === "S" ? "bg-brand-red/10 border-brand-red/20" : "bg-brand-card-2"
                        ),
                        children: /* @__PURE__ */ jsx(
                          Layout$2,
                          {
                            className: cn(
                              "h-5 w-5",
                              row.tier === "S" ? "text-brand-red" : "text-brand-text-sub"
                            )
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-brand-text-main text-[15px] group-hover:text-brand-gold transition-colors leading-tight", children: row.name }),
                      /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-brand-text-sub font-mono opacity-60 mt-0.5", children: [
                        "ID: COMP_",
                        row.id,
                        row.difficulty != null ? ` · Độ khó ${row.difficulty}/5` : ""
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-brand-card-2 flex items-center justify-center text-[10px] font-bold text-brand-gold border border-brand-border", children: row.author.substring(0, 1) }),
                    /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-medium text-[13.5px]", children: row.author })
                  ] }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: cn(
                        "font-bold text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-wide",
                        row.tier === "S" ? "bg-brand-red text-white" : "bg-brand-card-2 text-brand-gold"
                      ),
                      children: [
                        row.tier,
                        " Tier"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 text-brand-text-sub font-semibold text-[11px]", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(ThumbsUp, { className: "h-3.5 w-3.5 opacity-60" }),
                      " ",
                      row.likes
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 font-mono", children: [
                      /* @__PURE__ */ jsx(Users, { className: "h-3.5 w-3.5 opacity-60" }),
                      " ",
                      ((_a = row.heroes) == null ? void 0 : _a.length) ?? 0
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1 bg-brand-green/10 text-brand-green px-2.5 py-1 text-[11px] font-bold rounded-md", children: "Hiện" }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1.5", children: [
                    /* @__PURE__ */ jsx(
                      AdminTableActionButton,
                      {
                        variant: "edit",
                        onClick: () => openEdit(row),
                        label: "Sửa đội hình"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      AdminTableActionButton,
                      {
                        variant: "delete",
                        onClick: () => dialogs.openDelete(row),
                        label: "Xóa đội hình"
                      }
                    )
                  ] }) })
                ] }, row.id);
              }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminFormDialog,
          {
            open: dialogs.isAddOpen,
            onOpenChange: dialogs.setIsAddOpen,
            title: "Tạo đội hình Meta",
            description: "Thiết lập các tướng chủ chốt và tộc hệ cho đội hình mới.",
            size: "lg",
            onSubmit: handleCreateComp,
            submitLabel: "Công bố Meta",
            cancelLabel: "Hủy bỏ",
            children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(CompFormFallback, {}), children: /* @__PURE__ */ jsx(AdminCompForm, { value: newComp, onChange: setNewComp, heroes: heroes2, autoRadar: true }) })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminFormDialog,
          {
            open: dialogs.isEditOpen,
            onOpenChange: (open) => {
              dialogs.setIsEditOpen(open);
              if (!open) {
                dialogs.setEditingItem(null);
                setEditingId(null);
              }
            },
            title: "Sửa đội hình Meta",
            description: "Cập nhật thông tin chi tiết và định hướng cho đội hình.",
            size: "lg",
            onSubmit: handleUpdateComp,
            submitLabel: "Cập nhật",
            cancelLabel: "Hủy bỏ",
            children: editingId && /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(CompFormFallback, {}), children: /* @__PURE__ */ jsx(AdminCompForm, { value: editForm, onChange: setEditForm, heroes: heroes2, autoRadar: true }) })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminDeleteDialog,
          {
            open: dialogs.isDeleteOpen,
            onOpenChange: (open) => {
              dialogs.setIsDeleteOpen(open);
              if (!open) dialogs.setDeleteTarget(null);
            },
            title: "Xóa đội hình Meta",
            description: dialogs.deleteTarget ? `Bạn chắc chắn muốn xoá đội hình "${dialogs.deleteTarget.name}"? Thao tác này sẽ xoá cấu trúc khỏi mục hướng dẫn Meta.` : "",
            onConfirm: confirmDelete
          }
        )
      ]
    }
  );
}
function meta$i() {
  return buildPageMeta(adminStaticMeta("/admin/doi-hinh", "Đội hình"));
}
const route36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminCompsPage,
  meta: meta$i
}, Symbol.toStringTag, { value: "Module" }));
function TraitFilterTabs({
  activeTab,
  raceCount,
  classCount,
  onTabChange,
  hideAllTab = false
}) {
  const { t } = useTranslation("pages");
  const tabs = [
    ...hideAllTab ? [] : [{ id: "all", label: t("traits.tabs.all", { count: raceCount + classCount }) }],
    { id: "race", label: t("traits.tabs.race", { count: raceCount }) },
    { id: "class", label: t("traits.tabs.class", { count: classCount }) }
  ];
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto hide-scrollbar -mx-1 px-1", children: /* @__PURE__ */ jsx("div", { className: "flex bg-brand-card border border-brand-border p-1.5 rounded-xl w-fit min-w-0 shadow-inner", children: tabs.map((tab) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: () => onTabChange(tab.id),
      className: cn(
        "px-4 sm:px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shrink-0",
        activeTab === tab.id ? "bg-gold-gradient text-black shadow-lg" : "text-brand-text-sub hover:text-white"
      ),
      children: tab.label
    },
    tab.id
  )) }) });
}
function parseAdminTab(value) {
  if (value === "race" || value === "class") return value;
  return "race";
}
function AdminTraitsPage() {
  const { races: races2, classes: classes2 } = useAppStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = parseAdminTab(searchParams.get("tab"));
  const handleTabChange = (tab) => {
    if (tab === "all") return;
    setSearchParams({ tab }, { replace: true });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        icon: Activity,
        title: "Quản lý Tộc / Hệ",
        description: "Cấu hình mốc kích hoạt synergy cho chủng tộc và nghề nghiệp hệ tướng."
      }
    ),
    /* @__PURE__ */ jsx(
      TraitFilterTabs,
      {
        activeTab,
        raceCount: races2.length,
        classCount: classes2.length,
        onTabChange: handleTabChange,
        hideAllTab: true
      }
    ),
    activeTab === "race" ? /* @__PURE__ */ jsx(AdminTraitPanel, { kind: "race" }) : /* @__PURE__ */ jsx(AdminTraitPanel, { kind: "class" })
  ] });
}
function meta$h() {
  return buildPageMeta(adminStaticMeta("/admin/toc-he", "Tộc / Hệ"));
}
const route37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminTraitsPage,
  meta: meta$h
}, Symbol.toStringTag, { value: "Module" }));
const adminToc = UNSAFE_withComponentProps(function AdminTocRedirect() {
  return /* @__PURE__ */ jsx(Navigate, {
    to: "/admin/toc-he?tab=race",
    replace: true
  });
});
const route38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: adminToc
}, Symbol.toStringTag, { value: "Module" }));
const adminHe = UNSAFE_withComponentProps(function AdminHeRedirect() {
  return /* @__PURE__ */ jsx(Navigate, {
    to: "/admin/toc-he?tab=class",
    replace: true
  });
});
const route39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: adminHe
}, Symbol.toStringTag, { value: "Module" }));
function parseMetric(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const trimmed = value.trim().toUpperCase();
  if (trimmed.endsWith("K")) {
    return parseFloat(trimmed.replace("K", "")) * 1e3;
  }
  if (trimmed.endsWith("M")) {
    return parseFloat(trimmed.replace("M", "")) * 1e6;
  }
  const n = parseFloat(trimmed.replace(/,/g, ""));
  return Number.isNaN(n) ? 0 : n;
}
const parseViews = parseMetric;
function AdminPostsPage() {
  const { posts, deletePost } = useAppStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Tất cả danh mục");
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái");
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [detailPost, setDetailPost] = React.useState(null);
  const matchPost = React.useCallback(
    (post, q) => {
      if (q && !post.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (selectedCategory !== "Tất cả danh mục" && post.category !== selectedCategory) return false;
      if (selectedStatus !== "Tất cả trạng thái" && post.status !== selectedStatus) return false;
      return true;
    },
    [selectedCategory, selectedStatus]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredPosts,
    paginatedItems: paginatedPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex
  } = useAdminListPage({
    items: posts,
    searchTerm,
    match: matchPost,
    resetDeps: [selectedCategory, selectedStatus]
  });
  const confirmDeletePost = () => {
    if (dialogs.deleteTarget) {
      deletePost(dialogs.deleteTarget.id);
      showSuccess(`Đã xóa bài viết "${dialogs.deleteTarget.title}".`);
      dialogs.closeDelete();
    }
  };
  const totalPosts2 = posts.length;
  const publishedCount = posts.filter((p) => p.status === "Xuất bản").length;
  const draftCount = posts.filter((p) => p.status === "Bản nháp" || p.status === "Chờ duyệt").length;
  const totalViewsAccum = posts.reduce((sum, p) => sum + parseViews(p.views), 0);
  return /* @__PURE__ */ jsxs(
    AdminListShell,
    {
      header: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          AdminPageHeader,
          {
            icon: FileText,
            title: "Quản lý bài viết",
            description: "Hệ thống biên soạn cẩm nang dũng sỹ, cẩm nang tướng quân, chiến thuật xếp bài và tin điện quan trọng.",
            children: /* @__PURE__ */ jsxs(
              Button,
              {
                size: "default",
                onClick: () => navigate("/admin/bai-viet/them"),
                className: "gap-2 bg-gold-gradient text-black font-bold text-[12px] h-11 px-6 rounded-xl transition-all hover:scale-[1.02]",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "h-4.5 w-4.5 stroke-[3px]" }),
                  " Soạn bài mới"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
      ] }),
      beforeList: /* @__PURE__ */ jsx(
        AdminStatCards,
        {
          stats: [
            { label: "Tổng bài viết", value: totalPosts2 },
            { label: "Đã xuất bản", value: publishedCount },
            { label: "Bản nháp / chờ duyệt", value: draftCount },
            { label: "Lượt xem (tích lũy)", value: totalViewsAccum.toLocaleString("vi-VN") }
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            isEmpty: filteredPosts.length === 0,
            emptyTitle: "Không tìm thấy bài viết nào tương ứng.",
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredPosts.length > 0 ? startIndex + 1 : 0,
                end: Math.min(startIndex + 10, filteredPosts.length),
                total: filteredPosts.length,
                label: "bài viết"
              }
            ),
            toolbar: /* @__PURE__ */ jsxs(
              AdminToolbar,
              {
                searchValue: searchTerm,
                onSearchChange: setSearchTerm,
                searchPlaceholder: "Tìm kiếm tiêu đề bản chỉ dẫn dũng sĩ...",
                children: [
                  /* @__PURE__ */ jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[140px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả danh mục", children: "Mọi danh mục" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Hướng dẫn", children: "Hướng dẫn" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Chiến thuật", children: "Chiến thuật" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Mẹo chơi", children: "Mẹo chơi" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Tin tức", children: "Tin tức" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(Select, { value: selectedStatus, onValueChange: setSelectedStatus, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[140px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả trạng thái", children: "Mọi trạng thái" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Xuất bản", children: "Xuất bản" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Bản nháp", children: "Bản nháp" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "Chờ duyệt", children: "Chờ duyệt" })
                    ] })
                  ] })
                ]
              }
            ),
            children: /* @__PURE__ */ jsxs(AdminTable, { minWidth: "1000px", children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { className: "hover:bg-transparent border-0", children: [
                /* @__PURE__ */ jsx(AdminTh, { className: "w-16 text-center", children: "STT" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tiêu đề nội dung" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Người viết" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Danh mục" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Lượt đọc" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Trạng thái" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-44", children: "Thao tác dữ liệu" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedPosts.map((row, idx) => /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center text-brand-text-sub font-mono text-[11px]", children: startIndex + idx + 1 }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-brand-card-2 flex items-center justify-center flex-shrink-0 border border-brand-border", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-brand-text-sub group-hover:text-brand-gold transition-colors" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0 max-w-[400px]", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => {
                          setDetailPost(row);
                          setIsDetailOpen(true);
                        },
                        className: "text-left font-bold text-brand-text-main text-[14.5px] hover:text-brand-gold transition-colors truncate mb-1 leading-snug tracking-tight",
                        children: row.title
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[10px] text-brand-text-sub font-mono tracking-wider uppercase", children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3 opacity-60" }),
                        " ",
                        row.date
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-brand-border rounded-full" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "POST_ID: ",
                        row.id
                      ] })
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-brand-gold/15 flex items-center justify-center text-[9px] font-bold text-brand-gold border border-brand-gold/10", children: row.author.substring(0, 1) }),
                  /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub font-medium text-[13px]", children: row.author })
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-brand-card border-brand-border text-brand-text-sub text-[10px] font-bold uppercase tracking-wider",
                    children: row.category
                  }
                ) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1 font-bold text-[13px] font-mono text-brand-text-sub", children: [
                  /* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5 opacity-60 text-brand-text-sub" }),
                  row.views
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-md leading-none",
                      row.status === "Xuất bản" ? "text-brand-green border-brand-green/15 bg-brand-green/5" : row.status === "Chờ duyệt" ? "text-amber-400 border-amber-500/15 bg-amber-500/5" : "text-brand-text-sub border-brand-border bg-brand-card-2"
                    ),
                    children: row.status
                  }
                ) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
                  AdminRowActions,
                  {
                    onView: () => {
                      setDetailPost(row);
                      setIsDetailOpen(true);
                    },
                    onEdit: () => navigate(`/admin/bai-viet/${row.id}/sua`),
                    onDelete: () => dialogs.openDelete(row),
                    viewLabel: "Xem chi tiết",
                    editLabel: "Sửa bài viết",
                    deleteLabel: "Xóa bài viết"
                  }
                ) })
              ] }, row.id)) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminDetailDialog,
          {
            open: isDetailOpen,
            onOpenChange: setIsDetailOpen,
            size: "sm",
            title: (detailPost == null ? void 0 : detailPost.title) ?? "",
            footer: detailPost && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => {
                    setIsDetailOpen(false);
                    navigate(`/admin/bai-viet/${detailPost.id}/sua`);
                  },
                  className: "flex-1 h-11 bg-gold-gradient text-black font-bold uppercase text-[12px] rounded-xl",
                  children: "Mở trình biên tập"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => setIsDetailOpen(false),
                  variant: "outline",
                  className: "flex-1 h-11 border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase text-[12px]",
                  children: "Đóng"
                }
              )
            ] }),
            children: detailPost && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsxs(Badge, { variant: detailPost.status === "Xuất bản" ? "success" : "warning-solid", children: [
                  "TRẠNG THÁI: ",
                  detailPost.status.toUpperCase()
                ] }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", children: detailPost.category.toUpperCase() })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-left border-t border-brand-border pt-5 text-[13px]", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-brand-text-sub font-mono text-[11.5px] border-b border-brand-border pb-2.5", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "TÁC GIẢ: ",
                    /* @__PURE__ */ jsx("strong", { className: "text-brand-text-sub font-bold", children: detailPost.author })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "NGÀY ĐĂNG: ",
                    /* @__PURE__ */ jsx("strong", { className: "text-brand-text-sub font-bold", children: detailPost.date })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub", children: "Tóm tắt" }),
                  /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal text-[13px]", children: detailPost.excerpt || "Chưa có tóm tắt — mở trình biên tập để thêm nội dung." })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminDeleteDialog,
          {
            open: dialogs.isDeleteOpen,
            onOpenChange: (open) => {
              dialogs.setIsDeleteOpen(open);
              if (!open) dialogs.setDeleteTarget(null);
            },
            title: "Xác nhận xóa bài viết",
            description: dialogs.deleteTarget ? `Hành động này không thể thu hồi. Bạn có chắc muốn xóa vĩnh viễn bài viết "${dialogs.deleteTarget.title}"?` : "",
            onConfirm: confirmDeletePost,
            confirmLabel: "Xóa bài viết"
          }
        )
      ]
    }
  );
}
function meta$g() {
  return buildPageMeta(adminStaticMeta("/admin/bai-viet", "Bài viết"));
}
const route40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminPostsPage,
  meta: meta$g
}, Symbol.toStringTag, { value: "Module" }));
const CloudinaryFileUpload = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bJ).then((m2) => ({ default: m2.CloudinaryFileUpload }))
);
const ArticleProse = React.lazy(
  () => Promise.resolve().then(() => ArticleProse$2).then((m2) => ({ default: m2.ArticleProse }))
);
const CATEGORIES = ["Tin tức", "Chiến thuật", "Hướng dẫn", "Mẹo chơi", "Thảo luận", "Review"];
function PostEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { user } = useAuth();
  const { posts, addPost, updatePost, media } = useAppStore();
  const existing = id ? posts.find((p) => p.id === id) : void 0;
  const [title2, setTitle] = React.useState((existing == null ? void 0 : existing.title) ?? "");
  const [content, setContent] = React.useState((existing == null ? void 0 : existing.content) ?? "");
  const [excerpt, setExcerpt] = React.useState((existing == null ? void 0 : existing.excerpt) ?? "");
  const [category, setCategory] = React.useState((existing == null ? void 0 : existing.category) ?? "Tin tức");
  const [coverImageUrl, setCoverImageUrl] = React.useState((existing == null ? void 0 : existing.coverImageUrl) ?? "");
  const [status, setStatus] = React.useState((existing == null ? void 0 : existing.status) ?? "Bản nháp");
  const [tab, setTab] = React.useState("write");
  const [isMediaOpen, setIsMediaOpen] = React.useState(false);
  const [coverError, setCoverError] = React.useState(null);
  React.useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setContent(existing.content ?? "");
      setExcerpt(existing.excerpt ?? "");
      setCategory(existing.category);
      setCoverImageUrl(existing.coverImageUrl ?? "");
      setStatus(existing.status);
    }
  }, [existing]);
  const backPath = isAdminRoute ? "/admin/bai-viet" : -1;
  const breadcrumb = existing ? "Bài viết / Sửa" : "Bài viết / Thêm mới";
  const buildPost = (publishStatus) => {
    const cover = coverImageUrl.trim();
    if (cover && !isPersistableImageUrl(cover)) {
      setCoverError("Ảnh cover phải là URL HTTPS hoặc đường dẫn tĩnh — không dùng base64.");
      return null;
    }
    setCoverError(null);
    const postId = (existing == null ? void 0 : existing.id) ?? nextNumericId(posts);
    return {
      id: postId,
      title: title2.trim(),
      author: (existing == null ? void 0 : existing.author) ?? (isAdminRoute ? "Admin" : (user == null ? void 0 : user.name) ?? "Khách"),
      category,
      views: (existing == null ? void 0 : existing.views) ?? "0",
      status: publishStatus,
      date: (existing == null ? void 0 : existing.date) ?? (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN"),
      image: (existing == null ? void 0 : existing.image) ?? "bg-brand-card",
      excerpt: excerpt.trim() || title2.trim(),
      content,
      coverImageUrl: coverImageUrl.trim() || void 0
    };
  };
  const saveDraft = () => {
    if (!title2.trim()) return;
    const post = buildPost("Bản nháp");
    if (!post) return;
    if (existing) updatePost(existing.id, post);
    else addPost(post);
    navigate(isAdminRoute ? "/admin/bai-viet" : "/tin-tuc");
  };
  const publish = () => {
    if (!title2.trim()) return;
    const post = buildPost("Xuất bản");
    if (!post) return;
    if (existing) updatePost(existing.id, post);
    else addPost(post);
    navigate(isAdminRoute ? "/admin/bai-viet" : `/tin-tuc/${post.id}`);
  };
  const editorBody = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: `flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isAdminRoute ? "" : ""}`, children: [
      !isAdminRoute && /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          onClick: () => navigate(-1),
          className: "text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 p-0 h-auto font-medium",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            "Trở lại trang trước"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: `flex flex-wrap items-center gap-2 sm:gap-3 w-full ${isAdminRoute ? "sm:ml-auto sm:justify-end" : "sm:w-auto"}`, children: [
        isAdminRoute && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => navigate(backPath),
            className: "text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 h-11 px-4 rounded-xl font-medium",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
              "Quay lại"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: saveDraft,
            className: "text-brand-text-sub hover:text-brand-text-main text-[12px] font-semibold h-11 px-5 rounded-xl flex-1 sm:flex-none",
            children: [
              /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-2" }),
              " Lưu bản nháp"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: publish,
            className: "bg-gold-gradient hover-gold-gradient text-black text-[14px] font-bold h-11 px-8 rounded-xl flex-1 sm:flex-none",
            children: [
              /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 mr-2" }),
              " Xuất bản"
            ]
          }
        )
      ] })
    ] }),
    isAdminRoute && /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        title: existing ? "Sửa bài viết" : "Thêm bài viết mới",
        description: "Markdown, ảnh cover và trạng thái xuất bản — đồng bộ với trang Tin tức.",
        breadcrumb
      }
    ),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-10 space-y-8", children: [
      !isAdminRoute && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center", children: /* @__PURE__ */ jsx(FileText, { className: "h-7 w-7 text-black stroke-[2.5px]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-[24px] font-bold text-brand-text-main tracking-tight leading-none", children: existing ? "Sửa bài viết" : "Biên tập nội dung" }),
          /* @__PURE__ */ jsx("p", { className: "text-[14px] text-brand-text-sub font-normal", children: "Markdown, ảnh cover và trạng thái xuất bản — đồng bộ với trang Tin tức." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: "Tiêu đề bài viết" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            value: title2,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "Nhập tiêu đề thu hút người xem...",
            className: "bg-brand-card-2 border-brand-border h-14 text-xl font-bold rounded-xl focus-visible:ring-brand-gold/20"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: "Tóm tắt (excerpt)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: excerpt,
            onChange: (e) => setExcerpt(e.target.value),
            placeholder: "Mô tả ngắn hiển thị trên thẻ bài viết...",
            className: "w-full bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main resize-none h-24 focus:outline-none focus:border-brand-gold/30"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: "Phân loại" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setCategory(cat),
              className: `px-4 py-2 rounded-xl text-[12px] font-semibold transition-all border ${category === cat ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:bg-brand-card"}`,
              children: cat
            },
            cat
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-brand-text-sub", children: "Trạng thái" }),
          /* @__PURE__ */ jsxs(Select, { value: status, onValueChange: (v) => setStatus(v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-brand-card-2", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "Xuất bản", children: "Xuất bản" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Bản nháp", children: "Bản nháp" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Chờ duyệt", children: "Chờ duyệt" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("label", { className: "admin-form-label flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Image, { className: "w-3.5 h-3.5" }),
          " Ảnh cover"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              value: coverImageUrl,
              onChange: (e) => {
                const next = e.target.value;
                const lower = next.trim().toLowerCase();
                if (lower.startsWith("data:") || lower.startsWith("blob:")) {
                  setCoverError("Không dùng URL base64 hoặc blob cho ảnh cover.");
                  return;
                }
                setCoverError(null);
                setCoverImageUrl(next);
              },
              placeholder: "https://...",
              className: "bg-brand-card-2 border-brand-border h-11 rounded-xl flex-1"
            }
          ),
          /* @__PURE__ */ jsx(
            React.Suspense,
            {
              fallback: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  disabled: true,
                  className: "h-11 rounded-xl border-brand-border shrink-0",
                  children: "Đang tải..."
                }
              ),
              children: /* @__PURE__ */ jsx(
                CloudinaryFileUpload,
                {
                  onUploaded: (urls) => {
                    if (urls[0]) {
                      setCoverImageUrl(urls[0]);
                      setCoverError(null);
                    }
                  },
                  onError: (message) => setCoverError(message),
                  label: "Tải ảnh",
                  uploadingLabel: "Đang tải..."
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setIsMediaOpen(true),
              className: "h-11 rounded-xl border-brand-border shrink-0",
              children: [
                /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 mr-2" }),
                " Chọn ảnh"
              ]
            }
          )
        ] }),
        coverError && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-red font-medium", children: coverError })
      ] }),
      /* @__PURE__ */ jsx(Dialog, { open: isMediaOpen, onOpenChange: setIsMediaOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg bg-brand-card border-brand-border rounded-xl", children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "admin-dialog-title", children: "Chọn ảnh từ thư viện" }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto custom-scrollbar py-2", children: media.length === 0 ? /* @__PURE__ */ jsx("p", { className: "col-span-full text-[13px] text-brand-text-sub py-6 text-center", children: "Chưa có media. Thêm tại mục Media trong admin." }) : media.map((asset) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setCoverImageUrl(asset.url);
              setIsMediaOpen(false);
            },
            className: "group rounded-xl border border-brand-border overflow-hidden bg-brand-card-2 hover:border-brand-gold/40 transition-all text-left",
            children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-video bg-brand-card flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: asset.url,
                  alt: asset.alt,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform"
                }
              ) }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub p-2 truncate", children: asset.name })
            ]
          },
          asset.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsx("label", { className: "admin-form-label", children: "Nội dung (Markdown)" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                size: "sm",
                variant: tab === "write" ? "default" : "ghost",
                onClick: () => setTab("write"),
                className: "rounded-lg h-8 text-[11px] font-semibold",
                children: "Viết"
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: tab === "preview" ? "default" : "ghost",
                onClick: () => setTab("preview"),
                className: "rounded-lg h-8 text-[11px] font-semibold",
                children: [
                  /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5 mr-1" }),
                  " Xem trước"
                ]
              }
            )
          ] })
        ] }),
        tab === "write" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 p-3 bg-brand-card-2 border border-brand-border border-b-0 rounded-t-xl overflow-x-auto", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 text-brand-text-sub", type: "button", children: /* @__PURE__ */ jsx(Bold, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-5 bg-brand-border mx-1" }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 text-brand-text-sub", type: "button", children: /* @__PURE__ */ jsx(Type, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 text-brand-text-sub", type: "button", children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: content,
              onChange: (e) => setContent(e.target.value),
              placeholder: "Viết nội dung bài viết ở đây (hỗ trợ Markdown)...",
              className: "w-full bg-brand-card-2 border border-brand-border rounded-b-xl p-6 text-[15px] text-brand-text-main resize-none h-[420px] focus:outline-none focus:border-brand-gold/30 leading-relaxed"
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "border border-brand-border rounded-xl p-6 md:p-8 bg-brand-card-2 min-h-[420px]", children: content.trim() ? /* @__PURE__ */ jsx(
          React.Suspense,
          {
            fallback: /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm", children: "Đang tải bản xem trước..." }),
            children: /* @__PURE__ */ jsx(ArticleProse, { content })
          }
        ) : /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm", children: "Chưa có nội dung để xem trước." }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card-2 border-brand-border p-6 rounded-xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-brand-gold font-bold text-[13px] mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4" }),
          " Tiêu chuẩn nội dung"
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "text-[13px] text-brand-text-sub space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: "Nội dung chính xác, có giá trị cho cộng đồng Auto Chess VN." }),
          /* @__PURE__ */ jsx("li", { children: "Không ngôn từ thô tục hoặc công kích cá nhân." }),
          /* @__PURE__ */ jsx("li", { children: "Ảnh cover rõ nét, phù hợp chủ đề game." })
        ] })
      ] })
    ] }) }) })
  ] });
  if (isAdminRoute) {
    return /* @__PURE__ */ jsx("div", { className: "space-y-8 pb-8", children: editorBody });
  }
  return /* @__PURE__ */ jsx(PageContainer, { width: "reading", className: "space-y-8 pb-32 pt-4", children: editorBody });
}
function meta$f() {
  return buildPageMeta(adminStaticMeta("/admin/bai-viet/them", "Thêm bài viết"));
}
const route41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PostEditorPage,
  meta: meta$f
}, Symbol.toStringTag, { value: "Module" }));
function meta$e() {
  return buildPageMeta(adminStaticMeta("/admin/bai-viet/sua", "Sửa bài viết"));
}
const route42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PostEditorPage,
  meta: meta$e
}, Symbol.toStringTag, { value: "Module" }));
const AdminBannerForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bN).then((m2) => ({ default: m2.AdminBannerForm }))
);
function BannerFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-12 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu banner..." });
}
function AdminBannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái");
  const [newBanner, setNewBanner] = React.useState(EMPTY_BANNER_FORM);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [detailBanner, setDetailBanner] = React.useState(null);
  const matchBanner = React.useCallback(
    (banner, q) => {
      const query = q.toLowerCase();
      const matchesSearch = banner.title.toLowerCase().includes(query) || banner.subtitle.toLowerCase().includes(query);
      const matchesStatus = selectedStatus === "Tất cả trạng thái" || banner.status === selectedStatus;
      return matchesSearch && matchesStatus;
    },
    [selectedStatus]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredBanners,
    paginatedItems: paginatedBanners,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize
  } = useAdminListPage({
    items: banners,
    searchTerm,
    match: matchBanner,
    resetDeps: [selectedStatus]
  });
  const handleCreateBanner = () => {
    if (!newBanner.title.trim()) return;
    const id = nextNumericId(banners);
    addBanner(bannerFromFormValue(newBanner, id));
    setNewBanner(EMPTY_BANNER_FORM);
    showSuccess(`Đã tạo banner "${newBanner.title.trim()}" thành công!`);
    dialogs.closeAdd();
  };
  const handleUpdateBanner = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.title.trim()) return;
    updateBanner(
      dialogs.editingItem.id,
      bannerFromFormValue(bannerFormFromBanner(dialogs.editingItem), dialogs.editingItem.id, dialogs.editingItem)
    );
    showSuccess(`Đã cập nhật banner "${dialogs.editingItem.title}".`);
    dialogs.closeEdit();
  };
  const confirmDeleteBanner = () => {
    if (dialogs.deleteTarget) {
      deleteBanner(dialogs.deleteTarget.id);
      showSuccess(`Đã xóa banner "${dialogs.deleteTarget.title}".`);
      dialogs.closeDelete();
    }
  };
  const totalBanners = banners.length;
  const activeBannersCount = banners.filter((b) => b.status === "Hiện").length;
  const hiddenBannersCount = banners.filter((b) => b.status === "Ẩn").length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AdminListShell,
      {
        header: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            AdminPageHeader,
            {
              icon: Image,
              title: "Quản lý banners",
              description: "Cấu hình trang hoàng sảnh chính website, tin tức sự kiện, và chiến dịch quảng cáo trọng tâm mùa giải.",
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "default",
                  onClick: dialogs.openAdd,
                  className: "gap-2 bg-gold-gradient text-black font-bold admin-meta uppercase tracking-wider h-11 px-6 rounded-xl transition-all hover:scale-[1.02]",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "h-4.5 w-4.5 stroke-[3px]" }),
                    " Thêm banner mới"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
        ] }),
        beforeList: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0", children: [
          /* @__PURE__ */ jsxs(Card, { className: "p-4 sm:p-5 flex items-center justify-between bg-brand-card border-brand-border shadow-none rounded-xl relative overflow-hidden group hover:border-brand-gold/20 transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1 z-10", children: [
              /* @__PURE__ */ jsx("span", { className: "admin-eyebrow", children: "Mẫu Banner Khởi tạo" }),
              /* @__PURE__ */ jsx("div", { className: "admin-stat-value", children: totalBanners })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-brand-card-2 flex items-center justify-center text-brand-text-sub group-hover:text-brand-text-main transition-colors", children: /* @__PURE__ */ jsx(Image, { className: "h-5 w-5" }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-4 sm:p-5 flex items-center justify-between bg-brand-card border-brand-border shadow-none rounded-xl relative overflow-hidden group hover:border-brand-gold/20 transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1 z-10", children: [
              /* @__PURE__ */ jsx("span", { className: "admin-eyebrow", children: "Đang Trực Quan (Hiện)" }),
              /* @__PURE__ */ jsx("div", { className: "admin-stat-value text-brand-gold", children: activeBannersCount })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-brand-gold/5 flex items-center justify-center text-brand-gold", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-4 sm:p-5 flex items-center justify-between bg-brand-card border-brand-border shadow-none rounded-xl relative overflow-hidden group hover:border-brand-gold/20 transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1 z-10", children: [
              /* @__PURE__ */ jsx("span", { className: "admin-eyebrow", children: "Lưu nháp trữ kho (Ẩn)" }),
              /* @__PURE__ */ jsx("div", { className: "admin-stat-value", children: hiddenBannersCount })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-brand-card-2 flex items-center justify-center text-brand-text-sub", children: /* @__PURE__ */ jsx(EyeOff, { className: "h-5 w-5 text-orange-400" }) })
          ] })
        ] }),
        children: /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            toolbar: /* @__PURE__ */ jsx(
              AdminToolbar,
              {
                searchValue: searchTerm,
                onSearchChange: setSearchTerm,
                searchPlaceholder: "Tìm kiếm thông điệp tiêu đề banner...",
                children: /* @__PURE__ */ jsxs(Select, { value: selectedStatus, onValueChange: setSelectedStatus, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[170px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả trạng thái", children: "Mọi trạng thái banner" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Hiện", children: "Đang hiển thị" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Ẩn", children: "Đang lưu nháp" })
                  ] })
                ] })
              }
            ),
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredBanners.length > 0 ? startIndex + 1 : 0,
                end: Math.min(startIndex + pageSize, filteredBanners.length),
                total: filteredBanners.length,
                label: "banner"
              }
            ),
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            isEmpty: paginatedBanners.length === 0,
            emptyTitle: "Không có mẫu quảng vệ banner nào phù hợp.",
            children: /* @__PURE__ */ jsxs(AdminTable, { children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { children: [
                /* @__PURE__ */ jsx(AdminTh, { className: "w-24 text-center", children: "ẢNH BANNER" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tiêu đề Banner" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Đặc đề thu hút" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tác động nhấp chuột" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-36", children: "Trạng thái hiển trị" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-44", children: "Thao tác dữ liệu" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedBanners.map((row) => /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsx("div", { className: "w-20 h-11 rounded-xl bg-brand-card border border-brand-border overflow-hidden flex items-center justify-center relative shadow-inner", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: row.image,
                    alt: row.title,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform",
                    referrerPolicy: "no-referrer"
                  }
                ) }) }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setDetailBanner(row);
                        setIsDetailOpen(true);
                      },
                      className: "text-left font-bold text-brand-text-main admin-body hover:text-brand-gold transition-colors leading-snug tracking-tight",
                      children: row.title
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "admin-meta text-brand-text-sub font-mono mt-0.5 tracking-wider uppercase", children: [
                    "BANNER_ID: ",
                    row.id
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsx("div", { className: "text-brand-text-sub admin-body leading-relaxed max-w-[280px] truncate", children: row.subtitle }) }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-brand-text-sub font-mono admin-meta", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub uppercase font-bold admin-meta tracking-wider px-1.5 py-0.5 bg-brand-card rounded", children: "NÚT:" }),
                  /* @__PURE__ */ jsx("strong", { className: "text-brand-text-main", children: row.primaryButtonText })
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 admin-meta font-bold uppercase tracking-wider border rounded-md leading-none",
                      row.status === "Hiện" ? "text-brand-green border-brand-green/15 bg-brand-green/5" : "text-brand-text-sub border-brand-border bg-brand-card-2"
                    ),
                    children: row.status
                  }
                ) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
                  AdminRowActions,
                  {
                    onView: () => {
                      setDetailBanner(row);
                      setIsDetailOpen(true);
                    },
                    onEdit: () => dialogs.openEdit({ ...row }),
                    onDelete: () => dialogs.openDelete(row)
                  }
                ) })
              ] }, row.id)) })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isAddOpen,
        onOpenChange: dialogs.setIsAddOpen,
        title: "Thêm Banner mới",
        description: "Thiết lập quảng bá sự kiện trọng thể, cập nhật link liên kết để thu hút dũng sĩ dấn thân.",
        size: "md",
        onSubmit: handleCreateBanner,
        submitLabel: "Kích họa Banner",
        cancelLabel: "Hủy bỏ",
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(BannerFormFallback, {}), children: /* @__PURE__ */ jsx(AdminBannerForm, { value: newBanner, onChange: setNewBanner }) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.setEditingItem(null);
        },
        title: "Sửa Banner quảng bá",
        description: "Cập nhật tiêu đề, mô tả hoặc hành vi của banner sảnh.",
        size: "md",
        onSubmit: handleUpdateBanner,
        submitLabel: "Cập nhật dữ liệu",
        cancelLabel: "Hủy bỏ",
        children: dialogs.editingItem && /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(BannerFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminBannerForm,
          {
            value: bannerFormFromBanner(dialogs.editingItem),
            onChange: (value) => dialogs.setEditingItem({
              ...dialogs.editingItem,
              ...value
            })
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminBannerDetailDialog,
      {
        banner: detailBanner,
        open: isDetailOpen,
        onOpenChange: setIsDetailOpen
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.setDeleteTarget(null);
        },
        title: "Xác nhận xóa banner",
        description: dialogs.deleteTarget ? `Bạn có chắc muốn xóa vĩnh viễn banner "${dialogs.deleteTarget.title}" khỏi hệ thống?` : "",
        onConfirm: confirmDeleteBanner,
        confirmLabel: "Xóa banner"
      }
    )
  ] });
}
function meta$d() {
  return buildPageMeta(adminStaticMeta("/admin/banners", "Banners"));
}
const route43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminBannersPage,
  meta: meta$d
}, Symbol.toStringTag, { value: "Module" }));
const AdminRelicForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bO).then((m2) => ({ default: m2.AdminRelicForm }))
);
function RelicFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-12 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu dị vật..." });
}
function AdminRelicsPage() {
  const { relics: relics2, addRelic, updateRelic, deleteRelic } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("Tất cả loại");
  const [newRelic, setNewRelic] = React.useState(EMPTY_RELIC_FORM);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [detailRelic, setDetailRelic] = React.useState(null);
  const matchRelic = React.useCallback(
    (relic, q) => {
      const query = q.toLowerCase();
      const matchesSearch = relic.name.toLowerCase().includes(query) || relic.effect.toLowerCase().includes(query);
      const matchesType = selectedType === "Tất cả loại" || relic.type === selectedType;
      return matchesSearch && matchesType;
    },
    [selectedType]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredRelics,
    paginatedItems: paginatedRelics,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize
  } = useAdminListPage({
    items: relics2,
    searchTerm,
    match: matchRelic,
    resetDeps: [selectedType]
  });
  const handleCreateRelic = () => {
    if (!newRelic.name.trim()) return;
    const id = nextNumericId(relics2);
    addRelic({
      id,
      name: newRelic.name,
      rating: newRelic.rating,
      type: newRelic.type,
      effect: newRelic.effect || "Nhận thêm sức mạnh gia tăng.",
      tier: 1,
      status: "Hiện"
    });
    setNewRelic(EMPTY_RELIC_FORM);
    showSuccess(`Đã thêm dị vật "${newRelic.name.trim()}".`);
    dialogs.closeAdd();
  };
  const handleUpdateRelic = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return;
    updateRelic(dialogs.editingItem.id, dialogs.editingItem);
    showSuccess(`Đã cập nhật dị vật "${dialogs.editingItem.name}".`);
    dialogs.closeEdit();
  };
  const confirmDeleteRelic = () => {
    if (dialogs.deleteTarget) {
      deleteRelic(dialogs.deleteTarget.id);
      showSuccess(`Đã xóa dị vật "${dialogs.deleteTarget.name}".`);
      dialogs.closeDelete();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AdminListShell,
      {
        header: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            AdminPageHeader,
            {
              icon: Gem,
              title: "Quản lý dị vật",
              description: "Bảng tinh chỉnh kĩ năng bổ trợ đặc biệt, hiệu ứng chúc phúc dị vật bổ huyết hỗ trợ tổ đội.",
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "default",
                  onClick: dialogs.openAdd,
                  className: "gap-2 bg-gold-gradient text-black font-bold admin-meta uppercase tracking-wider h-11 px-6 rounded-xl transition-all hover:scale-[1.02]",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "h-4.5 w-4.5 stroke-[3px]" }),
                    " Thêm dị vật mới"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
        ] }),
        children: /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            toolbar: /* @__PURE__ */ jsx(
              AdminToolbar,
              {
                searchValue: searchTerm,
                onSearchChange: setSearchTerm,
                searchPlaceholder: "Tìm kiếm dị vật bằng tên, hiệu ứng phong thuỷ...",
                children: /* @__PURE__ */ jsxs(Select, { value: selectedType, onValueChange: setSelectedType, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[170px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả loại", children: "Tất cả loại dị vật" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Tấn công", children: "Loại Tấn công" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Phòng thủ", children: "Loại Phòng thủ" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Đa dụng", children: "Loại Đa dụng" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Phép thuật", children: "Loại Phép thuật" })
                  ] })
                ] })
              }
            ),
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredRelics.length > 0 ? startIndex + 1 : 0,
                end: Math.min(startIndex + pageSize, filteredRelics.length),
                total: filteredRelics.length,
                label: "loại dị biệt vật phẩm"
              }
            ),
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            isEmpty: paginatedRelics.length === 0,
            emptyTitle: "Không tìm thấy cổ dị vật nào trùng khớp.",
            emptyDescription: "Hãy thử gõ từ khóa tìm kiếm khác của bạn.",
            children: /* @__PURE__ */ jsxs(AdminTable, { children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { children: [
                /* @__PURE__ */ jsx(AdminTh, { className: "w-16 text-center", children: "STT" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Tên dị vật cổ" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-36", children: "Phẩm chất (Rating)" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Phân loại dị bản" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Mô tả đặc tính & hiệu ứng" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-44", children: "Thao tác dữ liệu" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedRelics.map((row, idx) => {
                const actualIndex = startIndex + idx + 1;
                return /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center text-brand-text-sub font-mono admin-meta", children: actualIndex }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-500/5 border border-brand-border flex items-center justify-center overflow-hidden group-hover:scale-[1.05] transition-transform relative", children: /* @__PURE__ */ jsx(Gem, { className: "h-5 w-5 text-brand-gold/80" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => {
                            setDetailRelic(row);
                            setIsDetailOpen(true);
                          },
                          className: "text-left font-bold text-brand-text-main admin-body hover:text-brand-gold transition-colors leading-snug tracking-tight",
                          children: row.name
                        }
                      ),
                      /* @__PURE__ */ jsxs("span", { className: "admin-meta text-brand-text-sub font-mono tracking-wider opacity-90 mt-0.5", children: [
                        "RELIC_ID: ",
                        row.id.toUpperCase()
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 admin-meta font-bold uppercase rounded-lg border leading-none tracking-widest font-mono",
                        row.rating === "S" ? "text-brand-gold border-brand-gold/30 bg-brand-gold/5" : row.rating === "A" ? "text-purple-400 border-purple-500/30 bg-purple-500/5" : "text-blue-400 border-blue-500/30 bg-blue-500/5"
                      ),
                      children: [
                        "Phẩm ",
                        row.rating
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "px-2.5 py-0.5 admin-meta font-bold uppercase bg-brand-card border-brand-border text-brand-text-sub",
                      children: row.type
                    }
                  ) }),
                  /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsx("div", { className: "text-brand-text-sub admin-body font-normal leading-relaxed line-clamp-1 max-w-[280px]", children: row.effect }) }),
                  /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
                    AdminRowActions,
                    {
                      onView: () => {
                        setDetailRelic(row);
                        setIsDetailOpen(true);
                      },
                      onEdit: () => dialogs.openEdit({ ...row }),
                      onDelete: () => dialogs.openDelete(row)
                    }
                  ) })
                ] }, row.id);
              }) })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isAddOpen,
        onOpenChange: dialogs.setIsAddOpen,
        title: "Thêm dị vật mới",
        description: "Nhập thông số kịch hoạt và phân loại để thêm dị vật cổ vào bộ sưu tập bản cập nhật.",
        size: "lg",
        onSubmit: handleCreateRelic,
        submitLabel: "Khai hoang dị vật",
        cancelLabel: "Hủy bỏ",
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(RelicFormFallback, {}), children: /* @__PURE__ */ jsx(AdminRelicForm, { value: newRelic, onChange: setNewRelic }) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.setEditingItem(null);
        },
        title: "Sửa thuộc tính Dị vật",
        description: "Chỉnh sửa thông số hiệu quả tăng dồn kịch hoạt của di tích cổ vật.",
        size: "lg",
        onSubmit: handleUpdateRelic,
        submitLabel: "Cập nhật dữ liệu",
        cancelLabel: "Hủy bỏ",
        children: dialogs.editingItem && /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(RelicFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminRelicForm,
          {
            value: {
              name: dialogs.editingItem.name,
              rating: dialogs.editingItem.rating,
              type: dialogs.editingItem.type,
              effect: dialogs.editingItem.effect
            },
            onChange: (value) => dialogs.setEditingItem({ ...dialogs.editingItem, ...value })
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminRelicDetailDialog,
      {
        relic: detailRelic,
        open: isDetailOpen,
        onOpenChange: setIsDetailOpen
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.setDeleteTarget(null);
        },
        title: "Xác nhận xóa dị vật",
        description: dialogs.deleteTarget ? `Bạn có chắc muốn xóa vĩnh viễn dị vật "${dialogs.deleteTarget.name}" khỏi cẩm nang trò chơi?` : "",
        onConfirm: confirmDeleteRelic,
        confirmLabel: "Xóa dị vật"
      }
    )
  ] });
}
function meta$c() {
  return buildPageMeta(adminStaticMeta("/admin/di-vat", "Dị vật"));
}
const route44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminRelicsPage,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
const AVAILABLE_SCOPES = [
  "all",
  "read:all",
  "read:heroes",
  "read:users",
  "write:posts",
  "write:comps",
  "write:comments",
  "flag_moderate",
  "priority_posting"
];
function ScopeChecklist({
  selected,
  onChange
}) {
  const toggle = (scope) => {
    if (selected.includes(scope)) {
      onChange(selected.filter((s) => s !== scope));
    } else {
      onChange([...selected, scope]);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto custom-scrollbar", children: AVAILABLE_SCOPES.map((scope) => /* @__PURE__ */ jsxs(
    "label",
    {
      className: cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer text-[12px] font-medium transition-all",
        selected.includes(scope) ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold" : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:border-brand-gold/20"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: selected.includes(scope),
            onChange: () => toggle(scope),
            className: "rounded border-brand-border accent-brand-gold"
          }
        ),
        scope
      ]
    },
    scope
  )) });
}
function AdminRolesPage() {
  const [roles, setRoles] = useAdminRolesState();
  const [newName, setNewName] = React.useState("");
  const [newCode, setNewCode] = React.useState("");
  const [newDesc, setNewDesc] = React.useState("");
  const [newScopes, setNewScopes] = React.useState(["read:all"]);
  const { successMessage, showSuccess } = useAdminSuccessToast();
  const dialogs = useAdminCrudDialogs();
  const handleCreateRole = () => {
    if (!newName.trim() || !newCode.trim()) return;
    const id = (roles.length + 1).toString();
    const newRole = {
      id,
      name: newName,
      code: newCode.toUpperCase().replace(/\s+/g, "_"),
      desc: newDesc || "Không có mô tả chi tiết.",
      users: 0,
      scopes: newScopes.length > 0 ? newScopes : ["read:all"]
    };
    setRoles((prev) => [...prev, newRole]);
    setNewName("");
    setNewCode("");
    setNewDesc("");
    setNewScopes(["read:all"]);
    showSuccess(`Đã tạo vai trò ${newName} thành công!`);
  };
  const handleUpdateRole = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim() || !dialogs.editingItem.code.trim()) return;
    setRoles((prev) => prev.map((r) => r.id === dialogs.editingItem.id ? dialogs.editingItem : r));
    showSuccess(`Đã cập nhật vai trò ${dialogs.editingItem.name}.`);
    dialogs.closeEdit();
  };
  const handleDeleteRole = () => {
    if (!dialogs.deleteTarget) return;
    setRoles((prev) => prev.filter((r) => r.id !== dialogs.deleteTarget.id));
    showSuccess(`Đã xóa vai trò ${dialogs.deleteTarget.name}.`);
    dialogs.closeDelete();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        icon: Shield,
        title: "Phân quyền & vai trò",
        description: "Quản lý định nghĩa phân quyền (Scopes) và vai trò (Roles) trong ban quản trị."
      }
    ),
    /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-4", children: roles.map((role) => /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 hover:border-brand-gold/20 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/10", children: /* @__PURE__ */ jsx(Key, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "admin-card-title", children: role.name }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/10 px-1.5 py-0.5 rounded-md uppercase tracking-wider", children: role.code })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "admin-meta font-medium flex items-center gap-1 bg-brand-card-2 px-2.5 py-1 rounded-lg border border-brand-border", children: [
              /* @__PURE__ */ jsx(Users, { className: "h-3.5 w-3.5" }),
              " ",
              role.users,
              " tài khoản"
            ] }),
            role.code !== "SUPER_ADMIN" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                AdminTableActionButton,
                {
                  variant: "edit",
                  onClick: () => dialogs.openEdit({ ...role, scopes: [...role.scopes] }),
                  label: "Sửa vai trò"
                }
              ),
              /* @__PURE__ */ jsx(
                AdminTableActionButton,
                {
                  variant: "delete",
                  onClick: () => dialogs.openDelete(role),
                  label: "Xóa vai trò"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "admin-body leading-relaxed mb-4", children: role.desc }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: role.scopes.map((sc) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-brand-card-2 border-transparent text-brand-text-sub text-[10px] font-bold", children: sc }, sc)) })
      ] }, role.id)) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5", children: [
        /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase flex items-center gap-2 border-b border-brand-border pb-3", children: [
          /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 text-brand-gold" }),
          " Tạo vai trò mới"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(AdminField, { label: "Tên vai trò hiển thị", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: newName,
              onChange: (e) => setNewName(e.target.value),
              placeholder: "Ví dụ: Kiểm thử viên",
              className: "bg-brand-card-2 border-brand-border rounded-xl"
            }
          ) }),
          /* @__PURE__ */ jsx(AdminField, { label: "Mã định danh (Role Code)", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: newCode,
              onChange: (e) => setNewCode(e.target.value),
              placeholder: "Ví dụ: TESTER",
              className: "bg-brand-card-2 border-brand-border rounded-xl"
            }
          ) }),
          /* @__PURE__ */ jsx(AdminField, { label: "Mô tả nhiệm vụ", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              value: newDesc,
              onChange: (e) => setNewDesc(e.target.value),
              className: "w-full h-24 bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[13px] font-medium text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30",
              placeholder: "Tóm tắt phân quyền..."
            }
          ) }),
          /* @__PURE__ */ jsx(AdminField, { label: "Phạm vi quyền (Scopes)", children: /* @__PURE__ */ jsx(ScopeChecklist, { selected: newScopes, onChange: setNewScopes }) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: handleCreateRole,
              className: "w-full gap-2 bg-gold-gradient text-black font-bold text-[13px] uppercase h-11 rounded-xl shadow-none",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 stroke-[2.5px]" }),
                " Kích hoạt vai trò"
              ]
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.closeEdit();
        },
        title: "Sửa vai trò",
        description: "Cập nhật tên, mô tả và phạm vi quyền của vai trò.",
        size: "md",
        onSubmit: handleUpdateRole,
        submitLabel: "Lưu thay đổi",
        children: dialogs.editingItem && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(AdminField, { label: "Tên hiển thị", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: dialogs.editingItem.name,
              onChange: (e) => dialogs.setEditingItem({ ...dialogs.editingItem, name: e.target.value }),
              className: "bg-brand-card-2 border-brand-border rounded-xl"
            }
          ) }),
          /* @__PURE__ */ jsx(AdminField, { label: "Mã vai trò", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: dialogs.editingItem.code,
              onChange: (e) => dialogs.setEditingItem({
                ...dialogs.editingItem,
                code: e.target.value.toUpperCase().replace(/\s+/g, "_")
              }),
              className: "bg-brand-card-2 border-brand-border rounded-xl font-mono"
            }
          ) }),
          /* @__PURE__ */ jsx(AdminField, { label: "Mô tả", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              value: dialogs.editingItem.desc,
              onChange: (e) => dialogs.setEditingItem({ ...dialogs.editingItem, desc: e.target.value }),
              className: "w-full h-24 bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[13px] text-brand-text-main"
            }
          ) }),
          /* @__PURE__ */ jsx(AdminField, { label: "Scopes", children: /* @__PURE__ */ jsx(
            ScopeChecklist,
            {
              selected: dialogs.editingItem.scopes,
              onChange: (scopes) => dialogs.setEditingItem({ ...dialogs.editingItem, scopes })
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.closeDelete();
        },
        title: "Xóa vai trò",
        description: dialogs.deleteTarget ? `Bạn muốn xóa vai trò "${dialogs.deleteTarget.name}" ra khỏi hệ thống?` : "",
        onConfirm: handleDeleteRole
      }
    )
  ] });
}
function meta$b() {
  return buildPageMeta(adminStaticMeta("/admin/vai-tro", "Vai trò & Phân quyền"));
}
const route45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminRolesPage,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
function AdminCommentsPage() {
  const { comments, updateComment, deleteComment } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái");
  const [detailComment, setDetailComment] = React.useState(null);
  const matchComment = React.useCallback(
    (c, q) => {
      const query = q.toLowerCase();
      const matchesSearch = c.author.toLowerCase().includes(query) || c.content.toLowerCase().includes(query) || c.target.toLowerCase().includes(query);
      const matchesStatus = selectedStatus === "Tất cả trạng thái" || c.status === selectedStatus;
      return matchesSearch && matchesStatus;
    },
    [selectedStatus]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredComments,
    paginatedItems: paginatedComments,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex
  } = useAdminListPage({
    items: comments,
    searchTerm,
    match: matchComment,
    resetDeps: [selectedStatus]
  });
  const handleApprove = (id, author) => {
    updateComment(id, { status: "Đã duyệt" });
    showSuccess(`Đã duyệt bình luận của ${author}!`);
    if ((detailComment == null ? void 0 : detailComment.id) === id) {
      setDetailComment((prev) => prev ? { ...prev, status: "Đã duyệt" } : null);
    }
  };
  const handleDelete = () => {
    if (!dialogs.deleteTarget) return;
    deleteComment(dialogs.deleteTarget.id);
    showSuccess("Đã ẩn/xoá bình luận vi phạm khỏi cơ sở dữ liệu.");
    if ((detailComment == null ? void 0 : detailComment.id) === dialogs.deleteTarget.id) {
      setDetailComment(null);
    }
    dialogs.closeDelete();
  };
  const threadComments = detailComment ? comments.filter((c) => c.threadId === detailComment.threadId) : [];
  return /* @__PURE__ */ jsxs(
    AdminListShell,
    {
      header: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          AdminPageHeader,
          {
            icon: MessageSquare,
            title: "Quản lý bình luận",
            description: "Duyệt bài bình luận từ người dùng, lọc từ ngữ kích động hoặc nội dung spam."
          }
        ),
        /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            isEmpty: filteredComments.length === 0,
            emptyTitle: "Không tìm thấy bình luận nào trùng khớp.",
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredComments.length > 0 ? startIndex + 1 : 0,
                end: Math.min(startIndex + 10, filteredComments.length),
                total: filteredComments.length,
                label: "bình luận"
              }
            ),
            toolbar: /* @__PURE__ */ jsx(
              AdminToolbar,
              {
                searchValue: searchTerm,
                onSearchChange: setSearchTerm,
                searchPlaceholder: "Tìm nội dung, tác giả...",
                children: /* @__PURE__ */ jsxs(Select, { value: selectedStatus, onValueChange: setSelectedStatus, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[160px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả trạng thái", children: "Tất cả trạng thái" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Đã duyệt", children: "Đã duyệt" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Chờ duyệt", children: "Chờ duyệt" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Báo cáo", children: "Báo cáo vi phạm" })
                  ] })
                ] })
              }
            ),
            children: /* @__PURE__ */ jsx("div", { className: "divide-y divide-brand-border font-sans", children: paginatedComments.map((comment) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-6 hover:bg-brand-card-2/30 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer",
                onClick: () => setDetailComment(comment),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-bold text-xs flex items-center justify-center shrink-0", children: comment.avatar }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                        /* @__PURE__ */ jsx("span", { className: "font-bold text-brand-text-main text-[14px]", children: comment.author }),
                        /* @__PURE__ */ jsx("span", { className: "text-[11px] text-brand-text-sub font-mono", children: comment.date }),
                        /* @__PURE__ */ jsx(
                          Badge,
                          {
                            variant: comment.status === "Báo cáo" ? "danger" : comment.status === "Chờ duyệt" ? "warning" : "success",
                            className: "text-[9px] px-1.5 py-0.5 rounded-md",
                            children: comment.status
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-[13.5px] text-brand-text-sub leading-relaxed font-normal line-clamp-2", children: comment.content }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[11px] text-brand-text-sub", children: [
                        /* @__PURE__ */ jsx("span", { children: "Bình luận tại:" }),
                        /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-medium", children: comment.target })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1.5 shrink-0 self-end md:self-start",
                      onClick: (e) => e.stopPropagation(),
                      children: [
                        /* @__PURE__ */ jsxs(
                          Button,
                          {
                            variant: "ghost",
                            className: "h-9 px-3 gap-1 text-[12px] font-semibold rounded-lg",
                            onClick: () => setDetailComment(comment),
                            children: [
                              /* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }),
                              " Chi tiết"
                            ]
                          }
                        ),
                        comment.status !== "Đã duyệt" && /* @__PURE__ */ jsxs(
                          Button,
                          {
                            onClick: () => handleApprove(comment.id, comment.author),
                            variant: "ghost",
                            className: "h-9 px-3 gap-1 bg-brand-green/10 text-brand-green hover:bg-brand-green/20 text-[12px] font-semibold rounded-lg border border-brand-green/10 shadow-none",
                            children: [
                              /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }),
                              " Duyệt"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          Button,
                          {
                            onClick: () => dialogs.openDelete(comment),
                            variant: "ghost",
                            className: "h-9 px-3 gap-1 bg-brand-red/10 text-brand-red hover:bg-brand-red/20 text-[12px] font-semibold rounded-lg border border-brand-red/10 shadow-none",
                            children: [
                              /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }),
                              " Xóa"
                            ]
                          }
                        )
                      ]
                    }
                  )
                ]
              },
              comment.id
            )) })
          }
        ),
        /* @__PURE__ */ jsx(
          AdminCommentDetailDrawer,
          {
            comment: detailComment,
            threadComments,
            open: !!detailComment,
            onOpenChange: (open) => !open && setDetailComment(null),
            onApprove: handleApprove,
            onDelete: (id) => {
              const target = comments.find((c) => c.id === id);
              if (target) dialogs.openDelete(target);
            }
          }
        ),
        /* @__PURE__ */ jsx(
          AdminDeleteDialog,
          {
            open: dialogs.isDeleteOpen,
            onOpenChange: (open) => {
              dialogs.setIsDeleteOpen(open);
              if (!open) dialogs.setDeleteTarget(null);
            },
            title: "Xóa bình luận",
            description: dialogs.deleteTarget ? `Bạn có chắc muốn xóa bình luận của "${dialogs.deleteTarget.author}"? Hành động này không thể hoàn tác.` : "",
            onConfirm: handleDelete,
            confirmLabel: "Xóa bình luận"
          }
        )
      ]
    }
  );
}
function meta$a() {
  return buildPageMeta(adminStaticMeta("/admin/binh-luan", "Bình luận"));
}
const route46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminCommentsPage,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
const AdminPlayerForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bP).then((m2) => ({ default: m2.AdminPlayerForm }))
);
function PlayerFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-8 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu tuyển thủ..." });
}
function AdminLeaderboardPage() {
  const { players, addPlayer, updatePlayer, deletePlayer, rerankPlayers } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [newPlayerForm, setNewPlayerForm] = React.useState(EMPTY_PLAYER_FORM);
  const matchPlayer = React.useCallback(
    (player, q) => player.name.toLowerCase().includes(q.toLowerCase()),
    []
  );
  const { dialogs, successMessage, showSuccess, filteredItems: filteredList } = useAdminListPage({
    items: players,
    searchTerm,
    match: matchPlayer
  });
  const handleCreatePlayer = () => {
    if (!newPlayerForm.name.trim() || !newPlayerForm.mmr.trim()) return;
    const id = nextNumericId(players);
    const created = playerFromFormValue(newPlayerForm, id, players.length + 1);
    addPlayer(created);
    setNewPlayerForm(EMPTY_PLAYER_FORM);
    showSuccess(`Đã thêm đấu sĩ ${created.name} vào bảng xếp hạng!`);
  };
  const handleUpdateMmr = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return;
    updatePlayer(dialogs.editingItem.id, {
      ...playerPatchFromFormValue(playerFormFromPlayer(dialogs.editingItem)),
      server: dialogs.editingItem.server,
      winRate: dialogs.editingItem.winRate,
      matches: dialogs.editingItem.matches
    });
    dialogs.closeEdit();
    showSuccess(`Đã cập nhật MMR cho ${dialogs.editingItem.name}!`);
  };
  const handleDeletePlayer = () => {
    if (!dialogs.deleteTarget) return;
    deletePlayer(dialogs.deleteTarget.id);
    dialogs.closeDelete();
    showSuccess(`Đã loại ${dialogs.deleteTarget.name} khỏi bảng xếp hạng.`);
  };
  const handleSyncMMR = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      rerankPlayers();
      setIsRefreshing(false);
      showSuccess("Thao tác đồng bộ dữ liệu MMR trực tiếp từ API Tencent/Dragonest hoàn tất!");
    }, 1500);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        icon: Trophy,
        title: "Bảng xếp hạng kị thủ",
        description: "Quản lý thứ hạng thi đấu, điểm số Elo xếp hạng Queen/King mùa thi đấu S20.",
        children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleSyncMMR,
            disabled: isRefreshing,
            className: "gap-2 bg-brand-card border border-brand-border hover:bg-brand-card-2 text-brand-text-main font-bold text-[13px] rounded-xl h-11 px-6 shadow-none",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: `h-4 w-4 ${isRefreshing ? "animate-spin" : ""}` }),
              " Đồng bộ API Game"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsx(
          AdminToolbar,
          {
            searchValue: searchTerm,
            onSearchChange: setSearchTerm,
            searchPlaceholder: "Tra cứu tên đấu thủ...",
            className: "border-b border-brand-border bg-brand-card-2/30"
          }
        ),
        /* @__PURE__ */ jsx(AdminTableScroll, { children: /* @__PURE__ */ jsxs(AdminTable, { minWidth: "800px", children: [
          /* @__PURE__ */ jsx(AdminThead, { sticky: false, children: /* @__PURE__ */ jsxs(AdminTr, { className: "hover:bg-transparent", children: [
            /* @__PURE__ */ jsx(AdminTh, { className: "w-16 text-center", children: "Rank" }),
            /* @__PURE__ */ jsx(AdminTh, { children: "Tên tuyển thủ" }),
            /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Bậc hạng" }),
            /* @__PURE__ */ jsx(AdminTh, { className: "text-right", children: "Mmr (Elo)" }),
            /* @__PURE__ */ jsx(AdminTh, { className: "text-right", children: "Tỷ lệ Thắng" }),
            /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Số Trận" }),
            /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-24", children: "Thao tác" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: filteredList.map((player) => /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
            /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] font-mono mx-auto ${player.rank === 1 ? "bg-brand-gold text-black" : player.rank === 2 ? "bg-brand-text-sub text-black" : player.rank === 3 ? "bg-brand-gold-deep text-white" : "bg-brand-card-2 text-brand-text-sub"}`,
                children: player.rank
              }
            ) }),
            /* @__PURE__ */ jsxs(AdminTd, { children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-brand-text-main group-hover:text-brand-gold transition-colors", children: player.name }),
              /* @__PURE__ */ jsx("div", { className: "admin-meta font-mono", children: player.server })
            ] }),
            /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx(
              Badge,
              {
                variant: player.tier === "Queen" ? "danger" : "warning",
                className: "text-[9px] px-1 py-0.5 rounded-md",
                children: player.tier
              }
            ) }),
            /* @__PURE__ */ jsx(AdminTd, { className: "text-right font-mono font-bold text-brand-gold", children: player.mmr }),
            /* @__PURE__ */ jsx(AdminTd, { className: "text-right font-mono text-brand-text-sub", children: player.winRate }),
            /* @__PURE__ */ jsx(AdminTd, { className: "text-center font-mono text-brand-text-sub", children: player.matches }),
            /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
              AdminRowActions,
              {
                onEdit: () => dialogs.openEdit({ ...player }),
                onDelete: () => dialogs.openDelete(player),
                editLabel: "Sửa MMR",
                deleteLabel: "Loại khỏi bảng"
              }
            ) })
          ] }, player.id)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5", children: [
        /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase flex items-center gap-2 border-b border-brand-border pb-3", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 text-brand-gold" }),
          " Thêm tuyển thủ"
        ] }),
        /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(PlayerFormFallback, {}), children: /* @__PURE__ */ jsx(AdminPlayerForm, { value: newPlayerForm, onChange: setNewPlayerForm }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleCreatePlayer,
            className: "w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase",
            children: "Cập nhật lên bảng xếp hạng"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.setEditingItem(null);
        },
        title: "Chỉnh sửa MMR",
        description: "Cập nhật điểm MMR và phân hạng của tuyển thủ. Thứ hạng sẽ tự động sắp xếp lại.",
        size: "sm",
        onSubmit: handleUpdateMmr,
        submitLabel: "Lưu MMR",
        children: dialogs.editingItem && /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(PlayerFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminPlayerForm,
          {
            value: playerFormFromPlayer(dialogs.editingItem),
            onChange: (value) => dialogs.setEditingItem({
              ...dialogs.editingItem,
              ...playerPatchFromFormValue(value)
            }),
            namePlaceholder: "Tên tuyển thủ"
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.setDeleteTarget(null);
        },
        title: "Loại khỏi bảng xếp hạng",
        description: dialogs.deleteTarget ? `Bạn chắc chắn muốn loại "${dialogs.deleteTarget.name}" ra khỏi danh sách bảng xếp hạng?` : "",
        onConfirm: handleDeletePlayer,
        confirmLabel: "Loại tuyển thủ"
      }
    )
  ] });
}
function meta$9() {
  return buildPageMeta(adminStaticMeta("/admin/bang-xep-hang", "Bảng xếp hạng"));
}
const route47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminLeaderboardPage,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
function AdminNewsPage() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8 max-w-2xl", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        icon: FileText,
        title: "Quản lý bản tin nhanh",
        description: "Tin tức site public đồng bộ với CMS bài viết đầy đủ — markdown, cover và trạng thái xuất bản."
      }
    ),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Newspaper, { className: "h-6 w-6 text-brand-gold" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "admin-card-title", children: "Dùng Quản lý bài viết để biên tập tin tức" }),
          /* @__PURE__ */ jsxs("p", { className: "admin-body leading-relaxed", children: [
            "Trang này không lưu dữ liệu riêng. Mọi bài tin trên",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-medium", children: "/tin-tuc" }),
            " được quản lý tại",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-medium", children: "Quản lý bài viết" }),
            " với trình biên tập Markdown."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/admin/bai-viet",
          className: "inline-flex items-center justify-center gap-2 bg-gold-gradient hover-gold-gradient text-black font-bold h-11 px-6 rounded-xl text-[13px] transition-colors",
          children: [
            "Mở quản lý bài viết",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] })
  ] });
}
function meta$8() {
  return buildPageMeta(adminStaticMeta("/admin/tin-tuc", "Tin tức"));
}
const route48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminNewsPage,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
const AdminEventForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bQ).then((m2) => ({ default: m2.AdminEventForm }))
);
function EventFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-8 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu sự kiện..." });
}
function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [newEventForm, setNewEventForm] = React.useState(EMPTY_EVENT_FORM);
  const matchEvent = React.useCallback(
    (event, q) => event.title.toLowerCase().includes(q.toLowerCase()),
    []
  );
  const { dialogs, successMessage, showSuccess, filteredItems: filteredEvents } = useAdminListPage({
    items: events,
    searchTerm,
    match: matchEvent
  });
  const handleCreateEvent = () => {
    if (!newEventForm.title.trim()) return;
    const id = nextNumericId(events);
    const created = eventFromFormValue(newEventForm, id);
    addEvent(created);
    setNewEventForm(EMPTY_EVENT_FORM);
    showSuccess(`Giải đấu ${created.title} đã được chuẩn bị tổ chức!`);
  };
  const handleUpdateEvent = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.title.trim()) return;
    updateEvent(dialogs.editingItem.id, dialogs.editingItem);
    dialogs.closeEdit();
    showSuccess("Đã cập nhật thông tin sự kiện!");
  };
  const handleDeleteEvent = () => {
    if (!dialogs.deleteTarget) return;
    deleteEvent(dialogs.deleteTarget.id);
    dialogs.closeDelete();
    showSuccess("Đã hủy sự kiện khỏi hệ thống.");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8 font-sans", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        icon: Bell,
        title: "Quản lý giải đấu & Sự kiện",
        description: "Điều hành thông tin đăng ký, giải thưởng, quy mô cho các sân chơi cộng đồng Auto Chess Mobile."
      }
    ),
    /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-4", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          AdminToolbar,
          {
            searchValue: searchTerm,
            onSearchChange: setSearchTerm,
            searchPlaceholder: "Tìm tên sự kiện...",
            className: "border-b border-brand-border"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 p-6 pt-4", children: filteredEvents.map((ev) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row sm:justify-between sm:items-center bg-brand-card-2/30 border border-brand-border hover:border-brand-gold/20 p-5 rounded-xl gap-4 transition-all",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 max-w-[70%]", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsx(
                    Badge,
                    {
                      variant: ev.status === "Cho đăng ký" ? "success" : ev.status === "Sắp diễn ra" ? "warning" : "secondary",
                      className: "text-[9px] px-2 py-0.5 rounded-md",
                      children: ev.status
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "admin-meta flex items-center gap-1 font-mono font-bold", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                    " ",
                    ev.date
                  ] })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "admin-table-cell font-bold tracking-tight", children: ev.title }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 admin-meta", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Phần thưởng: ",
                    /* @__PURE__ */ jsx("strong", { className: "text-brand-gold", children: ev.prize })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub", children: "|" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Quy mô: ",
                    /* @__PURE__ */ jsx("strong", { children: ev.participants })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                AdminRowActions,
                {
                  onEdit: () => dialogs.openEdit({ ...ev }),
                  onDelete: () => dialogs.openDelete(ev),
                  editLabel: "Sửa sự kiện",
                  deleteLabel: "Hủy sự kiện"
                }
              )
            ]
          },
          ev.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5", children: [
        /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase flex items-center gap-2 border-b border-brand-border pb-3", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 text-brand-gold" }),
          " Chuẩn bị giải đấu"
        ] }),
        /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(EventFormFallback, {}), children: /* @__PURE__ */ jsx(AdminEventForm, { value: newEventForm, onChange: setNewEventForm }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleCreateEvent,
            className: "w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase",
            children: "Cấp phép giải đấu mới"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.setEditingItem(null);
        },
        title: "Chỉnh sửa sự kiện",
        description: "Cập nhật thông tin giải đấu hoặc sự kiện cộng đồng.",
        size: "md",
        onSubmit: handleUpdateEvent,
        submitLabel: "Lưu thay đổi",
        children: dialogs.editingItem && /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(EventFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminEventForm,
          {
            showStatus: true,
            value: eventFormFromEvent(dialogs.editingItem),
            onChange: (value) => dialogs.setEditingItem(eventFromFormValue(value, dialogs.editingItem.id))
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.setDeleteTarget(null);
        },
        title: "Hủy sự kiện",
        description: dialogs.deleteTarget ? `Chắc chắn muốn hủy bỏ sự kiện "${dialogs.deleteTarget.title}"? Thao tác này không thể hoàn tác.` : "",
        onConfirm: handleDeleteEvent,
        confirmLabel: "Hủy sự kiện"
      }
    )
  ] });
}
function meta$7() {
  return buildPageMeta(adminStaticMeta("/admin/su-kien", "Sự kiện"));
}
const route49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminEventsPage,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
const AdminMediaForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bR).then((m2) => ({ default: m2.AdminMediaForm }))
);
function MediaFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-8 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu media..." });
}
const MEDIA_CATEGORIES = ["Tất cả", "Tướng", "Trang bị", "Banners", "Khác"];
function AdminMediaPage() {
  const { media, addMedia, updateMedia, deleteMedia } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Tất cả");
  const [copiedId, setCopiedId] = React.useState(null);
  const [newMediaForm, setNewMediaForm] = React.useState(EMPTY_MEDIA_FORM);
  const [urlError, setUrlError] = React.useState(null);
  const matchMedia = React.useCallback(
    (m2, q) => {
      const query = q.toLowerCase();
      const matchesSearch = m2.name.toLowerCase().includes(query);
      const matchesCat = selectedCategory === "Tất cả" || m2.category === selectedCategory;
      return matchesSearch && matchesCat;
    },
    [selectedCategory]
  );
  const { dialogs, successMessage, showSuccess, filteredItems: filteredMedia } = useAdminListPage({
    items: media,
    searchTerm,
    match: matchMedia,
    resetDeps: [selectedCategory]
  });
  const handleCopyLink = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showSuccess("Đã sao chép đường dẫn hình ảnh đại diện vào bộ nhớ tạm!");
    setTimeout(() => setCopiedId(null), 2500);
  };
  const handleCreateMedia = () => {
    if (!newMediaForm.title.trim() || !newMediaForm.url.trim()) return;
    if (!isPersistableImageUrl(newMediaForm.url)) {
      setUrlError("URL ảnh phải là HTTPS, đường dẫn tĩnh (/...) hoặc tải lên qua Cloudinary.");
      return;
    }
    setUrlError(null);
    const id = nextNumericId(media);
    const created = mediaFromFormValue(newMediaForm, id, "create");
    addMedia(created);
    setNewMediaForm(EMPTY_MEDIA_FORM);
    showSuccess(`Đã tải lên tệp tin đồ họa ${created.alt}!`);
  };
  const handleUpdateMedia = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim() || !dialogs.editingItem.url.trim()) return;
    if (!isPersistableImageUrl(dialogs.editingItem.url)) {
      setUrlError("URL ảnh phải là HTTPS, đường dẫn tĩnh (/...) hoặc tải lên qua Cloudinary.");
      return;
    }
    setUrlError(null);
    updateMedia(dialogs.editingItem.id, dialogs.editingItem);
    dialogs.closeEdit();
    showSuccess("Đã cập nhật thông tin media!");
  };
  const handleDeleteMedia = () => {
    if (!dialogs.deleteTarget) return;
    deleteMedia(dialogs.deleteTarget.id);
    dialogs.closeDelete();
    showSuccess("Đã xóa tệp đồ họa khỏi thư viện.");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8 font-sans", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        icon: ImageIcon,
        title: "Thư viện tệp tin Media",
        description: "Tải lên, sao chép URL trực tiếp và quản lý toàn bộ hình ảnh dùng cho hệ thống giải đấu, trang bị và tướng."
      }
    ),
    /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-4", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          AdminToolbar,
          {
            searchValue: searchTerm,
            onSearchChange: setSearchTerm,
            searchPlaceholder: "Tìm tên tệp ảnh...",
            className: "border-b border-brand-border",
            children: /* @__PURE__ */ jsx("div", { className: "flex gap-1 overflow-x-auto w-full sm:w-auto shrink-0 custom-scrollbar pb-1 sm:pb-0", children: MEDIA_CATEGORIES.map((cat) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedCategory(cat),
                className: cn(
                  "px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all tracking-wide border shrink-0",
                  selectedCategory === cat ? "bg-gold-gradient text-black border-brand-gold shadow-sm" : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:text-brand-text-main hover:bg-brand-card"
                ),
                children: cat
              },
              cat
            )) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6", children: filteredMedia.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-gold/20 transition-all flex flex-col justify-between",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "h-32 bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: item.url,
                    alt: item.alt || item.name,
                    className: "max-h-full max-w-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110",
                    referrerPolicy: "no-referrer"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-20", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => handleCopyLink(item.id, item.url),
                      variant: "secondary",
                      size: "sm",
                      className: "h-8 w-8 p-0 grid place-items-center bg-brand-card text-brand-text-main hover:bg-brand-card-2 border border-brand-border",
                      title: "Sao chép liên kết",
                      children: copiedId === item.id ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-brand-green animate-bounce" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    AdminTableActionButton,
                    {
                      variant: "edit",
                      onClick: () => dialogs.openEdit({ ...item }),
                      label: "Chỉnh sửa"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => dialogs.openDelete(item),
                      variant: "danger",
                      size: "sm",
                      className: "h-8 w-8 p-0 grid place-items-center bg-brand-red/80 hover:bg-brand-red text-white border-transparent",
                      title: "Xóa tệp",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-3 border-t border-brand-border space-y-1 bg-brand-card-2/30", children: [
                /* @__PURE__ */ jsx("h3", { className: "admin-meta font-bold text-brand-text-main truncate", title: item.name, children: item.name }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between admin-meta font-mono", children: [
                  /* @__PURE__ */ jsx("span", { children: item.category }),
                  /* @__PURE__ */ jsx("span", { children: item.size })
                ] })
              ] })
            ]
          },
          item.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5", children: [
        /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase flex items-center gap-2 border-b border-brand-border pb-3", children: [
          /* @__PURE__ */ jsx(CloudLightning, { className: "h-4 w-4 text-brand-gold" }),
          " Tải lên tài nguyên"
        ] }),
        /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(MediaFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminMediaForm,
          {
            mode: "create",
            value: newMediaForm,
            onChange: setNewMediaForm,
            urlError,
            onUrlError: setUrlError
          }
        ) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleCreateMedia,
            className: "w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase",
            children: "Nhập tài nguyên mới"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.setEditingItem(null);
        },
        title: "Chỉnh sửa media",
        description: "Cập nhật tên, alt text, URL và phân loại tệp.",
        size: "md",
        onSubmit: handleUpdateMedia,
        submitLabel: "Lưu thay đổi",
        children: dialogs.editingItem && /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(MediaFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminMediaForm,
          {
            mode: "edit",
            value: mediaFormFromAsset(dialogs.editingItem),
            onChange: (value) => dialogs.setEditingItem(
              mediaFromFormValue(value, dialogs.editingItem.id, "edit", dialogs.editingItem)
            ),
            urlError,
            onUrlError: setUrlError
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.setDeleteTarget(null);
        },
        title: "Xóa tệp media",
        description: dialogs.deleteTarget ? `Chắc chắn muốn xóa tệp "${dialogs.deleteTarget.name}"? Liên kết bài viết dùng hình ảnh này có thể bị lỗi.` : "",
        onConfirm: handleDeleteMedia,
        confirmLabel: "Xóa tệp"
      }
    )
  ] });
}
function meta$6() {
  return buildPageMeta(adminStaticMeta("/admin/media", "Media"));
}
const route50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminMediaPage,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const RANGE_SUBTITLES = {
  "Hôm nay": "Số liệu tổng hợp trong ngày hôm nay.",
  "7 ngày": "Số liệu 7 ngày gần nhất — xu hướng tuần.",
  "30 ngày": "Số liệu 30 ngày — phân tích tháng.",
  "Tất cả thời gian": "Tổng hợp toàn bộ lịch sử hoạt động website."
};
const MOCK_CSV_ROWS = [
  ["metric", "value", "change"],
  ["page_views", "245830", "+12.4%"],
  ["active_users", "18490", "+8.2%"],
  ["meta_clicks", "4912", "+4.1%"]
];
function AdminReportsPage() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [reportRange, setReportRange] = React.useState("Tất cả thời gian");
  const { successMessage, showSuccess } = useAdminSuccessToast();
  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showSuccess("Đã làm mới dữ liệu báo cáo.");
    }, 800);
  };
  const handleExportCsv = () => {
    const csv = MOCK_CSV_ROWS.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bao-cao-${reportRange.replace(/\s+/g, "-").toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showSuccess("Đã tải file CSV báo cáo.");
  };
  const stats2 = [
    { label: "Tổng lượt xem", value: "245,830", change: "+12.4%", trend: "up", sub: "So với tuần trước" },
    { label: "Người dung hoạt động", value: "18,490", change: "+8.2%", trend: "up", sub: "Lượng user hằng tuần" },
    { label: "Đội hình đã tạo", value: "4,912", change: "+4.1%", trend: "up", sub: "Bằng Meta Builder" },
    { label: "Tỷ lệ thoát trang", value: "24.5%", change: "-2.3%", trend: "down", sub: "Thời gian đọc trung bình 4.5p" }
  ];
  const popularMetaComps = [
    { name: "Sát Thủ Bóng Đêm", rating: "S", clicks: "42,100", winRate: "58.4%" },
    { name: "Chiến Sĩ Hoang Dã", rating: "S", clicks: "38,400", winRate: "56.2%" },
    { name: "Ma Pháp Sư Long Tộc", rating: "A", clicks: "29,500", winRate: "52.3%" },
    { name: "Thợ Săn Cơ Giới", rating: "A", clicks: "22,100", winRate: "51.8%" }
  ];
  const deviceData = [
    { name: "Thiết bị Di động (Mobile)", percent: "72%", count: "13,312" },
    { name: "Máy tính để bàn (PC)", percent: "24%", count: "4,437" },
    { name: "Máy tính bảng (Tablet)", percent: "4%", count: "740" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8", children: [
    /* @__PURE__ */ jsxs(
      AdminPageHeader,
      {
        icon: BarChart2,
        title: "Báo cáo thống kê số liệu",
        description: RANGE_SUBTITLES[reportRange] ?? "Tổng hợp các chỉ số hoạt động, click meta, tăng trưởng người dùng của website.",
        children: [
          /* @__PURE__ */ jsx(AdminDemoBadge, {}),
          /* @__PURE__ */ jsxs(Select, { value: reportRange, onValueChange: setReportRange, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[160px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "Hôm nay", children: "Báo cáo hôm nay" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "7 ngày", children: "7 ngày qua" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "30 ngày", children: "30 ngày qua" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả thời gian", children: "Tất cả thời gian" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleRefreshData,
              variant: "ghost",
              size: "icon",
              className: "h-11 w-11 rounded-xl bg-brand-card border border-brand-border text-brand-text-main",
              children: /* @__PURE__ */ jsx(RefreshCw, { className: `h-4 w-4 ${isRefreshing ? "animate-spin" : ""}` })
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: handleExportCsv,
              className: "h-11 gap-2 bg-gold-gradient text-black font-bold text-[13px] rounded-xl shadow-none",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
                " Tải CSV"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats2.map((stat, idx) => /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 relative overflow-hidden flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ jsx("span", { className: "admin-eyebrow", children: stat.label }),
        /* @__PURE__ */ jsxs("div", { className: `p-1.5 rounded-lg text-[11px] font-bold flex items-center gap-0.5 ${stat.trend === "up" ? "bg-brand-green/10 text-brand-green" : "bg-brand-red/10 text-brand-red"}`, children: [
          stat.trend === "up" ? /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(ArrowDownRight, { className: "h-3.5 w-3.5" }),
          stat.change
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "admin-stat-value font-mono mb-1", children: stat.value }),
        /* @__PURE__ */ jsx("span", { className: "admin-meta", children: stat.sub })
      ] })
    ] }, idx)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx(Card, { className: "lg:col-span-2 p-6 sm:p-8 bg-brand-card border-brand-border rounded-xl shadow-none flex flex-col justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4 text-brand-gold" }),
            " Biểu đồ truy cập tuần này"
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "warning", children: "S20 META PHASE" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "h-64 w-full relative border-b border-l border-brand-border mt-6 flex items-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 grid grid-rows-4 pointer-events-none", children: [
            /* @__PURE__ */ jsx("div", { className: "border-t border-brand-border/30 w-full h-full" }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-brand-border/30 w-full h-full" }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-brand-border/30 w-full h-full" }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-brand-border/30 w-full h-full" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-full flex justify-around items-end px-4 z-10 relative", children: [
            { day: "Thứ 2", val: "40%", height: "h-[40%]" },
            { day: "Thứ 3", val: "55%", height: "h-[55%]" },
            { day: "Thứ 4", val: "48%", height: "h-[48%]" },
            { day: "Thứ 5", val: "68%", height: "h-[68%]" },
            { day: "Thứ 6", val: "85%", height: "h-[85%]" },
            { day: "Thứ 7", val: "95%", height: "h-[95%]" },
            { day: "Chủ nhật", val: "100%", height: "h-[100%]" }
          ].map((bar, i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 w-12 group", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-brand-gold opacity-0 group-hover:opacity-100 transition-all font-bold tracking-wider mb-1 font-mono", children: bar.val }),
            /* @__PURE__ */ jsx("div", { className: `w-3.5 ${bar.height} bg-gradient-to-t from-brand-gold/10 to-brand-gold rounded-t-full transition-all duration-500 group-hover:scale-x-125 group-hover:shadow-[0_0_15px_rgba(245,180,60,0.3)]` }),
            /* @__PURE__ */ jsx("span", { className: "admin-meta font-semibold mt-1", children: bar.day })
          ] }, i)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "p-6 sm:p-8 bg-brand-card border-brand-border rounded-xl shadow-none flex flex-col justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "admin-card-title uppercase mb-6", children: "Phần trăm thiết bị" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: deviceData.map((dev, i) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between admin-table-cell font-semibold", children: [
            /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub", children: dev.name }),
            /* @__PURE__ */ jsx("span", { children: dev.percent })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-brand-card-2 h-2 rounded-full overflow-hidden border border-brand-border", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-brand-gold h-full rounded-full",
              style: { width: dev.percent }
            }
          ) }),
          /* @__PURE__ */ jsxs("span", { className: "admin-meta block font-mono", children: [
            dev.count,
            " lượt truy cập"
          ] })
        ] }, i)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-brand-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h3", { className: "admin-card-title uppercase", children: "Tương tác chiến thuật thịnh hành (Meta Clicks)" }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-brand-gold/20 text-brand-gold bg-brand-gold/5", children: "SỐ LIỆU ĐỘI HÌNH" })
      ] }),
      /* @__PURE__ */ jsx(AdminTableScroll, { children: /* @__PURE__ */ jsxs(AdminTable, { minWidth: "700px", children: [
        /* @__PURE__ */ jsx(AdminThead, { sticky: false, children: /* @__PURE__ */ jsxs(AdminTr, { className: "hover:bg-transparent", children: [
          /* @__PURE__ */ jsx(AdminTh, { children: "Hạng" }),
          /* @__PURE__ */ jsx(AdminTh, { children: "Tên đội hình" }),
          /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Bậc đề xuất" }),
          /* @__PURE__ */ jsx(AdminTh, { className: "text-right", children: "Lượt tìm kiếm / click" }),
          /* @__PURE__ */ jsx(AdminTh, { className: "text-right", children: "Tỷ lệ thắng (Winrate)" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: popularMetaComps.map((comp, idx) => /* @__PURE__ */ jsxs(AdminTr, { children: [
          /* @__PURE__ */ jsx(AdminTd, { className: "font-mono font-bold text-brand-gold", children: idx + 1 }),
          /* @__PURE__ */ jsx(AdminTd, { className: "font-bold", children: comp.name }),
          /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx("span", { className: "w-7 h-7 inline-flex items-center justify-center font-bold text-xs bg-brand-red text-white rounded", children: comp.rating }) }),
          /* @__PURE__ */ jsx(AdminTd, { className: "text-right font-mono font-medium", children: comp.clicks }),
          /* @__PURE__ */ jsx(AdminTd, { className: "text-right font-mono font-bold text-brand-green", children: comp.winRate })
        ] }, idx)) })
      ] }) })
    ] })
  ] });
}
function meta$5() {
  return buildPageMeta(adminStaticMeta("/admin/bao-cao", "Báo cáo"));
}
const route51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminReportsPage,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const AdminSeoForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bS).then((m2) => ({ default: m2.AdminSeoForm }))
);
function SeoFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-12 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu SEO..." });
}
function AdminSEOPage() {
  const seoSettings = useSeoSettings();
  const [draft, setDraft] = React.useState(() => buildDefaultSeoDraft(seoSettings));
  const [isSaving, setIsSaving] = React.useState(false);
  const { successMessage, showSuccess } = useAdminSuccessToast();
  React.useEffect(() => {
    setDraft(buildDefaultSeoDraft(seoSettings));
  }, [seoSettings]);
  const handleSaveSEO = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveSeoSettings({
        gaId: draft.gaId,
        robotsTxt: draft.robots,
        jsonLd: draft.schemaJson,
        keywords: draft.keywords,
        pagesMeta: rowsToPagesMeta(draft.pagesMeta)
      });
      setIsSaving(false);
      showSuccess("Cấu hình SEO & Thẻ Meta đã được nén tối ưu và áp dụng thành công!");
    }, 1500);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        icon: Globe,
        title: "Tối ưu hóa SEO & Index Google",
        description: "Quản lý tiêu chuẩn thẻ meta, sơ đồ trang web sitemap, theo dõi cấu trúc JSON-LD và robots.txt.",
        children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleSaveSEO,
            disabled: isSaving,
            className: "gap-2 bg-gold-gradient text-black font-bold text-[14px] h-11 px-6 rounded-xl transition-all shadow-none",
            children: [
              isSaving ? /* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
              isSaving ? "Đang cập nhật..." : "Lưu tối ưu SEO"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" }),
    /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(SeoFormFallback, {}), children: /* @__PURE__ */ jsx(AdminSeoForm, { value: draft, onChange: setDraft }) })
  ] });
}
function meta$4() {
  return buildPageMeta(adminStaticMeta("/admin/seo", "SEO"));
}
const route52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminSEOPage,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const AdminSettingsForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bW).then((m2) => ({ default: m2.AdminSettingsForm }))
);
function SettingsFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-12 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu cài đặt..." });
}
function AdminSettingsPage() {
  const [settings, setSettings] = React.useState(loadSiteSettings);
  const [isSaving, setIsSaving] = React.useState(false);
  const { successMessage, showSuccess } = useAdminSuccessToast();
  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveSiteSettings(settings);
      setIsSaving(false);
      showSuccess("Cấu hình cài đặt hệ thống đã được lưu thành công!");
    }, 600);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        icon: Settings,
        title: "Cài đặt hệ thống",
        description: "Tinh chỉnh và quản lý cấu hình vận hành tổng thể dự án Website Auto Chess."
      }
    ),
    /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(SettingsFormFallback, {}), children: /* @__PURE__ */ jsx(AdminSettingsForm, { value: settings, onChange: setSettings }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Sliders, { className: "h-4 w-4 text-brand-gold" }),
              " Lưu Cấu Hình"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "admin-meta mb-6", children: "Mọi thiết lập thay đổi sẽ ảnh hưởng ngay lập tức đến cơ sở dữ liệu hiển thị, bài viết, meta, cách hoạt động của hệ thống tướng." })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleSaveSettings,
              disabled: isSaving,
              className: "w-full gap-2 bg-gold-gradient font-bold text-[13px] text-black h-11 rounded-xl shadow-none",
              children: isSaving ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }),
                " ĐANG LƯU..."
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
                " LƯU THAY ĐỔI"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 text-brand-gold" }),
            " Trực quan hệ thống"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center admin-table-cell", children: [
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub font-medium", children: "Bảo trì website" }),
              /* @__PURE__ */ jsx(Badge, { variant: settings.maintenance ? "danger" : "success", children: settings.maintenance ? "Bật" : "Tắt" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center admin-table-cell", children: [
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub font-medium", children: "Auto-Optimize DB" }),
              /* @__PURE__ */ jsx(Badge, { variant: "success", children: "Hoạt động" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center admin-table-cell", children: [
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub font-medium", children: "SSL/Cloudflare TLS" }),
              /* @__PURE__ */ jsx(Badge, { variant: "success", children: "Kích hoạt" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center admin-table-cell", children: [
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub font-medium", children: "Môi trường" }),
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-mono text-[11px] bg-brand-card-2 px-2 py-0.5 rounded border border-brand-border", children: "Production" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Database, { className: "h-4 w-4 text-brand-gold" }),
            " Database Status"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 admin-meta", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Dung lượng RAM:" }),
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-mono font-medium", children: "256MB / 512MB" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Bộ nhớ tệp cache:" }),
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-mono font-medium", children: "12.4 MB" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "CPU hiện tại:" }),
              /* @__PURE__ */ jsx("span", { className: "text-brand-text-main font-mono font-medium", children: "2.4%" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function meta$3() {
  return buildPageMeta(adminStaticMeta("/admin/cai-dat", "Cài đặt"));
}
const route53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminSettingsPage,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const AdminTeamForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bT).then((m2) => ({ default: m2.AdminTeamForm }))
);
function TeamFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-8 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu thành viên..." });
}
function AdminTeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái");
  const [newForm, setNewForm] = React.useState(EMPTY_TEAM_FORM);
  const [editForm, setEditForm] = React.useState(EMPTY_TEAM_FORM);
  const [detail, setDetail] = React.useState(null);
  const matchMember = React.useCallback(
    (m2, q) => {
      const query = q.toLowerCase();
      const matchesSearch = m2.name.toLowerCase().includes(query) || m2.role.toLowerCase().includes(query) || m2.bio.toLowerCase().includes(query);
      const matchesStatus = selectedStatus === "Tất cả trạng thái" || m2.status === selectedStatus;
      return matchesSearch && matchesStatus;
    },
    [selectedStatus]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize
  } = useAdminListPage({
    items: teamMembers,
    searchTerm,
    match: matchMember,
    resetDeps: [selectedStatus]
  });
  const handleCreate = () => {
    if (!newForm.name.trim()) return;
    const created = teamFromFormValue(newForm, nextNumericId(teamMembers));
    addTeamMember(created);
    setNewForm(EMPTY_TEAM_FORM);
    dialogs.closeAdd();
    showSuccess(`Đã thêm thành viên ${created.name}.`);
  };
  const handleUpdate = () => {
    if (!dialogs.editingItem || !editForm.name.trim()) return;
    updateTeamMember(dialogs.editingItem.id, teamPatchFromFormValue(editForm));
    dialogs.closeEdit();
    showSuccess(`Đã cập nhật ${editForm.name.trim()}.`);
  };
  const handleDelete = () => {
    if (!dialogs.deleteTarget) return;
    deleteTeamMember(dialogs.deleteTarget.id);
    dialogs.closeDelete();
    showSuccess(`Đã xóa ${dialogs.deleteTarget.name}.`);
  };
  const openEdit = (member2) => {
    setEditForm(teamFormFromMember(member2));
    dialogs.openEdit(member2);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AdminListShell,
      {
        header: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            AdminPageHeader,
            {
              icon: Users,
              title: "Quản lý đội ngũ",
              description: "Thành viên sáng lập và đội ngũ vận hành hiển thị trên trang Cộng đồng.",
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  onClick: () => {
                    setNewForm(EMPTY_TEAM_FORM);
                    dialogs.openAdd();
                  },
                  className: "gap-2 bg-gold-gradient text-black font-bold h-11 px-6 rounded-xl",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
                    " Thêm thành viên"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
        ] }),
        children: /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            toolbar: /* @__PURE__ */ jsx(
              AdminToolbar,
              {
                searchValue: searchTerm,
                onSearchChange: setSearchTerm,
                searchPlaceholder: "Tìm theo tên, vai trò...",
                children: /* @__PURE__ */ jsxs(Select, { value: selectedStatus, onValueChange: setSelectedStatus, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[160px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả trạng thái", children: "Mọi trạng thái" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Hiện", children: "Hiện" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Ẩn", children: "Ẩn" })
                  ] })
                ] })
              }
            ),
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredItems.length ? startIndex + 1 : 0,
                end: Math.min(startIndex + pageSize, filteredItems.length),
                total: filteredItems.length,
                label: "thành viên"
              }
            ),
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            isEmpty: paginatedItems.length === 0,
            emptyTitle: "Chưa có thành viên nào.",
            children: /* @__PURE__ */ jsxs(AdminTable, { children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { children: [
                /* @__PURE__ */ jsx(AdminTh, { children: "Thành viên" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Vai trò" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Thứ tự" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Trạng thái" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right", children: "Thao tác" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedItems.map((row) => /* @__PURE__ */ jsxs(AdminTr, { children: [
                /* @__PURE__ */ jsxs(AdminTd, { children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-brand-text-main", children: row.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub line-clamp-1 max-w-xs", children: row.bio })
                ] }),
                /* @__PURE__ */ jsx(AdminTd, { children: row.role }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: row.order }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx(Badge, { variant: row.status === "Hiện" ? "success" : "secondary", children: row.status }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
                  AdminRowActions,
                  {
                    onView: () => setDetail(row),
                    onEdit: () => openEdit(row),
                    onDelete: () => dialogs.openDelete(row)
                  }
                ) })
              ] }, row.id)) })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isAddOpen,
        onOpenChange: dialogs.setIsAddOpen,
        title: "Thêm thành viên",
        onSubmit: handleCreate,
        submitLabel: "Thêm",
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(TeamFormFallback, {}), children: /* @__PURE__ */ jsx(AdminTeamForm, { value: newForm, onChange: setNewForm }) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.closeEdit();
        },
        title: "Sửa thành viên",
        onSubmit: handleUpdate,
        submitLabel: "Cập nhật",
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(TeamFormFallback, {}), children: /* @__PURE__ */ jsx(AdminTeamForm, { value: editForm, onChange: setEditForm }) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDetailDialog,
      {
        open: !!detail,
        onOpenChange: (open) => !open && setDetail(null),
        title: (detail == null ? void 0 : detail.name) ?? "",
        footer: /* @__PURE__ */ jsx(Button, { onClick: () => setDetail(null), variant: "outline", className: "w-full", children: "Đóng" }),
        children: detail && /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Vai trò:" }),
            " ",
            detail.role
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Giới thiệu:" }),
            " ",
            detail.bio
          ] }),
          detail.socialUrl && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Link:" }),
            " ",
            detail.socialUrl
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.closeDelete();
        },
        title: "Xóa thành viên",
        description: dialogs.deleteTarget ? `Xóa "${dialogs.deleteTarget.name}"?` : "",
        onConfirm: handleDelete,
        confirmLabel: "Xóa"
      }
    )
  ] });
}
function meta$2() {
  return buildPageMeta(adminStaticMeta("/admin/doi-ngu", "Đội ngũ"));
}
const route54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminTeamPage,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const AdminChannelForm = React.lazy(
  () => import("./admin-ui-BjWfzkMI.js").then((n) => n.bU).then((m2) => ({ default: m2.AdminChannelForm }))
);
function ChannelFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-8 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu kênh..." });
}
function AdminChannelsPage() {
  const { communityChannels, addCommunityChannel, updateCommunityChannel, deleteCommunityChannel } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedPlatform, setSelectedPlatform] = React.useState("Tất cả nền tảng");
  const [newForm, setNewForm] = React.useState(EMPTY_CHANNEL_FORM);
  const [editForm, setEditForm] = React.useState(EMPTY_CHANNEL_FORM);
  const [detail, setDetail] = React.useState(null);
  const matchChannel = React.useCallback(
    (c, q) => {
      const query = q.toLowerCase();
      const matchesSearch = c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query) || (c.highlight ?? "").toLowerCase().includes(query);
      const matchesPlatform = selectedPlatform === "Tất cả nền tảng" || c.platform === selectedPlatform;
      return matchesSearch && matchesPlatform;
    },
    [selectedPlatform]
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize
  } = useAdminListPage({
    items: communityChannels,
    searchTerm,
    match: matchChannel,
    resetDeps: [selectedPlatform]
  });
  const handleCreate = () => {
    if (!newForm.name.trim() || !newForm.url.trim()) return;
    const created = channelFromFormValue(newForm, nextNumericId(communityChannels));
    addCommunityChannel(created);
    setNewForm(EMPTY_CHANNEL_FORM);
    dialogs.closeAdd();
    showSuccess(`Đã thêm kênh ${created.name}.`);
  };
  const handleUpdate = () => {
    if (!dialogs.editingItem || !editForm.name.trim()) return;
    updateCommunityChannel(dialogs.editingItem.id, channelPatchFromFormValue(editForm));
    dialogs.closeEdit();
    showSuccess(`Đã cập nhật ${editForm.name.trim()}.`);
  };
  const handleDelete = () => {
    if (!dialogs.deleteTarget) return;
    deleteCommunityChannel(dialogs.deleteTarget.id);
    dialogs.closeDelete();
    showSuccess(`Đã xóa ${dialogs.deleteTarget.name}.`);
  };
  const openEdit = (channel) => {
    setEditForm(channelFormFromRecord(channel));
    dialogs.openEdit(channel);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AdminListShell,
      {
        header: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            AdminPageHeader,
            {
              icon: Share2,
              title: "Kênh cộng đồng",
              description: "Quản lý YouTube, TikTok, Facebook, Discord và các kênh liên quan trên trang Cộng đồng.",
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  onClick: () => {
                    setNewForm(EMPTY_CHANNEL_FORM);
                    dialogs.openAdd();
                  },
                  className: "gap-2 bg-gold-gradient text-black font-bold h-11 px-6 rounded-xl",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
                    " Thêm kênh"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" })
        ] }),
        children: /* @__PURE__ */ jsx(
          AdminDataTable,
          {
            fillHeight: true,
            toolbar: /* @__PURE__ */ jsx(
              AdminToolbar,
              {
                searchValue: searchTerm,
                onSearchChange: setSearchTerm,
                searchPlaceholder: "Tìm theo tên, mô tả...",
                children: /* @__PURE__ */ jsxs(Select, { value: selectedPlatform, onValueChange: setSelectedPlatform, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "min-w-[160px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "Tất cả nền tảng", children: "Mọi nền tảng" }),
                    CHANNEL_PLATFORMS.map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p))
                  ] })
                ] })
              }
            ),
            footer: /* @__PURE__ */ jsx(
              AdminTableFooterText,
              {
                start: filteredItems.length ? startIndex + 1 : 0,
                end: Math.min(startIndex + pageSize, filteredItems.length),
                total: filteredItems.length,
                label: "kênh"
              }
            ),
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            isEmpty: paginatedItems.length === 0,
            emptyTitle: "Chưa có kênh nào.",
            children: /* @__PURE__ */ jsxs(AdminTable, { children: [
              /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { children: [
                /* @__PURE__ */ jsx(AdminTh, { children: "Kênh" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Nền tảng" }),
                /* @__PURE__ */ jsx(AdminTh, { children: "Highlight" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Thứ tự" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-center", children: "Trạng thái" }),
                /* @__PURE__ */ jsx(AdminTh, { className: "text-right", children: "Thao tác" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: paginatedItems.map((row) => /* @__PURE__ */ jsxs(AdminTr, { children: [
                /* @__PURE__ */ jsxs(AdminTd, { children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-brand-text-main", children: row.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-[11px] text-brand-text-sub line-clamp-1 max-w-xs", children: row.description })
                ] }),
                /* @__PURE__ */ jsx(AdminTd, { className: "uppercase text-[11px]", children: row.platform }),
                /* @__PURE__ */ jsx(AdminTd, { children: row.highlight || "—" }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: row.order }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx(Badge, { variant: row.status === "Hiện" ? "success" : "secondary", children: row.status }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
                  AdminRowActions,
                  {
                    onView: () => setDetail(row),
                    onEdit: () => openEdit(row),
                    onDelete: () => dialogs.openDelete(row)
                  }
                ) })
              ] }, row.id)) })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isAddOpen,
        onOpenChange: dialogs.setIsAddOpen,
        title: "Thêm kênh",
        onSubmit: handleCreate,
        submitLabel: "Thêm",
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(ChannelFormFallback, {}), children: /* @__PURE__ */ jsx(AdminChannelForm, { value: newForm, onChange: setNewForm }) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.closeEdit();
        },
        title: "Sửa kênh",
        onSubmit: handleUpdate,
        submitLabel: "Cập nhật",
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(ChannelFormFallback, {}), children: /* @__PURE__ */ jsx(AdminChannelForm, { value: editForm, onChange: setEditForm }) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDetailDialog,
      {
        open: !!detail,
        onOpenChange: (open) => !open && setDetail(null),
        title: (detail == null ? void 0 : detail.name) ?? "",
        footer: /* @__PURE__ */ jsx(Button, { onClick: () => setDetail(null), variant: "outline", className: "w-full", children: "Đóng" }),
        children: detail && /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Nền tảng:" }),
            " ",
            detail.platform
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "URL:" }),
            " ",
            detail.url
          ] }),
          detail.highlight && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Highlight:" }),
            " ",
            detail.highlight
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Mô tả:" }),
            " ",
            detail.description
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.closeDelete();
        },
        title: "Xóa kênh",
        description: dialogs.deleteTarget ? `Xóa "${dialogs.deleteTarget.name}"?` : "",
        onConfirm: handleDelete,
        confirmLabel: "Xóa"
      }
    )
  ] });
}
function meta$1() {
  return buildPageMeta(adminStaticMeta("/admin/kenh-cong-dong", "Kênh cộng đồng"));
}
const route55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminChannelsPage,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function AdminNotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-8", children: [
    /* @__PURE__ */ jsx(
      AdminPageHeader,
      {
        title: "Không tìm thấy trang",
        description: "Đường dẫn admin không tồn tại hoặc đã bị gỡ.",
        breadcrumb: "Admin / 404"
      }
    ),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-10 text-center max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[48px] font-bold text-brand-gold mb-2", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "text-[14px] text-brand-text-sub mb-6", children: "Trang quản trị bạn tìm không có trong hệ thống." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gold-gradient text-black font-semibold rounded-xl h-11 px-6", children: /* @__PURE__ */ jsxs(Link, { to: "/admin", children: [
        /* @__PURE__ */ jsx(LayoutDashboard, { className: "h-4 w-4 mr-2 inline" }),
        "Về tổng quan admin"
      ] }) })
    ] })
  ] });
}
function meta() {
  return buildPageMeta(adminStaticMeta("/admin/not-found", "Không tìm thấy"));
}
const route56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminNotFoundPage,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const catchAll = UNSAFE_withComponentProps(function CatchAllRedirect() {
  return /* @__PURE__ */ jsx(Navigate, {
    to: "/",
    replace: true
  });
});
const route57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: catchAll
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-lrV6gAWf.js", "imports": ["/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/index-DdRu_e2_.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": true, "module": "/assets/root-Dr0IJuDK.js", "imports": ["/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/index-DdRu_e2_.js", "/assets/AuthContext-et43Rjg-.js", "/assets/auth-bridge-Jk1EmRGN.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/admin-store-BJjhYNnt.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/robots[.]txt": { "id": "routes/robots[.]txt", "parentId": "root", "path": "robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": false, "hasErrorBoundary": false, "module": "/assets/robots_._txt-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sitemap[.]xml": { "id": "routes/sitemap[.]xml", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": false, "hasErrorBoundary": false, "module": "/assets/sitemap_._xml-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/public-layout": { "id": "routes/public-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/public-layout-pDiqvlxs.js", "imports": ["/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/AuthContext-et43Rjg-.js", "/assets/nav-BV3OhG0N.js", "/assets/MobileNav-H1JWhsTO.js", "/assets/index-DdRu_e2_.js", "/assets/icons-Bu5SZmfL.js", "/assets/PageContainer-SiPE-2oK.js", "/assets/useSiteSettings-3xoS8guT.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/auth-bridge-Jk1EmRGN.js", "/assets/admin-store-BJjhYNnt.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/home": { "id": "routes/_pages/home", "parentId": "routes/public-layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-CUUWAdcB.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/index-DdRu_e2_.js", "/assets/CompHeroChip-BdDeLA5W.js", "/assets/CompSynergyPills-klmCSVvq.js", "/assets/tier-utils-BQlhh59W.js", "/assets/NewsPostListItem-DufwOSeE.js", "/assets/useFavorites-BtwpeKrO.js", "/assets/CommunityPostCard-NRiR4ln3.js", "/assets/cost-colors-BAYwJHGn.js", "/assets/useSiteSettings-3xoS8guT.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/format-GDL-NWTG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/doi-hinh": { "id": "routes/_pages/doi-hinh", "parentId": "routes/public-layout", "path": "doi-hinh", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/doi-hinh-BN7g3X7c.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/index-DdRu_e2_.js", "/assets/useFavorites-BtwpeKrO.js", "/assets/PageHeader-CxvlHerv.js", "/assets/CompareTray-DGfZYTl3.js", "/assets/useCompareSelection-CNHfhb-q.js", "/assets/icons-Bu5SZmfL.js", "/assets/FilterToolbar-Pbtaeife.js", "/assets/UnderlineTabs-D5jSa84G.js", "/assets/CompListCard-CrKWXv9P.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/HeroIcon-BxHdhVFS.js", "/assets/tier-utils-BQlhh59W.js", "/assets/CompHeroChip-BdDeLA5W.js", "/assets/cost-colors-BAYwJHGn.js", "/assets/CompSynergyPills-klmCSVvq.js", "/assets/format-GDL-NWTG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/doi-hinh.$id": { "id": "routes/_pages/doi-hinh.$id", "parentId": "routes/public-layout", "path": "doi-hinh/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/doi-hinh._id-g5bQzXNv.js", "imports": ["/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/BackButton-ycMMGmZu.js", "/assets/useFavorites-BtwpeKrO.js", "/assets/DetailBreadcrumb-DN42OKB9.js", "/assets/CompHeroChip-BdDeLA5W.js", "/assets/cost-colors-BAYwJHGn.js", "/assets/tier-utils-BQlhh59W.js", "/assets/meta-h05IHhAv.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/toc-he": { "id": "routes/_pages/toc-he", "parentId": "routes/public-layout", "path": "toc-he", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/toc-he-DtvCudMp.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/PageHeader-CxvlHerv.js", "/assets/icons-Bu5SZmfL.js", "/assets/FilterToolbar-Pbtaeife.js", "/assets/useFilterParams-BW9oQIxd.js", "/assets/TraitTypeBadge-8qpqZU2O.js", "/assets/FilterResultMeta-D475RkDw.js", "/assets/FilterSelect-CYvquhln.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/toc-he.$kind.$id": { "id": "routes/_pages/toc-he.$kind.$id", "parentId": "routes/public-layout", "path": "toc-he/:kind/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/toc-he._kind._id-CVMCNMlz.js", "imports": ["/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/DetailBreadcrumb-DN42OKB9.js", "/assets/BackButton-ycMMGmZu.js", "/assets/TraitTypeBadge-8qpqZU2O.js", "/assets/cost-colors-BAYwJHGn.js", "/assets/meta-h05IHhAv.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_redirects/legacy-toc-list": { "id": "routes/_redirects/legacy-toc-list", "parentId": "routes/public-layout", "path": "toc", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legacy-toc-list-DeEMj4UB.js", "imports": ["/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_redirects/legacy-toc-detail": { "id": "routes/_redirects/legacy-toc-detail", "parentId": "routes/public-layout", "path": "toc/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legacy-toc-detail-Besptu8y.js", "imports": ["/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_redirects/legacy-he-list": { "id": "routes/_redirects/legacy-he-list", "parentId": "routes/public-layout", "path": "he", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legacy-he-list-CfUVT27Q.js", "imports": ["/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_redirects/legacy-he-detail": { "id": "routes/_redirects/legacy-he-detail", "parentId": "routes/public-layout", "path": "he/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legacy-he-detail-CK2OP_co.js", "imports": ["/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/tuong": { "id": "routes/_pages/tuong", "parentId": "routes/public-layout", "path": "tuong", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/tuong-Bt9JY8PV.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/useFavorites-BtwpeKrO.js", "/assets/PageHeader-CxvlHerv.js", "/assets/CompareTray-DGfZYTl3.js", "/assets/useCompareSelection-CNHfhb-q.js", "/assets/icons-Bu5SZmfL.js", "/assets/FilterToolbar-Pbtaeife.js", "/assets/useFilterParams-BW9oQIxd.js", "/assets/cost-colors-BAYwJHGn.js", "/assets/HeroNewBadge-BFIu4Hd-.js", "/assets/FilterResultMeta-D475RkDw.js", "/assets/FilterSelect-CYvquhln.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/HeroIcon-BxHdhVFS.js", "/assets/tier-utils-BQlhh59W.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/tuong.$id": { "id": "routes/_pages/tuong.$id", "parentId": "routes/public-layout", "path": "tuong/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/tuong._id-dNNcJJsO.js", "imports": ["/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/DetailBreadcrumb-DN42OKB9.js", "/assets/cost-colors-BAYwJHGn.js", "/assets/HeroIcon-BxHdhVFS.js", "/assets/HeroNewBadge-BFIu4Hd-.js", "/assets/item-utils-D6Q0XDIg.js", "/assets/useFavorites-BtwpeKrO.js", "/assets/meta-h05IHhAv.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/trang-bi": { "id": "routes/_pages/trang-bi", "parentId": "routes/public-layout", "path": "trang-bi", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/trang-bi-BtSzAq6o.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/item-utils-D6Q0XDIg.js", "/assets/PageHeader-CxvlHerv.js", "/assets/icons-Bu5SZmfL.js", "/assets/FilterToolbar-Pbtaeife.js", "/assets/useFilterParams-BW9oQIxd.js", "/assets/FilterResultMeta-D475RkDw.js", "/assets/FilterSelect-CYvquhln.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/trang-bi.$id": { "id": "routes/_pages/trang-bi.$id", "parentId": "routes/public-layout", "path": "trang-bi/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/trang-bi._id-CZuLZopk.js", "imports": ["/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/DetailBreadcrumb-DN42OKB9.js", "/assets/BackButton-ycMMGmZu.js", "/assets/item-utils-D6Q0XDIg.js", "/assets/cost-colors-BAYwJHGn.js", "/assets/meta-h05IHhAv.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/di-vat": { "id": "routes/_pages/di-vat", "parentId": "routes/public-layout", "path": "di-vat", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/di-vat-Be2-se3R.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/PageHeader-CxvlHerv.js", "/assets/icons-Bu5SZmfL.js", "/assets/FilterToolbar-Pbtaeife.js", "/assets/useFilterParams-BW9oQIxd.js", "/assets/FilterResultMeta-D475RkDw.js", "/assets/FilterSelect-CYvquhln.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/di-vat.$id": { "id": "routes/_pages/di-vat.$id", "parentId": "routes/public-layout", "path": "di-vat/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/di-vat._id-m0cj16u3.js", "imports": ["/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/DetailBreadcrumb-DN42OKB9.js", "/assets/BackButton-ycMMGmZu.js", "/assets/meta-h05IHhAv.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/cong-cu": { "id": "routes/_pages/cong-cu", "parentId": "routes/public-layout", "path": "cong-cu/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/cong-cu-BlM9c2ZB.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/nav-BV3OhG0N.js", "/assets/icons-Bu5SZmfL.js", "/assets/PageHeader-CxvlHerv.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/tin-tuc": { "id": "routes/_pages/tin-tuc", "parentId": "routes/public-layout", "path": "tin-tuc", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/tin-tuc-BpSfrsCM.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/index-DdRu_e2_.js", "/assets/PageHeader-CxvlHerv.js", "/assets/FilterToolbar-Pbtaeife.js", "/assets/format-GDL-NWTG.js", "/assets/PostCardThumb-D_EGP_0N.js", "/assets/NewsPostListItem-DufwOSeE.js", "/assets/icons-Bu5SZmfL.js", "/assets/useFilterParams-BW9oQIxd.js", "/assets/FilterResultMeta-D475RkDw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/tin-tuc.$id": { "id": "routes/_pages/tin-tuc.$id", "parentId": "routes/public-layout", "path": "tin-tuc/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/tin-tuc._id-DZH99hGn.js", "imports": ["/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/ArticleProse-Dd5ItYAN.js", "/assets/PostCardThumb-D_EGP_0N.js", "/assets/BackButton-ycMMGmZu.js", "/assets/meta-h05IHhAv.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/bang-xep-hang": { "id": "routes/_pages/bang-xep-hang", "parentId": "routes/public-layout", "path": "bang-xep-hang", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/bang-xep-hang-BPSn5AwP.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/icons-Bu5SZmfL.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/cong-dong": { "id": "routes/_pages/cong-dong", "parentId": "routes/public-layout", "path": "cong-dong", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/cong-dong-D6afgC_T.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/PageHeader-CxvlHerv.js", "/assets/icons-Bu5SZmfL.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_redirects/legacy-community-detail": { "id": "routes/_redirects/legacy-community-detail", "parentId": "routes/public-layout", "path": "cong-dong/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/legacy-community-detail-UvrlufpO.js", "imports": ["/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/thao-luan": { "id": "routes/_pages/thao-luan", "parentId": "routes/public-layout", "path": "thao-luan", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/thao-luan-CxrZcnit.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/PageHeader-CxvlHerv.js", "/assets/FilterToolbar-Pbtaeife.js", "/assets/UnderlineTabs-D5jSa84G.js", "/assets/CommunityPostCard-NRiR4ln3.js", "/assets/icons-Bu5SZmfL.js", "/assets/useFilterParams-BW9oQIxd.js", "/assets/community-utils-CpR-dqX_.js", "/assets/FilterResultMeta-D475RkDw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/thao-luan.$id": { "id": "routes/_pages/thao-luan.$id", "parentId": "routes/public-layout", "path": "thao-luan/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/thao-luan._id-Bsuc2_Lx.js", "imports": ["/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/DetailBreadcrumb-DN42OKB9.js", "/assets/community-utils-CpR-dqX_.js", "/assets/ImageAttachmentManager-DV_DlgpC.js", "/assets/meta-h05IHhAv.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/dang-bai": { "id": "routes/_pages/dang-bai", "parentId": "routes/public-layout", "path": "dang-bai", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/dang-bai-B6u8dblS.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/AuthContext-et43Rjg-.js", "/assets/PageContainer-SiPE-2oK.js", "/assets/ImageAttachmentManager-DV_DlgpC.js", "/assets/CommunityPostCard-NRiR4ln3.js", "/assets/community-utils-CpR-dqX_.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/auth-bridge-Jk1EmRGN.js", "/assets/admin-store-BJjhYNnt.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/ho-so": { "id": "routes/_pages/ho-so", "parentId": "routes/public-layout", "path": "ho-so", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/ho-so-CJ6BTR3H.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/AuthContext-et43Rjg-.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/index-DdRu_e2_.js", "/assets/useFavorites-BtwpeKrO.js", "/assets/PageHeader-CxvlHerv.js", "/assets/UnderlineTabs-D5jSa84G.js", "/assets/CompListCard-CrKWXv9P.js", "/assets/cost-colors-BAYwJHGn.js", "/assets/auth-bridge-Jk1EmRGN.js", "/assets/admin-store-BJjhYNnt.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/CompHeroChip-BdDeLA5W.js", "/assets/CompSynergyPills-klmCSVvq.js", "/assets/format-GDL-NWTG.js", "/assets/tier-utils-BQlhh59W.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin-layout": { "id": "routes/admin-layout", "parentId": "root", "path": "admin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-layout-CVKXSWQ1.js", "imports": ["/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/AuthContext-et43Rjg-.js", "/assets/MobileNav-H1JWhsTO.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/auth-bridge-Jk1EmRGN.js", "/assets/admin-store-BJjhYNnt.js", "/assets/nav-BV3OhG0N.js", "/assets/icons-Bu5SZmfL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-index": { "id": "routes/_pages/admin-index", "parentId": "routes/admin-layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-index-CuJbSOWi.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/useSiteSettings-3xoS8guT.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-nguoi-dung": { "id": "routes/_pages/admin-nguoi-dung", "parentId": "routes/admin-layout", "path": "nguoi-dung", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-nguoi-dung-Da-pYAsQ.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-store-BJjhYNnt.js", "/assets/auth-bridge-Jk1EmRGN.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-trang-bi": { "id": "routes/_pages/admin-trang-bi", "parentId": "routes/admin-layout", "path": "trang-bi", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-trang-bi-gAVCTfoj.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-tuong-them": { "id": "routes/_pages/admin-tuong-them", "parentId": "routes/admin-layout", "path": "tuong/them", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-tuong-them-DSWHxjgd.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/AdminHeroEditorPage-Cg8t2_PZ.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/jsonld-4_Wdl9mw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-tuong-sua": { "id": "routes/_pages/admin-tuong-sua", "parentId": "routes/admin-layout", "path": "tuong/:id/sua", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-tuong-sua-PauYegSr.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/AdminHeroEditorPage-Cg8t2_PZ.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/jsonld-4_Wdl9mw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-tuong": { "id": "routes/_pages/admin-tuong", "parentId": "routes/admin-layout", "path": "tuong", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-tuong-CJS4YNqL.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-doi-hinh": { "id": "routes/_pages/admin-doi-hinh", "parentId": "routes/admin-layout", "path": "doi-hinh", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-doi-hinh-CfPQV9pW.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-toc-he": { "id": "routes/_pages/admin-toc-he", "parentId": "routes/admin-layout", "path": "toc-he", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-toc-he-D_9uHYia.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_redirects/admin-toc": { "id": "routes/_redirects/admin-toc", "parentId": "routes/admin-layout", "path": "toc", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-toc-DET7VTQZ.js", "imports": ["/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_redirects/admin-he": { "id": "routes/_redirects/admin-he", "parentId": "routes/admin-layout", "path": "he", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-he-CjLbYRG1.js", "imports": ["/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-bai-viet": { "id": "routes/_pages/admin-bai-viet", "parentId": "routes/admin-layout", "path": "bai-viet", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-bai-viet-Bly1L4nk.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-bai-viet-them": { "id": "routes/_pages/admin-bai-viet-them", "parentId": "routes/admin-layout", "path": "bai-viet/them", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-bai-viet-them-CW7bk07j.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/PostEditorPage-D8JoxDPs.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/AuthContext-et43Rjg-.js", "/assets/auth-bridge-Jk1EmRGN.js", "/assets/admin-store-BJjhYNnt.js", "/assets/PageContainer-SiPE-2oK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-bai-viet-sua": { "id": "routes/_pages/admin-bai-viet-sua", "parentId": "routes/admin-layout", "path": "bai-viet/:id/sua", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-bai-viet-sua-BSshX4Rd.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/PostEditorPage-D8JoxDPs.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/AuthContext-et43Rjg-.js", "/assets/auth-bridge-Jk1EmRGN.js", "/assets/admin-store-BJjhYNnt.js", "/assets/PageContainer-SiPE-2oK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-banners": { "id": "routes/_pages/admin-banners", "parentId": "routes/admin-layout", "path": "banners", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-banners-qncq6nRy.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-di-vat": { "id": "routes/_pages/admin-di-vat", "parentId": "routes/admin-layout", "path": "di-vat", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-di-vat-UQpox10o.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-vai-tro": { "id": "routes/_pages/admin-vai-tro", "parentId": "routes/admin-layout", "path": "vai-tro", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-vai-tro-B0oNqTeL.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/admin-store-BJjhYNnt.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-binh-luan": { "id": "routes/_pages/admin-binh-luan", "parentId": "routes/admin-layout", "path": "binh-luan", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-binh-luan-CRtqHk7w.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-bang-xep-hang": { "id": "routes/_pages/admin-bang-xep-hang", "parentId": "routes/admin-layout", "path": "bang-xep-hang", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-bang-xep-hang-DupU5TeF.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-tin-tuc": { "id": "routes/_pages/admin-tin-tuc", "parentId": "routes/admin-layout", "path": "tin-tuc", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-tin-tuc-DNs0Ksmb.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-su-kien": { "id": "routes/_pages/admin-su-kien", "parentId": "routes/admin-layout", "path": "su-kien", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-su-kien-Uhl2groI.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-media": { "id": "routes/_pages/admin-media", "parentId": "routes/admin-layout", "path": "media", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-media-FgWF9reS.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-bao-cao": { "id": "routes/_pages/admin-bao-cao", "parentId": "routes/admin-layout", "path": "bao-cao", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-bao-cao-BkdWzQGR.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-seo": { "id": "routes/_pages/admin-seo", "parentId": "routes/admin-layout", "path": "seo", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-seo-DV5NQxRC.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/useSiteSettings-3xoS8guT.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-cai-dat": { "id": "routes/_pages/admin-cai-dat", "parentId": "routes/admin-layout", "path": "cai-dat", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-cai-dat-CrfelN0n.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/useSiteSettings-3xoS8guT.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-doi-ngu": { "id": "routes/_pages/admin-doi-ngu", "parentId": "routes/admin-layout", "path": "doi-ngu", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-doi-ngu-BNK5ttBb.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-kenh-cong-dong": { "id": "routes/_pages/admin-kenh-cong-dong", "parentId": "routes/admin-layout", "path": "kenh-cong-dong", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-kenh-cong-dong-Ckb6_pfs.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_pages/admin-not-found": { "id": "routes/_pages/admin-not-found", "parentId": "routes/admin-layout", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/admin-not-found-BkwMfcFK.js", "imports": ["/assets/meta-h05IHhAv.js", "/assets/loaders-CUpf1hSc.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/admin-ui-B4bKXOJP.js", "/assets/jsonld-4_Wdl9mw.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_redirects/catch-all": { "id": "routes/_redirects/catch-all", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/catch-all-PJq4rH__.js", "imports": ["/assets/admin-ui-B4bKXOJP.js", "/assets/motion-vendor-BB1hHZ5s.js", "/assets/radix-vendor-BX0Vk7f4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-44383adf.js", "version": "44383adf", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "v8_passThroughRequests": false, "v8_trailingSlashAwareDataRequests": false, "unstable_previewServerPrerendering": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/robots[.]txt": {
    id: "routes/robots[.]txt",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/sitemap[.]xml": {
    id: "routes/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/public-layout": {
    id: "routes/public-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_pages/home": {
    id: "routes/_pages/home",
    parentId: "routes/public-layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_pages/doi-hinh": {
    id: "routes/_pages/doi-hinh",
    parentId: "routes/public-layout",
    path: "doi-hinh",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_pages/doi-hinh.$id": {
    id: "routes/_pages/doi-hinh.$id",
    parentId: "routes/public-layout",
    path: "doi-hinh/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_pages/toc-he": {
    id: "routes/_pages/toc-he",
    parentId: "routes/public-layout",
    path: "toc-he",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_pages/toc-he.$kind.$id": {
    id: "routes/_pages/toc-he.$kind.$id",
    parentId: "routes/public-layout",
    path: "toc-he/:kind/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_redirects/legacy-toc-list": {
    id: "routes/_redirects/legacy-toc-list",
    parentId: "routes/public-layout",
    path: "toc",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_redirects/legacy-toc-detail": {
    id: "routes/_redirects/legacy-toc-detail",
    parentId: "routes/public-layout",
    path: "toc/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_redirects/legacy-he-list": {
    id: "routes/_redirects/legacy-he-list",
    parentId: "routes/public-layout",
    path: "he",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/_redirects/legacy-he-detail": {
    id: "routes/_redirects/legacy-he-detail",
    parentId: "routes/public-layout",
    path: "he/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_pages/tuong": {
    id: "routes/_pages/tuong",
    parentId: "routes/public-layout",
    path: "tuong",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/_pages/tuong.$id": {
    id: "routes/_pages/tuong.$id",
    parentId: "routes/public-layout",
    path: "tuong/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/_pages/trang-bi": {
    id: "routes/_pages/trang-bi",
    parentId: "routes/public-layout",
    path: "trang-bi",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_pages/trang-bi.$id": {
    id: "routes/_pages/trang-bi.$id",
    parentId: "routes/public-layout",
    path: "trang-bi/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/_pages/di-vat": {
    id: "routes/_pages/di-vat",
    parentId: "routes/public-layout",
    path: "di-vat",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/_pages/di-vat.$id": {
    id: "routes/_pages/di-vat.$id",
    parentId: "routes/public-layout",
    path: "di-vat/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/_pages/cong-cu": {
    id: "routes/_pages/cong-cu",
    parentId: "routes/public-layout",
    path: "cong-cu/*",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/_pages/tin-tuc": {
    id: "routes/_pages/tin-tuc",
    parentId: "routes/public-layout",
    path: "tin-tuc",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/_pages/tin-tuc.$id": {
    id: "routes/_pages/tin-tuc.$id",
    parentId: "routes/public-layout",
    path: "tin-tuc/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/_pages/bang-xep-hang": {
    id: "routes/_pages/bang-xep-hang",
    parentId: "routes/public-layout",
    path: "bang-xep-hang",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/_pages/cong-dong": {
    id: "routes/_pages/cong-dong",
    parentId: "routes/public-layout",
    path: "cong-dong",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/_redirects/legacy-community-detail": {
    id: "routes/_redirects/legacy-community-detail",
    parentId: "routes/public-layout",
    path: "cong-dong/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/_pages/thao-luan": {
    id: "routes/_pages/thao-luan",
    parentId: "routes/public-layout",
    path: "thao-luan",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/_pages/thao-luan.$id": {
    id: "routes/_pages/thao-luan.$id",
    parentId: "routes/public-layout",
    path: "thao-luan/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "routes/_pages/dang-bai": {
    id: "routes/_pages/dang-bai",
    parentId: "routes/public-layout",
    path: "dang-bai",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/_pages/ho-so": {
    id: "routes/_pages/ho-so",
    parentId: "routes/public-layout",
    path: "ho-so",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "routes/admin-layout": {
    id: "routes/admin-layout",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  },
  "routes/_pages/admin-index": {
    id: "routes/_pages/admin-index",
    parentId: "routes/admin-layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route30
  },
  "routes/_pages/admin-nguoi-dung": {
    id: "routes/_pages/admin-nguoi-dung",
    parentId: "routes/admin-layout",
    path: "nguoi-dung",
    index: void 0,
    caseSensitive: void 0,
    module: route31
  },
  "routes/_pages/admin-trang-bi": {
    id: "routes/_pages/admin-trang-bi",
    parentId: "routes/admin-layout",
    path: "trang-bi",
    index: void 0,
    caseSensitive: void 0,
    module: route32
  },
  "routes/_pages/admin-tuong-them": {
    id: "routes/_pages/admin-tuong-them",
    parentId: "routes/admin-layout",
    path: "tuong/them",
    index: void 0,
    caseSensitive: void 0,
    module: route33
  },
  "routes/_pages/admin-tuong-sua": {
    id: "routes/_pages/admin-tuong-sua",
    parentId: "routes/admin-layout",
    path: "tuong/:id/sua",
    index: void 0,
    caseSensitive: void 0,
    module: route34
  },
  "routes/_pages/admin-tuong": {
    id: "routes/_pages/admin-tuong",
    parentId: "routes/admin-layout",
    path: "tuong",
    index: void 0,
    caseSensitive: void 0,
    module: route35
  },
  "routes/_pages/admin-doi-hinh": {
    id: "routes/_pages/admin-doi-hinh",
    parentId: "routes/admin-layout",
    path: "doi-hinh",
    index: void 0,
    caseSensitive: void 0,
    module: route36
  },
  "routes/_pages/admin-toc-he": {
    id: "routes/_pages/admin-toc-he",
    parentId: "routes/admin-layout",
    path: "toc-he",
    index: void 0,
    caseSensitive: void 0,
    module: route37
  },
  "routes/_redirects/admin-toc": {
    id: "routes/_redirects/admin-toc",
    parentId: "routes/admin-layout",
    path: "toc",
    index: void 0,
    caseSensitive: void 0,
    module: route38
  },
  "routes/_redirects/admin-he": {
    id: "routes/_redirects/admin-he",
    parentId: "routes/admin-layout",
    path: "he",
    index: void 0,
    caseSensitive: void 0,
    module: route39
  },
  "routes/_pages/admin-bai-viet": {
    id: "routes/_pages/admin-bai-viet",
    parentId: "routes/admin-layout",
    path: "bai-viet",
    index: void 0,
    caseSensitive: void 0,
    module: route40
  },
  "routes/_pages/admin-bai-viet-them": {
    id: "routes/_pages/admin-bai-viet-them",
    parentId: "routes/admin-layout",
    path: "bai-viet/them",
    index: void 0,
    caseSensitive: void 0,
    module: route41
  },
  "routes/_pages/admin-bai-viet-sua": {
    id: "routes/_pages/admin-bai-viet-sua",
    parentId: "routes/admin-layout",
    path: "bai-viet/:id/sua",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "routes/_pages/admin-banners": {
    id: "routes/_pages/admin-banners",
    parentId: "routes/admin-layout",
    path: "banners",
    index: void 0,
    caseSensitive: void 0,
    module: route43
  },
  "routes/_pages/admin-di-vat": {
    id: "routes/_pages/admin-di-vat",
    parentId: "routes/admin-layout",
    path: "di-vat",
    index: void 0,
    caseSensitive: void 0,
    module: route44
  },
  "routes/_pages/admin-vai-tro": {
    id: "routes/_pages/admin-vai-tro",
    parentId: "routes/admin-layout",
    path: "vai-tro",
    index: void 0,
    caseSensitive: void 0,
    module: route45
  },
  "routes/_pages/admin-binh-luan": {
    id: "routes/_pages/admin-binh-luan",
    parentId: "routes/admin-layout",
    path: "binh-luan",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "routes/_pages/admin-bang-xep-hang": {
    id: "routes/_pages/admin-bang-xep-hang",
    parentId: "routes/admin-layout",
    path: "bang-xep-hang",
    index: void 0,
    caseSensitive: void 0,
    module: route47
  },
  "routes/_pages/admin-tin-tuc": {
    id: "routes/_pages/admin-tin-tuc",
    parentId: "routes/admin-layout",
    path: "tin-tuc",
    index: void 0,
    caseSensitive: void 0,
    module: route48
  },
  "routes/_pages/admin-su-kien": {
    id: "routes/_pages/admin-su-kien",
    parentId: "routes/admin-layout",
    path: "su-kien",
    index: void 0,
    caseSensitive: void 0,
    module: route49
  },
  "routes/_pages/admin-media": {
    id: "routes/_pages/admin-media",
    parentId: "routes/admin-layout",
    path: "media",
    index: void 0,
    caseSensitive: void 0,
    module: route50
  },
  "routes/_pages/admin-bao-cao": {
    id: "routes/_pages/admin-bao-cao",
    parentId: "routes/admin-layout",
    path: "bao-cao",
    index: void 0,
    caseSensitive: void 0,
    module: route51
  },
  "routes/_pages/admin-seo": {
    id: "routes/_pages/admin-seo",
    parentId: "routes/admin-layout",
    path: "seo",
    index: void 0,
    caseSensitive: void 0,
    module: route52
  },
  "routes/_pages/admin-cai-dat": {
    id: "routes/_pages/admin-cai-dat",
    parentId: "routes/admin-layout",
    path: "cai-dat",
    index: void 0,
    caseSensitive: void 0,
    module: route53
  },
  "routes/_pages/admin-doi-ngu": {
    id: "routes/_pages/admin-doi-ngu",
    parentId: "routes/admin-layout",
    path: "doi-ngu",
    index: void 0,
    caseSensitive: void 0,
    module: route54
  },
  "routes/_pages/admin-kenh-cong-dong": {
    id: "routes/_pages/admin-kenh-cong-dong",
    parentId: "routes/admin-layout",
    path: "kenh-cong-dong",
    index: void 0,
    caseSensitive: void 0,
    module: route55
  },
  "routes/_pages/admin-not-found": {
    id: "routes/_pages/admin-not-found",
    parentId: "routes/admin-layout",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route56
  },
  "routes/_redirects/catch-all": {
    id: "routes/_redirects/catch-all",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route57
  }
};
const allowedActionOrigins = false;
export {
  BackButton as B,
  CompSynergyPills as C,
  FilterToolbar as F,
  HeroIcon as H,
  MAX_COMPARE_ITEMS as M,
  FilterToolbarRow as a,
  FilterSearchInput as b,
  FilterSelect as c,
  FilterClearButton as d,
  FilterResultMeta as e,
  heroCostBadgeOverlayClass as f,
  getTierBadgeVariant as g,
  heroCostBarClass as h,
  getTierRank as i,
  allowedActionOrigins as j,
  assetsBuildDirectory as k,
  basename as l,
  entry as m,
  future as n,
  isSpaMode as o,
  prerender as p,
  publicPath as q,
  routeDiscovery as r,
  serverManifest as s,
  routes as t,
  ssr as u
};
