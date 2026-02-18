// FooterBrand.tsx
import { brandInfo } from "@/config/footerData";
import FooterSocialLinks from "./FooterSocialLinks";

const FooterBrand = () => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
        <span className="text-2xl font-bold text-primary-foreground">{brandInfo.name.charAt(0)}</span>
      </div>
      <span className="font-bold text-xl">{brandInfo.name}</span>
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed">
      {brandInfo.description}
    </p>
    <FooterSocialLinks />
  </div>
);

export default FooterBrand;
