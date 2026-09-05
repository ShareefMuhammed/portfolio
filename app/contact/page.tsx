import { FoodPoint } from "@/components/snake";

export default function ContactPage() {
  return (
    <div className="relative py-8">
      <div className="mb-4 flex items-center justify-between">
        <FoodPoint id="food-contact-1" color="coral" />
        <FoodPoint id="food-contact-2" color="sage" />
      </div>
      <h1 className="font-pixel mb-4 text-2xl">Contact</h1>
      <p className="text-sm">Contact page placeholder</p>
    </div>
  );
}
