import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreatePostModal } from "@/components/modals/CreatePostModal";

interface MobileTopBarProps {
  onMenuClick?: () => void;
}

export function MobileTopBar({ onMenuClick }: MobileTopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border md:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: Menu or Logo */}
        <div className="flex items-center gap-3">
          {onMenuClick ? (
            <Button variant="ghost" size="sm" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 campus-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold campus-gradient bg-clip-text text-transparent">
                CampusSphere
              </span>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          <CreatePostModal>
            <Button size="sm" className="campus-gradient text-white hover:opacity-90">
              <span className="text-lg">+</span>
            </Button>
          </CreatePostModal>
        </div>
      </div>
    </header>
  );
}