import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Share2, Heart, ChevronLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAttending, setIsAttending] = useState(false);

  // Mock data - à remplacer par un vrai appel API
  const event = {
    id: id || "1",
    title: "Hackathon IA 2024",
    description: "48h pour créer une solution innovante utilisant l'intelligence artificielle. Participez seul ou en équipe (max 4 personnes). Les projets seront évalués par un jury de professionnels. De nombreux prix à gagner !",
    fullDescription: `Le Hackathon IA 2024 est l'événement tech de l'année sur notre campus. Durant 48 heures non-stop, vous aurez l'opportunité de travailler sur des projets innovants utilisant l'intelligence artificielle.

**Ce qui vous attend :**
- Workspace 24/7 avec WiFi haut débit
- Repas et boissons fournis
- Mentors experts disponibles
- Workshops techniques
- Accès à des APIs premium
- Networking avec des professionnels

**Les prix :**
1er prix : 2000€ + incubation startup
2ème prix : 1000€
3ème prix : 500€
Prix du public : 300€`,
    date: "2024-02-15",
    endDate: "2024-02-17",
    time: "09:00",
    endTime: "17:00",
    location: "Amphi A - Bâtiment principal",
    locationDetails: "Campus Nord, Bâtiment A, 1er étage",
    organizer: {
      name: "Club Informatique",
      avatar: "/placeholder-avatar.jpg",
      members: 234
    },
    attendees: 45,
    maxAttendees: 50,
    category: "tech",
    image: "/placeholder-hackathon.jpg",
    attendeesList: [
      { name: "Alice Martin", avatar: "/placeholder-avatar.jpg" },
      { name: "Bob Chen", avatar: "/placeholder-avatar.jpg" },
      { name: "Charlie Dubois", avatar: "/placeholder-avatar.jpg" },
      { name: "Diana Laurent", avatar: "/placeholder-avatar.jpg" }
    ],
    discussions: [
      {
        id: "1",
        author: { name: "Max Prime", avatar: "/placeholder-avatar.jpg" },
        content: "Est-ce qu'on peut amener son propre matériel ?",
        timestamp: "il y a 2h",
        replies: 1
      },
      {
        id: "2",
        author: { name: "Sophie L.", avatar: "/placeholder-avatar.jpg" },
        content: "Y'aura t-il des mentors spécialisés en NLP ?",
        timestamp: "il y a 5h",
        replies: 0
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-4 px-4 md:py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 gap-2"
          onClick={() => navigate("/events")}
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux événements
        </Button>

        {/* Event Header */}
        <Card className="campus-card mb-4">
          <CardContent className="p-0">
            {/* Event Image */}
            <div className="aspect-video md:aspect-[21/9] bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
              <Calendar className="h-16 w-16 md:h-20 md:w-20 text-primary" />
            </div>

            <div className="p-4 md:p-6">
              {/* Title & Category */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="campus-gradient text-white">Tech</Badge>
                  <Badge variant="outline">48 heures</Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h1>
                <p className="text-muted-foreground">{event.description}</p>
              </div>

              {/* Event Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(event.date).toLocaleDateString('fr-FR')} - {new Date(event.endDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time} - {event.endTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{event.attendees}/{event.maxAttendees} participants</span>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-center justify-between mb-4 p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>{event.organizer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Organisé par</p>
                    <p className="text-sm text-muted-foreground">{event.organizer.name} · {event.organizer.members} membres</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Suivre</Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  className="flex-1 campus-gradient text-white hover:opacity-90"
                  onClick={() => setIsAttending(!isAttending)}
                >
                  {isAttending ? "Ne plus participer" : "Participer"}
                </Button>
                <Button variant="outline" size="icon" className="sm:w-auto">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="sm:w-auto">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Attendance Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{event.attendees} participants</span>
                  <span>{event.maxAttendees - event.attendees} places restantes</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="campus-gradient h-2 rounded-full transition-all"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="attendees">Participants</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card className="campus-card">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-4">Description complète</h3>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-muted-foreground">
                  {event.fullDescription}
                </div>
                <Separator className="my-6" />
                <div>
                  <h4 className="font-semibold mb-2">Lieu</h4>
                  <p className="text-sm text-muted-foreground">{event.locationDetails}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendees">
            <Card className="campus-card">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-4">
                  {event.attendees} Participants
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {event.attendeesList.map((attendee, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent cursor-pointer">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={attendee.avatar} />
                        <AvatarFallback>{attendee.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-center font-medium truncate w-full">{attendee.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion">
            <Card className="campus-card">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-4">Discussion</h3>
                <div className="space-y-4">
                  {event.discussions.map((discussion) => (
                    <div key={discussion.id} className="flex gap-3 p-3 rounded-lg hover:bg-accent">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={discussion.author.avatar} />
                        <AvatarFallback>{discussion.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{discussion.author.name}</span>
                          <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{discussion.content}</p>
                        {discussion.replies > 0 && (
                          <Button variant="ghost" size="sm" className="mt-2 h-6 text-xs gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {discussion.replies} réponse{discussion.replies > 1 ? 's' : ''}
                          </Button>
                        )}
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
