import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Bell, Shield, Globe, Moon, Sun, ChevronRight, Lock, Mail, Trash2, Eye, FileText, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Settings() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [timezone, setTimezone] = useState("america-new-york");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    posts: true,
    messages: true,
    events: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    postVisibility: "friends",
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: t('settings.toast.themeUpdated'),
      description: `${t('settings.toast.switchedTo')} ${!darkMode ? t('settings.appearance.dark') : t('settings.appearance.light')} mode`,
    });
  };

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    toast({
      title: t('settings.toast.languageUpdated'),
      description: t('settings.toast.languageChanged'),
    });
  };

  const handleDeleteAccount = () => {
    // Would integrate with backend
    toast({
      variant: "destructive",
      title: t('settings.toast.accountDeletion'),
      description: t('settings.toast.accountDeletionDesc'),
    });
    setShowDeleteDialog(false);
  };

  const settingsSections = [
    {
      title: t('settings.account.title'),
      icon: User,
      items: [
        { 
          label: t('settings.account.personalInfo'),
          icon: User,
          action: () => navigate('/settings/personal-info')
        },
        { 
          label: t('settings.account.password'),
          icon: Lock,
          action: () => navigate('/settings/change-password')
        },
        { 
          label: t('settings.account.emailAuth'),
          icon: Mail,
          action: () => navigate('/settings/email-auth')
        },
        { 
          label: t('settings.account.deleteAccount'),
          icon: Trash2,
          action: () => setShowDeleteDialog(true), 
          danger: true 
        }
      ]
    },
    {
      title: t('settings.privacy.title'),
      icon: Shield,
      items: [
        { 
          label: t('settings.privacy.profileVisibility'),
          icon: Eye,
          hasDropdown: true,
          dropdownValue: privacy.profileVisibility,
          dropdownOptions: [
            { value: "public", label: t('settings.privacy.public') },
            { value: "friends", label: t('settings.privacy.friends') },
            { value: "private", label: t('settings.privacy.private') }
          ],
          onDropdownChange: (value: string) => setPrivacy(prev => ({ ...prev, profileVisibility: value }))
        },
        { 
          label: t('settings.privacy.postVisibility'),
          icon: FileText,
          hasDropdown: true,
          dropdownValue: privacy.postVisibility,
          dropdownOptions: [
            { value: "public", label: t('settings.privacy.public') },
            { value: "friends", label: t('settings.privacy.friends') },
            { value: "private", label: t('settings.privacy.onlyMe') }
          ],
          onDropdownChange: (value: string) => setPrivacy(prev => ({ ...prev, postVisibility: value }))
        },
        { 
          label: t('settings.privacy.dataDownloads'),
          icon: FileText,
          action: () => toast({ title: t('settings.toast.comingSoon'), description: t('settings.privacy.dataDownloads') })
        },
        { 
          label: t('settings.privacy.blockedUsers'),
          icon: UserX,
          action: () => toast({ title: t('settings.toast.comingSoon'), description: t('settings.privacy.blockedUsers') })
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container max-w-4xl mx-auto py-4 md:py-6 px-3 md:px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8 campus-animate-fade-in">
          <div className="mb-2">
            <h1 className="text-2xl md:text-3xl font-bold campus-gradient bg-clip-text text-transparent">
              {t('settings.title')}
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            {t('settings.subtitle')}
          </p>
        </div>

        <div className="grid gap-4 md:gap-6">
          {/* Notifications */}
          <Card className="campus-card">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                {t('settings.notifications.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Label htmlFor="posts-notifications" className="text-sm md:text-base">{t('settings.notifications.posts')}</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {t('settings.notifications.postsDesc')}
                  </p>
                </div>
                <Switch
                  id="posts-notifications"
                  checked={notifications.posts}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, posts: checked }))
                  }
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Label htmlFor="messages-notifications" className="text-sm md:text-base">{t('settings.notifications.messages')}</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {t('settings.notifications.messagesDesc')}
                  </p>
                </div>
                <Switch
                  id="messages-notifications"
                  checked={notifications.messages}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, messages: checked }))
                  }
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Label htmlFor="events-notifications" className="text-sm md:text-base">{t('settings.notifications.events')}</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {t('settings.notifications.eventsDesc')}
                  </p>
                </div>
                <Switch
                  id="events-notifications"
                  checked={notifications.events}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, events: checked }))
                  }
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Label htmlFor="marketing-notifications" className="text-sm md:text-base">{t('settings.notifications.marketing')}</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {t('settings.notifications.marketingDesc')}
                  </p>
                </div>
                <Switch
                  id="marketing-notifications"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, marketing: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="campus-card">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Globe className="h-4 w-4 md:h-5 md:w-5" />
                {t('settings.appearance.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <Label className="text-sm md:text-base">{t('settings.appearance.darkTheme')}</Label>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {t('settings.appearance.darkThemeDesc')}
                  </p>
                </div>
                <Button variant="outline" onClick={toggleTheme} size="sm" className="w-full sm:w-auto">
                  {darkMode ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      {t('settings.appearance.light')}
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      {t('settings.appearance.dark')}
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-sm md:text-base">{t('settings.appearance.language')}</Label>
                <Select value={i18n.language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full sm:w-64 bg-popover">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm md:text-base">{t('settings.appearance.timezone')}</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-full sm:w-64 bg-popover">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="america-new-york">America/New York</SelectItem>
                    <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                    <SelectItem value="europe-london">Europe/London</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Other Settings */}
          {settingsSections.map((section, index) => (
            <Card key={index} className="campus-card">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <section.icon className="h-4 w-4 md:h-5 md:w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 p-4 md:p-6 pt-0">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {item.hasDropdown ? (
                      <div className="flex items-center justify-between p-3 md:p-4">
                        <div className="flex items-center gap-2 flex-1">
                          {item.icon && <item.icon className="h-4 w-4 text-muted-foreground" />}
                          <span className="text-sm md:text-base">{item.label}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="w-32 justify-between bg-popover">
                              <span className="text-xs capitalize truncate">
                                {item.dropdownOptions?.find(opt => opt.value === item.dropdownValue)?.label}
                              </span>
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 bg-popover z-50">
                            {item.dropdownOptions?.map((option) => (
                              <DropdownMenuItem
                                key={option.value}
                                onClick={() => {
                                item.onDropdownChange?.(option.value);
                                toast({
                                  title: t('settings.privacy.updated'),
                                  description: `${item.label} ${option.label}`,
                                });
                              }}
                                className="cursor-pointer"
                              >
                                {option.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        className={`w-full justify-between h-auto p-3 md:p-4 text-sm md:text-base ${
                          item.danger ? 'text-destructive hover:text-destructive hover:bg-destructive/10' : ''
                        }`}
                        onClick={item.action}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    )}
                    {itemIndex < section.items.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* About */}
          <Card className="campus-card">
            <CardContent className="pt-4 md:pt-6 p-4 md:p-6">
              <div className="text-center space-y-4">
                <div>
                  <h3 className="font-semibold text-lg md:text-xl">CampusSphere</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{t('settings.about.version')}</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs md:text-sm">
                  <Button variant="link" className="px-0 h-auto">
                    {t('settings.about.terms')}
                  </Button>
                  <Button variant="link" className="px-0 h-auto">
                    {t('settings.about.privacyPolicy')}
                  </Button>
                  <Button variant="link" className="px-0 h-auto">
                    {t('settings.about.support')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delete Account Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-popover">
            <AlertDialogHeader>
              <AlertDialogTitle>{t('settings.deleteDialog.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('settings.deleteDialog.description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('settings.deleteDialog.cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {t('settings.deleteDialog.confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}