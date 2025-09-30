import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, UserPlus, Calendar, BookOpen, Bell } from "lucide-react";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "event" | "resource" | "mention";
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

export function Notifications() {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "like",
      user: { name: "Marie Dubois", avatar: "/placeholder-avatar.jpg" },
      content: "a aimé votre post",
      timestamp: "il y a 5min",
      read: false
    },
    {
      id: "2",
      type: "comment",
      user: { name: "Thomas Martin", avatar: "/placeholder-avatar.jpg" },
      content: "a commenté votre post",
      timestamp: "il y a 10min",
      read: false
    },
    {
      id: "3",
      type: "follow",
      user: { name: "Sophie Chen", avatar: "/placeholder-avatar.jpg" },
      content: "a commencé à vous suivre",
      timestamp: "il y a 1h",
      read: true
    },
    {
      id: "4",
      type: "event",
      user: { name: "Alex Rodriguez", avatar: "/placeholder-avatar.jpg" },
      content: "vous a invité à un événement",
      timestamp: "il y a 2h",
      read: true
    },
    {
      id: "5",
      type: "resource",
      user: { name: "Lucas Petit", avatar: "/placeholder-avatar.jpg" },
      content: "a partagé une ressource",
      timestamp: "il y a 3h",
      read: true
    }
  ];

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-orange-500" />;
      case "resource":
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue{unreadCount > 1 ? "s" : ""}
              </p>
            )}
          </div>
          
          <Button variant="outline" size="sm">
            Tout marquer comme lu
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`campus-card cursor-pointer hover:border-primary/50 transition-colors ${
                  !notif.read ? "bg-primary/5" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={notif.user.avatar} />
                      <AvatarFallback>{notif.user.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">{notif.user.name}</span>{" "}
                            {notif.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notif.timestamp}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getIcon(notif.type)}
                          {!notif.read && (
                            <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="interactions">
            <p className="text-center text-muted-foreground py-8">
              Filtrer les notifications d'interactions...
            </p>
          </TabsContent>

          <TabsContent value="events">
            <p className="text-center text-muted-foreground py-8">
              Filtrer les notifications d'événements...
            </p>
          </TabsContent>

          <TabsContent value="resources">
            <p className="text-center text-muted-foreground py-8">
              Filtrer les notifications de ressources...
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
