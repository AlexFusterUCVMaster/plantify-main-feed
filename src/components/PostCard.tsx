import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: {
    id: string | number;
    image: string;
    plantName: string;
    username: string;
    description?: string;
    lightRequirements: string;
    wateringFrequency: string;
    difficulty: string;
    careTip: string;
  };
  onClick?: () => void;
}

const PostCard = ({ post, onClick }: PostCardProps) => {
  // Random pastel border colors for polaroid effect
  const borderColors = [
    "border-t-lilac",
    "border-t-peach",
    "border-t-tea-green",
    "border-t-primary/30",
  ];
  const randomBorder =
    borderColors[Math.floor(Math.random() * borderColors.length)];

  return (
    <Card
      className={`group mb-6 overflow-hidden break-inside-avoid border-t-4 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 ${randomBorder}`}
    >
      <CardContent className="p-0">
        <div 
          onClick={onClick}
          className="relative cursor-pointer p-3 pb-0"
        >
          <div className="overflow-hidden rounded-lg">
            <img
              src={post.image}
              alt={`${post.plantName} by ${post.username}`}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* Decorative sparkle on hover */}
          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Sparkles className="h-5 w-5 animate-pulse text-white drop-shadow-lg" />
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">{post.plantName}</h3>
            <p className="text-sm text-muted-foreground">@{post.username}</p>
          </div>
          {post.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}
          <Link to="/plant-profile" state={{ post }}>
            <Button 
              variant="default" 
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            >
              View plant profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
