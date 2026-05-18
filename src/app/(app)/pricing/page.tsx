import { PricingSection } from "@/components/pricing-section";

export const dynamic = "force-static";
export const revalidate = false;

export default function PricingPage() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="w-full">
        <PricingSection />
      </div>
    </div>
  );
}
