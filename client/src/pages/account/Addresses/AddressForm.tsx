import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { AddressFormData } from "./types";

interface AddressFormProps {
  formData: AddressFormData;
  setFormData: (data: AddressFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function AddressForm({ formData, setFormData, onSubmit, isLoading }: AddressFormProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>عنوان آدرس *</Label>
          <Input
            placeholder="مثلا: خانه"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <Label>نام و نام خانوادگی *</Label>
          <Input
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>شماره تماس *</Label>
          <Input
            dir="ltr"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <Label>کد پستی *</Label>
          <Input
            dir="ltr"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>استان *</Label>
          <Input
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
          />
        </div>
        <div>
          <Label>شهر *</Label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label>آدرس کامل *</Label>
        <Textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>
      <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
        {isLoading ? "در حال ذخیره..." : "ذخیره آدرس"}
      </Button>
    </div>
  );
}
