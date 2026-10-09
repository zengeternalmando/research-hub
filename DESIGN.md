---
name: 研究工作台
description: A quiet editorial desk for reading reports and reaching research tools.
colors:
  ink: "#25322e"
  muted: "#57655f"
  paper: "#f5f6f2"
  white: "#fff"
  line: "#dce3dd"
  accent: "#236249"
  night: "#182723"
  night-muted: "#abc0b5"
  night-ink: "#eaf1eb"
  warm: "#e8c78a"
  focus: "#b37b2a"
  nav-hover: "#263c32"
  nav-active: "#31493d"
  action-hover: "#194c37"
  field-border: "#b7c5bc"
  tag-bg: "#e5ebe4"
  tag-ink: "#48594d"
  integrated-bg: "#e2eee5"
  integrated-ink: "#225238"
  pending-bg: "#f1e7d4"
  pending-ink: "#714f1e"
typography:
  headline:
    fontFamily: '"Desk Editorial", "Noto Serif SC", "Songti SC", serif'
    fontSize: "34px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.65
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  control:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  metadata:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  tag: "5px"
  control: "6px"
  navigation: "8px"
  surface: "12px"
spacing:
  compact: "8px"
  control: "12px"
  group: "16px"
  section: "24px"
  column: "28px"
  panel: "32px"
  desktop-gutter: "36px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-text:
    textColor: "{colors.accent}"
    typography: "{typography.control}"
    padding: "10px 0"
  navigation-item:
    textColor: "{colors.night-muted}"
    rounded: "{rounded.navigation}"
    padding: "12px"
  navigation-item-active:
    backgroundColor: "{colors.nav-active}"
    textColor: "{colors.white}"
  search-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.navigation}"
    padding: "11px 14px"
  status-tag:
    backgroundColor: "{colors.tag-bg}"
    textColor: "{colors.tag-ink}"
    rounded: "{rounded.tag}"
    padding: "4px 8px"
  status-tag-integrated:
    backgroundColor: "{colors.integrated-bg}"
    textColor: "{colors.integrated-ink}"
  status-tag-pending:
    backgroundColor: "{colors.pending-bg}"
    textColor: "{colors.pending-ink}"
  reading-surface:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.surface}"
---

# Design System: 研究工作台

## Overview

**Creative North Star: "Editorial Research Notebook"**

Dark forest navigation frames a cool, light reading workspace. The visual language is quiet and practical: a serif headline introduces each view, while compact sans-serif controls and metadata support sustained reading.

Depth comes from distinct surface tones and fine dividers. Tool entries use aligned directory rows; large white containers hold reading content or a detailed explanation. Public report pages retain their own visual systems inside the embedded reader.

**Key Characteristics:**
- Dark navigation beside light reading surfaces.
- Editorial serif headings with compact sans-serif controls.
- Forest-green actions and restrained brass accents.
- Flat surfaces, fine dividers, and modest rounded corners.

## Colors

The palette combines forest tones with cool paper and a small warm accent; the frontmatter records the normative values.

### Primary
- **Forest Green** (`accent`): text actions, selected report tabs, and primary buttons. `action-hover` deepens filled actions on hover.

### Secondary
- **Quiet Brass** (`warm`): brand symbol, active navigation icon, and pending navigation annotation. The related `focus` token marks keyboard focus.

### Neutral
- **Reading Paper** (`paper`) and **White Plate** (`white`): workspace and contained reading surfaces.
- **Forest Ink** (`ink`) and **Quiet Ink** (`muted`): primary text and supporting prose.
- **Fine Divider** (`line`) and **Field Stroke** (`field-border`): structural separation and form controls.
- **Night Forest** (`night`), **Night Ink** (`night-ink`), and **Night Muted** (`night-muted`): navigation background and text. `nav-hover` and `nav-active` distinguish interaction states.
- **Status pairs** (`tag-*`, `integrated-*`, `pending-*`): neutral entries, connected reports, and pending capability labels.

**The Surface Contrast Rule.** Preserve the dark navigation and light reading relationship.

## Typography

**Headline Font:** Self-hosted Desk Editorial, with Noto Serif SC and Songti SC fallbacks.

**Body Font:** Platform sans-serif stack with Chinese-language fallbacks.

The serif gives view headings an editorial character; the sans-serif keeps directory entries, controls, and dense metadata legible.

### Hierarchy
- **Headline:** the frontmatter headline role; reduced to 29px at the mobile breakpoint.
- **Title:** directory names use the title role; mobile names reduce to 16px. Section headings range from 16px to 21px in their existing contexts.
- **Body:** the frontmatter base role; explanatory content commonly uses 13–14px. Tool-purpose and Agent prose are limited to 70ch.
- **Control:** navigation and main action text use the control role.
- **Metadata:** status tags, source notes, tool purpose, and smaller links use the metadata role. Narrow toolbar descriptions use 11px.

## Layout

Desktop uses a fixed 236px navigation rail and an offset workspace. The main area has a 1500px maximum width and 36px horizontal gutters. Its reading layout uses a flexible report column, a 240px guide column, and a 28px gap.

At 1600px and above, the rail becomes 252px and the guide becomes 280px, with a 36px column gap. At 1200px and below, the guide moves beneath the report into two columns; directory state and action columns also narrow.

At 800px and below, navigation becomes a horizontal scrolling strip above the workspace. The workspace offset disappears, gutters become 22px, headings stack, and the guide becomes one column. Directory descriptions span the full row above status and action; controls stack vertically. Agent definition rows also stack. The embedded report keeps its own scrolling region.

## Elevation & Depth

The system has no box shadows. Dark navigation, white plates, pale tab strips, and one-pixel dividers convey hierarchy. View changes use a brief clipping reveal only when reduced motion is not requested; it does not move the reading content.

## Shapes

Large contained surfaces use the surface radius; navigation and search use the navigation radius; filled actions and selects use the control radius. Status tags use the smaller tag radius. Directory rows stay flat and divided rather than becoming individual cards. Icons are thin inline SVG strokes with rounded ends.

## Components

### Buttons

Filled actions are compact forest-green controls with white text, the control radius, and a minimum 44px height. Hover deepens their background. Text actions use forest-green text without a filled plate and underline on hover. Small toolbar actions are quieter, with a minimum 32px height. Interactive elements share a three-pixel focus outline offset by four pixels.

### Chips

Status tags have compact padding and softly rounded corners. Integrated reports use the green status pair; pending capability uses the warm status pair. Tags describe status and are not filter buttons.

### Cards / Containers

The report reader and Agent explanation use white, fine borders, and the surface radius. The reader clips its tab strip within the rounded perimeter. The Agent explanation uses 32px padding, reduced to 24px vertically and 20px horizontally on mobile. These containers have no hover lift.

### Inputs / Fields

Search is a white stroked field with an inline SVG icon and a transparent text input. It has a maximum width of 480px on desktop and fills available width on mobile. Category selection uses a native select with the control radius. Keyboard focus uses the shared focus treatment.

### Navigation

Navigation rows combine a thin SVG icon, text, and optional count or pending annotation. Muted text brightens on hover; the active row uses a lighter forest plate and white text with a brass icon. Mobile navigation stays horizontal and scrollable.

### Report Tabs

Two text tabs sit on a pale strip. Selection uses forest-green text and a two-pixel underline. Each tab includes a smaller supporting label. Keyboard arrow keys, Home, and End switch reports; loading and recovery remain explicit in the reader.

### Directory Rows

Tool information, connection status, and an entry action align in three desktop columns. Rows separate with fine dividers and receive a pale tonal hover. Mobile places information above the status/action pair. Entry wording distinguishes reading, opening an external tool, and viewing a deployment project.

## Do's and Don'ts

### Do:
- **Do** retain dark navigation beside light reading surfaces.
- **Do** use serif type for view headlines and sans-serif type for controls and prose.
- **Do** keep keyboard focus visible and respect reduced-motion preferences.
- **Do** distinguish connected reports, external entries, and pending capabilities through clear text and status treatment.

### Don't:
- **Don't** add shadows or hover lift to the flat reading containers.
- **Don't** turn every tool directory row into a promotional card.
- **Don't** replace readable status text with color alone.
