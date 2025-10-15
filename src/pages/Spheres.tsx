import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Users, TrendingUp, Clock, Sparkles } from "lucide-react";
import { CreateSphereModal } from "@/components/modals/CreateSphereModal";

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
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredSpheres = spheres.filter(sphere => {
    const matchesSearch = sphere.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sphere.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || sphere.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(spheres.map(s => s.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-6xl mx-auto py-6 px-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              Sphères Collaboratives
            </h1>
            <p className="text-muted-foreground mt-1">
              Rejoignez des projets, apprenez ensemble et créez l'impact
            </p>
          </div>
          <CreateSphereModal>
            <Button className="campus-gradient text-white hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" />
              Créer une Sphère
            </Button>
          </CreateSphereModal>
        </div>

        {/* Search & Filters */}
        <Card className="campus-card">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une sphère..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={filterCategory === null ? "default" : "outline"}
                onClick={() => setFilterCategory(null)}
              >
                Toutes
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  size="sm"
                  variant={filterCategory === category ? "default" : "outline"}
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Spheres */}
        <Card className="campus-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Sphères du mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {spheres
                .sort((a, b) => b.impactScore - a.impactScore)
                .slice(0, 3)
                .map((sphere, index) => (
                  <Card
                    key={sphere.id}
                    className="campus-card cursor-pointer hover:campus-glow transition-all relative overflow-hidden"
                    onClick={() => navigate(`/spheres/${sphere.id}`)}
                  >
                    <div className={`absolute top-2 right-2 bg-gradient-to-r ${sphere.color} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                      #{index + 1}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${sphere.color} flex items-center justify-center text-white font-bold text-lg`}>
                          {sphere.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{sphere.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {sphere.members} membres
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {sphere.category}
                        </Badge>
                        <div className="text-primary font-bold text-sm">
                          ⚡ {sphere.impactScore}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* All Spheres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSpheres.map((sphere) => (
            <Card
              key={sphere.id}
              className="campus-card cursor-pointer hover:campus-glow transition-all overflow-hidden"
              onClick={() => navigate(`/spheres/${sphere.id}`)}
            >
              <div className="relative h-32">
                <img
                  src={sphere.image}
                  alt={sphere.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${sphere.color} opacity-60`} />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-bold text-lg">{sphere.name}</h3>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {sphere.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {sphere.members}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {sphere.status}
                    </Badge>
                  </div>
                  <div className="text-primary font-bold">
                    ⚡ {sphere.impactScore}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progression</span>
                    <span className="font-semibold">{sphere.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${sphere.color}`}
                      style={{ width: `${sphere.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-xs">AD</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    Admin: {sphere.admin}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSpheres.length === 0 && (
          <Card className="campus-card">
            <CardContent className="p-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aucune sphère trouvée. Essayez d'autres critères de recherche.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
