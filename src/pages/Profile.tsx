import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Link, Users, BookOpen, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Profile() {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = true; // TODO: Check if viewing own profile

  // Mock user data with extended info from register
  const user = {
    // Personal info
    name: "Alex Dubois",
    firstName: "Alex",
    lastName: "Dubois",
    username: "alex_dubois",
    email: "alex.dubois@university.fr",
    phoneNumber: "+33 6 12 34 56 78",
    dateOfBirth: "15/03/2001",
    avatar: "/placeholder-avatar.jpg",
    bio: "Étudiant en informatique passionné par l'IA et le développement web. Toujours prêt à aider et à apprendre !",
    town: "Paris",
    language: "Français",
    
    // Academic info
    university: "Université Paris-Saclay",
    faculty: "Informatique",
    studyYear: "Master 2",
    studentId: "21804567",
    campus: "Campus Nord",
    
    // Experience & Skills
    previousEducation: "Licence Informatique - Sorbonne Université",
    experiences: "Stage développeur Full-Stack chez TechCorp (6 mois)",
    skills: ["React", "Node.js", "Python", "Machine Learning", "SQL"],
    interests: ["Intelligence Artificielle", "Développement Web", "Gaming", "Open Source"],
    portfolioLinks: "github.com/alexdubois",
    
    // Social
    location: "Paris, France",
    joinDate: "Septembre 2023",
    website: "alexdubois.dev",
    stats: {
      posts: 42,
      followers: 234,
      following: 189
    },
    badges: ["Contributeur actif", "Mentor", "Top étudiant"]
  };

  const recentPosts = [
    {
      id: "1",
      content: "Viens de terminer mon projet de machine learning ! Super fier du résultat 🤖",
      timestamp: "il y a 2h",
      likes: 15,
      comments: 4
    },
    {
      id: "2", 
      content: "Quelqu'un pour réviser les maths ensemble demain ? Bibliothèque à 14h",
      timestamp: "il y a 1j",
      likes: 8,
      comments: 6
    },
    {
      id: "3",
      content: "Excellente conférence sur React aujourd'hui ! Mes notes sont disponibles sur mon GitHub",
      timestamp: "il y a 2j",
      likes: 23,
      comments: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Profile Header */}
        <Card className="campus-card campus-animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="campus-gradient text-white font-bold text-2xl">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  {!isOwnProfile && (
                    <Button 
                      variant={isFollowing ? "outline" : "default"}
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={!isFollowing ? "campus-gradient text-white hover:opacity-90" : ""}
                      size="sm"
                    >
                      {isFollowing ? "Ne plus suivre" : "Suivre"}
                    </Button>
                  )}
                  {isOwnProfile && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/profile/edit")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>

                <p className="text-foreground leading-relaxed">{user.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Inscrit en {user.joinDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Link className="h-4 w-4" />
                    <a href={`https://${user.website}`} className="text-primary hover:underline">
                      {user.website}
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-semibold">{user.stats.posts}</span>
                    <span className="text-muted-foreground ml-1">Posts</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user.stats.followers}</span>
                    <span className="text-muted-foreground ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user.stats.following}</span>
                    <span className="text-muted-foreground ml-1">Following</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="gap-1">
                      <Award className="h-3 w-3" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <div className="mt-6 campus-animate-slide-up">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Users className="h-4 w-4" />
                Activité
              </TabsTrigger>
              <TabsTrigger value="about" className="gap-2">
                <Award className="h-4 w-4" />
                À propos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4 mt-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="campus-card">
                  <CardContent className="p-4">
                    <p className="mb-2">{post.content}</p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{post.timestamp}</span>
                      <div className="flex gap-4">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} commentaires</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card className="campus-card">
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 campus-gradient rounded-full"></div>
                      <span className="text-sm">A rejoint le groupe "Développement Web"</span>
                      <span className="text-xs text-muted-foreground ml-auto">il y a 2h</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 campus-gradient rounded-full"></div>
                      <span className="text-sm">A commenté sur un post</span>
                      <span className="text-xs text-muted-foreground ml-auto">il y a 4h</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 campus-gradient rounded-full"></div>
                      <span className="text-sm">A participé à l'événement "Hackathon 2024"</span>
                      <span className="text-xs text-muted-foreground ml-auto">il y a 1j</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <div className="space-y-4">
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle>Informations Académiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Université</p>
                        <p className="font-medium">{user.university}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Filière</p>
                        <p className="font-medium">{user.faculty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Niveau</p>
                        <p className="font-medium">{user.studyYear}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Campus</p>
                        <p className="font-medium">{user.campus}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle>Compétences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle>Centres d'intérêt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {user.previousEducation && (
                  <Card className="campus-card">
                    <CardHeader>
                      <CardTitle>Formations Précédentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{user.previousEducation}</p>
                    </CardContent>
                  </Card>
                )}

                {user.experiences && (
                  <Card className="campus-card">
                    <CardHeader>
                      <CardTitle>Expériences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{user.experiences}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}