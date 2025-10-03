import { useNavigate } from "react-router-dom";
import { Users, Target, Heart, Zap, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Users,
      title: "Communauté",
      description: "Créer des liens authentiques entre étudiants du monde entier"
    },
    {
      icon: BookOpen,
      title: "Partage",
      description: "Faciliter l'échange de connaissances et ressources académiques"
    },
    {
      icon: Heart,
      title: "Bien-être",
      description: "Promouvoir la santé mentale et le soutien entre pairs"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Utiliser la technologie pour améliorer l'expérience étudiante"
    }
  ];

  const team = [
    {
      name: "Nlend Max",
      role: "Fondateur & CEO",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Kana Tommi",
      role: "Co-fondateur & Head of Design",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Hussein Boris",
      role: "CTO & Backend Dev",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Nounga Nathan",
      role: "CMO & Assistant Dev",
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto py-12 md:py-20 px-4">
        <div className="text-center mb-16">
          <img src="/CS.svg" alt="CampusSphere" className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold font-automata campus-gradient bg-clip-text text-transparent mb-6">
            À propos de CampusSphere
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Le réseau social qui connecte les étudiants et enrichit l'expérience universitaire
          </p>
        </div>

        {/* Mission */}
        <Card className="campus-card mb-16">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Notre Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              CampusSphere a été créé pour transformer l'expérience étudiante en créant un espace
              numérique où les étudiants peuvent se connecter, collaborer et s'épanouir ensemble.
              Nous croyons que l'université ne se limite pas aux cours - c'est une communauté
              vibrante où les idées, les ressources et le soutien circulent librement.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="campus-card hover:campus-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full campus-gradient mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <Card className="campus-card mb-16">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                CampusSphere est né d'une observation simple : les étudiants avaient besoin d'un espace
                dédié qui comprenait vraiment leurs besoins. Les réseaux sociaux généralistes ne
                permettaient pas de créer cette synergie unique qui existe entre étudiants.
              </p>
              <p>
                En 2023, une équipe d'anciens étudiants et de développeurs passionnés s'est réunie
                avec une vision claire : créer une plateforme qui facilite les connexions significatives,
                le partage de ressources académiques, et le soutien mutuel entre étudiants.
              </p>
              <p>
                Aujourd'hui, CampusSphere rassemble des milliers d'étudiants de différentes universités,
                créant une communauté dynamique où chacun peut trouver sa place, apprendre, partager et grandir.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">L'Équipe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="campus-card text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full campus-gradient flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.slice(0, 2)}
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="campus-card campus-gradient text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Rejoignez la Communauté
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Des milliers d'étudiants vous attendent sur CampusSphere
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/register")}
                className="gap-2"
              >
                Créer un compte
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/contact")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Nous contacter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
