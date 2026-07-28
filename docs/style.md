---
name: Promptless Design System
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
  on-surface-variant: '#464555'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#4849da'
  primary: '#4343d5'
  on-primary: '#ffffff'
  primary-container: '#5d5fef'
  on-primary-container: '#faf7ff'
  inverse-primary: '#c1c1ff'
  secondary: '#5557a0'
  on-secondary: '#ffffff'
  secondary-container: '#aeafff'
  on-secondary-container: '#3e3f87'
  tertiary: '#006279'
  on-tertiary: '#ffffff'
  tertiary-container: '#007c98'
  on-tertiary-container: '#effaff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c1c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2e2bc2'
  secondary-fixed: '#e1dfff'
  secondary-fixed-dim: '#c1c1ff'
  on-secondary-fixed: '#0f0d5a'
  on-secondary-fixed-variant: '#3d3e87'
  tertiary-fixed: '#b7eaff'
  tertiary-fixed-dim: '#4cd6ff'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Be Vietnam Pro
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The visual identity is rooted in a **Minimalist Corporate** aesthetic with **Glassmorphism** accents, specifically tailored for a premium AI SaaS experience. It balances professional reliability with the fluid, "magical" nature of artificial intelligence.

The emotional response should be one of clarity, efficiency, and intelligence. The UI uses generous whitespace to reduce cognitive load, while soft purplish gradients and translucent layers signify the cutting-edge technology behind the product. The design is optimized for RTL (Right-to-Left) layouts, ensuring that Arabic typography is the centerpiece of the user experience.

## Colors

The palette is dominated by "Electric Indigo" as the primary brand driver, supported by soft lavenders and tech-focused cyans.

- **Primary (#5D5FEF):** Used for main actions, active states, and brand-heavy components.
- **Secondary (#A5A6F6):** Used for subtle highlights, background blurs, and secondary button states.
- **Surface & Background:** The default state uses a very light grey-blue (`#F8FAFC`). For premium "AI processing" states, a deep dark mode variant is used with gradients ranging from `#0F172A` to `#1E1B4B`.
- **Semantic Colors:** Soft greens and ambers are used for status indicators (e.g., quality percentages), always accompanied by descriptive icons to ensure accessibility.

## Typography

The typography system utilizes **Be Vietnam Pro** for its clean, geometric, and modern feel which translates exceptionally well to sans-serif Arabic typefaces. 

### Arabic Implementation
- **Weights:** Use 'SemiBold' (600) for section headers and 'Medium' (500) for labels. Standard body text should remain at 'Regular' (400) to ensure legibility in dense AI-generated outputs.
- **Line Height:** Arabic characters require slightly more vertical breathing room than Latin characters. A minimum line height of 1.6x is recommended for body paragraphs.
- **Scaling:** For mobile devices, `headline-xl` should scale down to 28px to prevent awkward text wrapping in RTL layouts.

## Layout & Spacing

This design system uses a **Fluid Grid** model with a distinct emphasis on vertical rhythm. 

- **Sidebar:** A fixed-width right-hand sidebar (for RTL) at 280px provides the primary navigation anchor.
- **Main Content:** Follows a 12-column layout on desktop. On mobile, elements stack into a single column with 16px side margins.
- **Spacing Rhythm:** An 8px base unit is used. Use `stack-lg` (32px) to separate major sections and `stack-md` (16px) for internal card padding and component grouping.
- **Whitespace:** Emphasize "Generous Whitespace" around the central input areas to focus the user's attention on the prompt creation task.

## Elevation & Depth

Visual hierarchy is achieved through a combination of **Ambient Shadows** and **Glassmorphism**.

- **Level 1 (Cards):** Low-opacity, highly diffused shadows (`0px 4px 20px rgba(0, 0, 0, 0.05)`) with a white background.
- **Level 2 (Modals/Active Inputs):** Subtle glass effect with a `blur(12px)` backdrop and a 1px semi-transparent white border to define edges against the gradient backgrounds.
- **Depth Tints:** Backgrounds are often tinted with a 5% primary color overlay to create a cohesive environment rather than using pure greys.

## Shapes

The shape language is consistently **Rounded**, reflecting a friendly and approachable AI personality.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Large Containers:** Main content areas and large feature cards use a 1rem (16px) radius.
- **Interactive Tags/Chips:** These use a full pill-shape (circular ends) to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Solid primary color with white text. High-radius corners.
- **Secondary:** Transparent background with a thin 1px border in the secondary color or a soft ghost-button style.
- **Loading State:** An animated "wave" gradient within the button indicates AI processing.

### Cards
- Cards must feature a 1px border (`#E2E8F0`).
- Header areas within cards should have a subtle bottom-border to separate metadata from content.

### Inputs & Text Areas
- Inputs use a soft grey background (`#F1F5F9`) in their default state and transition to a white background with a primary-colored border on focus.
- Placeholder text is set in a light neutral tone to prioritize user-entered content.

### Chips & Tags
- Used for categorizing prompts (e.g., Marketing, Programming).
- Each category should have a unique, low-saturation pastel background color to allow for quick visual scanning.

### Status Indicators
- Quality percentages (e.g., "92%") are housed in circular progress rings using a high-contrast semantic color (Success Green).