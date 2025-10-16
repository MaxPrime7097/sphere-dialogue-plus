import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreVertical, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommentsModal } from "@/components/modals/CommentsModal";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar?: string;
      username: string;
      isVerified?: boolean;
      impactScore?: number;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    category?: string;
    impactScore?: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [impactScore, setImpactScore] = useState(post.impactScore || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleImpactRate = (rating: number) => {
    if (hasRated) return;
    setHasRated(true);
    setImpactScore((prev) => prev + rating);
  };

  const cardClasses = cn(
    "transition-all duration-300",
    isMobile 
      ? "rounded-none border-x-0 border-t-0 shadow-none bg-card" 
      : "campus-card hover:campus-glow"
  );

  return (
    <>
      <Card className={cardClasses}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/profile')}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="campus-gradient text-white font-semibold">
                  {post.author.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm hover:underline">{post.author.name}</h4>
                  {post.author.isVerified && (
                    <div className="w-4 h-4 campus-gradient rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">@{post.author.username}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Enregistrer</DropdownMenuItem>
                <DropdownMenuItem>Partager</DropdownMenuItem>
                <DropdownMenuItem>Copier le lien</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Signaler</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {post.category && (
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          )}
          
          <p className="text-sm leading-relaxed">{post.content}</p>
          
          {post.image && (
            <div className="rounded-lg overflow-hidden md:overflow-hidden w-full">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          {/* Impact Score Rating */}
          <div className="flex items-center justify-between pt-2 pb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">{impactScore}</span>
              <span className="text-xs text-muted-foreground">Impact Score</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  disabled={hasRated}
                >
                  <Zap className="h-4 w-4" />
                  {hasRated ? "Déjà noté" : "Noter l'impact"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleImpactRate(10)}>
                  ⚡⚡⚡ Impact élevé (+10)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleImpactRate(5)}>
                  ⚡⚡ Impact moyen (+5)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleImpactRate(1)}>
                  ⚡ Impact faible (+1)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`gap-2 ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs">{likesCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 hover:text-primary"
                onClick={() => setCommentsOpen(true)}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{post.comments}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                <Share className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={`${isSaved ? 'text-primary' : 'hover:text-primary'}`}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <CommentsModal 
      open={commentsOpen} 
      onOpenChange={setCommentsOpen}
      postId={post.id}
    />
    </>
  );
}