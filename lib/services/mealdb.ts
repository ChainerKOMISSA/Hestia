export type MealDBDish = {
  idMeal: string
  strMeal: string
  strCategory: string
  strTags: string | null
  strMealThumb: string
  strInstructions: string
}


export async function searchMeals(query: string): Promise<MealDBDish[]> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  )
  const data = await res.json()
  return data.meals || []
}

export async function getRandomMeals(count = 50): Promise<MealDBDish[]> {
  const promises = Array.from({ length: count }, () =>
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((r) => r.json())
      .then((d) => d.meals[0])
  )
  return Promise.all(promises)
}

export async function getMealsByCategory(category: string): Promise<MealDBDish[]> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  )
  const data = await res.json()
  return data.meals || []
}