# algoQuePedir-business

## Overview

Business-side frontend for a delivery application. This project provides the user interface and client-side logic required for businesses to manage orders, track deliveries, and interact with customers via the delivery platform.

## Features

- Responsive web UI for business users  
- Order management (view, update status)  
- Delivery tracking and status updates  
- Real-time order updates (backend [here](https://github.com/MartinSchubert04/algoQuePedir-backend/))  
- Modular structure using modern web technologies (Svelte / TypeScript / CSS / HTML)  
- Linting and code formatting (ESLint / Prettier) configuration included  

## Tech Stack

- Svelte  
- TypeScript  
- HTML & CSS  
- JavaScript (where needed)  
- Yarn / npm for package management  

## Project Structure


```bs
/
├── src/                   # Main source code (components, pages, stores, etc.)
├── static/                # Static assets 
├── maquetado/             # Layout / UI skeleton 
├── e2e/                   # End-to-end tests 
├── .vscode/               # VSCode workspace settings
├── .github/workflows/     # CI / workflow definitions
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── README.md
```

## Setup

### Prerequisites

- Node.js (recommended LTS version)  
- Yarn or npm installed globally  

### Installation

```bash
# Clone the repository
git clone https://github.com/MartinSchubert04/algoQuePedir-business.git

# Install dependencies
yarn install        # or: npm install

yarn dev            # or: npm run dev
yarn build          # or: npm run build
```
