# kreaty Frontend Template

A production-grade React + Vite starter template for the kreaty creator economy platform.

## Features

✨ Modern React 19 with Hooks  
🎨 SCSS styling with design system  
📱 Fully responsive mobile-first design  
⚡ Vite for fast development  
🔀 React Router v6 setup  
🎭 Context API for state management  
🎬 Professional animations  
📦 Organized folder structure  

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/KubasuIvanSakwa/kreaty-frontend-template.git
cd kreaty-frontend-template
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output generated in `dist/` folder.

### Preview Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── cards/           # Reusable card components
│   ├── layout/          # Header, sidebar, navigation
│   ├── modals/          # Dialog/modal components
│   └── styles/          # Component-level SCSS
├── pages/               # Page components (Dashboard, Discover, etc)
├── services/            # API/data services (mock or real)
├── context/             # React Context providers (Auth, etc)
├── routes/              # Route definitions
├── styles/              # Global SCSS
├── data/                # Static/mock data
├── App.jsx              # Root component
└── index.jsx            # Entry point
```

## Design System

### Colors

- **Primary**: `#F0A500` (Amber) - Main CTA, highlights
- **Secondary**: `#14B8A6` (Teal) - Accents, secondary CTAs
- **Dark BG**: `#0f0f0f` - Page background
- **Card BG**: `#1a1a1a` - Card backgrounds
- **Border**: `#2a2a2a` - Borders, dividers
- **Text Primary**: `#ffffff` - Main text
- **Text Secondary**: `#a0a0a0` - Muted text

### Typography

- **Font**: System stack (SF Pro Display, Segoe UI, etc)
- **H1**: 32px, 600 weight
- **H2**: 24px, 600 weight
- **Body**: 14px regular
- **Small**: 12px regular

### Spacing

- `$spacing-xs`: 4px
- `$spacing-sm`: 8px
- `$spacing-md`: 16px
- `$spacing-lg`: 24px
- `$spacing-xl`: 32px
- `$spacing-2xl`: 48px

### Border Radius

- `$radius-sm`: 4px
- `$radius-md`: 8px
- `$radius-lg`: 12px
- `$radius-xl`: 16px

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Component Library

### Layout Components

- **Sidebar** - Fixed left navigation (private routes)
- **Topbar** - Top header with search/profile
- **PublicNavbar** - Navigation for public pages

### Card Components

- **DiscoverCard** - Work/portfolio item card
- **StatsCard** - Statistics display card

### Modal Components

- **UploadModal** - File/work upload form

## Services

Create services in `src/services/` for data fetching/management:

```javascript
// Example service structure
export const myService = {
  getData: async () => {
    // Fetch or mock data
    return data;
  },
  updateData: async (id, updates) => {
    // Update data
    return result;
  }
};
```

## Context & State Management

Use React Context for shared state:

```javascript
// Example in src/context/MyContext.jsx
import { createContext, useContext } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [state, setState] = useState(null);
  
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
```

Then wrap App.jsx:

```jsx
<MyProvider>
  <AppRouter />
</MyProvider>
```

## Routing Setup

Routes are configured in `src/routes/AppRouter.jsx` using React Router v6.

```jsx
<Routes>
  <Route path="/public" element={<PublicPage />} />
  <Route path="/private" element={<PrivateRoute element={<PrivatePage />} />} />
</Routes>
```

## Styling

### Global Styles

Edit `src/styles/index.scss` for global variables and utilities.

### Component Styles

Each component folder has its own `.scss` file:

```scss
@import "../../styles/index.scss";

.my-component {
  color: $text-primary;
  padding: $spacing-md;
  
  &:hover {
    transition: $transition-base;
  }
}
```

### Using Variables

- Colors: `$primary`, `$secondary`, `$dark-bg`, `$text-primary`, etc
- Spacing: `$spacing-sm`, `$spacing-md`, `$spacing-lg`, etc
- Radius: `$radius-md`, `$radius-lg`, etc
- Transitions: `$transition-base`, `$transition-fast`

## Animations

Professional animations are included:

- Page transitions: `pageSlideIn`, `fadeInDown`
- Card animations: `cardFadeIn`, `cardHover`
- Button interactions: Ripple effect, shadow animations
- Modal animations: Slide up with backdrop blur

## Best Practices

✅ **Do**

- Use functional components with Hooks
- Keep components small and focused
- Use Context for shared state (auth, user, etc)
- Follow the folder structure
- Use SCSS variables for consistency
- Create reusable components
- Add TypeScript types (optional)
- Test components

❌ **Don't**

- Don't use class components
- Don't pass props deeply (use Context)
- Don't hardcode colors/spacing
- Don't mix styled-components/Tailwind with SCSS
- Don't put logic in render
- Don't use inline styles

## Environment Variables

Create `.env` file in project root:

```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=kreaty
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Build & Deploy

### Build

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

### Deploy

Supported platforms:

- **Vercel**: Connect GitHub repo, auto-deploys
- **Netlify**: Drag & drop `dist/` or connect GitHub
- **GitHub Pages**: Deploy to `gh-pages` branch
- **Docker**: Create Dockerfile for containerization

### Vite Configuration

Edit `vite.config.js` to customize:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -am "Add new feature"`
3. Push to branch: `git push origin feature/my-feature`
4. Open Pull Request

## Development Workflow

1. Create a branch from `main`
2. Develop locally with `npm run dev`
3. Test thoroughly
4. Commit with clear messages
5. Push and create PR
6. Review and merge

## Troubleshooting

### Port already in use

Change port in `vite.config.js`:

```javascript
server: {
  port: 3001,
}
```

### SCSS not importing

Ensure Sass is installed:

```bash
npm install sass
```

### Slow build

Enable CSS code splitting in `vite.config.js`:

```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        styles: ['src/styles/index.scss'],
      },
    },
  },
}
```

## Performance Tips

- Lazy load pages with React.lazy()
- Use React.memo() for expensive components
- Optimize images with Vite's image import
- Code split CSS per component
- Use production builds for deployment
- Enable gzip compression on server

## Resources

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite Docs](https://vitejs.dev)
- [SCSS Docs](https://sass-lang.com)

## License

MIT

## Support

For questions or issues, contact the development team.
