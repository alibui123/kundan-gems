import { HomePage } from "@/components/HomePage";
import { getBestsellers, getNewArrivals } from "@/lib/products";

export default async function Page() {
  const [newArrivals, bestSellers] = await Promise.all([
    getNewArrivals(4),
    getBestsellers(4),
  ]);

  return <HomePage newArrivals={newArrivals} bestSellers={bestSellers} />;
}
