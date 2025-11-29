import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface OrderSuccessCelebrationProps {
  orderId: number;
  isVisible: boolean;
}

export function OrderSuccessCelebration({ orderId, isVisible }: OrderSuccessCelebrationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>(
    []
  );

  useEffect(() => {
    if (isVisible) {
      // Generate confetti particles
      const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
      }));
      setConfetti(particles);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Confetti particles */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            animationDelay: `${particle.delay}s`,
          }}
        >
          <div className="text-2xl">🎉</div>
        </div>
      ))}

      {/* Success message */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-slide-up pointer-events-auto">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl p-8 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center animate-fade-scale">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400 animate-checkmark" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-400">
            سفارش شما تأیید شد!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            شماره سفارش: <span className="font-mono font-bold">#{orderId}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            شما به زودی ایمیل تأییدی دریافت خواهید کرد
          </p>
        </div>
      </div>
    </div>
  );
}
