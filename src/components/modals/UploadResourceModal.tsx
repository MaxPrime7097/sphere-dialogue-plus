import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, FileText, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/zip',
  'application/x-zip-compressed'
];

interface UploadResourceModalProps {
  children: React.ReactNode;
}

export function UploadResourceModal({ children }: UploadResourceModalProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const { toast } = useToast();

  const resourceSchema = z.object({
    title: z.string().trim().min(3, { message: t('modals.uploadResource.titleRequired') }).max(100, { message: t('modals.uploadResource.titleTooLong') }),
    description: z.string().trim().min(10, { message: t('modals.uploadResource.descriptionRequired', { defaultValue: "La description est requise" }) }).max(500, { message: t('modals.uploadResource.descriptionTooLong') }),
    subject: z.string().min(1, { message: t('modals.uploadResource.subjectRequired') }),
    type: z.string().min(1, { message: t('modals.uploadResource.typeRequired') }),
    file: z.custom<File>((val) => val instanceof File, { message: t('modals.uploadResource.fileRequired') })
      .refine((file) => file.size <= MAX_FILE_SIZE, { message: t('modals.uploadResource.fileTooLarge') })
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), { message: t('modals.uploadResource.invalidFileType') }),
  });

  const subjects = [
    { value: "math", label: t('modals.uploadResource.subjects.math') },
    { value: "cs", label: t('modals.uploadResource.subjects.cs') },
    { value: "physics", label: t('modals.uploadResource.subjects.physics') },
    { value: "chemistry", label: t('modals.uploadResource.subjects.chemistry') },
    { value: "biology", label: t('modals.uploadResource.subjects.biology') },
    { value: "literature", label: t('modals.uploadResource.subjects.literature') },
    { value: "history", label: t('modals.uploadResource.subjects.history') },
    { value: "other", label: t('modals.uploadResource.subjects.other') }
  ];

  const types = [
    { value: "notes", label: t('modals.uploadResource.types.notes') },
    { value: "slides", label: t('modals.uploadResource.types.slides') },
    { value: "exercises", label: t('modals.uploadResource.types.exercises') },
    { value: "exams", label: t('modals.uploadResource.types.exams') },
    { value: "tutorials", label: t('modals.uploadResource.types.tutorials') },
    { value: "other", label: t('modals.uploadResource.types.other') }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;
    if (trimmedTag.length > 20) {
      toast({ variant: "destructive", title: t('modals.uploadResource.tagTooLong') });
      return;
    }
    if (tags.length >= 5) {
      toast({ variant: "destructive", title: t('modals.uploadResource.maxTags') });
      return;
    }
    if (!tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    if (!file) {
      toast({ variant: "destructive", title: t('modals.uploadResource.fileRequired') });
      return;
    }

    const validation = resourceSchema.safeParse({ title, description, subject, type, file });
    if (!validation.success) {
      toast({ variant: "destructive", title: t('modals.uploadResource.validationFailed', { defaultValue: "Validation échouée" }), description: validation.error.errors[0].message });
      return;
    }

    toast({ title: t('modals.uploadResource.toast.success'), description: t('modals.uploadResource.toast.successDesc') });
    setTitle(""); setDescription(""); setSubject(""); setType(""); setFile(null); setTags([]); setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {t('modals.uploadResource.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>{t('modals.uploadResource.file')} *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setFile(null)}><X className="h-4 w-4" /></Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-2">
                    <label htmlFor="file-upload">
                      <Button variant="outline" type="button" asChild><span>{t('modals.uploadResource.chooseFile')}</span></Button>
                    </label>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.ppt,.pptx,.zip" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">PDF, DOC, PPT, ZIP up to 50MB</p>
                </>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="title">{t('modals.uploadResource.title_field')} *</Label>
            <Input id="title" placeholder={t('modals.uploadResource.titlePlaceholder', { defaultValue: "Ex : Notes complètes - Algèbre linéaire" })} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
          </div>

          <div>
            <Label htmlFor="description">{t('modals.uploadResource.description')} *</Label>
            <Textarea id="description" placeholder={t('modals.uploadResource.descPlaceholder', { defaultValue: "Décrivez votre ressource..." })} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('modals.uploadResource.subject')} *</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="bg-popover"><SelectValue placeholder={t('modals.uploadResource.selectSubject', { defaultValue: "Sélectionner une matière" })} /></SelectTrigger>
                <SelectContent className="bg-popover z-50">{subjects.map((subj) => (<SelectItem key={subj.value} value={subj.value}>{subj.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t('modals.uploadResource.type')} *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-popover"><SelectValue placeholder={t('modals.uploadResource.selectType', { defaultValue: "Sélectionner un type" })} /></SelectTrigger>
                <SelectContent className="bg-popover z-50">{types.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>{t('modals.uploadResource.tags')}</Label>
            <div className="flex gap-2 mb-2">
              <Input placeholder={t('modals.uploadResource.addTagPlaceholder', { defaultValue: "Ajouter un tag..." })} value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} maxLength={20} />
              <Button type="button" onClick={addTag} variant="outline" disabled={tags.length >= 5}>{t('modals.uploadResource.addTag')}</Button>
            </div>
            <div className="flex flex-wrap gap-2">{tags.map(tag => (<Badge key={tag} variant="secondary" className="cursor-pointer">{tag}<button type="button" onClick={() => removeTag(tag)} className="ml-2 text-xs">×</button></Badge>))}</div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>{t('modals.uploadResource.cancel')}</Button>
            <Button className="flex-1 campus-gradient text-white hover:opacity-90" onClick={handleSubmit} disabled={!title || !description || !subject || !type || !file}>{t('modals.uploadResource.publish')}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
