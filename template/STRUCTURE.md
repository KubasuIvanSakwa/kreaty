# Project Structure Guide

```
kreaty-frontend-template/
├── src/
│   ├── components/
│   │   ├── cards/                 # Card components (e.g., DiscoverCard)
│   │   │   ├── DiscoverCard.jsx
│   │   │   ├── DiscoverCard.scss
│   │   │   └── index.js
│   │   ├── layout/                # Layout components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   ├── PublicNavbar.jsx
│   │   │   ├── layout.scss
│   │   │   └── index.js
│   │   ├── modals/                # Modal/dialog components
│   │   │   ├── UploadModal.jsx
│   │   │   ├── modals.scss
│   │   │   └── index.js
│   │   └── index.js               # Re-export all components
│   │
│   ├── pages/
│   │   ├── Home.jsx               # Home/landing page
│   │   ├── Dashboard.jsx          # Private dashboard
│   │   ├── NotFound.jsx           # 404 page
│   │   └── index.js               # Re-export all pages
│   │
│   ├── services/
│   │   ├── authService.js         # Authentication logic
│   │   ├── apiService.js          # API calls
│   │   ├── dataService.js         # Data fetching
│   │   └── index.js               # Re-export all services
│   │
│   ├── context/
│   │   ├── AuthContext.jsx        # Auth state management
│   │   ├── ThemeContext.jsx       # Theme state management
│   │   └── index.js               # Re-export all contexts
│   │
│   ├── routes/
│   │   └── AppRouter.jsx          # Route definitions
│   │
│   ├── styles/
│   │   ├── index.scss             # Global styles & variables
│   │   ├── animations.scss        # Animation definitions
│   │   └── typography.scss        # Font styles
│   │
│   ├── data/
│   │   ├── mockData.js            # Mock/static data
│   │   └── constants.js           # App constants
│   │
│   ├── utils/
│   │   ├── helpers.js             # Utility functions
│   │   ├── validators.js          # Form validators
│   │   └── formatters.js          # Data formatters
│   │
│   ├── App.jsx                    # Root component
│   └── index.jsx                  # React DOM entry point
│
├── public/
│   ├── favicon.svg                # App icon
│   └── logo.svg                   # App logo
│
├── .gitignore
├── .eslintrc.cjs
├── README.md                      # Main documentation
├── CONTRIBUTING.md                # Contribution guide
├── STRUCTURE.md                   # This file
├── package.json
├── vite.config.js
├── index.html                     # HTML entry point
└── .env.example                   # Example environment variables

```

## Folder Descriptions

### `src/components/`
Reusable React components organized by category.

**Subcategories:**
- `cards/` - Display components (DiscoverCard, StatsCard, etc)
- `layout/` - Layout shells (Sidebar, Topbar, etc)
- `modals/` - Dialog/Modal components
- `forms/` - Form components (LoginForm, etc)
- `buttons/` - Custom button components (optional)

**Guidelines:**
- Each component in its own folder
- Include component JSX and SCSS
- Export from index.js
- Keep components focused and reusable

### `src/pages/`
Full-page components that represent routes.

**Guidelines:**
- One file per page
- Use page name: `DashboardPage.jsx`
- Combine layout + content
- Handle page-level logic
- Re-export from index.js

### `src/services/`
Business logic and API integration.

**Common services:**
- `authService.js` - Login, logout, authentication
- `apiService.js` - HTTP client setup
- `dataService.js` - Data fetching/management
- `storageService.js` - LocalStorage/SessionStorage

**Guidelines:**
- Export as object with methods
- Use async/await for promises
- Handle errors gracefully
- Mock data for development

Example:
```javascript
export const userService = {
  getProfile: async () => { /* ... */ },
  updateProfile: async (data) => { /* ... */ },
};
```

### `src/context/`
React Context for global state.

**Common contexts:**
- `AuthContext.jsx` - User authentication state
- `ThemeContext.jsx` - Theme preferences
- `NotificationContext.jsx` - Toast notifications
- `LoadingContext.jsx` - Global loading state

**Guidelines:**
- One context per concern
- Create Provider component
- Export custom hook
- Wrap App with providers

### `src/routes/`
Route configuration and guards.

**Files:**
- `AppRouter.jsx` - Main router configuration

**Guidelines:**
- Centralize all routes
- Use private route guards
- Handle redirects
- Support nested routes

### `src/styles/`
Global SCSS files and design system.

**Files:**
- `index.scss` - Global styles, variables, utilities
- `animations.scss` - Keyframe animations
- `typography.scss` - Font styles (optional)
- `responsive.scss` - Media queries (optional)

**Guidelines:**
- Define all color variables
- Create spacing scale
- Set breakpoints
- Import in App.jsx

### `src/data/`
Static data, constants, mock data.

**Files:**
- `mockData.js` - Mock API responses
- `constants.js` - App-wide constants
- `enums.js` - Enumeration types

### `src/utils/`
Helper functions and utilities.

**Common files:**
- `helpers.js` - General utility functions
- `validators.js` - Form/data validation
- `formatters.js` - Date, currency formatting
- `api.js` - API request helper

## Naming Conventions

### Files & Folders
```
src/
  components/
    MyComponent/          ← PascalCase
      MyComponent.jsx     ← PascalCase
      MyComponent.scss    ← Match JSX name
  pages/
    HomePage.jsx          ← PascalCase
  services/
    userService.js        ← camelCase
  context/
    AuthContext.jsx       ← PascalCase + Context
  utils/
    helpers.js            ← camelCase
```

### CSS Classes
```scss
// Component name + sections
.my-component {
  &__header { }      // BEM block element
  &__content { }
  &--active { }      // BEM modifier
  &:hover { }
}
```

## Best Practices

✅ **Do**
- Keep components small (<300 lines)
- One component per file
- Use meaningful names
- Follow file structure
- Re-export from index.js
- Use SCSS variables
- Handle errors gracefully

❌ **Don't**
- Nest components too deep
- Mix business logic with UI
- Hardcode values
- Create God components
- Ignore TypeScript (if using)
- Leave TODO comments
- Commit broken code

## File Imports

Good:
```jsx
// Use index.js for cleaner imports
import { Button, Card } from "components";
import { useAuth } from "context";
import { userService } from "services";
```

Better with index.js files:
```javascript
// src/components/index.js
export { default as Button } from "./Button/Button";
export { default as Card } from "./Card/Card";
```

## Adding New Features

1. Create component in `components/`
2. Create service if needed in `services/`
3. Create page if needed in `pages/`
4. Add route in `AppRouter.jsx`
5. Add styles in component SCSS
6. Export from index.js files
7. Test thoroughly
8. Commit and push

## Testing Structure

When adding tests (optional):
```
src/
  __tests__/
    components/
      MyComponent.test.jsx
    services/
      userService.test.js
    pages/
      Home.test.jsx
```

## Documentation

Each folder can have a `README.md`:
```
src/
  components/
    README.md           ← Component guidelines
  services/
    README.md           ← Service patterns
  pages/
    README.md           ← Page structure
```

Example:
```markdown
# Components

All reusable components should:
- Accept `className` prop
- Be <300 lines
- Have PropTypes or TypeScript
- Include JSDoc comments
```

## Common Patterns

### Fetching Data
```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  userService.getProfile()
    .then(setData)
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
}, []);
```

### Using Context
```jsx
const { user, login, logout } = useAuth();

const handleLogin = async (credentials) => {
  const user = await authService.login(credentials);
  login(user);
};
```

### Conditional Rendering
```jsx
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;

return <DataDisplay data={data} />;
```

Questions? Check CONTRIBUTING.md or open an issue!
