import { Home, Users, Calendar, MessageSquare, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  { 
    title: "Accueil", 
    url: "/", 
    icon: Home 
  },
  { 
    title: "Groupes", 
    url: "/groups", 
    icon: Users 
  },
  { 
    title: "Événements", 
    url: "/events", 
    icon: Calendar 
  },
  { 
    title: "Messages", 
    url: "/messages", 
    icon: MessageSquare 
  },
  { 
    title: "Profil", 
    url: "/profile", 
    icon: User 
  }
];

export function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex justify-around items-center py-2 px-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}