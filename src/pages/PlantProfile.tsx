import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Droplets, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PlantProfile = () => {
  const navigate = useNavigate();

  // Mock plant data
  const plant = {
    name: "Monstera Deliciosa",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=800&fit=crop",
    light: "Bright, indirect light",
    watering: "Once a week",
    difficulty: "Easy",
    tip: "Wipe leaves with a damp cloth monthly to keep them glossy and help the plant breathe better!",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-primary hover:bg-primary/10"
          >
            ← Back to Feed
          </Button>
          <h2 className="font-display text-xl text-primary">Plant Profile</h2>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Column - Image */}
              <div className="relative bg-primary/5 flex items-center justify-center p-8 md:p-12">
                <div className="relative w-full aspect-square max-w-md">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 text-6xl opacity-20">🌿</div>
                  <div className="absolute -bottom-2 -left-2 text-4xl opacity-20">✨</div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-card">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="font-display text-4xl md:text-5xl text-foreground mb-2">
                    {plant.name}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
                    {plant.difficulty} Care
                  </Badge>
                </CardHeader>

                <CardContent className="p-0 space-y-6">
                  {/* Light Requirements */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sun className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">Light</h3>
                      <p className="text-muted-foreground">{plant.light}</p>
                    </div>
                  </div>

                  {/* Watering */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">Watering</h3>
                      <p className="text-muted-foreground">{plant.watering}</p>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">Difficulty</h3>
                      <p className="text-muted-foreground">{plant.difficulty}</p>
                    </div>
                  </div>

                  {/* Care Tip */}
                  <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Quick Care Tip</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {plant.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* Decorative bottom elements */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-sm text-muted-foreground">Keep growing! 🌱</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlantProfile;
