import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";

// Mock data pour les posts
const mockPosts = [
  {
    id: "1",
    author: {
      name: "Marie Dubois",
      avatar: "/placeholder-avatar.jpg",
      username: "marie_d",
      isVerified: true
    },
    content: "Salut tout le monde ! Quelqu'un sait où je peux trouver le livre 'Algorithmes et structures de données' en version numérique ? Merci d'avance ! 📚",
    timestamp: "il y a 2h",
    likes: 12,
    comments: 3,
    category: "Demande d'aide"
  },
  {
    id: "2",
    author: {
      name: "Thomas Martin",
      avatar: "/placeholder-avatar.jpg", 
      username: "thomas_m",
    },
    content: "Super soirée jeux hier au foyer ! Merci à tous ceux qui sont venus. On remet ça vendredi prochain ? 🎮",
    image: "/placeholder-gaming.jpg",
    timestamp: "il y a 4h",
    likes: 28,
    comments: 8,
    category: "Événement"
  },
  {
    id: "3",
    author: {
      name: "Sophie Chen",
      avatar: "/placeholder-avatar.jpg",
      username: "sophie_c",
      isVerified: true
    },
    content: "Rappel : la conférence sur l'IA aura lieu demain à 14h en amphi A. N'oubliez pas de vous inscrire !",
    timestamp: "il y a 6h",
    likes: 45,
    comments: 12,
    category: "Académique"
  },
  {
    id: "4",
    author: {
      name: "Alex Rodriguez", 
      avatar: "/placeholder-avatar.jpg",
      username: "alex_r",
    },
    content: "Vends calculatrice graphique TI-82, parfait état. 50€ négociable. Contactez-moi en MP si intéressé !",
    timestamp: "il y a 1j",
    likes: 8,
    comments: 2,
    category: "Marketplace"
  }
];

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-2xl mx-auto py-6 px-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 campus-animate-fade-in">
          <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent">
            Fil d'actualité
          </h1>
          <p className="text-muted-foreground">
            Découvrez ce qui se passe sur votre campus
          </p>
        </div>

        {/* Create Post */}
        <div className="campus-animate-slide-up">
          <CreatePost />
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {mockPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="campus-animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-6">
          <button className="text-primary hover:text-primary-light font-medium">
            Charger plus de posts...
          </button>
        </div>
      </div>
    </div>
  );
}