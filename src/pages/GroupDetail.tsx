import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Settings, Bell, Share2, ChevronLeft, MessageCircle, Calendar, BookOpen, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/feed/PostCard";

export function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);

  const group = {
    id: id || "1",
    name: "Développement Web",
    description: "Communauté dédiée au développement web moderne et aux technologies front-end et back-end",
    fullDescription: `Notre groupe rassemble des étudiants passionnés par le développement web. Que vous soyez débutant ou expérimenté, rejoignez-nous pour partager vos connaissances, poser vos questions et collaborer sur des projets.

**Ce que nous proposons :**
- Discussions techniques quotidiennes
- Partage de ressources et tutoriels
- Projets collaboratifs
- Sessions de code review
- Meetups réguliers

**Règles du groupe :**
1. Respect et bienveillance envers tous les membres
2. Pas de spam ou autopromotion excessive
3. Partagez des ressources de qualité
4. Aidez les autres membres quand vous le pouvez`,
    members: 156,
    category: "Tech",
    avatar: "/placeholder-group.jpg",
    cover: "/placeholder-cover.jpg",
    isPrivate: false,
    admins: [
      { name: "Alice Martin", avatar: "/placeholder-avatar.jpg", role: "Fondatrice" },
      { name: "Bob Chen", avatar: "/placeholder-avatar.jpg", role: "Modérateur" }
    ],
    stats: {
      posts: 342,
      events: 12,
      resources: 48
    },
    recentPosts: [
      {
        id: "1",
        author: {
          name: "Max Prime",
          avatar: "/placeholder-avatar.jpg",
          username: "cypher",
          isVerified: true
        },
        content: "Quelqu'un a testé le nouveau framework Astro ? Vos retours ?",
        timestamp: "il y a 1h",
        likes: 8,
        comments: 5,
        category: "Discussion"
      },
      {
        id: "2",
        author: {
          name: "Sophie L.",
          avatar: "/placeholder-avatar.jpg",
          username: "sophie_dev"
        },
        content: "Super article sur les Web Components ! Je partage 🔥",
        timestamp: "il y a 3h",
        likes: 15,
        comments: 3,
        category: "Ressource"
      }
    ],
    upcomingEvents: [
      {
        id: "1",
        title: "Workshop React Advanced",
        date: "2024-02-20",
        time: "14:00",
        attendees: 24
      },
      {
        id: "2",
        title: "Code Review Session",
        date: "2024-02-25",
        time: "16:00",
        attendees: 18
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-5xl mx-auto py-4 px-4 md:py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 gap-2"
          onClick={() => navigate("/groups")}
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux groupes
        </Button>

        {/* Group Header */}
        <Card className="campus-card mb-4">
          <CardContent className="p-0">
            {/* Cover Image */}
            <div className="h-32 md:h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-t-lg" />

            <div className="p-4 md:p-6">
              {/* Group Info */}
              <div className="flex flex-col md:flex-row gap-4 -mt-16 md:-mt-20 mb-4">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
                  <AvatarImage src={group.avatar} />
                  <AvatarFallback className="campus-gradient text-white text-2xl font-bold">
                    {group.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3 mt-4 md:mt-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold">{group.name}</h1>
                        {!group.isPrivate && <Badge variant="outline">Public</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {group.members} membres
                        </span>
                        <Badge variant="secondary">{group.category}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      className="campus-gradient text-white hover:opacity-90"
                      onClick={() => setIsMember(!isMember)}
                    >
                      {isMember ? "Membre" : "Rejoindre le groupe"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-accent/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold campus-gradient bg-clip-text text-transparent">
                    {group.stats.posts}
                  </div>
                  <div className="text-xs text-muted-foreground">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold campus-gradient bg-clip-text text-transparent">
                    {group.stats.events}
                  </div>
                  <div className="text-xs text-muted-foreground">Événements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold campus-gradient bg-clip-text text-transparent">
                    {group.stats.resources}
                  </div>
                  <div className="text-xs text-muted-foreground">Ressources</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="members">Membres</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {group.recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="about">
            <Card className="campus-card">
              <CardContent className="p-4 md:p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap text-muted-foreground">
                    {group.fullDescription}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Administrateurs</h3>
                  <div className="space-y-3">
                    {group.admins.map((admin, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={admin.avatar} />
                          <AvatarFallback>{admin.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{admin.name}</span>
                            <Crown className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">{admin.role}</span>
                        </div>
                        <Button variant="outline" size="sm">Message</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card className="campus-card">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-4">Événements à venir</h3>
                <div className="space-y-3">
                  {group.upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent cursor-pointer">
                      <div className="h-12 w-12 rounded-lg campus-gradient flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{event.attendees} participants</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="campus-card">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-4">{group.members} Membres</h3>
                <div className="text-center py-8 text-muted-foreground">
                  Liste des membres à implémenter
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
