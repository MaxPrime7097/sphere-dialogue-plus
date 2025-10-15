import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Users, TrendingUp, MessageSquare, FileText, 
  CheckSquare, Settings, UserPlus, Share2, MoreVertical,
  Pin, Upload, Link as LinkIcon
} from "lucide-react";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";

export function SphereDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);

  // Mock sphere data
  const sphere = {
    id: id || "1",
    name: "Projet IA 2025",
    description: "Développement d'un système de recommandation intelligent pour améliorer l'expérience étudiante sur le campus",
    image: "/placeholder-gaming.jpg",
    color: "from-blue-500 to-purple-500",
    members: 12,
    category: "Projet",
    status: "En cours",
    progress: 65,
    admin: {
      name: "Alex Dubois",
      username: "alex_dubois",
      avatar: "/placeholder-avatar.jpg"
    },
    impactScore: 92,
    createdAt: "15 janvier 2025",
    tags: ["IA", "Machine Learning", "Python", "React"]
  };

  const members = [
    { id: "1", name: "Alex Dubois", role: "Admin", avatar: "/placeholder-avatar.jpg", username: "alex_dubois" },
    { id: "2", name: "Sophie Martin", role: "Contributeur", avatar: "/placeholder-avatar.jpg", username: "sophie_m" },
    { id: "3", name: "Lucas Petit", role: "Contributeur", avatar: "/placeholder-avatar.jpg", username: "lucas_dev" },
    { id: "4", name: "Emma Bernard", role: "Observateur", avatar: "/placeholder-avatar.jpg", username: "emma_b" }
  ];

  const tasks = [
    { id: "1", title: "Créer le dataset d'entraînement", status: "done", assignedTo: "Alex Dubois" },
    { id: "2", title: "Développer l'API backend", status: "in-progress", assignedTo: "Sophie Martin" },
    { id: "3", title: "Design de l'interface utilisateur", status: "in-progress", assignedTo: "Lucas Petit" },
    { id: "4", title: "Tests et optimisation", status: "todo", assignedTo: "Non assigné" }
  ];

  const resources = [
    { id: "1", name: "Dataset_V1.csv", type: "CSV", size: "2.5 MB", uploadedBy: "Alex Dubois" },
    { id: "2", name: "Architecture_Technique.pdf", type: "PDF", size: "1.2 MB", uploadedBy: "Sophie Martin" },
    { id: "3", name: "Maquettes_UI.fig", type: "Figma", size: "850 KB", uploadedBy: "Lucas Petit" }
  ];

  const posts = [
    {
      id: "1",
      author: {
        name: "Alex Dubois",
        avatar: "/placeholder-avatar.jpg",
        username: "alex_dubois",
        isVerified: true
      },
      content: "Premier milestone atteint ! Le modèle de base est fonctionnel 🎉",
      timestamp: "il y a 2h",
      likes: 8,
      comments: 3,
      isPinned: true
    },
    {
      id: "2",
      author: {
        name: "Sophie Martin",
        avatar: "/placeholder-avatar.jpg",
        username: "sophie_m",
        isVerified: false
      },
      content: "J'ai besoin d'aide pour optimiser les requêtes API. Quelqu'un dispo demain ?",
      timestamp: "il y a 5h",
      likes: 4,
      comments: 2
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-6xl mx-auto py-6 px-4 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/spheres")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux sphères
        </Button>

        {/* Header */}
        <Card className="campus-card overflow-hidden">
          {/* Banner */}
          <div className="relative h-48">
            <img
              src={sphere.image}
              alt={sphere.name}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${sphere.color} opacity-70`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white font-bold text-3xl text-center px-4">
                {sphere.name}
              </h1>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 space-y-4">
                <p className="text-foreground">{sphere.description}</p>

                <div className="flex flex-wrap gap-2">
                  {sphere.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {sphere.members} membres
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Impact: {sphere.impactScore}/100
                  </div>
                  <Badge variant="outline">{sphere.status}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progression globale</span>
                    <span className="font-semibold">{sphere.progress}%</span>
                  </div>
                  <Progress value={sphere.progress} className="h-2" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {!isMember ? (
                  <Button 
                    className="campus-gradient text-white hover:opacity-90 gap-2"
                    onClick={() => setIsMember(true)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Rejoindre
                  </Button>
                ) : (
                  <Button variant="outline" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </Button>
                )}
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Mur
            </TabsTrigger>
            <TabsTrigger value="tasks" className="gap-2">
              <CheckSquare className="h-4 w-4" />
              Tâches
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <FileText className="h-4 w-4" />
              Ressources
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2">
              <Users className="h-4 w-4" />
              Membres
            </TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-4 mt-6">
            {isMember && <CreatePost />}
            
            {posts.map((post) => (
              <div key={post.id} className="relative">
                {post.isPinned && (
                  <div className="absolute -top-2 left-4 z-10">
                    <Badge className="gap-1 bg-primary text-white">
                      <Pin className="h-3 w-3" />
                      Épinglé
                    </Badge>
                  </div>
                )}
                <PostCard post={post} />
              </div>
            ))}
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="mt-6">
            <Card className="campus-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestion des tâches</CardTitle>
                {isMember && (
                  <Button size="sm" className="campus-gradient text-white">
                    Nouvelle tâche
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <Card key={task.id} className="campus-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${
                            task.status === 'done' ? 'bg-success' :
                            task.status === 'in-progress' ? 'bg-warning' :
                            'bg-muted'
                          }`} />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Assigné à: {task.assignedTo}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {task.status === 'done' ? 'Terminé' :
                           task.status === 'in-progress' ? 'En cours' :
                           'À faire'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="mt-6">
            <Card className="campus-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Bibliothèque partagée</CardTitle>
                {isMember && (
                  <Button size="sm" className="campus-gradient text-white gap-2">
                    <Upload className="h-4 w-4" />
                    Ajouter
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource) => (
                  <Card key={resource.id} className="campus-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 campus-gradient rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{resource.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {resource.type} • {resource.size} • {resource.uploadedBy}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          Télécharger
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="mt-6">
            <Card className="campus-card">
              <CardHeader>
                <CardTitle>Membres ({members.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <Card key={member.id} className="campus-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="campus-gradient text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{member.name}</p>
                              <p className="text-sm text-muted-foreground">@{member.username}</p>
                              <Badge variant="secondary" className="text-xs mt-1">
                                {member.role}
                              </Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Profil
                          </Button>
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
