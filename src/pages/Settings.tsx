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
      <div className="container max-w-4xl mx-auto py-4 md:py-6 px-3 md:px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8 campus-animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 campus-gradient rounded-xl flex items-center justify-center">
              <img src="/CS.svg" alt="CampusSphere" className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold campus-gradient bg-clip-text text-transparent" style={{ fontFamily: 'Automata Display' }}>
              Paramètres
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Gérez vos préférences et votre compte
          </p>
        </div>

        <div className="grid gap-4 md:gap-6">
          {/* Notifications */}
          <Card className="campus-card">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Label htmlFor="posts-notifications" className="text-sm md:text-base">Posts et interactions</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
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

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Label htmlFor="messages-notifications" className="text-sm md:text-base">Messages</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
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

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Label htmlFor="events-notifications" className="text-sm md:text-base">Événements</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
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

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Label htmlFor="marketing-notifications" className="text-sm md:text-base">Communications marketing</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
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
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Globe className="h-4 w-4 md:h-5 md:w-5" />
                Apparence et langue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <Label className="text-sm md:text-base">Thème sombre</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Basculer entre le thème clair et sombre
                  </p>
                </div>
                <Button variant="outline" onClick={toggleTheme} size="sm" className="w-full sm:w-auto">
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
                <Label className="text-sm md:text-base">Langue de l'interface</Label>
                <Select defaultValue="fr">
                  <SelectTrigger className="w-full sm:w-48">
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
                <Label className="text-sm md:text-base">Fuseau horaire</Label>
                <Select defaultValue="europe-paris">
                  <SelectTrigger className="w-full sm:w-48">
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
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <section.icon className="h-4 w-4 md:h-5 md:w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 p-4 md:p-6 pt-0">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between h-auto p-3 md:p-4 text-sm md:text-base ${
                        item.danger ? 'text-destructive hover:text-destructive' : ''
                      }`}
                      onClick={item.action}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                    {itemIndex < section.items.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* À propos */}
          <Card className="campus-card">
            <CardContent className="pt-4 md:pt-6 p-4 md:p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 md:w-20 md:h-20 campus-gradient rounded-2xl flex items-center justify-center mx-auto p-3 md:p-4">
                  <img src="/CS.svg" alt="CampusSphere" className="w-full h-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl" style={{ fontFamily: 'Automata Display' }}>CampusSphere</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Version 1.0.0</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs md:text-sm">
                  <Button variant="link" className="px-0 h-auto">
                    Conditions d'utilisation
                  </Button>
                  <Button variant="link" className="px-0 h-auto">
                    Politique de confidentialité
                  </Button>
                  <Button variant="link" className="px-0 h-auto">
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