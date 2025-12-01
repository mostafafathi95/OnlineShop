import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { Address } from "@shared/schema";
import type { NewAddressForm } from "../types";

interface AddressStepProps {
  addresses?: Address[];
  selectedAddress: number | null;
  onSelectAddress: (id: number) => void;
  showNewAddress: boolean;
  onShowNewAddress: (show: boolean) => void;
  newAddress: NewAddressForm;
  onNewAddressChange: (address: NewAddressForm) => void;
  isLoading: boolean;
  onAddAddress: () => void;
}

export function AddressStep({
  addresses,
  selectedAddress,
  onSelectAddress,
  showNewAddress,
  onShowNewAddress,
  newAddress,
  onNewAddressChange,
  isLoading,
  onAddAddress,
}: AddressStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          انتخاب آدرس
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses && addresses.length > 0 && !showNewAddress && (
          <RadioGroup
            value={selectedAddress?.toString()}
            onValueChange={(value) => onSelectAddress(parseInt(value))}
          >
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedAddress === address.id
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-muted/50"
                }`}
                onClick={() => onSelectAddress(address.id)}
              >
                <RadioGroupItem value={address.id.toString()} id={`addr-${address.id}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{address.title}</span>
                    {address.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        پیش‌فرض
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {address.fullName} - {address.phone}
                  </p>
                  <p className="text-sm mt-1">
                    {address.province}، {address.city}، {address.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    کد پستی: {address.postalCode}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        )}

        {!showNewAddress && (
          <Button
            variant="outline"
            onClick={() => onShowNewAddress(true)}
            className="w-full"
          >
            <Plus className="ml-2 h-4 w-4" />
            افزودن آدرس جدید
          </Button>
        )}

        {showNewAddress && (
          <div className="space-y-4 p-4 rounded-lg bg-muted/50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>عنوان آدرس *</Label>
                <Input
                  placeholder="مثلا: خانه"
                  value={newAddress.title}
                  onChange={(e) => onNewAddressChange({ ...newAddress, title: e.target.value })}
                />
              </div>
              <div>
                <Label>نام و نام خانوادگی *</Label>
                <Input
                  value={newAddress.fullName}
                  onChange={(e) => onNewAddressChange({ ...newAddress, fullName: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>شماره تماس *</Label>
                <Input
                  dir="ltr"
                  value={newAddress.phone}
                  onChange={(e) => onNewAddressChange({ ...newAddress, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>کد پستی *</Label>
                <Input
                  dir="ltr"
                  value={newAddress.postalCode}
                  onChange={(e) => onNewAddressChange({ ...newAddress, postalCode: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>استان *</Label>
                <Input
                  value={newAddress.province}
                  onChange={(e) => onNewAddressChange({ ...newAddress, province: e.target.value })}
                />
              </div>
              <div>
                <Label>شهر *</Label>
                <Input
                  value={newAddress.city}
                  onChange={(e) => onNewAddressChange({ ...newAddress, city: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>آدرس کامل *</Label>
              <Textarea
                value={newAddress.address}
                onChange={(e) => onNewAddressChange({ ...newAddress, address: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={onAddAddress} disabled={isLoading}>
                {isLoading ? "در حال ذخیره..." : "ذخیره آدرس"}
              </Button>
              <Button variant="outline" onClick={() => onShowNewAddress(false)}>
                انصراف
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
