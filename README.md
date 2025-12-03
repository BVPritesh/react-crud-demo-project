# React CRUD Demo Project

A comprehensive React application demonstrating modern web development practices with CRUD operations, authentication, and responsive design. This project serves as a learning resource for building full-featured React applications with TypeScript, Tailwind CSS, and REST API integration.

---

## 📋 Project Description

This is a full-featured React web application that demonstrates real-world development patterns and best practices. The project implements a complete CRUD (Create, Read, Update, Delete) system for managing posts, with user authentication, protected routes, and a modern responsive UI.

### Key Learning Objectives:
- **React Fundamentals**: Component composition, hooks, state management, and context API
- **TypeScript Integration**: Type-safe development with interfaces, types, and proper error handling
- **Authentication Flow**: JWT-like token management with localStorage persistence
- **Protected Routes**: Route guards and conditional navigation using React Router
- **API Integration**: RESTful API consumption with JSONPlaceholder fake backend
- **Form Handling**: Client-side validation, error handling, and user feedback
- **Modern UI**: Responsive design with Tailwind CSS and mobile-first approach
- **State Management**: Context API for global state and local component state
- **Code Architecture**: Clean folder structure and separation of concerns

### What You'll Build:
- User authentication system (sign-in/sign-up)
- Protected dashboard with CRUD operations
- Posts management (create, read, update, delete)
- Responsive navigation with mobile menu
- Form validation and error handling
- Toast notifications for user feedback
- Modern UI with animations and transitions

---

## 🛠 Tech Stack & Versions

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | `24.x` | Runtime environment |
| **React** | `19.1.1` | Frontend framework |
| **React Router** | `7.9.5` | Client-side routing |
| **TypeScript** | `5.9.3` | Type-safe JavaScript |
| **Tailwind CSS** | `4.1.16` | Utility-first CSS framework |
| **Vite** | `7.1.7` | Build tool and dev server |
| **ESLint** | `9.36.0` | Code linting and formatting |

### Additional Dependencies:
- **@types/node**: `24.6.0` - Node.js type definitions
- **@types/react**: `19.1.16` - React type definitions
- **@vitejs/plugin-react**: `5.0.4` - Vite React plugin
- **autoprefixer**: `10.4.21` - CSS vendor prefixing

---

## 🚀 Project Installation Steps

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** version 24.x or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd react-crud-demo-project
```

### Step 2: Node Version Management (Recommended)
Using **nvm** (Node Version Manager):
```bash
# Install Node.js 24
nvm install 24
nvm use 24

# Verify installation
node --version  # Should show v24.x.x
npm --version   # Should show compatible npm version
```

Using **volta** (Alternative):
```bash
# Install and pin Node.js 24
volta install node@24
volta pin node@24
```

### Step 3: Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 4: Environment Setup (Optional)
Create a `.env.local` file if you need environment variables:
```bash
# Copy example environment file
cp .env.example .env.local

# Edit with your preferred settings
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

### Step 5: Start Development Server
```bash
# Start the development server
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Step 6: Build for Production
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Folder Structure Understanding

```
react-crud-demo-project/
├── public/                     # Static assets
│   └── vite.svg               # Vite logo
├── src/                       # Source code directory
│   ├── assets/                # Static assets (images, icons)
│   │   └── react.svg          # React logo
│   ├── components/            # Reusable UI components
│   │   ├── AddEditPost.tsx    # Post form component
│   │   ├── footer.tsx         # Footer component
│   │   └── header.tsx         # Navigation header
│   ├── config/                # Configuration files
│   │   └── api.ts             # API configuration and endpoints
│   ├── contexts/              # React Context providers
│   │   └── AuthContext.tsx    # Authentication context
│   ├── hooks/                 # Custom React hooks
│   │   └── useToast.tsx       # Toast notification hook
│   ├── layouts/               # Layout components
│   │   └── DefaultLayout.tsx  # Main layout wrapper
│   ├── pages/                 # Page components
│   │   ├── admin/             # Protected admin pages
│   │   │   └── dashboard.tsx  # Dashboard with CRUD operations
│   │   ├── about.tsx          # About page
│   │   ├── Home.tsx           # Home page
│   │   ├── PageNotFound.tsx   # 404 error page
│   │   ├── sign-in.tsx        # Sign-in page
│   │   └── sign-up.tsx        # Sign-up page
│   ├── types/                 # TypeScript type definitions
│   │   └── types.ts           # Shared interfaces and types
│   ├── utils/                 # Utility functions
│   │   └── validation.ts      # Form validation helpers
│   ├── App.css               # Global styles
│   ├── App.tsx               # Main App component
│   ├── index.css             # Tailwind CSS imports
│   ├── main.tsx              # Application entry point
│   └── router.tsx            # React Router configuration
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Project dependencies
├── postcss.config.cjs       # PostCSS configuration
├── README.md                # Project documentation
├── tailwind.config.cjs      # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TypeScript config
├── tsconfig.node.json       # Node-specific TypeScript config
└── vite.config.ts           # Vite configuration
```

### Key Architectural Decisions:

#### 🎯 **Component Organization**
- **`components/`**: Pure, reusable UI components
- **`pages/`**: Route-specific components with business logic
- **`layouts/`**: Wrapper components for consistent page structure

#### 🔧 **Configuration & Setup**
- **`config/`**: Centralized API and app configuration
- **`contexts/`**: Global state management with React Context
- **`hooks/`**: Custom hooks for reusable logic

#### 📝 **Type Safety**
- **`types/`**: Centralized TypeScript interfaces and types
- **`utils/`**: Helper functions and validation logic

#### 🎨 **Styling Architecture**
- **Tailwind CSS**: Utility-first approach for rapid development
- **Component-level**: Scoped styles when needed
- **Responsive Design**: Mobile-first responsive utilities

---

## ✨ Project Features

### 🔐 **Authentication System**
- **Sign In**: Email/password authentication with form validation
- **Sign Up**: User registration with comprehensive validation
- **Token Management**: JWT-like token stored in localStorage
- **Auto-redirect**: Automatic navigation based on auth state
- **Session Persistence**: Maintains login across browser sessions

### 🛡️ **Protected Routes**
- **Route Guards**: Automatic redirection for unauthenticated users
- **Conditional Navigation**: Different menu options for authenticated/guest users
- **Dashboard Access**: Protected admin area with full CRUD functionality

### 📊 **Dashboard & CRUD Operations**
- **Posts Management**: Full CRUD operations for blog posts
  - **Create**: Add new posts with title and content validation
  - **Read**: Display posts in a clean, organized layout
  - **Update**: Edit existing posts with pre-populated forms
  - **Delete**: Remove posts with confirmation prompts
- **Real-time Updates**: Optimistic UI updates for immediate feedback
- **Form Validation**: Client-side validation with error messages

### 📱 **Responsive User Interface**
- **Mobile-First Design**: Optimized for all device sizes
- **Navigation Menu**: Collapsible mobile menu with smooth animations
- **Header Management**: Auto-hiding header on scroll (mobile)
- **Toast Notifications**: Success and error feedback system
- **Loading States**: Visual feedback during API operations

### 🎨 **Modern UI/UX Features**
- **Tailwind CSS**: Utility-first styling with custom components
- **Smooth Animations**: CSS transitions and hover effects
- **Form Handling**: Advanced form state management
- **Error Boundaries**: Graceful error handling and user feedback
- **404 Handling**: Custom error pages with navigation options

### 🔧 **Developer Experience**
- **TypeScript**: Full type safety with interfaces and type checking
- **ESLint**: Code quality and consistency enforcement
- **Hot Reload**: Instant development feedback with Vite
- **Path Aliases**: Clean imports with `@/` syntax
- **Build Optimization**: Production-ready builds with code splitting

### 🌐 **API Integration**
- **JSONPlaceholder**: Fake REST API for learning and development
- **HTTP Methods**: GET, POST, PUT, DELETE operations
- **Error Handling**: Comprehensive API error management
- **Loading States**: User feedback during network operations

### 📋 **Form Validation Rules**
- **Title Validation**: Required, letters and spaces only
- **Content Validation**: Required, alphanumeric and spaces
- **Email Validation**: Proper email format checking
- **Real-time Feedback**: Instant validation as user types

---

## 🎯 Learning Outcomes

By exploring this project, you will understand:

1. **Modern React Patterns**: Hooks, Context API, and functional components
2. **TypeScript Integration**: Type-safe development practices
3. **Authentication Flow**: Token-based auth with route protection
4. **API Integration**: RESTful API consumption and error handling
5. **Form Management**: Validation, state management, and user feedback
6. **Responsive Design**: Mobile-first CSS with Tailwind
7. **Project Architecture**: Clean folder structure and separation of concerns
8. **Build Tools**: Modern development setup with Vite

---

## 🚀 Getting Started

1. Follow the [installation steps](#-project-installation-steps) above
2. Start the development server with `npm run dev`
3. Open `http://localhost:5173` in your browser
4. Explore the sign-in/sign-up functionality
5. Access the dashboard to try CRUD operations
6. Check the Network tab in DevTools to see API calls

---

## 📝 API Details

This project uses **JSONPlaceholder** (https://jsonplaceholder.typicode.com) as a fake REST API:

- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints**: `/posts`, `/users`
- **Note**: Changes are not persisted on the server (fake backend)

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests. This is a learning project, so contributions that enhance the educational value are especially welcome!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
