import { FoodPoint } from "@/components/snake";

export default function AboutPage() {
  return (
    <div className="relative min-h-[400px] py-8">
      {/* Sequential Food Points */}
      <div className="absolute top-24 right-32">
        <FoodPoint id="about-food-1" order={1} color="sage" />
      </div>
      <div className="absolute bottom-20 left-40">
        <FoodPoint id="about-food-2" order={2} color="coral" />
      </div>

      <h1 className="font-pixel mb-4 text-2xl">About</h1>
      <p className="text-sm">
        About page placeholder — Snake resets to length 1 upon landing here.
      </p>
    </div>
  );
}
