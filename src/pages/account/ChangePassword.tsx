import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function ChangePassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    if (passwords.new.length < 8) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
      });
      return;
    }

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
    
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-2xl mx-auto py-4 md:py-6 px-3 md:px-4">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/settings")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux paramètres
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold campus-gradient bg-clip-text text-transparent mb-6">
          Changer le mot de passe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Sécurité du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Mot de passe actuel</Label>
                <Input
                  id="current"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new">Nouveau mot de passe</Label>
                <Input
                  id="new"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Au moins 8 caractères, incluant des lettres et des chiffres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmer le nouveau mot de passe</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/settings")}
            >
              Annuler
            </Button>
            <Button type="submit" className="campus-gradient text-white hover:opacity-90">
              Changer le mot de passe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
