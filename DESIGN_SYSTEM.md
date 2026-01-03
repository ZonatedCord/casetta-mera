# Casetta Mera - Design System

## Color Palette

### Primary Colors
- **Almond** `#D6BD98` - Warm accent color for highlights and secondary backgrounds
- **Matcha Brew** `#677D6A` - Soft green for primary buttons and interactive elements
- **Forest Roast** `#40534C` - Primary text color and navigation elements
- **Eclipse** `#1A3636` - Dark sections, footer, and emphasized text

### Usage
```css
--almond: #D6BD98;
--matcha-brew: #677D6A;
--forest-roast: #40534C;
--eclipse: #1A3636;
```

## Typography

### Font Families
- **Headings**: DM Serif Display (serif) - Modern, elegant serif for h1, h2, h3
- **Body**: Inter (sans-serif) - Clean, readable sans-serif for paragraphs and UI text

### Type Scale
- Hero Headline: 5rem - 8rem (responsive)
- Section Headings: 2.5rem - 3rem
- Card Titles: 1.25rem - 1.5rem
- Body Text: 1rem
- Small Text: 0.875rem

## Border Radius
- Small elements (buttons, inputs): `1rem` (16px)
- Cards and containers: `1.5rem` (24px)
- Large sections: `2rem` (32px)

## Shadows
- Subtle: `0 2px 8px rgba(26, 54, 54, 0.05)`
- Medium: `0 4px 16px rgba(26, 54, 54, 0.1)`
- Elevated: `0 8px 32px rgba(26, 54, 54, 0.15)`

## Grain Texture
A subtle noise texture is applied to cards and sections using CSS:
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400'...");
opacity: 0.03;
```

## Animations

### Scroll Animations
- Fade in + slide up on scroll into view
- Stagger delay: 0.1s between elements
- Duration: 0.3s - 0.8s

### Hover Effects
- Cards: Lift up (`translateY(-8px)`) + increased shadow
- Buttons: Color transition + scale
- Images: Scale 1.1 on hover

### Page Transitions
- Smooth scroll behavior enabled globally
- Navigation transitions with `Motion` library

## Components

### HighlightCard
3-column grid showcasing key features with icon, title, and description.

### ActivityCard
Image-based cards for seasonal activities with hover effects and external links.

### ServiceIcon
Grid layout for amenities with icons and labels, collapsible by category.

### TestimonialCard
Review cards with star ratings, quotes, and guest information.

### CalendarWidget
Interactive date picker with availability display and guest selection.

### PriceBreakdown
Dynamic pricing calculator showing itemized costs and seasonal rates.

### PhotoGallery
Masonry grid with lightbox functionality for browsing photos.

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Mobile Optimizations
- Bottom sticky bar with CTAs
- Hamburger navigation menu
- Vertical stacking of grid layouts
- Touch-friendly button sizes (min 44px)

## Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Color contrast ratios meet WCAG AA standards
