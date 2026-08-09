# Design System - Luxury Jewellery E-Commerce Website

> **Project Goal**
>
> Build a premium, cinematic jewellery e-commerce website that immediately communicates luxury, craftsmanship, exclusivity, and elegance.
>
> The experience should feel closer to browsing a luxury boutique than shopping on a typical ecommerce website.
>
> Inspiration:
> - Layout flow similar to the luxury watch website.
> - Color palette and softness inspired by the second jewellery reference.
> - Smooth scrolling animations similar to Apple, Dior, Rolex, and Cartier.

---

# Overall Experience

The website should feel like an expensive showroom.

Instead of showing the complete page immediately, the website should begin with a cinematic hero experience.

When the page first loads:

- Only the Hero section is visible.
- Background is pure black (#090909).
- Rest of the website does NOT exist visually.
- User should feel like entering a luxury showroom.

As soon as the user starts scrolling:

The hero slowly moves upward while the rest of the website fades in underneath.

It should feel like curtains opening into the boutique.

Think of it like:

Landing →
Luxury Reveal →
Product Exploration

NOT

Landing →
Entire webpage

---

# Design Style

Minimal

Luxury

High-end

Editorial

Fashion Magazine

Boutique

Museum-like spacing

Nothing should feel crowded.

Every section should breathe.

Whitespace is part of the design.

---

# Color Palette

## Primary Background

Deep Black

```
#090909
```

Used only for:

- Hero
- Navigation
- Footer
- Premium CTA sections

---

## Main Website Background

Warm Ivory

```
#F8F4EE
```

Never use pure white.

Everything should have a warm premium tone.

---

## Cards

```
#FDFBF8
```

Very subtle elevation.

Soft shadows only.

---

## Gold Accent

```
#C8A96A
```

Used sparingly.

Buttons

Icons

Dividers

Borders

Hover states

Tiny decorative lines

Never overuse gold.

---

## Primary Text

```
#252525
```

---

## Secondary Text

```
#6D6A67
```

---

## Border Color

```
#E8DED2
```

---

# Typography

## Headings

Elegant Serif

Recommended:

- Cormorant Garamond
- Canela
- DM Serif Display

Large

Luxury

Thin

Wide spacing

Example:

```
Timeless
Jewellery
Collection
```

---

## Body

Inter

or

Manrope

Light weight

High readability

---

# Hero Section

Height:

```
100vh
```

Background:

Pure Black

Hero occupies the full screen.

Nothing below should be visible.

---

## Hero Layout

Split 50 / 50

Left:

Luxury heading

Small description

CTA

Right:

Large floating jewellery render

Necklace

Ring

Bracelet

Diamond

The product should be illuminated with a dramatic spotlight.

Lots of negative space.

---

## Hero Heading

Large Serif

Example:

```
Timeless

Jewellery

Crafted For
Forever
```

---

## Hero Description

Simple

Elegant

Not marketing-heavy.

Example:

```
Designed to celebrate moments,
crafted to last generations.
```

---

## CTA Button

Primary

Background:

Gold

Text:

Black

Hover:

Slight glow

Tiny upward movement

---

Secondary Button

Transparent

Gold Border

---

# Hero Entrance Animation

When page loads:

Fade from black.

Jewellery slowly scales from:

95%

to

100%

Very slow.

Luxury.

No bouncing.

---

Text animation:

Fade upward.

Duration:

1.2s

---

Jewellery image

Float animation

Very subtle

4-6px

Loop infinitely.

---

# Scroll Transition

This is the most important part.

When user starts scrolling:

Hero begins moving upward.

Background slowly changes:

Black

↓

Dark Brown

↓

Warm Ivory

The transition should feel cinematic.

Not abrupt.

---

The first content section should emerge from underneath the hero.

Almost like the hero is revealing the boutique.

No hard cuts.

---

# Navigation

Initially:

Transparent

White text

---

After scrolling:

Warm Ivory background

Dark text

Very subtle shadow

---

Navigation Links

Home

Collections

New Arrivals

Best Sellers

About

Contact

Cart

Search

---

Hover

Gold underline animation.

---

# Section Order

---

## 1 Hero

Full screen

Black

---

## 2 Brand Promise

Small luxury icons

4 columns

Examples

Handcrafted

Certified Diamonds

Free Shipping

Lifetime Warranty

Very minimal.

---

## 3 Featured Collections

Three large category cards.

Example:

Rings

Necklaces

Bracelets

Huge imagery.

Minimal overlay.

Hover:

Image zoom

---

## 4 New Arrivals

Horizontal premium product cards.

Large product image.

Soft background.

Wishlist icon.

Price

Add to Cart

Hover:

Card lifts slightly.

---

## 5 Signature Collection

Large editorial section.

One huge image.

Text beside it.

Example

"Our Signature Collection"

This should feel like a magazine spread.

---

## 6 Best Sellers

Grid

4 products

Luxury spacing.

---

## 7 Craftsmanship Section

Large photography.

Luxury paragraph.

Timeline

Sketch

Crafting

Polishing

Certification

---

## 8 Testimonials

Minimal.

Large quote.

Customer image.

Gold stars.

---

## 9 Instagram Gallery

Luxury grid.

Hover reveals product.

---

## 10 Newsletter

Dark background.

Luxury typography.

Simple email field.

Gold CTA.

---

## 11 Footer

Black background.

Gold logo.

Minimal links.

Social icons.

---

# Product Cards

Rounded:

20px

Soft shadows.

Large image.

Luxury spacing.

Hover:

Scale image

1.05

Card rises

8px

Shadow becomes softer.

---

# Buttons

Height

52px

Rounded

999px

Padding

32px

Transition

300ms

Hover

Slight glow

Gold becomes brighter

---

# Cards

Border radius

24px

Very subtle shadow.

No heavy outlines.

---

# Animations

Everything should animate.

Nothing should appear instantly.

Use Framer Motion or GSAP.

Examples:

Fade Up

Fade Left

Scale

Parallax

Image Reveal

Opacity transitions

---

# Scroll Animations

Each section appears only when entering viewport.

Animation:

Opacity

0 → 1

TranslateY

40px → 0px

Duration

0.8s

Ease

easeOut

---

Images

Scale

1.08 → 1

---

Cards

Stagger

100ms

---

# Luxury Microinteractions

Buttons slightly glow.

Images slowly zoom on hover.

Icons rotate subtly.

Gold dividers animate.

Numbers count upward.

Navigation links animate underline.

Product image changes on hover.

Cursor slightly enlarges over interactive elements.

---

# Image Style

Soft natural shadows.

Warm lighting.

Editorial photography.

Cream marble.

Beige linen.

Gold reflections.

Never use overly saturated colors.

Avoid bright reds, blues, or greens.

Everything should remain within a warm neutral palette.

---

# Border Radius

Buttons

999px

Cards

20-24px

Images

20px

Sections

Large rounded corners where appropriate.

---

# Grid

Max Width

1400px

Desktop padding

80px

Tablet

48px

Mobile

20px

Generous vertical spacing (120–180px between sections).

---

# Performance

Lazy-load images.

Optimize product assets.

Use smooth scrolling with GPU acceleration.

Keep animations at 60 FPS.

Avoid layout shifts.

---

# Mobile Experience

Hero remains full-screen.

Typography scales fluidly.

Cards become horizontal swipe carousels.

Sticky bottom navigation for Cart and Search.

Maintain the same premium feeling without overcrowding the screen.

---

# Overall Mood

The website should evoke the feeling of walking into a luxury jewellery boutique.

Keywords:

- Luxury
- Timeless
- Sophisticated
- Minimal
- Editorial
- Boutique
- Cinematic
- Elegant
- Premium
- Exclusive
- High-end Fashion
- Museum Quality

Every animation, spacing choice, color, and interaction should reinforce the perception of exceptional craftsmanship and exclusivity. The experience should prioritize emotion and elegance over density of content.