import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Users, TrendingUp, Clock, Sparkles, Filter } from "lucide-react";
import { CreateSphereModal } from "@/components/modals/CreateSphereModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const spheres = [
  {
    id: "1",
    name: "Projet IA 2025",
    description: "Développement d'un système de recommandation intelligent pour le campus",
    image: "/placeholder-gaming.jpg",
    color: "from-blue-500 to-purple-500",
    members: 12,
    category: "Projet",
    status: "En cours",
    progress: 65,
    admin: "Alex Dubois",
    impactScore: 92
  },
  {
    id: "2",
    name: "Designers CampusSphere",
    description: "Créer les meilleures interfaces pour notre communauté",
    image: "/placeholder-gaming.jpg",
    color: "from-pink-500 to-orange-500",
    members: 8,
    category: "Créatif",
    status: "En cours",
    progress: 40,
    admin: "Sophie Martin",
    impactScore: 85
  },
  {
    id: "3",
    name: "Aide nouveaux étudiants",
    description: "Accompagner et guider les nouveaux arrivants sur le campus",
    image: "/placeholder-gaming.jpg",
    color: "from-green-500 to-teal-500",
    members: 24,
    category: "Entraide",
    status: "Actif",
    progress: 100,
    admin: "Lucas Dubois",
    impactScore: 98
  },
  {
    id: "4",
    name: "Club Python",
    description: "Apprendre et partager des connaissances en programmation Python",
    image: "/placeholder-gaming.jpg",
    color: "from-yellow-500 to-green-500",
    members: 18,
    category: "Apprentissage",
    status: "En cours",
    progress: 55,
    admin: "Marie Leroy",
    impactScore: 88
  }
];

export function Spheres() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredSpheres = spheres.filter(sphere => {
    const matchesSearch = sphere.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sphere.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || sphere.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", label: "Toutes" },
    ...Array.from(new Set(spheres.map(s => s.category))).map(cat => ({ id: cat, label: cat }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-6xl mx-auto py-4 md:py-6 px-3 md:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 campus-animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              Sphères Collaboratives
            </h1>
            <p className="text-muted-foreground mt-2">
              Rejoignez des projets, apprenez ensemble et créez l'impact
            </p>
          </div>
          <CreateSphereModal>
            <Button size="sm" className="campus-gradient text-white hover:opacity-90 gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="inline">Créer</span>
            </Button>
          </CreateSphereModal>
        </div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="discover" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Découvrir
            </TabsTrigger>
            <TabsTrigger value="my-spheres" className="gap-2">
              <Users className="h-4 w-4" />
              Mes sphères
            </TabsTrigger>
            <TabsTrigger value="top" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Top
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-4">
            {/* Filters */}
            <Card className="campus-card">
              <CardContent className="p-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher une sphère..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                    <span className="hidden lg:inline ml-2">Filtres</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              {filteredSpheres.map((sphere) => (
                <Card
                  key={sphere.id}
                  className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/spheres/${sphere.id}`)}
                >
                  <CardContent className="p-3">
                    <div className={`aspect-video bg-gradient-to-br ${sphere.color} rounded-lg flex items-center justify-center mb-3 text-white font-bold text-2xl`}>
                      {sphere.name.charAt(0)}
                    </div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {sphere.category}
                    </Badge>
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                      {sphere.name}
                    </h3>
                    <div className="space-y-1 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {sphere.members} membres
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {sphere.impactScore} impact
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full h-7 text-xs campus-gradient text-white"
                    >
                      Rejoindre
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSpheres.length === 0 && (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucune sphère trouvée pour "{searchQuery}"
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-spheres" className="space-y-4">
            <Card className="campus-card mb-4">
              <CardContent className="p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher mes sphères..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              {spheres.slice(0, 2).map((sphere) => (
                <Card
                  key={sphere.id}
                  className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/spheres/${sphere.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${sphere.color} mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl`}>
                      {sphere.name.charAt(0)}
                    </div>
                    <CardTitle className="text-sm text-center line-clamp-1">
                      {sphere.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground text-center">
                      {sphere.members} membres
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 px-3 pb-3">
                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="font-semibold">{sphere.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full bg-gradient-to-r ${sphere.color}`}
                          style={{ width: `${sphere.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top" className="space-y-4">
            <Card className="campus-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Top Sphères du mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {spheres
                    .sort((a, b) => b.impactScore - a.impactScore)
                    .slice(0, 5)
                    .map((sphere, index) => (
                      <Card
                        key={sphere.id}
                        className="campus-card cursor-pointer hover:campus-glow transition-all"
                        onClick={() => navigate(`/spheres/${sphere.id}`)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${sphere.color} flex items-center justify-center text-white font-bold text-sm`}>
                              #{index + 1}
                            </div>
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${sphere.color} flex items-center justify-center text-white font-bold`}>
                              {sphere.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{sphere.name}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {sphere.members} membres
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-primary font-bold">
                                ⚡ {sphere.impactScore}
                              </div>
                              <Badge variant="secondary" className="text-xs mt-1">
                                {sphere.category}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
