"use client"

import { type MealDBDish } from "@/lib/services/mealdb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookmarkPlus, Check } from "lucide-react"
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
    <Card className="overflow-hidden group relative rounded-2xl shadow-sm border border-border flex flex-col">
      {/* Image */}
      <div className="relative h-44 w-full bg-muted overflow-hidden rounded-t-2xl">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-4 space-y-3 flex flex-col flex-1">
        {/* Nom */}
        <p className="font-bold text-sm truncate">{meal.strMeal}</p>

        {/* Badges */}
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

        {/* Bouton ajouter */}
        <Button
          size="sm"
          variant={saved ? "secondary" : "outline"}
          className="w-full mt-auto"
          onClick={handleSave}
          disabled={saved || loading}
        >
          {saved ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Ajouté à ma bibliothèque
            </>
          ) : (
            <>
              <BookmarkPlus className="h-4 w-4 mr-2" />
              {loading ? "Ajout en cours..." : "Ajouter à ma bibliothèque"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}