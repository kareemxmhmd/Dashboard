# Global Superstore Analytics Dashboard

A modern, interactive, dark-themed web analytics dashboard for exploring retail data from the Global Superstore dataset. Built with React, Vite, and TailwindCSS this dashboard prioritizes sleek aesthetics including glassmorphism cards, glowing neon trends, and customized lightweight animations.

## Features

- **Dark Theme Analytics**: A #121212 canvas highlighting vibrant neon cyan, purple, and pink accents.
- **Micro-Animations**: Uses `framer-motion` for smooth layout entry, counting numbers dynamically on KPI cards, and animated tooltips.
- **Glassmorphism**: Elegant transparent cards reacting gracefully to user hovers with glowing box shadows and lifted placement.
- **Dynamic Filtering**: Update the entire dashboard universally by filtering across `Year`, `Region`, `Category`, and `Segment` using the top interactable controls.
- **Responsive Layout**: Designed explicitly to support Desktop (3-column), Tablet (2-column), and Mobile (stacked) breakpoints seamlessly.
- **Optimized Data Pipeline**: Handles an enormous payload of ~25,000 specific data objects rendered natively via Recharts.

## Tech Stack Overview

- **Core Framework**: React 19 (via Vite)
- **Styling**: TailwindCSS (v4) leveraging global base variables
- **Charting**: [Recharts](https://recharts.org/) for performant SVG compositions
- **Animations**: [Framer Motion](https://www.framer.com/motion/) natively driving all transitions
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react) for crisp iconography

## Quick Start

### 1. Requirements
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Extract the project, navigate to the newly generated `global-superstore-dashboard` folder, and run:

```bash
# Install dependencies
npm install
```

### 3. Run Development Server
To launch the dashboard locally in your browser:

```bash
# Start your Vite Dev Server
npm run dev
```
Navigate to `http://localhost:5173/` inside your browser.

### 4. Build for Production
To bundle the dashboard for deploying to production:

```bash
npm run build
```
You can preview the built bundle locally using:
```bash
npm run preview
```

## Structure Organization

- `src/App.jsx` — Core layout container orchestrating data fetching and filtering context.
- `src/components/KPICards.jsx` — The Animated numerical statistics header.
- `src/components/Charts/` — Compositions handling particular visualization variants (Donut, Regional Bar, Line Trend).
- `src/components/ParticlesBackground.jsx` - A lightweight, interactive `canvas` background giving life to the backdrop.
- `src/index.css` — Global CSS variables and utility classes defining the dashboard's design token system.
- `public/data.json` — Pre-generated dense dummy data modeled on standard real-world retail KPI totals.

## Data Generation
If you ever wish to re-create the dummy dataset, you can utilize the `dataGenerator.js` script method. The current payload within `public/data.json` computes roughly `$12.64M` total sales off `25,728` orders, matching original system specifications.
