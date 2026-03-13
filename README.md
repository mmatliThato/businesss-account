# Senior Angular Front-End Developer Assessment

This is my submission for the **Senior Angular Front-End Developer** technical assessment.

## 📋 Overview

A production-ready Angular application that recreates two screens from the Figma design and integrates with provided API endpoints. The application demonstrates senior-level Angular patterns, clean architecture, and attention to UI/UX details.

## ✅ Requirements Completed

### Core Features
- ✅ **Two screens** recreated: Business Accounts & Business Profiles
- ✅ **API integration**: Consumes `/business-accounts` and `/business-profiles` endpoints
- ✅ **Angular 18+** with standalone components
- ✅ **SCSS styling** with responsive design

### Production-Ready Patterns
- ✅ Feature modules (`SharedModule`)
- ✅ OnPush change detection strategy
- ✅ Strong typing (no `any`)
- ✅ Reusable components library
- ✅ Error handling & loading states
- ✅ Responsive layouts

### UI/UX Implementation
- ✅ Statistics dashboard with real-time counts
- ✅ Search functionality with filtering
- ✅ Pagination controls
- ✅ Filter chips (All/Active/Maintenance)
- ✅ Status badges (green for active, red for inactive)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Angular CLI

### Installation

```bash
npm install
```

### Running the Application

```bash
ng serve --open
```

The application will be available at `http://localhost:4200/`

### Building for Production

```bash
ng build --configuration production
```

## 📡 API Configuration

The application uses a mock server via Postman. The base URL is configured in `src/app/core/models/services/business.service.ts`:

```typescript
private apiUrl = 'https://2fb680e-be98-49d0-9ud2-d041fe94cf.mock.pstmn.io';
```

## 🎨 Design Notes

### Color Scheme
- **Primary**: Standard Bank blue (#003d82)
- **Secondary**: Vibrant blue (#0072c6) for active states
- **Accent**: Gold (#ffd700) for highlights
- **Backgrounds**: White with dark text for readability

### Figma Design
The application follows the Figma design at:
https://www.figma.com/design/xbr01bhlNQVQWEijTheXCw/Hi-fi-MAP--Vincent-?node-id=0-1&t=iiehBiq7LvaFCyEb-1
Password: Map@2026

## 📦 Technology Stack

| Technology | Version |
|-----------|--------|
| Angular | 18.0.0 |
| TypeScript | 5.4.5 |
| SCSS | Native |
| Angular Material | Latest |
| RxJS | Latest |

## 🔧 Architecture

### Folder Structure
```
src/app/
├── core/               # Core services and models
│   ├── models/         # Data models and interfaces
│   └── services/       # API services
├── features/           # Feature modules
│   ├── business-list/  # Business Accounts screen
│   └── business-details/# Business Profiles screen
└── shared/            # Reusable components
    └── components/     # Shared UI components
```

### Key Patterns
- **Standalone Components**: Angular 18+ standalone approach
- **Signals**: For reactive state management
- **OnPush**: Change detection optimization
- **Feature Modules**: Logical separation of concerns

## 📝 Assumptions

1. The mock API returns all businesses as inactive (`isActive: false`). This is expected behavior based on the provided OpenAPI specification.
2. Figma design uses Standard Bank's official corporate colors (blue/gold scheme).
3. No authentication required per assessment instructions.

## 🎯 Bonus Features Implemented

- ✅ Angular Signals for state management
- ✅ Reusable component library structure
- ✅ Angular Material integration
- ✅ Shared components with proper encapsulation

## 📞 Support

For any questions about this submission, please contact me directly.