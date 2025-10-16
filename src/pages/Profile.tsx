import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Link, Users, BookOpen, Award, Settings, FileText, Briefcase, GraduationCap, Camera, Smile, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";

export function Profile() {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentMood, setCurrentMood] = useState("🚀 En pleine révision !");

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
    banner: "/placeholder-gaming.jpg",
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
    previousEducation: [
      {
        degree: "Licence Informatique",
        school: "Sorbonne Université",
        year: "2019-2022"
      },
      {
        degree: "Baccalauréat Scientifique",
        school: "Lycée Henri IV",
        year: "2019"
      }
    ],
    experiences: [
      {
        title: "Développeur Full-Stack",
        company: "TechCorp",
        duration: "6 mois",
        description: "Développement d'applications web avec React et Node.js"
      },
      {
        title: "Assistant de recherche",
        company: "Lab IA - Université Paris-Saclay",
        duration: "1 an",
        description: "Recherche en machine learning et traitement du langage naturel"
      }
    ],
    skills: ["React", "Node.js", "Python", "Machine Learning", "SQL", "TypeScript", "Docker", "MongoDB"],
    interests: ["Intelligence Artificielle", "Développement Web", "Gaming", "Open Source", "Cybersécurité"],
    portfolioLinks: "github.com/alexdubois",
    sharedFiles: [
      { name: "Notes_IA_2024.pdf", type: "PDF", size: "2.3 MB" },
      { name: "Projet_React_Final.zip", type: "ZIP", size: "15 MB" },
      { name: "Resume_Algo.docx", type: "DOCX", size: "850 KB" }
    ],
    
    // Social
    location: "Paris, France",
    joinDate: "Septembre 2023",
    website: "alexdubois.dev",
    stats: {
      posts: 42,
      followers: 234,
      following: 189,
      impactScore: 892
    },
    badges: ["Contributeur actif", "Mentor", "Top étudiant"]
  };

  // Mock connections (friends)
  const connections = [
    { id: "1", name: "Max Prime", username: "cypher", avatar: "/placeholder-avatar.jpg", mutual: 12 },
    { id: "2", name: "Hussein Boris", username: "skxiller", avatar: "/placeholder-avatar.jpg", mutual: 8 },
    { id: "3", name: "Kana Tommi", username: "tommik07", avatar: "/placeholder-avatar.jpg", mutual: 15 },
    { id: "4", name: "Nounga Nathan", username: "bosscovish", avatar: "/placeholder-avatar.jpg", mutual: 6 },
    { id: "5", name: "Sophie Martin", username: "sophie_m", avatar: "/placeholder-avatar.jpg", mutual: 10 },
    { id: "6", name: "Lucas Petit", username: "lucas_dev", avatar: "/placeholder-avatar.jpg", mutual: 4 },
  ];

  // Mock posts from user
  const userPosts = [
    {
      id: "1",
      author: {
        name: user.name,
        avatar: user.avatar,
        username: user.username,
        isVerified: true
      },
      content: "Viens de terminer mon projet de machine learning ! Super fier du résultat 🤖",
      timestamp: "il y a 2h",
      likes: 15,
      comments: 4,
      category: "Académique"
    },
    {
      id: "2",
      author: {
        name: user.name,
        avatar: user.avatar,
        username: user.username,
        isVerified: true
      },
      content: "Quelqu'un pour réviser les maths ensemble demain ? Bibliothèque à 14h",
      timestamp: "il y a 1j",
      likes: 8,
      comments: 6,
      category: "Demande d'aide"
    },
    {
      id: "3",
      author: {
        name: user.name,
        avatar: user.avatar,
        username: user.username,
        isVerified: true
      },
      content: "Excellente conférence sur React aujourd'hui ! Mes notes sont disponibles sur mon GitHub",
      image: "/placeholder-gaming.jpg",
      timestamp: "il y a 2j",
      likes: 23,
      comments: 8,
      category: "Académique"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Profile Header */}
        <Card className="campus-card campus-animate-fade-in overflow-hidden p-0">
          {/* Banner */}
          <div className="relative h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20">
            <img 
              src={user.banner} 
              alt="Profile banner" 
              className="w-full h-full object-cover"
            />
            {isOwnProfile && (
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-4 right-4 gap-2"
              >
                <Camera className="h-4 w-4" />
                Modifier la bannière
              </Button>
            )}
          </div>

          <CardContent className="p-6 -mt-16 relative">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 ring-4 ring-background">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="campus-gradient text-white font-bold text-2xl">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  {isOwnProfile && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
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

                {/* Mood du moment */}
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Smile className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{currentMood}</span>
                  {isOwnProfile && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-auto h-7 text-xs"
                      onClick={() => {
                        const newMood = prompt("Quel est votre mood du moment ?", currentMood);
                        if (newMood) setCurrentMood(newMood);
                      }}
                    >
                      Modifier
                    </Button>
                  )}
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
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">{user.stats.impactScore}</span>
                    <span className="text-muted-foreground ml-1">Impact Score</span>
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
              <TabsTrigger value="connections" className="gap-2">
                <Users className="h-4 w-4" />
                Connections
              </TabsTrigger>
              <TabsTrigger value="about" className="gap-2">
                <Award className="h-4 w-4" />
                À propos
              </TabsTrigger>
            </TabsList>

            {/* Posts Tab */}
            <TabsContent value="posts" className="space-y-4 mt-6">
              {isOwnProfile && (
                <div className="campus-animate-slide-up">
                  <CreatePost />
                </div>
              )}
              
              {userPosts.map((post) => (
                <div key={post.id} className="campus-animate-fade-in">
                  <PostCard post={post} />
                </div>
              ))}
            </TabsContent>

            {/* Connections Tab */}
            <TabsContent value="connections" className="mt-6">
              <Card className="campus-card">
                <CardHeader>
                  <CardTitle>Amis ({connections.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {connections.map((connection) => (
                      <Card key={connection.id} className="campus-card cursor-pointer hover:campus-glow transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={connection.avatar} />
                              <AvatarFallback className="campus-gradient text-white">
                                {connection.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-semibold">{connection.name}</p>
                              <p className="text-sm text-muted-foreground">@{connection.username}</p>
                              <p className="text-xs text-muted-foreground">{connection.mutual} amis en commun</p>
                            </div>
                            <Button size="sm" variant="outline">Voir</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="mt-6">
              <div className="space-y-4">
                {/* Informations Personnelles */}
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Informations Personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p className="font-medium">{user.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date de naissance</p>
                        <p className="font-medium">{user.dateOfBirth}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ville</p>
                        <p className="font-medium">{user.town}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Langue</p>
                        <p className="font-medium">{user.language}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informations Académiques */}
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Informations Académiques
                    </CardTitle>
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
                      <div>
                        <p className="text-sm text-muted-foreground">N° Étudiant</p>
                        <p className="font-medium">{user.studentId}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Centres d'intérêt */}
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Centres d'intérêt
                    </CardTitle>
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

                {/* Compétences */}
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

                {/* Formations */}
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Formations Précédentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.previousEducation.map((edu, index) => (
                        <div key={index} className="border-l-2 border-primary/50 pl-4">
                          <p className="font-semibold">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.school}</p>
                          <p className="text-xs text-muted-foreground">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Expériences */}
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Expériences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.experiences.map((exp, index) => (
                        <div key={index} className="border-l-2 border-primary/50 pl-4">
                          <p className="font-semibold">{exp.title}</p>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground mb-2">{exp.duration}</p>
                          <p className="text-sm">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Fichiers Partagés */}
                <Card className="campus-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Fichiers Partagés
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {user.sharedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 campus-gradient rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{file.type} • {file.size}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">Télécharger</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}