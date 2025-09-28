import { useState } from "react";
import { Search, Download, BookOpen, FileText, Video, Headphones, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const resources = [
    {
      id: "1",
      title: "Introduction à l'Intelligence Artificielle",
      description: "Cours complet sur les fondamentaux de l'IA avec exercices pratiques",
      type: "pdf",
      subject: "informatique",
      author: "Prof. Martin Dubois",
      pages: 156,
      size: "12.5 MB",
      downloads: 2340,
      rating: 4.8,
      reviews: 67,
      thumbnail: "/placeholder-pdf.jpg",
      tags: ["IA", "Machine Learning", "Python"]
    },
    {
      id: "2",
      title: "Analyse Mathématique - Série d'exercices",
      description: "Exercices corrigés d'analyse niveau L2 avec méthodes détaillées",
      type: "pdf",
      subject: "mathematiques",
      author: "Prof. Sophie Chen",
      pages: 89,
      size: "8.2 MB",
      downloads: 1876,
      rating: 4.6,
      reviews: 43,
      thumbnail: "/placeholder-math.jpg",
      tags: ["Analyse", "Exercices", "Corrections"]
    },
    {
      id: "3",
      title: "Conférence: Future of Web Development",
      description: "Enregistrement de la conférence sur les nouvelles technologies web",
      type: "video",
      subject: "informatique",
      author: "Dr. Alex Rodriguez",
      duration: "1h 45min",
      size: "2.1 GB",
      downloads: 892,
      rating: 4.9,
      reviews: 28,
      thumbnail: "/placeholder-video.jpg",
      tags: ["React", "Next.js", "TypeScript"]
    },
    {
      id: "4",
      title: "Podcast: Entrepreneuriat Étudiant",
      description: "Série de podcasts sur la création d'entreprise pendant les études",
      type: "audio",
      subject: "business",
      author: "Équipe Incubateur",
      duration: "45min",
      size: "65 MB",
      downloads: 567,
      rating: 4.7,
      reviews: 19,
      thumbnail: "/placeholder-podcast.jpg",
      tags: ["Startup", "Business", "Conseils"]
    },
    {
      id: "5",
      title: "Physique Quantique - Notes de cours",
      description: "Notes détaillées du cours de physique quantique avec schémas",
      type: "document",
      subject: "physique",
      author: "Prof. Marie Laurent",
      pages: 134,
      size: "15.8 MB",
      downloads: 1205,
      rating: 4.5,
      reviews: 31,
      thumbnail: "/placeholder-physics.jpg",
      tags: ["Quantique", "Théorie", "Formules"]
    },
    {
      id: "6",
      title: "Chimie Organique - Travaux Pratiques",
      description: "Guide complet des TP de chimie organique avec protocoles",
      type: "pdf",
      subject: "chimie",
      author: "Dr. Thomas Moreau",
      pages: 78,
      size: "6.4 MB",
      downloads: 934,
      rating: 4.4,
      reviews: 22,
      thumbnail: "/placeholder-chemistry.jpg",
      tags: ["Organique", "TP", "Protocoles"]
    }
  ];

  const subjects = [
    { id: "all", label: "Toutes matières" },
    { id: "informatique", label: "Informatique" },
    { id: "mathematiques", label: "Mathématiques" },
    { id: "physique", label: "Physique" },
    { id: "chimie", label: "Chimie" },
    { id: "business", label: "Business" },
    { id: "langues", label: "Langues" }
  ];

  const resourceTypes = [
    { id: "all", label: "Tous types" },
    { id: "pdf", label: "PDF" },
    { id: "document", label: "Documents" },
    { id: "video", label: "Vidéos" },
    { id: "audio", label: "Audio" }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return FileText;
      case "video":
        return Video;
      case "audio":
        return Headphones;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      case "document":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      case "video":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
      case "audio":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="text-center mb-8 campus-animate-fade-in">
          <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent mb-2">
            Bibliothèque Numérique
          </h1>
          <p className="text-muted-foreground">
            Accédez à toutes les ressources académiques de votre campus
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="campus-card mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans la bibliothèque..."
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
                    <SelectItem key={subject.id} value={subject.id}>
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
                  {resourceTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="grid">Vue grille</TabsTrigger>
            <TabsTrigger value="list">Vue liste</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = getTypeIcon(resource.type);
                
                return (
                  <Card 
                    key={resource.id} 
                    className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer campus-animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm line-clamp-2">
                              {resource.title}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {resource.author}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <div>
                          {resource.pages ? `${resource.pages} pages` : resource.duration}
                        </div>
                        <div>{resource.size}</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {resource.rating}
                        </div>
                        <div>{resource.downloads} téléchargements</div>
                      </div>

                      <Button size="sm" className="w-full campus-gradient text-white hover:opacity-90 gap-2">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            {filteredResources.map((resource, index) => {
              const IconComponent = getTypeIcon(resource.type);
              
              return (
                <Card 
                  key={resource.id} 
                  className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer campus-animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-3 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {resource.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {resource.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Par {resource.author}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <div>{resource.pages ? `${resource.pages} pages` : resource.duration}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {resource.rating} ({resource.reviews})
                        </div>
                      </div>

                      <div className="text-right">
                        <Button size="sm" className="campus-gradient text-white hover:opacity-90 gap-2">
                          <Download className="h-4 w-4" />
                          Télécharger
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          {resource.downloads} téléchargements
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune ressource trouvée</h3>
            <p className="text-muted-foreground mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button variant="outline">
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}