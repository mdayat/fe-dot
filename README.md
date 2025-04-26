## Getting Started

Follow these steps to set up and run the application locally on `3000` port:

1. Clone the repository

   ```bash
   git clone https://github.com/mdayat/fe_dot.git
   cd fe_dot
   ```

2. Install deps and run:

   ```bash
   pnpm install && pnpm dev
   ```

## Application Overview

This repository consists of two applications:

1. **Task Management App** - Doesn't require authentication.
2. **Product Store App** - Requires user authentication.

Upon starting the application, you'll be presented with an onboarding page that allows you to choose which application you want to use.

### Authentication

For the Product Store app, you can use the following demo account:

```
Email: john@gmail.com
Password: johnsecret
```

> **Note**: Authentication is stored in memory, meaning upon refreshing the page, the user must login again.

## Tech Stack

1. React
2. TypeScript
3. Styled Components
