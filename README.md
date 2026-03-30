# Mantiq AI (منطق)

Mantiq AI is a modern, high-performance web application built to showcase the latest news, updates, and models in the Artificial Intelligence space. The platform features a sleek, dark-themed user interface, fluid animations, and a fully functional admin dashboard for content management.

## 🚀 Features

- **Interactive News Feed:** Browse AI-related news with dynamic category filtering.
- **Admin Dashboard:** A dedicated, secure area (`/admin`) to manage, create, edit, and delete news posts.
- **Modern UI/UX:** Built with Tailwind CSS, featuring glassmorphism, glowing gradients, and responsive design.
- **Fluid Animations:** Smooth page transitions and element interactions powered by Framer Motion.
- **Persistent State:** Uses Zustand with local storage persistence for reliable state management without backend dependencies.
- **SEO Optimized:** Dynamic meta tags and titles managed via React Helmet Async.
- **RTL Support:** Full Right-to-Left formatting optimized for Arabic content.

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + clsx + tailwind-merge
- **State Management:** Zustand
- **Routing:** React Router v7 (createBrowserRouter)
- **Animations:** Framer Motion
- **Icons & UI:** Lucide React, Sonner (Toasts)
- **Testing:** Vitest + React Testing Library

## 📂 Project Structure

```
mantiq-ai/
├── public/               # Static assets
└── src/
    ├── components/       # Reusable UI components (Loader, NewsCard, etc.)
    ├── data/             # Mock data and TypeScript interfaces
    ├── layouts/          # Root and Admin layout wrappers
    ├── pages/            # Main application pages
    │   └── admin/        # Admin dashboard and editor pages
    ├── store/            # Zustand global state management
    ├── index.css         # Global styles and Tailwind configuration
    └── main.tsx          # Application entry point and router setup
```

## 🏁 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd mantiq-ai
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production

Create an optimized production build:
```bash
npm run build
```
You can preview the production build locally using:
```bash
npm run preview
```

### Running Tests

Execute the Vitest test suite:
```bash
npm run test
```

## 📄 License

This project is licensed under the MIT License.
