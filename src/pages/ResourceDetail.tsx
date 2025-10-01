import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Heart, Share2, ChevronLeft, Eye, Star, Flag, FileText, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const resource = {
    id: id || "1",
    title: "Notes Complètes - Algèbre Linéaire L2",
    description: "Mes notes de cours d'algèbre linéaire prises durant tout le semestre. Très détaillées avec de nombreux exemples et schémas explicatifs. Couvre tous les chapitres du programme.",
    subject: "Mathématiques",
    type: "Notes de cours",
    format: "pdf",
    size: "3.2 MB",
    pages: 45,
    uploader: {
      name: "Marie Dubois",
      avatar: "/placeholder-avatar.jpg",
      verified: true,
      level: "L3 Mathématiques",
      contributions: 23
    },
    uploadDate: "il y a 2 jours",
    stats: {
      downloads: 234,
      likes: 45,
      views: 567
    },
    rating: {
      average: 4.7,
      total: 12
    },
    tags: ["L2", "algèbre", "matrices", "vecteurs", "espaces vectoriels"],
    relatedCourse: "MAT201 - Algèbre Linéaire",
    professor: "Prof. Martin Dubois",
    reviews: [
      {
        id: "1",
        author: {
          name: "Alex Chen",
          avatar: "/placeholder-avatar.jpg"
        },
        rating: 5,
        comment: "Excellentes notes ! M'ont beaucoup aidé pour réviser l'exam final.",
        date: "il y a 1 jour",
        helpful: 8
      },
      {
        id: "2",
        author: {
          name: "Sophie L.",
          avatar: "/placeholder-avatar.jpg"
        },
        rating: 4,
        comment: "Très complet, quelques petites coquilles mais rien de grave.",
        date: "il y a 3 jours",
        helpful: 3
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
          onClick={() => navigate("/resources")}
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux ressources
        </Button>

        {/* Resource Header */}
        <Card className="campus-card mb-4">
          <CardContent className="p-4 md:p-6">
            {/* Title & Type */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="campus-gradient text-white">{resource.type}</Badge>
                <Badge variant="secondary">{resource.subject}</Badge>
                <Badge variant="outline">{resource.format.toUpperCase()}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{resource.title}</h1>
              <p className="text-muted-foreground">{resource.description}</p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {resource.stats.downloads} téléchargements
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {resource.stats.likes} likes
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {resource.stats.views} vues
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {resource.rating.average} ({resource.rating.total} avis)
              </span>
            </div>

            {/* Uploader Info */}
            <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={resource.uploader.avatar} />
                  <AvatarFallback>{resource.uploader.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{resource.uploader.name}</p>
                    {resource.uploader.verified && (
                      <Badge variant="secondary" className="text-xs">Vérifié</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {resource.uploader.level} · {resource.uploader.contributions} contributions
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Suivre</Button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1 campus-gradient text-white hover:opacity-90 gap-2">
                <Download className="h-4 w-4" />
                Télécharger ({resource.size})
              </Button>
              <Button 
                variant="outline" 
                className={isLiked ? "text-red-500 border-red-500" : ""}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="campus-card mb-4">
          <CardContent className="p-4 md:p-6">
            <h3 className="font-semibold text-lg mb-4">Détails</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Cours associé</p>
                <p className="font-medium">{resource.relatedCourse}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Professeur</p>
                <p className="font-medium">{resource.professor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nombre de pages</p>
                <p className="font-medium">{resource.pages} pages</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date d'upload</p>
                <p className="font-medium">{resource.uploadDate}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="campus-card">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">
                Avis ({resource.rating.total})
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(resource.rating.average)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{resource.rating.average}/5</span>
              </div>
            </div>

            <div className="space-y-4">
              {resource.reviews.map((review) => (
                <div key={review.id} className="p-4 rounded-lg border">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.author.avatar} />
                      <AvatarFallback>{review.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{review.author.name}</span>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                      <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
                        <ThumbsUp className="h-3 w-3" />
                        Utile ({review.helpful})
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <Button variant="outline" className="w-full">
              Laisser un avis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
