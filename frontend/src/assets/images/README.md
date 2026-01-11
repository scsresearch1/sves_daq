# Assets Images Directory

Place images here that you want to import directly in your React components.

## Recommended Structure

```
images/
├── backgrounds/          # Background images (if importing)
│   └── component-bg.jpg
├── icons/                # Custom icons
│   └── custom-icon.svg
└── illustrations/       # Illustrations and graphics
    └── chart-icon.png
```

## Usage

Import images using the `@` alias:

```tsx
import dashboardBg from '@/assets/images/backgrounds/component-bg.jpg'

function Component() {
  return (
    <div style={{ backgroundImage: `url(${dashboardBg})` }}>
      Content
    </div>
  )
}
```

**Note:** Images imported this way are processed by Vite and optimized during build.
