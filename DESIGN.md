# Developer Blog Design System

## 1. Overview

This design system is built for a professional developer blog, emphasizing clarity, technical authority, and modern aesthetics (Material Design 3 inspired). It balances high readability for long-form technical content with a premium, sleek interface for discovery and navigation.

## 2. Design Tokens

### Colors

- **Primary**: `#2563EB` (Professional Blue)
- **Background**: `#FFFFFF` (Light Mode)
- **Background Dark**: `#0F172A` (Slate Dark)
- **Text**: `#1E293B` (Slate 800)
- **Text Dark**: `#F8FAFC` (Slate 50)
- **Muted**: `#64748B` (Slate 500)
- **Border**: `#E2E8F0` (Slate 200)

### Typography

- **Font Family**: `Inter, sans-serif`
- **Mono Family**: `JetBrains Mono, monospace` (for code blocks)
- **Scale**:
  - `Display`: 3.5rem / 4rem line-height
  - `Headline`: 1.5rem / 2rem line-height
  - `Body`: 1rem / 1.6rem line-height
  - `Label`: 0.875rem / 1.25rem line-height

### Shape & Elevation

- **Corner Radius**: `8px` (Standard), `16px` (Cards)
- **Elevation**: Tonal layering (Material 3 style) rather than heavy shadows.

## 3. Core Components (Replaceable)

### Layout

- **SiteHeader**: Sticky top navigation with glassmorphism effect.
- **SiteFooter**: Minimalist footer with site info and social links.
- **HomeHero**: Large impact area for blog introduction.

### Blog

- **PostCard**: Summarized post view with title, description, date, and tags.
- **PostList**: Grid or list layout for multiple PostCards.
- **PostHeader**: Hero area for individual post pages.
- **PostMeta**: Metadata bar (date, reading time, author).
- **TagBadge**: Subtle pill-shaped badge for categories.
- **SeriesBadge**: Distinct badge for grouped content.

### Discovery

- **TagFilter**: Interactive list of tags for filtering.
- **SeriesFilter**: Navigation for series-based exploration.
- **SearchBox**: Clean, focused input for content search.

## 4. Content Components (Stable)

- **MarkdownRenderer**: High-fidelity rendering for technical text.
- **CodeBlock**: Syntax highlighted code with filename and copy button.
- **Callout**: Specialized blocks for tips, warnings, and notes.
