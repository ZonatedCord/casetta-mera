# Casetta Mera - Premium Mountain Cabin Rental Website

A modern, elegant website for a luxury alpine cabin rental in Alpe di Mera, Italy. Built with React, TypeScript, Tailwind CSS, and Motion.

## ✨ Features

### 🏔️ Complete Rental Experience
- **Interactive Hero Section** - Available in light and dark variants with stunning alpine imagery
- **Availability Calendar** - Real-time booking calendar with date selection
- **Dynamic Pricing** - Automatic price calculation based on season and duration
- **Quote Request System** - Beautiful modal form for custom quote requests
- **Photo Gallery** - Lightbox-enabled gallery showcasing the cabin and surroundings

### 📱 Fully Responsive
- Desktop-optimized layouts with spacious sections
- Mobile-first design with touch-friendly interactions
- Sticky mobile bottom bar with quick CTAs
- Responsive navigation with hamburger menu

### 🎨 Premium Design System
- **Color Palette**: Warm alpine colors (Almond, Matcha Brew, Forest Roast, Eclipse)
- **Typography**: DM Serif Display for headings, Inter for body text
- **Subtle Grain Texture**: Adds warmth and tactile feel to surfaces
- **Rounded Corners**: 16-24px radius for modern, friendly aesthetic
- **Smooth Animations**: Motion-powered scroll reveals and micro-interactions

### 🧩 Key Sections
1. **Hero** - Full-screen introduction with dual CTAs
2. **Why Casetta Mera** - Three highlight cards showcasing key benefits
3. **Stats** - Social proof with ratings and satisfied guests
4. **Photo Gallery** - 8+ high-quality images with lightbox
5. **Services & Amenities** - Expandable categories with 12+ amenities
6. **Activities** - Seasonal tabs (Winter/Summer) with activity cards
7. **Availability & Pricing** - Interactive calendar + price breakdown
8. **Testimonials** - Guest reviews with star ratings
9. **Location & Directions** - Embedded map + distance information
10. **Footer** - Contact info, social links, and legal pages

## 🎯 Design Philosophy

### Alpine Aesthetic
- Warm, cozy color palette inspired by mountain landscapes
- Natural textures with grain overlay
- Spacious whitespace for breathing room
- High-quality photography showcasing the location

### User Experience
- Smooth scroll behavior
- Intuitive navigation
- Clear call-to-action hierarchy
- Accessible and keyboard-friendly

### Italian Localization
- All copy in Italian
- Date formatting with Italian locale
- Currency in Euros (€)

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icon library
- **React Day Picker** - Calendar component
- **date-fns** - Date manipulation

## 📦 Components

### Reusable Components
- `HighlightCard` - Feature highlight with icon
- `ActivityCard` - Seasonal activity showcase
- `ServiceIcon` - Amenity display
- `TestimonialCard` - Guest review
- `CalendarWidget` - Date selection
- `PriceBreakdown` - Price calculator
- `PhotoGallery` - Image grid with lightbox
- `QuoteFormModal` - Contact form

### Section Components
- `Hero` - Landing section (light/dark variants)
- `WhySection` - Feature highlights
- `StatsSection` - Social proof numbers
- `GallerySection` - Photo showcase
- `ServicesSection` - Amenities list
- `ActivitiesSection` - Seasonal activities
- `AvailabilitySection` - Booking interface
- `TestimonialsSection` - Reviews
- `MapSection` - Location info
- `Footer` - Site footer

### Layout Components
- `Navbar` - Sticky navigation
- `MobileBottomBar` - Mobile CTAs

## 🎨 Color Reference

```css
--almond: #D6BD98;        /* Warm accent */
--matcha-brew: #677D6A;   /* Primary green */
--forest-roast: #40534C;  /* Text color */
--eclipse: #1A3636;       /* Dark sections */
```

## 🚀 Getting Started

The site is ready to run! All dependencies are installed and configured.

### Features to Customize
1. Update the embedded Google Maps URL in `MapSection.tsx`
2. Replace placeholder contact details in `Footer.tsx`
3. Add real booking system integration (Supabase, API, etc.)
4. Connect quote form to email service
5. Replace demo photos with actual cabin photos

## ✉️ Inquiries API (Cloudflare Pages Function)

Set these Cloudflare Pages environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NOTIFY_TO_EMAIL`

Local testing:

- In Cloudflare Pages, the function is available at `/api/inquiries`.
- For local testing, use `wrangler pages dev` (if configured) and submit the form.

## 📱 Mobile Optimizations

- Touch-friendly minimum tap target sizes (44px)
- Optimized image loading
- Collapsible sections to reduce scrolling
- Bottom sticky bar for quick access to CTAs
- Single-column layouts on mobile

## 🎭 Hero Variants

The hero section supports two visual styles:

### Light Hero
- Semi-transparent white overlay
- Dark text for readability
- Subtle, airy feel
- Best for daytime/bright imagery

### Dark Hero
- Dark gradient overlay
- White text
- Dramatic, luxurious feel
- Best for evening/moody imagery

Toggle between variants using the button in the top-right corner (desktop only).

## 📄 License

This is a demo project created for Casetta Mera. All rights reserved.

---

Built with ❤️ using Figma Make
