import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Send, Phone, Video, MoreVertical, Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Messages() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: "1",
      name: "Groupe Dev Web",
      type: "group",
      avatar: "/placeholder-group.jpg",
      lastMessage: "Thomas: Super ! On se retrouve demain ?",
      timestamp: "14:30",
      unread: 2,
      isOnline: false
    },
    {
      id: "2", 
      name: "Marie Dubois",
      type: "direct",
      avatar: "/placeholder-avatar.jpg",
      lastMessage: "Merci pour tes notes de cours !",
      timestamp: "13:45",
      unread: 0,
      isOnline: true
    },
    {
      id: "3",
      name: "Sophie Chen",
      type: "direct", 
      avatar: "/placeholder-avatar.jpg",
      lastMessage: "Tu participes à la conférence IA ?",
      timestamp: "12:20",
      unread: 1,
      isOnline: false
    },
    {
      id: "4",
      name: "Gaming Campus",
      type: "group",
      avatar: "/placeholder-group.jpg",
      lastMessage: "Alex: GG tout le monde !",
      timestamp: "11:15",
      unread: 0,
      isOnline: false
    }
  ];

  const messages = [
    {
      id: "1",
      sender: "Thomas Martin",
      content: "Salut tout le monde ! Comment ça avance le projet React ?",
      timestamp: "14:20",
      isCurrentUser: false,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: "2",
      sender: "Vous",
      content: "Ça avance bien ! J'ai terminé les composants de base.",
      timestamp: "14:22",
      isCurrentUser: true,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: "3",
      sender: "Marie Dubois",
      content: "Parfait ! Moi j'ai fini l'intégration de l'API. On peut faire une review ensemble ?",
      timestamp: "14:25",
      isCurrentUser: false,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: "4",
      sender: "Thomas Martin",
      content: "Super ! On se retrouve demain ?",
      timestamp: "14:30",
      isCurrentUser: false,
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle send message
      setNewMessage("");
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] bg-gradient-to-br from-background to-accent/20">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className={`w-full md:w-80 border-r bg-card/50 ${selectedConversation ? 'hidden md:block' : 'block'}`}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold campus-gradient bg-clip-text text-transparent">
                Messages
              </h2>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des conversations..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer transition-colors hover:bg-accent/50 ${
                  selectedConversation === conversation.id ? 'bg-accent' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback className="campus-gradient text-white font-semibold">
                        {conversation.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setSelectedConversation(null)}
                  >
                    ←
                  </Button>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConv?.avatar} />
                    <AvatarFallback className="campus-gradient text-white font-semibold">
                      {selectedConv?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold">{selectedConv?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedConv?.type === 'group' ? '4 membres' : 'En ligne'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}
                 >
                   {!message.isCurrentUser && (
                     <Avatar 
                       className="h-8 w-8 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                       onClick={() => navigate('/profile')}
                     >
                       <AvatarImage src={message.avatar} />
                       <AvatarFallback className="text-xs">
                         {message.sender.split(' ').map(n => n[0]).join('')}
                       </AvatarFallback>
                     </Avatar>
                   )}
                  
                   <div className={`max-w-xs lg:max-w-md ${message.isCurrentUser ? 'text-right' : ''}`}>
                     {!message.isCurrentUser && (
                       <p 
                         className="text-xs text-muted-foreground mb-1 cursor-pointer hover:underline"
                         onClick={() => navigate('/profile')}
                       >
                         {message.sender}
                       </p>
                     )}
                    
                    <Card className={`${
                      message.isCurrentUser 
                        ? 'campus-gradient text-white' 
                        : 'bg-card border'
                    }`}>
                      <CardContent className="p-3">
                        <p className="text-sm">{message.content}</p>
                      </CardContent>
                    </Card>
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-card/50">
              <div className="flex gap-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="campus-gradient text-white hover:opacity-90"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-center">
            <div>
              <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sélectionnez une conversation</h3>
              <p className="text-muted-foreground">
                Choisissez une conversation pour commencer à discuter
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}