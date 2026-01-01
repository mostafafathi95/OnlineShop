// Footer.tsx
import FooterBrand from "./Footer/FooterBrand";
import FooterLinkColumn from "./Footer/FooterLinkColumn";
import FooterContactInfo from "./Footer/FooterContactInfo";
import { footerColumns, trustBadge, copyrightNotice } from "@/config/footerData";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const notice = copyrightNotice.replace("{year}", currentYear.toString());

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterBrand />
          {footerColumns.map((column) => (
            <FooterLinkColumn key={column.title} title={column.title} links={column.links} />
          ))}
          <FooterContactInfo />
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{notice}</p>
            <div className="flex items-center gap-4">
              <img
                src={trustBadge.src}
                alt={trustBadge.alt}
                className="h-12 opacity-60 dark:invert"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
