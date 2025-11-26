import { Card, CardContent } from "@/components/ui/card";

interface PostCardProps {
  image: string;
  username: string;
  description?: string;
}

const PostCard = ({ image, username, description }: PostCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={`Plant by ${username}`}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="p-4">
          <p className="font-semibold text-foreground">{username}</p>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
