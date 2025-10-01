import { useState } from "react";
import { Search, Filter, Plus, Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateMarketplaceItemModal } from "@/components/modals/CreateMarketplaceItemModal";

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const items = [
    {
      id: "1",
      title: "Calculatrice TI-82 Advanced",
      description: "Calculatrice graphique en excellent état, utilisée seulement 1 semestre",
      price: 45,
      originalPrice: 80,
      seller: {
        name: "Marie Dubois",
        avatar: "/placeholder-avatar.jpg",
        rating: 4.8,
        reviews: 12
      },
      category: "electronics",
      condition: "Comme neuf",
      images: ["/placeholder-calculator.jpg"],
      isLiked: false,
      location: "Campus Nord",
      postedDate: "il y a 2j"
    },
    {
      id: "2",
      title: "Livre: Algorithmes et Structures de Données",
      description: "Manuel de cours avec exercices corrigés. Quelques annotations au crayon",
      price: 25,
      originalPrice: 50,
      seller: {
        name: "Thomas Martin",
        avatar: "/placeholder-avatar.jpg",
        rating: 4.6,
        reviews: 8
      },
      category: "books",
      condition: "Bon état",
      images: ["/placeholder-book.jpg"],
      isLiked: true,
      location: "Campus Sud",
      postedDate: "il y a 1j"
    },
    {
      id: "3",
      title: "Cours particuliers de Mathématiques",
      description: "Étudiant en M2 propose cours de maths tous niveaux. Disponible soirs et weekends",
      price: 20,
      seller: {
        name: "Alex Chen",
        avatar: "/placeholder-avatar.jpg",
        rating: 5.0,
        reviews: 25
      },
      category: "services",
      condition: "Service",
      images: ["/placeholder-tutoring.jpg"],
      isLiked: false,
      location: "À distance / Campus",
      postedDate: "il y a 3j",
      hourly: true
    },
    {
      id: "4",
      title: "Vélo de ville",
      description: "Vélo en bon état, parfait pour se déplacer sur le campus. Antivol inclus",
      price: 120,
      originalPrice: 250,
      seller: {
        name: "Sophie Laurent",
        avatar: "/placeholder-avatar.jpg",
        rating: 4.7,
        reviews: 15
      },
      category: "transport",
      condition: "Bon état",
      images: ["/placeholder-bike.jpg"],
      isLiked: false,
      location: "Campus Central",
      postedDate: "il y a 4j"
    },
    {
      id: "5",
      title: "MacBook Air M1 (2020)",
      description: "Ordinateur portable utilisé pour les études. Excellent état, batterie comme neuve",
      price: 800,
      originalPrice: 1200,
      seller: {
        name: "Lucas Moreau",
        avatar: "/placeholder-avatar.jpg",
        rating: 4.9,
        reviews: 20
      },
      category: "electronics",
      condition: "Très bon état",
      images: ["/placeholder-laptop.jpg"],
      isLiked: true,
      location: "Campus Nord",
      postedDate: "il y a 5j"
    }
  ];

  const categories = [
    { id: "all", label: "Toutes catégories" },
    { id: "books", label: "Livres & Manuels" },
    { id: "electronics", label: "Électronique" },
    { id: "services", label: "Services" },
    { id: "transport", label: "Transport" },
    { id: "furniture", label: "Mobilier" },
    { id: "clothes", label: "Vêtements" }
  ];

  const priceRanges = [
    { id: "all", label: "Tous les prix" },
    { id: "0-25", label: "0 - 25€" },
    { id: "25-50", label: "25 - 50€" },
    { id: "50-100", label: "50 - 100€" },
    { id: "100+", label: "100€ et plus" }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(p => p.replace("+", ""));
      if (max) {
        matchesPrice = item.price >= parseInt(min) && item.price <= parseInt(max);
      } else {
        matchesPrice = item.price >= parseInt(min);
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleLike = (itemId: string) => {
    console.log("Toggle like for item:", itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-7xl mx-auto py-4 md:py-6 px-3 md:px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 campus-animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              Marketplace Campus
            </h1>
            <p className="text-muted-foreground mt-2">
              Achetez, vendez et échangez entre étudiants
            </p>
          </div>
          <CreateMarketplaceItemModal>
            <Button className="campus-gradient text-white hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" />
              Vendre un article
            </Button>
          </CreateMarketplaceItemModal>
        </div>

        {/* Filters */}
        <Card className="campus-card mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Plus de filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="campus-card hover:campus-glow transition-all duration-300 cursor-pointer campus-animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-primary" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
                    onClick={() => toggleLike(item.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${item.isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                  {item.condition && (
                    <Badge 
                      variant="secondary" 
                      className="absolute bottom-2 left-2 text-xs"
                    >
                      {item.condition}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg campus-gradient bg-clip-text text-transparent">
                        {item.price}€{item.hourly && "/h"}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {item.originalPrice}€
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {categories.find(c => c.id === item.category)?.label}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.seller.avatar} />
                    <AvatarFallback className="text-xs">
                      {item.seller.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {item.seller.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {item.seller.rating} ({item.seller.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{item.location}</span>
                  <span>{item.postedDate}</span>
                </div>

                <Button size="sm" className="w-full campus-gradient text-white hover:opacity-90">
                  Contacter
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun article trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Essayez de modifier vos filtres ou créez une nouvelle annonce
            </p>
            <Button className="campus-gradient text-white hover:opacity-90">
              Créer une annonce
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}