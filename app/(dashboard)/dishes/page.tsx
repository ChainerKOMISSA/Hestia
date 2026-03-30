"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { getDishes, type Dish } from "@/lib/services/dishes"
import { searchMeals, getRandomMeals, type MealDBDish } from "@/lib/services/mealdb"
import { DishCard } from "@/components/DishCard"
import { MealDBCard } from "@/components/MealDbCard"

export default function DishesPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [userDishes, setUserDishes] = useState<Dish[]>([])
  const [apiDishes, setApiDishes] = useState<MealDBDish[]>([])
  const [loading, setLoading] = useState(true)

  // Chargement initial
  useEffect(() => {
    async function load() {
      setLoading(true)
      const [dishes, meals] = await Promise.all([
        getDishes(),
        getRandomMeals(8),
      ])
      setUserDishes(dishes)
      setApiDishes(meals)
      setLoading(false)
    }
    load()
  }, [])

  // Recherche dans les deux sources
  useEffect(() => {
    if (!query.trim()) return
    const timeout = setTimeout(async () => {
      const [dishes, meals] = await Promise.all([
        getDishes(),
        searchMeals(query),
      ])
      setUserDishes(dishes.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      ))
      setApiDishes(meals)
    }, 400)
    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Plats</h1>
          <p className="text-muted-foreground text-sm">
            {userDishes.length} plat{userDishes.length > 1 ? "s" : ""} enregistré{userDishes.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => router.push("/dishes/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un plat
        </Button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une recette, un ingrédient..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="my-dishes">
        <TabsList variant="line">
          <TabsTrigger value="my-dishes">Mes plats</TabsTrigger>
          <TabsTrigger value="discover">Découvrir</TabsTrigger>
        </TabsList>

        <TabsContent value="my-dishes" className="mt-4">
          {loading ? (
            <p className="text-muted-foreground text-sm">Chargement...</p>
          ) : userDishes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>Aucun plat enregistré pour l&apos;instant.</p>
              <Button variant="outline" className="mt-4"
                onClick={() => router.push("/dishes/new")}>
                Ajouter mon premier plat
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="discover" className="mt-4">
          {loading ? (
            <p className="text-muted-foreground text-sm">Chargement...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {apiDishes.map((meal) => (
                <MealDBCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}