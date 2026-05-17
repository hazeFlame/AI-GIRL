import { PricingSection } from "@/components/pricing-section";

export const dynamic = "force-dynamic";

export default function PricingPage() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="w-full">
        <PricingSection />
      </div>
    </div>
  );
}
