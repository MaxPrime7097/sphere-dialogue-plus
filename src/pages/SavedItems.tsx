import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/feed/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, ShoppingBag } from "lucide-react";

export function SavedItems() {
  // Mock saved posts
  const savedPosts = [
    {
      id: "1",
      author: {
        name: "Marie Dubois",
        avatar: "/placeholder-avatar.jpg",
        username: "marie_d",
        isVerified: true
      },
      content: "Super article sur React ! À lire absolument 📚",
      timestamp: "il y a 2h",
      likes: 12,
      comments: 3,
      category: "Ressource"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent mb-6">
          Éléments enregistrés
        </h1>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="resources">
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Ressources</span>
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace">
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Marketplace</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {savedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="resources">
            <Card className="campus-card">
              <CardContent className="p-8 text-center text-muted-foreground">
                Aucune ressource enregistrée
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card className="campus-card">
              <CardContent className="p-8 text-center text-muted-foreground">
                Aucun événement enregistré
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace">
            <Card className="campus-card">
              <CardContent className="p-8 text-center text-muted-foreground">
                Aucune annonce enregistrée
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
