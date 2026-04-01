"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDishes, type Dish } from "@/lib/services/dishes";
import {
  searchMeals,
  getRandomMeals,
  type MealDBDish,
} from "@/lib/services/mealdb";
import { DishCard } from "@/components/DishCard";
import { MealDBCard } from "@/components/MealDbCard";
import { AddDishCard } from "@/components/AddDishCard";

export default function DishesPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [userDishes, setUserDishes] = useState<Dish[]>([]);
  const [apiDishes, setApiDishes] = useState<MealDBDish[]>([]);
  const [loading, setLoading] = useState(true);
  const allDishesRef = useRef<Dish[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        const [dishes, meals] = await Promise.all([
          getDishes(),
          getRandomMeals(50),
        ]);
        if (!isMounted) return;
        setUserDishes(dishes);
        allDishesRef.current = dishes;
        setApiDishes(meals);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  // Recherche dans les deux sources
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const [dishes, meals] = await Promise.all([
        getDishes(),
        searchMeals(query),
      ]);
      if (!query.trim()) {
        setUserDishes(allDishesRef.current);
        setApiDishes(meals);
        return;
      }
      setUserDishes(
        dishes.filter((d) =>
          d.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
      setApiDishes(meals);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ma bibliothèque de plats</h1>
          <p className="text-muted-foreground text-sm">
            {userDishes.length} plat{userDishes.length > 1 ? "s" : ""}{" "}
            enregistré{userDishes.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex gap-4">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une recette, un ingrédient..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg hover:cursor-pointer border-border hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
          >
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="my-dishes" className="w-full flex flex-col gap-4">
        <TabsList variant="line">
          <TabsTrigger value="my-dishes">Mes plats</TabsTrigger>
          <TabsTrigger value="discover">Découvrir</TabsTrigger>
        </TabsList>

        <TabsContent value="my-dishes" className="mt-4">
          {loading ? (
            <p className="text-muted-foreground text-sm">Chargement...</p>
          ) : userDishes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="mb-4">Aucun plat enregistré pour l&apos;instant.</p>
              <AddDishCard />
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {userDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
              <AddDishCard />
            </div>
          )}
        </TabsContent>

        <TabsContent value="discover" className="mt-4">
          {loading ? (
            <p className="text-muted-foreground text-sm">Chargement...</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {apiDishes.map((meal) => (
                <MealDBCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
