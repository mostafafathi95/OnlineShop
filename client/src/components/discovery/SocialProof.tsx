import { useEffect, useState } from "react";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Notification {
  id: string;
  text: string;
  timestamp: number;
}

export function SocialProof() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const messages = [
      "علی بابایی خریداری کرد: کتاب علمی",
      "فاطمه محمدی خریداری کرد: لپ‌تاپ گیمینگ",
      "محمد رضایی خریداری کرد: هدفون بی‌سیم",
      "زینب احمدی خریداری کرد: قاب گوشی",
      "حسین کریمی خریداری کرد: شارژر سریع",
      "مریم نوری خریداری کرد: کفش ورزشی",
      "امیر علی‌زاده خریداری کرد: ماوس گیمینگ",
      "سارا محسنی خریداری کرد: کیبورد مکانیکی",
    ];

    const addNotification = () => {
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      const newNotification: Notification = {
        id: Math.random().toString(),
        text: randomMessage,
        timestamp: Date.now(),
      };

      setNotifications((prev) => [newNotification, ...prev].slice(0, 5));

      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== newNotification.id)
        );
      }, 8000);
    };

    const interval = setInterval(addNotification, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-40 max-w-sm">
      {notifications.map((notif) => (
        <Card
          key={notif.id}
          className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/50 animate-slide-up flex gap-3 items-start hover-elevate"
        >
          <ShoppingCart className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-right">{notif.text}</p>
            <p className="text-xs text-muted-foreground mt-1">
              اکنون خریداری شده
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
