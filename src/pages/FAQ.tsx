import { useState } from "react";
import { Search, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "Compte & Inscription",
      questions: [
        {
          q: "Comment créer un compte sur CampusSphere ?",
          a: "Cliquez sur 'S'inscrire' en haut de la page et suivez le processus d'inscription en 3 étapes : informations personnelles, informations académiques, et formations/compétences."
        },
        {
          q: "Puis-je modifier mes informations après l'inscription ?",
          a: "Oui, vous pouvez modifier vos informations à tout moment en accédant à votre profil et en cliquant sur 'Modifier le profil'."
        },
        {
          q: "Comment vérifier mon compte étudiant ?",
          a: "La vérification se fait automatiquement via votre email universitaire. Vous pouvez également uploader une preuve d'inscription dans les paramètres."
        }
      ]
    },
    {
      title: "Groupes & Communautés",
      questions: [
        {
          q: "Comment rejoindre un groupe ?",
          a: "Allez dans la section 'Groupes', recherchez le groupe qui vous intéresse et cliquez sur 'Rejoindre'. Certains groupes nécessitent l'approbation d'un administrateur."
        },
        {
          q: "Puis-je créer mon propre groupe ?",
          a: "Oui, tous les utilisateurs vérifiés peuvent créer des groupes. Cliquez sur 'Créer un groupe' dans la section Groupes."
        },
        {
          q: "Comment devenir modérateur d'un groupe ?",
          a: "Les administrateurs de groupe peuvent promouvoir des membres actifs au rang de modérateur."
        }
      ]
    },
    {
      title: "Ressources & Bibliothèque",
      questions: [
        {
          q: "Quelle est la différence entre Bibliothèque et Ressources ?",
          a: "La Bibliothèque contient des ressources officielles ajoutées par les administrateurs (cours, livres). Les Ressources sont des fichiers partagés par les étudiants (notes, résumés, exercices)."
        },
        {
          q: "Comment partager une ressource ?",
          a: "Allez dans 'Ressources', cliquez sur 'Partager une ressource' et uploadez votre fichier avec les informations nécessaires."
        },
        {
          q: "Mes ressources partagées sont-elles vérifiées ?",
          a: "Oui, toutes les ressources passent par une modération avant d'être publiées pour garantir la qualité du contenu."
        }
      ]
    },
    {
      title: "Événements",
      questions: [
        {
          q: "Comment créer un événement ?",
          a: "Dans la section Événements, cliquez sur 'Créer un événement', remplissez les informations et publiez-le."
        },
        {
          q: "Puis-je inviter des personnes spécifiques à mon événement ?",
          a: "Oui, lors de la création de l'événement, vous pouvez choisir de le rendre public ou d'inviter des personnes spécifiques."
        }
      ]
    },
    {
      title: "Marketplace",
      questions: [
        {
          q: "Comment vendre un article ?",
          a: "Allez dans Marketplace, cliquez sur 'Vendre un article', ajoutez photos et description, puis publiez votre annonce."
        },
        {
          q: "Y a-t-il des frais pour vendre sur Marketplace ?",
          a: "Non, CampusSphere ne prélève aucun frais sur les transactions entre étudiants."
        }
      ]
    },
    {
      title: "Confidentialité & Sécurité",
      questions: [
        {
          q: "Qui peut voir mes informations ?",
          a: "Vous contrôlez la visibilité de vos informations dans les paramètres de confidentialité. Par défaut, seuls vos camarades d'université peuvent voir votre profil complet."
        },
        {
          q: "Comment signaler un contenu inapproprié ?",
          a: "Cliquez sur les trois points à côté du contenu et sélectionnez 'Signaler'. Notre équipe examinera rapidement le signalement."
        },
        {
          q: "Mes données sont-elles sécurisées ?",
          a: "Oui, nous utilisons un chiffrement de bout en bout et respectons strictement le RGPD. Vos données ne sont jamais partagées avec des tiers."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0 || !searchTerm);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="relative overflow-hidden py-12 md:py-20 mb-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 campus-gradient opacity-20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 campus-gradient opacity-20 blur-3xl rounded-full"></div>
        </div>
        
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-28 h-28 mx-auto mb-6 campus-gradient rounded-3xl p-6">
            <img src="/CS.svg" alt="CampusSphere" className="w-full h-full" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold campus-gradient bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Automata Display' }}>
            Questions Fréquentes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement des réponses à toutes vos questions sur CampusSphere
          </p>
        </div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4 pb-12">{/* Content starts */}

        {/* Search */}
        <Card className="campus-card mb-8">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {filteredCategories.map((category, index) => (
            <Card key={index} className="campus-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 campus-gradient bg-clip-text text-transparent">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <Card className="campus-card">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">
                Aucune question trouvée pour "{searchTerm}"
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Réinitialiser la recherche
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact CTA */}
        <Card className="campus-card mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Vous ne trouvez pas votre réponse ?</h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe est là pour vous aider
            </p>
            <Button
              size="lg"
              className="campus-gradient text-white hover:opacity-90"
              onClick={() => window.location.href = "/cs-inc/contact"}
            >
              Contactez-nous
            </Button>
          </CardContent>
        </Card>
      </div> {/* Close content */}
    </div>
  );
}
