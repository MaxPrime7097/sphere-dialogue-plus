import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export function EmailAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("alex.dubois@example.com");
  const [emailVerified, setEmailVerified] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleVerifyEmail = () => {
    toast({
      title: "Email de vérification envoyé",
      description: "Vérifiez votre boîte de réception.",
    });
  };

  const handleToggleTwoFactor = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    toast({
      title: checked ? "Authentification à deux facteurs activée" : "Authentification à deux facteurs désactivée",
      description: checked ? "Votre compte est maintenant plus sécurisé." : "L'authentification à deux facteurs a été désactivée.",
    });
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
          Email & Authentification
        </h1>

        <div className="space-y-6">
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Adresse email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email principal</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  {emailVerified && (
                    <div className="flex items-center gap-2 text-green-600 px-3 bg-green-50 rounded-md">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Vérifié</span>
                    </div>
                  )}
                </div>
              </div>

              {!emailVerified && (
                <Button
                  variant="outline"
                  onClick={handleVerifyEmail}
                  className="w-full"
                >
                  Vérifier l'email
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="2fa" className="text-base">Authentification à deux facteurs</Label>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggleTwoFactor}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="email-notifs" className="text-base">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications sur votre adresse email
                  </p>
                </div>
                <Switch
                  id="email-notifs"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Emails de sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                  <span>Connexions depuis un nouvel appareil</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                  <span>Changement de mot de passe</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                  <span>Modifications du profil</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
