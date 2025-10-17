import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Plus, Filter, Search, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateEventModal } from "@/components/modals/CreateEventModal";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Events() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const toggleAttendance = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    toast({ title: "Inscription confirmée !", description: "Vous avez rejoint cet événement." });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-7xl mx-auto py-4 md:py-6 px-3 md:px-4 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 campus-animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              Événements Campus
            </h1>
            <p className="text-muted-foreground mt-2">
              Découvrez et participez aux événements de votre campus
            </p>
          </div>
          <CreateEventModal>
            <Button size="sm" className="campus-gradient text-white hover:opacity-90 gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="inline">Créer</span>
            </Button>
          </CreateEventModal>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Events List */}
          <div className="lg:col-span-4">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="upcoming">À venir</TabsTrigger>
                <TabsTrigger value="my-events">Mes événements</TabsTrigger>
                <TabsTrigger value="past">Passés</TabsTrigger>
                <TabsTrigger value="calendar">Calendrier</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {/* Filters */}
                <Card className="campus-card">
                  <CardContent className="p-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Rechercher des événements..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                        <span className="hidden lg:inline ml-2">Filtres</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
                  {filteredEvents.filter(e => 
                    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.description.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((event) => (
                    <Card
                      key={event.id} 
                      className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <CardContent className="p-3">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-3">
                          <Calendar className="h-12 w-12 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {categories.find(c => c.id === event.category)?.label}
                        </Badge>
                        <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(event.date).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees}/{event.maxAttendees}
                          </div>
                        </div>
                        {event.isAttending ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full h-7 text-xs"
                            disabled
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Inscrit
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            className="w-full h-7 text-xs campus-gradient text-white"
                            onClick={(e) => toggleAttendance(e, event.id)}
                          >
                            S'inscrire
                          </Button>
                        )}
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