import { useState } from "react";
import { Heart, MessageCircle, Calendar, TrendingUp, BookOpen, Users, Smile, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export function Wellness() {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("");

  const moods = [
    { emoji: "😊", label: "Heureux", value: "happy" },
    { emoji: "😌", label: "Calme", value: "calm" },
    { emoji: "😐", label: "Neutre", value: "neutral" },
    { emoji: "😔", label: "Triste", value: "sad" },
    { emoji: "😰", label: "Anxieux", value: "anxious" },
    { emoji: "😤", label: "Stressé", value: "stressed" }
  ];

  const moodStats = {
    happy: 25,
    calm: 20,
    neutral: 30,
    sad: 10,
    anxious: 10,
    stressed: 5
  };

  const resources = [
    {
      id: "1",
      title: "Techniques de respiration anti-stress",
      description: "Exercices simples pour gérer l'anxiété pendant les examens",
      type: "guide",
      duration: "5 min",
      popularity: 89
    },
    {
      id: "2",
      title: "Méditation guidée pour étudiants",
      description: "Session de méditation spécialement conçue pour la vie étudiante",
      type: "audio",
      duration: "15 min",
      popularity: 76
    },
    {
      id: "3",
      title: "Gestion du temps et stress",
      description: "Stratégies pour organiser ses études sans s'épuiser",
      type: "article",
      duration: "8 min",
      popularity: 92
    },
    {
      id: "4",
      title: "Sommeil et performance académique",
      description: "L'importance du sommeil pour la réussite étudiante",
      type: "guide",
      duration: "12 min",
      popularity: 84
    }
  ];

  const upcomingEvents = [
    {
      id: "1",
      title: "Atelier Gestion du Stress",
      date: "Demain 14h",
      location: "Salle B204",
      attendees: 12
    },
    {
      id: "2", 
      title: "Séance Yoga Étudiant",
      date: "Vendredi 18h",
      location: "Gymnase",
      attendees: 18
    },
    {
      id: "3",
      title: "Groupe de Parole",
      date: "Lundi 16h",
      location: "Espace Bien-être",
      attendees: 8
    }
  ];

  const saveJournalEntry = () => {
    if (journalEntry.trim() && selectedMood) {
      console.log("Journal entry saved:", { mood: selectedMood, entry: journalEntry });
      setJournalEntry("");
      setSelectedMood("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-6xl mx-auto py-4 md:py-6 px-3 md:px-4 overflow-x-hidden">
        {/* Header */}
        <div className="text-center mb-8 campus-animate-fade-in">
          <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent mb-2">
            Espace Bien-être
          </h1>
          <p className="text-muted-foreground">
            Votre santé mentale est importante. Prenez soin de vous.
          </p>
        </div>

        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="journal" className="gap-2">
              <Heart className="h-4 w-4" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Ressources
            </TabsTrigger>
            <TabsTrigger value="support" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Support
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <Users className="h-4 w-4" />
              Activités
            </TabsTrigger>
          </TabsList>

          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Journal Entry */}
              <div className="lg:col-span-2">
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Mon journal émotionnel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Comment vous sentez-vous aujourd'hui ?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {moods.map((mood) => (
                          <Button
                            key={mood.value}
                            variant={selectedMood === mood.value ? "default" : "outline"}
                            size="sm"
                            className={`gap-2 ${selectedMood === mood.value ? "campus-gradient text-white" : ""}`}
                            onClick={() => setSelectedMood(mood.value)}
                          >
                            <span className="text-lg">{mood.emoji}</span>
                            {mood.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Partagez vos pensées...
                      </label>
                      <Textarea
                        placeholder="Décrivez votre journée, vos émotions, vos préoccupations ou vos victoires..."
                        value={journalEntry}
                        onChange={(e) => setJournalEntry(e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <Button 
                      onClick={saveJournalEntry}
                      disabled={!journalEntry.trim() || !selectedMood}
                      className="w-full campus-gradient text-white hover:opacity-90"
                    >
                      Enregistrer dans mon journal
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Mood Stats */}
              <div className="space-y-6">
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      Évolution émotionnelle
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {moods.map((mood) => (
                      <div key={mood.value} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            {mood.emoji} {mood.label}
                          </span>
                          <span>{moodStats[mood.value as keyof typeof moodStats]}%</span>
                        </div>
                        <Progress 
                          value={moodStats[mood.value as keyof typeof moodStats]} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Brain className="h-4 w-4" />
                      Conseil du jour
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      "Prenez 5 minutes par jour pour pratiquer la gratitude. 
                      Notez trois choses positives qui vous sont arrivées aujourd'hui."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {resources.map((resource) => (
                <Card key={resource.id} className="campus-card hover:campus-glow transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {resource.title}
                      </h3>
                      <Badge variant="outline" className="text-xs ml-2">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {resource.duration} • {resource.popularity}% utile
                      </span>
                      <Button size="sm" variant="outline">
                        Consulter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="campus-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Assistant IA Bien-être
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Assistant:</strong> Bonjour ! Je suis là pour vous aider. 
                      Comment vous sentez-vous aujourd'hui ? Y a-t-il quelque chose 
                      qui vous préoccupe ?
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Textarea 
                      placeholder="Partagez ce qui vous préoccupe..."
                      className="min-h-[80px]"
                    />
                    <Button className="w-full campus-gradient text-white hover:opacity-90">
                      Envoyer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="campus-card">
                <CardHeader>
                  <CardTitle>Contacts d'urgence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Service de Santé Étudiante</h4>
                      <p className="text-sm text-muted-foreground">01 23 45 67 89</p>
                      <p className="text-xs text-muted-foreground">Lun-Ven 9h-17h</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">SOS Amitié</h4>
                      <p className="text-sm text-muted-foreground">09 72 39 40 50</p>
                      <p className="text-xs text-muted-foreground">24h/24, 7j/7</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Urgences</h4>
                      <p className="text-sm text-muted-foreground">15 (SAMU) - 112 (Urgences)</p>
                      <p className="text-xs text-muted-foreground">24h/24, 7j/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="campus-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Événements à venir
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg hover:bg-accent/20 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {event.attendees} participants
                          </Badge>
                          <Button size="sm" variant="outline" className="mt-2 block">
                            S'inscrire
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="campus-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smile className="h-5 w-5" />
                    Activités recommandées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Marche en nature</h4>
                      <p className="text-xs text-muted-foreground">
                        20 minutes de marche dans le parc universitaire
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Commencer
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Pause relaxation</h4>
                      <p className="text-xs text-muted-foreground">
                        Exercices de respiration guidés de 5 minutes
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Commencer
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Journal de gratitude</h4>
                      <p className="text-xs text-muted-foreground">
                        Notez 3 choses positives de votre journée
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Commencer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}