import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, X, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Comment {
  id: string;
  username: string;
  text: string;
  user_id: string;
}

interface Post {
  id: string | number;
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
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const isDbPost = typeof post?.id === "string";

  const fetchComments = async () => {
    if (!post) return;
    
    if (!isDbPost) {
      setComments(post.comments || []);
      return;
    }

    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        text,
        user_id,
        profiles (username)
      `)
      .eq("post_id", post.id as string)
      .order("created_at", { ascending: true });

    if (!error && data) {
      const formattedComments: Comment[] = data.map((c: any) => ({
        id: c.id,
        text: c.text,
        user_id: c.user_id,
        username: c.profiles?.username || "Anónimo",
      }));
      setComments(formattedComments);
    } else {
      setComments(post.comments || []);
    }
  };

  useEffect(() => {
    if (open && post) {
      fetchComments();
    }
  }, [open, post?.id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user || !post) {
      if (!user) toast.error("Debes iniciar sesión para comentar");
      return;
    }

    setLoading(true);
    
    if (isDbPost) {
      const { error } = await supabase.from("comments").insert({
        post_id: post.id as string,
        user_id: user.id,
        text: newComment.trim(),
      });

      if (error) {
        toast.error("Error al publicar comentario");
        setLoading(false);
        return;
      }
      fetchComments();
    } else {
      // Para posts mock, añadir comentario localmente
      const newLocalComment: Comment = {
        id: crypto.randomUUID(),
        text: newComment.trim(),
        user_id: user.id,
        username: user.email?.split("@")[0] || "Usuario",
      };
      setComments((prev) => [...prev, newLocalComment]);
    }
    
    setNewComment("");
    toast.success("Comentario publicado");
    setLoading(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (isDbPost) {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) {
        toast.error("Error al eliminar comentario");
        return;
      }
      fetchComments();
    } else {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
    toast.success("Comentario eliminado");
  };

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
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
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
                      {user && user.id === comment.user_id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No hay comentarios aún
                  </p>
                )}
              </div>
            </ScrollArea>

            {/* Add Comment */}
            {user && (
              <div className="p-4 border-t border-border/40">
                <div className="flex gap-2">
                  <Input
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={handleAddComment}
                    disabled={loading || !newComment.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostViewer;
