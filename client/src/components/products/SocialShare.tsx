import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SiTelegram, SiWhatsapp } from "react-icons/si";

interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const { toast } = useToast();

  const shareLinks = [
    {
      name: "تلگرام",
      icon: SiTelegram,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "واتس‌اپ",
      icon: SiWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    },
    {
      name: "ایمیل",
      icon: Share2,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({ title: "لینک کپی شد" });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">اشتراک‌گذاری:</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title={link.name}
            data-testid={`button-share-${link.name.toLowerCase()}`}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyLink}
          title="کپی لینک"
          data-testid="button-share-copy"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
