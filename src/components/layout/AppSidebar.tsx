import { 
  Home, 
  User, 
  Users, 
  Calendar, 
  ShoppingBag, 
  BookOpen, 
  Heart, 
  Bell, 
  MessageCircle,
  Search,
  Settings
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Accueil", url: "/", icon: Home },
  { title: "Profil", url: "/profile", icon: User },
  { title: "Groupes", url: "/groups", icon: Users },
  { title: "Événements", url: "/events", icon: Calendar },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingBag },
  { title: "Bibliothèque", url: "/library", icon: BookOpen },
  { title: "Bien-être", url: "/wellness", icon: Heart },
];

const quickActions = [
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Recherche", url: "/search", icon: Search },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-accent/50 text-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 campus-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg campus-gradient bg-clip-text text-transparent">
                CampusSphere
              </h1>
              <p className="text-xs text-muted-foreground">Réseau étudiant</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClasses}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}