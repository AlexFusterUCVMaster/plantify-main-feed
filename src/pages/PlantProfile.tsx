import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Sun, Droplets, TrendingUp, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PlantProfile = () => {
  const location = useLocation();
  const { post } = location.state || {};

  // Fallback plant data if no post is provided
  const fallbackPlant = {
    id: 0,
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80",
    plantName: "Monstera Deliciosa",
    username: "plantify_community",
    description: "A beautiful tropical plant perfect for any home",
    lightRequirements: "Bright indirect light",
    wateringFrequency: "Once a week",
    difficulty: "Easy",
    careTip: "Wipe the leaves monthly to help them breathe and absorb more light!",
  };

  const displayPost = post || fallbackPlant;

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.toLowerCase().includes("easy")) return "bg-tea-green text-foreground";
    if (difficulty.toLowerCase().includes("moderate")) return "bg-peach text-foreground";
    return "bg-lilac text-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to feed
          </Button>
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left column - Image */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={displayPost.image}
              alt={displayPost.plantName}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right column - Plant info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
                {displayPost.plantName}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Shared by @{displayPost.username}
              </p>
            </div>

            <Badge className={getDifficultyColor(displayPost.difficulty)}>
              {displayPost.difficulty}
            </Badge>

            <div className="space-y-4">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sun className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Light Requirements</h3>
                    <p className="text-sm text-muted-foreground">{displayPost.lightRequirements}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-tea-green">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tea-green/20">
                    <Droplets className="h-5 w-5 text-tea-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Watering Frequency</h3>
                    <p className="text-sm text-muted-foreground">{displayPost.wateringFrequency}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-peach">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peach/20">
                    <TrendingUp className="h-5 w-5 text-peach" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Difficulty Level</h3>
                    <p className="text-sm text-muted-foreground">{displayPost.difficulty}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-grape bg-gradient-to-br from-lilac/10 to-grape/10">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-grape/20">
                    <Lightbulb className="h-5 w-5 text-grape" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Care Tip</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{displayPost.careTip}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlantProfile;
