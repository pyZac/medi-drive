---
name: Velocity Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#43474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#006875'
  on-secondary: '#ffffff'
  secondary-container: '#00e3fd'
  on-secondary-container: '#00616d'
  tertiary: '#381300'
  on-tertiary: '#ffffff'
  tertiary-container: '#592300'
  on-tertiary-container: '#d8885c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#9cf0ff'
  secondary-fixed-dim: '#00daf3'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004f58'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#723610'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  velocity-gradient: 'linear-gradient(135deg, #003366 0%, #00E5FF 100%)'
  surface-dark: '#0F172A'
  success-teal: '#10B981'
  warning-amber: '#F59E0B'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style

This design system establishes a high-performance visual language for medical logistics. It moves away from the static, institutional feel of traditional healthcare and adopts a **Corporate / Modern** aesthetic infused with **High-Energy** tech elements. The brand personality is defined by three pillars:
- **Medical Precision:** Everything is aligned to a strict grid, reflecting accuracy and compliance.
- **Logistical Velocity:** Intentional use of gradients and motion paths to imply speed and constant movement.
- **Human Connection:** Softened by approachable typography and generous white space to build trust with clinicians.

The visual direction uses vibrant "Electric Blue" accents to highlight critical data and actions, contrasting against a deep, stable "Deep Primary Blue" foundation. Purposeful animations—such as subtle parallax on scroll and rapid-but-smooth state transitions—reinforce the tech-forward nature of the service.

## Colors

The color palette is anchored by **Deep Primary Blue**, providing the authority and stability required in B2B medical services. **Electric Cyan** serves as the high-energy catalyst, used exclusively for primary CTAs, interactive states, and status indicators that require immediate attention.

Gradients are used strategically to represent "the link" (the journey from clinic to lab). They should be applied to hero backgrounds, progress bars, and subtle icon accents. Neutral surfaces use a cool-toned gray scale to maintain a clinical, clean atmosphere without appearing sterile.

## Typography

This design system utilizes **Plus Jakarta Sans** for headlines to inject a modern, energetic character. Its geometric yet friendly nature balances professionalism with tech-optimism. For body copy and technical data, **Inter** is used for its exceptional legibility and neutral, utilitarian tone.

High contrast in scale is encouraged. Large display headings should use heavy weights and tight letter spacing to command authority. Mobile typography shifts to more compact line heights and slightly reduced sizes to maintain clarity in high-density logistical dashboards.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A strict 8px spacing system ensures vertical rhythm and alignment precision.

- **Grid:** Use a 24px gutter to provide breathing room between data-heavy cards.
- **Sectioning:** Vertical spacing between major landing page sections should be aggressive (64px to 120px) to signify distinct phases of the service narrative.
- **Density:** Dashboard and logistical interfaces should use a "Compact" density model (8px-16px padding), while marketing and onboarding views use "Spacious" density (24px-48px padding).

## Elevation & Depth

To maintain a "fast" feel, depth is achieved through **Tonal Layering** and **Soft Ambient Shadows** rather than heavy skeuomorphism.

- **Surfaces:** Primary background is the neutral white/near-white. Cards use a pure white surface with a very subtle 1px border (#E2E8F0) and a soft, diffused shadow.
- **Shadows:** Use a low-opacity Deep Blue tint for shadows (e.g., `0 4px 20px rgba(0, 51, 102, 0.08)`) to make elements feel like they are floating just above the surface.
- **Interactive Depth:** When a user hovers over a card, the elevation should increase (shadow deepens, card shifts up by 2px) to provide immediate tactile feedback.
- **Overlays:** Modals and dropdowns use a subtle backdrop blur (glassmorphism) to maintain context of the underlying logistics map or dashboard.

## Shapes

The shape language uses **Rounded** corners (8px base) to strike a balance between medical safety and modern software aesthetics.

- **Small Components:** Checkboxes, tags, and small inputs use a 4px (Soft) radius.
- **Standard Components:** Buttons, cards, and input fields use an 8px (Rounded) radius.
- **Large Components:** Feature banners and hero containers can scale up to 16px (Extra-large) to feel more inviting.
- **Status Indicators:** Use pill-shapes (fully rounded) for status badges (e.g., "In Transit", "Delivered") to differentiate them from actionable buttons.

## Components

### Buttons
- **Primary:** High-energy gradient (Deep Blue to Electric Cyan) with white text. On hover, the gradient shifts or brightness increases.
- **Secondary:** Ghost style with a Deep Blue border and text. On hover, fills with a very light tint of Electric Cyan.
- **Tertiary:** Text-only with an arrow icon that slides 4px to the right on hover.

### Cards
- White background with an 8px radius and 1px light gray border. 
- For "Logistics Cards," include a thin 4px vertical accent bar on the left side using the Electric Cyan color to indicate "active" status.

### Inputs
- Fields use a subtle light-gray fill with a bottom-only 2px border that transforms into an Electric Cyan highlight upon focus.
- Labels are always visible, using the `label-bold` typography style in Deep Blue.

### Chips & Badges
- Used for tracking categories. High-contrast colors for status: `Success-Teal` for delivered, `Electric-Cyan` for in-transit, and `Warning-Amber` for delayed.

### Icons & Animation
- **Icons:** Use thin-stroke (1.5pt) linear icons with "Electric Cyan" accents on key nodes.
- **Micro-interactions:** Icons should have subtle "drawing" animations when they enter the viewport.
- **Transitions:** Page transitions use a "Slide Up + Fade In" (300ms, Cubic Bezier) to suggest upward momentum.