# E-Commerce Product Explorer 

> **Curated Essentialism.** A high-end, minimalist e-commerce experience built with React, focusing on fluid motion, glassmorphism, and premium aesthetics.

---

## ✨ Key Features

* **🛍️ Elegant Product Discovery**: Explore a dynamic grid of products with a responsive layout (3-2-1 columns) that adapts perfectly to Desktop, Tablet, and Mobile.
* **🔍 Intelligent Search**: Ultra-fast product lookup powered by a **Custom Debounce Hook** to minimize API overhead and improve UX.
* **🌗 Aesthetics**: A strictly monochromatic "White-Black-Grey" palette featuring **Glassmorphism** effects and 24px+ soft corners.
* **⚡ Fluid Transitions**: Powered by **Framer Motion** for "snappy yet soft" micro-interactions and page transitions.
* **🛒 Advanced Cart & Wishlist**: Global state management via **React Context API**, allowing users to save favorites and manage their bag via a sleek slide-out drawer.
* **💳 Secure Checkout Flow**: A robust validation system using **React Hook Form** and **Yup** to simulate a real-world purchasing experience.

---

## 🛠️ Technical Stack

| Category | Stack |
| :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **State & Logic** | ![Context API](https://img.shields.io/badge/Context_API-000000?style=for-the-badge&logo=react&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) |
| **Motion & UI** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white) |
| **Forms & Validation** | ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white) ![Yup](https://img.shields.io/badge/Yup-000000?style=for-the-badge&logo=javascript&logoColor=yellow) |

---

## 📂 Project Structure

Following a modular, industry-standard architecture:

```text
src/
├── components/     # Reusable UI (ProductCard, Navbar, Loader)
├── pages/          # Route Views (Home, Explorer, Details, Cart)
├── context/        # Global State (Cart & Wishlist Providers)
├── hooks/          # Custom Logic (useProducts, useCart, useDebounce)
├── services/       # API Layer (Axios configuration)
└── utils/          # Helper functions
