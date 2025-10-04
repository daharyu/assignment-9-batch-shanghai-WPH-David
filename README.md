# Challenge 9

## Overview

This is E-Commerce application built with NextJS, TypeScript as part of Challenge 9. The application demonstrates advanced NextJS concepts including component architecture, state management, and best practices for building scalable frontend applications.

## Features

- **Task Management**: Create, read, update, and delete todos
- **Real-time Updates**: Instant UI updates with optimistic updates
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript implementation
- **Modern Architecture**: Clean component structure and separation of concerns

## Tech Stack

- **Frontend Framework**: NextJS
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: TanStack React Query 5.89.0
- **HTTP Client**: Axios 1.12.2
- **Form Handling**: React Hook Form with Zod validation
- **Linting**: ESLint 9.35.0

## Architecture Highlights

### Component Structure & Organization (30%)

- **Modular Architecture**: Components are organized into logical folders (ui, container, pages)
- **Single Responsibility**: Each component has a clear, focused purpose
- **Hierarchical Structure**: Clear parent-child relationships with logical nesting
- **Functional Components**: Dominantly uses functional components with hooks
- **File Organization**: Consistent index files for clean imports

### Props Handling (25%)

- **Efficient Props Flow**: Clean data passing between components
- **Destructuring**: Consistent use of props destructuring
- **Spread Syntax**: Proper use of `{...props}` for flexibility
- **Context API**: Utilizes providers to avoid prop drilling
- **Type Safety**: All props are properly typed with TypeScript

### Conditional Rendering (15%)

- **Clean Logic**: Clear conditional rendering with proper ternary operators
- **Loading States**: Dedicated loader components for async operations
- **Error Boundaries**: Proper error handling and display
- **Dynamic UI**: Components adapt based on state and props

### Reusable Components (10%)

- **UI Components**: Shared components like Button and Loader
- **Flexible Design**: Components accept various props for different contexts
- **DRY Principle**: No code duplication across similar components
- **Consistent Interface**: Standardized props patterns

### Code Clarity (10%)

- **TypeScript**: Full type safety throughout the application
- **Consistent Naming**: Semantic variable and function names
- **Clean Code**: Proper indentation and formatting
- **ESLint Integration**: Automated code quality enforcement

### Hook Usage (10%)

- **React Hooks**: Proper use of useState, useEffect, useContext
- **Custom Hooks**: Business logic separated into custom hooks (useHome, useTodoForm)
- **Rules of Hooks**: Strict adherence to React's Rules of Hooks
- **Performance**: Efficient state management and side effects

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   cp .env.example .env
   ```

   Add your API URL:

   ```
   NEXT_PUBLIC_API_URL=https://e-commerce-api-production-26ab.up.railway.app
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## API Integration

The application integrates with the provided REST API:

- **Base URL**: `https://e-commerce-api-production-26ab.up.railway.app`
- **Documentation**: Available at `/api-swagger/`
- **HTTP Client**: Axios with interceptors for error handling
- **State Management**: TanStack React Query for caching and synchronization

## Design System

Based on the Figma design specifications:

- **Design URL**: [Figma Design](https://www.figma.com/design/W38k1PafXVD6LnAQo8lNWe/Ecommerce---Batch-4---V2?node-id=29411-12622&p=f&t=5fTIHhewMNSW24oI-0)
- **Responsive Layout**: Mobile-first approach
- **Consistent Spacing**: Tailwind CSS utility classes
- **Accessibility**: ARIA labels and semantic HTML

## Development Guidelines

### Component Development

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow single responsibility principle
- Create custom hooks for business logic

### State Management

- Use React Query for server state
- useState for local component state
- Context API for shared application state
- Avoid prop drilling when possible

### Code Quality

- Run `npm run lint` before commits
- Follow ESLint configuration
- Use meaningful commit messages
- Implement proper error handling

## Performance Considerations

- **Code Splitting**: Vite's automatic code splitting
- **Lazy Loading**: Dynamic imports for route-based splitting
- **Memoization**: React.memo and useMemo where appropriate
- **Bundle Optimization**: Tree shaking and dead code elimination

## Testing Strategy

- **Unit Tests**: Component testing with Jest/Vitest
- **Integration Tests**: API integration testing
- **E2E Tests**: User flow testing
- **Type Checking**: TypeScript compilation checks

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

Built with dedication for Challenge 9 - Library Application
