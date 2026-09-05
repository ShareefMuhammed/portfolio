import { FoodPoint } from "@/components/snake";

export default function HomePage() {
  return (
    <div className="relative min-h-[400px] py-8">
      {/* Sequential Food Points for Step 3 Verification */}
      {/* Food 1: Visible immediately at load, targeted by snake */}
      <div className="absolute top-20 left-36">
        <FoodPoint id="home-food-1" order={1} color="coral" />
      </div>

      {/* Food 2: Hidden until Food 1 is eaten */}
      <div className="absolute top-36 right-40">
        <FoodPoint id="home-food-2" order={2} color="sage" />
      </div>

      {/* Food 3: Hidden until Food 2 is eaten */}
      <div className="absolute bottom-16 left-52">
        <FoodPoint id="home-food-3" order={3} color="coral" />
      </div>

      <h1 className="font-pixel mb-4 text-2xl">Home</h1>
      <p className="max-w-xl text-sm leading-relaxed">
        Portfolio Home Placeholder — The ambient snake moves directly toward the
        active food point. When eaten, the snake grows by 1 and the next food
        point in sequence appears!
      </p>
    </div>
  );
}
