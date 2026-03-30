import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export type Dish = {
  id?: string
  name: string
  description: string
  category: string
  tags: string[]
  imageUrl: string
  source: "user" | "mealdb"
}

const COLLECTION = "dishes"

export async function getDishes(): Promise<Dish[]> {
  const snapshot = await getDocs(collection(db, COLLECTION))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Dish))
}

export async function addDish(dish: Omit<Dish, "id">): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), dish)
  return ref.id
}

export async function deleteDish(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function updateDish(id: string, data: Partial<Dish>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data)
}
