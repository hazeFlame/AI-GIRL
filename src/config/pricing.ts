export type PricingPlan = {
  name: string;
  price: number;
  yearlyPrice: number;
  isOneTime?: boolean;
  description: string;
  popular: boolean;
  buttonVariant: "default" | "outline" | "secondary";
  buttonText: string;
  includes: string[];
};

export const plans: PricingPlan[] = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    description: "Perfect for casual users getting started.",
    popular: false,
    buttonVariant: "outline",
    buttonText: "Current Plan",
    includes: ["Access to standard models", "50 messages/day", "Community support"],
  },
  {
    name: "Pro",
    price: 9.99,
    yearlyPrice: 99,
    description: "Unlock advanced AI capabilities.",
    popular: true,
    buttonVariant: "default",
    buttonText: "Upgrade to Pro",
    includes: ["Access to GPT-4o & Claude 3.5", "Unlimited messages", "Priority support", "Voice & Image gen"],
  },
  {
    name: "Lifetime",
    price: 199,
    yearlyPrice: 888.99,
    description: "Pay once, enjoy premium features forever.",
    popular: false,
    buttonVariant: "outline",
    buttonText: "Get Lifetime",
    includes: ["All Pro features", "Early access to betas", "No recurring fees"],
  },
];
