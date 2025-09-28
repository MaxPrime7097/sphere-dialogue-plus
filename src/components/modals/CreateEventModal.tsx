import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CreateEventModalProps {
  children: React.ReactNode;
}

export function CreateEventModal({ children }: CreateEventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: "academic", label: "Académique" },
    { value: "networking", label: "Networking" },
    { value: "tech", label: "Technologie" },
    { value: "business", label: "Business" },
    { value: "creative", label: "Créatif" },
    { value: "sport", label: "Sport" },
    { value: "social", label: "Social" },
    { value: "cultural", label: "Culturel" }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const handleSubmit = () => {
    if (title.trim() && description.trim() && date && time && location.trim() && category) {
      console.log("Creating event:", {
        title,
        description,
        location,
        category,
        date,
        time,
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : null
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("");
      setDate(undefined);
      setTime("");
      setMaxAttendees("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Créer un nouvel événement
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="eventTitle">Titre de l'événement</Label>
            <Input
              id="eventTitle"
              placeholder="Ex: Hackathon IA 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="eventDescription">Description</Label>
            <Textarea
              id="eventDescription"
              placeholder="Décrivez votre événement, ses objectifs et ce que les participants peuvent attendre..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="eventTime">Heure</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="mt-2">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Heure de début" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="eventLocation">Lieu</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="eventLocation"
                placeholder="Salle, amphithéâtre, campus..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventCategory">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Type d'événement" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maxAttendees">Nombre max de participants</Label>
              <div className="relative mt-2">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="maxAttendees"
                  type="number"
                  placeholder="Illimité"
                  value={maxAttendees}
                  onChange={(e) => setMaxAttendees(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!title.trim() || !description.trim() || !date || !time || !location.trim() || !category}
              className="campus-gradient text-white hover:opacity-90"
            >
              Créer l'événement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}