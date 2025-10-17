import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function PersonalInfo() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Dubois",
    email: "alex.dubois@example.com",
    phone: "+33 6 12 34 56 78",
    bio: "Étudiant passionné par l'informatique",
    birthDate: "1999-06-15"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Informations mises à jour",
      description: "Vos informations personnelles ont été enregistrées.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-3xl mx-auto py-4 md:py-6 px-3 md:px-4">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/settings")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux paramètres
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold campus-gradient bg-clip-text text-transparent mb-6">
          Informations personnelles
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Détails du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Date de naissance</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="min-h-[100px] resize-none"
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
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
