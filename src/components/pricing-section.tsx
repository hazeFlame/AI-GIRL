"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const TimelineContent = ({
  children,
  className,
  customVariants,
  animationNum,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  customVariants: Variants;
  animationNum: number;
  as?: "div" | "p";
}) => {
  if (as === "p") {
    return (
      <motion.p
        variants={customVariants}
        custom={animationNum}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={className}
      >
        {children}
      </motion.p>
    );
  }
  return (
    <motion.div
      variants={customVariants}
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Mocking VerticalCutReveal as a simple stagger reveal
const VerticalCutReveal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

import { plans } from "@/config/pricing";

const PricingSwitch = ({ onSwitch }: { onSwitch: (val: string) => void }) => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div className="flex justify-center mt-8">
      <div className="bg-secondary p-1 rounded-full flex border border-border relative">
        <button
          onClick={() => {
            setIsYearly(false);
            onSwitch("0");
          }}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 ${
            !isYearly ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          按月订阅
        </button>
        <button
          onClick={() => {
            setIsYearly(true);
            onSwitch("1");
          }}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 ${
            isYearly ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          按年订阅
          <span className="absolute -top-3 -right-6 bg-red-500 text-[10px] px-2 py-0.5 rounded-full text-white font-bold scale-90">
            立省 33%
          </span>
        </button>
        <div
          className={`absolute top-1 bottom-1 w-1/2 bg-background shadow-sm rounded-full transition-transform duration-300 ease-in-out ${
            isYearly ? "translate-x-full" : "translate-x-0"
          }`}
          style={{ width: "calc(50% - 4px)" }}
        />
      </div>
    </div>
  );
};

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div className="min-h-screen relative bg-background overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-600 opacity-10 blur-[100px]"></div>
      </div>

      <article className="text-center mb-16 max-w-3xl mx-auto space-y-4 relative z-10 px-4">
        <h2 className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
          <VerticalCutReveal>
            开启你的心动羁绊
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={1}
          customVariants={revealVariants}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          体验有温度的情感共鸣，让超高情商的 AI 伴侣陪伴你的每一个深夜与日常。选择最合适你的订阅计划，即刻打破孤单。
        </TimelineContent>

        <TimelineContent as="div" animationNum={2} customVariants={revealVariants}>
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-3 max-w-6xl gap-8 px-4 mx-auto relative z-10">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={3 + index}
            customVariants={revealVariants}
          >
            <Card
              className={`relative h-full border ${
                plan.popular
                  ? "bg-gradient-to-b from-background to-secondary shadow-[0_0_40px_-10px_rgba(255,111,145,0.2)] dark:shadow-[0_0_40px_-10px_rgba(255,111,145,0.4)] z-20 scale-105 border-[#ff6f91]/50"
                  : "bg-card border-border z-10"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ff6f91] to-transparent" />
              )}
              <CardHeader className="text-left pb-4">
                <h3 className="text-2xl font-semibold mb-2 text-foreground">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    $
                    <NumberFlow
                      format={{ currency: "USD" }}
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl"
                    />
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    /{plan.isOneTime ? "永久" : isYearly ? "年" : "月"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col justify-between h-[calc(100%-140px)]">
                <div>
                  <button
                    className={`w-full mt-2 mb-8 py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
                      plan.popular
                        ? "bg-[#ff6f91] hover:bg-[#ff84a2] shadow-[0_0_20px_-5px_rgba(255,111,145,0.5)] text-white"
                        : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                    }`}
                  >
                    {plan.buttonText}
                  </button>

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-foreground">包含特权</h4>
                    <ul className="space-y-3">
                      {plan.includes.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <svg
                            className="w-4 h-4 text-[#ff6f91] mt-0.5 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
