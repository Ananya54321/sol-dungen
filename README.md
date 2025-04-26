# Sol Dungen

**Sol Dungen** is a web application designed to explore the Solana Blockchain. It provides users with a modern interface to interact with blockchain data, view NFTs, and explore market data. The project is built using **Next.js**, **React**, **TailwindCSS**, and other modern web development tools.

---

## Table of Contents

1. [Features](#features)
2. [Setup Instructions](#setup-instructions)
3. [Usage Guidelines](#usage-guidelines)
4. [Folder Structure](#folder-structure)
5. [Scripts](#scripts)
6. [Technologies Used](#technologies-used)

---

## Features

- **NFT Viewer**: Explore the newest NFTs on the Solana blockchain.
- **Market Data**: Fetch and display market data using custom hooks.
- **Responsive Design**: Built with TailwindCSS for a seamless experience across devices.
- **Dark Mode**: Theme support using `next-themes`.
- **Radix UI Components**: Interactive and accessible UI components.

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: Version `^18.18.0` or higher (recommended: `^20.9.0` or `>=21.1.0`).
- **pnpm**: Package manager used for dependency management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YadlaMani/sol-dungen.git
   cd sol-dungen
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a .env.local file in the root directory and add any required environment variables.
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open your browser and navigate to http://localhost:3000.

### Usage Guidelines

Development

- Run the development server:

```bash
pnpm dev
```

- Lint the codebase:

```bash
pnpm lint
```

- Build the application for production:

```bash
pnpm build
```

- Start the production server:

```bash
pnpm start
```

### Deployment

1. Build the application:

```bash
pnpm build
```

2. Deploy the .next folder to your hosting provider.

### Folder Structure

- The project follows a modular and scalable folder structure:

```markdown
sol-dungen/
├── src/
│ ├── app/ # Next.js app directory
│ │ ├── globals.css # Global styles
│ │ ├── layout.tsx # Root layout component
│ │ ├── market/ # Market page
│ │ └── nfts/ # NFTs page
│ ├── components/ # Reusable UI components
│ │ ├── ui/ # UI-specific components (e.g., buttons, cards)
│ │ └── pages/ # Page-specific components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ ├── types/ # TypeScript type definitions
│ └── styles/ # Additional styles
├── public/ # Static assets
├── .eslintrc.mjs # ESLint configuration
├── package.json # Project metadata and dependencies
├── pnpm-lock.yaml # Lockfile for dependencies
└── README.md # Project documentation
```

### Scripts

The following scripts are available in the package.json:

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint to check for code quality issues.

### Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework.
- **Radix UI**: Accessible and customizable UI components.
- **TypeScript**: Strongly typed JavaScript.
- **Axios**: HTTP client for API requests.
- **Lucide Icons**: Icon library for React.
