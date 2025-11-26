import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import PostViewer from "@/components/PostViewer";
import plant1 from "@/assets/plant1.jpg";
import plant2 from "@/assets/plant2.jpg";
import plant3 from "@/assets/plant3.jpg";
import plant4 from "@/assets/plant4.jpg";
import plant5 from "@/assets/plant5.jpg";
import plant6 from "@/assets/plant6.jpg";

const mockPosts = [
  {
    id: 1,
    image: plant1,
    plantName: "Monstera Deliciosa",
    username: "greenthumb_sara",
    description: "My monstera is thriving! 🌿",
    likes: 124,
    comments: [
      { id: 1, username: "plant_lover", text: "Beautiful! How do you keep it so healthy?" },
      { id: 2, username: "garden_guru", text: "Stunning monstera! 🌿" },
      { id: 3, username: "leafy_life", text: "Goals! Mine is still so small 😅" },
    ],
    lightRequirements: "Bright indirect light",
    wateringFrequency: "Once a week",
    difficulty: "Easy",
    careTip: "Wipe the leaves monthly to help them breathe and absorb more light!",
  },
  {
    id: 2,
    image: plant2,
    plantName: "Calathea Orbifolia",
    username: "plantlover_mike",
    description: "New calathea just arrived. Isn't she gorgeous?",
    likes: 89,
    comments: [
      { id: 1, username: "botanical_dreams", text: "Love the patterns on those leaves!" },
      { id: 2, username: "tropicalplants", text: "Calatheas are the best 💚" },
    ],
    lightRequirements: "Medium to bright indirect light",
    wateringFrequency: "2-3 times per week",
    difficulty: "Moderate",
    careTip: "Loves humidity! Mist regularly or use a pebble tray to keep it happy.",
  },
  {
    id: 3,
    image: plant3,
    plantName: "Mixed Succulent Garden",
    username: "succulentqueen",
    description: "My succulent collection keeps growing 🌵",
    likes: 203,
    comments: [
      { id: 1, username: "desert_bloom", text: "Your collection is amazing!" },
      { id: 2, username: "cactus_carl", text: "I need all of these 😍" },
      { id: 3, username: "sunny_plants", text: "Where did you get that pink one?" },
    ],
    lightRequirements: "Bright direct light",
    wateringFrequency: "Every 2-3 weeks",
    difficulty: "Easy",
    careTip: "Let the soil dry completely between waterings - they love it dry!",
  },
  {
    id: 4,
    image: plant4,
    plantName: "Golden Pothos",
    username: "urban_jungle",
    description: "Pothos vines are getting so long!",
    likes: 156,
    comments: [
      { id: 1, username: "vine_vibes", text: "Time to propagate! 🌱" },
      { id: 2, username: "greenthumb_sara", text: "So lush and healthy!" },
    ],
    lightRequirements: "Low to bright indirect light",
    wateringFrequency: "Once a week",
    difficulty: "Very Easy",
    careTip: "Perfect for beginners! Trim and propagate in water to create new plants.",
  },
  {
    id: 5,
    image: plant5,
    plantName: "Fiddle Leaf Fig",
    username: "botanical_dreams",
    description: "Fiddle leaf fig finally got a new leaf 💚",
    likes: 178,
    comments: [
      { id: 1, username: "fig_fanatic", text: "Congrats! New growth is always exciting!" },
      { id: 2, username: "plant_parent_jen", text: "Mine never grows 😭" },
      { id: 3, username: "leafy_life", text: "What's your secret?" },
    ],
    lightRequirements: "Bright indirect light",
    wateringFrequency: "Once a week",
    difficulty: "Moderate to Hard",
    careTip: "Keep it in one spot and avoid moving it around - they love stability!",
  },
  {
    id: 6,
    image: plant6,
    plantName: "Snake Plant",
    username: "plant_parent_jen",
    description: "Snake plant: the ultimate low-maintenance friend",
    likes: 92,
    comments: [
      { id: 1, username: "easy_greens", text: "Perfect for beginners!" },
      { id: 2, username: "urban_jungle", text: "Can't kill these if you tried 😂" },
    ],
    lightRequirements: "Low to bright indirect light",
    wateringFrequency: "Every 2-3 weeks",
    difficulty: "Very Easy",
    careTip: "The ultimate beginner plant - it thrives on neglect!",
  },
];

const Index = () => {
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Latest from our community
          </h2>
          <p className="mt-2 text-muted-foreground">
            Discover beautiful plants shared by fellow plant lovers
          </p>
        </div>
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </main>
      
      <PostViewer
        post={selectedPost}
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
};

export default Index;
