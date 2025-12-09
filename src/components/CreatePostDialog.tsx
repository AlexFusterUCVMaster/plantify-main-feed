import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreatePostDialogProps {
  onPostCreated?: () => void;
}

const CreatePostDialog = ({ onPostCreated }: CreatePostDialogProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [plantName, setPlantName] = useState("");
  const [caption, setCaption] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Debes iniciar sesión para crear un post");
      return;
    }

    if (!imageFile) {
      toast.error("Por favor selecciona una imagen");
      return;
    }

    if (!plantName.trim()) {
      toast.error("Por favor ingresa el nombre de la planta");
      return;
    }

    setLoading(true);

    try {
      // Upload image to storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      // Create post in database
      const { error: insertError } = await supabase.from("posts").insert({
        user_id: user.id,
        image_url: publicUrlData.publicUrl,
        plant_name: plantName.trim(),
        caption: caption.trim() || null,
      });

      if (insertError) throw insertError;

      toast.success("¡Post creado exitosamente!");
      setOpen(false);
      setImageFile(null);
      setImagePreview(null);
      setPlantName("");
      setCaption("");
      onPostCreated?.();
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast.error("Error al crear el post: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Crear Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Compartir tu planta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Imagen de tu planta</Label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted"
                >
                  <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Haz clic para subir
                  </span>
                </label>
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="plantName">Nombre de la planta</Label>
            <Input
              id="plantName"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder="Ej: Monstera Deliciosa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="caption">Descripción (opcional)</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Cuéntanos sobre tu planta..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              "Publicar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
