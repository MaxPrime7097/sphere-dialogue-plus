import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Groups } from "./pages/Groups";
import { Events } from "./pages/Events";
import { Marketplace } from "./pages/Marketplace";
import { Library } from "./pages/Library";
import { Wellness } from "./pages/Wellness";
import { Messages } from "./pages/Messages";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Notifications } from "./pages/Notifications";
import { SearchResults } from "./pages/SearchResults";
import { EditProfile } from "./pages/EditProfile";
import { SavedItems } from "./pages/SavedItems";
import { EventDetail } from "./pages/EventDetail";
import { GroupDetail } from "./pages/GroupDetail";
import { Resources } from "./pages/Resources";
import { ResourceDetail } from "./pages/ResourceDetail";
import { Spheres } from "./pages/Spheres";
import { SphereDetail } from "./pages/SphereDetail";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { CookiePolicy } from "./pages/CookiePolicy";
import { CommunityGuidelines } from "./pages/CommunityGuidelines";
import { Copyright } from "./pages/Copyright";
import { DataDeletion } from "./pages/DataDeletion";
import { Connections } from "./pages/Connections";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/cs-inc" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected routes with layout */}
          <Route path="/" element={
            <AppLayout>
              <Home />
            </AppLayout>
          } />
          <Route path="/profile" element={
            <AppLayout>
              <Profile />
            </AppLayout>
          } />
          <Route path="/groups" element={
            <AppLayout>
              <Groups />
            </AppLayout>
          } />
          <Route path="/events" element={
            <AppLayout>
              <Events />
            </AppLayout>
          } />
          <Route path="/marketplace" element={
            <AppLayout>
              <Marketplace />
            </AppLayout>
          } />
          <Route path="/library" element={
            <AppLayout>
              <Library />
            </AppLayout>
          } />
          <Route path="/wellness" element={
            <AppLayout>
              <Wellness />
            </AppLayout>
          } />
          <Route path="/messages" element={
            <AppLayout>
              <Messages />
            </AppLayout>
          } />
          <Route path="/messages/:conversationId" element={
            <AppLayout>
              <Messages />
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <Settings />
            </AppLayout>
          } />
          <Route path="/notifications" element={
            <AppLayout>
              <Notifications />
            </AppLayout>
          } />
          <Route path="/search" element={
            <AppLayout>
              <SearchResults />
            </AppLayout>
          } />
          <Route path="/profile/edit" element={
            <AppLayout>
              <EditProfile />
            </AppLayout>
          } />
          <Route path="/connections" element={
            <AppLayout>
              <Connections />
            </AppLayout>
          } />
          <Route path="/saved" element={
            <AppLayout>
              <SavedItems />
            </AppLayout>
          } />
          <Route path="/events/:id" element={
            <AppLayout>
              <EventDetail />
            </AppLayout>
          } />
          <Route path="/groups/:id" element={
            <AppLayout>
              <GroupDetail />
            </AppLayout>
          } />
          <Route path="/resources" element={
            <AppLayout>
              <Resources />
            </AppLayout>
          } />
          <Route path="/resources/:id" element={
            <AppLayout>
              <ResourceDetail />
            </AppLayout>
          } />
          <Route path="/spheres" element={
            <AppLayout>
              <Spheres />
            </AppLayout>
          } />
          <Route path="/spheres/:id" element={
            <AppLayout>
              <SphereDetail />
            </AppLayout>
          } />
          <Route path="/cs-inc/admin" element={
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          } />
          
          {/* Public pages */}
          <Route path="/cs-inc/about" element={<About />} />
          <Route path="/cs-inc/contact" element={<Contact />} />
          <Route path="/cs-inc/faq" element={<FAQ />} />
          <Route path="/cs-inc/policies/privacy" element={<Privacy />} />
          <Route path="/cs-inc/policies/terms" element={<Terms />} />
          <Route path="/cs-inc/policies/cookies" element={<CookiePolicy />} />
          <Route path="/cs-inc/policies/community-guidelines" element={<CommunityGuidelines />} />
          <Route path="/cs-inc/policies/copyright" element={<Copyright />} />
          <Route path="/cs-inc/policies/data-deletion" element={<DataDeletion />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
