import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Plus, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface CreateSphereModalProps {
  children: React.ReactNode;
}

const sphereSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères").max(50),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères").max(500),
  category: z.string().min(1, "Veuillez sélectionner une catégorie"),
  color: z.string().min(1, "Veuillez sélectionner une couleur")
});

export function CreateSphereModal({ children }: CreateSphereModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("from-blue-500 to-purple-500");
  const [isPrivate, setIsPrivate] = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);
  const { toast } = useToast();

  const colorOptions = [
    { value: "from-blue-500 to-purple-500", label: "Bleu → Violet" },
    { value: "from-pink-500 to-orange-500", label: "Rose → Orange" },
    { value: "from-green-500 to-teal-500", label: "Vert → Turquoise" },
    { value: "from-yellow-500 to-green-500", label: "Jaune → Vert" },
    { value: "from-red-500 to-pink-500", label: "Rouge → Rose" },
    { value: "from-indigo-500 to-blue-500", label: "Indigo → Bleu" }
  ];

  const handleSubmit = () => {
    try {
      sphereSchema.parse({ name, description, category, color });
      
      console.log("Creating sphere:", { 
        name, 
        description, 
        category, 
        color,
        isPrivate,
        requireApproval
      });

      toast({
        title: "Sphère créée !",
        description: `${name} a été créée avec succès.`
      });

      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setColor("from-blue-500 to-purple-500");
      setIsPrivate(false);
      setRequireApproval(false);
      setIsOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
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
            <Sparkles className="h-5 w-5 text-primary" />
            Créer une Sphère Collaborative
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <Label htmlFor="name">Nom de la Sphère *</Label>
            <Input
              id="name"
              placeholder="Ex: Projet IA 2025"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {name.length}/50 caractères
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez l'objectif de votre sphère..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className="mt-2 min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {description.length}/500 caractères
            </p>
          </div>

          <Separator />

          {/* Category & Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Catégorie *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Projet">Projet</SelectItem>
                  <SelectItem value="Créatif">Créatif</SelectItem>
                  <SelectItem value="Entraide">Entraide</SelectItem>
                  <SelectItem value="Apprentissage">Apprentissage</SelectItem>
                  <SelectItem value="Sport">Sport</SelectItem>
                  <SelectItem value="Culture">Culture</SelectItem>
                  <SelectItem value="Technologie">Technologie</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color">Couleur du thème *</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded bg-gradient-to-r ${option.value}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview */}
          <div>
            <Label>Aperçu</Label>
            <div className="mt-2 relative h-24 rounded-lg overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${color}`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-bold text-xl text-center px-4">
                  {name || "Nom de votre sphère"}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Sphère privée</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Seuls les membres invités peuvent voir cette sphère
                </p>
              </div>
              <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Approbation requise</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Valider manuellement chaque demande d'adhésion
                </p>
              </div>
              <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name || !description || !category}
              className="campus-gradient text-white hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Créer la Sphère
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
