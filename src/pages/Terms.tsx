import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Terms() {
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
          <FileText className="h-16 w-16 campus-gradient mx-auto mb-4 p-3 rounded-2xl text-white" />
          <h1 className="text-4xl font-bold campus-gradient bg-clip-text text-transparent mb-4">
            Conditions d'Utilisation
          </h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="space-y-6">
          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Acceptation des Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                En utilisant CampusSphere, vous acceptez les présentes conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
              </p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Inscription et Compte</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vous devez être étudiant dans un établissement d'enseignement supérieur</li>
                <li>Vous devez fournir des informations exactes et à jour</li>
                <li>Vous êtes responsable de la confidentialité de votre compte</li>
                <li>Vous devez nous informer immédiatement de toute utilisation non autorisée</li>
                <li>Un seul compte par personne est autorisé</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Utilisation de la Plateforme
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>Vous vous engagez à :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Utiliser la plateforme de manière légale et respectueuse</li>
                <li>Respecter les droits de propriété intellectuelle</li>
                <li>Ne pas publier de contenu offensant, diffamatoire ou illégal</li>
                <li>Ne pas harceler ou menacer d'autres utilisateurs</li>
                <li>Ne pas utiliser la plateforme à des fins commerciales sans autorisation</li>
                <li>Ne pas tenter de contourner les mesures de sécurité</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Contenu Utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>Concernant le contenu que vous publiez :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vous conservez la propriété de votre contenu</li>
                <li>Vous accordez à CampusSphere une licence d'utilisation</li>
                <li>Vous garantissez avoir les droits sur le contenu partagé</li>
                <li>Nous pouvons supprimer du contenu inapproprié</li>
                <li>Vous êtes responsable du contenu que vous partagez</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                Interdictions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>Les comportements suivants sont strictement interdits :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Spam ou publicité non autorisée</li>
                <li>Harcèlement, intimidation ou discrimination</li>
                <li>Partage de contenu violent ou explicite</li>
                <li>Usurpation d'identité</li>
                <li>Collecte non autorisée de données d'utilisateurs</li>
                <li>Utilisation de bots ou d'automatisation</li>
                <li>Violation des droits d'auteur</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Propriété Intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                CampusSphere et son contenu original sont protégés par des droits d'auteur, 
                marques déposées et autres lois sur la propriété intellectuelle. Vous ne pouvez 
                pas copier, modifier ou distribuer notre contenu sans autorisation.
              </p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Limitation de Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                CampusSphere est fourni "tel quel". Nous ne garantissons pas que le service sera 
                ininterrompu ou sans erreur. Nous ne sommes pas responsables des dommages résultant 
                de l'utilisation de la plateforme.
              </p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Résiliation</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Nous nous réservons le droit de suspendre ou de résilier votre compte en cas de 
                violation de ces conditions. Vous pouvez également supprimer votre compte à tout moment.
              </p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Modifications</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Nous nous réservons le droit de modifier ces conditions à tout moment. 
                Les modifications importantes vous seront notifiées par email ou sur la plateforme.
              </p>
            </CardContent>
          </Card>

          <Card className="campus-card">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Pour toute question concernant ces conditions, contactez-nous :
              </p>
              <ul className="mt-4 space-y-2">
                <li>Email: legal@campussphere.com</li>
                <li>Adresse: CampusSphere, 123 Avenue de l'Université, Paris</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
