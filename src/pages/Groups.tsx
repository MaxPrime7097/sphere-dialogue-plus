import { useState } from "react";
import { Users, Plus, Search, Crown, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Groups() {
  const [searchTerm, setSearchTerm] = useState("");

  const myGroups = [
    {
      id: "1",
      name: "Développement Web",
      description: "Partage de ressources et discussions sur le développement web moderne",
      members: 156,
      isAdmin: true,
      avatar: "/placeholder-group.jpg",
      lastActivity: "il y a 2h",
      newMessages: 3
    },
    {
      id: "2", 
      name: "Intelligence Artificielle",
      description: "Exploration des concepts et applications de l'IA",
      members: 89,
      isAdmin: false,
      avatar: "/placeholder-group.jpg",
      lastActivity: "il y a 1j",
      newMessages: 0
    },
    {
      id: "3",
      name: "Gaming Campus",
      description: "Communauté des gamers du campus, événements esports",
      members: 234,
      isAdmin: false,
      avatar: "/placeholder-group.jpg", 
      lastActivity: "il y a 4h",
      newMessages: 12
    }
  ];

  const discoverGroups = [
    {
      id: "4",
      name: "Photographie",
      description: "Partagez vos plus beaux clichés et techniques photo",
      members: 67,
      avatar: "/placeholder-group.jpg",
      category: "Créatif"
    },
    {
      id: "5",
      name: "Startups & Entrepreneuriat", 
      description: "Réseau d'entrepreneurs étudiants et futurs innovateurs",
      members: 123,
      avatar: "/placeholder-group.jpg",
      category: "Business"
    },
    {
      id: "6",
      name: "Sport & Fitness",
      description: "Motivation, conseils et sessions sportives entre étudiants",
      members: 198,
      avatar: "/placeholder-group.jpg",
      category: "Sport"
    },
    {
      id: "7",
      name: "Cuisine Étudiante",
      description: "Recettes simples et économiques pour étudiants",
      members: 145,
      avatar: "/placeholder-group.jpg",
      category: "Lifestyle"
    }
  ];

  const filteredDiscoverGroups = discoverGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 campus-animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              Groupes & Communautés
            </h1>
            <p className="text-muted-foreground mt-2">
              Connectez-vous avec des étudiants partageant vos passions
            </p>
          </div>
          <Button className="campus-gradient text-white hover:opacity-90 gap-2">
            <Plus className="h-4 w-4" />
            Créer un groupe
          </Button>
        </div>

        <Tabs defaultValue="my-groups" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-groups" className="gap-2">
              <Users className="h-4 w-4" />
              Mes groupes
            </TabsTrigger>
            <TabsTrigger value="discover" className="gap-2">
              <Search className="h-4 w-4" />
              Découvrir
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-groups" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myGroups.map((group) => (
                <Card key={group.id} className="campus-card hover:campus-glow transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={group.avatar} />
                          <AvatarFallback className="campus-gradient text-white font-semibold">
                            {group.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{group.name}</CardTitle>
                            {group.isAdmin && (
                              <Crown className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {group.members} membres
                          </p>
                        </div>
                      </div>
                      {group.newMessages > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {group.newMessages}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {group.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {group.lastActivity}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discover" className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des groupes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Suggested Groups */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDiscoverGroups.map((group) => (
                <Card key={group.id} className="campus-card hover:campus-glow transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={group.avatar} />
                        <AvatarFallback className="campus-gradient text-white font-semibold">
                          {group.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{group.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">
                            {group.members} membres
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {group.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {group.description}
                    </p>
                    <Button 
                      className="w-full campus-gradient text-white hover:opacity-90"
                      size="sm"
                    >
                      Rejoindre
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDiscoverGroups.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Aucun groupe trouvé pour "{searchTerm}"
                </p>
                <Button variant="outline" className="mt-4">
                  Créer ce groupe
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}