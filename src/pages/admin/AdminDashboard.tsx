import { useState } from "react";
import { Users, FileText, Flag, TrendingUp, Shield, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalUsers: 1234,
    newUsersToday: 23,
    pendingResources: 12,
    reportedContent: 5,
    activeGroups: 89,
    totalResources: 456
  };

  const pendingResources = [
    {
      id: "1",
      title: "Notes Analyse Complexe M1",
      uploader: { name: "Marie D.", avatar: "/placeholder-avatar.jpg" },
      uploadDate: "il y a 2h",
      type: "Notes",
      subject: "Mathématiques",
      size: "4.2 MB"
    },
    {
      id: "2",
      title: "TD Corrigés Thermodynamique",
      uploader: { name: "Thomas M.", avatar: "/placeholder-avatar.jpg" },
      uploadDate: "il y a 5h",
      type: "Exercices",
      subject: "Physique",
      size: "2.8 MB"
    }
  ];

  const reportedContent = [
    {
      id: "1",
      type: "Post",
      content: "Message potentiellement offensant...",
      reporter: { name: "Alex C.", avatar: "/placeholder-avatar.jpg" },
      reason: "Contenu inapproprié",
      date: "il y a 1h",
      status: "pending"
    },
    {
      id: "2",
      type: "Commentaire",
      content: "Spam publicitaire...",
      reporter: { name: "Sophie L.", avatar: "/placeholder-avatar.jpg" },
      reason: "Spam",
      date: "il y a 3h",
      status: "pending"
    }
  ];

  const recentUsers = [
    {
      id: "1",
      name: "Emma Leroy",
      avatar: "/placeholder-avatar.jpg",
      email: "emma.l@example.com",
      joinDate: "il y a 2h",
      university: "Paris-Saclay",
      verified: false
    },
    {
      id: "2",
      name: "Lucas Moreau",
      avatar: "/placeholder-avatar.jpg",
      email: "lucas.m@example.com",
      joinDate: "il y a 5h",
      university: "Sorbonne",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-7xl mx-auto py-4 md:py-6 px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              Panel Administrateur
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Gérez les utilisateurs, contenus et ressources de CampusSphere
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          <Card className="campus-card">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
              <div className="text-xl md:text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Utilisateurs</p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-green-600">{stats.newUsersToday}</div>
              <p className="text-xs text-muted-foreground">Nouveaux/jour</p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-orange-600">{stats.pendingResources}</div>
              <p className="text-xs text-muted-foreground">En attente</p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-red-600">{stats.reportedContent}</div>
              <p className="text-xs text-muted-foreground">Signalements</p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-xl md:text-2xl font-bold">{stats.activeGroups}</div>
              <p className="text-xs text-muted-foreground">Groupes actifs</p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-xl md:text-2xl font-bold">{stats.totalResources}</div>
              <p className="text-xs text-muted-foreground">Ressources</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
            <TabsTrigger value="reports">Signalements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Recent Users */}
            <Card className="campus-card">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Nouveaux Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">{user.name}</p>
                            {user.verified && (
                              <Badge variant="secondary" className="text-xs">Vérifié</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          <p className="text-xs text-muted-foreground">{user.university}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-2">
                        <Button variant="outline" size="sm">Voir</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card className="campus-card">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Ressources en Attente de Validation</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {pendingResources.map((resource) => (
                    <div key={resource.id} className="p-4 rounded-lg border">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="outline">{resource.type}</Badge>
                            <Badge variant="secondary">{resource.subject}</Badge>
                          </div>
                          <h4 className="font-medium text-sm md:text-base mb-1">{resource.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={resource.uploader.avatar} />
                              <AvatarFallback className="text-xs">
                                {resource.uploader.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{resource.uploader.name}</span>
                            <span>·</span>
                            <span>{resource.uploadDate}</span>
                            <span>·</span>
                            <span>{resource.size}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="campus-gradient text-white gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Approuver
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-600 gap-1">
                            <XCircle className="h-3 w-3" />
                            Rejeter
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="campus-card">
              <CardHeader>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Contenus Signalés
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {reportedContent.map((report) => (
                    <div key={report.id} className="p-4 rounded-lg border border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="destructive">{report.type}</Badge>
                            <Badge variant="outline">{report.reason}</Badge>
                          </div>
                          <p className="text-sm mb-2 italic text-muted-foreground truncate">
                            "{report.content}"
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Signalé par</span>
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={report.reporter.avatar} />
                              <AvatarFallback className="text-xs">
                                {report.reporter.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{report.reporter.name}</span>
                            <span>·</span>
                            <span>{report.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Examiner</Button>
                          <Button size="sm" variant="destructive">Supprimer</Button>
                        </div>
                      </div>
                    </div>
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
