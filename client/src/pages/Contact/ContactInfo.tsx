import { Card, CardContent } from "@/components/ui/card";
import type { ContactInfo } from "./types";

interface ContactInfoProps {
  items: ContactInfo[];
}

export function ContactInfoCards({ items }: ContactInfoProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <Card key={index} className="hover-elevate">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-primary font-medium">{item.value}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
