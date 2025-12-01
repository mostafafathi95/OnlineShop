import { DEALS } from "./types";

export function LandingDeals() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">پیشنهادات خاص</h2>
        <div className="grid grid-cols-3 gap-4">
          {DEALS.map((deal, idx) => (
            <div key={idx} className={`${deal.color} text-white p-6 rounded-lg text-center hover-elevate cursor-pointer`}>
              <div className="text-3xl font-bold mb-2">{deal.value}</div>
              <div className="text-sm font-semibold">{deal.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
