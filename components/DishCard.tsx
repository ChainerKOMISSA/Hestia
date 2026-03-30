"use client"

import { type Dish } from "@/lib/services/dishes"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import Image from "next/image"

type Props = {
  dish: Dish
  onDelete?: (id: string) => void
  onEdit?: (dish: Dish) => void
}

export function DishCard({ dish, onDelete, onEdit }: Props) {
  return (
    <Card className="overflow-hidden group relative">
      {/* Image */}
      <div className="relative h-40 w-full bg-muted">
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

        {/* Actions au hover */}
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

      <CardContent className="p-3 space-y-2">
        <p className="font-semibold text-sm truncate">{dish.name}</p>
        {dish.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {dish.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1">
          {dish.category && (
            <Badge variant="secondary" className="text-xs">
              {dish.category}
            </Badge>
          )}
          {dish.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}