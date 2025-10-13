import { useState } from "react";
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

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/zip',
  'application/x-zip-compressed'
];

const resourceSchema = z.object({
  title: z.string()
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z.string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
  subject: z.string().min(1, { message: "Please select a subject" }),
  type: z.string().min(1, { message: "Please select a type" }),
  file: z.custom<File>((val) => val instanceof File, { message: "Please upload a file" })
    .refine((file) => file.size <= MAX_FILE_SIZE, { message: "File size must be less than 50MB" })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), { 
      message: "Invalid file type. Only PDF, DOC, PPT, and ZIP files are allowed" 
    }),
});

interface UploadResourceModalProps {
  children: React.ReactNode;
}

export function UploadResourceModal({ children }: UploadResourceModalProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const { toast } = useToast();

  const subjects = [
    { value: "math", label: "Mathematics" },
    { value: "cs", label: "Computer Science" },
    { value: "physics", label: "Physics" },
    { value: "economics", label: "Economics" },
    { value: "language", label: "Languages" },
    { value: "business", label: "Business" },
    { value: "engineering", label: "Engineering" }
  ];

  const types = [
    { value: "notes", label: "Course Notes" },
    { value: "summary", label: "Summaries" },
    { value: "exercises", label: "Exercises" },
    { value: "projects", label: "Projects" },
    { value: "slides", label: "Presentations" },
    { value: "exams", label: "Past Exams" }
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
      toast({
        variant: "destructive",
        title: "Tag too long",
        description: "Tags must be less than 20 characters",
      });
      return;
    }
    
    if (tags.length >= 5) {
      toast({
        variant: "destructive",
        title: "Maximum tags reached",
        description: "You can only add up to 5 tags",
      });
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
      toast({
        variant: "destructive",
        title: "File required",
        description: "Please upload a file",
      });
      return;
    }

    const validation = resourceSchema.safeParse({
      title,
      description,
      subject,
      type,
      file
    });

    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation failed",
        description: validation.error.errors[0].message,
      });
      return;
    }

    // Would integrate with backend
    toast({
      title: "Resource uploaded",
      description: "Your resource has been published successfully",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setSubject("");
    setType("");
    setFile(null);
    setTags([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Resource
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* File Upload */}
          <div>
            <Label>File *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-2">
                    <label htmlFor="file-upload">
                      <Button variant="outline" type="button" asChild>
                        <span>Choose a file</span>
                      </Button>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, DOC, PPT, ZIP up to 50MB
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="E.g., Complete Notes - Linear Algebra"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your resource..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
            />
          </div>

          {/* Subject & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Subject *</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="bg-popover">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {subjects.map((subj) => (
                    <SelectItem key={subj.value} value={subj.value}>
                      {subj.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-popover">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {types.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags (max 5)</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                maxLength={20}
              />
              <Button type="button" onClick={addTag} variant="outline" disabled={tags.length >= 5}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 campus-gradient text-white hover:opacity-90"
              onClick={handleSubmit}
              disabled={!title || !description || !subject || !type || !file}
            >
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
