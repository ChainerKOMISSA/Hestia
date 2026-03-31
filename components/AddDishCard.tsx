"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function AddDishCard() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-primary/30 bg-secondary/30 hover:bg-secondary/10 hover:border-primary/40 transition-colors duration-200 w-full h-full min-h-55 text-center">
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg hover:cursor-pointer border-border hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
        onClick={() => router.push("/dishes/new")}
      >
        <Plus className="h-4 w-4" />
      </Button>

      <div className="space-y-1">
        <p className="font-bold text-sm text-foreground">Ajouter un plat</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Cliquez pour ajouter un plat
        </p>
      </div>
    </div>
  );
}
