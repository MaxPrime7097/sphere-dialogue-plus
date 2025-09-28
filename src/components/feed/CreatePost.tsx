import { useState } from "react";
import { Image, Video, Smile, MapPin, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      // Ici on ajouterait la logique pour créer le post
      console.log("Nouveau post:", content);
      setContent("");
      setIsExpanded(false);
    }
  };

  return (
    <Card className="campus-card">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="campus-gradient text-white font-semibold">
              ME
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Quoi de neuf sur le campus ?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="min-h-[60px] resize-none border-none bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0"
            />
            
            {isExpanded && (
              <div className="space-y-3 campus-animate-fade-in">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <Image className="h-4 w-4" />
                    <span className="text-sm">Photo</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <Video className="h-4 w-4" />
                    <span className="text-sm">Vidéo</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <Smile className="h-4 w-4" />
                    <span className="text-sm">Emoji</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Lieu</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <Hash className="h-4 w-4" />
                    <span className="text-sm">Tag</span>
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {280 - content.length} caractères restants
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent("");
                      }}
                    >
                      Annuler
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSubmit}
                      disabled={!content.trim() || content.length > 280}
                      className="campus-gradient text-white hover:opacity-90"
                    >
                      Publier
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}