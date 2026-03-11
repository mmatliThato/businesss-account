# Business Manager Portal - Senior Angular Assessment

A production-ready Angular application for managing business accounts and profiles with API integration.

## 📋 Project Overview

This application demonstrates senior-level Angular development skills by implementing:
- Feature modules with lazy loading
- Angular Signals for state management
- Strong typing throughout the codebase
- Responsive UI design matching Figma specifications
- API integration with proper error handling
- Production-ready architecture patterns

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (v20 recommended)
- npm or yarn
- Angular CLI

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Application

Start the development server:

```bash
ng serve
```

Open your browser to `http://localhost:4200`

### API Mock Server

This application uses a Postman mock server for API endpoints. The mock server is already configured in the `BusinessService` at:
- Business Accounts: `https://2fbf680e-be98-49d0-9bd2-d04d1fee94cf.mock.pstmn.io/business-accounts`
- Business Profiles: `https://2fbf680e-be98-49d0-9bd2-d04d1fee94cf.mock.pstmn.io/business-profiles`

The mock server provides sample data matching the OpenAPI specification.

## 🎨 Design System

### Figma Reference

Design specifications are available at:
🔗 [Figma Design](https://www.figma.com/design/xbr01bhlNQVQWEijTheXCw/Hi-fi-MAP--Vincent-?node-id=0-1&t=iiehBiq7LvaFCyEb-1)
Password: `Map@2026`

### Color Palette

- Primary: `#4f46e5` (Indigo)
- Success: `#16a34a` (Green)
- Warning: `#ea580c` (Orange)
- Error: `#dc2626` (Red)

## 🛠️ Technology Stack

### Core Technologies
- **Angular 21.2.0** (Latest stable version)
- **TypeScript 5.4+**
- **SCSS** for styling with CSS variables
- **Angular Signals** for reactive state management
- **RxJS** for asynchronous operations
- **Angular Material** for UI components and design system

### Architecture Patterns
- Feature modules with lazy loading capability
- Shared component library (`src/app/shared`)
  - Reusable `StatusBadgeComponent`
  - Reusable `LoadingSpinnerComponent`
  - Reusable `ErrorMessageComponent`
- Smart/dumb component separation
- OnPush change detection strategy
- Dependency injection throughout
- Strongly typed interfaces (no `any`)

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                # Core services and models
│   │   ├── models/          # Data models and interfaces
│   │   └── services/        # API services
│   ├── features/           # Feature modules
│   │   ├── business-list/   # Business accounts list
│   │   └── business-details/ # Business details view
│   ├── app.routes.ts       # Application routing
│   └── app.config.ts       # App configuration
└── ...other Angular files
```

## 🎯 Key Features

### 1. Business Accounts Screen
- Displays list of business accounts with filtering
- Shows status badges (Active/Inactive)
- Maintenance message indicators
- Pagination-ready structure

### 2. Business Profiles Screen
- Extended profile information
- WABA account metadata
- Callback configuration details
- Maintenance message settings

### 3. Business Details View
- Detailed view for individual businesses
- Responsive card-based layout
- Conditional rendering based on business type
- Back navigation support

## 🔧 Build & Deployment

### Production Build

```bash
ng build --configuration production
```

This creates optimized build artifacts in the `dist/` directory.

### Code Quality

The project includes:
- ESLint configuration for TypeScript
- Prettier for code formatting
- No unused code or commented blocks
- Comprehensive error handling

## 📝 Notes & Assumptions

1. **API Data**: The mock API returns sample data. In a production environment, this would connect to real backend services.

2. **Figma Interpretation**: Some design elements were interpreted based on the Figma file. Specific spacing and typography values were extracted from the design system.

3. **Responsive Design**: Mobile-first approach with breakpoints at 768px for tablet views.

4. **Error Handling**: Comprehensive error states are implemented with user-friendly messages and retry options.

5. **State Management**: Angular Signals are used for reactive state management, demonstrating modern Angular patterns.

## 📞 Support

For questions about this implementation or the assessment requirements, please refer to the original assessment document.
