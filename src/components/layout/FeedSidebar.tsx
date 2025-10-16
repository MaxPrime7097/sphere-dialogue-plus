import { TrendingUp, Calendar, Users, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const trendingTopics = [
  { tag: "#IA2025", posts: 234 },
  { tag: "#ProjectPython", posts: 189 },
  { tag: "#StudyGroup", posts: 156 },
  { tag: "#CampusLife", posts: 142 }
];

const upcomingEvents = [
  { id: "1", title: "Conférence IA", date: "Demain 14h", participants: 45 },
  { id: "2", title: "Hackathon 48h", date: "Samedi 9h", participants: 120 },
  { id: "3", title: "Job Fair", date: "Lundi 10h", participants: 200 }
];

const topContributors = [
  { name: "Max Prime", avatar: "/placeholder-avatar.jpg", score: 1245, field: "IA" },
  { name: "Emma Laurent", avatar: "/placeholder-avatar.jpg", score: 1189, field: "Physique" },
  { name: "Lucas Martin", avatar: "/placeholder-avatar.jpg", score: 1098, field: "Maths" }
];

export function FeedSidebar() {
  return (
    <div className="space-y-4 sticky top-20">
      {/* Trending Topics */}
      <Card className="campus-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Tendances du moment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic) => (
            <div key={topic.tag} className="flex items-center justify-between cursor-pointer hover:bg-accent/50 p-2 rounded-lg transition-colors">
              <span className="font-medium text-sm text-primary">{topic.tag}</span>
              <Badge variant="secondary" className="text-xs">{topic.posts} posts</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="campus-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Événements à venir
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="space-y-1 cursor-pointer hover:bg-accent/50 p-2 rounded-lg transition-colors">
              <div className="font-medium text-sm">{event.title}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{event.date}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {event.participants}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="campus-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Top Contributeurs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div key={contributor.name} className="flex items-center gap-3 cursor-pointer hover:bg-accent/50 p-2 rounded-lg transition-colors">
              <div className="flex items-center justify-center w-6 h-6 rounded-full campus-gradient text-white text-xs font-bold">
                {index + 1}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={contributor.avatar} />
                <AvatarFallback className="campus-gradient text-white text-xs">
                  {contributor.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{contributor.name}</div>
                <div className="text-xs text-muted-foreground">{contributor.field}</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-primary">⚡{contributor.score}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Resource */}
      <Card className="campus-card campus-gradient text-white">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-sm">Besoin d'aide ?</div>
              <p className="text-xs opacity-90">
                Explore la bibliothèque de ressources partagées par la communauté
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}