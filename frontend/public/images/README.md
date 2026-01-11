# Images Directory

Place your background images and static assets here.

## Recommended Structure

```
images/
├── backgrounds/          # Background images for pages/components
│   ├── dashboard-bg.jpg
│   ├── hero-bg.png
│   └── pattern.svg
├── logos/                # Logo files
│   └── logo.png
└── icons/                # Static icon files (if not using Material-UI icons)
    └── custom-icon.svg
```

## Usage

Reference images from this directory using absolute paths starting with `/images/`:

```css
background-image: url('/images/backgrounds/dashboard-bg.jpg');
```

```tsx
<img src="/images/logos/logo.png" alt="Logo" />
```

Files in the `public/` folder are served as-is and can be referenced directly.
