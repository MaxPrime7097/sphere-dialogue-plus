import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Users, Lock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface CreateGroupModalProps {
  children: React.ReactNode;
}

export function CreateGroupModal({ children }: CreateGroupModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const groupSchema = z.object({
    name: z.string()
      .trim()
      .min(3, { message: t('modals.createGroup.nameMin', { defaultValue: "Le nom doit contenir au moins 3 caractères" }) })
      .max(50, { message: t('modals.createGroup.nameTooLong') }),
    description: z.string()
      .trim()
      .min(10, { message: t('modals.createGroup.descMin', { defaultValue: "La description doit contenir au moins 10 caractères" }) })
      .max(500, { message: t('modals.createGroup.descriptionTooLong') }),
    category: z.string().min(1, { message: t('modals.createGroup.categoryRequired') }),
  });

  const categories = [
    { value: "academic", label: t('modals.createGroup.categories.academic') },
    { value: "creative", label: t('modals.createGroup.categories.creative', { defaultValue: "Créatif" }) },
    { value: "sport", label: t('modals.createGroup.categories.sport', { defaultValue: "Sport" }) },
    { value: "tech", label: t('modals.createGroup.categories.tech', { defaultValue: "Technologie" }) },
    { value: "business", label: t('modals.createGroup.categories.business', { defaultValue: "Business" }) },
    { value: "lifestyle", label: t('modals.createGroup.categories.lifestyle', { defaultValue: "Lifestyle" }) },
    { value: "gaming", label: t('modals.createGroup.categories.gaming', { defaultValue: "Gaming" }) },
    { value: "other", label: t('modals.createGroup.categories.other', { defaultValue: "Autre" }) }
  ];

  const handleSubmit = () => {
    const validation = groupSchema.safeParse({ name, description, category });
    
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: t('modals.createGroup.validationFailed', { defaultValue: "Validation échouée" }),
        description: validation.error.errors[0].message,
      });
      return;
    }

    toast({
      title: t('modals.createGroup.toast.created'),
      description: t('modals.createGroup.toast.createdDesc'),
    });
    
    // Reset form
    setName("");
    setDescription("");
    setCategory("");
    setIsPrivate(false);
    setRequireApproval(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-popover">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('modals.createGroup.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupName">{t('modals.createGroup.name')}</Label>
            <Input
              id="groupName"
              placeholder={t('modals.createGroup.namePlaceholder', { defaultValue: "Ex : Développement Web 2024" })}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
              maxLength={50}
            />
          </div>

          <div>
            <Label htmlFor="groupDescription">{t('modals.createGroup.description')}</Label>
            <Textarea
              id="groupDescription"
              placeholder={t('modals.createGroup.descPlaceholder', { defaultValue: "Décrivez le but et les activités de votre groupe..." })}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] mt-2"
              maxLength={500}
            />
          </div>

          <div>
            <Label htmlFor="groupCategory">{t('modals.createGroup.category')}</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2 bg-popover">
                <SelectValue placeholder={t('modals.createGroup.selectCategory', { defaultValue: "Sélectionnez une catégorie" })} />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
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
                  <Label htmlFor="private">{t('modals.createGroup.privateGroup')}</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('modals.createGroup.privateDesc', { defaultValue: "Les groupes privés ne sont pas visibles dans la recherche" })}
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
                <Label htmlFor="approval">{t('modals.createGroup.requireApproval')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('modals.createGroup.approvalDesc', { defaultValue: "Les nouvelles demandes doivent être approuvées par un admin" })}
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
              {t('modals.createGroup.cancel')}
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!name.trim() || !description.trim() || !category}
              className="campus-gradient text-white hover:opacity-90"
            >
              {t('modals.createGroup.create')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
