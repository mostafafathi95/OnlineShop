# 🔨 Refactoring Plan: AdminBanners.tsx کو تقسیم کریں

## 📊 موجودہ وضعیت

**فایل:** `client/src/pages/admin/AdminBanners.tsx`  
**سائز:** 521 lines  
**مسئلہ:** بہت بڑی فائل، متعدد ذمہ داری  

---

## 🎯 Refactoring Strategy

### ماخذ: ایک فائل
### منزل: 5+ فائل

---

## 📐 نیا Architecture

```
AdminBanners/
├── page.tsx              # Main page (100 lines)
├── hooks/
│   ├── useBannerMutations.ts   # Mutations (mutations logic)
│   └── useBannerForm.ts        # Form state
├── components/
│   ├── BannerDialog.tsx        # Form dialog
│   ├── BannerCard.tsx          # List item
│   ├── BannerForm.tsx          # Form fields
│   └── BannerActions.tsx       # Buttons
└── types/
    └── index.ts                # Types
```

---

## 🔍 تفصیلی تقسیم

### 📄 File 1: `AdminBanners/page.tsx` (Main Page)
**ذمہ داری:** Router page، list display  
**Lines:** ~100  
**Dependencies:**
- useBannerMutations hook
- BannerDialog component
- BannerCard component
- useQuery for data

**کوڈ:**
```typescript
- Import statements (10)
- Export default component (1)
- useQuery call (8)
- Render logic (70)
  - Header + Button
  - List/Empty state
  - Card rendering
```

---

### 🪝 File 2: `AdminBanners/hooks/useBannerForm.ts`
**ذمہ داری:** Form state management  
**Lines:** ~50  
**Dependencies:**
- useState
- InsertBanner type

**کوڈ:**
```typescript
- Initial state definition
- useState calls (7)
- Reset function
- Helper functions
```

**Exports:**
```typescript
export const useBannerForm = (onSuccess) => {
  const [formData, setFormData] = useState<InsertBanner>({...})
  const [editingId, setEditingId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  
  const handleEdit = (banner: Banner) => {...}
  const resetForm = () => {...}
  
  return { formData, setFormData, editingId, setEditingId, uploading, setUploading, handleEdit, resetForm }
}
```

---

### 🪝 File 3: `AdminBanners/hooks/useBannerMutations.ts`
**ذمہ داری:** Mutations (Create, Update, Delete, Move)  
**Lines:** ~80  
**Dependencies:**
- useMutation
- useQuery
- apiRequest
- queryClient
- useToast

**کوڈ:**
```typescript
- createMutation (15 lines)
- updateMutation (15 lines)
- deleteMutation (12 lines)
- moveMutation (10 lines)
- Validation logic
```

**Exports:**
```typescript
export const useBannerMutations = () => {
  const createMutation = useMutation({...})
  const updateMutation = useMutation({...})
  const deleteMutation = useMutation({...})
  const moveMutation = useMutation({...})
  
  return { createMutation, updateMutation, deleteMutation, moveMutation }
}
```

---

### 🎨 File 4: `AdminBanners/components/BannerForm.tsx`
**ذمہ داری:** Form fields  
**Lines:** ~200  
**Dependencies:**
- Input, Textarea، etc (UI components)
- formData state
- handlers

**Inputs:**
```typescript
interface Props {
  formData: InsertBanner
  setFormData: (data: InsertBanner) => void
  uploading: boolean
  setUploading: (bool: boolean) => void
}
```

**Fields:**
```typescript
- Title input (20 lines)
- Subtitle input (15 lines)
- Badge text (15 lines)
- Description (15 lines)
- Link input (15 lines)
- Colors (30 lines)
- Icon (15 lines)
- Image upload (40 lines)
- Active checkbox (10 lines)
```

---

### 🧩 File 5: `AdminBanners/components/BannerCard.tsx`
**ذمہ داری:** List item display  
**Lines:** ~100  
**Dependencies:**
- Card, Badge
- Icons
- mutation handlers

**Inputs:**
```typescript
interface Props {
  banner: Banner
  index: number
  total: number
  onEdit: (banner: Banner) => void
  onDelete: (id: number) => void
  onMoveUp: (banner: Banner) => void
  onMoveDown: (banner: Banner) => void
}
```

**Render:**
```typescript
- Card wrapper
- Title + Badge (15 lines)
- Subtitle/Badge text (15 lines)
- Action buttons (40 lines)
  - Move up
  - Move down
  - Edit
  - Delete
- Delete confirmation dialog
```

---

### 🎯 File 6: `AdminBanners/components/BannerDialog.tsx`
**ذمہ داری:** Dialog wrapper + Form  
**Lines:** ~80  
**Dependencies:**
- Dialog components
- BannerForm
- Mutations

**Inputs:**
```typescript
interface Props {
  isOpen: boolean
  onOpenChange: (bool: boolean) => void
  editingId: number | null
  formData: InsertBanner
  setFormData: (data: InsertBanner) => void
  uploading: boolean
  setUploading: (bool: boolean) => void
  onSubmit: () => void
  isPending: boolean
}
```

---

### 🎯 File 7: `AdminBanners/components/BannerActions.tsx`
**ذمہ داری:** Action buttons + Dialogs  
**Lines:** ~60  
**Dependencies:**
- Buttons, Dialogs
- Icons
- Mutations

**Components:**
```typescript
- MoveButtons: Up/Down
- EditButton
- DeleteConfirmation
```

---

## 🔗 Dependencies Map

```
page.tsx
├── useBannerMutations hook
│   ├── useMutation (React Query)
│   ├── apiRequest (@/lib)
│   ├── queryClient (@/lib)
│   └── useToast (@/hooks)
├── useBannerForm hook
│   ├── useState
│   └── Banner type
├── BannerDialog component
│   ├── Dialog (UI)
│   ├── BannerForm component
│   └── DialogHeader/Footer
├── BannerCard component
│   ├── Card (UI)
│   ├── Badge (UI)
│   ├── Icons
│   ├── BannerActions component
│   └── AlertDialog
└── useQuery
    └── Banner[] type
```

---

## 📝 Import Changes Map

### **Page سے Imports:**
```typescript
// Remove:
- useState, useMutation, useQuery (move to hooks)
- Dialog/DialogContent/... (move to BannerDialog)
- All icons related to actions (move to components)

// Add:
+ BannerDialog
+ BannerCard
+ useBannerMutations
+ useBannerForm
```

### **BannerForm میں Imports:**
```typescript
// Add:
+ Input, Textarea (already imported)
+ CheckCircle, Upload, XIcon
+ useToast hook
```

### **BannerCard میں Imports:**
```typescript
// Add:
+ Card, Badge
+ Edit, Trash2, ChevronUp, ChevronDown icons
+ BannerActions component
+ AlertDialog
```

---

## 🔄 State Management Flow

```
page.tsx
  ├── useBannerForm hook
  │   ├── formData state
  │   ├── editingId state
  │   ├── uploading state
  │   └── handlers
  │
  ├── useBannerMutations hook
  │   ├── createMutation
  │   ├── updateMutation
  │   ├── deleteMutation
  │   └── moveMutation
  │
  └── useQuery for banners data
```

---

## ✅ Task Hierarchy

### **Task 1: Setup & Planning** ✅ (یہ فائل)
- [x] تقسیم کو بیان کریں
- [x] Dependencies map بنائیں
- [x] Import changes document کریں

### **Task 2: Extract Mutations Hook**
- [ ] 2.1: File بنائیں: `useBannerMutations.ts`
- [ ] 2.2: تمام mutations copy کریں
- [ ] 2.3: useToast اور hooks import کریں
- [ ] 2.4: Export کریں

### **Task 3: Extract Form Hook**
- [ ] 3.1: File بنائیں: `useBannerForm.ts`
- [ ] 3.2: Form state کو copy کریں
- [ ] 3.3: Form handlers copy کریں
- [ ] 3.4: Export کریں

### **Task 4: Create BannerForm Component**
- [ ] 4.1: File بنائیں: `BannerForm.tsx`
- [ ] 4.2: Dialog content کے input fields copy کریں (lines 181-378)
- [ ] 4.3: Props interface بنائیں
- [ ] 4.4: Imports صحیح کریں

### **Task 5: Create BannerCard Component**
- [ ] 5.1: File بنائیں: `BannerCard.tsx`
- [ ] 5.2: Card rendering logic copy کریں (lines 412-516)
- [ ] 5.3: Props interface بنائیں
- [ ] 5.4: Handlers pass کریں

### **Task 6: Create BannerDialog Component**
- [ ] 6.1: File بنائیں: `BannerDialog.tsx`
- [ ] 6.2: Dialog wrapper کو copy کریں (lines 146-400)
- [ ] 6.3: BannerForm اور footer رکھیں
- [ ] 6.4: Props pass کریں

### **Task 7: Create BannerActions Component** (اختیاری)
- [ ] 7.1: File بنائیں: `BannerActions.tsx`
- [ ] 7.2: Action buttons کو extract کریں
- [ ] 7.3: Reusable بنائیں

### **Task 8: Update Main Page**
- [ ] 8.1: File update: `AdminBanners/page.tsx`
- [ ] 8.2: Imports change کریں (hooks، components)
- [ ] 8.3: تمام state management remove کریں
- [ ] 8.4: Hooks use کریں
- [ ] 8.5: Components use کریں
- [ ] 8.6: Test کریں - کوئی error نہیں؟

### **Task 9: Testing & Verification**
- [ ] 9.1: Page load ہو رہا ہے؟
- [ ] 9.2: Banners show ہو رہے ہیں؟
- [ ] 9.3: Add banner کام کر رہا ہے؟
- [ ] 9.4: Edit کام کر رہا ہے؟
- [ ] 9.5: Delete کام کر رہا ہے؟
- [ ] 9.6: Move کام کر رہ ہے؟

### **Task 10: Final Cleanup**
- [ ] 10.1: پرانی AdminBanners.tsx delete کریں
- [ ] 10.2: ساری files میں testing کریں
- [ ] 10.3: Documentation update کریں

---

## 📊 Expected Result

```
Before: 521 lines in 1 file
After:  
├── page.tsx (100 lines)
├── hooks/
│   ├── useBannerForm.ts (50 lines)
│   └── useBannerMutations.ts (80 lines)
├── components/
│   ├── BannerForm.tsx (200 lines)
│   ├── BannerCard.tsx (100 lines)
│   ├── BannerDialog.tsx (80 lines)
│   └── BannerActions.tsx (60 lines)
└── types/
    └── index.ts (20 lines)

Total: 690 lines (but organized + reusable)
```

---

## 🎯 اگلا مرحلہ

**اب شروع کریں: Task 2 - Extract Mutations Hook**

---

**تاریخ:** 1 دسامبر 2025  
**Status:** 🔴 شروع نہیں ہوا  
**Next:** Task 2 سے شروع کریں!
