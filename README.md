---

# 🛒 NexusStore: Modern E-Commerce Application

NexusStore is a high-performance, responsive e-commerce frontend application built with **React.js**. It features a modern glassmorphism aesthetic, real-time product filtering, and a persistent shopping cart experience, powered by the FakeStoreAPI.

## 🚀 Project Overview

This project was developed as a capstone project for the Developer Arena Internship. It focuses on mastering component-based architecture, state management in complex applications, and performance optimization through lazy loading.

### Key Features

* **Dynamic Product Catalog:** Real-time fetching and filtering of products via FakeStoreAPI.
* **Persistent State Management:** Shopping cart data is synchronized with LocalStorage.
* **Glassmorphism UI:** Modern, immersive design using Tailwind CSS and Framer Motion for fluid animations.
* **Optimized Performance:** Implemented route-based lazy loading to improve initial load times.
* **Route Protection:** Secured checkout processes that require user authentication.
* **Graceful Error Handling:** Dedicated Error Boundaries to ensure the UI stays robust during unexpected failures.

## 🛠️ Technical Stack

* **Framework:** React (Vite)
* **Routing:** React Router (v6)
* **State Management:** React Context API
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **API:** FakeStoreAPI
* **Deployment:** Vercel/Netlify

## 📁 Project Structure

The project follows a clean, modular structure for scalability:

```text
src/
├── components/      # Reusable UI elements (Navbar, Cards, ErrorBoundary)
├── context/         # Global state management (ShopContext)
├── pages/           # Page-level components (Home, Cart, ProductDetails, Checkout, Login)
├── App.jsx          # Routing configuration and lazy loading
└── main.jsx         # Application entry point

```

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone <your-repository-url>
cd nexus-store

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```



## 🧪 Testing Evidence

| Feature | Testing Method | Expected Outcome |
| --- | --- | --- |
| **Auth** | Sign in/Sign out flow | Session state persists/clears properly. |
| **Search** | Filter catalog by product name | Results update instantly without page reload. |
| **Lazy Loading** | Network tab inspection | JS chunks load on demand. |
| **Cart** | Add/Remove items | UI updates and LocalStorage persists. |

---

### 🗺️ System Architecture Diagram

---

### 🎨 Design Philosophy

The application utilizes a **Glassmorphism** design pattern—layering translucent backgrounds with subtle backdrop blurs to create depth—which is a trend in modern e-commerce UI design. All user-facing components were built with **Accessibility (A11y)** and **SEO best practices** in mind, including semantic `<nav>` elements, `aria-labels`, and structured data practices for crawlers.

---
Bhukya Upendar
