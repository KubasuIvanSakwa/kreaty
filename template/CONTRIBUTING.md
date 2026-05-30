# Contributing to kreaty Frontend

Thank you for interest in contributing to kreaty! This guide will help you get started.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/KubasuIvanSakwa/kreaty-frontend-template.git
   cd kreaty-frontend-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Develop locally**
   - Make changes in `src/`
   - The dev server auto-reloads
   - Test thoroughly

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: Add my new feature"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/my-feature
   ```

5. **Create a Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Request reviewers

### Creating Components

1. **Create component file**
   ```bash
   src/components/MyComponent/MyComponent.jsx
   ```

2. **Create component styles**
   ```bash
   src/components/MyComponent/MyComponent.scss
   ```

3. **Export from component**
   ```jsx
   import "./MyComponent.scss";
   
   const MyComponent = ({ prop1, prop2 }) => {
     return (
       <div className="my-component">
         {/* Your JSX */}
       </div>
     );
   };
   
   export default MyComponent;
   ```

4. **Use component**
   ```jsx
   import MyComponent from "../components/MyComponent/MyComponent";
   ```

### Creating Pages

1. **Create page file**
   ```bash
   src/pages/MyPage.jsx
   ```

2. **Create page component**
   ```jsx
   const MyPage = () => {
     return (
       <div className="my-page">
         <h1>My Page</h1>
       </div>
     );
   };
   
   export default MyPage;
   ```

3. **Add route**
   ```jsx
   // In src/routes/AppRouter.jsx
   <Route path="/my-page" element={<MyPage />} />
   ```

### Creating Services

1. **Create service file**
   ```bash
   src/services/myService.js
   ```

2. **Export service functions**
   ```javascript
   export const myService = {
     fetchData: async () => {
       // Your logic
       return data;
     },
     updateData: async (id, updates) => {
       // Your logic
       return result;
     },
   };
   ```

3. **Use in components**
   ```jsx
   import { myService } from "../services/myService";
   
   const MyComponent = () => {
     const [data, setData] = useState(null);
     
     useEffect(() => {
       myService.fetchData().then(setData);
     }, []);
     
     return <div>{/* Display data */}</div>;
   };
   ```

## Code Style Guidelines

### Naming Conventions

- **Components**: `PascalCase` (e.g., `MyComponent.jsx`)
- **Functions**: `camelCase` (e.g., `fetchData()`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_URL`)
- **CSS Classes**: `kebab-case` (e.g., `.my-component`)
- **Files**: `kebab-case` for folders, `PascalCase` for components

### Component Structure

```jsx
import React, { useState, useEffect } from "react";
import "./MyComponent.scss";

const MyComponent = ({ prop1, prop2, onEvent }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  const handleEvent = () => {
    // Handler logic
  };

  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### Styling Best Practices

```scss
// Use variables
.my-component {
  color: $text-primary;
  padding: $spacing-md;
  border-radius: $radius-md;
  
  // Hover states
  &:hover {
    background-color: lighten($card-bg, 5%);
    transition: $transition-base;
  }
  
  // Nested selectors
  .title {
    font-size: 18px;
    font-weight: 600;
  }
}

// Media queries
@media (max-width: $breakpoint-md) {
  .my-component {
    padding: $spacing-sm;
  }
}
```

### Commit Messages

Use conventional commits:

```
feat: Add new feature
fix: Fix bug
refactor: Reorganize code
style: Update styles
docs: Update documentation
test: Add tests
chore: Update dependencies
```

Example:
```bash
git commit -m "feat: Add user profile component"
```

## Code Review Checklist

Before submitting a PR, ensure:

- ✅ Code follows style guidelines
- ✅ Components are reusable and focused
- ✅ No hardcoded values (use SCSS variables)
- ✅ Proper error handling
- ✅ No console errors/warnings
- ✅ Responsive on mobile/tablet/desktop
- ✅ Performance optimized (no unnecessary re-renders)
- ✅ Accessibility considered (ARIA labels, semantic HTML)

## Testing

Run linter:
```bash
npm run lint
```

Build for production:
```bash
npm run build
```

Preview build:
```bash
npm run preview
```

## Performance Tips

- Use React.memo() for expensive components
- Lazy load pages: `React.lazy(() => import("./page"))`
- Optimize images
- Minimize bundle size
- Use production builds for testing

## Troubleshooting

### Styles not updating
- Restart dev server
- Clear browser cache (Ctrl+Shift+Delete)

### Port already in use
- Change port in `vite.config.js`
- Or kill process: `npm run dev -- --port 3001`

### Dependencies conflict
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Resources

- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Vite Docs](https://vitejs.dev)
- [SCSS Docs](https://sass-lang.com)

## Need Help?

- Check existing issues on GitHub
- Create a new issue with clear description
- Join the team chat/Slack

## Code of Conduct

- Be respectful and inclusive
- Help others learn
- Give constructive feedback
- Report issues professionally

Thank you for contributing! 🚀
