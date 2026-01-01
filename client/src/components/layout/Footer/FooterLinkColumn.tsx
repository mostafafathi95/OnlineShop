// FooterLinkColumn.tsx
import { Link } from "wouter";

interface LinkItem {
  name: string;
  href: string;
}

interface FooterLinkColumnProps {
  title: string;
  links: LinkItem[];
}

const FooterLinkColumn = ({ title, links }: FooterLinkColumnProps) => (
  <div>
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterLinkColumn;
