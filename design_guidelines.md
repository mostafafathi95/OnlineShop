# E-Commerce Platform Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from modern e-commerce leaders (Shopify, Etsy, Amazon) with emphasis on conversion optimization, visual hierarchy, and seamless user flows. This platform balances product discovery with efficient purchasing.

## Typography System

**Font Families** (Google Fonts via CDN):
- Primary: Inter (headings, UI elements, navigation)
- Secondary: Open Sans (body text, descriptions)

**Hierarchy**:
- H1: 2.5rem/bold - Product titles, page headers
- H2: 2rem/semibold - Section headings, category titles
- H3: 1.5rem/medium - Card titles, subsections
- H4: 1.25rem/medium - Product names in grids
- Body Large: 1.125rem/regular - Product descriptions, CTAs
- Body: 1rem/regular - Standard text, form labels
- Small: 0.875rem/regular - Meta info, prices, badges
- Tiny: 0.75rem/medium - Labels, tags, status indicators

## Layout System

**Spacing Units** (Tailwind):
- Core units: 2, 4, 6, 8, 12, 16, 24
- Section padding: py-12 (mobile), py-20 (desktop)
- Card padding: p-4 to p-6
- Component gaps: gap-4 to gap-8
- Container max-width: max-w-7xl with px-4

**Grid Systems**:
- Product Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Category Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Checkout: Single column (mobile), 2-column split (desktop: form + summary)
- Admin Dashboard: Sidebar + main content (250px fixed sidebar)

## Component Library

### Navigation
- **Primary Header**: Full-width, sticky, logo left, search center, cart/account right
- **Category Menu**: Horizontal scroll on mobile, dropdown mega-menu on desktop
- **Breadcrumbs**: Always visible on product/category pages
- **Mobile Menu**: Slide-in drawer with nested categories

### Product Components
- **Product Card**: Image (4:5 ratio), title, price, quick-add button, wishlist icon
- **Product Grid**: Responsive with hover effects revealing additional info
- **Featured Products**: Larger cards in 2 or 3-column layout
- **Product Gallery**: Main image with thumbnail strip, zoom on click
- **Variant Selector**: Button group for options (sizes, colors)
- **Stock Indicator**: Badge system (In Stock, Low Stock, Out of Stock)

### Shopping Experience
- **Cart Drawer**: Slide-in from right, item list, subtotal, checkout CTA
- **Mini Cart Icon**: Badge with item count, always visible
- **Checkout Steps**: Progress indicator (1. Cart → 2. Shipping → 3. Payment → 4. Review)
- **Order Summary Card**: Sticky on desktop, collapsible on mobile

### Forms & Inputs
- **Input Fields**: Rounded borders (rounded-lg), clear labels above, helper text below
- **Buttons**: 
  - Primary (Add to Cart, Checkout): Large, rounded-lg, w-full on mobile
  - Secondary (Continue Shopping): Outlined style
  - Icon Buttons (Wishlist, Delete): Circular, minimal
- **Search Bar**: Prominent with icon, autocomplete suggestions dropdown
- **Filters**: Sidebar on desktop (250px), modal on mobile, accordion sections

### Admin Dashboard
- **Sidebar Navigation**: Fixed width (250px), icon + label, active state highlighting
- **Data Tables**: Sortable columns, row actions dropdown, pagination
- **Stats Cards**: Grid of 4 (metrics like total sales, orders, products, customers)
- **Charts**: Full-width sections with multiple visualization types
- **Action Buttons**: Floating on mobile, inline on desktop

### Content Sections
- **Hero Section**: Full-width, 60vh height, centered content with CTA buttons
- **Category Showcase**: 3-column grid with image + overlay text
- **Featured Collections**: Horizontal scroll cards on mobile, grid on desktop
- **Testimonials**: 3-column grid with avatar, quote, name
- **Newsletter**: Single centered form with large input + button

## Images

**Hero Images**:
- Full-width hero (1920x800px) showcasing featured products or seasonal campaign
- Image with overlay gradient for text readability
- CTA buttons with backdrop-blur-sm background

**Product Images**:
- High-quality product photos (800x1000px minimum)
- Multiple angles in gallery (4-6 images)
- Lifestyle shots showing product in use
- Consistent white/neutral backgrounds for catalog

**Category Images**:
- Large format (600x400px) for category cards
- Lifestyle photography representing category essence

**Content Images**:
- About page: Team photos, workspace imagery
- Blog posts: Featured images (1200x600px)

## Icons
**Heroicons** (via CDN): Use outline style for navigation/UI, solid for emphasis/actions

## Page-Specific Layouts

**Homepage**:
- Hero with 2 CTA buttons (Shop Now + Learn More)
- Featured Categories (3-column grid)
- Best Sellers (4-column product grid)
- Benefits/Features (4-column icon grid: Fast Shipping, Secure Payment, Easy Returns, 24/7 Support)
- Testimonials (3-column)
- Newsletter signup
- Instagram feed grid (6 images)

**Product Page**:
- Two-column: Gallery (left 60%), Details (right 40%)
- Sticky Add to Cart section on scroll
- Tabs for Description, Specifications, Reviews
- Related Products (4-column grid)

**Category Page**:
- Filter sidebar (left 250px, collapsible)
- Product grid (main area)
- Sort dropdown (top right)
- Active filters chips (below header)
- Pagination (bottom)

**Cart/Checkout**:
- Cart: Full-width item list with thumbnail, details, quantity controls
- Checkout: 60% form / 40% order summary split on desktop

**Admin Dashboard**:
- Fixed sidebar navigation
- Page header with title + action buttons
- Content area with cards, tables, forms as needed
- Responsive: sidebar converts to top bar on mobile

## Interaction Patterns
- **Hover States**: Product cards lift slightly, show secondary info
- **Loading States**: Skeleton screens for product grids, spinner for actions
- **Empty States**: Centered icon + message + CTA (empty cart, no results)
- **Toast Notifications**: Top-right corner for actions (Added to cart, Order placed)
- **Modal Overlays**: For quick view, confirmations, image lightbox

## Accessibility
- Semantic HTML throughout
- ARIA labels for icon buttons
- Keyboard navigation for all interactive elements
- Focus indicators visible (ring-2 ring-offset-2)
- Form validation messages linked to inputs
- Alt text for all product images

This design creates a professional, conversion-optimized e-commerce platform that balances visual appeal with functional efficiency, supporting both customer shopping journeys and admin management workflows.