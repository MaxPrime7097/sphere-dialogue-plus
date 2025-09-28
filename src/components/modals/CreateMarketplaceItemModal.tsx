import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ShoppingBag, Euro, Image, MapPin } from "lucide-react";

interface CreateMarketplaceItemModalProps {
  children: React.ReactNode;
}

export function CreateMarketplaceItemModal({ children }: CreateMarketplaceItemModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [isService, setIsService] = useState(false);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: "books", label: "Livres & Manuels" },
    { value: "electronics", label: "Électronique" },
    { value: "services", label: "Services" },
    { value: "transport", label: "Transport" },
    { value: "furniture", label: "Mobilier" },
    { value: "clothes", label: "Vêtements" },
    { value: "school", label: "Fournitures scolaires" },
    { value: "other", label: "Autre" }
  ];

  const conditions = [
    { value: "new", label: "Neuf" },
    { value: "like-new", label: "Comme neuf" },
    { value: "very-good", label: "Très bon état" },
    { value: "good", label: "Bon état" },
    { value: "fair", label: "État correct" },
    { value: "service", label: "Service" }
  ];

  const handleSubmit = () => {
    if (title.trim() && description.trim() && price && category && (isService || condition)) {
      console.log("Creating marketplace item:", {
        title,
        description,
        price: parseFloat(price),
        category,
        condition,
        location,
        isService,
        isNegotiable
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setCondition("");
      setLocation("");
      setIsService(false);
      setIsNegotiable(false);
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
            <ShoppingBag className="h-5 w-5" />
            Vendre un article
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="itemTitle">Titre</Label>
            <Input
              id="itemTitle"
              placeholder="Ex: MacBook Air M1 (2020)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="itemDescription">Description</Label>
            <Textarea
              id="itemDescription"
              placeholder="Décrivez votre article, son état, ses caractéristiques..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="itemPrice">Prix</Label>
              <div className="relative mt-2">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="itemPrice"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="itemCategory">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Sélectionner" />
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            {!isService && (
              <div>
                <Label htmlFor="itemCondition">État</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="État de l'article" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.filter(c => c.value !== "service").map((cond) => (
                      <SelectItem key={cond.value} value={cond.value}>
                        {cond.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="itemLocation">Localisation</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="itemLocation"
                  placeholder="Campus, ville..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="isService">Il s'agit d'un service</Label>
                <p className="text-sm text-muted-foreground">
                  Cours particuliers, aide aux devoirs, etc.
                </p>
              </div>
              <Switch
                id="isService"
                checked={isService}
                onCheckedChange={setIsService}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="isNegotiable">Prix négociable</Label>
                <p className="text-sm text-muted-foreground">
                  Les acheteurs peuvent proposer un prix différent
                </p>
              </div>
              <Switch
                id="isNegotiable"
                checked={isNegotiable}
                onCheckedChange={setIsNegotiable}
              />
            </div>
          </div>

          <div>
            <Button variant="outline" className="w-full gap-2">
              <Image className="h-4 w-4" />
              Ajouter des photos
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Les articles avec photos sont 3x plus susceptibles d'être vendus
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!title.trim() || !description.trim() || !price || !category || (!isService && !condition)}
              className="campus-gradient text-white hover:opacity-90"
            >
              Publier l'annonce
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}