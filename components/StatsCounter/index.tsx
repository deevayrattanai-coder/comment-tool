"use client";
import { useEffect, useState } from "react";

function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
}

export default function StatsCounter() {
  const comments = useCountUp(5000);
  const brands = useCountUp(100);
  const rating = useCountUp(49); // 4.9 scaled

  return (
    <section className="max-w-[1100px] mx-auto px-6 pb-10 ">
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {/* Comments */}
        <div className="relative p-8 transition">
          <div className="text-3xl md:text-4xl font-extrabold text-foreground">
            {comments.toLocaleString()}+
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Comments Generated
          </p>

          <div className="absolute inset-0 opacity-0  transition bg-gradient-to-br from-purple-500/10 to-primary/10 rounded-2xl" />
        </div>

        {/* Brands */}
        <div className="relative p-8 transition">
          <div className="text-3xl md:text-4xl font-extrabold text-foreground">
            {brands}+
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Brands & Agencies
          </p>

          <div className="absolute inset-0 opacity-0  transition bg-gradient-to-br from-purple-500/10 to-primary/10 rounded-2xl" />
        </div>

        {/* Rating */}
        <div className="relative p-8 transition">
          <div className="text-3xl md:text-4xl font-extrabold text-foreground">
            {(rating / 10).toFixed(1)}/5
          </div>
          <p className="text-sm text-muted-foreground mt-2">Average Rating</p>

          <div className="absolute inset-0 opacity-0  transition bg-gradient-to-br from-purple-500/10 to-primary/10 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
