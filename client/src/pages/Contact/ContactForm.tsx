import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContactFormData } from "./types";

interface ContactFormProps {
  formData: ContactFormData;
  setFormData: (data: ContactFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function ContactForm({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: ContactFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ارسال پیام</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">نام و نام خانوادگی *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                data-testid="input-contact-name"
              />
            </div>
            <div>
              <Label htmlFor="email">ایمیل *</Label>
              <Input
                id="email"
                type="email"
                dir="ltr"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                data-testid="input-contact-email"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">شماره تماس</Label>
              <Input
                id="phone"
                dir="ltr"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                data-testid="input-contact-phone"
              />
            </div>
            <div>
              <Label htmlFor="subject">موضوع</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                data-testid="input-contact-subject"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="message">پیام *</Label>
            <Textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              data-testid="input-contact-message"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            data-testid="button-contact-submit"
          >
            {isSubmitting ? (
              "در حال ارسال..."
            ) : (
              <>
                <Send className="ml-2 h-4 w-4" />
                ارسال پیام
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
