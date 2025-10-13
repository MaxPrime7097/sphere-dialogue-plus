import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Users, Lock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const groupSchema = z.object({
  name: z.string()
    .trim()
    .min(3, { message: "Group name must be at least 3 characters" })
    .max(50, { message: "Group name must be less than 50 characters" }),
  description: z.string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
});

interface CreateGroupModalProps {
  children: React.ReactNode;
}

export function CreateGroupModal({ children }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: "academic", label: "Academic" },
    { value: "creative", label: "Creative" },
    { value: "sport", label: "Sport" },
    { value: "tech", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "gaming", label: "Gaming" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = () => {
    const validation = groupSchema.safeParse({ name, description, category });
    
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
      title: "Group created",
      description: "Your group has been created successfully",
    });
    
    // Reset form
    setName("");
    setDescription("");
    setCategory("");
    setIsPrivate(false);
    setRequireApproval(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-popover">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Create New Group
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              placeholder="E.g., Web Development 2024"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
              maxLength={50}
            />
          </div>

          <div>
            <Label htmlFor="groupDescription">Description</Label>
            <Textarea
              id="groupDescription"
              placeholder="Describe your group's purpose and activities..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] mt-2"
              maxLength={500}
            />
          </div>

          <div>
            <Label htmlFor="groupCategory">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2 bg-popover">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                  <Label htmlFor="private">Private Group</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Private groups are not visible in search
                </p>
              </div>
              <Switch
                id="private"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="approval">Require Approval</Label>
                <p className="text-sm text-muted-foreground">
                  New join requests must be approved by an admin
                </p>
              </div>
              <Switch
                id="approval"
                checked={requireApproval}
                onCheckedChange={setRequireApproval}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!name.trim() || !description.trim() || !category}
              className="campus-gradient text-white hover:opacity-90"
            >
              Create Group
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}