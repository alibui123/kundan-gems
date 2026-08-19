import { HomePage } from "@/components/HomePage";
import { getBestsellers, getNewArrivals, getProducts } from "@/lib/products";

export default async function Page() {
  const [newArrivals, bestSellers, diamondProducts] = await Promise.all([
    getNewArrivals(4),
    getBestsellers(4),
    getProducts({ material: "diamond", limit: 5 }),
  ]);

  return (
    <HomePage
      newArrivals={newArrivals}
      bestSellers={bestSellers}
      diamondProducts={diamondProducts}
    />
  );
}
