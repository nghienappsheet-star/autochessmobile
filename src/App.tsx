/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { MotionProvider } from './components/motion/MotionProvider';
import {
  LegacyAdminTraitsRedirect,
  LegacyTraitDetailRedirect,
  LegacyTraitListRedirect,
} from './components/traits/LegacyTraitRedirects';
import { LegacyCommunityDetailRedirect } from './components/community/LegacyCommunityRedirects';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { LogoutConfirmModal } from './components/LogoutConfirmModal';
import { DataProvider } from './contexts/DataContext';
import {
  AdminPage,
  AdminUsersPage,
  AdminItemsPage,
  AdminHeroesPage,
  AdminHeroEditorPage,
  AdminCompsPage,
  AdminTraitsPage,
  AdminPostsPage,
  AdminBannersPage,
  AdminRelicsPage,
  AdminSettingsPage,
  AdminSEOPage,
  AdminReportsPage,
  AdminRolesPage,
  AdminCommentsPage,
  AdminLeaderboardPage,
  AdminNewsPage,
  AdminEventsPage,
  AdminMediaPage,
  AdminNotFoundPage,
  AdminTeamPage,
  AdminChannelsPage,
  PostEditorPage,
} from './routes/lazyAdminPages';
import {
  HomePage,
  CompDetailPage,
  CompsListPage,
  HeroesPage,
  HeroDetailPage,
  ItemsPage,
  ItemDetailPage,
  RelicsPage,
  RelicDetailPage,
  TraitsPage,
  TraitDetailPage,
  ToolsPage,
  NewsPage,
  NewsDetailPage,
  LeaderboardPage,
  CommunityPage,
  CommunityDetailPage,
  CommunityHubPage,
  CommunityComposerPage,
  ProfilePage,
} from './routes/lazyPublicPages';

function RouteFallback({ label }: { label: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p className="text-sm text-brand-text-sub">{label}</p>
    </div>
  );
}

function LazyAdmin({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteFallback label="Đang tải trang quản trị..." />}>{children}</Suspense>;
}

function LazyPublic({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteFallback label="Đang tải..." />}>{children}</Suspense>;
}

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <MotionProvider>
          <BrowserRouter>
            <AuthModal />
            <LogoutConfirmModal />
            <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LazyPublic><HomePage /></LazyPublic>} />
              <Route path="doi-hinh" element={<LazyPublic><CompsListPage /></LazyPublic>} />
              <Route path="doi-hinh/:id" element={<LazyPublic><CompDetailPage /></LazyPublic>} />
              <Route path="toc-he" element={<LazyPublic><TraitsPage /></LazyPublic>} />
              <Route path="toc-he/:kind/:id" element={<LazyPublic><TraitDetailPage /></LazyPublic>} />
              <Route path="toc" element={<LegacyTraitListRedirect />} />
              <Route path="toc/:id" element={<LegacyTraitDetailRedirect routeKind="toc" />} />
              <Route path="he" element={<LegacyTraitListRedirect tab="class" />} />
              <Route path="he/:id" element={<LegacyTraitDetailRedirect routeKind="he" />} />
              <Route path="tuong" element={<LazyPublic><HeroesPage /></LazyPublic>} />
              <Route path="tuong/:id" element={<LazyPublic><HeroDetailPage /></LazyPublic>} />
              <Route path="trang-bi" element={<LazyPublic><ItemsPage /></LazyPublic>} />
              <Route path="trang-bi/:id" element={<LazyPublic><ItemDetailPage /></LazyPublic>} />
              <Route path="di-vat" element={<LazyPublic><RelicsPage /></LazyPublic>} />
              <Route path="di-vat/:id" element={<LazyPublic><RelicDetailPage /></LazyPublic>} />
              <Route path="cong-cu/*" element={<LazyPublic><ToolsPage /></LazyPublic>} />
              <Route path="tin-tuc" element={<LazyPublic><NewsPage /></LazyPublic>} />
              <Route path="tin-tuc/:id" element={<LazyPublic><NewsDetailPage /></LazyPublic>} />
              <Route path="bang-xep-hang" element={<LazyPublic><LeaderboardPage /></LazyPublic>} />
              <Route path="cong-dong" element={<LazyPublic><CommunityHubPage /></LazyPublic>} />
              <Route path="cong-dong/:id" element={<LegacyCommunityDetailRedirect />} />
              <Route path="thao-luan" element={<LazyPublic><CommunityPage /></LazyPublic>} />
              <Route path="thao-luan/:id" element={<LazyPublic><CommunityDetailPage /></LazyPublic>} />
              <Route path="dang-bai" element={<LazyPublic><CommunityComposerPage /></LazyPublic>} />
              <Route path="ho-so" element={<LazyPublic><ProfilePage /></LazyPublic>} />
            </Route>
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<LazyAdmin><AdminPage /></LazyAdmin>} />
              <Route path="nguoi-dung" element={<LazyAdmin><AdminUsersPage /></LazyAdmin>} />
              <Route path="trang-bi" element={<LazyAdmin><AdminItemsPage /></LazyAdmin>} />
              <Route path="tuong/them" element={<LazyAdmin><AdminHeroEditorPage /></LazyAdmin>} />
              <Route path="tuong/:id/sua" element={<LazyAdmin><AdminHeroEditorPage /></LazyAdmin>} />
              <Route path="tuong" element={<LazyAdmin><AdminHeroesPage /></LazyAdmin>} />
              <Route path="doi-hinh" element={<LazyAdmin><AdminCompsPage /></LazyAdmin>} />
              <Route path="toc-he" element={<LazyAdmin><AdminTraitsPage /></LazyAdmin>} />
              <Route path="toc" element={<LegacyAdminTraitsRedirect tab="race" />} />
              <Route path="he" element={<LegacyAdminTraitsRedirect tab="class" />} />
              <Route path="bai-viet" element={<LazyAdmin><AdminPostsPage /></LazyAdmin>} />
              <Route path="bai-viet/them" element={<LazyAdmin><PostEditorPage /></LazyAdmin>} />
              <Route path="bai-viet/:id/sua" element={<LazyAdmin><PostEditorPage /></LazyAdmin>} />
              <Route path="banners" element={<LazyAdmin><AdminBannersPage /></LazyAdmin>} />
              <Route path="di-vat" element={<LazyAdmin><AdminRelicsPage /></LazyAdmin>} />
              <Route path="vai-tro" element={<LazyAdmin><AdminRolesPage /></LazyAdmin>} />
              <Route path="binh-luan" element={<LazyAdmin><AdminCommentsPage /></LazyAdmin>} />
              <Route path="bang-xep-hang" element={<LazyAdmin><AdminLeaderboardPage /></LazyAdmin>} />
              <Route path="tin-tuc" element={<LazyAdmin><AdminNewsPage /></LazyAdmin>} />
              <Route path="su-kien" element={<LazyAdmin><AdminEventsPage /></LazyAdmin>} />
              <Route path="media" element={<LazyAdmin><AdminMediaPage /></LazyAdmin>} />
              <Route path="bao-cao" element={<LazyAdmin><AdminReportsPage /></LazyAdmin>} />
              <Route path="seo" element={<LazyAdmin><AdminSEOPage /></LazyAdmin>} />
              <Route path="cai-dat" element={<LazyAdmin><AdminSettingsPage /></LazyAdmin>} />
              <Route path="doi-ngu" element={<LazyAdmin><AdminTeamPage /></LazyAdmin>} />
              <Route path="kenh-cong-dong" element={<LazyAdmin><AdminChannelsPage /></LazyAdmin>} />
              <Route path="*" element={<LazyAdmin><AdminNotFoundPage /></LazyAdmin>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        </MotionProvider>
      </AuthProvider>
    </DataProvider>
  );
}
