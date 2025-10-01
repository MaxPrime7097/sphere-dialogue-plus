import { useState } from "react";
import { Search, Filter, Upload, Download, FileText, Heart, Star, Eye, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const subjects = [
    { value: "all", label: "Toutes matières" },
    { value: "math", label: "Mathématiques" },
    { value: "cs", label: "Informatique" },
    { value: "physics", label: "Physique" },
    { value: "economics", label: "Économie" },
    { value: "language", label: "Langues" }
  ];

  const types = [
    { value: "all", label: "Tous types" },
    { value: "notes", label: "Notes de cours" },
    { value: "summary", label: "Résumés" },
    { value: "exercises", label: "Exercices" },
    { value: "projects", label: "Projets" },
    { value: "slides", label: "Présentations" }
  ];

  const resources = [
    {
      id: "1",
      title: "Notes Complètes - Algèbre Linéaire L2",
      description: "Mes notes de cours d'algèbre linéaire, très détaillées avec exemples",
      subject: "math",
      type: "notes",
      format: "pdf",
      size: "3.2 MB",
      pages: 45,
      uploader: {
        name: "Marie Dubois",
        avatar: "/placeholder-avatar.jpg",
        verified: true
      },
      uploadDate: "il y a 2j",
      downloads: 234,
      likes: 45,
      views: 567,
      rating: 4.7,
      reviews: 12,
      tags: ["L2", "algèbre", "matrices"]
    },
    {
      id: "2",
      title: "Résumé Python - Programmation Orientée Objet",
      description: "Fiche récap sur la POO en Python avec exemples de code",
      subject: "cs",
      type: "summary",
      format: "pdf",
      size: "1.8 MB",
      pages: 12,
      uploader: {
        name: "Alex Chen",
        avatar: "/placeholder-avatar.jpg",
        verified: false
      },
      uploadDate: "il y a 5j",
      downloads: 456,
      likes: 89,
      views: 1234,
      rating: 4.9,
      reviews: 28,
      tags: ["Python", "POO", "L3"]
    },
    {
      id: "3",
      title: "Exercices Corrigés - Mécanique Quantique",
      description: "Collection d'exercices avec corrections détaillées",
      subject: "physics",
      type: "exercises",
      format: "pdf",
      size: "5.6 MB",
      pages: 78,
      uploader: {
        name: "Thomas Martin",
        avatar: "/placeholder-avatar.jpg",
        verified: true
      },
      uploadDate: "il y a 1 semaine",
      downloads: 189,
      likes: 34,
      views: 445,
      rating: 4.6,
      reviews: 8,
      tags: ["Physique", "Quantique", "M1"]
    },
    {
      id: "4",
      title: "Projet React - Application E-commerce",
      description: "Code source complet d'un projet e-commerce en React + Node.js",
      subject: "cs",
      type: "projects",
      format: "zip",
      size: "15.4 MB",
      uploader: {
        name: "Sophie Laurent",
        avatar: "/placeholder-avatar.jpg",
        verified: true
      },
      uploadDate: "il y a 3j",
      downloads: 312,
      likes: 67,
      views: 892,
      rating: 4.8,
      reviews: 19,
      tags: ["React", "Node.js", "Fullstack"]
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-6xl mx-auto py-4 md:py-6 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              Ressources Étudiantes
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Partagez et accédez aux ressources de la communauté
            </p>
          </div>
          <Button className="campus-gradient text-white hover:opacity-90 gap-2 w-full sm:w-auto">
            <Upload className="h-4 w-4" />
            Partager une ressource
          </Button>
        </div>

        {/* Filters */}
        <Card className="campus-card mb-6">
          <CardContent className="p-3 md:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
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
                  {types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Plus de filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredResources.map((resource, index) => (
            <Card 
              key={resource.id}
              className="campus-card hover:campus-glow transition-all duration-300 campus-animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                {/* Resource Header */}
                <div className="flex gap-3 mb-3">
                  <div className="h-16 w-16 rounded-lg campus-gradient flex items-center justify-center flex-shrink-0">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {resource.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {types.find(t => t.value === resource.type)?.label}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {subjects.find(s => s.value === resource.subject)?.label}
                  </Badge>
                  {resource.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pb-3 border-b">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {resource.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {resource.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {resource.views}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{resource.rating}</span>
                    <span>({resource.reviews})</span>
                  </div>
                </div>

                {/* Uploader */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={resource.uploader.avatar} />
                      <AvatarFallback className="text-xs">
                        {resource.uploader.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <p className="font-medium">{resource.uploader.name}</p>
                      <p className="text-muted-foreground">{resource.uploadDate}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {resource.size}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Eye className="h-3 w-3" />
                    Voir
                  </Button>
                  <Button size="sm" className="flex-1 campus-gradient text-white hover:opacity-90 gap-1">
                    <Download className="h-3 w-3" />
                    Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune ressource trouvée</h3>
            <p className="text-muted-foreground mb-6">
              Soyez le premier à partager une ressource dans cette catégorie !
            </p>
            <Button className="campus-gradient text-white hover:opacity-90">
              Partager une ressource
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
