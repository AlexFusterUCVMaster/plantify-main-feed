import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
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
    username: "greenthumb_sara",
    description: "My monstera is thriving! 🌿",
  },
  {
    id: 2,
    image: plant2,
    username: "plantlover_mike",
    description: "New calathea just arrived. Isn't she gorgeous?",
  },
  {
    id: 3,
    image: plant3,
    username: "succulentqueen",
    description: "My succulent collection keeps growing 🌵",
  },
  {
    id: 4,
    image: plant4,
    username: "urban_jungle",
    description: "Pothos vines are getting so long!",
  },
  {
    id: 5,
    image: plant5,
    username: "botanical_dreams",
    description: "Fiddle leaf fig finally got a new leaf 💚",
  },
  {
    id: 6,
    image: plant6,
    username: "plant_parent_jen",
    description: "Snake plant: the ultimate low-maintenance friend",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              image={post.image}
              username={post.username}
              description={post.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
