---
version: "2.0"
name: Smart Kurashi
description: Premium Japanese smart home & IoT news platform — editorial luxury meets tech precision. A content-first design system blending Apple's cinematic minimalism, Notion's warm editorial feel, and Stripe's typographic sophistication.
colors:
  # Primary Brand
  primary: "#0A0A0A"
  primaryHover: "#1A1A1A"
  secondary: "#6B7280"
  tertiary: "#E8643A"
  accent: "#E8643A"
  accentHover: "#D05530"
  
  # Neutrals — warm editorial palette (Notion-inspired)
  neutral: "#FAFAF8"
  neutralWarm: "#F5F3EF"
  neutralDark: "#1C1917"
  surface: "#FFFFFF"
  surfaceAlt: "#F5F3EF"
  surfaceDark: "#0A0A0A"
  
  # Text
  text: "#0A0A0A"
  textSecondary: "#6B7280"
  textMuted: "#9CA3AF"
  textInverse: "#FFFFFF"
  textInverseSecondary: "#A8A29E"
  
  # Borders
  border: "#E7E5E4"
  borderLight: "#F5F3EF"
  borderDark: "#292524"
  
  # Semantic
  success: "#10B981"
  error: "#EF4444"
  warning: "#F59E0B"
  info: "#3B82F6"
  
  # Shadows (Stripe-inspired blue-tinted)
  shadowColor: "rgba(10, 10, 10, 0.08)"
  shadowColorMedium: "rgba(10, 10, 10, 0.12)"
  shadowColorStrong: "rgba(10, 10, 10, 0.18)"
  shadowColorBlue: "rgba(50, 50, 93, 0.15)"

typography:
  # Display — Framer/Apple inspired, compressed and bold
  displayHero:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  displaySection:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  bodyLarge:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  bodySmall:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  caption:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.02em"
  nav:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  button:
    fontFamily: "'Inter', 'Noto Sans JP', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"

rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  xxl: "24px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  xxxl: "64px"
  section: "clamp(48px, 8vw, 96px)"

shadows:
  sm: "0 1px 2px rgba(10,10,10,0.06), 0 1px 3px rgba(10,10,10,0.04)"
  md: "0 4px 6px rgba(10,10,10,0.07), 0 2px 4px rgba(10,10,10,0.04)"
  lg: "0 10px 15px rgba(10,10,10,0.08), 0 4px 6px rgba(10,10,10,0.04)"
  xl: "0 20px 25px rgba(10,10,10,0.1), 0 8px 10px rgba(10,10,10,0.04)"
  glow: "0 0 0 1px rgba(232, 100, 58, 0.2), 0 4px 12px rgba(232, 100, 58, 0.15)"

components:
  buttonPrimary:
    backgroundColor: "#E8643A"
    textColor: "#FFFFFF"
    rounded: "8px"
    padding: "12px 24px"
    fontWeight: 600
    fontSize: "0.875rem"
    shadow: "0 1px 2px rgba(232,100,58,0.2)"
    hoverBg: "#D05530"
    hoverShadow: "0 4px 12px rgba(232,100,58,0.3)"
  buttonSecondary:
    backgroundColor: "#FFFFFF"
    textColor: "#0A0A0A"
    rounded: "8px"
    padding: "12px 24px"
    fontWeight: 600
    fontSize: "0.875rem"
    border: "1px solid #E7E5E4"
    hoverBorder: "#E8643A"
  buttonGhost:
    backgroundColor: "transparent"
    textColor: "#6B7280"
    rounded: "8px"
    padding: "12px 24px"
    fontWeight: 500
    fontSize: "0.875rem"
    hoverColor: "#0A0A0A"
  card:
    backgroundColor: "#FFFFFF"
    rounded: "12px"
    padding: "24px"
    border: "1px solid #E7E5E4"
    shadow: "0 1px 3px rgba(10,10,10,0.04)"
    hoverShadow: "0 8px 25px rgba(10,10,10,0.08)"
    hoverBorder: "#E8643A"
  cardFeatured:
    backgroundColor: "#FFFFFF"
    rounded: "16px"
    padding: "32px"
    border: "1px solid #E7E5E4"
    shadow: "0 4px 6px rgba(10,10,10,0.04), 0 1px 3px rgba(10,10,10,0.06)"
    hoverShadow: "0 20px 40px rgba(10,10,10,0.1)"
  tag:
    backgroundColor: "#F5F3EF"
    textColor: "#6B7280"
    rounded: "9999px"
    padding: "4px 12px"
    fontSize: "0.75rem"
    fontWeight: 500
  tagAccent:
    backgroundColor: "rgba(232,100,58,0.08)"
    textColor: "#E8643A"
    rounded: "9999px"
    padding: "4px 12px"
    fontSize: "0.75rem"
    fontWeight: 600
  input:
    backgroundColor: "#FFFFFF"
    textColor: "#0A0A0A"
    border: "1px solid #E7E5E4"
    rounded: "8px"
    padding: "12px 16px"
    fontSize: "0.9375rem"
    focusBorder: "#E8643A"
    focusShadow: "0 0 0 3px rgba(232,100,58,0.1)"

maxWidth:
  content: "720px"
  container: "1200px"
  wide: "1400px"
---

## Overview

Smart Kurashi is a premium Japanese-language content platform focused on smart home appliances, IoT devices, and AI technology. The design blends Apple's cinematic minimalism, Notion's warm editorial feel, Stripe's typographic sophistication, and Linear's modern component precision.

The visual identity is **editorial luxury meets tech precision** — generous whitespace, compressed display typography, warm neutral palette, and a terracotta accent that feels distinctly Japanese and approachable. Every section breathes. Every interaction feels intentional.

## Colors

- **Primary (#0A0A0A):** Near-black for headlines and body text — softer than pure black
- **Accent (#E8643A):** Warm terracotta — CTAs, links, highlights. Distinctly un-corporate.
- **Neutral (#FAFAF8):** Warm cream background — the canvas
- **Surface (#FFFFFF):** White cards on cream — creates gentle depth
- **Border (#E7E5E4):** Warm stone borders — visible but not harsh

## Typography

- **Display:** Inter Bold (700) with aggressive negative letter-spacing (-0.03em). Compressed, impactful headlines.
- **Body:** Inter Regular (400) at 16px with 1.7 line height for comfortable Japanese reading.
- **Navigation:** Inter Medium (500) at 14px with slight negative tracking.
- **Captions:** Inter Medium (500) at 12px with positive tracking for legibility.

## Layout

- Max content width: 720px for articles (optimal reading width)
- Max container width: 1200px for listing pages
- Section spacing: clamp(48px, 8vw, 96px) — generous, responsive vertical rhythm
- Grid: 2-3 columns on desktop, 1 on mobile
- Sticky navigation header with blur backdrop

## Components

- **Cards:** 12px radius, whisper border, multi-layer shadow. Hover: shadow intensifies + accent border.
- **Buttons:** 8px radius, terracotta fill for primary, white with border for secondary.
- **Tags:** Full pill (9999px), warm gray or tinted terracotta.
- **Inputs:** 8px radius, warm border, terracotta focus ring.
