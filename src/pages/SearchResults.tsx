import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Users, Calendar, BookOpen, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(query);

  // Mock results
  const results = {
    users: [
      {
        id: "1",
        name: "Marie Dubois",
        username: "marie_d",
        avatar: "/placeholder-avatar.jpg",
        bio: "Étudiante en informatique"
      },
      {
        id: "2",
        name: "Thomas Martin",
        username: "thomas_m",
        avatar: "/placeholder-avatar.jpg",
        bio: "Passionné de design"
      }
    ],
    groups: [
      {
        id: "1",
        name: "Développeurs Web",
        members: 234,
        description: "Groupe pour les développeurs web"
      }
    ],
    events: [
      {
        id: "1",
        title: "Hackathon 2024",
        date: "15 Mars 2024",
        participants: 45
      }
    ],
    resources: [
      {
        id: "1",
        title: "Introduction à React",
        type: "PDF",
        author: "Prof. Dupont"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-4 md:py-6 px-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          {query && (
            <p className="text-sm text-muted-foreground mt-3">
              Résultats pour "<span className="font-semibold">{query}</span>"
            </p>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all" className="text-xs md:text-sm">Tout</TabsTrigger>
            <TabsTrigger value="users" className="text-xs md:text-sm">
              <Users className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Personnes</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="text-xs md:text-sm">Groupes</TabsTrigger>
            <TabsTrigger value="events" className="text-xs md:text-sm">Events</TabsTrigger>
            <TabsTrigger value="resources" className="text-xs md:text-sm">
              <span className="hidden md:inline">Ressources</span>
              <BookOpen className="h-4 w-4 md:hidden" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Users Section */}
            {results.users.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personnes
                </h3>
                <div className="space-y-2">
                  {results.users.map((user) => (
                    <Card key={user.id} className="campus-card">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                            <p className="text-sm text-muted-foreground truncate">{user.bio}</p>
                          </div>
                          <Button size="sm" variant="outline">Suivre</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Groups Section */}
            {results.groups.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Groupes</h3>
                <div className="space-y-2">
                  {results.groups.map((group) => (
                    <Card key={group.id} className="campus-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{group.name}</p>
                            <p className="text-sm text-muted-foreground">{group.members} membres</p>
                          </div>
                          <Button size="sm" className="campus-gradient text-white">Rejoindre</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-2">
              {results.users.map((user) => (
                <Card key={user.id} className="campus-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                      <Button size="sm" variant="outline">Suivre</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups">
            <p className="text-center text-muted-foreground py-8">
              Recherche dans les groupes...
            </p>
          </TabsContent>

          <TabsContent value="events">
            <p className="text-center text-muted-foreground py-8">
              Recherche dans les événements...
            </p>
          </TabsContent>

          <TabsContent value="resources">
            <p className="text-center text-muted-foreground py-8">
              Recherche dans les ressources...
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
