"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Companion = {
  id: string;
  name: string;
  role: string;
  tone: string;
  accent: string;
  image: string;
  affinity: number;
  status: string;
};

export function CompanionCarousel({ companions }: { companions: Companion[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      // Handle images dynamic loading and container resizing checks
      const timeoutId = setTimeout(checkScroll, 500);
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
        clearTimeout(timeoutId);
      };
    }
  }, [companions]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      // Scroll by 1 card width + gap (approx 340px) or 75% of viewport
      const scrollAmount = clientWidth > 768 ? clientWidth * 0.75 : 320;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Navigation Buttons Header */}
      <div className="absolute -top-14 right-0 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`size-9 rounded-full border-border/80 bg-background/80 backdrop-blur hover:bg-secondary hover:text-foreground transition-all duration-200 ${
            canScrollLeft ? "opacity-100 scale-100" : "opacity-30 scale-95 pointer-events-none"
          }`}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`size-9 rounded-full border-border/80 bg-background/80 backdrop-blur hover:bg-secondary hover:text-foreground transition-all duration-200 ${
            canScrollRight ? "opacity-100 scale-100" : "opacity-30 scale-95 pointer-events-none"
          }`}
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* Horizontal Scroll List */}
      <div
        ref={containerRef}
        className="w-full flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 px-1 -mx-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          div::-webkit-scrollbar {
            display: none !important;
          }
        `}} />
        
        {companions.map((companion) => (
          <div
            key={companion.id}
            className="w-[280px] sm:w-[310px] shrink-0 snap-start"
          >
            <Card 
              className="overflow-hidden bg-card border-border/60 hover:shadow-[0_0_30px_rgba(255,111,145,0.15)] hover:border-[#ff6f91]/30 transition-all duration-300 group flex flex-col justify-between h-[480px]"
            >
              <div>
                {/* Image Wrapper */}
                <div className="relative h-56 w-full bg-[#1b111b] overflow-hidden">
                  <Image
                    src={companion.image}
                    alt={companion.name}
                    fill
                    unoptimized
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="310px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur text-white gap-1.5">
                      <span className={`size-1.5 rounded-full ${companion.status === "在线" ? "bg-green-500 animate-pulse" : "bg-neutral-500"}`} />
                      {companion.status}
                    </span>
                  </div>
                </div>

                <CardHeader className="pt-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg group-hover:text-[#ff6f91] transition-colors duration-200">{companion.name}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">{companion.role}</CardDescription>
                    </div>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-mono font-medium">
                      亲密度 Lv.{Math.floor(companion.affinity / 20) + 1}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] leading-relaxed">
                    {companion.tone}
                  </p>

                  {/* Affinity Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-muted-foreground">好感度进度</span>
                      <span className="text-[#ff6f91]">{companion.affinity}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff6f91] to-[#ff84a2] rounded-full transition-all duration-500"
                        style={{ width: `${companion.affinity}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="p-6 pt-0">
                <Link href="/chat">
                  <Button className="w-full bg-secondary hover:bg-[#ff6f91] hover:text-white transition-all duration-300 border border-border/40 group-hover:border-[#ff6f91]/30">
                    开始互动
                    <ArrowUpRight className="size-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
