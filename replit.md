# YB Patil Hub

## Overview

YB Patil Hub is a comprehensive educational web application designed for MSBTE students to access previous year question papers, DTE electronic projects, and college events. The platform provides a centralized hub for academic resources with user authentication, stream-specific content organization, and interactive features like bookmarking, commenting, and project cart functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based frontend with TypeScript, built using Vite for fast development and optimized production builds. The UI is constructed using shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The frontend follows a component-based architecture with clear separation of concerns:

- **Routing**: Wouter for client-side routing with dedicated pages for dashboard, papers, projects, events, profile, and donation
- **State Management**: React Context API for global state (auth, theme, cart) with TanStack Query for server state management
- **Component Structure**: Reusable UI components in `components/ui/` with feature-specific components in main components directory
- **Styling**: Tailwind CSS with CSS custom properties for theming, supporting both light and dark modes

### Backend Architecture
The backend is designed as a REST API using Express.js with TypeScript. The architecture supports both development and production environments with proper middleware setup:

- **Server Framework**: Express.js with TypeScript for type safety
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Middleware**: Request logging, JSON parsing, and error handling middleware
- **Development Setup**: Vite integration for hot module replacement in development
- **Storage Interface**: Abstract storage interface allowing for different implementations (currently in-memory, designed to support database integration)

### Data Storage Solutions
The application uses a dual approach for data persistence:

- **Primary Database**: Drizzle ORM configured for PostgreSQL with schema definitions supporting users, papers, projects, and events
- **Schema Design**: Well-structured tables with proper relationships, including user profiles with stream/year constraints, paper categorization, project details with team information, and event management
- **Authentication Data**: Firebase Authentication for user management with additional profile data stored in Firestore
- **File Storage**: Firebase Storage for PDF papers and project images
- **Local Storage**: Browser localStorage for cart persistence and user preferences

### Authentication and Authorization
The authentication system combines Firebase Auth with custom user profiles:

- **Firebase Authentication**: Email/password authentication with user session management
- **User Profiles**: Extended user data stored in Firestore including stream (Computer/Civil/Mechanical/ENTC), year (1st/2nd/3rd), and admin status
- **Access Control**: Stream and year-based content filtering with immutable user selections after registration
- **Session Management**: Firebase Auth state persistence with React Context for application-wide auth state

### Data Models and Relationships
The database schema supports the core educational platform features:

- **Users**: Authentication linked to academic profiles with stream/year constraints
- **Papers**: Organized by term, stream, year with download tracking and user interactions
- **Projects**: DTE microprojects with team information, pricing, and categorization
- **Events**: College events with approval workflow and user interest tracking

## External Dependencies

### Firebase Services
- **Firebase Authentication**: User registration and login with email/password
- **Firestore Database**: User profiles and supplementary data storage
- **Firebase Storage**: File hosting for PDFs, images, and other assets

### Database and ORM
- **PostgreSQL**: Primary database via Neon serverless
- **Drizzle ORM**: Type-safe database queries and migrations
- **Drizzle Kit**: Database migrations and schema management

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Consistent icon library for the interface
- **Class Variance Authority**: Type-safe styling variants

### Development and Build Tools
- **Vite**: Fast development server and optimized production builds
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundling for production server builds
- **TanStack Query**: Server state management and caching for API calls

### Specialized Libraries
- **React Hook Form**: Form handling with validation
- **Date-fns**: Date manipulation and formatting
- **Embla Carousel**: Responsive carousel components for project showcases
- **Wouter**: Lightweight client-side routing solution