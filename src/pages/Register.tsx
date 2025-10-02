import { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    avatar: null as File | null,
    bio: "",
    town: "",
    language: "",
    
    // Step 2: Academic Info
    university: "",
    faculty: "",
    studyYear: "",
    studentId: "",
    campus: "",
    
    // Step 3: Experience & Skills
    previousEducation: "",
    experiences: "",
    skills: [] as string[],
    interests: [] as string[],
    cv: null as File | null,
    portfolioLinks: ""
  });

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Handle registration completion
    navigate('/login');
  };

  const progress = (currentStep / totalSteps) * 100;

  const languages = ["Français", "English"];
  const studyYears = [
    "BTS 1 / HND 1",
    "BTS 2 / HND 2",
    "Licence 1 / Bachelor 1",
    "Licence 2 / Bachelor 2",
    "Licence 3 / Bachelor 3",
    "Licence 4 / Bachelor 4",
    "Master 1",
    "Master 2",
    "Doctorat 1 / Phd 1",
    "Doctorat 2 / Phd 2",
    "Doctorat 3 / Phd 3",
  ];
  const towns = ["Douala", "Yaoundé"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 campus-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">CS</span>
          </div>
          <h1 className="text-2xl font-bold campus-gradient bg-clip-text text-transparent">
            Rejoindre CampusSphere
          </h1>
          <p className="text-muted-foreground mt-2">
            Étape {currentStep} sur {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Informations personnelles</span>
            <span>Informations académiques</span>
            <span>Expérience & Compétences</span>
          </div>
        </div>

        <Card className="campus-card">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Informations personnelles"}
              {currentStep === 2 && "Informations académiques"}
              {currentStep === 3 && "Expérience & Compétences"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Nom d'utilisateur *</Label>
                    <Input
                      id="username"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email universitaire *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@universite.fr"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                   <div>
                    <Label htmlFor="phoneNumber">Numéro de Téléphone *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      required
                    />
                  </div>
                </div>  

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Mot de passe *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="avatar">Photo de profil</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-2">
                      <Button variant="outline" type="button">
                        Choisir une photo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG jusqu'à 5MB
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio courte</Label>
                  <Textarea
                    id="bio"
                    placeholder="Décrivez-vous en quelques mots..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    maxLength={150}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.bio.length}/150 caractères
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="town">Ville</Label>
                    <Select onValueChange={(value) => handleInputChange('town', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {towns.map(town => (
                          <SelectItem key={town} value={town}>
                            {town}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Langue principale</Label>
                    <Select onValueChange={(value) => handleInputChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre langue" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(language => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Info */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="university">Université/Institut *</Label>
                  <Input
                    id="university"
                    placeholder="Nom de votre université"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="faculty">Filière *</Label>
                    <Input
                      id="faculty"
                      placeholder="ex: Sélectionnez votre filière"
                      value={formData.faculty}
                      onChange={(e) => handleInputChange('faculty', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="studyYear">Niveau d'études *</Label>
                    <Select onValueChange={(value) => handleInputChange('studyYear', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {studyYears.map(year => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="studentId">Matricule étudiant *</Label>
                  <Input
                    id="studentId"
                    placeholder="Votre matricule d'étudiant"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="campus">Campus</Label>
                  <Input
                    id="campus"
                    placeholder="Si votre université a plusieurs campus"
                    value={formData.campus}
                    onChange={(e) => handleInputChange('campus', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Experience & Skills */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="previousEducation">Formations précédentes</Label>
                  <Textarea
                    id="previousEducation"
                    placeholder="Diplômes obtenus, formations suivies..."
                    value={formData.previousEducation}
                    onChange={(e) => handleInputChange('previousEducation', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="experiences">Expériences (stages, emplois)</Label>
                  <Textarea
                    id="experiences"
                    placeholder="Vos expériences professionnelles et stages..."
                    value={formData.experiences}
                    onChange={(e) => handleInputChange('experiences', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Compétences</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Ajouter une compétence"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                      Ajouter
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="cursor-pointer">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Domaines d'intérêt</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Ajouter un centre d'intérêt"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                    />
                    <Button type="button" onClick={addInterest} variant="outline">
                      Ajouter
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map(interest => (
                      <Badge key={interest} variant="outline" className="cursor-pointer">
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="cv">CV (optionnel)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <div className="mt-2">
                      <Button variant="outline" type="button">
                        Télécharger CV
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      PDF jusqu'à 10MB
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="portfolioLinks">Liens portfolio/réseaux</Label>
                  <Textarea
                    id="portfolioLinks"
                    placeholder="LinkedIn, GitHub, site web personnel..."
                    value={formData.portfolioLinks}
                    onChange={(e) => handleInputChange('portfolioLinks', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="campus-gradient text-white hover:opacity-90"
                >
                  Suivant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="campus-gradient text-white hover:opacity-90"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Terminer l'inscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <span className="text-muted-foreground text-sm">
            Déjà un compte ?{" "}
          </span>
          <Button 
            variant="link" 
            className="px-0 text-primary"
            onClick={() => navigate('/login')}
          >
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  );
}