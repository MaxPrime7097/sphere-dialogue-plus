import { useState } from "react";
import { Search, Filter, Download, BookOpen, FileText, Video, Headphones, Eye, Heart, Star, Bookmark } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const subjects = [
    { value: "all", label: "Toutes matières" },
    { value: "math", label: "Mathématiques" },
    { value: "cs", label: "Informatique" },
    { value: "physics", label: "Physique" },
    { value: "economics", label: "Économie" },
    { value: "literature", label: "Littérature" },
    { value: "history", label: "Histoire" },
    { value: "language", label: "Langues" }
  ];

  const documentTypes = [
    { value: "all", label: "Tous types" },
    { value: "course", label: "Cours" },
    { value: "exercise", label: "Exercices" },
    { value: "exam", label: "Examens" },
    { value: "book", label: "Livres" },
    { value: "video", label: "Vidéos" },
    { value: "audio", label: "Audio" }
  ];

  const resources = [
    {
      id: "1",
      title: "Algèbre Linéaire - Cours Complet",
      description: "Cours magistral complet sur l'algèbre linéaire avec exercices corrigés",
      type: "course",
      subject: "math",
      format: "pdf",
      size: "15.2 MB",
      pages: 342,
      downloads: 1205,
      likes: 89,
      rating: 4.8,
      professor: "Prof. Martin Dubois",
      university: "Université Paris-Saclay",
      year: "2024",
      uploadedBy: {
        name: "Alice Martin",
        avatar: "/placeholder-avatar.jpg"
      },
      tags: ["algèbre", "matrices", "vecteurs", "L2"],
      lastUpdated: "il y a 2j"
    },
    {
      id: "2",
      title: "Introduction aux Algorithmes",
      description: "Manuel de référence pour l'étude des algorithmes et structures de données",
      type: "book",
      subject: "cs",
      format: "epub",
      size: "8.7 MB",
      pages: 1180,
      downloads: 892,
      likes: 156,
      rating: 4.9,
      professor: "Thomas H. Cormen",
      university: "MIT Press",
      year: "2023",
      uploadedBy: {
        name: "Thomas Chen",
        avatar: "/placeholder-avatar.jpg"
      },
      tags: ["algorithmes", "structures", "complexité", "L3"],
      lastUpdated: "il y a 1 semaine"
    },
    {
      id: "3",
      title: "Physique Quantique - TD Corrigés",
      description: "Travaux dirigés avec corrections détaillées en physique quantique",
      type: "exercise",
      subject: "physics",
      format: "pdf",
      size: "12.4 MB",
      pages: 89,
      downloads: 654,
      likes: 73,
      rating: 4.6,
      professor: "Dr. Sarah Johnson",
      university: "École Polytechnique",
      year: "2024",
      uploadedBy: {
        name: "Sophie Laurent",
        avatar: "/placeholder-avatar.jpg"
      },
      tags: ["quantique", "TD", "correction", "M1"],
      lastUpdated: "il y a 3j"
    },
    {
      id: "4",
      title: "Macroéconomie - Cours Vidéo",
      description: "Série de cours vidéo sur les principes de la macroéconomie moderne",
      type: "video",
      subject: "economics",
      format: "mp4",
      size: "2.1 GB",
      duration: "8h 45min",
      downloads: 423,
      likes: 95,
      rating: 4.7,
      professor: "Prof. Jean Tirole",
      university: "Toulouse School of Economics",
      year: "2024",
      uploadedBy: {
        name: "Marc Durand",
        avatar: "/placeholder-avatar.jpg"
      },
      tags: ["macroéconomie", "politique", "monétaire", "L3"],
      lastUpdated: "il y a 5j"
    },
    {
      id: "5",
      title: "Annales Examen Analyse",
      description: "Collection d'examens d'analyse mathématique des 5 dernières années",
      type: "exam",
      subject: "math",
      format: "pdf",
      size: "6.8 MB",
      pages: 156,
      downloads: 1867,
      likes: 201,
      rating: 4.9,
      professor: "Multiple",
      university: "Sorbonne Université",
      year: "2019-2024",
      uploadedBy: {
        name: "Emma Leroy",
        avatar: "/placeholder-avatar.jpg"
      },
      tags: ["analyse", "examen", "annales", "L2"],
      lastUpdated: "il y a 1j"
    }
  ];

  const recentlyViewed = [
    {
      id: "1",
      title: "Algèbre Linéaire - Cours Complet",
      viewedAt: "il y a 2h"
    },
    {
      id: "3",
      title: "Physique Quantique - TD Corrigés",
      viewedAt: "hier"
    }
  ];

  const favorites = resources.filter(r => [1, 2, 5].includes(parseInt(r.id)));

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'epub':
        return <BookOpen className="h-4 w-4" />;
      case 'mp4':
        return <Video className="h-4 w-4" />;
      case 'mp3':
        return <Headphones className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800';
      case 'exercise': return 'bg-green-100 text-green-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'book': return 'bg-purple-100 text-purple-800';
      case 'video': return 'bg-orange-100 text-orange-800';
      case 'audio': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePreview = (e: React.MouseEvent, resourceId: string) => {
    e.stopPropagation();
    toast({ title: "Aperçu en cours..." });
  };

  const handleDownload = (e: React.MouseEvent, resourceId: string) => {
    e.stopPropagation();
    toast({ title: "Téléchargement démarré !" });
  };

  const handleSave = (e: React.MouseEvent, resourceId: string) => {
    e.stopPropagation();
    toast({ title: "Ajouté aux favoris !" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-7xl mx-auto py-4 md:py-6 px-3 md:px-4">
        {/* Header */}
        <div className="mb-6 campus-animate-fade-in">
          <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent mb-2">
            Bibliothèque Campus
          </h1>
          <p className="text-muted-foreground">
            Accédez à une vaste collection de cours et livres
          </p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="browse" className="gap-2">
              <Search className="h-4 w-4" />
              Parcourir
            </TabsTrigger>
            <TabsTrigger value="recent" className="gap-2">
              <Eye className="h-4 w-4" />
              Récents
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Favoris
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card className="campus-card">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher des ressources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Matière" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden lg:inline">Filtres</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resources Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {filteredResources.map((resource, index) => (
                <Card 
                  key={resource.id} 
                  className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer campus-animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-3">
                    <div className="h-24 rounded-lg campus-gradient flex items-center justify-center mb-3">
                      {getFormatIcon(resource.format)}
                    </div>
                    <Badge className={`${getTypeColor(resource.type)} text-xs mb-2`}>
                      {documentTypes.find(t => t.value === resource.type)?.label}
                    </Badge>
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                      {resource.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {resource.rating}
                      </span>
                      <span>{resource.downloads} DL</span>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 flex-1 text-xs"
                        onClick={(e) => handlePreview(e, resource.id)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 flex-1 text-xs"
                        onClick={(e) => handleSave(e, resource.id)}
                      >
                        <Bookmark className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="h-7 flex-1 text-xs campus-gradient text-white"
                        onClick={(e) => handleDownload(e, resource.id)}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune ressource trouvée</h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {recentlyViewed.length === 0 ? (
              <div className="text-center py-12">
                <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune ressource récente</h3>
                <p className="text-muted-foreground">
                  Les ressources que vous consultez apparaîtront ici
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentlyViewed.map((item) => {
                  const resource = resources.find(r => r.id === item.id);
                  return resource ? (
                    <Card key={item.id} className="campus-card">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Consulté {item.viewedAt}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Rouvrir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : null;
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun favori</h3>
                <p className="text-muted-foreground">
                  Ajoutez des ressources à vos favoris pour les retrouver facilement
                </p>
              </div>
            ) : (
              <div className="grid gap-3 grid-cols-2 md:grid-cols-2">
                {favorites.map((resource) => (
                  <Card key={resource.id} className="campus-card">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold line-clamp-2">{resource.title}</h4>
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {resource.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge className={getTypeColor(resource.type)}>
                          {documentTypes.find(t => t.value === resource.type)?.label}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Ouvrir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}