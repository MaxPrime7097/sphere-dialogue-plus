import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, Search, Filter, UserPlus, Heart, MessageCircle, Bell, Bookmark } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateGroupModal } from "@/components/modals/CreateGroupModal";
import { PostCard } from "@/components/feed/PostCard";

export function Groups() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const handleJoinGroup = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    toast({ title: "Demande envoyée !", description: "Vous recevrez une notification dès validation." });
  };

  const handleLike = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    toast({ title: "Groupe liké !" });
  };

  const handleMessage = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    navigate('/messages');
  };

  const handleNotify = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    toast({ title: "Notifications activées !" });
  };

  // Mock group posts
  const groupPosts = [
    {
      id: "1",
      author: {
        name: "Marie Dubois",
        username: "marie_dubois",
        avatar: "/placeholder-avatar.jpg",
        isVerified: true
      },
      content: "Nouveau tutoriel React disponible ! N'hésitez pas à le consulter 🚀",
      timestamp: "il y a 2h",
      likes: 45,
      comments: 12,
      category: "Tutoriel"
    },
    {
      id: "2",
      author: {
        name: "Thomas Chen",
        username: "thomas_chen",
        avatar: "/placeholder-avatar.jpg",
        isVerified: false
      },
      content: "Qui est dispo pour une session de code ce soir ?",
      timestamp: "il y a 4h",
      likes: 23,
      comments: 8,
      category: "Question"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-6xl mx-auto py-4 md:py-6 px-3 md:px-4">
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
          <CreateGroupModal>
            <Button size="sm" className="campus-gradient text-white hover:opacity-90 gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Créer</span>
            </Button>
          </CreateGroupModal>
        </div>

        <Tabs defaultValue="my-groups" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="my-groups" className="gap-2">
              <Users className="h-4 w-4" />
              Mes groupes
            </TabsTrigger>
            <TabsTrigger value="feed" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Fil
            </TabsTrigger>
            <TabsTrigger value="discover" className="gap-2">
              <Search className="h-4 w-4" />
              Découvrir
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-groups" className="space-y-4">
            {/* Filters */}
            <Card className="campus-card mb-4">
              <CardContent className="p-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher mes groupes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              {myGroups.map((group) => (
                <Card 
                  key={group.id} 
                  className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/groups/${group.id}`)}
                >
                  <CardHeader className="pb-3">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback className="campus-gradient text-white font-semibold">
                        {group.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-sm text-center line-clamp-1">
                      {group.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground text-center">
                      {group.members} membres
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 px-3 pb-3">
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 flex-1 text-xs"
                        onClick={(e) => handleLike(e, group.id)}
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 flex-1 text-xs"
                        onClick={(e) => handleMessage(e, group.id)}
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="h-7 flex-1 text-xs campus-gradient text-white"
                        onClick={(e) => handleNotify(e, group.id)}
                      >
                        <Bell className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feed" className="space-y-4">
            {groupPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="discover" className="space-y-4">
            {/* Filters */}
            <Card className="campus-card">
              <CardContent className="p-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher des groupes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Groups */}
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              {filteredDiscoverGroups.map((group) => (
                <Card 
                  key={group.id} 
                  className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/groups/${group.id}`)}
                >
                  <CardHeader className="pb-2">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback className="campus-gradient text-white font-semibold">
                        {group.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-sm text-center line-clamp-1">
                      {group.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground text-center">
                      {group.members} membres
                    </p>
                    <Badge variant="outline" className="text-xs mx-auto mb-2">
                      {group.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0 px-3 pb-3">
                    <Button 
                      size="sm" 
                      className="w-full h-7 text-xs campus-gradient text-white"
                      onClick={(e) => handleJoinGroup(e, group.id)}
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
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