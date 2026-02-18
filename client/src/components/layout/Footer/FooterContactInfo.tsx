// FooterContactInfo.tsx
import { Phone, Mail, MapPin } from "lucide-react";
import { contactInfo } from "@/config/footerData";

const FooterContactInfo = () => (
  <div>
    <h3 className="font-semibold text-lg mb-4">{contactInfo.title}</h3>
    <ul className="space-y-3">
      <li className="flex items-center gap-3 text-muted-foreground">
        <Phone className="h-4 w-4 shrink-0" />
        <span dir="ltr">{contactInfo.phone}</span>
      </li>
      <li className="flex items-center gap-3 text-muted-foreground">
        <Mail className="h-4 w-4 shrink-0" />
        <span>{contactInfo.email}</span>
      </li>
      <li className="flex items-start gap-3 text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
        <span>{contactInfo.address}</span>
      </li>
    </ul>
  </div>
);

export default FooterContactInfo;
