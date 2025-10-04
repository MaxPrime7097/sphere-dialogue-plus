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
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

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
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
