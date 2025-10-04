import { useState } from "react";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="relative overflow-hidden py-12 md:py-20 mb-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 campus-gradient opacity-20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 campus-gradient opacity-20 blur-3xl rounded-full"></div>
        </div>
        
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold campus-gradient bg-clip-text text-transparent mb-6">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Une question ? Une suggestion ? Notre équipe est là pour vous aider et vous accompagner
          </p>
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-4 pb-12">{/* Content starts */}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Contact Info Cards */}
          <Card className="campus-card">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full campus-gradient mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">contact@campussphere.com</p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full campus-gradient mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-sm text-muted-foreground">support@campussphere.com</p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full campus-gradient mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Adresse</h3>
              <p className="text-sm text-muted-foreground">Paris, France</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="campus-card">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Question générale</SelectItem>
                    <SelectItem value="technical">Problème technique</SelectItem>
                    <SelectItem value="feature">Suggestion de fonctionnalité</SelectItem>
                    <SelectItem value="partnership">Partenariat</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Écrivez votre message ici..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full campus-gradient text-white hover:opacity-90 gap-2"
              >
                <Send className="h-4 w-4" />
                Envoyer le message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Link */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Consultez notre FAQ avant de nous contacter
          </p>
          <Button variant="outline" onClick={() => window.location.href = "/cs-inc/faq"}>
            Voir la FAQ
          </Button>
        </div>
      </div> {/* Close content */}
    </div>
  );
}
