import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Send, Phone, Video, MoreVertical, Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const messageSchema = z.object({
  content: z.string()
    .trim()
    .min(1, { message: "Message cannot be empty" })
    .max(1000, { message: "Message must be less than 1000 characters" })
});

export function Messages() {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId: string }>();
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const allConversations = [
    {
      id: "1",
      name: "Web Dev Group",
      type: "group" as const,
      avatar: "/placeholder-group.jpg",
      lastMessage: "Thomas: Great! See you tomorrow?",
      timestamp: "2:30 PM",
      unread: 2,
      isOnline: false
    },
    {
      id: "2", 
      name: "Marie Dubois",
      type: "direct" as const,
      avatar: "/placeholder-avatar.jpg",
      lastMessage: "Thanks for the course notes!",
      timestamp: "1:45 PM",
      unread: 0,
      isOnline: true
    },
    {
      id: "3",
      name: "Sophie Chen",
      type: "direct" as const, 
      avatar: "/placeholder-avatar.jpg",
      lastMessage: "Are you attending the AI conference?",
      timestamp: "12:20 PM",
      unread: 1,
      isOnline: false
    },
    {
      id: "4",
      name: "Gaming Campus",
      type: "group" as const,
      avatar: "/placeholder-group.jpg",
      lastMessage: "Alex: GG everyone!",
      timestamp: "11:15 AM",
      unread: 0,
      isOnline: false
    }
  ];

  const conversations = allConversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const messages = [
    {
      id: "1",
      sender: "Thomas Martin",
      content: "Hey everyone! How's the React project going?",
      timestamp: "2:20 PM",
      isCurrentUser: false,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: "2",
      sender: "You",
      content: "Going well! I finished the base components.",
      timestamp: "2:22 PM",
      isCurrentUser: true,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: "3",
      sender: "Marie Dubois",
      content: "Perfect! I finished the API integration. Can we do a review together?",
      timestamp: "2:25 PM",
      isCurrentUser: false,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: "4",
      sender: "Thomas Martin",
      content: "Great! See you tomorrow?",
      timestamp: "2:30 PM",
      isCurrentUser: false,
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  const handleSendMessage = () => {
    const validation = messageSchema.safeParse({ content: newMessage });
    
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Invalid message",
        description: validation.error.errors[0].message,
      });
      return;
    }

    // Handle send message - would integrate with backend
    toast({
      title: "Message sent",
      description: "Your message has been delivered.",
    });
    setNewMessage("");
  };

  const selectedConv = conversations.find(c => c.id === conversationId);

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] bg-gradient-to-br from-background to-accent/20">
      <div className="flex h-full max-w-[100vw]">
        {/* Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r bg-card/50 flex-shrink-0 ${conversationId ? 'hidden md:flex' : 'flex'} flex-col`}>
          <div className="p-3 md:p-4 border-b flex-shrink-0">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold campus-gradient bg-clip-text text-transparent">
                Messages
              </h2>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {conversations.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                No conversations found
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 md:p-4 border-b cursor-pointer transition-colors hover:bg-accent/50 ${
                    conversationId === conversation.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => navigate(`/messages/${conversation.id}`)}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback className="campus-gradient text-white font-semibold text-xs md:text-sm">
                          {conversation.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate text-sm md:text-base">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="text-xs flex-shrink-0 ml-2">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        {conversationId ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat Header */}
            <div className="p-3 md:p-4 border-b bg-card/50 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden h-8 w-8 p-0 flex-shrink-0"
                    onClick={() => navigate('/messages')}
                  >
                    ←
                  </Button>
                  
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                    <AvatarImage src={selectedConv?.avatar} />
                    <AvatarFallback className="campus-gradient text-white font-semibold text-xs md:text-sm">
                      {selectedConv?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base truncate">{selectedConv?.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {selectedConv?.type === 'group' ? '4 members' : 'Online'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 md:h-9 md:w-9" aria-label="Voice call">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 md:h-9 md:w-9" aria-label="Video call">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 md:h-9 md:w-9" aria-label="More options">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
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
                  
                   <div className={`max-w-[70%] sm:max-w-xs lg:max-w-md ${message.isCurrentUser ? 'text-right' : ''}`}>
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
            <div className="p-3 md:p-4 border-t bg-card/50 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  className="flex-1 text-sm md:text-base"
                  maxLength={1000}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="campus-gradient text-white hover:opacity-90 h-9 w-9 md:h-10 md:w-10 p-0 flex-shrink-0"
                  disabled={!newMessage.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-center p-4">
            <div>
              <div className="w-16 h-16 campus-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Choose a conversation to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}