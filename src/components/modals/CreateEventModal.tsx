import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { enUS, fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface CreateEventModalProps {
  children: React.ReactNode;
}

export function CreateEventModal({ children }: CreateEventModalProps) {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const eventSchema = z.object({
    title: z.string()
      .trim()
      .min(3, { message: t('modals.createEvent.titleMin', { defaultValue: "Le titre doit contenir au moins 3 caractères" }) })
      .max(100, { message: t('modals.createEvent.titleTooLong') }),
    description: z.string()
      .trim()
      .min(10, { message: t('modals.createEvent.descMin', { defaultValue: "La description doit contenir au moins 10 caractères" }) })
      .max(500, { message: t('modals.createEvent.descriptionTooLong') }),
    location: z.string()
      .trim()
      .min(3, { message: t('modals.createEvent.locationMin', { defaultValue: "Le lieu doit contenir au moins 3 caractères" }) })
      .max(100, { message: t('modals.createEvent.locationTooLong', { defaultValue: "Le lieu ne peut pas dépasser 100 caractères" }) }),
    category: z.string().min(1, { message: t('modals.createEvent.categoryRequired') }),
    date: z.date({ required_error: t('modals.createEvent.dateRequired') }),
    time: z.string().min(1, { message: t('modals.createEvent.timeRequired') }),
    maxAttendees: z.string().optional(),
  });

  const categories = [
    { value: "academic", label: t('modals.createEvent.categories.academic') },
    { value: "networking", label: t('modals.createEvent.categories.networking', { defaultValue: "Réseautage" }) },
    { value: "tech", label: t('modals.createEvent.categories.tech', { defaultValue: "Technologie" }) },
    { value: "business", label: t('modals.createEvent.categories.business', { defaultValue: "Business" }) },
    { value: "creative", label: t('modals.createEvent.categories.creative', { defaultValue: "Créatif" }) },
    { value: "sport", label: t('modals.createEvent.categories.sport', { defaultValue: "Sport" }) },
    { value: "social", label: t('modals.createEvent.categories.social') },
    { value: "cultural", label: t('modals.createEvent.categories.culture') }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const handleSubmit = () => {
    if (!date) {
      toast({ variant: "destructive", title: t('modals.createEvent.dateRequiredTitle', { defaultValue: "Date requise" }), description: t('modals.createEvent.dateRequired') });
      return;
    }

    const validation = eventSchema.safeParse({ title, description, location, category, date, time, maxAttendees });
    
    if (!validation.success) {
      toast({ variant: "destructive", title: t('modals.createEvent.validationFailed', { defaultValue: "Validation échouée" }), description: validation.error.errors[0].message });
      return;
    }

    toast({ title: t('modals.createEvent.toast.created'), description: t('modals.createEvent.toast.createdDesc') });
    
    setTitle(""); setDescription(""); setLocation(""); setCategory(""); setDate(undefined); setTime(""); setMaxAttendees(""); setIsOpen(false);
  };

  const dateLocale = i18n.language === 'fr' ? fr : enUS;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {t('modals.createEvent.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="eventTitle">{t('modals.createEvent.eventTitle')}</Label>
            <Input
              id="eventTitle"
              placeholder={t('modals.createEvent.titlePlaceholder', { defaultValue: "Ex : Hackathon IA 2024" })}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
              maxLength={100}
            />
          </div>

          <div>
            <Label htmlFor="eventDescription">{t('modals.createEvent.description')}</Label>
            <Textarea
              id="eventDescription"
              placeholder={t('modals.createEvent.descPlaceholder', { defaultValue: "Décrivez votre événement, objectifs et ce que les participants peuvent attendre..." })}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] mt-2"
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('modals.createEvent.date')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: dateLocale }) : t('modals.createEvent.selectDate', { defaultValue: "Sélectionner une date" })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    locale={dateLocale}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="eventTime">{t('modals.createEvent.time')}</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="mt-2">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t('modals.createEvent.startTime', { defaultValue: "Heure de début" })} />
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
            <Label htmlFor="eventLocation">{t('modals.createEvent.location')}</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="eventLocation"
                placeholder={t('modals.createEvent.locationPlaceholder')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
                maxLength={100}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventCategory">{t('modals.createEvent.category')}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={t('modals.createEvent.selectCategory', { defaultValue: "Type d'événement" })} />
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
              <Label htmlFor="maxAttendees">{t('modals.createEvent.maxAttendees')}</Label>
              <div className="relative mt-2">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="maxAttendees"
                  type="number"
                  placeholder={t('modals.createEvent.unlimited', { defaultValue: "Illimité" })}
                  value={maxAttendees}
                  onChange={(e) => setMaxAttendees(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>{t('modals.createEvent.cancel')}</Button>
            <Button onClick={handleSubmit} disabled={!title.trim() || !description.trim() || !date || !time || !location.trim() || !category} className="campus-gradient text-white hover:opacity-90">{t('modals.createEvent.create')}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
