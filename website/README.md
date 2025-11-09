# Website

Our [website](https://formisch.dev/) contains guides, an API reference and a playground to quickly learn and understand Formisch.

## Getting started

Step 1: Clone repository

```bash
git clone git@github.com:open-circle/formisch.git
```

Step 2: Install dependencies

```bash
pnpm install
```

Step 3: Build shared packages

```bash
cd ./packages/core && pnpm build && cd ../methods && pnpm build
```

Step 4: Build framework package

```bash
cd ../../frameworks/qwik && pnpm build
```

Step 5: Start website

```bash
cd ../../website && pnpm start
```
