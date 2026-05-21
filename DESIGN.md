---
version: alpha
name: Smart Kurashi
description: Japanese smart home & IoT news platform — clean, editorial, content-first design
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#E8643A"
  neutral: "#F7F5F2"
  surface: "#FFFFFF"
  surfaceAlt: "#F0EEE8"
  border: "#E0DDD5"
  text: "#1A1C1E"
  textSecondary: "#6C7278"
  textMuted: "#9A9890"
  accent: "#E8643A"
  accentHover: "#D05530"
  success: "#2D8A4E"
  error: "#D64040"
typography:
  h1:
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.3
  h3:
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  bodySmall:
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
  cardHover:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.accent}"
  buttonPrimary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  buttonSecondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    border: "1px solid {colors.border}"
  tag:
    backgroundColor: "{colors.surfaceAlt}"
    textColor: "{colors.textSecondary}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
  navLink:
    textColor: "{colors.textSecondary}"
    fontWeight: 500
  navLinkActive:
    textColor: "{colors.accent}"
    fontWeight: 600
---

## Overview

Smart Kurashi is a Japanese-language content platform focused on smart home appliances, IoT devices, and AI technology. The design is clean, editorial, and content-first — prioritizing readability and trust over flashy visuals. Think of it as a cross between a tech news site and a curated magazine.

The color palette uses warm neutrals (cream, sand, stone) with a terracotta accent (#E8643A) that feels approachable and distinctly un-corporate. Typography uses Noto Sans JP for Japanese text with excellent readability at all sizes.

## Colors

- **Primary (#1A1C1E):** Deep charcoal for headlines and body text
- **Accent (#E8643A):** Warm terracotta for CTAs, links, and highlights
- **Neutral (#F7F5F2):** Warm cream background
- **Surface (#FFFFFF):** White cards on cream background
- **Border (#E0DDD5):** Warm gray borders, subtle but visible

## Typography

- **Headlines:** Noto Sans JP Bold (700) — strong, clean Japanese headlines
- **Body:** Noto Sans JP Regular (400) — 16px base, 1.7 line height for comfortable reading
- **Captions/Meta:** Noto Sans JP Regular (400) — 12-14px for timestamps, categories

## Layout

- Max content width: 720px for article pages (optimal reading width)
- Grid layout for card listings: 2-3 columns on desktop, 1 on mobile
- Generous whitespace between sections (48px+)
- Sticky navigation header

## Components

- **Article cards:** Image + headline + excerpt + metadata (date, category, source)
- **Tags:** Small rounded pills for categories (スマートホーム, AI, IoT, 家電)
- **Navigation:** Clean horizontal nav with logo, categories, search
- **Footer:** Simple footer with links, social, copyright
