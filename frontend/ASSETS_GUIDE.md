# Assets Guide - Where to Store Images

## Recommended Locations

### 1. `public/images/` - For Static Background Images (Recommended)

**Best for:** Background images referenced in CSS or as static URLs

**Structure:**
```
frontend/
└── public/
    └── images/
        ├── backgrounds/
        │   ├── dashboard-bg.jpg
        │   ├── hero-bg.png
        │   └── pattern.svg
        └── logos/
            └── logo.png
```

**Usage Examples:**

**In CSS files:**
```css
.background {
  background-image: url('/images/backgrounds/dashboard-bg.jpg');
}
```

**In React components:**
```tsx
<div style={{ backgroundImage: 'url(/images/backgrounds/dashboard-bg.jpg)' }}>
  Content
</div>
```

**In HTML:**
```html
<img src="/images/backgrounds/dashboard-bg.jpg" alt="Background" />
```

### 2. `src/assets/images/` - For Imported Images

**Best for:** Images imported in components (better optimization)

**Structure:**
```
frontend/src/
└── assets/
    └── images/
        ├── backgrounds/
        │   ├── dashboard-bg.jpg
        │   └── hero-bg.png
        └── icons/
            └── logo.svg
```

**Usage Examples:**

**In React components:**
```tsx
import dashboardBg from '@/assets/images/backgrounds/dashboard-bg.jpg'

function Component() {
  return (
    <div style={{ backgroundImage: `url(${dashboardBg})` }}>
      Content
    </div>
  )
}
```

**Or with img tag:**
```tsx
import logo from '@/assets/images/icons/logo.svg'

<img src={logo} alt="Logo" />
```

## Recommendation for Background Images

**Use `public/images/backgrounds/`** for background images because:
- ✅ Easier to reference in CSS
- ✅ Can be used in inline styles
- ✅ No import statements needed
- ✅ Better for large background images

## Example: Adding Background to Dashboard

1. Place your image in `frontend/public/images/backgrounds/dashboard-bg.jpg`

2. Use it in CSS (`src/index.css` or component styles):
```css
body {
  background-image: url('/images/backgrounds/dashboard-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```

3. Or use it in a component:
```tsx
<div 
  style={{
    backgroundImage: 'url(/images/backgrounds/dashboard-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* Content */}
</div>
```

## File Naming Conventions

- Use lowercase with hyphens: `dashboard-background.jpg`
- Be descriptive: `safety-test-pattern.png`
- Group by purpose: `backgrounds/`, `icons/`, `logos/`, `charts/`

## Image Optimization Tips

- Use WebP format when possible (better compression)
- Compress images before adding (use tools like TinyPNG, ImageOptim)
- Consider responsive images for different screen sizes
- Large backgrounds: Use `background-size: cover` or `contain`
