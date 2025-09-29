import { useState } from "react";
import { User, Bell, Shield, Globe, Moon, Sun, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    posts: true,
    messages: true,
    events: true,
    marketing: false
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const settingsSections = [
    {
      title: "Compte",
      icon: User,
      items: [
        { label: "Informations personnelles", action: () => {} },
        { label: "Mot de passe", action: () => {} },
        { label: "Email et authentification", action: () => {} },
        { label: "Supprimer le compte", action: () => {}, danger: true }
      ]
    },
    {
      title: "Confidentialité",
      icon: Shield,
      items: [
        { label: "Qui peut voir mon profil", action: () => {} },
        { label: "Visibilité des posts", action: () => {} },
        { label: "Données et téléchargements", action: () => {} },
        { label: "Blocages", action: () => {} }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="mb-8 campus-animate-fade-in">
          <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent">
            Paramètres
          </h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos préférences et votre compte
          </p>
        </div>

        <div className="grid gap-6">
          {/* Notifications */}
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="posts-notifications">Posts et interactions</Label>
                  <p className="text-sm text-muted-foreground">
                    Likes, commentaires et mentions
                  </p>
                </div>
                <Switch
                  id="posts-notifications"
                  checked={notifications.posts}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, posts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="messages-notifications">Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Nouveaux messages privés et de groupe
                  </p>
                </div>
                <Switch
                  id="messages-notifications"
                  checked={notifications.messages}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, messages: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="events-notifications">Événements</Label>
                  <p className="text-sm text-muted-foreground">
                    Rappels et nouveaux événements
                  </p>
                </div>
                <Switch
                  id="events-notifications"
                  checked={notifications.events}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, events: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-notifications">Communications marketing</Label>
                  <p className="text-sm text-muted-foreground">
                    Nouveautés et conseils d'utilisation
                  </p>
                </div>
                <Switch
                  id="marketing-notifications"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, marketing: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Apparence */}
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Apparence et langue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Thème sombre</Label>
                  <p className="text-sm text-muted-foreground">
                    Basculer entre le thème clair et sombre
                  </p>
                </div>
                <Button variant="outline" onClick={toggleTheme}>
                  {darkMode ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Clair
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Sombre
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Langue de l'interface</Label>
                <Select defaultValue="fr">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fuseau horaire</Label>
                <Select defaultValue="europe-paris">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                    <SelectItem value="europe-london">Europe/London</SelectItem>
                    <SelectItem value="america-new-york">America/New_York</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Autres paramètres */}
          {settingsSections.map((section, index) => (
            <Card key={index} className="campus-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between h-auto p-4 ${
                        item.danger ? 'text-destructive hover:text-destructive' : ''
                      }`}
                      onClick={item.action}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    {itemIndex < section.items.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* À propos */}
          <Card className="campus-card">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 campus-gradient rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">CS</span>
                </div>
                <div>
                  <h3 className="font-semibold">CampusSphere</h3>
                  <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                </div>
                <div className="flex justify-center gap-4 text-sm">
                  <Button variant="link" className="px-0">
                    Conditions d'utilisation
                  </Button>
                  <Button variant="link" className="px-0">
                    Politique de confidentialité
                  </Button>
                  <Button variant="link" className="px-0">
                    Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}