import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Image, MapPin, Users, X, Lock, Globe, Video, FileText, Smile, AtSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostModalProps {
  children: React.ReactNode;
}

export function CreatePostModal({ children }: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState("general");
  const [visibility, setVisibility] = useState("public");
  const [allowComments, setAllowComments] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const totalSize = [...uploadedFiles, ...newFiles].reduce((acc, file) => acc + file.size, 0);
      
      if (totalSize > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: "Fichier trop volumineux",
          description: "La taille totale des fichiers ne peut pas dépasser 50MB",
          variant: "destructive"
        });
        return;
      }
      
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      toast({
        title: "Fichier ajouté",
        description: `${newFiles.length} fichier(s) ajouté(s)`
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const insertEmoji = (emoji: string) => {
    setContent(content + emoji);
    setShowEmojiPicker(false);
  };

  const insertMention = (username: string) => {
    setContent(content + `@${username} `);
    setShowMentions(false);
  };

  const handleSubmit = () => {
    if (content.trim()) {
      console.log("Creating post:", { 
        content, 
        location, 
        tags, 
        category, 
        visibility, 
        allowComments,
        files: uploadedFiles 
      });
      
      toast({
        title: "Post publié !",
        description: "Votre post a été partagé avec succès."
      });

      setContent("");
      setLocation("");
      setTags([]);
      setCategory("general");
      setVisibility("public");
      setAllowComments(true);
      setUploadedFiles([]);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Créer un nouveau post
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5">
          {/* Contenu principal */}
          <div>
            <Label htmlFor="content" className="text-base">Contenu du post</Label>
            <Textarea
              id="content"
              placeholder="Que voulez-vous partager avec la communauté ?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] mt-2 text-base"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">
                {content.length}/500 caractères
              </span>
            </div>
          </div>

          <Separator />

          {/* Catégorie et Visibilité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Général</SelectItem>
                  <SelectItem value="academic">Académique</SelectItem>
                  <SelectItem value="event">Événement</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="help">Demande d'aide</SelectItem>
                  <SelectItem value="announcement">Annonce</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="visibility">Visibilité</Label>
              <Select value={visibility} onValueChange={setVisibility}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="university">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Université uniquement
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Amis uniquement
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Localisation et Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Localisation (optionnel)</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Campus, ville..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="tag">Tags</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="tag"
                  placeholder="Ajouter un tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {tags.length > 0 && (
            <div>
              <Label>Tags ajoutés</Label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    #{tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Médias et Options */}
          <div>
            <Label className="mb-3 block">Ajouter des médias</Label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className="h-4 w-4" />
                Photos/Vidéos
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText className="h-4 w-4" />
                Document
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-4 w-4" />
                Emoji
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowMentions(!showMentions)}
              >
                <AtSign className="h-4 w-4" />
                Mentionner
              </Button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <Card className="mt-2 p-3">
                <div className="grid grid-cols-8 gap-2">
                  {['😀', '😂', '🥰', '😎', '🤔', '👍', '🎉', '🔥', '💯', '✨', '🚀', '❤️', '👏', '🙌', '💪', '🎯'].map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      className="text-2xl p-2 h-auto"
                      onClick={() => insertEmoji(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Mentions */}
            {showMentions && (
              <Card className="mt-2 p-3">
                <div className="space-y-2">
                  {['alex_dubois', 'sophie_m', 'lucas_dev', 'emma_b'].map((username) => (
                    <Button
                      key={username}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => insertMention(username)}
                    >
                      @{username}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <Label>Fichiers joints ({uploadedFiles.length})</Label>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Options supplémentaires */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Autoriser les commentaires</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Permettre aux autres d'interagir avec votre post
                </p>
              </div>
              <Switch 
                checked={allowComments} 
                onCheckedChange={setAllowComments}
              />
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!content.trim() || content.length > 500}
              className="campus-gradient text-white hover:opacity-90"
            >
              Publier le post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}