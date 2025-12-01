# 🔧 AdminBanners.tsx Refactoring Plan - مکمل تجزیہ

**فائل:** `client/src/pages/admin/AdminBanners.tsx` (521 لائنیں)  
**مقصد:** تقسیم کو 5 چھوٹی فائلوں میں منظم کریں  
**وقت:** ~45 منٹ  

---

## 📋 **حصہ 1: کوڈ تجزیہ**

### 1.1 Imports Analysis (29 لائنیں)
```typescript
// React & Query
import { useState } from "react";  // State management
import { useQuery, useMutation } from "@tanstack/react-query";  // Data fetching

// UI Components (shadcn)
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, ... } from "@/components/ui/dialog";  // 6 components
import { AlertDialog, AlertDialogAction, ... } from "@/components/ui/alert-dialog";  // 6 components

// Icons
import { Plus, Edit, Trash2, ChevronUp, ChevronDown, Upload, X, CheckCircle } from "lucide-react";

// Custom
import { apiRequest, queryClient } from "@/lib/queryClient";  // API
import { useToast } from "@/hooks/use-toast";  // Toast notifications
import type { Banner, InsertBanner } from "@shared/schema";  // Types
```

### 1.2 State Variables (17 لائنیں)
```typescript
const { toast } = useToast();  // Toast hook
const [isOpen, setIsOpen] = useState(false);  // Dialog state
const [editingId, setEditingId] = useState<number | null>(null);  // Edit mode
const [uploading, setUploading] = useState(false);  // Upload state
const [formData, setFormData] = useState<InsertBanner>({ ... });  // Form data
```

### 1.3 Query & Mutations (55 لائنیں)
```typescript
// Query: fetch banners
const { data: banners = [], isLoading } = useQuery<Banner[]>({
  queryKey: ["/api/banners/admin"],
});

// Mutations: create, update, delete, move
const createMutation = useMutation({ ... });
const updateMutation = useMutation({ ... });
const deleteMutation = useMutation({ ... });
const moveMutation = useMutation({ ... });
```

### 1.4 Functions (150 لائنیں)
```typescript
// handleSubmit() - فارم submit
// handleEdit() - بنر کو edit کے لیے set کریں
```

### 1.5 JSX Rendering (280 لائنیں)
```typescript
// Header + Dialog trigger (60 لائنیں)
// Dialog Form (230 لائنیں):
  - Title input
  - Subtitle input
  - Badge text input
  - Description textarea
  - Link input
  - Color pickers (2)
  - Icon input
  - Image upload (60 لائنیں)
  - Active checkbox
  - Dialog footer

// Banner List (100 لائنیں):
  - Loading state
  - Empty state
  - Cards rendering
  - Move up/down buttons
  - Edit button
  - Delete with AlertDialog
```

---

## 🎯 **حصہ 2: تقسیم کا منصوبہ**

### **نئی فائل ڈھانچہ:**

```
client/src/pages/admin/banners/
├── index.tsx                    // Main component (layout)
├── BannerForm.tsx              // Form component
├── BannerList.tsx              // List rendering
├── BannerActions.tsx           // Mutations & queries
├── hooks.ts                    // Custom hooks
└── types.ts                    // Type definitions
```

---

## 📊 **حصہ 3: تفصیلی تقسیم Plan**

### **Step 1: types.ts بنائیں (10 لائنیں)**
**ذمہ داری:** Type definitions اور constants

```typescript
// File: client/src/pages/admin/banners/types.ts

import type { Banner, InsertBanner } from "@shared/schema";

export interface BannerFormData extends InsertBanner {
  // Re-export for clarity
}

export interface BannerListProps {
  banners: Banner[];
  isLoading: boolean;
  onEdit: (banner: Banner) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, sortOrder: number) => void;
}

export const DEFAULT_BANNER_FORM: InsertBanner = {
  title: "",
  subtitle: "",
  badgeText: "",
  description: "",
  link: "",
  backgroundColor: "#ef4444",
  textColor: "#ffffff",
  imageUrl: "",
  icon: "📢",
  isActive: true,
  sortOrder: 0,
};
```

**Dependencies:**
- `@shared/schema` (Banner, InsertBanner types)

**Exports:**
- BannerFormData interface
- BannerListProps interface
- DEFAULT_BANNER_FORM constant

---

### **Step 2: hooks.ts بنائیں (80 لائنیں)**
**ذمہ داری:** Custom hooks - mutations اور queries

```typescript
// File: client/src/pages/admin/banners/hooks.ts

import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Banner, InsertBanner } from "@shared/schema";

// Query hook
export function useBannersQuery() {
  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/banners/admin"],
  });
  return { banners, isLoading };
}

// Create mutation
export function useBannerCreateMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertBanner) =>
      apiRequest("POST", "/api/banners", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      toast({ title: "بنر ایجاد شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });
}

// Update mutation
export function useBannerUpdateMutation(bannerId: number | null) {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertBanner) =>
      apiRequest("PUT", `/api/banners/${bannerId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      toast({ title: "بنر به‌روز شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });
}

// Delete mutation
export function useBannerDeleteMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: number) =>
      apiRequest("DELETE", `/api/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      toast({ title: "بنر حذف شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });
}

// Move mutation
export function useBannerMoveMutation() {
  return useMutation({
    mutationFn: async ({ id, sortOrder }: { id: number; sortOrder: number }) =>
      apiRequest("PUT", `/api/banners/${id}`, { sortOrder }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
    },
  });
}
```

**Dependencies:**
- `@tanstack/react-query` (useMutation, useQuery)
- `@/lib/queryClient` (apiRequest, queryClient)
- `@/hooks/use-toast` (useToast)
- `./types.ts` (Banner, InsertBanner)

**Exports:**
- useBannersQuery
- useBannerCreateMutation
- useBannerUpdateMutation
- useBannerDeleteMutation
- useBannerMoveMutation

---

### **Step 3: BannerForm.tsx بنائیں (230 لائنیں)**
**ذمہ داری:** Form dialog rendering

```typescript
// File: client/src/pages/admin/banners/BannerForm.tsx

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X as XIcon, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Banner, InsertBanner } from "@shared/schema";
import { DEFAULT_BANNER_FORM } from "./types";

interface BannerFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Banner | null;
  onSubmit: (data: InsertBanner) => void;
  isPending: boolean;
  isEditing: boolean;
}

export function BannerForm({
  isOpen,
  onOpenChange,
  initialData,
  onSubmit,
  isPending,
  isEditing,
}: BannerFormProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<InsertBanner>(
    initialData || DEFAULT_BANNER_FORM
  );

  const handleSubmit = () => {
    if (!formData.title) {
      toast({ title: "عنوان الزامی است", variant: "destructive" });
      return;
    }
    onSubmit(formData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "حجم فایل بیشتر از 5MB است", variant: "destructive" });
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, imageUrl: data.imageUrl });
        toast({ title: "تصویر با موفقیت آپلود شد ✓" });
      } else {
        toast({ title: "خطا در آپلود تصویر", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "خطای سرور در آپلود", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button data-testid="button-add-banner">
          <Plus className="h-4 w-4 ml-2" />
          افزودن بنر
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "ویرایش بنر" : "افزودن بنر جدید"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "بنر موجود را ویرایش کنید" : "یک بنر تبلیغاتی جدید ایجاد کنید"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">عنوان *</label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="عنوان بنر"
              data-testid="input-banner-title"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="text-sm font-medium">زیرعنوان</label>
            <Input
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              placeholder="زیرعنوان"
              data-testid="input-banner-subtitle"
            />
          </div>

          {/* Badge Text */}
          <div>
            <label className="text-sm font-medium">متن نشان</label>
            <Input
              value={formData.badgeText}
              onChange={(e) =>
                setFormData({ ...formData, badgeText: e.target.value })
              }
              placeholder="مثال: خرید ۲ تومان ۱"
              data-testid="input-banner-badge"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">توضیح</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="توضیح بنر"
              data-testid="input-banner-description"
            />
          </div>

          {/* Link */}
          <div>
            <label className="text-sm font-medium">لینک</label>
            <Input
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              placeholder="/products?category=electronics"
              data-testid="input-banner-link"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">رنگ پس‌زمینه</label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    backgroundColor: e.target.value,
                  })
                }
                className="w-full h-10 rounded cursor-pointer"
                data-testid="input-banner-bg-color"
              />
            </div>
            <div>
              <label className="text-sm font-medium">رنگ متن</label>
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) =>
                  setFormData({ ...formData, textColor: e.target.value })
                }
                className="w-full h-10 rounded cursor-pointer"
                data-testid="input-banner-text-color"
              />
            </div>
          </div>

          {/* Icon */}
          <div>
            <label className="text-sm font-medium">آیکون/ایموجی</label>
            <Input
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              placeholder="📢 یا 🎁 یا 🚀"
              maxLength={2}
              data-testid="input-banner-icon"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              تصویر بنر (اختیاری)
              {formData.imageUrl && <CheckCircle className="h-4 w-4 text-green-600" />}
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={uploading}
                  onChange={handleImageUpload}
                  data-testid="input-banner-image"
                  className="cursor-pointer"
                />
                {formData.imageUrl && (
                  <button
                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                    className="p-2 hover-elevate text-destructive"
                    type="button"
                    title="حذف تصویر"
                    data-testid="button-remove-image"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              {uploading && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Upload className="h-4 w-4 animate-spin" />
                  درحال آپلود...
                </div>
              )}
              {formData.imageUrl && (
                <div className="relative h-32 w-full rounded-lg overflow-hidden border-2 border-green-200 bg-green-50">
                  <img
                    src={formData.imageUrl}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                    data-testid="img-banner-preview"
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    بارگذاری شد
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                data-testid="input-banner-active"
              />
              <span className="text-sm">فعال</span>
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-banner"
          >
            لغو
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            data-testid="button-save-banner"
          >
            {isEditing ? "به‌روز کردن" : "افزودن"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

**Dependencies:**
- React, UI components, icons
- useToast hook
- types (DEFAULT_BANNER_FORM)
- @shared/schema (Banner, InsertBanner)

**Exports:**
- BannerForm component

---

### **Step 4: BannerList.tsx بنائیں (120 لائنیں)**
**ذمہ داری:** List و card rendering

```typescript
// File: client/src/pages/admin/banners/BannerList.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { Banner } from "@shared/schema";

interface BannerListProps {
  banners: Banner[];
  isLoading: boolean;
  onEdit: (banner: Banner) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, sortOrder: number) => void;
}

export function BannerList({
  banners,
  isLoading,
  onEdit,
  onDelete,
  onMove,
}: BannerListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        در حال بارگذاری...
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          هیچ بنری یافت نشد
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {banners.map((banner, index) => (
        <Card
          key={banner.id}
          style={{
            backgroundColor: `${banner.backgroundColor}20`,
            borderColor: banner.backgroundColor,
            borderWidth: "2px",
          }}
          className="overflow-hidden"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {/* Banner Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold">{banner.title}</h3>
                  <Badge
                    variant={banner.isActive ? "default" : "secondary"}
                  >
                    {banner.isActive ? "فعال" : "غیرفعال"}
                  </Badge>
                </div>
                {banner.subtitle && (
                  <p className="text-sm text-muted-foreground">
                    {banner.subtitle}
                  </p>
                )}
                {banner.badgeText && (
                  <p className="text-sm text-muted-foreground">
                    نشان: {banner.badgeText}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Move Up */}
                {index > 0 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      onMove(banner.id, banner.sortOrder - 1)
                    }
                    data-testid={`button-move-up-${banner.id}`}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                )}

                {/* Move Down */}
                {index < banners.length - 1 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      onMove(banner.id, banner.sortOrder + 1)
                    }
                    data-testid={`button-move-down-${banner.id}`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}

                {/* Edit */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit(banner)}
                  data-testid={`button-edit-banner-${banner.id}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                {/* Delete */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                      data-testid={`button-delete-banner-${banner.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                    <AlertDialogDescription>
                      این بنر حذف خواهد شد
                    </AlertDialogDescription>
                    <AlertDialogCancel>لغو</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(banner.id)}
                      className="bg-red-600 hover:bg-red-700"
                      data-testid="button-confirm-delete-banner"
                    >
                      حذف کردن
                    </AlertDialogAction>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

**Dependencies:**
- UI components
- Icons
- @shared/schema (Banner)

**Exports:**
- BannerList component

---

### **Step 5: index.tsx بنائیں (50 لائنیں)**
**ذمہ داری:** Main component layout

```typescript
// File: client/src/pages/admin/banners/index.tsx

import { useState } from "react";
import { BannerForm } from "./BannerForm";
import { BannerList } from "./BannerList";
import { useBannersQuery, useBannerCreateMutation, useBannerUpdateMutation, useBannerDeleteMutation, useBannerMoveMutation } from "./hooks";
import { DEFAULT_BANNER_FORM } from "./types";
import type { Banner, InsertBanner } from "@shared/schema";

export default function AdminBannersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const { banners, isLoading } = useBannersQuery();
  const createMutation = useBannerCreateMutation();
  const updateMutation = useBannerUpdateMutation(editingBanner?.id || null);
  const deleteMutation = useBannerDeleteMutation();
  const moveMutation = useBannerMoveMutation();

  const handleSubmit = (data: InsertBanner) => {
    if (editingBanner) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          setEditingBanner(null);
          setIsOpen(false);
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleMove = (id: number, sortOrder: number) => {
    moveMutation.mutate({ id, sortOrder });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">مدیریت بنرها</h1>
      </div>

      <BannerForm
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setEditingBanner(null);
        }}
        initialData={editingBanner}
        onSubmit={handleSubmit}
        isPending={createMutation.isPending || updateMutation.isPending}
        isEditing={!!editingBanner}
      />

      <BannerList
        banners={banners}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMove={handleMove}
      />
    </div>
  );
}
```

**Dependencies:**
- React, components, hooks
- @shared/schema types

**Exports:**
- AdminBannersPage (default)

---

## 📈 **حصہ 4: Implementation Tasks (Hierarchical)**

```
┌─ MAIN TASK: AdminBanners Refactoring
│
├─ TASK 1: Preparation
│  ├─ 1.1: Current code backup
│  ├─ 1.2: Create banners directory
│  └─ 1.3: Verify all imports work
│
├─ TASK 2: Create New Files (Order Critical)
│  ├─ 2.1: types.ts creation (simplest first)
│  ├─ 2.2: hooks.ts creation (uses types)
│  ├─ 2.3: BannerForm.tsx (uses types, hooks)
│  ├─ 2.4: BannerList.tsx (uses types)
│  └─ 2.5: index.tsx (uses all above)
│
├─ TASK 3: Update Parent Component
│  ├─ 3.1: Update AdminLayout to use new index.tsx
│  ├─ 3.2: Fix imports in App.tsx if needed
│  └─ 3.3: Test routing
│
├─ TASK 4: Validation
│  ├─ 4.1: Build check
│  ├─ 4.2: No TypeScript errors
│  ├─ 4.3: No missing imports
│  └─ 4.4: All tests pass
│
└─ TASK 5: Cleanup
   ├─ 5.1: Delete old AdminBanners.tsx
   ├─ 5.2: Update git
   └─ 5.3: Document changes
```

---

## 📝 **Import Map (سب سے اہم)**

### Circular Dependency Risk: ❌ NONE
- No file imports from a file that imports it

### Import Chain:
```
index.tsx
├── hooks.ts (queries & mutations)
│   └── types.ts ✅
├── BannerForm.tsx
│   └── types.ts ✅
├── BannerList.tsx
│   └── types.ts ✅
└── @shared/schema ✅
    └── types.ts references ✅
```

### External Dependencies (مجھے check کرنی ہے):
- ✅ `@tanstack/react-query` - موجود ہے
- ✅ `@/components/ui/*` - موجود ہے
- ✅ `lucide-react` - موجود ہے
- ✅ `@/hooks/use-toast` - موجود ہے
- ✅ `@/lib/queryClient` - موجود ہے
- ✅ `@shared/schema` - موجود ہے

---

## ⚠️ **Critical Points**

1. **AdminLayout wrapper:** Check if needed
2. **Default route:** Update to use new index.tsx
3. **Test IDs:** تمام testids محفوظ رہے
4. **API endpoints:** `/api/banners*` - unchanged
5. **Toast messages:** فارسی میں محفوظ

---

## ✅ **Validation Checklist**

- [ ] تمام 5 files بنے
- [ ] کوئی TypeScript errors نہیں
- [ ] تمام imports resolve ہوں
- [ ] Build successful ہو
- [ ] Pages load without error
- [ ] CRUD operations work
- [ ] Upload functionality works
- [ ] Move up/down works
- [ ] All test IDs present

---

**Next Step:** TASK 1 شروع کریں
