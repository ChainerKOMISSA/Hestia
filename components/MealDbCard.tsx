"use client"

import { type MealDBDish } from "@/lib/services/mealdb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookmarkPlus } from "lucide-react"
import Image from "next/image"
import { addDish } from "@/lib/services/dishes"
import { useState } from "react"

type Props = {
  meal: MealDBDish
  onSaved?: () => void
}

export function MealDBCard({ meal, onSaved }: Props) {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    await addDish({
      name: meal.strMeal,
      description: meal.strInstructions?.slice(0, 150) + "..." || "",
      category: meal.strCategory,
      tags: meal.strTags ? meal.strTags.split(",").map((t) => t.trim()) : [],
      imageUrl: meal.strMealThumb,
      source: "mealdb",
    })
    setSaved(true)
    setLoading(false)
    onSaved?.()
  }

  return (
    <Card className="overflow-hidden group relative">
      {/* Image */}
      <div className="relative h-40 w-full bg-muted">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover"
        />

        {/* Bouton sauvegarder au hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleSave}
            disabled={saved || loading}
          >
            <BookmarkPlus className="h-4 w-4 mr-1" />
            {saved ? "Enregistré !" : loading ? "..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      <CardContent className="p-3 space-y-2">
        <p className="font-semibold text-sm truncate">{meal.strMeal}</p>
        <div className="flex flex-wrap gap-1">
          {meal.strCategory && (
            <Badge variant="secondary" className="text-xs">
              {meal.strCategory}
            </Badge>
          )}
          {meal.strTags?.split(",").slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag.trim()}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}