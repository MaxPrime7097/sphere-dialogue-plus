import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Users, Lock, Globe } from "lucide-react";

interface CreateGroupModalProps {
  children: React.ReactNode;
}

export function CreateGroupModal({ children }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: "academic", label: "Académique" },
    { value: "creative", label: "Créatif" },
    { value: "sport", label: "Sport" },
    { value: "tech", label: "Technologie" },
    { value: "business", label: "Business" },
    { value: "lifestyle", label: "Style de vie" },
    { value: "gaming", label: "Gaming" },
    { value: "other", label: "Autre" }
  ];

  const handleSubmit = () => {
    if (name.trim() && description.trim() && category) {
      console.log("Creating group:", {
        name,
        description,
        category,
        isPrivate,
        requireApproval
      });
      
      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setIsPrivate(false);
      setRequireApproval(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Créer un nouveau groupe
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupName">Nom du groupe</Label>
            <Input
              id="groupName"
              placeholder="Ex: Développement Web 2024"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="groupDescription">Description</Label>
            <Textarea
              id="groupDescription"
              placeholder="Décrivez l'objectif et les activités de votre groupe..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] mt-2"
            />
          </div>

          <div>
            <Label htmlFor="groupCategory">Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                  <Label htmlFor="private">Groupe privé</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Les groupes privés ne sont pas visibles dans la recherche
                </p>
              </div>
              <Switch
                id="private"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="approval">Approbation requise</Label>
                <p className="text-sm text-muted-foreground">
                  Les nouvelles demandes doivent être approuvées par un admin
                </p>
              </div>
              <Switch
                id="approval"
                checked={requireApproval}
                onCheckedChange={setRequireApproval}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!name.trim() || !description.trim() || !category}
              className="campus-gradient text-white hover:opacity-90"
            >
              Créer le groupe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}