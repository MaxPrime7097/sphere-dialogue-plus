import { useState } from "react";
import { ArrowRight, Users, Calendar, BookOpen, MessageSquare, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Users,
      title: "Réseau social étudiant",
      description: "Connectez-vous avec vos camarades de classe et élargissez votre réseau",
      color: "text-blue-500"
    },
    {
      icon: Calendar,
      title: "Événements campus",
      description: "Découvrez et participez aux événements de votre université",
      color: "text-green-500"
    },
    {
      icon: BookOpen,
      title: "Bibliothèque digitale",
      description: "Accédez à des ressources académiques partagées par la communauté",
      color: "text-purple-500"
    },
    {
      icon: MessageSquare,
      title: "Messagerie instantanée",
      description: "Communiquez en temps réel avec vos groupes d'étude",
      color: "text-primary"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Étudiante en Informatique",
      content: "CampusSphere m'a aidée à trouver mon groupe d'étude parfait !",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Thomas Martin",
      role: "Master en Commerce",
      content: "La plateforme idéale pour organiser des événements étudiants.",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Sophie Chen",
      role: "Doctorante en Sciences",
      content: "Une communauté bienveillante et des ressources incroyables.",
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 campus-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="text-xl font-bold campus-gradient bg-clip-text text-transparent">
              CampusSphere
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Connexion
            </Button>
            <Button 
              className="campus-gradient text-white hover:opacity-90"
              onClick={() => navigate('/register')}
            >
              S'inscrire
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="campus-gradient bg-clip-text text-transparent">
                  Connectez-vous
                </span>
                <br />
                avec votre campus
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                CampusSphere est le réseau social conçu pour les étudiants. 
                Échangez, collaborez et grandissez ensemble dans votre parcours académique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="campus-gradient text-white hover:opacity-90"
                  onClick={() => navigate('/register')}
                >
                  Rejoindre gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Découvrir les fonctionnalités
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="campus-glass rounded-2xl p-8 campus-glow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 campus-gradient rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">15,000+ étudiants</p>
                      <p className="text-sm text-muted-foreground">déjà connectés</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 campus-gradient rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">500+ événements</p>
                      <p className="text-sm text-muted-foreground">organisés ce mois</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 campus-gradient rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">4.8/5 étoiles</p>
                      <p className="text-sm text-muted-foreground">note moyenne</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour enrichir votre expérience étudiante
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`campus-card cursor-pointer transition-all duration-300 ${
                  activeFeature === index ? 'campus-glow scale-105' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 ${feature.color}`}>
                    <feature.icon className="w-full h-full" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ce que disent nos étudiants
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="campus-card">
                <CardContent className="p-6">
                  <p className="mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 campus-gradient rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à rejoindre votre communauté ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Inscrivez-vous gratuitement et découvrez tout ce que CampusSphere peut vous offrir
          </p>
          <Button 
            size="lg" 
            className="campus-gradient text-white hover:opacity-90"
            onClick={() => navigate('/register')}
          >
            Commencer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 campus-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CS</span>
                </div>
                <span className="text-xl font-bold">CampusSphere</span>
              </div>
              <p className="text-muted-foreground mb-4">
                La plateforme qui connecte les étudiants et enrichit l'expérience universitaire.
              </p>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Sécurisé et confidentiel
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Plateforme</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Fonctionnalités</li>
                <li>Sécurité</li>
                <li>Confidentialité</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Communauté</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Universités partenaires</li>
                <li>Guide d'utilisation</li>
                <li>Contact</li>
                <li>À propos</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CampusSphere. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}