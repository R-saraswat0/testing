# Design System & Style Guide

## 🎨 Color Palette

### Primary Colors
```
Blue (Primary)
  Light:  #e0f2fe (#50)
  Accent: #0ea5e9 (#500)
  Main:   #0284c7 (#600)
  Dark:   #0369a1 (#700)
  
Usage: Links, buttons, active states, highlights
```

### Semantic Colors
```
Success (Green)
  Light:  #dcfce7
  Main:   #10b981
  Dark:   #059669

Danger (Red)
  Light:  #fee2e2
  Main:   #ef4444
  Dark:   #dc2626

Warning (Amber)
  Light:  #fef3c7
  Main:   #f59e0b
  Dark:   #d97706

Info (Blue)
  Light:  #dbeafe
  Main:   #3b82f6
  Dark:   #1d4ed8
```

### Neutral Colors
```
White:           #ffffff
Gray 50:         #f9fafb
Gray 100:        #f3f4f6
Gray 200:        #e5e7eb
Gray 500:        #6b7280
Gray 700:        #374151
Gray 900:        #111827

Dark Mode:
Slate 800:       #1e293b
Slate 900:       #0f172a
Slate 950:       #020617
```

## 📐 Typography

### Font Families
```
Primary:   -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
Mono:      'Monaco', 'Courier New', monospace
```

### Font Sizes & Weights
```
XS:  12px, Regular (400)
SM:  14px, Regular (400)
MD:  16px, Regular (400)
LG:  18px, Regular (400)
XL:  20px, SemiBold (600)
2XL: 24px, SemiBold (600)
3XL: 30px, Bold (700)
4XL: 36px, Bold (700)
```

### Heading Scale
```
H1:  36px, Bold (700)    - Page titles
H2:  24px, SemiBold (600) - Section headers
H3:  20px, SemiBold (600) - Subsections
H4:  16px, SemiBold (600) - Component titles
H5:  14px, SemiBold (600) - Labels
```

### Line Heights
```
Tight:    1.25
Normal:   1.5
Relaxed:  1.625
Loose:    2
```

## 🔲 Spacing Scale

Base unit: 4px

```
0:   0px
1:   4px
2:   8px
3:   12px
4:   16px
6:   24px
8:   32px
10:  40px
12:  48px
16:  64px
20:  80px
```

## 🎚️ Border Radius

```
None:  0px
SM:    4px
MD:    6px
LG:    8px
XL:    12px
Full:  9999px
```

## 🎨 Component Styles

### Button
```
Base Padding:    12px 16px (md)
Border Radius:   6px
Font Weight:     600
Transition:      all 200ms

States:
- Default:       bg-blue-600, text-white
- Hover:         bg-blue-700, shadow-md
- Active:        bg-blue-800
- Disabled:      opacity-50, cursor-not-allowed
- Loading:       show spinner, disabled state
```

### Card
```
Background:      #ffffff (light), #1e293b (dark)
Border:          1px solid #e5e7eb (light)
Padding:         24px (default)
Border Radius:   8px
Shadow:          0 1px 3px rgba(0, 0, 0, 0.1)
Hover Shadow:    0 4px 6px rgba(0, 0, 0, 0.1)
Transition:      box-shadow 200ms
```

### Input
```
Background:      #ffffff (light), #0f172a (dark)
Border:          1px solid #d1d5db (light)
Padding:         8px 16px
Border Radius:   6px
Font Size:       14px
Focus Ring:      2px solid #0ea5e9

Error State:
Border:          1px solid #ef4444
Focus Ring:      2px solid #ef4444
```

### Modal
```
Overlay:         rgba(0, 0, 0, 0.5)
Background:      #ffffff (light), #1e293b (dark)
Border Radius:   8px
Max Width:       500px (md), 672px (lg)
Animation:       scale 0.95 → 1, opacity 0 → 1
Transition:      200ms cubic-bezier(0.4, 0, 0.6, 1)
```

### Badge
```
Padding:         4px 12px
Border Radius:   9999px
Font Size:       12px
Font Weight:     500

Status Badge:
- Todo:          bg-gray-100, text-gray-800
- In Progress:   bg-blue-100, text-blue-800
- Done:          bg-green-100, text-green-800

Priority Badge:
- Low:           bg-blue-100, text-blue-800
- Medium:        bg-yellow-100, text-yellow-800
- High:          bg-red-100, text-red-800
```

## 🎬 Animations

### Transitions
```
Fast:    150ms cubic-bezier(0.4, 0, 0.2, 1)
Normal:  200ms cubic-bezier(0.4, 0, 0.6, 1)
Slow:    300ms cubic-bezier(0.4, 0, 0.6, 1)
```

### Keyframe Animations
```
fadeIn:
  0%:   opacity 0
  100%: opacity 1

slideUp:
  0%:   opacity 0, translateY(8px)
  100%: opacity 1, translateY(0)

slideDown:
  0%:   opacity 0, translateY(-8px)
  100%: opacity 1, translateY(0)

pulseSoft:
  0%, 100%: opacity 1
  50%:      opacity 0.5
```

### Framer Motion
```
Hover:   scale(1.02) or scale(1.05)
Tap:     scale(0.95)
Exit:    opacity 0, translateY(-10px)
```

## 📱 Responsive Breakpoints

```
Mobile:    0px - 640px (sm)
Tablet:    640px - 1024px (md)
Desktop:   1024px+ (lg)
```

### Responsive Adjustments
```
Mobile:
- Hide sidebar (show toggle)
- Single column layout
- Larger touch targets (48px min)
- Simplified navigation

Tablet:
- Show sidebar
- 2 column layout
- Balanced spacing
- Full navigation

Desktop:
- Show sidebar
- 3+ column layout
- Full feature set
- Optimized spacing
```

## 🌙 Dark Mode Colors

### Backgrounds
```
Page:     #020617 (slate-950)
Surface:  #0f172a (slate-900)
Elevated: #1e293b (slate-800)
```

### Text
```
Primary:   #f1f5f9 (slate-100)
Secondary: #cbd5e1 (slate-300)
Muted:     #94a3b8 (slate-400)
```

### Borders
```
Default:   #334155 (slate-700)
Subtle:    #475569 (slate-600)
```

## ♿ Accessibility

### Color Contrast
```
Normal Text:      4.5:1 minimum (WCAG AA)
Large Text:       3:1 minimum (WCAG AA)
UI Components:    3:1 minimum
```

### Focus States
```
Color:       #0ea5e9
Offset:      2px
Width:       2px
Style:       solid
```

### Typography
```
Min Font Size:   14px
Line Height:     1.5 (minimum)
Letter Spacing:  normal or wider
```

## 🎯 Layout Grid

### Container
```
Max Width:   1280px (2xl)
Padding:     24px (mobile), 32px (desktop)
Margin:      0 auto
```

### Column System
```
Mobile:    1 column, full width
Tablet:    2 columns, equal width
Desktop:   3+ columns, adjustable

Gaps:
Mobile:    16px
Desktop:   24px
```

## 📊 Component Sizing

### Button Sizes
```
Small:    32px height, 12px padding
Medium:   40px height, 16px padding
Large:    48px height, 24px padding
```

### Input Heights
```
Default:   40px
Dense:     32px
Spacious:  48px
```

### Icon Sizes
```
Extra Small:  16px
Small:        20px
Medium:       24px
Large:        32px
Extra Large:  48px
```

## 🎨 Gradient Usage

### Primary Gradient
```
from-blue-600 to-blue-400
Direction: to-br (top-left to bottom-right)
Usage: Backgrounds, badges, avatars
```

### Example Gradients
```
Success:   from-green-600 to-emerald-600
Danger:    from-red-600 to-pink-600
Warning:   from-yellow-600 to-orange-600
```

## 📝 Text Styles

### Headings
```
<h1>Main Page Title</h1>
- 36px, Bold, Color: text-gray-900

<h2>Section Header</h2>
- 24px, SemiBold, Color: text-gray-900

<h3>Subsection Title</h3>
- 20px, SemiBold, Color: text-gray-700
```

### Body Text
```
<p>Regular paragraph text</p>
- 16px, Regular, Color: text-gray-700

<p className="text-sm">Small text</p>
- 14px, Regular, Color: text-gray-600

<p className="text-xs">Extra small text</p>
- 12px, Regular, Color: text-gray-500
```

### Links
```
<a>Link Text</a>
- 16px, Regular, Color: #0ea5e9
- Hover: underline, color: #0284c7
- Active: color: #0369a1
```

## 🎭 State Indicators

### Loading
```
Spinner:     rotating border circle
Color:       #0ea5e9
Duration:    1s
```

### Disabled
```
Opacity:     0.5
Cursor:      not-allowed
No Hover:    skip hover effects
```

### Error
```
Border:      1px solid #ef4444
Text:        #dc2626
Icon:        ⚠️
Background:  #fee2e2
```

### Success
```
Border:      1px solid #10b981
Text:        #059669
Icon:        ✓
Background:  #dcfce7
```

## 📏 Shadow System

```
None:      no shadow
SM:        0 1px 2px 0 rgba(0, 0, 0, 0.05)
MD:        0 4px 6px -1px rgba(0, 0, 0, 0.1)
LG:        0 10px 15px -3px rgba(0, 0, 0, 0.1)
XL:        0 20px 25px -5px rgba(0, 0, 0, 0.1)

Dark Mode:
Applied:   shadow-lg (more pronounced)
```

---

## 💡 Usage Guidelines

### Do's ✅
- Use consistent spacing
- Follow the color palette
- Maintain proper contrast
- Use semantic colors
- Apply transitions smoothly
- Keep animations subtle
- Ensure touch targets are 48px+

### Don'ts ❌
- Don't use custom colors outside the palette
- Don't forget dark mode styles
- Don't use more than 2 fonts
- Don't make animations too fast/slow
- Don't forget focus states
- Don't use color alone for meaning
- Don't forget loading states

---

**Version**: 1.0.0
**Last Updated**: 2024
