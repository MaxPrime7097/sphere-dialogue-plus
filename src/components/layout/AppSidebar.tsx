import { 
  Home, 
  User, 
  Users, 
  Calendar, 
  ShoppingBag, 
  BookOpen, 
  Heart, 
  Bookmark, 
  MessageSquare,
  Settings,
  Info,
  LifeBuoy,
  BookUser,
  BookLock
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
  { title: "Ressources", url: "/resources", icon: Heart },
  { title: "Groupes", url: "/groups", icon: Users },
  { title: "Événements", url: "/events", icon: Calendar },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingBag },
  { title: "Bibliothèque", url: "/library", icon: BookOpen },
];

const quickActions = [
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Enregistrements", url: "/saved", icon: Bookmark },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

const utils = [
  {title: "À propos", url: "/cs-inc/about", icon: Info },
  {title: "Politique de confidentialité", url: "/cs-inc/policies/privacy", icon: BookLock },
  {title: "Conditions d'utilisation", url: "/cs-inc/policies/conditions", icon: BookUser },
  {title: "Aide", url: "/cs-inc/contact", icon: LifeBuoy },
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
    <Sidebar className={isCollapsed ? "w-20" : "w-60"} collapsible="icon">
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

        <SidebarGroup>
          <SidebarGroupLabel>Utilitaires</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utils.map((item) => (
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

      </SidebarContent>
    </Sidebar>
  );
}