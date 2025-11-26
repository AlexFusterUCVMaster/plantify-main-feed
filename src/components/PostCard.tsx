import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface PostCardProps {
  image: string;
  username: string;
  description?: string;
}

const PostCard = ({ image, username, description }: PostCardProps) => {
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
        <div className="relative p-3 pb-0">
          <div className="overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`Plant by ${username}`}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* Decorative sparkle on hover */}
          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Sparkles className="h-5 w-5 animate-pulse text-white drop-shadow-lg" />
          </div>
        </div>
        <div className="p-4">
          <p className="font-semibold text-foreground">@{username}</p>
          {description && (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
