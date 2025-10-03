import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreatePostModal } from "@/components/modals/CreatePostModal";

export function CreatePost() {
  return (
    <CreatePostModal>
      <Card className="campus-card cursor-pointer hover:campus-glow transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex gap-3 items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="campus-gradient text-white font-semibold">
                ME
              </AvatarFallback>
            </Avatar>
            
            <div 
              className="flex-1 px-4 py-3 bg-muted/50 rounded-full text-muted-foreground cursor-pointer hover:bg-muted transition-colors"
            >
              Quoi de neuf sur le campus ?
            </div>
          </div>
        </CardContent>
      </Card>
    </CreatePostModal>
  );
}