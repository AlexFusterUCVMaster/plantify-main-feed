import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Comment {
  id: number;
  username: string;
  text: string;
}

interface Post {
  id: number;
  image: string;
  username: string;
  description?: string;
  likes: number;
  comments: Comment[];
}

interface PostViewerProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
}

const PostViewer = ({ post, open, onClose }: PostViewerProps) => {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 gap-0 h-[90vh] overflow-hidden bg-card/98 backdrop-blur-sm border border-border/30 shadow-2xl rounded-2xl">
        <DialogTitle className="sr-only">
          Post by @{post.username}
        </DialogTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Left Column - Image */}
          <div className="relative bg-muted/20 flex items-center justify-center overflow-hidden">
            <img
              src={post.image}
              alt={`Plant by ${post.username}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col bg-card/80 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {post.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-semibold text-foreground">
                  @{post.username}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 hover:bg-muted/60"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Description */}
            {post.description && (
              <div className="p-4 border-b border-border/40">
                <p className="text-sm text-foreground">{post.description}</p>
              </div>
            )}

            {/* Likes */}
            <div className="px-4 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive fill-destructive" />
                <span className="font-semibold text-foreground">
                  {post.likes} likes
                </span>
              </div>
            </div>

            {/* Comments */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-secondary-foreground">
                          {comment.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold text-foreground">
                            @{comment.username}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {comment.text}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No comments yet
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostViewer;
