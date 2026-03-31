"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Tag, Clock, Users } from "lucide-react";
import { addDish } from "@/lib/services/dishes";

export default function NewDishPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    tags: "",
    prepTime: "",
    servings: "",
    category: "",
    difficulty: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  }

  async function handleSubmit() {
    if (!form.name.trim()) return;
    setLoading(true);
    await addDish({
      name: form.name,
      description: form.description,
      category: form.category,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrl: imagePreview ?? "",
      source: "user",
      prepTime: form.prepTime ? parseInt(form.prepTime) : undefined,
      difficulty: form.difficulty,
      isFavorite: false,
    });
    setLoading(false);
    router.push("/dishes");
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Ajouter un plat</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Remplis les informations ci-dessous pour ajouter un nouveau plat à ta
          bibliothèque Hestia.
        </p>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colonne gauche — infos */}
        <div className="space-y-5">
          <h2 className="font-semibold text-base">Informations de base</h2>

          {/* Nom */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Nom du plat</Label>
            <Input
              id="name"
              name="name"
              placeholder="ex. Lasagnes de grand-mère"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Décris brièvement le plat, son origine ou son goût unique..."
              className="resize-none h-24"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="tags"
                name="tags"
                placeholder="Italien, Végé, Dîner..."
                className="pl-9"
                value={form.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Catégorie */}
          <div className="space-y-1.5">
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              name="category"
              placeholder="ex. Viande, Végétarien, Dessert..."
              value={form.category}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Colonne droite — image + temps */}
        <div className="space-y-5">
          <h2 className="font-semibold text-base">Image du plat</h2>

          {/* Upload image */}
          <label
            htmlFor="image-upload"
            className="relative flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed border-border bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer overflow-hidden"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-8 w-8" />
                <p className="text-sm font-medium">
                  Clique pour uploader ou glisse une image
                </p>
                <p className="text-xs">SVG, PNG, JPG ou GIF (max. 800x400px)</p>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {/* Temps + Portions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="prepTime">Temps de préparation</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="prepTime"
                  name="prepTime"
                  placeholder="30 mins"
                  className="pl-9"
                  value={form.prepTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="servings">Portions</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="servings"
                  name="servings"
                  placeholder="4"
                  className="pl-9"
                  value={form.servings}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="prepTime">Niveau de difficulté</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select name="difficulty" 
                onValueChange={(value) => setForm({ ...form, difficulty: value })}>
                  <SelectTrigger className="w-full max-w-48 pl-9">
                    <SelectValue placeholder="Difficulté..." />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Facile">Facile</SelectItem>
                      <SelectItem value="Moyen">Moyen</SelectItem>
                      <SelectItem value="Difficile">Difficile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleSubmit} disabled={loading || !form.name.trim()}>
          {loading ? "Enregistrement..." : "Enregistrer le plat"}
        </Button>
        <Button variant="outline" onClick={() => router.push("/dishes")}>
          Annuler
        </Button>
      </div>
    </div>
  );
}
