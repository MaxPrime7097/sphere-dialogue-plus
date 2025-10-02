import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookLock, Lock, Eye, Database, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="text-center mb-12">
          <BookLock className="h-16 w-16 campus-gradient mx-auto mb-4 p-3 rounded-2xl text-white" />
          <h1 className="text-4xl font-bold campus-gradient bg-clip-text text-transparent mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="space-y-6">
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Collecte des Données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                CampusSphere collecte les informations suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Informations personnelles (nom, prénom, email universitaire)</li>
                <li>Informations académiques (université, filière, niveau d'études)</li>
                <li>Données d'utilisation de la plateforme</li>
                <li>Contenu partagé (posts, commentaires, ressources)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Utilisation des Données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Vos données sont utilisées pour :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience</li>
                <li>Communiquer avec vous sur la plateforme</li>
                <li>Assurer la sécurité de la communauté</li>
                <li>Analyser l'utilisation de la plateforme</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Partage des Données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Nous ne vendons jamais vos données personnelles. Vos informations peuvent être partagées :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Avec votre consentement explicite</li>
                <li>Avec votre université (pour vérification académique)</li>
                <li>Pour respecter nos obligations légales</li>
                <li>En cas de fusion ou acquisition (avec notification préalable)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Vos Droits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Vous avez le droit de :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger des informations inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Exporter vos données</li>
                <li>Vous opposer au traitement de vos données</li>
                <li>Retirer votre consentement à tout moment</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à{" "}
                <a href="mailto:privacy@campussphere.com" className="text-primary hover:underline">
                  privacy@campussphere.com
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                appropriées pour protéger vos données contre tout accès, modification, divulgation 
                ou destruction non autorisés.
              </p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Pour toute question concernant cette politique de confidentialité, contactez-nous :
              </p>
              <ul className="mt-4 space-y-2">
                <li>Email: privacy@campussphere.com</li>
                <li>Adresse: CampusSphere, 123 Avenue de l'Université, Paris</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
