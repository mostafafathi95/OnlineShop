// FooterSocialLinks.tsx
import { SiInstagram, SiTelegram, SiWhatsapp } from "react-icons/si";
import { socialLinks } from "@/config/footerData";

const iconComponents: { [key: string]: React.ElementType } = {
  SiInstagram,
  SiTelegram,
  SiWhatsapp,
};

const FooterSocialLinks = () => (
  <div className="flex gap-3 mt-4">
    {socialLinks.map((link) => {
      const Icon = iconComponents[link.icon];
      return (
        <a
          key={link.name}
          href={link.href}
          aria-label={link['aria-label']}
          className="h-9 w-9 flex items-center justify-center rounded-full bg-muted hover-elevate"
        >
          {Icon && <Icon className="h-4 w-4" />}
        </a>
      );
    })}
  </div>
);

export default FooterSocialLinks;
