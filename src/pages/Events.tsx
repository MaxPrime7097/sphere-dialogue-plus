import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateEventModal } from "@/components/modals/CreateEventModal";

export function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const events = [
    {
      id: "1",
      title: "Hackathon IA 2024",
      description: "48h pour créer une solution innovante utilisant l'intelligence artificielle",
      date: "2024-02-15",
      time: "09:00",
      location: "Amphi A - Bâtiment principal",
      organizer: "Club Informatique",
      attendees: 45,
      maxAttendees: 50,
      category: "tech",
      isAttending: true,
      image: "/placeholder-hackathon.jpg"
    },
    {
      id: "2",
      title: "Soirée Networking",
      description: "Rencontrez des professionnels et développez votre réseau",
      date: "2024-02-18",
      time: "18:30",
      location: "Cafétéria - 2ème étage",
      organizer: "Bureau des Étudiants",
      attendees: 78,
      maxAttendees: 100,
      category: "networking",
      isAttending: false,
      image: "/placeholder-networking.jpg"
    },
    {
      id: "3",
      title: "Conférence Entrepreneuriat",
      description: "Les clés pour créer sa startup étudiante",
      date: "2024-02-20",
      time: "14:00",
      location: "Salle de conférence B",
      organizer: "Incubateur Campus",
      attendees: 32,
      maxAttendees: 80,
      category: "business",
      isAttending: true,
      image: "/placeholder-conference.jpg"
    },
    {
      id: "4",
      title: "Tournoi Esports",
      description: "Compétition inter-campus sur League of Legends",
      date: "2024-02-22",
      time: "16:00",
      location: "Salle informatique",
      organizer: "Gaming Club",
      attendees: 24,
      maxAttendees: 32,
      category: "sport",
      isAttending: false,
      image: "/placeholder-esports.jpg"
    },
    {
      id: "5",
      title: "Atelier Photo",
      description: "Techniques de photographie portrait et paysage",
      date: "2024-02-25",
      time: "10:00",
      location: "Studio photo",
      organizer: "Club Photo",
      attendees: 15,
      maxAttendees: 20,
      category: "creative",
      isAttending: false,
      image: "/placeholder-photo.jpg"
    }
  ];

  const categories = [
    { id: "all", label: "Tous", color: "primary" },
    { id: "tech", label: "Tech", color: "blue" },
    { id: "networking", label: "Networking", color: "green" }, 
    { id: "business", label: "Business", color: "purple" },
    { id: "sport", label: "Sport", color: "red" },
    { id: "creative", label: "Créatif", color: "orange" }
  ];

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const toggleAttendance = (eventId: string) => {
    // Logique pour gérer la participation aux événements
    console.log("Toggle attendance for event:", eventId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-7xl mx-auto py-4 md:py-6 px-3 md:px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 campus-animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              Événements Campus
            </h1>
            <p className="text-muted-foreground mt-2">
              Découvrez et participez aux événements de votre campus
            </p>
          </div>
          <CreateEventModal>
            <Button className="campus-gradient text-white hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" />
              Créer un événement
            </Button>
          </CreateEventModal>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Calendar */}
            

            {/* Filters */}
            <Card className="campus-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Catégories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      selectedCategory === category.id 
                        ? "campus-gradient text-white" 
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="upcoming">À venir</TabsTrigger>
                <TabsTrigger value="my-events">Mes événements</TabsTrigger>
                <TabsTrigger value="past">Passés</TabsTrigger>
                <TabsTrigger value="calendar">Calendrier</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                <div className="grid gap-3 grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
                  {filteredEvents.map((event, index) => (
                    <Card
                    key={event.id} 
                    className="campus-card hover:campus-glow transition-all duration-300 campus-animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-4">
                        {/* Event Image */}
                        <div className="md:col-span-1">
                          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                            <Calendar className="h-8 w-8 text-primary" />
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="md:col-span-2 space-y-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.id === event.category)?.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {event.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(event.date).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {event.attendees}/{event.maxAttendees} participants
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground">
                            Organisé par {event.organizer}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-1 flex flex-col justify-between">
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground mb-2">
                              Places restantes: {event.maxAttendees - event.attendees}
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="campus-gradient h-2 rounded-full"
                                style={{ 
                                  width: `${(event.attendees / event.maxAttendees) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>

                          <Button
                            variant={event.isAttending ? "outline" : "default"}
                            size="sm"
                            className={!event.isAttending ? "campus-gradient text-white hover:opacity-90" : ""}
                            onClick={() => toggleAttendance(event.id)}
                          >
                            {event.isAttending ? "Ne plus participer" : "Participer"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my-events" className="space-y-4">
                {events
                  .filter(event => event.isAttending)
                  .map((event) => (
                    <Card key={event.id} className="campus-card">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Inscrit
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Aucun événement passé pour le moment
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="space-y-4">
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Calendrier</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-0"
                    />  
                  </CardContent>
                </Card>
              </TabsContent>      

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}