## Getting Started

> This project uses pnpm as the package manager.

Clone the repository:

```bash
  git clone https://github.com/mdayat/fe-dot.git
```

Install and run:

```bash
  pnpm install && pnpm dev
```

> Before starting the project, you need to provide an environment variable, `API_KEY`. To get this API key, you can register on this app: https://rajaongkir.com/akun/daftar.

To check if the code complies with best practices:

```bash
  pnpm lintCheck && pnpm prettierCheck
```

## Tech Stack

1. Next JS
2. TypeScript
3. Chakra UI
4. Firebase
5. Prettier
6. ESLint
7. Husky

## Code Base Architecture

> All business logic lives inside a "src" directory.

- src

  - pages: contains page-related components.
  - components: self-explanatory.
  - utils: contains a set of function utilities.
  - context: contains state (data) that is shared "globally". Globally means it's shared across its children without passing the state through props one by one.
  - types: contains reusable types.
  - libs: contains a set of configuration for libraries that's intalled in the project.

> You can ignore the rest of the files in the root directory.
