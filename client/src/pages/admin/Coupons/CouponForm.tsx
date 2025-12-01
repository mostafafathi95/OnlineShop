import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { CouponFormData } from "./types";

interface CouponFormProps {
  formData: CouponFormData;
  setFormData: (data: CouponFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function CouponForm({ formData, setFormData, onSubmit, onCancel, isLoading }: CouponFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="code">کد کوپن</Label>
        <Input
          id="code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
          placeholder="مثال: SUMMER20"
          data-testid="input-coupon-code"
        />
      </div>
      <div>
        <Label htmlFor="description">توضیحات</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="توضیحات کوپن"
          rows={2}
          data-testid="input-coupon-description"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="discountType">نوع تخفیف</Label>
          <select
            id="discountType"
            className="w-full h-10 px-3 rounded-md border border-input"
            value={formData.discountType}
            onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
            data-testid="select-discount-type"
          >
            <option value="percentage">درصد</option>
            <option value="fixed">مبلغ ثابت</option>
          </select>
        </div>
        <div>
          <Label htmlFor="discountValue">مقدار تخفیف</Label>
          <Input
            id="discountValue"
            type="number"
            value={formData.discountValue}
            onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
            placeholder="0"
            data-testid="input-discount-value"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="minOrderValue">حداقل مبلغ سفارش</Label>
        <Input
          id="minOrderValue"
          type="number"
          value={formData.minOrderValue}
          onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
          placeholder="اختیاری"
          data-testid="input-min-order"
        />
      </div>
      <div>
        <Label htmlFor="maxUses">حداکثر استفاده</Label>
        <Input
          id="maxUses"
          type="number"
          value={formData.maxUses}
          onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
          placeholder="خالی = نامحدود"
          data-testid="input-max-uses"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">تاریخ شروع</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            data-testid="input-start-date"
          />
        </div>
        <div>
          <Label htmlFor="endDate">تاریخ انتها</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            data-testid="input-end-date"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          data-testid="switch-coupon-active"
        />
        <Label>فعال</Label>
      </div>
      <div className="flex gap-2 pt-4">
        <Button onClick={onSubmit} className="flex-1" disabled={isLoading} data-testid="button-save-coupon">
          ذخیره
        </Button>
        <Button variant="outline" className="flex-1" onClick={onCancel} data-testid="button-cancel-coupon">
          انصراف
        </Button>
      </div>
    </div>
  );
}
