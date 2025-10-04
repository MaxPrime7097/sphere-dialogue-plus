import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CreatePostModal } from "@/components/modals/CreatePostModal";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileTopBarProps {
  onMenuClick?: () => void;
}

export function MobileTopBar({ onMenuClick }: MobileTopBarProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const unreadCount = 3; // TODO: Get from state/API

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border md:hidden">
      {searchOpen ? (
        <div className="flex items-center gap-2 px-4 h-14">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </form>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left: Menu or Logo */}
          <div className="flex items-center gap-3">
            {onMenuClick ? (
              <Button variant="ghost" size="sm" onClick={onMenuClick}>
                <Menu className="h-5 w-5" />
              </Button>
            ) : (
              <button onClick={() => navigate(`/`)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img src="/CS.svg" alt="CampusSphere" className="h-8 w-8" />
                <span className="text-lg font-bold campus-gradient bg-clip-text text-transparent" style={{ fontFamily: 'Automata Display' }}>
                  CampusSphere
                </span>
              </button>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>

            <CreatePostModal>
              <Button size="sm" className="campus-gradient text-white hover:opacity-90">
                <span className="text-lg">+</span>
              </Button>
            </CreatePostModal>
          </div>
        </div>
      )}
    </header>
  );
}
