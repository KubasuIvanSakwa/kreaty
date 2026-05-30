# Getting Started with kreaty Frontend Template

Welcome! This guide will help you get up and running in minutes.

## 1. Prerequisites

Make sure you have:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ or **yarn** 4+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Verify installation:
```bash
node --version    # Should be v18+
npm --version     # Should be 9+
git --version     # Any version is fine
```

## 2. Quick Start (5 minutes)

### Clone & Install
```bash
git clone https://github.com/KubasuIvanSakwa/kreaty-frontend-template.git
cd kreaty-frontend-template
npm install
```

### Start Development
```bash
npm run dev
```

Your app opens at: `http://localhost:3000`

### Make a Change
Edit `src/App.jsx` - the page reloads instantly! ✨

## 3. First Task: Create a Component

Let's create a simple component to get comfortable:

### Step 1: Create Files
```bash
mkdir src/components/Greeting
```

### Step 2: Create JSX Component

Create `src/components/Greeting/Greeting.jsx`:
```jsx
import "./Greeting.scss";

const Greeting = ({ name = "kreaty" }) => {
  return (
    <div className="greeting">
      <h1>Welcome to {name}!</h1>
      <p>Let's build something amazing.</p>
    </div>
  );
};

export default Greeting;
```

### Step 3: Create Styles

Create `src/components/Greeting/Greeting.scss`:
```scss
@import "../../styles/index.scss";

.greeting {
  padding: $spacing-2xl;
  text-align: center;
  background: linear-gradient(135deg, $primary, $secondary);
  border-radius: $radius-xl;
  color: #000;
  
  h1 {
    font-size: 32px;
    margin-bottom: $spacing-md;
  }
  
  &:hover {
    transform: translateY(-4px);
    transition: $transition-base;
  }
}
```

### Step 4: Use in App

Edit `src/App.jsx`:
```jsx
import Greeting from "./components/Greeting/Greeting";

function App() {
  return (
    <div>
      <Greeting name="kreaty" />
    </div>
  );
}

export default App;
```

Done! 🎉 Your component is live.

## 4. Understanding the Structure

### Quick File Map

```
src/
├── components/          ← Reusable UI components
├── pages/               ← Full page components
├── services/            ← Business logic & API calls
├── context/             ← Global state (Auth, etc)
├── routes/              ← Route configuration
├── styles/              ← Global styles & variables
├── utils/               ← Helper functions
├── App.jsx              ← Root component
└── index.jsx            ← Entry point
```

### Key Files to Know

- **`App.jsx`** - Your app's main component
- **`src/styles/index.scss`** - Global colors, spacing, utilities
- **`vite.config.js`** - Build configuration
- **`package.json`** - Dependencies and scripts

## 5. Working with Styles

### Using Color Variables

```jsx
// In your SCSS file
.my-element {
  color: $primary;              // #F0A500 (amber)
  background: $card-bg;         // #1a1a1a (dark)
  padding: $spacing-md;         // 16px
  border-radius: $radius-lg;    // 12px
}
```

### Available Variables

**Colors:**
```
$primary         #F0A500  (Amber - main color)
$secondary       #14B8A6  (Teal - accents)
$dark-bg         #0f0f0f  (Page background)
$card-bg         #1a1a1a  (Card background)
$text-primary    #ffffff  (White text)
$text-secondary  #a0a0a0  (Gray text)
```

**Spacing:**
```
$spacing-xs      4px
$spacing-sm      8px
$spacing-md      16px
$spacing-lg      24px
$spacing-xl      32px
$spacing-2xl     48px
```

**Radius:**
```
$radius-sm       4px
$radius-md       8px
$radius-lg       12px
$radius-xl       16px
```

## 6. Managing State

### Using useState Hook

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default Counter;
```

### Using Context (Global State)

```jsx
import { useAuth } from "context";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Not logged in</p>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
```

## 7. Fetching Data

### Fetching in a Component

```jsx
import { useState, useEffect } from "react";
import { userService } from "services";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    userService.getAllUsers()
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
```

## 8. Creating a Service

### Create a Data Service

Create `src/services/todoService.js`:

```javascript
// Simulate async API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const todoService = {
  getAllTodos: async () => {
    await delay(500);
    return [
      { id: 1, title: "Learn React", completed: true },
      { id: 2, title: "Build an app", completed: false },
    ];
  },

  getTodoById: async (id) => {
    await delay(300);
    return { id, title: "My Todo", completed: false };
  },

  createTodo: async (title) => {
    await delay(500);
    return { id: Date.now(), title, completed: false };
  },

  updateTodo: async (id, updates) => {
    await delay(300);
    return { id, ...updates };
  },

  deleteTodo: async (id) => {
    await delay(300);
    return { success: true };
  },
};
```

### Use in Component

```jsx
import { todoService } from "services";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getAllTodos().then(setTodos);
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
```

## 9. Common Tasks

### Adding a New Page

1. Create file: `src/pages/MyPage.jsx`
2. Add route in `src/routes/AppRouter.jsx`
3. Use: `<Route path="/my-page" element={<MyPage />} />`

### Adding a New Component

1. Create folder: `src/components/MyComponent/`
2. Create: `MyComponent.jsx` and `MyComponent.scss`
3. Import and use: `<MyComponent prop="value" />`

### Adding Global State

1. Create: `src/context/MyContext.jsx`
2. Create provider and custom hook
3. Wrap app: `<MyProvider><App /></MyProvider>`

### Adding a Helper Function

1. Create/edit: `src/utils/helpers.js`
2. Export function
3. Use: `import { myHelper } from "utils"`

## 10. Debugging

### Browser DevTools

Press `F12` to open DevTools. Check:
- **Console** - For errors and logs
- **Network** - For API calls
- **React DevTools** - For component inspection

### Common Issues

**Port already in use:**
```bash
npm run dev -- --port 3001
```

**Styles not updating:**
- Restart dev server
- Clear browser cache (Ctrl+Shift+Delete)

**Module not found:**
- Check file path spelling
- Ensure file exists
- Restart dev server

## 11. Next Steps

Read these when you're ready:
- [README.md](./README.md) - Full documentation
- [STRUCTURE.md](./STRUCTURE.md) - Project structure guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

## 12. Getting Help

### Resources
- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Vite Docs](https://vitejs.dev)
- [SCSS Docs](https://sass-lang.com)

### Stuck?
1. Check browser console for errors
2. Read the README and docs
3. Search the GitHub issues
4. Create a new issue with details

## 13. Quick Reference

### Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

### Keyboard Shortcuts

- `Ctrl+S` - Save file (triggers hot reload)
- `F12` - Open browser DevTools
- `Ctrl+Shift+Delete` - Clear browser cache
- `Ctrl+/` - Comment/uncomment code

### Project Links

- Main App: `http://localhost:3000`
- Network Tab: Check API calls
- React DevTools: Inspect components

## 14. Tips & Tricks

✨ **Hot Module Replacement** - Your changes reload instantly without losing state!

💡 **Use Snippets** - Create code snippets in VS Code for faster typing.

🎨 **Design System** - Keep colors/spacing consistent using SCSS variables.

📱 **Mobile First** - Design for mobile first, then enhance for larger screens.

⚡ **Performance** - Use React DevTools Profiler to find slow components.

## You're Ready! 🚀

Start building and have fun. Remember:
- Read error messages carefully
- Ask questions in issues
- Check existing code for patterns
- Keep components small and focused

Happy coding! 💻
