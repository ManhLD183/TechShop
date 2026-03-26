# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Refactor Pattern (Home Pilot)

Applied file: `src/components/Home.tsx`

- Keep legacy business logic in place (`useGetAllProductsQuery`, `getCategories`, `/api/getBanners`).
- Refactor UI by sections (hero, highlights, products, categories, CTA) following the blueprint concept.
- Preserve backend contract fields (`_id`, `name`, `images[0].url`, `minPrice`, `maxPrice`).
- Add local adapter/memo variables in component for presentation mapping; do not modify API service layer.
- Validate with `npm run build` and smoke-test routes/API:
  - `GET /api/products?_page=1&_limit=3`
  - `GET /api/categories`
  - `GET /Home` (client)
