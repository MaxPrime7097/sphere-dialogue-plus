import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
}

export function CommentsModal({ open, onOpenChange, postId }: CommentsModalProps) {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  
  const commentSchema = z.object({
    content: z.string()
      .trim()
      .min(1, { message: t('modals.comments.validation.tooShort') })
      .max(500, { message: t('modals.comments.validation.tooLong') })
  });
  
  // Mock comments
  const comments: Comment[] = [
    {
      id: "1",
      author: {
        name: "Sophie Martin",
        avatar: "/placeholder-avatar.jpg",
        username: "sophie_m"
      },
      content: t('modals.comments.sample1', { defaultValue: "Vraiment intéressant ! Merci du partage 👍" }),
      timestamp: "1h ago",
      likes: 3
    },
    {
      id: "2",
      author: {
        name: "Lucas Dubois",
        avatar: "/placeholder-avatar.jpg",
        username: "lucas_d"
      },
      content: t('modals.comments.sample2', { defaultValue: "Je suis complètement d'accord avec toi !" }),
      timestamp: "2h ago",
      likes: 1
    }
  ];

  const handleSubmit = () => {
    const validation = commentSchema.safeParse({ content: newComment });
    
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: t('modals.comments.invalidTitle', { defaultValue: "Commentaire invalide" }),
        description: validation.error.errors[0].message,
      });
      return;
    }

    toast({
      title: t('modals.comments.validation.posted'),
    });
    setNewComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 bg-popover">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{t('modals.comments.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{comment.timestamp}</span>
                  <button 
                    className="flex items-center gap-1 hover:text-primary"
                    aria-label="Like comment"
                  >
                    <Heart className="h-3 w-3" />
                    {comment.likes}
                  </button>
                  <button className="hover:text-primary">{t('modals.comments.reply')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Textarea
                placeholder={t('modals.comments.placeholder')}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
                className="min-h-[80px] resize-none"
                maxLength={500}
              />
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="campus-gradient text-white hover:opacity-90"
                aria-label="Post comment"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
