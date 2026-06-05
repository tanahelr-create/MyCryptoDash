# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



[data-theme="cyberpunk"] {
  --couleur-principale: #00ff9f;
  --couleur-glow: rgba(0, 255, 159, 0.15);
  --couleur-border: rgba(0, 255, 159, 0.12);
  --couleur-border-hot: rgba(0, 255, 159, 0.35);
  --couleur-texte: #e0ffe8;
  --couleur-dim: #3d6b52;
}

[data-theme="blue"] {
  --couleur-principale: #00e5ff;
  --couleur-glow: rgba(0, 229, 255, 0.15);
  --couleur-border: rgba(0, 229, 255, 0.12);
  --couleur-border-hot: rgba(0, 229, 255, 0.35);
  --couleur-texte: #e0f7ff;
  --couleur-dim: #3d6b7a;
}

[data-theme="violet"] {
  --couleur-principale: #b44fff;
  --couleur-glow: rgba(180, 79, 255, 0.15);
  --couleur-border: rgba(180, 79, 255, 0.12);
  --couleur-border-hot: rgba(180, 79, 255, 0.35);
  --couleur-texte: #f0e0ff;
  --couleur-dim: #6b3d7a;
}