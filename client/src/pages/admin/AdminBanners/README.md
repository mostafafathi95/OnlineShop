# AdminBanners - بنرها مدیریت

## 📁 ساختار
```
AdminBanners/
├── page.tsx              # Main page component
├── index.ts              # Exports
├── hooks/
│   ├── useBannerForm.ts     # Form state management
│   ├── useBannerMutations.ts # API mutations
│   └── index.ts             # Exports
├── components/
│   ├── BannerForm.tsx       # Form fields
│   ├── BannerCard.tsx       # List item
│   ├── BannerDialog.tsx     # Dialog wrapper
│   └── index.ts             # Exports
└── types/
    └── index.ts             # Type exports
```

## 🎯 هر حصہ کی ذمہ داری

### page.tsx (Main)
- Data fetching with useQuery
- Component composition
- State coordination
- Event handlers

### hooks/useBannerForm.ts
- Form data state
- Edit/reset handlers
- Default values

### hooks/useBannerMutations.ts
- Create banner
- Update banner
- Delete banner
- Move (reorder) banner

### components/BannerForm.tsx
- All form inputs
- Image upload logic
- Validation

### components/BannerCard.tsx
- List item display
- Move buttons
- Edit/Delete buttons

### components/BannerDialog.tsx
- Dialog wrapper
- Form integration
- Submit buttons

## 🔄 Data Flow

```
page.tsx (uses hooks)
  ├── useBannerForm
  │   └── form state: formData, editingId
  ├── useBannerMutations
  │   └── mutations: create, update, delete, move
  └── useQuery
      └── banners data
      
Components:
  ├── BannerDialog
  │   └── BannerForm
  └── BannerCard (multiple)
```

## ✅ تمام Features
- ✓ Create banner
- ✓ Edit banner
- ✓ Delete with confirmation
- ✓ Image upload
- ✓ Reorder (move up/down)
- ✓ Status toggle
- ✓ Color selection
- ✓ Emoji support
