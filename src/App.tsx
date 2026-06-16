/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { CompDetailPage } from './pages/CompDetailPage';
import { CompsListPage } from './pages/CompsListPage';
import { HeroesPage } from './pages/HeroesPage';
import { HeroDetailPage } from './pages/HeroDetailPage';
import { ItemsPage } from './pages/ItemsPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { RelicsPage } from './pages/RelicsPage';
import { RelicDetailPage } from './pages/RelicDetailPage';
import { TraitsPage } from './pages/TraitsPage';
import { TraitDetailPage } from './pages/TraitDetailPage';
import {
  LegacyAdminTraitsRedirect,
  LegacyTraitDetailRedirect,
  LegacyTraitListRedirect,
} from './components/traits/LegacyTraitRedirects';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminItemsPage } from './pages/AdminItemsPage';
import { AdminHeroesPage } from './pages/AdminHeroesPage';
import { AdminCompsPage } from './pages/AdminCompsPage';
import { AdminTraitsPage } from './pages/AdminTraitsPage';
import { AdminPostsPage } from './pages/AdminPostsPage';
import { AdminBannersPage } from './pages/AdminBannersPage';
import { AdminRelicsPage } from './pages/AdminRelicsPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { AdminSEOPage } from './pages/AdminSEOPage';
import { AdminReportsPage } from './pages/AdminReportsPage';
import { AdminRolesPage } from './pages/AdminRolesPage';
import { AdminCommentsPage } from './pages/AdminCommentsPage';
import { AdminLeaderboardPage } from './pages/AdminLeaderboardPage';
import { AdminNewsPage } from './pages/AdminNewsPage';
import { AdminEventsPage } from './pages/AdminEventsPage';
import { AdminMediaPage } from './pages/AdminMediaPage';
import { AdminNotFoundPage } from './pages/AdminNotFoundPage';
import { ToolsPage } from './pages/ToolsPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { CommunityPage } from './pages/CommunityPage';
import { CommunityDetailPage } from './pages/CommunityDetailPage';
import { CommunityHubPage } from './pages/CommunityHubPage';
import { LegacyCommunityDetailRedirect } from './components/community/LegacyCommunityRedirects';
import { AdminTeamPage } from './pages/AdminTeamPage';
import { AdminChannelsPage } from './pages/AdminChannelsPage';
import { CommunityComposerPage } from './pages/CommunityComposerPage';
import { PostEditorPage } from './pages/PostEditorPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { LogoutConfirmModal } from './components/LogoutConfirmModal';
import { DataProvider } from './contexts/DataContext';

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <BrowserRouter>
          <AuthModal />
          <LogoutConfirmModal />
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="doi-hinh" element={<CompsListPage />} />
            <Route path="doi-hinh/:id" element={<CompDetailPage />} />
            <Route path="toc-he" element={<TraitsPage />} />
            <Route path="toc-he/:kind/:id" element={<TraitDetailPage />} />
            <Route path="toc" element={<LegacyTraitListRedirect />} />
            <Route path="toc/:id" element={<LegacyTraitDetailRedirect routeKind="toc" />} />
            <Route path="he" element={<LegacyTraitListRedirect tab="class" />} />
            <Route path="he/:id" element={<LegacyTraitDetailRedirect routeKind="he" />} />
            <Route path="tuong" element={<HeroesPage />} />
            <Route path="tuong/:id" element={<HeroDetailPage />} />
            <Route path="trang-bi" element={<ItemsPage />} />
            <Route path="trang-bi/:id" element={<ItemDetailPage />} />
            <Route path="di-vat" element={<RelicsPage />} />
            <Route path="di-vat/:id" element={<RelicDetailPage />} />
            <Route path="cong-cu/*" element={<ToolsPage />} />
            <Route path="tin-tuc" element={<NewsPage />} />
            <Route path="tin-tuc/:id" element={<NewsDetailPage />} />
            <Route path="bang-xep-hang" element={<LeaderboardPage />} />
            <Route path="cong-dong" element={<CommunityHubPage />} />
            <Route path="cong-dong/:id" element={<LegacyCommunityDetailRedirect />} />
            <Route path="thao-luan" element={<CommunityPage />} />
            <Route path="thao-luan/:id" element={<CommunityDetailPage />} />
            <Route path="dang-bai" element={<CommunityComposerPage />} />
            <Route path="ho-so" element={<ProfilePage />} />
          </Route>
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="nguoi-dung" element={<AdminUsersPage />} />
            <Route path="trang-bi" element={<AdminItemsPage />} />
            <Route path="tuong" element={<AdminHeroesPage />} />
            <Route path="doi-hinh" element={<AdminCompsPage />} />
            <Route path="toc-he" element={<AdminTraitsPage />} />
            <Route path="toc" element={<LegacyAdminTraitsRedirect tab="race" />} />
            <Route path="he" element={<LegacyAdminTraitsRedirect tab="class" />} />
            <Route path="bai-viet" element={<AdminPostsPage />} />
            <Route path="bai-viet/them" element={<PostEditorPage />} />
            <Route path="bai-viet/:id/sua" element={<PostEditorPage />} />
            <Route path="banners" element={<AdminBannersPage />} />
            <Route path="di-vat" element={<AdminRelicsPage />} />
            <Route path="vai-tro" element={<AdminRolesPage />} />
            <Route path="binh-luan" element={<AdminCommentsPage />} />
            <Route path="bang-xep-hang" element={<AdminLeaderboardPage />} />
            <Route path="tin-tuc" element={<AdminNewsPage />} />
            <Route path="su-kien" element={<AdminEventsPage />} />
            <Route path="media" element={<AdminMediaPage />} />
            <Route path="bao-cao" element={<AdminReportsPage />} />
            <Route path="seo" element={<AdminSEOPage />} />
            <Route path="cai-dat" element={<AdminSettingsPage />} />
            <Route path="doi-ngu" element={<AdminTeamPage />} />
            <Route path="kenh-cong-dong" element={<AdminChannelsPage />} />
            <Route path="*" element={<AdminNotFoundPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </DataProvider>
  );
}
