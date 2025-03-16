import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [
      "**/*.spec.tsx",
      "**/*.test.tsx",
      "**/node_modules/**",
      "**/dist/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
      include: ["src/**/*.ts", "src/**/*.js"],
      exclude: [
        "src/**/*.tsx",
        "src/**/*.jsx",
        "src/**/hooks/**",
        "src/**/*.hook.ts",
        "src/**/*.hooks.ts",
        "src/**/use*.ts",
        "src/**/*.d.ts",
      ],
    },
  },
});
