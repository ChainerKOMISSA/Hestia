"use client"

import { useState } from "react"
import { type Dish } from "@/lib/services/dishes"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil, Heart, Clock, BarChart2 } from "lucide-react"
import Image from "next/image"

type Props = {
  dish: Dish
  onDelete?: (id: string) => void
  onEdit?: (dish: Dish) => void
}

const tagColor: Record<string, string> = {
  "végé": "bg-green-500",
  "sain": "bg-emerald-500",
  "classique": "bg-primary",
  "épicé": "bg-red-500",
  "dessert": "bg-pink-400",
  "soupe": "bg-blue-400",
  "viande": "bg-orange-500",
}

export function DishCard({ dish, onDelete, onEdit }: Props) {
  const [favorite, setFavorite] = useState(dish.isFavorite ?? false)
  const mainTag = dish.tags?.[0]
  const tagBg = mainTag ? (tagColor[mainTag.toLowerCase()] ?? "bg-primary") : null

  return (
    <Card className="group relative rounded-2xl shadow-sm border border-border">
      {/* Image */}
      <div className="relative h-44 w-full bg-muted overflow-hidden rounded-t-2xl">
        {dish.imageUrl ? (
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
            Pas d&apos;image
          </div>
        )}

        {/* Bouton favori */}
        <button
          onClick={() => setFavorite(!favorite)}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow transition-transform hover:scale-110"
        >
          <Heart
            className="h-4 w-4 transition-colors"
            fill={favorite ? "#ef4444" : "none"}
            stroke={favorite ? "#ef4444" : "#6b7280"}
          />
        </button>

        {/* Badge tag principal */}
        {mainTag && tagBg && (
          <span className={`absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white uppercase tracking-wide ${tagBg}`}>
            {mainTag}
          </span>
        )}

        {/* Actions edit/delete au hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {onEdit && (
            <Button size="icon" variant="secondary" onClick={() => onEdit(dish)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && dish.id && (
            <Button size="icon" variant="destructive" onClick={() => onDelete(dish.id!)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        {/* Nom */}
        <p className="font-bold text-sm truncate">{dish.name}</p>

        {/* Description */}
        {dish.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {dish.description}
          </p>
        )}

        {/* Temps + Difficulté */}
        {(dish.prepTime || dish.difficulty) && (
          <div className="flex items-center gap-3 pt-1">
            {dish.prepTime && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {dish.prepTime} min
              </span>
            )}
            {dish.difficulty && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <BarChart2 className="h-3.5 w-3.5 text-primary" />
                {dish.difficulty}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}